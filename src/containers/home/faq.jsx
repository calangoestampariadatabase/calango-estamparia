"use client";

import { useState } from "react";

const Faq = () => {
  const faqs = [
    {
      question: "Como faço para personalizar meus produtos?",
      answer:
        "Você pode personalizar seus produtos através do nosso site, escolhendo entre diversas opções de design, cores e tamanhos.",
    },
    {
      question: "Como faço para personalizar meus produtos?",
      answer:
        "Você pode personalizar seus produtos através do nosso site, escolhendo entre diversas opções de design, cores e tamanhos.",
    },
    {
      question: "Como faço para personalizar meus produtos?",
      answer:
        "Você pode personalizar seus produtos através do nosso site, escolhendo entre diversas opções de design, cores e tamanhos.",
    },
    {
      question: "Como faço para personalizar meus produtos?",
      answer:
        "Você pode personalizar seus produtos através do nosso site, escolhendo entre diversas opções de design, cores e tamanhos.",
    },
    {
      question: "Como faço para personalizar meus produtos?",
      answer:
        "Você pode personalizar seus produtos através do nosso site, escolhendo entre diversas opções de design, cores e tamanhos.",
    },
  ];

  const [open, setOpen] = useState(null);

  const openFaq = (index) => {
    setOpen(open === index ? null : index);
  };

  return (
    <div className="px-[20px] md:px-[40px] lg:px-[65px] py-[120px] md:py-[160px] lg:py-40 flex flex-col lg:flex-row justify-between items-center w-full relative gap-20">
      {/* Conteúdo */}
      <div className="w-full lg:w-[60%]">
        <p className="text-[22px] md:text-[25px] lg:text-[28px] w-full lg:w-[900px] mb-12 lg:mb-20">
          VOCÊ PERGUNTA, A CALANGO RESPONDE!
        </p>

        <ul>
          {faqs.map((faq, index) => (
            <li
              key={index}
              className="my-8 md:my-10 cursor-pointer"
              onClick={() => openFaq(index)}
            >
              <p className="text-[18px] md:text-[22px] lg:text-[24px] font-medium">
                <span className="mr-6 md:mr-10 font-bold text-[#1F9223]">
                  {open === index ? "-" : "+"}
                </span>
                {faq.question}
              </p>

              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  open === index ? "max-h-40 mt-4" : "max-h-0"
                }`}
              >
                <p className="font-normal text-[16px] md:text-[18px] lg:text-[20px] border-b border-[#1F9223] pb-6 md:pb-10">
                  {faq.answer}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Imagem */}
      <img
        className="h-[220px] md:h-[300px] lg:h-[350px]"
        src="/assets/faq.png"
        alt=""
      />
    </div>
  );
};

export default Faq;
