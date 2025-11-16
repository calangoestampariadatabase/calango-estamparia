"use client";

import { useState } from "react";

const ProductDetail = ({ products }) => {
  if (!products) {
    return <div className="text-center py-20">Produto não encontrado.</div>;
  }

  const [open, setOpen] = useState(null);
  const [imageSelect, setImageSelect] = useState(0);

  const selectImage = (idx) => {
    setImageSelect(idx);
  };

  const openFaq = (index) => {
    setOpen(open === index ? null : index);
  };

  return (
    <div>
      <div className="flex items-center gap-[54px] px-[65px] pb-[30px]">
        <p className="text-[24px] w-[150px] font-bold">
          {products.name.toUpperCase()}
        </p>
        <div className="w-[600px] h-px bg-black"></div>
      </div>

      <div className="bg-[#D9D9D9] pt-[80px] pb-[180px] relative">
        <div className="px-[65px] flex justify-between items-center">

          {/* FAQ */}
          <ul className="w-[500px]">
            {products.faq.map((item, index) => (
              <li
                key={index}
                className="my-7 cursor-pointer bg-[#131413] text-[#3BCF41] rounded-[40px] p-3 w-[500px] relative text-center"
                onClick={() => openFaq(index)}
              >
                <p className="text-[24px] font-semibold">
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
                  <p className="font-normal text-[18px] text-start p-5">
                    {item.answer}
                  </p>
                </div>
              </li>
            ))}

            <li className="mt-10">
              <button className="text-[24px] font-semibold cursor-pointer text-[#131413] bg-[#3BCF41] rounded-[40px] p-3 w-full text-center">
                Faça seu orçamento!
              </button>
            </li>

            <li className="w-full text-center mt-5">
              <a className="underline text-[20px]" href="">
                Baixar tabela de medidas
              </a>
            </li>
          </ul>

          {/* IMAGENS */}
          <div className="w-[500px] absolute top-[-80px] right-[125px]">
            
            {/* Imagem principal com zoom */}
            <div className="overflow-hidden rounded-[40px] border-[10px] border-black">
              <img
                className="object-cover w-[500px] h-[600px] transition-transform duration-300 hover:scale-105"
                src={products.images[imageSelect].image}
                alt={products.name}
              />
            </div>

            {/* Miniaturas */}
            <ul className="w-full flex gap-5 mt-5">
              {products.images.map((img, idx) => (
                <li
                  key={idx}
                  onClick={() => selectImage(idx)}
                  className={`w-[100px] h-[100px] rounded-[20px] border-[5px] cursor-pointer overflow-hidden transition-all ${
                    imageSelect === idx
                      ? "border-[#3BCF41]"
                      : "border-black"
                  }`}
                >
                  <img
                    src={img.image}
                    className="w-full h-full object-cover rounded-[20px] transition-transform duration-300 hover:scale-110"
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
