import MultiPageHeader from '@/components/organisms/MultiPageHeader';
import Head from 'next/head';
import BlogSection from '@/components/organisms/BlogSection';
export default function blogsPage({ blogs }) {
  return (
    <>
        <Head>
            <title>Blog - Uzman Dr. Burcu Yeşilkaya</title>
            <meta name="description" content={`Uzman Dr. Burcu Yeşilkaya olarak sunduğumuz farklı hizmetleri inceleyin.`} />
        </Head>

        <MultiPageHeader
            subtitle="Blog Paylaşımlarımız"
            title="Uzman Dr. Burcu Yeşilkaya"
            isImage={false}
        />
       
        <BlogSection/>
    </>
  );
}
