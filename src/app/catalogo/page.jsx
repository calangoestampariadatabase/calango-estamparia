import Container from "@/components/container";
import CatalogoHeader from "@/containers/catalogo/CatalogoHeader";
import Header from "@/containers/header";

const catalogo = () => {
  return (
    <Container>
      <Header />
      <div className="  pt-20 bg-[#3BCF41] rounded-[70px]">
        <CatalogoHeader />
      </div>
      <p className="text-[18px] text-[#3BCF41] text-center py-20 font-normal">
        © {new Date().getFullYear()} Calango Estamparia e Vestuario Limitada.
        Todos os direitos reservados.
        <br />
        59.965.840.0001/31
      </p>
    </Container>
  );
};

export default catalogo;
