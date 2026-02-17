'use client';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import Button from '@/components/atoms/Button';
import { FaArrowRight } from 'react-icons/fa';
import Link from 'next/link';
const slides = [
  {
    id: 1,
    image: '/images/slide1.webp',
    title: 'En Değerli Giysiniz Cildiniz',
    desc: 'Bilimsel dokunuşlarla sağlıklı ve güçlü bir cilt',
    btnText: 'Neler Yapıyoruz ?',
    btnUrl: '/tedaviler'
  },
  {
    id: 2,
    image: '/images/slide2.webp',
    title: 'Güzel Görünmek Sağlıklı Bir Ciltle Başlar',
    desc: 'Bilimle planlanan dermatoloji',
    btnText: 'Keşfet',
    btnUrl: '/tedaviler'
  },
];

export default function Slider() {
  const [current, setCurrent] = useState(0);
  const imageRef = useRef(null);
  const contentRef = useRef(null);
  const progressRefs = useRef([]);
  const intervalRef = useRef(null);
  

  const animateSlide = (index) => {
    const img = imageRef.current;
    const content = contentRef.current;

    gsap.fromTo(
      img,
      { opacity: 0, scale: 1.1 },
      { opacity: 1, scale: 1, duration: 1, ease: 'power3.out' }
    );

    gsap.fromTo(
      content,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, delay: 0.3, ease: 'power3.out' }
    );
  };

  const goToSlide = (index) => {
    clearTimeout(intervalRef.current);
    setCurrent(index);
  };

  useEffect(() => {
    animateSlide(current);

    // Eski animasyonları durdur
    progressRefs.current.forEach((ref) => {
      gsap.killTweensOf(ref);
      gsap.set(ref, { width: '0%' });
    });

    // Yeni progress bar'ı başlat
    gsap.to(progressRefs.current[current], {
      width: '100%',
      duration: 10,
      ease: 'linear',
    });

    // Slide geçişini ayarla
    intervalRef.current = setTimeout(() => {
      const nextIndex = (current + 1) % slides.length;
      setCurrent(nextIndex);
    }, 10000);

    return () => clearTimeout(intervalRef.current);
  }, [current]);

 

  return (
    <section>
      <div className="relative w-full h-[calc(100vh-80px)] overflow-hidden bg-black text-white">
        <div className="absolute inset-0 z-0">
          <img
            ref={imageRef}
            src={slides[current].image}
            alt={slides[current].title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black opacity-40 z-10"></div>
        </div>

        <div
          className="absolute inset-0 flex flex-col items-start justify-center text-left z-10  pl-[10%] md:pl-[15%] p-4 top-[-10%]"
          ref={contentRef}
        >
          
          <h2 className="text-4xl md:text-5xl font-bold md:max-w-1/2 max-w-[100%] leading-[55px]">{slides[current].title}</h2>
          <h6 className="text-xl font-regular my-2">{slides[current].altTitle}</h6>
          <p className="mt-4 mb-6 text-base md:text-lg max-w-xl">{slides[current].desc}</p>
          <Link href={slides[current].btnUrl}>
            <Button
              text={slides[current].btnText}
              backgroundColor="#ffffff"
              textColor="#336159"
              icon={<FaArrowRight size={14} />}
            />
          </Link>

        </div>

        <div className="absolute bottom-10 left-[15%] flex gap-3 z-20 w-[200px]">
          {slides.map((_, index) => (
            <div
              key={index}
              onClick={() => goToSlide(index)}
              className="cursor-pointer w-full h-1 bg-white/30 rounded overflow-hidden"
            >
              <div
                ref={(el) => (progressRefs.current[index] = el)}
                className="h-full bg-white w-0"
              ></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
