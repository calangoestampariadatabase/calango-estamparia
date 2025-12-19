"use client";

import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";

const Rating = () => {
  const ratings = [
    {
      name: "Luiza M",
      comment:
        "Quero agradecer pelo empenho e dedicação de vocês, as peças ficaram impecáveis do jeitinho que desenhamos e de qualidade ótima!! obrigada por realizar esse sonho nosso",
      stars: 5,
      city: "São Paulo",
      emoji: "/emoji/oculos.png",
      image: "/avatar/1.png",
    },
    {
      name: "Ana Esther",
      comment:
        "Passando aqui para agradecer a equipe pela paciência e o carinho que tiveram com a gente. Todo mundo adorou, a qualidade das blusas são excelentes, muito obrigada mesmo",
      stars: 5,
      city: "MG",
      emoji: "/emoji/oculos.png",
      image: "/avatar/2.png",
    },
    {
      name: "Clara",
      comment:
        "Minha turma adorou as camisas e já vamos usá-las neste sábado. Pode ter certeza de que no próximo ano faremos novamente com vocês!",
      stars: 5,
      city: "Bahia",
      emoji: "/emoji/oculos.png",
      image: "/avatar/3.png",
    },
    {
      name: "Emily",
      comment:
        "Todos da escola elogiaram muito a qualidade e as camisas e moletons, a qualidade é realmente sensacional e muito boa, os moletons são bem quentinhos e confortáveis...",
      stars: 5,
      city: "Rio de Janeiro",
      emoji: "/emoji/oculos.png",
      image: "/avatar/4.png",
    },
    {
      name: "Acsa",
      comment:
        "Estamos apaixonadosss!! Vocês fizeram um trabalho incrível nas nossas blusas e moletons, a qualidade é muito boa e a estampa ficou perfeita!",
      stars: 5,
      city: "Brasília",
      emoji: "/emoji/coracao.png",
      image: "/avatar/5.png",
    },
  ];

  const [active, setActive] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) =>
        prev === ratings.length - 1 ? 0 : prev + 1
      );
    }, 8000);

    return () => clearInterval(interval);
  }, [ratings.length]);

  const numberOfStars = (stars) => {
    return Array.from({ length: stars }).map((_, i) => (
      <FaStar
        key={i}
        className="text-xl md:text-2xl text-black"
      />
    ));
  };

  return (
    <div className="bg-[#14151417] py-[50px] md:py-[120px] lg:py-[140px] text-[#131413] relative">
      <img
        src="/assets/estrela.png"
        className="left-5 md:left-20 bottom-[-30px] md:bottom-[-60px] absolute h-[50px] md:h-[100px]"
        alt=""
      />

      <div className="px-[20px] md:px-[40px] lg:px-[65px] flex flex-col gap-10 md:gap-16">
        <div className="flex items-center gap-[30px] md:gap-[54px]">
          <p className="text-[13px] md:text-[26px] lg:text-[28px] w-full bounded">
            DE QUEM JÁ VIVEU A EXPERIÊNCIA:
          </p>
          <div className="md:w-[800px] h-[1px] bg-black hidden md:block"></div>
        </div>

        <ul className="relative">
          {ratings.map((rating, index) => (
            <li
              key={index}
              className={`
                flex
                flex-col
                md:flex-row
                items-center
                gap-6
                md:gap-10
                transition-all
                duration-700
                ease-[cubic-bezier(0.22,1,0.36,1)]
                ${
                  index === active
                    ? "opacity-100 translate-y-0 scale-100 relative"
                    : "opacity-0 translate-y-8 scale-95 absolute pointer-events-none"
                }
              `}
            >
              <div className="flex flex-col items-center gap-3">
                <img
                  src="/assets/user.png"
                  alt=""
                  className="h-[60px] w-[60px] md:h-[100px] md:w-[100px] lg:h-[130px] lg:w-[130px]  rounded-full object-cover"
                />

                <div className="flex gap-1 ">
                  {numberOfStars(rating.stars)}
                </div>
              </div>

              <div className="gap-2 flex flex-col w-full text-[16px] md:text-[18px] lg:text-[20px] bg-[#D9D9D9] p-5 md:p-6 lg:p-7 rounded-[30px] lg:rounded-[40px] relative">
                <i>
                  <span className="font-bold text-[13px] md:text-[20px]">{rating.name}</span>{" "}
                  –{" "}
                  <span className="font-extralight text-[13px] md:text-[20px]">
                    {rating.city}
                  </span>
                </i>

                <p className="text-[13px] md:text-[20px] font-light">"{rating.comment}"</p>

                <img
                  src={rating.emoji}
                  alt=""
                  className="absolute top-[-20px] md:top-[-30px] right-6 md:right-10 h-[40px] md:h-[60px]"
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Rating;
