const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Her hizmet için TAMAMEN benzersiz görsel eşleştirmeleri
// Kaynak klasöründeki farklı görselleri kullanarak maksimum çeşitlilik
const imageMappings = {
  // Botoks uygulamaları - HER BİRİ FARKLI
  'tum-yuz-botoksu': {
    source: 'SLIDER/Botox & Dolgu-Küçük dokunuşlar, büyük farklar yaratabilir..jpg',
    description: 'Tüm yüz botoksu'
  },
  'terleme-botoksu': {
    source: 'HİZMETLER/Aşırı Terleme (Hiperhidroz).jpg',
    description: 'Terleme botoksu'
  },
  'dis-sikma-masseter-botoksu': {
    source: 'UYGULAMALAR/Botulinum Toksin (Botoks) Uygulamaları.jpg',
    description: 'Diş sıkma botoksu'
  },
  'kas-kaldirma-botoksu': {
    source: 'SLIDER/Lazerli Tedaviler - Eşsiz teknolojiler ile hızlı ve güvenli sonuçlar..jpg',
    description: 'Kaş kaldırma botoksu'
  },
  
  // Dolgu uygulamaları - HER BİRİ FARKLI
  'hyaluronik-asit-dolgular': {
    source: 'UYGULAMALAR/Dolgu Uygulamaları.jpg',
    description: 'Hyaluronik asit dolgular'
  },
  'dudak-dolgusu': {
    source: 'HİZMETLER/Cilt Lekeleri (Melasma, Güneş Lekeleri vb.).jpg',
    description: 'Dudak dolgusu'
  },
  'yuz-dolgusu': {
    source: 'SLIDER/ALTIN İĞNE.jpg',
    description: 'Yüz dolgusu'
  },
  'goz-alti-isik-dolgusu': {
    source: 'SLIDER/En Değerli Giysiniz Cildiniz - Bilimsel dokunuşlarla sağlıklı ve güçlü bir cilt.jpg',
    description: 'Göz altı dolgusu'
  },
  'cene-hatti-dolgusu': {
    source: 'HİZMETLER/Rosacea (Gül Hastalığı).jpg',
    description: 'Çene hattı dolgusu'
  },
  'dolgu-eritme': {
    source: 'SLIDER/Morpheus 8 Mucizesi.jpg',
    description: 'Dolgu eritme'
  },
  
  // Cilt gençleştirme - HER BİRİ FARKLI
  'ameliyatsiz-yuz-germe': {
    source: 'CİHAZLI TEDAVİLER/FOKUS ULTRASON (HIFU – Genel).jpg',
    description: 'Ameliyatsız yüz germe'
  },
  'mezobotoks': {
    source: 'CİHAZLI TEDAVİLER/MORPHEUS 8 (Yeni Nesil Altın İğne – RF).png',
    description: 'Mezobotoks'
  },
  'somon-dna': {
    source: 'UYGULAMALAR/Cilt Bakımı & Peeling.jpg',
    description: 'Somon DNA'
  },
  'kollajen-uygulamalari': {
    source: 'CİHAZLI TEDAVİLER/ALTIN İĞNE (Mikro İğneli Radyofrekans).jpg',
    description: 'Kollajen uygulamaları'
  },
  
  // Akne ve iz tedavileri - HER BİRİ FARKLI
  'akne-ve-sivilce-tedavisi': {
    source: 'HİZMETLER/Akne (Sivilce).jpg',
    description: 'Akne tedavisi'
  },
  'akne-sivilce-izleri-tedavisi': {
    source: 'İz ve Doku Problemleri/Acne Scars.jpg',
    description: 'Akne izleri tedavisi'
  },
  'cerrahi-travmatik-iz-tedavileri': {
    source: 'İz ve Doku Problemleri/Cerrahi ve Travmatik İzler.jpg',
    description: 'Cerrahi iz tedavileri'
  },
  'cosmelan-leke-maskesi': {
    source: 'UYGULAMALAR/Leke, İz & Akne Tedavileri.jpg',
    description: 'Cosmelan leke maskesi'
  },
  
  // Lazer uygulamaları - HER BİRİ FARKLI
  'kilcal-damar-tedavisi': {
    source: 'CİHAZLI TEDAVİLER/KILCAL DAMAR LAZERLERİ.jpg',
    description: 'Kılcal damar tedavisi'
  },
  'yuz-damarlarinin-lazerle-tedavisi': {
    source: 'Diğer Dermatolojik Durumlar/Kılcal Damar Problemleri.jpg',
    description: 'Yüz damarları lazer tedavisi'
  },
  'dovme-silme': {
    source: 'UYGULAMALAR/Lazer Uygulamaları.jpg',
    description: 'Dövme silme'
  },
  
  // Cilt bakımı - HER BİRİ FARKLI
  'medikal-cilt-bakimi-jetpeel': {
    source: 'CİHAZLI TEDAVİLER/JET PEEL (Oksijenli Cilt Bakımı).jpg',
    description: 'JetPeel cilt bakımı'
  },
  'kimyasal-peeling': {
    source: 'CİHAZLI TEDAVİLER/IPL (Yoğun Atımlı Işık).jpg',
    description: 'Kimyasal peeling'
  },
  'isilti-peeling': {
    source: 'CİHAZLI TEDAVİLER/KARBON PEELING (Hollywood Peeling).jpg',
    description: 'Işıltı peeling'
  },
  
  // Saç tedavileri - HER BİRİ FARKLI
  'trikoskopik-sac-analizi': {
    source: 'Saç ve Deri Hastalıkları/Genetik Saç Dökülmesi (Androgenetik Alopesi).jpg',
    description: 'Trikoskopik saç analizi'
  },
  'sac-mezoterapisi': {
    source: 'UYGULAMALAR/Saç Sağlığı & Saç Tedavileri.jpg',
    description: 'Saç mezoterapisi'
  },
  'sac-prp': {
    source: 'Saç ve Deri Hastalıkları/Saçkıran (Alopecia Areata).jpg',
    description: 'Saç PRP'
  },
  'sac-ekimi-danismanligi': {
    source: 'Saç ve Deri Hastalıkları/Saçlı Deri Egzeması ve Kepek.jpg',
    description: 'Saç ekimi danışmanlığı'
  },
  
  // Bölgesel uygulamalar
  'ben-aldirma': {
    source: 'HİZMETLER/Benler ve Deri Lezyonları.jpg',
    description: 'Ben aldırma'
  },
};

