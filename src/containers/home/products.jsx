import Link from "next/link";

export const items = [
  {
    name: "moletons",
    pb: "/images/moletons/pb.jpg",
    download: "/tabela-medidas-moletom.pdf",
    images: [
      {
        image: "/images/moletons/moletom1.jpg",
      },
      {
        image: "/images/moletons/moletom2.png",
      },
      {
        image: "/images/moletons/moletom3.png",
      },
      {
        image: "/images/moletons/moletom4.png",
      },
      {
        image: "/images/moletons/moletom5.jpg",
      },
    ],
    href: "",
    faq: [
      {
        question: "Composição",
        answer:
          "Nossos moletons são feitos de algodão premium, proporcionando conforto e durabilidade.",
      },
      {
        question: "Tamanhos",
        answer:
          "Oferecemos tamanhos que vão do P ao GG para atender a todas as necessidades.",
      },
      {
        question: "Cuidados",
        answer:
          "Recomendamos lavar à máquina em água fria e secar à sombra para manter a qualidade do tecido.",
      },
    ],
  },
  {
    name: "camisas",
    download: "/tabela-medidas-camisas.pdf",
    pb: "/images/camisas/pb.jpg",
    images: [
      {
        image: "/images/camisas/camisas1.jpg",
      },
      {
        image: "/images/camisas/camisas2.jpg",
      },
      {
        image: "/images/camisas/camisas3.jpg",
      },
      {
        image: "/images/camisas/camisas4.png",
      },
      {
        image: "/images/camisas/camisas5.jpg",
      },
    ],
    href: "",
    faq: [
      {
        question: "Composição",
        answer:
          "Nossos moletons são feitos de algodão premium, proporcionando conforto e durabilidade.",
      },
      {
        question: "Tamanhos",
        answer:
          "Oferecemos tamanhos que vão do P ao GG para atender a todas as necessidades.",
      },
      {
        question: "Cuidados",
        answer:
          "Recomendamos lavar à máquina em água fria e secar à sombra para manter a qualidade do tecido.",
      },
    ],
  },
  {
    name: "canecas",
    pb: "/images/canecas/pb.jpg",
    images: [
      {
        image: "/images/canecas/caneca1.jpg",
      },
      {
        image: "/images/canecas/caneca2.jpg",
      },
      {
        image: "/images/canecas/caneca3.jpg",
      },
      {
        image: "/images/canecas/caneca4.jpg",
      },
      {
        image: "/images/canecas/caneca5.jpg",
      },
    ],
    href: "",
    faq: [
      {
        question: "Composição",
        answer:
          "Nossos moletons são feitos de algodão premium, proporcionando conforto e durabilidade.",
      },
      {
        question: "Tamanhos",
        answer:
          "Oferecemos tamanhos que vão do P ao GG para atender a todas as necessidades.",
      },
      {
        question: "Cuidados",
        answer:
          "Recomendamos lavar à máquina em água fria e secar à sombra para manter a qualidade do tecido.",
      },
    ],
  },
];

const ProductsHome = () => {
  return (
    <div
      id="produtos"
      className="h-auto sm:h-[700px] md:h-[800px] lg:h-[900px] bg-[#D9D9D9] pt-[30px] sm:pt-[70px] md:pt-[85px] lg:pt-[100px] pb-[100px] sm:pb-[120px] md:pb-[140px] lg:pb-[170px] relative"
    >
      <img
        src="/assets/grafite1.png"
        className="absolute top-[-20px] sm:top-[-35px] md:top-[-40px] lg:top-[-45px] right-10 sm:right-12 md:right-14 lg:right-15 w-50 sm:w-24 md:w-28 lg:w-auto"
        alt=""
      />

      <div className="px-6 sm:px-8 md:px-12 lg:px-[65px] h-full w-full flex flex-col justify-between gap-10 sm:gap-12 md:gap-14 lg:gap-0">
        <div className="flex items-center gap-4 sm:gap-6 md:gap-8 lg:gap-[54px]">
          <p className="text-[12px] sm:text-[20px] md:text-[22px] lg:text-[24px] w-[400px] sm:w-[210px] md:w-[240px] lg:w-[270px]">
            Nossos produtos
          </p>
          <div className="w-full h-px bg-black"></div>
        </div>

        <ul className="no-scrollbar items-center flex flex-col gap-20 md:gap-0 md:flex-row md:justify-between w-full   flex-col md:flex-row py-0 md:py-0">
          {items.map((item, index) => (
            <li
              key={index}
              className="cursor-pointer h-[270px] md:h-auto w-[180px] sm:w-[300px] md:w-[330px] lg:w-[370px] flex-shrink-0 sm:flex-shrink relative group mx-2 sm:mx-0"
            >
              <Link href={`/produtos/${item.name.toLowerCase()}`}>
                <img
                  className="h-[270px] sm:h-[400px] md:h-[450px] lg:h-[500px] w-full border-[2px] md:border-8 sm:border-9 md:border-10 object-cover border-[#131413] rounded-[25px] sm:rounded-[30px] md:rounded-[35px] lg:rounded-[40px] relative z-[3]"
                  src={item.images[0].image}
                  alt=""
                />

                <div className="bg-[#131413] h-[90px] sm:h-[120px] md:h-[130px] lg:h-[140px] w-[120px] sm:w-[180px] md:w-[200px] lg:w-[220px] rounded-[25px] sm:rounded-[30px] md:rounded-[35px] lg:rounded-[40px] flex items-end justify-center py-3 sm:py-4 md:py-[15px] lg:py-[17px] text-[#3BCF41] font-bold text-[14px] sm:text-[20px] md:text-[22px] lg:text-[25px] absolute bottom-[-50px] sm:bottom-[-55px] md:bottom-[-60px] lg:bottom-[-65px] z-[2]">
                  {item.name.toUpperCase()}
                </div>

                <div className="absolute right-0 h-[50px] sm:h-[50px] md:h-[55px] lg:h-[65px] bottom-[-50px] sm:bottom-[-55px] md:bottom-[-60px] lg:bottom-[-65px] w-[130px] sm:w-[140px] md:w-[150px] lg:w-[170px] text-[#131413] underline flex justify-center items-center text-[14px] sm:text-[15px] md:text-[16px] lg:text-[18px]">
                  <span className="hidden md:block absolute z-[3] underline">
                    + Ver mais
                  </span>
                  <span className=" md:hidden right-3 absolute z-[3] underline">
                    Ver +
                  </span>
                  <div className="w-[160px] hidden md:block sm:w-[170px] md:w-[180px] lg:w-[210px] h-full bg-[#3BCF41] rounded-[25px] sm:rounded-[30px] md:rounded-[35px] lg:rounded-[40px] absolute z-[1] right-[0px] sm:right-[110px] md:right-[120px] lg:right-[155px] group-hover:right-0 transition-all duration-300"></div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProductsHome;
