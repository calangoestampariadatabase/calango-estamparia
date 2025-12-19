"use client";

export default function PageLoader({ image = "/assets/icon.png" }) {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#3BCF41]">
      <img
        src={image}
        alt="Carregando..."
        className="
          w-20
          animate-fade
        "
      />
    </div>
  );
}
