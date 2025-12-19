"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import {
  FaPinterest,
  FaInstagram,
  FaTiktok,
  FaBars,
  FaTimes,
} from "react-icons/fa";

const Header = () => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const navs = [
    { name: "QUEM SOMOS", href: "/quem-somos" },
    { name: "NOSSOS PRODUTOS", href: "/#produtos" },
    { name: "PERGUNTAS FREQUENTES", href: "/#faq" },
    { name: "COMO FAZER SEU PEDIDO", href: "/como-fazer-pedido" },
    { name: "CATALOGO", href: "/catalogo" },
  ];

  const redes = [
    { icon: <FaInstagram />, href: "https://www.instagram.com/calangoestamparia.ofc/" },
    { icon: <FaPinterest />, href: "https://www.tiktok.com/@calangoestamparia.ofc" },
    { icon: <FaTiktok />, href: "" },
  ];

  const isActive = (href) => {
    // IGNORA links com hash (#)
    if (href.includes("#")) return false;

    return pathname === href;
  };

  return (
    <header className="w-full py-5 px-4 md:px-[50px] text-[#3BCF41]">
      <div className="min-h-[100px] flex items-center justify-between relative">
        {/* MENU HAMBURGUER */}
        <button
          className="md:hidden text-2xl z-60"
          onClick={() => setOpen(!open)}
        >
          {open ? <FaTimes /> : <FaBars />}
        </button>

        {/* LOGO */}
        <img
          className="h-12 md:h-20 absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0 z-50"
          src="/logo.png"
          alt="Logo"
        />

        {/* NAV DESKTOP */}
        <nav className="hidden md:block">
          <ul className="flex gap-[20px] text-[16px]">
            {navs.map((nav, index) => {
              const active = isActive(nav.href);

              return (
                <li
                  key={index}
                  className={`cursor-pointer relative transition-all duration-300  
                    hover:-translate-y-1 after:content-[''] after:block after:w-0 
                    after:h-[2px] after:bg-[#3BCF41] after:mt-1 hover:after:w-full 
                    after:transition-all after:duration-300
                    ${active ? "text-[#D9D9D9] after:bg-[#D9D9D9] after:w-full" : ""}`}
                >
                  <Link href={nav.href}>{nav.name}</Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* REDES */}
        <ul className="flex md:gap-[20px] text-[16px] gap-2 md:text-[22px] z-50">
          {redes.map((item, index) => (
            <li
              key={index}
              className="cursor-pointer hover:-translate-y-1 transition-all duration-300"
            >
              <Link href={item.href} target="_blank" rel="noopener noreferrer">
                {item.icon}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* MENU MOBILE */}
      <div
        className={`md:hidden fixed inset-0 z-40 transition-all duration-500 ${
          open ? "visible" : "invisible pointer-events-none"
        }`}
      >
        <div
          className={`absolute inset-0 bg-black transition-opacity duration-500 ${
            open ? "opacity-50" : "opacity-0"
          }`}
          onClick={() => setOpen(false)}
        />

        <nav
          className={`absolute top-0 left-0 w-full bg-[#131413] shadow-lg transition-transform duration-500 ${
            open ? "translate-y-0" : "-translate-y-full"
          }`}
        >
          <div className="pt-24 pb-8 px-4">
            <ul className="flex flex-col items-center gap-4">
              {navs.map((nav, index) => {
                const active = isActive(nav.href);

                return (
                  <li key={index} className="w-full">
                    <Link
                      href={nav.href}
                      onClick={() => setOpen(false)}
                      className={`block text-center py-4 px-6 text-lg font-medium rounded-lg 
                        transition-all duration-300
                        ${
                          active
                            ? "text-white bg-gray-800/70"
                            : "hover:bg-gray-800/50 hover:text-[#3BCF41]"
                        }`}
                    >
                      {nav.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
