const Rating = () => {

    const ratings = [
        {
            name: "João Silva",
            comment: "Super recomendo a Calango! Pedi camisas personalizadas para o interclasse da minha escola e chegaram rapidinho, do jeitinho que eu imaginei. Qualidade incrível e atendimento nota mil. Já quero pedir mais pra faculdade!",
            stars: 5,
            image: "/calango1.png",
            city: "Belo Horizonte - MG",
            emoji: "/emoji/oculos.png"
        },
    ]

    const numberOfStars = (stars) => {
        return Array.from({ length: stars }).map((_, i) => (
            <svg
                key={i}
                width="40"
                height="40"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                fill="black"
            >
                <path d="M12 17.27L18.18 21L16.54 13.97L22 9.23999L14.81 8.62999L12 2L9.18999 8.62999L2 9.23999L7.45999 13.97L5.81999 21L12 17.27Z" />
            </svg>
        ));
    };


    return (
        <div className="bg-[#14151417] py-[140px] text-[#131413] relative">

<img src="/assets/estrela.png" className="left-20 bottom-[-70] absolute h-30" alt="" />

            <div className="px-[65px] flex flex-col gap-20">
                <div className="flex items-center gap-[54px]">
                    <p className="text-[28px] w-[900px]">DE QUEM JA VIVEU A EXPERIENCIA:</p>
                    <div className="w-full h-[1px] bg-black"></div>
                </div>

                <ul>
                    {ratings.map((rating, index) => (
                        <li key={index} className="items-center flex gap-10 ">
                            <div className="flex flex-col items-center gap-3">
                                <img src={rating.image} alt="" className="h-[130px] w-[130px] border-[5px] border-black rounded-full object-cover" />
                                <div className="flex">{numberOfStars(rating.stars)}</div>
                            </div>

                            <div className="gap-2 flex flex-col w-full text-[20px] bg-[#D9D9D9] p-7 rounded-[40px] relative">
                                <i> <span className="font-bold">{rating.name}</span> - <span className="font-extralight">{rating.city}</span></i>
                                <p>"{rating.comment}"</p>

                                <img src={rating.emoji} alt=""  className="absolute top-[-30px] right-10 h-[60px]"  />
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default Rating;