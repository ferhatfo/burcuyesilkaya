import treatments from "@/data/treatments.json";
import { slugify } from "@/utils/slugify";
import Head from "next/head";
import MultiPageHeader from "@/components/organisms/MultiPageHeader";
import Image from "next/image";
import { useRouter } from "next/router";

// Sadece "Cihazlı Tedaviler" kategorisindeki tedavileri al
const getCihazliTedaviler = () => {
  const cihazliTedaviler = [];
  treatments.forEach((category) => {
    if (category.category === 'Cihazlı Tedaviler') {
      category.treatments.forEach((treatment) => {
        cihazliTedaviler.push({
          ...treatment,
          category: category.category,
        });
      });
    }
  });
  return cihazliTedaviler;
};

export async function getStaticPaths() {
  const cihazliTedaviler = getCihazliTedaviler();
  const paths = cihazliTedaviler.map((tedavi) => ({
    params: { slug: slugify(tedavi.title) },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const cihazliTedaviler = getCihazliTedaviler();
  const tedavi = cihazliTedaviler.find((t) => slugify(t.title) === params.slug);

  if (!tedavi) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      tedavi: tedavi || null,
      allCihazliTedaviler: cihazliTedaviler,
    },
  };
}

// Metni formatlamak için yardımcı fonksiyon
const formatDescription = (text) => {
  if (!text) return '';
  
  return text.split('\n\n').map((paragraph, index) => {
    // Kalın metinleri işleme
    if (paragraph.includes('**')) {
      const parts = paragraph.split('**');
      return (
        <p key={index} className="mb-4">
          {parts.map((part, i) => 
            i % 2 === 1 ? (
              <strong key={i} className="font-semibold text-gray-900">{part}</strong>
            ) : (
              part
            )
          )}
        </p>
      );
    }
    
    // Madde listelerini işleme
    if (paragraph.includes('•')) {
      const lines = paragraph.split('\n');
      return (
        <div key={index} className="mb-4">
          {lines.map((line, lineIndex) => (
            <div key={lineIndex} className="flex items-start mb-2">
              {line.trim().startsWith('•') ? (
                <>
                  <span className="text-gray-600 mr-2 mt-1">•</span>
                  <span className="text-gray-700 flex-1">{line.replace('•', '').trim()}</span>
                </>
              ) : (
                <span className="text-gray-700 font-medium">{line}</span>
              )}
            </div>
          ))}
        </div>
      );
    }
    
    // Normal paragraf
    return (
      <p key={index} className="mb-4 text-gray-700 leading-relaxed">
        {paragraph}
      </p>
    );
  });
};

export default function CihazliTedaviDetailPage({ tedavi, allCihazliTedaviler }) {
  const router = useRouter();

  if (!tedavi) return <div>Tedavi bulunamadı.</div>;

  const handleTedaviChange = (tedaviSlug) => {
    router.push(`/cihazli-tedaviler/${tedaviSlug}`);
  };

  const currentTedaviIndex = allCihazliTedaviler.findIndex(
    (t) => slugify(t.title) === slugify(tedavi.title)
  );

  return (
    <>
      <Head>
        <title>{tedavi.title} - Uzman Dr. Burcu Yeşilkaya</title>
        <meta name="description" content={tedavi.description.replace(/\n/g, ' ').replace(/\*\*/g, '')} />
      </Head>

      <MultiPageHeader
        subtitle={tedavi.category}
        title={tedavi.title}
        isImage={false}
      />

      <div className="container mx-auto p-4 md:p-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sol Sidebar - Düz liste (uygulamalar gibi) */}
          <div className="lg:w-1/4">
            {/* Mobil için Menü */}
            <div className="lg:hidden mb-6">
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                {allCihazliTedaviler.map((treat) => (
                  <button
                    key={treat.title}
                    onClick={() => handleTedaviChange(slugify(treat.title))}
                    className={`w-full px-4 py-3 text-left transition-colors border-b border-gray-200 last:border-b-0 ${
                      slugify(treat.title) === slugify(tedavi.title)
                        ? 'bg-gray-100 text-[#383838]'
                        : 'text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    <span className="font-semibold text-gray-900">{treat.title}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Desktop için Sidebar */}
            <div className="hidden lg:block sticky top-8">
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                  <h3 className="font-semibold text-gray-900">Cihazlı Tedavilerimiz</h3>
                </div>
                <div className="divide-y divide-gray-200">
                  {allCihazliTedaviler.map((treat) => (
                    <button
                      key={treat.title}
                      onClick={() => handleTedaviChange(slugify(treat.title))}
                      className={`w-full px-4 py-3 text-left transition-colors ${
                        slugify(treat.title) === slugify(tedavi.title)
                          ? 'bg-gray-100 text-[#383838] font-semibold'
                          : 'text-gray-900 hover:bg-gray-50'
                      }`}
                    >
                      <span className="font-semibold text-gray-900">{treat.title}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sağ İçerik */}
          <div className="lg:w-3/4">
            <div className="max-w-4xl">
              {/* Görsel */}
              {tedavi.image && (
                <div className="mb-8">
                  <div className="relative w-full h-96 md:h-[500px] rounded-xl overflow-hidden shadow-lg">
                    <Image
                      src={tedavi.image}
                      alt={tedavi.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 75vw"
                      priority
                    />
                  </div>
                </div>
              )}
              
              {/* Açıklama metni */}
              <div className="prose prose-lg max-w-none mb-8">
                {formatDescription(tedavi.description)}
              </div>

              {/* Navigasyon Butonları */}
              <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
                {currentTedaviIndex > 0 && (
                  <button
                    onClick={() => handleTedaviChange(slugify(allCihazliTedaviler[currentTedaviIndex - 1].title))}
                    className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-blue-600 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Önceki Tedavi
                  </button>
                )}
                
                {currentTedaviIndex < allCihazliTedaviler.length - 1 && (
                  <button
                    onClick={() => handleTedaviChange(slugify(allCihazliTedaviler[currentTedaviIndex + 1].title))}
                    className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-blue-600 transition-colors ml-auto"
                  >
                    Sonraki Tedavi
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