const sourceDir = '/Users/ferhatorakci/Downloads/WEB Görselleri';
const targetDir = path.join(__dirname, '../public/images/treatments');

console.log('Creating truly unique images for each uygulama service...\n');

let created = 0;
let errors = 0;

async function createImage(slug, mapping) {
  const sourcePath = path.join(sourceDir, mapping.source);
  const targetPath = path.join(targetDir, `${slug}.webp`);
  
  if (!fs.existsSync(sourcePath)) {
    console.log(`✗ Source not found: ${mapping.source}`);
    errors++;
    return;
  }
  
  try {
    // Görseli optimize et ve webp'ye dönüştür
    await sharp(sourcePath)
      .resize(800, 600, {
        fit: 'inside',
        withoutEnlargement: true
      })
      .webp({ 
        quality: 85,
        effort: 6
      })
      .toFile(targetPath);
    
    const stats = fs.statSync(targetPath);
    console.log(`✓ ${slug}.webp (${(stats.size / 1024).toFixed(0)}KB) - ${mapping.description}`);
    created++;
  } catch (error) {
    console.error(`✗ Error creating ${slug}:`, error.message);
    errors++;
  }
}

async function processAll() {
  for (const [slug, mapping] of Object.entries(imageMappings)) {
    await createImage(slug, mapping);
  }
  
  console.log(`\nCompleted: ${created} created, ${errors} errors`);
  
  if (errors > 0) {
    console.log('\n⚠️  Some images could not be created.');
    console.log('For completely unique images from the internet, consider:');
    console.log('- Unsplash.com (search: "dermatology", "botox", "facial treatment")');
    console.log('- Pexels.com (search: "skin care", "medical procedure")');
    console.log('- Pixabay.com (search: "dermatology treatment", "cosmetic procedure")');
    console.log('- Download and convert to WebP format using online tools');
  }
}

processAll().catch(console.error);
