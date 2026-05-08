import Container from "@/components/container";
import Carousel from "@/containers/home/carousel";
import Header from "@/containers/header";
import Desc from "@/containers/home/desc";
import ProductsHome from "@/containers/home/products";
import Card from "@/containers/home/card";
import Rating from "@/containers/home/rating";
import Faq from "@/containers/home/faq";
import Whatsapp from "@/containers/whatsapp";


export default function Home() {
  return (
    <div className="overflow-x-hidden scroll-smooth">
      <Container >
        <Header />
        <div className=" pt-5 md:pt-20 bg-[#3BCF41] md:rounded-[70px] rounded-[20px]">
          <Carousel />
          <div className="relative z-[5] mt-10 sm:mt-28 md:mt-16 w-full px-4 sm:px-0 flex flex-col md:flex-row items-center justify-center gap-4 md:gap-10">
            <div className="static z-[5]  w-full px-4 flex flex-col md:flex-row items-center justify-center gap-4 md:gap-10">
              <a
                href="https://tintim.link/whatsapp/11059be2-0410-4b61-8aae-918b6f3b5322/49d074f4-f48a-4974-b35c-075f6fd51769"
                target="_blank"
                className="
      w-auto sm:w-[320px] md:w-auto
      text-center
      bg-[#131413]
      text-[#3BCF41]
      rounded-[24px] sm:rounded-[30px] md:rounded-[40px]
      px-6 sm:px-10 md:px-16
      py-2 sm:py-4
      text-base sm:text-lg md:text-[22px]
      font-semibold
      transition
      hover:scale-105
    "
              >
                Faça seu orçamento!
              </a>

              <a
                href="/catalogo"
                target="_blank"
                className="
      w-auto sm:w-[320px] md:w-auto
      text-center
      bg-[#D9D9D9]
      text-[#131413]
      rounded-[24px] sm:rounded-[30px] md:rounded-[40px]
      px-15 sm:px-10 md:px-16
      py-2 sm:py-4
      text-base sm:text-lg md:text-[22px]
      font-medium
      transition
      hover:scale-105
    "
              >
                Ver catálogo
              </a>
            </div>

          </div>



          <Desc />
          <ProductsHome />
          <Card />
          <Rating />
          <Faq />
        </div>

        <p className="md:text-[18px] text-[12px] text-[#3BCF41] text-center py-20 font-normal">
          © {new Date().getFullYear()} Calango Estamparia e Vestuario Limitada.
          Todos os direitos reservados.
          <br />
          59.965.840.0001/31
        </p>
      </Container>

      <Whatsapp />
    </div>
  );
}
