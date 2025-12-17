const Desc = () => {
  return (
    <div
      className="
        relative mx-auto text-center
        py-[80px] md:py-[150px]
        w-full md:w-[700px]
        px-4 md:px-0
        text-[20px] md:text-[32px]
      "
    >
      {/* BRILHOS */}
      <img
        src="/assets/brilho2.png"
        className="md:h-auto h-10 absolute top-10 right-4 md:top-20 md:right-10"
        alt=""
      />
      <img
        src="/assets/brilho1.png"
        className="absolute top-50 md:top-35 left-0 md:h-auto h-10"
        alt=""
      />
      <img src="/assets/grafite2.png" className="absolute md:h-auto h-15 md:top-[-30] left-[0] top-[-10] md:left-[-260] z-[1]" alt="" />  

      {/* TEXTO */}
      <p className="mx-auto md:text-[32px]  w-full md:w-[500px]">
        IDEIA BOA VIRA ESTAMPA. ESTAMPA BOA VIRA LEMBRANÇA.
      </p>

      <p className="text-[14px] md:text-[18px] font-extralight mt-4 md:mt-5">
        PERSONALIZADOS, TERCEIRÃO, UNIVERSIDADE, INTERCLASSE, 9º ANO
      </p>
    </div>
  );
};

export default Desc;



  