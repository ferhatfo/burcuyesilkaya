import AboutPageDescription from '@/components/organisms/AboutPageDescription';
import BlogSection from '@/components/organisms/BlogSection';
import ContactForm from '@/components/organisms/ContactForm';
import ContactPageDescription from '@/components/organisms/ContactPageDescription';
import Footer from '@/components/organisms/Footer';
import MultiPageDescription from '@/components/organisms/MultiPageDescription';
import MultiPageHeader from '@/components/organisms/MultiPageHeader';
import Head from 'next/head';

export default function About() {
  return (
    <>
      <Head>
        <title>İletişim - Uzman Dr. Burcu Yeşilkaya</title>
        <meta name="description" content="Bizimle iletişime Geçin" />
      </Head>
      <MultiPageHeader
        subtitle="İletişim"
        title="Bizimle iletişime Geçin"
        isImage={false}
        isMap={true}
      />
      <ContactPageDescription/>
      <ContactForm/>
    </>
  );
}