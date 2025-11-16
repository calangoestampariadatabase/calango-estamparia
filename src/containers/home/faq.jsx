"use client";

import { useState } from "react"

const Faq = () => {

    const faqs = [
        {
            question: "Como faço para personalizar meus produtos?",
            answer: "Você pode personalizar seus produtos através do nosso site, escolhendo entre diversas opções de design, cores e tamanhos."
        },
        {
            question: "Como faço para personalizar meus produtos?",
            answer: "Você pode personalizar seus produtos através do nosso site, escolhendo entre diversas opções de design, cores e tamanhos."
        },
        {
            question: "Como faço para personalizar meus produtos?",
            answer: "Você pode personalizar seus produtos através do nosso site, escolhendo entre diversas opções de design, cores e tamanhos."
        },
        {
            question: "Como faço para personalizar meus produtos?",
            answer: "Você pode personalizar seus produtos através do nosso site, escolhendo entre diversas opções de design, cores e tamanhos."
        },
        {
            question: "Como faço para personalizar meus produtos?",
            answer: "Você pode personalizar seus produtos através do nosso site, escolhendo entre diversas opções de design, cores e tamanhos."
        },
    ]

    const [open, setOpen] = useState(null);

    const openFaq = (index) => {
        setOpen(open === index ? null : index);
    }

    return (
        <div className="px-[65px] py-40 flex justify-between items-center w-full relative">

            <div className="w-[60%]">
                <p className="text-[28px] w-[900px] mb-20">VOCÊ PERGUNTA E O CALANGO RESPONDE!</p>

                <ul>
                    {faqs.map((faq, index) => (
                        <li key={index} className="my-10 cursor-pointer"  onClick={() => {openFaq(index)}}>
                            <p className=" text-[24px] font-medium"><span className="mr-10 font-bold text-[#1F9223]">{open === index ? "-" : "+"}</span> {faq.question}</p>
                             <div
                                className={`overflow-hidden transition-all duration-500 ease-in-out ${open === index ? "max-h-40 mt-4" : "max-h-0"
                                    }`}
                            >
                                <p className="font-normal text-[20px] border-b border-[#1F9223] pb-10">{faq.answer}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            <img className="h-70 " src="/assets/faq.png" alt="" />
        </div>
    )
}

export default Faq;