import treatments from "@/data/treatments.json";
import { slugify } from "@/utils/slugify";
import Head from "next/head";
import MultiPageHeader from "@/components/organisms/MultiPageHeader";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

// Tüm tedavileri düz bir liste haline getir
const getAllTreatments = () => {
  const allTreatments = [];
  treatments.forEach((category) => {
    category.treatments.forEach((treatment) => {
      allTreatments.push({
        ...treatment,
        category: category.category,
      });
    });
  });
  return allTreatments;
};

export async function getStaticPaths() {
  const allTreatments = getAllTreatments();
  const paths = allTreatments.map((treatment) => ({
    params: { slug: slugify(treatment.title) },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const allTreatments = getAllTreatments();
  const treatment = allTreatments.find((t) => slugify(t.title) === params.slug);

  if (!treatment) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      treatment: treatment || null,
      allTreatments,
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

export default function TreatmentDetailPage({ treatment, allTreatments }) {
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [openCategories, setOpenCategories] = useState({});

  if (!treatment) return <div>Tedavi bulunamadı.</div>;

  // Seçili tedavinin kategorisini açık olarak başlat
  useEffect(() => {
    setOpenCategories({
      [treatment.category]: true,
    });
  }, [treatment.category]);

  const handleTreatmentChange = (treatmentSlug) => {
    router.push(`/tedaviler/${treatmentSlug}`);
    setIsDropdownOpen(false);
  };

  const toggleCategory = (categoryName) => {
    setOpenCategories((prev) => ({
      ...prev,
      [categoryName]: !prev[categoryName],
    }));
  };

  // Aynı kategorideki tedavileri bul
  const categoryTreatments = allTreatments.filter(
    (t) => t.category === treatment.category
  );
  const currentTreatmentIndex = categoryTreatments.findIndex(
    (t) => slugify(t.title) === slugify(treatment.title)
  );

  return (
    <>
      <Head>
        <title>{treatment.title} - Uzman Dr. Burcu Yeşilkaya</title>
        <meta name="description" content={treatment.description.replace(/\n/g, ' ').replace(/\*\*/g, '')} />
      </Head>

      <MultiPageHeader
        subtitle={treatment.category}
        title={treatment.title}
        isImage={false}
      />

      <div className="container mx-auto p-4 md:p-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sol Sidebar - Dropdown Menü */}
          <div className="lg:w-1/4">
            {/* Mobil için Dropdown */}
            <div className="lg:hidden mb-6">
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                {treatments.map((category) => {
                  const isOpen = openCategories[category.category] || false;
                  return (
                    <div key={category.category} className="border-b border-gray-200 last:border-b-0">
                      <button
                        onClick={() => toggleCategory(category.category)}
                        className="w-full px-4 py-3 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                      >
                        <span className="font-semibold text-gray-900">{category.category}</span>
                        <svg
                          className={`w-5 h-5 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      {isOpen && (
                        <div className="bg-gray-50">
                          {category.treatments.map((treat) => (
                            <button
                              key={treat.title}
                              onClick={() => handleTreatmentChange(slugify(treat.title))}
                              className={`w-full px-6 py-2.5 text-left text-sm hover:bg-gray-100 transition-colors ${
                                slugify(treat.title) === slugify(treatment.title)
                                  ? 'bg-blue-50 text-blue-700 font-semibold border-l-4 border-blue-600'
                                  : 'text-gray-700'
                              }`}
                            >
                              {treat.title}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Desktop için Sidebar */}
            <div className="hidden lg:block sticky top-8">
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                  <h3 className="font-semibold text-gray-900">Tedavilerimiz</h3>
                </div>
                <div className="divide-y divide-gray-200">
                  {treatments.map((category) => {
                    const isOpen = openCategories[category.category] || false;
                    return (
                      <div key={category.category} className="border-b border-gray-200 last:border-b-0">
                        <button
                          onClick={() => toggleCategory(category.category)}
                          className="w-full px-4 py-3 text-left flex justify-between items-center hover:bg-gray-50 transition-colors bg-gray-50"
                        >
                          <span className="font-semibold text-gray-900">{category.category}</span>
                          <svg
                            className={`w-5 h-5 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                        {isOpen && (
                          <div className="bg-white">
                            {category.treatments.map((treat) => (
                              <button
                                key={treat.title}
                                onClick={() => handleTreatmentChange(slugify(treat.title))}
                                className={`w-full px-6 py-2.5 text-left text-sm hover:bg-gray-50 transition-colors ${
                                  slugify(treat.title) === slugify(treatment.title)
                                    ? 'bg-blue-50 text-blue-700 font-semibold border-l-4 border-blue-600'
                                    : 'text-gray-700'
                                }`}
                              >
                                <div className="flex items-center justify-between">
                                  <span>{treat.title}</span>
                                  {slugify(treat.title) === slugify(treatment.title) && (
                                    <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                  )}
                                </div>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Sağ İçerik */}
          <div className="lg:w-3/4">
            <div className="max-w-4xl">
              {/* Görsel */}
              {treatment.image && (
                <div className="mb-8">
                  <div className="relative w-full h-96 md:h-[500px] rounded-xl overflow-hidden shadow-lg">
                    <Image
                      src={treatment.image}
                      alt={treatment.title}
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
                {formatDescription(treatment.description)}
              </div>

              {/* Navigasyon Butonları */}
              <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
                {currentTreatmentIndex > 0 && (
                  <button
                    onClick={() => handleTreatmentChange(slugify(categoryTreatments[currentTreatmentIndex - 1].title))}
                    className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-blue-600 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Önceki Tedavi
                  </button>
                )}
                
                {currentTreatmentIndex < categoryTreatments.length - 1 && (
                  <button
                    onClick={() => handleTreatmentChange(slugify(categoryTreatments[currentTreatmentIndex + 1].title))}
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
