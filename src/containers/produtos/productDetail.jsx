"use client";

import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const ProductDetail = ({ products }) => {
  if (!products) {
    return <div className="text-center py-20">Produto não encontrado.</div>;
  }

  const [open, setOpen] = useState(null);

  // ignora a imagem 0 (capa)
  const galleryImages = products.images.slice(1);
  const [imageSelect, setImageSelect] = useState(0);

  const prevImage = () => {
    setImageSelect((prev) =>
      prev === 0 ? galleryImages.length - 1 : prev - 1
    );
  };

  const nextImage = () => {
    setImageSelect((prev) =>
      prev === galleryImages.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div>
      {/* TÍTULO */}
      <div className="flex items-center justify-between gap-[54px] px-[20px] md:px-[65px] pb-[30px]">
        <div className="md:hidden flex-1 h-px bg-black"></div>
        <p className="text-[18px] md:text-[24px] md:w-[150px] font-bold">
          {products.name.toUpperCase()}
        </p>
        <div className="flex-1 md:w-[600px] md:mr-[100px] h-px bg-black"></div>
      </div>

      <div className="bg-[#D9D9D9] pt-[60px] md:pt-[80px] pb-[120px] md:pb-[180px] relative">
        <div className="px-[40px] md:px-[65px] flex flex-col-reverse md:flex-row md:justify-between items-center md:items-start gap-16 md:gap-0">

          {/* FAQ */}
          <ul className="w-full md:w-[500px] mt-[400px] md:mt-0">
            {products.faq.map((item, index) => (
              <li
                key={index}
                className="
                  my-3 md:my-7
                  cursor-pointer
                  bg-[#131413]
                  text-[#3BCF41]
                  rounded-[30px] md:rounded-[40px]
                  p-3
                  w-full
                  relative
                  text-center
                "
                onClick={() => setOpen(open === index ? null : index)}
              >
                <p className="text-[15px] md:text-[24px] font-semibold">
                  <span className="font-bold absolute left-5">
                    {open === index ? "-" : "+"}
                  </span>
                  {item.question}
                </p>

                <div
                  className={`overflow-hidden transition-all duration-500 ${
                    open === index ? "max-h-40 mt-4" : "max-h-0"
                  }`}
                >
                  <p className="text-[15px] md:text-[18px] text-start p-4">
                    {item.answer}
                  </p>
                </div>
              </li>
            ))}

            <li className="mt-12">
              <button className="text-[18px] md:text-[24px] font-semibold text-[#131413] bg-[#3BCF41] rounded-[30px] md:rounded-[40px] p-3 w-full">
                Faça seu orçamento!
              </button>
            </li>

            <li className="w-full text-center mt-5">
              <a className="underline text-[12px] md:text-[20px]" href="">
                Baixar tabela de medidas
              </a>
            </li>
          </ul>

          {/* IMAGENS */}
          <div
            className="
              w-full md:w-[500px]
              absolute
              px-[40px]
              top-[-20px]
              md:top-[-80px]
              md:right-[125px]
            "
          >
            {/* Imagem principal */}
            <div className="relative overflow-hidden w-[260px] mx-auto md:w-auto md:mx-0 rounded-[30px] md:rounded-[40px] border-[3px] md:border-[10px] border-black">

              {/* seta esquerda */}
              <button
                onClick={prevImage}
                className="absolute left-3 top-1/2 -translate-y-1/2 z-10 bg-black/70 text-[#3BCF41] p-2 rounded-full hover:scale-110 transition"
              >
                <FaChevronLeft />
              </button>

              {/* seta direita */}
              <button
                onClick={nextImage}
                className="absolute right-3 top-1/2 -translate-y-1/2 z-10 bg-black/70 text-[#3BCF41] p-2 rounded-full hover:scale-110 transition"
              >
                <FaChevronRight />
              </button>

              <img
                className="
                  object-cover
                  w-[260px] md:w-[500px]
                  h-[360px] md:h-[600px]
                  transition-transform duration-300
                  hover:scale-105
                "
                src={galleryImages[imageSelect].image}
                alt={products.name}
              />
            </div>

            {/* Miniaturas */}
            <ul className="w-full flex gap-4 md:gap-5 mt-4 md:mt-5 justify-center md:justify-start">
              {galleryImages.map((img, idx) => (
                <li
                  key={idx}
                  onClick={() => setImageSelect(idx)}
                  className={`
                    w-[60px] h-[60px]
                    md:w-[100px] md:h-[100px]
                    rounded-[16px] md:rounded-[20px]
                    border-[2px] md:border-[5px]
                    cursor-pointer
                    overflow-hidden
                    transition-all
                    ${imageSelect === idx ? "border-[#3BCF41]" : "border-black"}
                  `}
                >
                  <img
                    src={img.image}
                    className="w-full h-full object-cover hover:scale-110 transition"
                    alt=""
                  />
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
