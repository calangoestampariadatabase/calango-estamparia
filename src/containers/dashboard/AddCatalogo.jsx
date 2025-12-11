"use client";

import { useState, useEffect, useRef } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function AddCatalogo() {
  const blankItem = { name: "", category: "", images: [null, null, null] };

  const [items, setItems] = useState([blankItem]);
  const [modalIndex, setModalIndex] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const fileInputRef = useRef(null);

  // ============================================
  // 1. CARREGAR ITENS DO BANCO
  // ============================================
  useEffect(() => {
    async function loadExisting() {
      const { data: catalogs } = await supabase
        .from("catalog")
        .select("id, name, category");

      if (!catalogs) return;

      const { data: images } = await supabase
        .from("catalog_images")
        .select("catalog_id, url");

      const mapped = catalogs.map((cat) => {
        const imgs =
          images
            ?.filter((img) => img.catalog_id === cat.id)
            ?.map((x) => x.url) ?? [];

        return {
          id: cat.id,
          name: cat.name,
          category: cat.category,
          images: [...imgs, null, null, null].slice(0, 3),
          existing: true,
        };
      });

      setItems((prev) => [...mapped, ...prev]);
    }

    loadExisting();
  }, []);

  // ============================================
  // 2. ADICIONAR NOVO ITEM
  // ============================================
  function addNewItem() {
    setItems((prev) => [...prev, { ...blankItem }]);
  }

  // ============================================
  // 3. ABRIR MODAL
  // ============================================
  function openModal(index) {
    setModalIndex(index);
    setSelectedImageIndex(0);
  }

  function handleChangeItemField(field, value) {
    const updated = [...items];
    updated[modalIndex][field] = value;
    setItems(updated);
  }

  // ============================================
  // 4. SELECIONAR IMAGEM AUTOMÁTICO
  // ============================================
  function triggerSelectFile(imgIndex) {
    setSelectedImageIndex(imgIndex);

    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }

  function handleSelectFile(e) {
    const file = e.target.files[0];
    if (!file) return;

    const updated = [...items];
    updated[modalIndex].images[selectedImageIndex] = file;
    setItems(updated);
  }

  function closeModal() {
    setModalIndex(null);
    setSelectedImageIndex(null);
  }

  // ============================================
  // 5. SALVAR ITEM
  // ============================================
  async function handleSaveItem() {
    const item = items[modalIndex];

    if (!item.name.trim() || !item.category.trim()) {
      alert("Preencha nome e categoria.");
      return;
    }

    let catalogId = item.id;

    // SE for novo item → cria no banco
    if (!item.existing) {
      const { data: catalog, error } = await supabase
        .from("catalog")
        .insert([{ name: item.name, category: item.category }])
        .select()
        .single();

      if (error) {
        alert("Erro ao criar catálogo!");
        return;
      }

      catalogId = catalog.id;
    }

    // Upload das imagens
    for (const img of item.images) {
      if (!img) continue;
      if (typeof img === "string") continue;

      const path = `${catalogId}/${Date.now()}-${img.name}`;

      await supabase.storage.from("catalog-images").upload(path, img);

      const { data: url } = supabase.storage
        .from("catalog-images")
        .getPublicUrl(path);

      await supabase.from("catalog_images").insert([
        { catalog_id: catalogId, url: url.publicUrl },
      ]);
    }

    alert("Item salvo!");
    closeModal();
  }

  // ============================================
  // 6. DELETAR ITEM COMPLETO
  // ============================================
  async function handleDeleteItem() {
    const item = items[modalIndex];

    if (!item.id) {
      // apenas remove localmente se ainda não existe no banco
      const updated = items.filter((_, i) => i !== modalIndex);
      setItems(updated);
      closeModal();
      return;
    }

    if (!confirm("Tem certeza que deseja deletar este catálogo?")) return;

    // 1. pegar imagens do banco
    const { data: imgs } = await supabase
      .from("catalog_images")
      .select("url")
      .eq("catalog_id", item.id);

    // 2. remover arquivos do bucket
    if (imgs && imgs.length > 0) {
      const paths = imgs.map((img) => {
        const path = img.url.split("/catalog-images/")[1];
        return path;
      });

      await supabase.storage.from("catalog-images").remove(paths);
    }

    // 3. deletar catalog_images
    await supabase.from("catalog_images").delete().eq("catalog_id", item.id);

    // 4. deletar o catálogo
    await supabase.from("catalog").delete().eq("id", item.id);

    // 5. remover da UI
    const updated = items.filter((_, i) => i !== modalIndex);
    setItems(updated);

    closeModal();
  }

  // ============================================
  // 7. UI
  // ============================================
  return (
    <div className="p-6 space-y-4">
      <h2 className="text-xl font-bold">Catálogo</h2>

      <div className="grid grid-cols-5 gap-6">
        {items.map((item, i) => {
          const thumb = item.images[0];

          return (
            <div
              key={i}
              onClick={() => openModal(i)}
              className="w-28 h-28 border rounded-lg bg-gray-100 flex items-center justify-center cursor-pointer hover:ring-2 hover:ring-blue-500"
            >
              {thumb ? (
                typeof thumb === "string" ? (
                  <img
                    src={thumb}
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <img
                    src={URL.createObjectURL(thumb)}
                    className="w-full h-full object-cover rounded-lg"
                  />
                )
              ) : (
                <span className="text-3xl text-gray-400">+</span>
              )}
            </div>
          );
        })}

        {/* novo item */}
        <button
          onClick={addNewItem}
          className="w-28 h-28 border border-black text-4xl rounded-lg hover:bg-gray-100 flex items-center justify-center"
        >
          +
        </button>
      </div>

      {/* MODAL */}
      {modalIndex !== null && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-96 space-y-4">
            <h3 className="text-lg font-bold">Editar Item</h3>

            <input
              type="text"
              className="w-full border p-2 rounded"
              placeholder="Nome"
              value={items[modalIndex].name}
              onChange={(e) =>
                handleChangeItemField("name", e.target.value)
              }
            />

            <input
              type="text"
              className="w-full border p-2 rounded"
              placeholder="Categoria"
              value={items[modalIndex].category}
              onChange={(e) =>
                handleChangeItemField("category", e.target.value)
              }
            />

            <div className="grid grid-cols-3 gap-2">
              {items[modalIndex].images.map((img, imgIndex) => (
                <div
                  key={imgIndex}
                  onClick={() => triggerSelectFile(imgIndex)}
                  className="w-20 h-20 border rounded bg-gray-100 cursor-pointer overflow-hidden flex items-center justify-center"
                >
                  {img ? (
                    typeof img === "string" ? (
                      <img src={img} className="w-full h-full object-cover" />
                    ) : (
                      <img
                        src={URL.createObjectURL(img)}
                        className="w-full h-full object-cover"
                      />
                    )
                  ) : (
                    <span className="text-gray-400">+</span>
                  )}
                </div>
              ))}
            </div>

            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleSelectFile}
              className="hidden"
            />

            <div className="flex justify-between pt-3">
              {/* BOTÃO DE DELETAR */}
              <button
                onClick={handleDeleteItem}
                className="px-4 py-1 bg-red-600 text-white rounded"
              >
                Apagar
              </button>

              <div className="flex gap-2">
                <button
                  onClick={closeModal}
                  className="px-4 py-1 bg-gray-300 rounded"
                >
                  Fechar
                </button>

                <button
                  onClick={handleSaveItem}
                  className="px-4 py-1 bg-green-600 text-white rounded"
                >
                  Salvar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
