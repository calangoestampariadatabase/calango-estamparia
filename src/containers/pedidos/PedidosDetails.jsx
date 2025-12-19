const PedidosDetails = () => {
  const dados = [
    {
      id: 1,
      nome: "ORÇAMENTO",
      desc: (
        <>
          {" "}
          Envie para a gente: <br />
          <br className="hidden md:block" /> produto, cor do tecido, estampas, quantidade e CEP.{" "}
        </>
      ),
    },
    {
      id: 2,
      nome: "DESIGN",
      desc: (
        <>
          {" "}
          Orçamento aprovado, hora de começar a criar! <br />
          <br  className="hidden md:block" /> É só preencher o briefing para dar início ao processo criativo.{" "}
        </>
      ),
    },
    {
      id: 3,
      nome: "CONTRATO",
      desc: "Formalizamos o pedido, conferimos todas as informações e acertamos 50% do valor para iniciar a produção.",
    },
    {
      id: 4,
      nome: "PRODUÇÃO",
      desc: "As peças entram em produção, feitas com cuidado e atenção em cada etapa.",
    },
    {
      id: 5,
      nome: "ENTREGA",
      desc: "Confira o endereço, acerte o saldo (se houver) e o pedido será enviado!",
    },
  ];

  return (
    <div className="relative py-[20px] px-[30px] md:px-[0px]">
      <h1 className="md:mb-[50px] mb-[30px] text-center md:text-start     font-bold text-[18px] md:text-[32px]">
        COMO FAZER SEU PEDIDO
      </h1>

      <img
        className="absolute right-1 bottom-45 md:right-0 md:bottom-50 h-[50px] md:h-auto"
        src="/assets/ponto2.png"
        alt=""
      />
      <img
        className="absolute left-3 bottom-115 md:left-0 md:bottom-120 h-[35px] md:h-auto"
        src="/assets/feliz.png"
        alt=""
      />
      <img
        className="absolute h-[40px] right-5 bottom-5 md:right-[-20px] md:bottom-[-40px]  md:h-auto"
        src="/assets/icon.png"
        alt=""
      />

      <div className="flex flex-col md:flex-row items-center gap-[20px] md:gap-15 md:flex-wrap justify-center mb-[100px] md:mb-[200px]">
        {dados.map((item) => (
          <div
            key={item.id}
            className="md:px-[40px] p-3 md:py-[70px] rounded-[20px] md:rounded-[40px] border-[0.5px] md:border-2 border-[#131413] md:h-[380px] md:w-[330px]"
          >
            <p className="mb-3 font-bold text-center text-[13px] md:text-[26px]">
              {item.id}. {item.nome}
            </p>
            <p className="md:text-[20px] text-[13px]">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PedidosDetails;
