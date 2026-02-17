import Image from 'next/image';
import Link from 'next/link';
import { FaInstagram, FaLinkedin, FaFacebook, FaYoutube } from 'react-icons/fa';
import treatments from '@/data/treatments.json';

const Footer = () => {
  return (
    <footer className="py-10 md:py-15 pb-0 md:pb-0 bg-gray-100 rounded-t-[30px]">
      <div className="container mx-auto px-4">
        {/* Logo Section */}
        <div className="pb-[40px] md:pb-[50px] text-center">
          <div className="flex justify-center">
            <Image 
              src="/images/svg/logo.svg" 
              alt="Logo" 
              width={200} 
              height={100} 
              className="max-w-[300px] mx-auto"
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="pt-[40px] md:pb-[40px] border-t border-[#383838]">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {/* Home Links */}
            <div>
              <h6 className="font-medium pb-[15px] text-[#383838]">Uzman Dr. Burcu Yeşilkaya</h6>
              <ul className="space-y-1">
                <li><FooterLink href="/hakkimizda" text="Hakkımızda" /></li>
                <li><FooterLink href="/tedaviler" text="Tedavilerimiz" /></li>
                <li><FooterLink href="/blog" text="Blog" /></li>
                <li><FooterLink href="/iletisim" text="İletişim" /></li>
              </ul>
            </div>

            {/* Treatments Links */}
            <div>
              <h6 className="font-medium pb-[15px] text-[#383838]">Tedavilerimiz</h6>
              <ul className="space-y-1">
                {treatments.map((category, index) => (
                  <li key={index}>
                    <FooterLink href="/tedaviler" text={category.category} />
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h6 className="font-medium pb-[15px] text-[#383838]">Politikalar</h6>
              <ul className="space-y-1">
                <li><FooterLink href="" text="Kişisel Verilerin İşlenmesine İlişkin Kurumsal Genel Aydınlatma Metni" /></li>
                <li><FooterLink href="" text="Çerez Politikası" /></li>
                <li><FooterLink href="" text="Veri Sorumlusuna Başvuru Formu" /></li>
              </ul>
            </div>

            <div>
              <h6 className="font-medium pb-[15px] text-[#383838]">İletişim</h6>
              <p className="text-[14px] pb-[10px]">Adres : Yenigün Mah.1047. Sok.Midtown Plaza C Blok<br/>
                No:7/3 Muratpaşa/Antalya</p>

              <div className="flex items-center pb-[20px] gap-3">
                <Link href="https://www.!nstagram.com/dermatologdr.burcuyes!lkaya/" rel="noopener noreferrer">
                  <FaInstagram size={24} color="#383838" />
                </Link>
              </div>
              
           
              <p className="py-[5px] text-[14px]"><Link href="tel:+905336642855">+90 533 664 28 55 </Link></p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="py-[40px] mt-[40px] md:mt-[0] border-t border-[#383838]">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-[13px]">2026 © | All Right Rezerved</p>
            <p className="text-[13px]">Created by Nuans Agency</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Reusable FooterLink component
const FooterLink = ({ href, text }) => (
  <Link 
    href={href} 
    className="text-[14px] font-normal hover:text-[#383838] transition-colors"
  >
    {text}
  </Link>
);

export default Footer;