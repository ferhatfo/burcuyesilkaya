import AboutPageDescription from '@/components/organisms/AboutPageDescription';
import MultiPageDescription from '@/components/organisms/MultiPageDescription';
import MultiPageHeader from '@/components/organisms/MultiPageHeader';
import Head from 'next/head';

export default function About() {
  return (
    <>
      <Head>
        <title>Hakkımızda - Uzman Dr. Burcu Yeşilkaya</title>
        <meta name="description" content="Biz kimiz, ne yaparız?" />
      </Head>
      <MultiPageHeader
        subtitle="Hakkımızda"
        title="Uzman Dr. Burcu Yeşilkaya"
        isImage={true}
        imgUrl="/images/about-img.webp"
      />
      <MultiPageDescription
        description="18 Mayıs 1984’te Samsun’da doğdum. 2001 yılında Samsun Anadolu Lisesi’nden mezun olduktan sonra aynı yıl Ondokuz Mayıs Üniversitesi Tıp Fakültesinde tıp eğitimime başladım. Tıp fakültesinden mezun olduktan sonra 2007-2009 yılları arasında devlet hizmet yükümlülük görevimi Giresun’da tamamladım. 2009 yılında girdiğim TUS(Tıpta Uzmanlık Sınavı)’da Ankara Numune Eğitim ve Araştırma Hastanesi(Ankara Şehir Hastanesi) Dermatoloji branşını kazanarak,  uzmanlık eğitimime başladım. 2013- 2016 yılları arasında Deri ve Zührevi Hastalıkları/Dermatoloji Uzmanı olarak, 2’inci kez devlet hizmet yükümlülük görevimi Ankara Çocuk Sağlığı ve Hastalıkları Hematoloji Onkoloji Eğitim ve Araştırma Hastanesi’nde çocuk hastalarıma şifa dağıtarak tamamladım. 
2016-2023 yılları arasında Antalya Kepez Devlet Hastanesi’nde dermatoloji polikliniğinde aktif olarak çalıştım. 2023 yılından itibaren Antalya Merkez'de kendi muayenehanemde tüm dermatolojik hastalıkların tanı ve tedavisi ve tüm kozmetik tedavileri (botoks, dolgu uygulamaları, Prp, Mezoterapi, cilt gençleştirme, lazer tedavileri vb.) uygulamaktayım."
      />
      <AboutPageDescription/>
    </>
  );
}