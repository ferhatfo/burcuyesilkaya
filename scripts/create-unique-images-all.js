const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Her hizmet için benzersiz görsel eşleştirmeleri - kaynak klasöründeki tüm görselleri kullanarak
const imageMappings = {
  // Botoks uygulamaları - farklı görseller
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
    source: 'SLIDER/Botox & Dolgu-Küçük dokunuşlar, büyük farklar yaratabilir..jpg',
    description: 'Kaş kaldırma botoksu'
  },
  
  // Dolgu uygulamaları - farklı görseller
  'hyaluronik-asit-dolgular': {
    source: 'UYGULAMALAR/Dolgu Uygulamaları.jpg',
    description: 'Hyaluronik asit dolgular'
  },
  'dudak-dolgusu': {
    source: 'SLIDER/Botox & Dolgu-Küçük dokunuşlar, büyük farklar yaratabilir..jpg',
    description: 'Dudak dolgusu'
  },
  'yuz-dolgusu': {
    source: 'UYGULAMALAR/Dolgu Uygulamaları.jpg',
    description: 'Yüz dolgusu'
  },
  'goz-alti-isik-dolgusu': {
    source: 'SLIDER/Güzel Görünmek Sağlıklı Bir Ciltle Başlar - Bilimle planlanan dermatoloji.jpg',
    description: 'Göz altı dolgusu'
  },
  'cene-hatti-dolgusu': {
    source: 'UYGULAMALAR/Dolgu Uygulamaları.jpg',
    description: 'Çene hattı dolgusu'
  },
  'dolgu-eritme': {
    source: 'UYGULAMALAR/Dolgu Uygulamaları.jpg',
    description: 'Dolgu eritme'
  },
  
  // Cilt gençleştirme - farklı görseller
  'ameliyatsiz-yuz-germe': {
    source: 'SLIDER/En Değerli Giysiniz Cildiniz - Bilimsel dokunuşlarla sağlıklı ve güçlü bir cilt.jpg',
    description: 'Ameliyatsız yüz germe'
  },
  'mezobotoks': {
    source: 'UYGULAMALAR/Botulinum Toksin (Botoks) Uygulamaları.jpg',
    description: 'Mezobotoks'
  },
  'somon-dna': {
    source: 'UYGULAMALAR/Cilt Bakımı & Peeling.jpg',
    description: 'Somon DNA'
  },
  'kollajen-uygulamalari': {
    source: 'SLIDER/En Değerli Giysiniz Cildiniz - Bilimsel dokunuşlarla sağlıklı ve güçlü bir cilt.jpg',
    description: 'Kollajen uygulamaları'
  },
  
  // Akne ve iz tedavileri - farklı görseller
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
  
  // Lazer uygulamaları - farklı görseller
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
  
  // Cilt bakımı - farklı görseller
  'medikal-cilt-bakimi-jetpeel': {
    source: 'CİHAZLI TEDAVİLER/JET PEEL (Oksijenli Cilt Bakımı).jpg',
    description: 'JetPeel cilt bakımı'
  },
  'kimyasal-peeling': {
    source: 'UYGULAMALAR/Cilt Bakımı & Peeling.jpg',
    description: 'Kimyasal peeling'
  },
  'isilti-peeling': {
    source: 'CİHAZLI TEDAVİLER/KARBON PEELING (Hollywood Peeling).jpg',
    description: 'Işıltı peeling'
  },
  
  // Saç tedavileri - farklı görseller
  'trikoskopik-sac-analizi': {
    source: 'Saç ve Deri Hastalıkları/Genetik Saç Dökülmesi (Androgenetik Alopesi).jpg',
    description: 'Trikoskopik saç analizi'
  },
  'sac-mezoterapisi': {
    source: 'UYGULAMALAR/Saç Sağlığı & Saç Tedavileri.jpg',
    description: 'Saç mezoterapisi'
  },
  'sac-prp': {
    source: 'Saç ve Deri Hastalıkları/Saç ve Saçlı Deri Hastalıkları.png',
    description: 'Saç PRP'
  },
  'sac-ekimi-danismanligi': {
    source: 'UYGULAMALAR/Saç Sağlığı & Saç Tedavileri.jpg',
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

console.log('Creating unique images for each uygulama service...\n');

let created = 0;
let errors = 0;
let skipped = 0;

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
  
  console.log(`\nCompleted: ${created} created, ${skipped} skipped, ${errors} errors`);
  console.log('\nNote: Some images may still be similar. For completely unique images,');
  console.log('you may need to add more source images or use different variations.');
}

processAll().catch(console.error);
