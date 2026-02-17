import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/organisms/Navbar";
import Slideshow from "@/components/organisms/Slideshow";
import { Montserrat, Playfair_Display } from "next/font/google";
import AboutSection from "@/components/organisms/AboutSection";
import ServicesSection from "@/components/organisms/ServicesSection";
import BlogSection from "@/components/organisms/BlogSection";
import Head from 'next/head';
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["400", "700"],
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "700"],
});

export default function Home() {
  return (
    <>
      <Head>
        <title>Uzman Dr. Burcu Yeşilkaya</title>
        <meta name="description" content="Uzman Dr. Burcu Yeşilkaya" />
      </Head>
      <main>
        <Slideshow/>
        <AboutSection/>
        <ServicesSection/>
        <BlogSection
          isIndex={true}
        />
      </main>
    </>
  );
}
