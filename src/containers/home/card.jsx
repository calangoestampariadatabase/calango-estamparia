const Card = () => {
  const content = [
    {
      id: "01",
      title: "Variedade que combina com você",
      description: "Escolha do nosso catálogo ou crie algo exclusivo.",
    },
    {
      id: "02",
      title: "Qualidade que dura",
      description: "Camisas e moletons resistentes, estampas que não desbotam.",
    },
    {
      id: "03",
      title: "Atendimento fácil e humanizado",
      description:
        "Nossa equipe te ajuda em cada passo, tornando o processo leve.",
    },
    {
      id: "04",
      title: "Entrega rápida e confiável",
      description:
        "Receba seu pedido no prazo, sem stress e com cuidado.",
    },
    {
      id: "05",
      title: "Momentos que ficam para sempre",
      description:
        "Cada peça celebra e eterniza sua turma, formatura ou projeto.",
    },
  ];

  return (
    <div className="py-[120px] md:py-[160px] lg:py-[200px] px-[0px] md:px-[40px] lg:px-[65px] relative">
  
<img className="absolute  h-30 top-[-50] md:h-50 left-20 " src="/assets/coroa.png" alt="" />
<img className="absolute md:h-auto h-30 bottom-[-80] right-20" src="/assets/coracao.png" alt="" />

      {/* layout original preservado */}
      <ul className="flex flex-col md:flex-row justify-between items-center flex-wrap gap-y-[50px]">
        <li className="w-full md:w-[340px] lg:w-[370px] p-[16px] md:p-[18px] lg:p-[20px] mb-[20px] rounded-[10px]">
          <h2 className="text-[22px] md:text-[25px] lg:text-[28px] font-bold mb-[10px]">
            Porque escolher a Calango?
          </h2>
          <p className="text-[16px] md:text-[18px] lg:text-[20px]">
            05 motivos pelos quais valem a pena confiar em nós:
          </p>
        </li>

        {content.map((item) => (
          <li
            key={item.id}
            className="w-[300px] md:w-[340px] lg:w-[370px] h-[210px] md:h-[225px] lg:h-[240px] p-[16px] md:p-[18px] lg:p-5 rounded-[32px] lg:rounded-[40px] border-2 border-[#000000] hover:bg-[#131413] hover:text-[#3BCF41] transition-all duration-300"
          >
            <p className="pb-2 text-[14px] md:text-[16px] lg:text-[18px] font-regular">
              {item.id}
            </p>

            <h2 className="text-[18px] md:text-[20px] lg:text-[22px] font-bold mb-[10px]">
              {item.title}
            </h2>

            <p className="text-[15px] md:text-[17px] lg:text-[18px]">
              {item.description}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Card;

