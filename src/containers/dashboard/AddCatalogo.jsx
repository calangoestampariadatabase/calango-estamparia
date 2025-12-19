"use client";

import { useEffect, useRef, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function AddCatalogo() {
  const [items, setItems] = useState([]);
  const [modalIndex, setModalIndex] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isSaving, setIsSaving] = useState(false);

  const fileInput = useRef(null);

  const MAX_ITEMS = 200;
  const MAX_IMAGE_SIZE = 180 * 1024;
  const MAX_IMAGES = 3;

  const CATEGORY_OPTIONS = [
    "Canecas",
    "Interclasse",
    "Terceirão",
    "Esportivo",
    "Igreja",
    "Nono Ano",
    "Faculdade",
    "Personalizados"
  ];

  // ============================================================
  // Carregar catálogo existente
  // ============================================================
  useEffect(() => {
    async function load() {
      const { data: catalogs } = await supabase
        .from("catalog")
        .select("id, name, category");

      if (!catalogs) return;

      const mapped = catalogs.map((c) => ({
        ...c,
        existing: true,
        images: [...Array(MAX_IMAGES)].map((_, i) => {
          const { data } = supabase.storage
            .from("catalog-images")
            .getPublicUrl(`${c.id}/${i + 1}.jpg`);
          return `${data.publicUrl}?r=${Date.now()}`;
        }),
      }));

      setItems(mapped);
    }

    load();
  }, []);

  // ============================================================
  // Criar novo item
  // ============================================================
  function addItem() {
    if (items.length >= MAX_ITEMS) {
      alert("Você atingiu o limite máximo de 120 itens.");
      return;
    }

    setItems((prev) => [
      ...prev,
      {
        id: "",
        name: "",
        category: "",
        existing: false,
        images: [...Array(MAX_IMAGES)].map(() => null),
      },
    ]);
  }

  // ============================================================
  // Abrir modal
  // ============================================================
  function openModal(index) {
    setModalIndex(index);
  }

  // ============================================================
  // Seleção de arquivo
  // ============================================================
  function selectFile(imgIndex) {
    setSelectedImageIndex(imgIndex);
    fileInput.current?.click();
  }

  async function handleSelectFile(e) {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > MAX_IMAGE_SIZE) {
      alert("A imagem deve ter no máximo 180KB.");
      return;
    }

    const updated = [...items];
    updated[modalIndex].images[selectedImageIndex] = file;
    setItems(updated);
  }

  // ============================================================
  // Remover imagem individual
  // ============================================================
  async function removeImage(imgIndex) {
    const item = items[modalIndex];

    // Item novo
    if (!item.existing || !item.id) {
      const updated = [...items];
      updated[modalIndex].images[imgIndex] = null;
      setItems(updated);
      return;
    }

    // Item existente
    await supabase.storage
      .from("catalog-images")
      .remove([`${item.id}/${imgIndex + 1}.jpg`]);

    const { data } = supabase.storage
      .from("catalog-images")
      .getPublicUrl(`${item.id}/${imgIndex + 1}.jpg`);

    const updated = [...items];
    updated[modalIndex].images[imgIndex] = `${data.publicUrl}?r=${Date.now()}`;
    setItems(updated);
  }

  // ============================================================
  // Salvar item (ACEITA ID MANUAL)
  // ============================================================
  async function saveItem() {
    if (isSaving) return;

    setIsSaving(true);

    const item = items[modalIndex];

    if (!item.name.trim() || !item.category.trim()) {
      alert("Preencha o nome e a categoria.");
      setIsSaving(false);
      return;
    }

    let id = item.id ? item.id.trim() : null;

    try {
      // Criar novo item (ou com ID manual)
      if (!item.existing) {
        const { data, error } = await supabase
          .from("catalog")
          .insert([
            {
              id: id || undefined, // se estiver vazio, supabase gera automático
              name: item.name,
              category: item.category,
            },
          ])
          .select()
          .single();

        if (error) throw new Error("Erro ao criar item.");

        id = data.id;

        const updated = [...items];
        updated[modalIndex].id = id;
        updated[modalIndex].existing = true;
        setItems(updated);
      }

      // Upload das imagens
      for (let i = 0; i < MAX_IMAGES; i++) {
        const img = item.images[i];

        if (!img || typeof img === "string") continue;

        await supabase.storage
          .from("catalog-images")
          .upload(`${id}/${i + 1}.jpg`, img, { upsert: true });

        const { data } = supabase.storage
          .from("catalog-images")
          .getPublicUrl(`${id}/${i + 1}.jpg`);

        const updated = [...items];
        updated[modalIndex].images[i] = `${data.publicUrl}?r=${Date.now()}`;
        setItems(updated);
      }

      alert("Item salvo!");
      setModalIndex(null);
    } catch (err) {
      alert(err.message || "Erro ao salvar item.");
    } finally {
      setIsSaving(false);
    }
  }

  // ============================================================
  // Deletar item
  // ============================================================
  async function deleteItem() {
    const item = items[modalIndex];

    if (!item.id) {
      setItems(items.filter((_, i) => i !== modalIndex));
      setModalIndex(null);
      return;
    }

    if (!confirm("Tem certeza que deseja excluir?")) return;

    await supabase.storage.from("catalog-images").remove([
      `${item.id}/1.jpg`,
      `${item.id}/2.jpg`,
      `${item.id}/3.jpg`,
    ]);

    await supabase.from("catalog").delete().eq("id", item.id);

    setItems(items.filter((_, i) => i !== modalIndex));
    setModalIndex(null);
  }

  // ============================================================
  // UI
  // ============================================================
  return (
    <div className="p-6 space-y-5">
      <h1 className="text-xl font-bold">Catálogo</h1>

      <div className="grid grid-cols-5 gap-5">
        {items.map((item, i) => (
          <div
            key={i}
            onClick={() => openModal(i)}
            className="cursor-pointer relative"
          >
            <div className="absolute top-1 left-1 bg-white px-1 rounded text-xs">
              {item.id ? item.id.slice(0, 8) : "novo"}
            </div>

            <div className="w-28 h-28 border rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden hover:ring-2 hover:ring-blue-500">
              {item.images[0] ? (
                typeof item.images[0] === "string" ? (
                  <img src={item.images[0]} className="object-cover w-full h-full" />
                ) : (
                  <img
                    src={URL.createObjectURL(item.images[0])}
                    className="object-cover w-full h-full"
                  />
                )
              ) : (
                <span className="text-3xl text-gray-400">+</span>
              )}
            </div>
          </div>
        ))}

        <button
          onClick={addItem}
          className="w-28 h-28 border border-black rounded-lg flex items-center justify-center text-3xl hover:bg-gray-200"
        >
          +
        </button>
      </div>

      {/* Modal */}
      {modalIndex !== null && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-[400px] space-y-4 shadow-xl">
            <h2 className="text-lg font-bold">Editar Item</h2>

            {/* ID EDITÁVEL */}
            <input
              className="w-full border p-2 rounded"
              value={items[modalIndex].id ?? ""}
              onChange={(e) => {
                const updated = [...items];
                updated[modalIndex].id = e.target.value;
                updated[modalIndex].existing = false; 
                setItems(updated);
              }}
              placeholder="ID (opcional)"
            />

            <input
              type="text"
              placeholder="Nome"
              className="w-full border p-2 rounded"
              value={items[modalIndex].name}
              onChange={(e) => {
                const updated = [...items];
                updated[modalIndex].name = e.target.value;
                setItems(updated);
              }}
            />

            {/* SELECT DE CATEGORIA */}
            <select
              className="w-full border p-2 rounded"
              value={items[modalIndex].category}
              onChange={(e) => {
                const updated = [...items];
                updated[modalIndex].category = e.target.value;
                setItems(updated);
              }}
            >
              <option value="">Selecione uma categoria</option>
              {CATEGORY_OPTIONS.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            {/* Imagens */}
            <div className="grid grid-cols-3 gap-3">
              {items[modalIndex].images.map((img, idx) => (
                <div key={idx} className="relative">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeImage(idx);
                    }}
                    className="absolute top-0 right-0 bg-red-600 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs"
                  >
                    ✕
                  </button>

                  <div
                    onClick={() => selectFile(idx)}
                    className="w-24 h-24 border rounded bg-gray-100 flex items-center justify-center overflow-hidden cursor-pointer"
                  >
                    {img ? (
                      typeof img === "string" ? (
                        <img src={img} className="object-cover w-full h-full" />
                      ) : (
                        <img
                          src={URL.createObjectURL(img)}
                          className="object-cover w-full h-full"
                        />
                      )
                    ) : (
                      <span className="text-gray-400">+</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <input
              ref={fileInput}
              type="file"
              accept="image/*"
              onChange={handleSelectFile}
              className="hidden"
            />

            <div className="flex justify-between pt-3">
              <button
                onClick={deleteItem}
                className="px-4 py-2 bg-red-600 text-white rounded"
              >
                Excluir
              </button>

              <div className="flex gap-2">
                <button
                  onClick={() => setModalIndex(null)}
                  className="px-4 py-2 bg-gray-200 rounded"
                >
                  Fechar
                </button>

                <button
                  onClick={saveItem}
                  disabled={isSaving}
                  className={`px-4 py-2 rounded text-white ${
                    isSaving
                      ? "bg-green-400 cursor-not-allowed"
                      : "bg-green-600 hover:bg-green-700"
                  }`}
                >
                  {isSaving ? "Salvando..." : "Salvar"}
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
