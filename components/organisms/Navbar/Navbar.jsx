import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { gsap } from 'gsap';

const menuItems = [
  { name: 'Anasayfa', href: '/' },
  { name: 'Hakkımızda', href: '/hakkimizda' },
  { name: 'Tedaviler', href: '/tedaviler' },
  { name: 'Uygulamalar', href: '/uygulamalar' },
  { name: 'Cihazlı Tedaviler', href: '/cihazli-tedaviler' },
  { name: 'Blog', href: '/blog' },
  { name: 'İletişim', href: '/iletisim' },
  { name: 'Instagram', iconSrc: '/images/svg/Instagram.svg', href: 'https://www.instagram.com/dermatologdr.burcuyesilkaya', isIcon: true },
];


export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('tr');
  const menuRef = useRef(null);
  const linksRef = useRef([]);

  useEffect(() => {
    // Check current language from Google Translate cookie
    const checkLanguage = () => {
      const cookie = document.cookie.split(';').find(c => c.trim().startsWith('googtrans='));
      if (cookie) {
        const lang = cookie.split('/').pop();
        setCurrentLang(lang === 'en' ? 'en' : 'tr');
      }
    };
    
    checkLanguage();
    const interval = setInterval(checkLanguage, 500);
    return () => clearInterval(interval);
  }, []);

  const changeLanguage = (lang) => {
    const targetLang = lang === 'tr' ? 'tr' : 'en';
    
    // Try multiple methods to trigger translation
    const googleTranslateCombo = document.querySelector('.goog-te-combo');
    if (googleTranslateCombo) {
      googleTranslateCombo.value = targetLang;
      googleTranslateCombo.dispatchEvent(new Event('change'));
      setCurrentLang(targetLang);
    } else {
      // Fallback: Set cookie directly
      const domain = window.location.hostname;
      document.cookie = `googtrans=/tr/${targetLang}; path=/; domain=${domain}`;
      document.cookie = `googtrans=/tr/${targetLang}; path=/`;
      setCurrentLang(targetLang);
      window.location.reload();
    }
  };

  useEffect(() => {
    if (isOpen) {
      gsap.fromTo(
        menuRef.current,
        { x: '-100%' },
        { x: '0%', duration: 0.5, ease: 'power3.out' }
      );
      gsap.fromTo(
        linksRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power3.out',
          stagger: 0.1,
          delay: 0.2,
        }
      );
    } else {
      gsap.to(menuRef.current, {
        x: '-100%',
        duration: 0.5,
        ease: 'power3.in',
      });
    }
  }, [isOpen]);

  return (
    <header className="relative top-0 left-0 w-full z-50 bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/">
          <Image src="/images/svg/logo.svg" alt="Logo" width={250} height={60} />
        </Link>

        <div className="flex items-center gap-3 lg:hidden">
          <button
            onClick={() => changeLanguage(currentLang === 'tr' ? 'en' : 'tr')}
            className="px-2 py-1.5 rounded-md bg-[#f5f5f5] hover:bg-[#e8e8e8] text-[#383838] font-medium transition-colors duration-200 flex items-center gap-1.5"
            aria-label="Change Language"
          >
            {currentLang === 'tr' ? (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 60 30">
                  <rect width="60" height="30" fill="#012169"/>
                  <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6"/>
                  <path d="M0,0 L60,30 M60,0 L0,30" stroke="#C8102E" strokeWidth="4" clipPath="url(#clip)"/>
                  <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10"/>
                  <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6"/>
                </svg>
                <span className="text-xs">EN</span>
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 1200 800">
                  <rect width="1200" height="800" fill="#E30A17"/>
                  <g transform="translate(400,400)">
                    <circle r="200" fill="white"/>
                    <circle cx="60" r="160" fill="#E30A17"/>
                    <g transform="translate(140,0) rotate(0)">
                      <path d="M 0,-180 L 52.36,-55.28 L 180,-55.28 L 78.54,27.64 L 130.9,152.36 L 0,69.44 L -130.9,152.36 L -78.54,27.64 L -180,-55.28 L -52.36,-55.28 Z" 
                            fill="white" 
                            transform="scale(0.35)"/>
                    </g>
                  </g>
                </svg>
                <span className="text-xs">TR</span>
              </>
            )}
          </button>
          
          <button
            className="text-3xl z-[60] text-[#383838]"
            onClick={() => setIsOpen((prev) => !prev)}
          >
            {isOpen ? '✕' : '☰'}
          </button>
        </div>

        <nav className="hidden lg:flex text-sm gap-4 font-medium items-center">
          {menuItems.map((item) => (
            <Link key={item.name} href={item.href} className="flex items-center gap-2 text-[#383838]" target={item.isIcon ? '_blank' : undefined} rel={item.isIcon ? 'noopener noreferrer' : undefined}>
              {item.isIcon ? (
                <Image src={item.iconSrc} alt="Icon" width={24} height={24} />
              ) : (
                item.name
              )}
            </Link>
          ))}
          <button
            onClick={() => changeLanguage(currentLang === 'tr' ? 'en' : 'tr')}
            className="ml-2 px-3 py-1.5 rounded-md bg-[#f5f5f5] hover:bg-[#e8e8e8] text-[#383838] font-medium transition-colors duration-200 flex items-center gap-1.5"
            aria-label="Change Language"
          >
            {currentLang === 'tr' ? (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 60 30">
                  <rect width="60" height="30" fill="#012169"/>
                  <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6"/>
                  <path d="M0,0 L60,30 M60,0 L0,30" stroke="#C8102E" strokeWidth="4" clipPath="url(#clip)"/>
                  <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10"/>
                  <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6"/>
                </svg>
                <span>EN</span>
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 1200 800">
                  <rect width="1200" height="800" fill="#E30A17"/>
                  <g transform="translate(400,400)">
                    <circle r="200" fill="white"/>
                    <circle cx="60" r="160" fill="#E30A17"/>
                    <g transform="translate(140,0) rotate(0)">
                      <path d="M 0,-180 L 52.36,-55.28 L 180,-55.28 L 78.54,27.64 L 130.9,152.36 L 0,69.44 L -130.9,152.36 L -78.54,27.64 L -180,-55.28 L -52.36,-55.28 Z" 
                            fill="white" 
                            transform="scale(0.35)"/>
                    </g>
                  </g>
                </svg>
                <span>TR</span>
              </>
            )}
          </button>
        </nav>

        <div
          ref={menuRef}
          className="fixed top-0 left-0 h-screen w-full bg-white z-40 flex flex-col justify-center items-center lg:hidden"
          style={{ transform: 'translateX(-100%)' }}
        >
          <ul className="space-y-6 text-center">
            {menuItems.map((item, index) => (
              <li
                key={item.name}
                ref={(el) => (linksRef.current[index] = el)}
              >
                <Link
                  href={item.href}
                  target={item.isIcon ? '_blank' : undefined}
                  rel={item.isIcon ? 'noopener noreferrer' : undefined}
                  className="text-xl font-medium flex items-center justify-center gap-2 text-[#383838]"
                  onClick={() => setIsOpen(false)}
                >
                  {item.isIcon ? (
                    <Image src={item.iconSrc} alt="Icon" width={24} height={24} />
                  ) : (
                    item.name
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
}
