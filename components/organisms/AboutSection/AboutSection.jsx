'use client';
import Image from 'next/image';
import Button from '@/components/atoms/Button';
import { FaArrowRight } from 'react-icons/fa';
import Link from 'next/link';
export default function AboutSection() {
  return (
    <section>
      <div className="bg-[#7900C6] p-10 w-full max-w-[1140px] mx-auto my-10 md:my-20 flex flex-col md:flex-row items-center gap-12" style={{ borderRadius: '30px' }}>
        {/* Text Area */}
        <div className="text-white md:w-1/2 space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold">Uzman Dr. Burcu Yeşilkaya</h2>
          <p className="text-md leading-relaxed mb-8">
          18 Mayıs 1984’te Samsun’da doğdum. 2001 yılında Samsun Anadolu Lisesi’nden mezun olduktan sonra aynı yıl Ondokuz Mayıs Üniversitesi Tıp Fakültesinde tıp eğitimime başladım. Tıp fakültesinden mezun olduktan sonra 2007-2009 yılları arasında devlet hizmet yükümlülük görevimi Giresun’da tamamladım. 2009 yılında girdiğim TUS(Tıpta Uzmanlık Sınavı)’da Ankara Numune Eğitim ve Araştırma Hastanesi(Ankara Şehir Hastanesi) Dermatoloji branşını kazanarak,  uzmanlık eğitimime başladım. 2013- 2016 yılları arasında Deri ve Zührevi Hastalıkları/Dermatoloji Uzmanı olarak, 2’inci kez devlet hizmet yükümlülük görevimi Ankara Çocuk Sağlığı ve Hastalıkları Hematoloji Onkoloji Eğitim ve Araştırma Hastanesi’nde çocuk hastalarıma şifa dağıtarak tamamladım. 
2016-2023 yılları arasında Antalya Kepez Devlet Hastanesi’nde dermatoloji polikliniğinde aktif olarak çalıştım. 
          </p>
          <Link href="/hakkimizda">
            <Button
              text="Hakkımızda"
              backgroundColor="#ffffff"
              textColor="#383838"
              icon={<FaArrowRight size={14} />}
              />
          </Link>
        </div>

        {/* Image Area */}
        <div className="md:w-1/2 relative flex justify-start">
          <Image
            src="/images/about-img.webp"
            alt="Hakkımızda görseli"
            width={400}
            height={200}
            className="w-full object-cover max-h-[500px]"
          />
        </div>
      </div>
    </section>
  );
}
