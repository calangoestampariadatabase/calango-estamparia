import Container from "@/components/container";
import Carousel from "@/containers/home/carousel";
import Header from "@/containers/header";
import Desc from "@/containers/home/desc";
import ProductsHome from "@/containers/home/products";
import Card from "@/containers/home/card";
import Rating from "@/containers/home/rating";
import Faq from "@/containers/home/faq";


export default function Home() {
  return (
    <div className="overflow-x-hidden scroll-smooth">
      <Container >
        <Header />
        <div className=" pt-10 md:pt-20 bg-[#3BCF41] md:rounded-[70px] rounded-[20px]">
          <Carousel />
          <Desc />
          <ProductsHome />
          <Card />
          <Rating />
          <Faq />
        </div>

        <p className="text-[18px] text-[#3BCF41] text-center py-20 font-normal">
          © {new Date().getFullYear()} Calango Estamparia e Vestuario Limitada. Todos os direitos reservados.
          <br />
            59.965.840.0001/31
        </p>
      </Container>
    </div>
  );
}
