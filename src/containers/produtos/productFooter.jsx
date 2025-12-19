"use client";

import { useParams } from "next/navigation";
import { items } from "../home/products";
import Link from "next/link";

const ProductFooter = () => {
  const params = useParams();
  const currentProductName = params?.name;

  return (
    <div className="py-[80px] md:py-[120px] px-[20px] md:px-[65px] relative">
      {/* Rabisco */}
      <img
        src="/assets/rabisco.png"
        className="absolute top-[-40px] md:top-[-60px] h-20 md:h-35"
        alt=""
      />

      {/* Título */}
      <div className="flex items-center gap-[20px] md:gap-[54px] pb-[30px]">
        <p className="text-[12px] md:text-[24px] md:w-[280px] font-regular">
          Outros produtos
        </p>
        <div className="flex-1 h-px bg-black"></div>
      </div>

      {/* Lista */}
 <ul className="flex  flex-col md:flex-row gap-8  md:px-0 px-10 md:justify-between">
  {items.map((products, index) => (
    <li
      key={index}
      className={`
        w-[210px] md:w-[380px]
        border-[2px]
        rounded-[32px] md:rounded-[40px]
        ${
          products.name === currentProductName
            ? "bg-black text-[#3BCF41] border-black"
            : "text-black bg-[#38C13E] border-[#38C13E]"
        }
      `}
    >
      <Link href={`/produtos/${products.name}`} className="block">

        {/* IMAGEM */}
        <div className="w-[200px] h-[200px] md:w-full md:h-[350px] mx-auto relative">
          <div className="bg-[#3bcf4088] absolute inset-0 rounded-[32px] md:rounded-[40px]"></div>
          <img
            className="w-full h-full rounded-[32px] md:rounded-[40px] object-cover"
            src={products.pb}
            alt=""
          />
        </div>

        {/* NOME */}
        <div className="py-3 md:py-5 rounded-b-[32px] md:rounded-b-[40px] text-center font-bold text-[15px] md:text-[20px]">
          {products.name.toUpperCase()}
        </div>

      </Link>
    </li>
  ))}
</ul>


      {/* Ícone */}
      <img
        className="absolute right-[20px] md:right-[65px] bottom-[-10px] md:bottom-[-20px] h-14 md:h-20"
        src="/assets/icon.png"
        alt=""
      />
    </div>
  );
};

export default ProductFooter;
