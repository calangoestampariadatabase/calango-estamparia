"use client";

import { useState } from "react";

const Faq = () => {
  const faqs = [
    {
      question: "Faz envio para todo o Brasil?",
      answer:
        "Sim!! Fazemos envio para todo território nacional.",
    },
    {
      question: "Qual a forma de pagamento? Aceita cartão?",
      answer:
        "Aceitamos Pix, Cartão de crédito, Transferência Bancária e Boleto.\n\nO pagamento pode ser feito em duas vezes: 50% do valor total para o pedido entrar em produção e o restante quando o pedido estiver pronto para o envio. O pedido é enviado após o pagamento total do pedido.\n\nLembrando que o pagamento será feito por apenas uma pessoa, que fica responsável por recolher o valor dos colegas e acertar com a empresa.",
    },
    {
      question: "Como faço um orçamento?",
      answer:
        "Entre em contato com a gente através do nosso canal de atendimento e solicite um orçamento personalizado!!",
    },
    {
      question: "Qual o prazo de entrega?",
      answer:
        "O prazo varia entre 20 a 35 dias úteis dependendo da época do ano, podendo ser antes ou depois. Consulte nosso time de atendimento.",
    },
    {
      question: "Não serviu meu uniforme, posso trocar?",
      answer:
        "Não é possível efetuar troca ou devolução de produto personalizado, pois não é possível revender ou reutilizar.",
    },
  ];  

  const [open, setOpen] = useState(null);

  const openFaq = (index) => {
    setOpen(open === index ? null : index);
  };

  return (
    <div id="faq" className=" px-[20px] md:px-[40px] lg:px-[65px] py-[50px] md:py-[160px] lg:py-40 flex flex-col lg:flex-row justify-between items-center w-full relative gap-20">
      {/* Conteúdo */}
      <div className="w-full lg:w-[60%]">
        <p className="text-[13px] md:text-[25px] lg:text-[28px] w-full lg:w-[900px] mb-12 lg:mb-20 bounded">
          VOCÊ PERGUNTA, A CALANGO RESPONDE!
        </p>

        <ul>
          {faqs.map((faq, index) => (
            <li
              key={index}
              className="my-5 md:my-10 cursor-pointer"
              onClick={() => openFaq(index)}
            >
              <p className="text-[13px] md:text-[22px] lg:text-[24px] font-medium">
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
                <p className="font-normal text-[13px] md:text-[18px] lg:text-[20px] border-b border-[#1F9223] pb-6 md:pb-10">
                  {faq.answer}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Imagem */}
      <img
        className="h-[100px] md:h-[300px] lg:h-[350px]"
        src="/assets/faq.png"
        alt=""
      />
    </div>
  );
};

export default Faq;
