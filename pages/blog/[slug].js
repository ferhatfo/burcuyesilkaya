import blogs from '@/data/blogs.json';
import Image from 'next/image';
import { slugify } from '@/utils/slugify';
import Head from 'next/head';
import MultiPageHeader from '@/components/organisms/MultiPageHeader';
import { useRouter } from 'next/router';

export async function getStaticPaths() {
  const paths = blogs.map((blog) => ({
    params: { slug: slugify(blog.title) },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const blog = blogs.find((b) => slugify(b.title) === params.slug);

  if (!blog) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      blog: blog || null,
    },
  };
}

// İçeriği formatlamak için yardımcı fonksiyon
const formatContent = (content) => {
  if (!content) return null;

  return content.split('\n\n').map((paragraph, index) => {
    if (paragraph.trim() === '') return null;

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
        <div key={index} className="mb-6">
          {lines.map((line, lineIndex) => (
            <div key={lineIndex} className="flex items-start mb-2">
              {line.trim().startsWith('•') ? (
                <>
                  <span className="text-blue-600 mr-3 mt-1">•</span>
                  <span className="text-gray-700 flex-1">{line.replace('•', '').trim()}</span>
                </>
              ) : (
                <span className="text-gray-800 font-medium text-lg mb-2">{line}</span>
              )}
            </div>
          ))}
        </div>
      );
    }

    // Alt başlıkları işleme (bold metin)
    if (paragraph.includes(':') && paragraph.length < 100) {
      return (
        <h3 key={index} className="text-xl font-semibold text-gray-900 mb-4 mt-6">
          {paragraph}
        </h3>
      );
    }

    // Normal paragraf
    return (
      <p key={index} className="text-gray-700 leading-relaxed mb-4">
        {paragraph}
      </p>
    );
  });
};

export default function BlogDetailPage({ blog }) {
  const router = useRouter();

  if (!blog) return <div>Blog bulunamadı.</div>;

  // Mevcut blog hariç diğer blogları al (en fazla 4 tane)
  const otherBlogs = blogs
    .filter(b => slugify(b.title) !== slugify(blog.title))
    .slice(0, 4);

  const handleBlogClick = (blogSlug) => {
    router.push(`/blog/${blogSlug}`);
  };

  return (
    <>
      <Head>
        <title>{blog.title} - Uzman Dr. Burcu Yeşilkaya</title>
        <meta name="description" content={blog.description} />
      </Head>

      <MultiPageHeader
        subtitle="Blog Paylaşımlarımız"
        title={blog.title}
        isImage={false}
      />

      <div className="container mx-auto p-4 md:p-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sol - Ana İçerik */}
          <div className="lg:w-2/3">
            <div className="max-w-4xl">

              {/* Açıklama */}
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                {blog.description}
              </p>

              {/* Görsel */}
              <div className="mb-8">
                <Image
                  src={blog.image}
                  alt={blog.title}
                  width={1000}
                  height={600}
                  className="rounded-xl w-full h-auto shadow-lg"
                />
              </div>

              {/* İçerik */}
              <div className="prose prose-lg max-w-none">
                {formatContent(blog.content)}
              </div>
            </div>
          </div>

          {/* Sağ - Diğer Blog Yazıları */}
          <div className="lg:w-1/3">
            <div className="sticky top-8">
              {/* Diğer Yazılar Başlığı */}
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm mb-6">
                <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 rounded-t-lg">
                  <h3 className="font-semibold text-gray-900 text-lg">Diğer Blog Yazıları</h3>
                </div>
                
                {/* Blog Listesi */}
                <div className="divide-y divide-gray-200">
                  {otherBlogs.map((otherBlog, index) => (
                    <button
                      key={otherBlog.title}
                      onClick={() => handleBlogClick(slugify(otherBlog.title))}
                      className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors group"
                    >
                      <div className="flex items-start space-x-3">
                        {/* Küçük Görsel */}
                        <div className="flex-shrink-0 mt-1">
                          <Image
                            src={otherBlog.image}
                            alt={otherBlog.title}
                            width={60}
                            height={60}
                            className="rounded-lg object-cover w-12 h-12"
                          />
                        </div>
                        
                        {/* İçerik */}
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 mb-1">
                            {otherBlog.title}
                          </h4>
                          <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                            {otherBlog.description}
                          </p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Kategoriler */}
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
                <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 rounded-t-lg">
                  <h3 className="font-semibold text-gray-900 text-lg">Kategoriler</h3>
                </div>
                <div className="p-4">
                  <div className="flex flex-wrap gap-2">
                    {Array.from(new Set(blogs.map(blog => blog.category))).map((category, index) => (
                      <span
                        key={category}
                        className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Son Blog Yazıları (Mobil için) */}
              <div className="lg:hidden mt-6 bg-white rounded-lg border border-gray-200 shadow-sm">
                <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 rounded-t-lg">
                  <h3 className="font-semibold text-gray-900 text-lg">Popüler Yazılar</h3>
                </div>
                <div className="p-4 space-y-4">
                  {otherBlogs.slice(0, 3).map((popularBlog, index) => (
                    <div key={popularBlog.title} className="flex items-center space-x-3 group cursor-pointer">
                      <Image
                        src={popularBlog.image}
                        alt={popularBlog.title}
                        width={80}
                        height={80}
                        className="rounded-lg object-cover w-16 h-16 flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                          {popularBlog.title}
                        </h4>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigasyon Butonları */}
        <div className="flex justify-between items-center mt-12 pt-8 border-t border-gray-200">
          <button
            onClick={() => router.push('/blog')}
            className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-blue-600 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Tüm Yazılara Dön
          </button>
          
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-blue-600 transition-colors"
          >
            Yukarı Çık
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
}