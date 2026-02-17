import uygulamalarData from "@/data/uygulamalar.json";
import { slugify } from "@/utils/slugify";
import Head from "next/head";
import MultiPageHeader from "@/components/organisms/MultiPageHeader";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";

export async function getStaticPaths() {
  const paths = uygulamalarData.map((category) => ({
    params: { slug: slugify(category.category) },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const category = uygulamalarData.find(
    (c) => slugify(c.category) === params.slug
  );

  if (!category) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      category: category || null,
      allCategories: uygulamalarData,
    },
  };
}

export default function UygulamaCategoryPage({ category, allCategories }) {
  const router = useRouter();

  if (!category) return <div>Kategori bulunamadı.</div>;

  const handleCategoryChange = (categorySlug) => {
    router.push(`/uygulamalar/${categorySlug}`);
  };

  return (
    <>
      <Head>
        <title>{category.category} - Uzman Dr. Burcu Yeşilkaya</title>
        <meta name="description" content={category.description} />
      </Head>

      <MultiPageHeader
        subtitle="Uygulamalarımız"
        title={category.category}
        isImage={false}
      />

      <div className="container mx-auto p-4 md:p-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sol Sidebar - Kategoriler */}
          <div className="lg:w-1/4">
            {/* Mobil için Menü */}
            <div className="lg:hidden mb-6">
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                {allCategories.map((cat) => (
                  <button
                    key={cat.category}
                    onClick={() => handleCategoryChange(slugify(cat.category))}
                    className={`w-full px-4 py-3 text-left transition-colors border-b border-gray-200 last:border-b-0 ${
                      slugify(cat.category) === slugify(category.category)
                        ? 'bg-gray-100 text-[#383838]' 
                        : 'text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    <span className="font-semibold text-gray-900">{cat.category}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Desktop için Sidebar */}
            <div className="hidden lg:block sticky top-8">
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                  <h3 className="font-semibold text-gray-900">Uygulamalarımız</h3>
                </div>
                <div className="divide-y divide-gray-200">
                  {allCategories.map((cat) => (
                    <button
                      key={cat.category}
                      onClick={() => handleCategoryChange(slugify(cat.category))}
                      className={`w-full px-4 py-3 text-left transition-colors ${
                        slugify(cat.category) === slugify(category.category)
                          ? 'bg-gray-100 text-[#383838] font-semibold' 
                          : 'text-gray-900 hover:bg-gray-50'
                      }`}
                    >
                      <span className="font-semibold text-gray-900">{cat.category}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sağ İçerik */}
          <div className="lg:w-3/4">
            <div className="max-w-4xl">
              {/* Kategori Görseli */}
              {category.image && (
                <div className="mb-8">
                  <div className="relative w-full h-96 md:h-[500px] rounded-xl overflow-hidden shadow-lg">
                    <Image
                      src={category.image}
                      alt={category.category}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 75vw"
                      priority
                    />
                  </div>
                </div>
              )}

              {/* Kategori Açıklaması */}
              {category.description && (
                <div className="mb-8">
                  <p className="text-gray-700 text-lg leading-relaxed">
                    {category.description}
                  </p>
                </div>
              )}

              {/* Alt Başlıklar (Treatments) */}
              <div className="space-y-6">
                {category.treatments && category.treatments.map((treatment, index) => (
                  <div key={index} className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {treatment.title}
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {treatment.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
