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
      <Container>
        <Header />
        <div className="  pt-20 bg-[#3BCF41] rounded-[70px]">
          <Carousel />
          <Desc />
          <ProductsHome />
          <Card />
          <Rating />
          <Faq />
        </div>

        <p className="text-[18px] text-[#3BCF41] text-center py-20 font-normal">
          © {new Date().getFullYear()} calango estamparia. Todos os direitos reservados.
        </p>
      </Container>
    </div>
  );
}
