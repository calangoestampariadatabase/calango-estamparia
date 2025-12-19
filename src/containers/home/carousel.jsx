"use client";

import { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { createClient } from "@supabase/supabase-js";
import PageLoader from "@/components/pageLoader";

const Carousel = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadImages = async () => {
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
      );

      const { data, error } = await supabase.storage
        .from("carousel")
        .list("", { limit: 100 });

      if (error) {
        console.error("Erro ao listar imagens:", error);
        setLoading(false);
        return;
      }

      const base =
        process.env.NEXT_PUBLIC_SUPABASE_URL +
        "/storage/v1/object/public/carousel/";

      const updated = data
        .filter((file) => /\.(jpg|jpeg|png|webp)$/i.test(file.name))
        .map((file) => ({
          image: `${base}${file.name}?v=${new Date(file.updated_at).getTime()}`,
        }));

      setImages(updated);
      setLoading(false);
    };

    loadImages();
  }, []);

  const settings = {
    dots: false,
    infinite: images.length > 1,
    autoplay: images.length > 1,
    autoplaySpeed: 3000,
    arrows: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="px-2 md:px-[65px] relative">
      {/* LOADING */}
      {loading && (
        <PageLoader />
      )}

      <div className="flex items-center justify-center h-[45px] absolute md:h-[100px]">
        <img className="md:h-auto h-[30px]" src="/assets/icon.png" />
      </div>

      <div className="relative z-[2] h-[212px] w-full md:h-[528px]">
        <img
          src="/assets/border.png"
          className="absolute z-[2] top-0 left-0 w-full h-full pointer-events-none"
        />

        {!loading && (
          <Slider
            className="outline-none"
            style={{
              WebkitMaskImage: "url(/assets/retangulo.png)",
              WebkitMaskRepeat: "no-repeat",
              WebkitMaskSize: "100% 100%",
              maskImage: "url(/assets/retangulo.png)",
              maskRepeat: "no-repeat",
              maskSize: "100% 100%",
            }}
            {...settings}
          >
            {images.map((item, index) => (
              <div key={index}>
                <img
                  src={item.image}
                  alt="banner"
                  className="w-full h-[212px] md:h-[528px] object-cover"
                  style={{
                    WebkitMaskImage: "url(/assets/retangulo.png)",
                    WebkitMaskRepeat: "no-repeat",
                    WebkitMaskSize: "100% 100%",
                    maskImage: "url(/assets/retangulo.png)",
                    maskRepeat: "no-repeat",
                    maskSize: "100% 100%",
                  }}
                />
              </div>
            ))}
          </Slider>
        )}
      </div>
    </div>
  );
};

export default Carousel;
