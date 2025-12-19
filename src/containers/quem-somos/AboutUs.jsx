const AboutUs = () => {
  return (
    <div className="flex flex-col-reverse md:flex-row justify-between relative">
      <div className="md:w-[50%] w-full relative pb-20 md:pb-80 px-[30px] md:px-0">
        <h1 className="hidden md:block font-bold text-[32px]">PRAZER, SOMOS A CALANGO®</h1>
        <p className="md:text-[20px] mt-10 mb-5 text-[13px] ">
          Na Calango Estamparia, acreditamos que uma estampa vai muito além de
          uma imagem no tecido, ela é uma lembrança, um símbolo de quem somos e
          de momentos que vale a pena guardar.
        </p>

        <p className="md:text-[20px] text-[13px]">
          Somos uma empresa especializada em peças personalizadas para pessoas,
          grupos, escolas, universidades e equipes que querem transformar
          ocasiões importantes em lembranças duradouras. Do design à produção,
          nossa missão é unir qualidade, atenção e criatividade para que cada
          estampa conte sua história do jeito que você imaginou.
        </p>

        <img className="hidden md:block mt-10" src="/assets/grafite-about.png" alt="" />
         <img className="md:hidden block mt-10 mx-auto" src="/assets/desenho-about2.png" alt="" />
      </div>
      <div className="relative z-[5]">
         <h1 className="md:hidden pt-5 block font-bold text-[18px] text-center">PRAZER, SOMOS A CALANGO®</h1>
        <img
          className="mt-[30px] md:mt-0 mx-auto md:mx-0 relative z-[5] border-[3px] h-[330px] w-[275px] md:h-[600px] md:w-[500px] object-cover rounded-[40px] border-[#131413] md:border-[10px]"
          src="/images/about.jpg"
          alt=""
        />

        <img
          className="absolute md:right-10 md:bottom-[200px] h-1 md:h-auto bottom-[-20px] right-[60px]"
          src="/assets/pontos.png"
          alt=""
        />

        <img
          className="md:h-40 h-20 absolute top-[60px] right-[20] md:top-[-50px] md:right-[-30]"
          src="/assets/desenho-about.png"
          alt=""
        />
      </div>
      <img className="absolute h-[30px] md:h-[90px] md:bottom-[-30px] md:right-0 right-5 bottom-5" src="/assets/icon.png" alt="" />
    </div>
  );
};

export default AboutUs;
