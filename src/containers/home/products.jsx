import Link from "next/link";

export const items = [
  {
    name: "moletons",
    images: [
      {
        image: "/calango1.png"
      },
      {
        image: "/calango3.png"
      },
      {
        image: "/calango1.png"
      },
      {
        image: "/calango3.png"
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
        answer: "Oferecemos tamanhos que vão do P ao GG para atender a todas as necessidades.",
      },
      {
        question: "Cuidados",
        answer:
          "Recomendamos lavar à máquina em água fria e secar à sombra para manter a qualidade do tecido.",
      },
    ]
  },
  {
    name: "camisas",
    images: [
      {
        image: "/calango3.png"
      },
      {
        image: "/calango3.png"
      },
      {
        image: "/calango3.png"
      },
      {
        image: "/calango3.png"
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
        answer: "Oferecemos tamanhos que vão do P ao GG para atender a todas as necessidades.",
      },
      {
        question: "Cuidados",
        answer:
          "Recomendamos lavar à máquina em água fria e secar à sombra para manter a qualidade do tecido.",
      },
    ]
  },
  {
    name: "canecas",
    images: [
      {
        image: "/calango1.png"
      },
      {
        image: "/calango1.png"
      },
      {
        image: "/calango1.png"
      },
      {
        image: "/calango1.png"
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
        answer: "Oferecemos tamanhos que vão do P ao GG para atender a todas as necessidades.",
      },
      {
        question: "Cuidados",
        answer:
          "Recomendamos lavar à máquina em água fria e secar à sombra para manter a qualidade do tecido.",
      },
    ]
  },
];

const ProductsHome = () => {


  return (
    <div id="produtos" className="h-[900px] bg-[#D9D9D9] pt-[100px] pb-[170px] relative">

<img src="/assets/grafite1.png" className="absolute top-[-45] right-15" alt="" />

      <div className="px-[65px] h-full w-full flex flex-col justify-between">
        <div className="flex items-center gap-[54px]">
          <p className="text-[24px] w-[270px]">Nossos produtos</p>
          <div className="w-full h-px bg-black"></div>
        </div>

        <ul className="flex justify-between w-full">
          {items.map((item, index) => (
            <li
              key={index}
              className="cursor-pointer w-[370px] relative group"
            >

              <Link href={`/produtos/${item.name.toLowerCase()}`}>
                <img
                  className="h-[500px] w-full border-10 object-cover border-[#131413] rounded-[40px] relative z-[3]"
                  src={item.images[0].image}
                  alt=""
                />

                <div className="bg-[#131413] h-[140px] w-[220px] rounded-[40px] flex items-end justify-center py-[17px] text-[#3BCF41] font-bold text-[25px] absolute bottom-[-65px] z-[2]">
                  {item.name.toUpperCase()}
                </div>

                <div className="absolute right-0 h-[65px] bottom-[-65px] w-[170px] text-[#131413] underline flex justify-center items-center text-[18px]">
                  <span className="absolute z-[3] underline">+ Ver mais</span>

                  <div className="w-[210px] h-full bg-[#3BCF41] rounded-[40px] absolute z-[1] right-[155px] group-hover:right-0 transition-all duration-300"></div>
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
