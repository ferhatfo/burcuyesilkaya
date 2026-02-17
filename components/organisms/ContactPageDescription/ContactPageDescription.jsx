import Image from 'next/image';
import Link from 'next/link';
import { FaInstagram, FaLinkedin, FaFacebook, FaYoutube } from 'react-icons/fa';
export default function ContactPageDescription(){
    return(
        <section className="py-[40px]">
            <div className="container mx-auto px-4 flex">
                <div className='w-full md:w-1/3'>
                    <h6 className="text-[#383838] pb-1">Telefon</h6>
                    <p className="pb-[3px] text-gray-700 leading-relaxed text-sm">
                        +90 533 664 28 55
                    </p>

                    <h6 className="text-[#383838] pb-1">Mail</h6>
                    <p className="pb-[15px] text-gray-700 leading-relaxed text-sm">
                        burcuyesilkaya@gmail.com
                    </p>

                    <h6 className="text-[#383838] pb-1">Adres</h6>
                    <p className="pb-[15px] text-gray-700 leading-relaxed text-sm">
                     Yenigün Mah.1047. Sok.Midtown Plaza C Blok<br/>
                    No:7/3 Muratpaşa/Antalya
                    </p>

                    <h6 className="text-[#383838] pb-1">Sosyal Medya</h6>
                    <div className="flex items-center pt-[5px] pb-[15px] gap-5">
                        <Link href="https://www.instagram.com/dermatologdr.burcuyesilkaya/" target="_blank" rel="noopener noreferrer">
                            <FaInstagram size={24} color="#383838" />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}