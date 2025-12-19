"use client";

import { useEffect, useState } from "react";
import Slider from "react-slick";
import { supabase } from "@/lib/supabaseClient";

/* Icons */
import { TbMugFilled } from "react-icons/tb";
import { IoIosFootball } from "react-icons/io";
import { IoSchool } from "react-icons/io5";
import { MdSportsHandball } from "react-icons/md";
import { FaCross, FaBoxOpen, FaPencilAlt } from "react-icons/fa";
import { LuNotebookText } from "react-icons/lu";
import { LiaUniversitySolid } from "react-icons/lia";

/* Slick */
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import PageLoader from "@/components/pageLoader";

const categorias = [
  { nome: "Todos", icon: <FaBoxOpen /> },
  { nome: "Canecas", icon: <TbMugFilled /> },
  { nome: "Interclasse", icon: <IoIosFootball /> },
  { nome: "Terceirão", icon: <IoSchool /> },
  { nome: "Esportivo", icon: <MdSportsHandball /> },
  { nome: "Igreja", icon: <FaCross /> },
  { nome: "Nono Ano", icon: <LuNotebookText /> },
  { nome: "Faculdade", icon: <LiaUniversitySolid /> },
  { nome: "Personalizados", icon: <FaPencilAlt /> },
];

/* Slider interno dos cards */
const cardSliderSettings = {
  dots: false,
  arrows: true,
  infinite: true,
  speed: 400,
  slidesToShow: 1,
  slidesToScroll: 1,
  className: "card-slider",
};

const modalSliderSettings = {
  dots: false,
  arrows: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  className: "modal-slider",
};

export default function CatalogoSection() {
  const [produtos, setProdutos] = useState([]);
  const [categoriaAtiva, setCategoriaAtiva] = useState("Todos");
  const [loading, setLoading] = useState(true);
  const [modalItem, setModalItem] = useState(null);

  useEffect(() => {
    async function load() {
      const { data, error } = await supabase
        .from("catalog")
        .select("id, name, category");

      if (error) {
        console.error(error.message);
        return;
      }

      const mapped = data.map((item) => {
        const images = [1, 2, 3].map((i) => {
          const { data } = supabase.storage
            .from("catalog-images")
            .getPublicUrl(`${item.id}/${i}.jpg`);

          return `${data.publicUrl}?r=${Date.now()}`;
        });

        return { ...item, images };
      });

      setProdutos(mapped);
      setLoading(false);
    }

    load();
  }, []);

  const filtrados =
    categoriaAtiva === "Todos"
      ? produtos
      : produtos.filter((p) => p.category === categoriaAtiva);

  const categoria = modalItem
    ? categorias.find((cat) => cat.nome === modalItem.category)
    : null;

  return (
    <section className="md:px-[65px] pb-20">
      {/* HEADER */}
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl font-bold px-4 md:px-0 lg:px-0">Catalogo</h1>
        <span className="w-[80%] mx-4 md:px-0 lg:px-0 bg-[#131413] h-[2px]"></span>
      </div>

     <ul
  className="
    flex
    gap-4

    /* MOBILE + TABLET */
    overflow-x-auto
    whitespace-nowrap
    px-2

    /* DESKTOP */
    lg:overflow-visible
    lg:whitespace-normal
    lg:justify-center

    no-scrollbar
  "
>

        {categorias.map((cat) => (
        <li
  key={cat.nome}
  onClick={() => setCategoriaAtiva(cat.nome)}
  className={`
    flex
    flex-col
    items-center
    cursor-pointer

    min-w-[90px]
    sm:min-w-[100px]
    lg:min-w-0

    my-6
    ${
      categoriaAtiva === cat.nome
        ? "text-[#3BCF41]"
        : "text-[#131413] "
    }
  `}
>

            <div className={`text-4xl p-5 rounded-full border-2 mb-2 ${
      categoriaAtiva === cat.nome? "bg-[#131413]"
        : "bg-[#3BCF41] "
    }`}>
              {cat.icon}
            </div>
            <span className="text-sm text-[#131413] ">{cat.nome}</span>
          </li>
        ))}
      </ul>

      {/* GRID */}
      <div
        className="
  grid
  grid-cols-1
  sm:grid-cols-2
  lg:grid-cols-4
  gap-6
  mt-8
"
      >
        {loading ? (
          <PageLoader />
        ) : filtrados.length === 0 ? (
        <div className="w-full h-full flex items-center justify-center">Nenhum produto encontrado.</div>  
        ) : (
          filtrados.map((item) => (
            <div
              key={item.id}
              className="group rounded-xl overflow-hidden cursor-pointer px-2 md:px-0"
            >
              {/* CAROUSEL DO CARD */}
              <Slider {...cardSliderSettings}>
                {item.images.map((img, i) => (
                  <div key={i} className="relative h-full w-full">
                    <img
                      src={img}
                      alt={item.name}
                      className="w-full h-full object-cover rounded-xl"
                    />

                    {/* OVERLAY */}
                    <div
                      onClick={() => setModalItem(item)}
                      className="
             
  rounded-xl
  absolute inset-0
  bg-gradient-to-t from-black/80 via-black/40 to-transparent
  flex flex-col justify-end items-center
  opacity-0
  group-hover:opacity-100
  transition-opacity duration-300
  pb-5
"
                    >
                      <h3 className="text-xl font-bold line-clamp-2 text-[#3BCF41]">
                        {item.name}
                      </h3>
                      <p className="text-sm rounded-md p-1 bg-gray-300 text-[#131413] mt-1">
                        {item.id}
                      </p>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          ))
        )}
      </div>

      {/* MODAL */}
    {modalItem && (
  <div
    className="fixed inset-0 bg-[#000000cc] flex items-center justify-center z-50 px-4"
    onClick={() => setModalItem(null)}
  >
    <div
      className="
        bg-[#3BCF41]
        rounded-2xl
        w-full
        max-w-5xl
        max-h-[90vh]
        overflow-y-auto
        relative
      "
      onClick={(e) => e.stopPropagation()}
    >
      {/* FECHAR */}
      <button
        onClick={() => setModalItem(null)}
        className="
          absolute
          top-4
          right-4
          text-lg
          font-bold
          bg-[#131413]
          text-[#3BCF41]
          w-8
          h-8
          rounded-full
          flex
          items-center
          justify-center
          hover:scale-105
          transition
        "
      >
        ✕
      </button>

      <div className="p-4 md:p-6 flex flex-col lg:flex-row gap-6">
        {/* CAROUSEL */}
        <div className="w-full lg:w-[520px] shrink-0">
          <Slider {...modalSliderSettings}>
            {modalItem.images.map((img, i) => (
              <div
                key={i}
                className="
                  h-[280px]
                  sm:h-[360px]
                  lg:h-[500px]
                  rounded-xl
                  overflow-hidden
                "
              >
                <img
                  src={img}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </Slider>
        </div>

        {/* INFOS */}
        <div className="flex-1 flex flex-col gap-4">
          {categoria && (
            <div className="flex items-center gap-2 text-[#131413]">
              <span className="text-xl">{categoria.icon}</span>
              <span className="text-base font-semibold">
                {categoria.nome}
              </span>
            </div>
          )}

          <p className="text-xl md:text-2xl font-bold text-[#131413] leading-tight">
            {modalItem.name}
          </p>

          <div className="w-fit bg-[#131413] text-xs px-3 py-1 rounded-md text-[#3BCF41] font-bold">
            {modalItem.id}
          </div>  
        </div>
      </div>
    </div>
  </div>
)}

    </section>
  );
}
