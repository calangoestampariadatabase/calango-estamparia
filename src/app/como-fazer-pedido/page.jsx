import Container from "@/components/container";
import Header from "@/containers/header";
import PedidosDetails from "@/containers/pedidos/PedidosDetails";


const PedidosPage = () => {
  return (
    <Container>
      <Header />
      <div className="  md:p-[90px] bg-[#3BCF41] rounded-[25px] md:rounded-[70px]">
        <PedidosDetails />
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

export default PedidosPage;
