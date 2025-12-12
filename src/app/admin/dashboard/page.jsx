"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Container from "@/components/container";
import AddCarousel from "@/containers/dashboard/AddCarousel";
import AddCatalogo from "@/containers/dashboard/AddCatalogo";
import Header from "@/containers/header";

export default function DashboardPage() {
  const router = useRouter();

  useEffect(() => {
    const isAuth = localStorage.getItem("admin-auth");

    if (!isAuth) {
      router.replace("/admin");
    }
  }, []);

  return (
    <div>
      <Container>
          <Header />
        <div className="  pt-20 bg-[#3BCF41] rounded-[70px] px-[65px]">
            <AddCarousel />
            <AddCatalogo />
          {/* <button
        onClick={() => {
          localStorage.removeItem("admin-auth");
          router.push("/admin");
        }}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
        Sair
      </button> */}
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
