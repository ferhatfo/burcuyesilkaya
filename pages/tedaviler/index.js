import treatments from '../../data/treatments.json';
import MultiPageHeader from '@/components/organisms/MultiPageHeader';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import Button from '@/components/atoms/Button';
import { FaArrowRight } from 'react-icons/fa';
import { slugify } from '@/utils/slugify';

const EXCLUDED_CATEGORIES = ['Uygulamalar', 'Cihazlı Tedaviler'];

export async function getStaticProps() {
  const filteredTreatments = treatments.filter(
    (cat) => !EXCLUDED_CATEGORIES.includes(cat.category)
  );
  return {
    props: {
      treatments: filteredTreatments,
    },
  };
}

export default function TreatmentsPage({ treatments }) {
  return (
    <>
      <Head>
        <title>Tedavilerimiz - Uzman Dr. Burcu Yeşilkaya</title>
        <meta name="description" content="Uzman Dr. Burcu Yeşilkaya olarak sunduğumuz dermatoloji tedavilerini inceleyin." />
      </Head>

      <MultiPageHeader
        subtitle="Tedavilerimiz"
        title="Uzman Dr. Burcu Yeşilkaya"
        isImage={false}
      />
       
      <div className="container mx-auto px-4 py-8 md:py-12 max-w-7xl">
        {treatments.map((category, categoryIndex) => (
          <div key={categoryIndex} className="mb-10 md:mb-12">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-5 md:mb-6">
              {category.category}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {category.treatments.map((treatment, treatmentIndex) => {
                const slug = slugify(treatment.title);
                return (
                  <div
                    key={treatmentIndex}
                    className="overflow-hidden h-full flex flex-col"
                  >
                    {treatment.image && (
                      <div className="relative h-60 flex-shrink-0">
                        <Image
                          src={treatment.image}
                          alt={treatment.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </div>
                    )}
                    <div className="p-6 py-8 bg-gray-100 rounded-xl rounded-tl-none rounded-tr-none flex flex-col flex-1 min-h-0">
                      <h3 className="text-xl font-semibold text-[#383838] mb-3 flex-shrink-0">
                        {treatment.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-6 flex-1 min-h-0">
                        {treatment.description}
                      </p>
                      <Link href={`/tedaviler/${slug}`} className="flex-shrink-0">
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
        ))}
      </div>
    </>
  );
}
