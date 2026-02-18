import uygulamalarData from '../../data/uygulamalar.json';
import MultiPageHeader from '@/components/organisms/MultiPageHeader';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import Button from '@/components/atoms/Button';
import { FaArrowRight } from 'react-icons/fa';
import { slugify } from '@/utils/slugify';

export async function getStaticProps() {
  return {
    props: {
      uygulamalar: uygulamalarData,
    },
  };
}

export default function UygulamalarPage({ uygulamalar }) {
  return (
    <>
      <Head>
        <title>Uygulamalarımız - Uzman Dr. Burcu Yeşilkaya</title>
        <meta name="description" content="Uzman Dr. Burcu Yeşilkaya olarak sunduğumuz estetik ve kozmetik uygulamaları inceleyin." />
      </Head>

      <MultiPageHeader
        subtitle="Uygulamalarımız"
        title="Uzman Dr. Burcu Yeşilkaya"
        isImage={false}
      />
       
      <div className="container mx-auto px-4 py-8 md:py-12 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {uygulamalar.map((category, categoryIndex) => {
            const slug = slugify(category.category);
            // Kategori görseli
            const categoryImage = category.image || null;
            
            return (
              <div key={categoryIndex} className="overflow-hidden h-full flex flex-col">
                {categoryImage && (
                  <div className="relative h-60 flex-shrink-0">
                    <Image
                      src={categoryImage}
                      alt={category.category}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                )}
                <div className="p-6 py-8 bg-gray-100 rounded-xl rounded-tl-none rounded-tr-none flex flex-col flex-1 min-h-0">
                  <h3 className="text-xl font-semibold text-[#383838] mb-3 flex-shrink-0">
                    {category.category}
                  </h3>
                  <p className="text-gray-600 text-sm mb-6 flex-1 min-h-0">
                    {category.description}
                  </p>
                  <Link href={`/uygulamalar/${slug}`} className="flex-shrink-0">
                    <Button
                      text="Detayları Gör"
                      backgroundColor="#ffffff"
                      textColor="#383838"
                      icon={<FaArrowRight size={14} />}
                    />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
