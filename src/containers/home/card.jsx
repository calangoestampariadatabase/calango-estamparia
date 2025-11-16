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
            description: "Nossa equipe te ajuda em cada passo, tornando o processo leve.",

        },
        {
            id: "04",
            title: "Entrega rápida e confiável",
            description: "Receba seu pedido no prazo, sem stress e com cuidado.",

        },
        {
            id: "05",
            title: "Momentos que ficam para sempre",
            description: "Cada peça celebra e eterniza sua turma, formatura ou projeto.",

        },

    ]

    return (
     <div className="py-[200px] px-[65px] relative">

<img className="absolute top-[-50] h-50 left-20 " src="/assets/coroa.png" alt="" />
<img className="absolute bottom-[-80] right-20" src="/assets/coracao.png" alt="" />


  <ul className="flex justify-between items-center flex-wrap gap-y-[50px]">
    <li className="w-[370px] p-[20px] mb-[20px] rounded-[10px] ">
      <h2 className="text-[28px] font-bold mb-[10px]">Porque escolher a Calango?</h2>
      <p className="text-[20px]">
        05 motivos pelos quais valem a pena confiar em nós:
      </p>
    </li>

    {content.map((item) => (
      <li
        key={item.id}
        className="w-[370px] h-[240px] p-5 rounded-[40px] border-2 border-[#000000] hover:bg-[#131413]  hover:text-[#3BCF41] transition-all duration-400 "
      >
        <p className="pb-2 text-[18px] font-regular">{item.id}</p>
        <h2 className="text-[22px] font-bold mb-[10px]">{item.title}</h2>
        <p className="text-[18px]">{item.description}</p>
      </li>
    ))}
  </ul>
</div>

    )
}

export default Card;