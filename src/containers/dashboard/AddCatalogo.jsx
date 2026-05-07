"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function AddCatalogo() {
  const [items, setItems] = useState([]);
  const [modalIndex, setModalIndex] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  const MAX_ITEMS = 600;
  const MAX_IMAGES = 3;

  const CATEGORY_OPTIONS = [
    "Canecas",
    "Interclasse",
    "Terceirão",
    "Esportivo",
    "Igreja",
    "Nono Ano",
    "Faculdade",
    "Academia",
    "Personalizados",
  ];

  // ============================================================
  // Carregar catálogo existente
  // ============================================================
  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from("catalog")
        .select("id, name, category, images");

      if (!data) return;

      const mapped = data.map((c) => ({
        ...c,
        existing: true,
        images: c.images?.length
          ? [...c.images, ...Array(MAX_IMAGES - c.images.length).fill("")]
          : Array(MAX_IMAGES).fill(""),
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
      alert("Você atingiu o limite máximo de 600 itens.");
      return;
    }

    setItems((prev) => [
      ...prev,
      {
        id: "",
        name: "",
        category: "",
        existing: false,
        images: Array(MAX_IMAGES).fill(""),
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
  // Salvar item
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

    const filteredImages = item.images.filter(
      (img) => img && img.trim() !== ""
    );

    try {
      if (!item.existing) {
        const { data, error } = await supabase
          .from("catalog")
          .insert([
            {
              id: item.id || undefined,
              name: item.name,
              category: item.category,
              images: filteredImages,
            },
          ])
          .select()
          .single();

        if (error) throw error;

        const updated = [...items];
        updated[modalIndex] = {
          ...data,
          existing: true,
          images: [
            ...filteredImages,
            ...Array(MAX_IMAGES - filteredImages.length).fill(""),
          ],
        };

        setItems(updated);
      } else {
        const { error } = await supabase
          .from("catalog")
          .update({
            name: item.name,
            category: item.category,
            images: filteredImages,
          })
          .eq("id", item.id);

        if (error) throw error;
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
                <img
                  src={item.images[0]}
                  className="object-cover w-full h-full"
                />
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
          <div className="bg-white p-6 rounded-xl w-[420px] space-y-4 shadow-xl">
            <h2 className="text-lg font-bold">Editar Item</h2>

            {/* ID */}
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

            {/* Nome */}
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

            {/* Categoria */}
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

            {/* Links das Imagens */}
            <div className="space-y-2">
              {items[modalIndex].images.map((img, idx) => (
                <input
                  key={idx}
                  type="text"
                  placeholder={`Link da imagem ${idx + 1}`}
                  className="w-full border p-2 rounded"
                  value={img}
                  onChange={(e) => {
                    const updated = [...items];
                    updated[modalIndex].images[idx] = e.target.value;
                    setItems(updated);
                  }}
                />
              ))}
            </div>

            {/* Botões */}
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
