"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FaPinterest, FaInstagram, FaTiktok } from "react-icons/fa";

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();

  const navs = [
    { name: "QUEM SOMOS", href: "/#quem-somos" },
    { name: "NOSSOS PRODUTOS", href: "/#produtos" },
    { name: "PERGUNTAS FREQUENTES", href: "/#faq" },
    { name: "COMO FAZER SEU PEDIDO", href: "/#pedido" },
  ];

  const redes = [
    { icon: <FaInstagram />, href: "" },
    { icon: <FaPinterest />, href: "" },
    { icon: <FaTiktok />, href: "" },
  ];

  const handleScroll = (href) => {
    const sectionId = href.split("#")[1];
    if (pathname !== "/") {
      router.push(`/#${sectionId}`);
    } else {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <header className="min-h-[100px] w-full px-[50px] text-[#3BCF41] flex justify-between items-center py-[30px]">
      <img className="h-20" src="/logo.png" alt="Logo" />

      <nav>
        <ul className="flex gap-[20px] text-[16px]">
          {navs.map((nav, index) => (
            <li key={index} className="cursor-pointer relative transition-all duration-300 
                   hover:-translate-y-1 after:content-[''] after:block after:w-0 
                   after:h-[2px] after:bg-[#3BCF41] after:mt-1 hover:after:w-full after:transition-all after:duration-300" onClick={() => handleScroll(nav.href)}>
              {nav.name}
            </li>
          ))}
        </ul>
      </nav>

      <ul className="flex gap-[25px]">
        {redes.map((item, index) => (
          <li key={index} className="text-[26px] cursor-pointer  hover:-translate-y-1 transition-all duration-300 ">
            {item.icon}
          </li>
        ))}
      </ul>
    </header>
  );
};

export default Header;
