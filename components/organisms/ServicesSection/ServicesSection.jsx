"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Button from '@/components/atoms/Button';
import { FaArrowRight } from 'react-icons/fa';
import treatments from '@/data/treatments.json';
import Link from 'next/link';

const ProgressBar = ({ isActive, delay, swiperRef }) => {
  const [progress, setProgress] = useState(0);
  const animationFrameRef = useRef();
  const startTimeRef = useRef();

  useEffect(() => {
    if (!isActive) {
      setProgress(0);
      cancelAnimationFrame(animationFrameRef.current);
      return;
    }

    startTimeRef.current = performance.now();
    
    const animate = (timestamp) => {
      const elapsed = timestamp - startTimeRef.current;
      const newProgress = Math.min((elapsed / delay) * 100, 100);
      setProgress(newProgress);

      if (newProgress < 100) {
        animationFrameRef.current = requestAnimationFrame(animate);
      } else {
        if (swiperRef.current && swiperRef.current.swiper) {
          swiperRef.current.swiper.slideNext();
          swiperRef.current.swiper.autoplay.start();
        }
      }
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, [isActive, delay, swiperRef]);

  return (
    <div className="absolute bottom-0 left-0 w-full h-1 z-20">
      <div
        className="h-full bg-white transition-none"
        style={{ 
          width: `${progress}%`,
          backgroundColor: '#383838' 
        }}
      />
    </div>
  );
};

export default function ServicesSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef(null);
  const autoplayDelay = 5000;

  return (
    <section className="py-5 md:py-15 md:pb-20 pb-10 bg-gray-100" style={{ borderRadius: '30px' }}>
      <h2 className="text-3xl font-bold text-center mb-4">Tedavilerimiz</h2>
      <p className="text-sm max-w px-2 md:max-w-1/2 text-center m-auto mb-8">
        Dermatoloji alanında geniş bir yelpazede hizmet sunuyoruz. 
        Cilt hastalıklarından saç problemlerine, tırnak hastalıklarından 
        diğer dermatolojik durumlara kadar uzman ekibimizle yanınızdayız. 
        Modern tedavi yöntemleriyle sağlıklı ve güzel bir cilt için 
        kişiye özel çözümler sunuyoruz.
      </p>
      <Swiper
        ref={swiperRef}
        modules={[Navigation, Autoplay]}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        centeredSlides
        slidesPerView={1.5}
        spaceBetween={30}
        loop={true}
        speed={800}
        autoplay={{
          delay: autoplayDelay,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
          waitForTransition: true,
          stopOnLastSlide: false
        }}
        onSlideChange={(swiper) => {
          setActiveIndex(swiper.realIndex);
        }}
        breakpoints={{
          640: {
            slidesPerView: 1.2,
            spaceBetween: 20
          },
          768: { 
            slidesPerView: 1.5,
            spaceBetween: 30
          },
          1024: { 
            slidesPerView: 1.5,
            spaceBetween: 40
          },
        }}
        className="px-4 relative"
      >
        {treatments.map((category, index) => {
          // Her kategori için ilk tedavinin görselini kullan
          const categoryImage = category.treatments.find(t => t.image)?.image || null;
          
          return (
            <SwiperSlide key={index}>
              <div className={`relative overflow-hidden shadow-lg group h-[300px] md:h-[600px] transform transition-all duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)] ${
                index === activeIndex ? "scale-100 z-10" : "scale-95 opacity-80"
              }`}>
                {categoryImage ? (
                  <div className="h-full w-full relative">
                    <Image
                      src={categoryImage}
                      alt={category.category}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, 66vw"
                      priority={index === 0}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20"></div>
                  </div>
                ) : (
                  <div className="h-full w-full relative bg-gradient-to-br from-[#383838] to-[#2d2470]">
                    <div className="absolute inset-0 opacity-20">
                      <div className="w-full h-full bg-[url('/images/pattern.svg')] bg-repeat opacity-10"></div>
                    </div>
                  </div>
                )}
              
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent text-white p-5 md:p-10 transition-all duration-500 transform translate-y-0 group-hover:translate-y-0">
                <div className="max-w-2xl">
                  <h2 className="text-2xl md:text-3xl font-bold mb-2">{category.category}</h2>
                  <p className="text-sm mb-5 md:mb-8 md:max-w-1/2 line-clamp-3">
                    {category.treatments.length} farklı tedavi seçeneği ile {category.category.toLowerCase()} alanında kapsamlı hizmet sunuyoruz.
                  </p>
                  <Link href="/tedaviler">
                    <Button
                      text="Detayları Gör"
                      backgroundColor="#ffffff"
                      textColor="#383838"
                      icon={<FaArrowRight size={14} />}
                    />
                  </Link>
                </div>
              </div>

              {index === activeIndex && (
                <ProgressBar isActive={true} delay={autoplayDelay} swiperRef={swiperRef} />
              )}
            </div>
          </SwiperSlide>
          );
        })}
        
        <div className="swiper-button-next !text-white !right-2"></div>
        <div className="swiper-button-prev !text-white !left-2"></div>
      </Swiper>
    </section>
  );
}
