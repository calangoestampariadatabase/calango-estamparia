"use client";

import { useParams } from "next/navigation";
import { items } from "../home/products";
import Link from "next/link";

const ProductFooter = () => {

    const params = useParams();
    const currentProductName = params?.name;

    return (
        <div className="py-[120px] px-[65px] relative">

            <img src="/assets/rabisco.png" className="absolute top-[-60] h-35" alt="" />

            <div className="flex items-center gap-[54px] pb-[30px]">
                <p className="text-[24px] w-[280px] font-regular">
                    Outros produtos
                </p>
                <div className="w-full h-px bg-black"></div>
            </div>

            <div>
                <ul className="flex justify-between ">

                    {items.map((products, index) => (
                        <li key={index} className={` w-[380px] border-[2px]  rounded-[40px] ${products.name === currentProductName ? "bg-black text-[#3BCF41] border-black" : "text-black bg-[#38C13E] border-[#38C13E]"}`}>
                            <Link href={`/produtos/${products.name}`} className="block">
                                <div className="w-full h-[350px] relative">
                                    <div className="bg-[#3bcf4088] absolute h-full w-full rounded-[40px]"></div>
                                    <img className="w-full h-[350px] rounded-[40px] object-cover" src={products.images[0].image} alt="" />
                                </div>
                                <div className=" py-5 rounded-b-[40px] text-center font-bold text-[20px] ">
                                    {products.name.toUpperCase()}
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
            <img className="absolute right-[65] bottom-[-20] h-20" src="/assets/icon.png" alt="" />
        </div>
    )
}


export default ProductFooter;