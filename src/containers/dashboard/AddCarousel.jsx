"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import AddCatalogo from "./AddCatalogo";

const AddCarousel = () => {
  const [images, setImages] = useState([null, null, null]);
  const [loading, setLoading] = useState(false);

  // Carrega imagens existentes
  const loadImages = async () => {
    const newImages = [];

    for (let i = 0; i < 3; i++) {
      const filePath = `slot${i + 1}.jpg`;

      const { data: listed } = await supabase.storage
        .from("carousel")
        .list("", { search: filePath });

      if (listed && listed.length > 0) {
        const { data } = supabase.storage
          .from("carousel")
          .getPublicUrl(filePath);

        // Sempre força o browser a recarregar versão atual usando timestamp único
        newImages[i] = `${data.publicUrl}?refresh=${Date.now()}`;
      } else {
        newImages[i] = null;
      }
    }

    setImages(newImages);
  };

  useEffect(() => {
    loadImages();
  }, []);

  // Upload
  const handleUpload = async (file, index) => {
    if (!file) return;
    setLoading(true);

    const filePath = `slot${index + 1}.jpg`;

    const { error } = await supabase.storage
      .from("carousel")
      .upload(filePath, file, { upsert: true });

    if (error) {
      console.error("Erro ao enviar arquivo:", error);
      setLoading(false);
      return;
    }

    // Gera URL SEM cache usando timestamp novo
    const { data } = supabase.storage.from("carousel").getPublicUrl(filePath);

    const newImages = [...images];
    newImages[index] = `${data.publicUrl}?refresh=${Date.now()}`;
    setImages(newImages);

    setLoading(false);
  };

  // Remover
  const handleDelete = async (index) => {
    setLoading(true);

    const filePath = `slot${index + 1}.jpg`;

    await supabase.storage.from("carousel").remove([filePath]);

    const newImages = [...images];
    newImages[index] = null;
    setImages(newImages);

    setLoading(false);
  };

  return (
    <div className="flex flex-col gap-4 ">
      <h2 className="text-xl font-bold">Gerenciar Carrossel</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[0, 1, 2].map((i) => (
          <div key={i} className="flex flex-col items-center gap-2 relative">
            <button
              onClick={() => handleDelete(i)}
              className="absolute top-2 right-4 bg-[#131413b2] text-white px-2 py-1 rounded-full text-xs hover:bg-[#131413] transition-all duration-300 cursor-pointer"
            >
              X
            </button>

            <div className="w-full h-[150px] border-[#131413] border-3 rounded-lg flex items-center justify-center bg-gray-100 overflow-hidden">
              {images[i] ? (
                <img
                  src={images[i]}
                  className="w-full h-full object-cover"
                  alt={`Slot ${i + 1}`}
                />
              ) : (
                <span className="text-gray-400 text-sm">Sem imagem</span>
              )}
            </div>

            <label className="cursor-pointer bg-[#131413] text-white px-3 py-2 rounded hover:bg-[#131413b2] transition-all duration-300">
              { `Escolher imagem ${i + 1}`}
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={(e) => handleUpload(e.target.files[0], i)}
              />
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddCarousel;
