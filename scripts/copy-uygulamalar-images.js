const fs = require('fs');
const path = require('path');

// Uygulamalar görsel eşleştirmeleri - gönderilen görsellerden
const uygulamaImageMappings = {
  // Botoks uygulamaları
  'tum-yuz-botoksu': { source: 'botoks-dolgu', description: 'Botoks enjeksiyonu görseli' },
  'terleme-botoksu': { source: 'botoks-dolgu', description: 'Botoks enjeksiyonu görseli' },
  'dis-sikma-masseter-botoksu': { source: 'botoks-dolgu', description: 'Botoks enjeksiyonu görseli' },
  'kas-kaldirma-botoksu': { source: 'botoks-dolgu', description: 'Botoks enjeksiyonu görseli' },
  
  // Dolgu uygulamaları
  'hyaluronik-asit-dolgular': { source: 'dudak-dolgusu', description: 'Dolgu enjeksiyonu görseli' },
  'dudak-dolgusu': { source: 'dudak-dolgusu', description: 'Dudak dolgusu görseli' },
  'yuz-dolgusu': { source: 'botoks-dolgu', description: 'Yüz dolgusu görseli' },
  'goz-alti-isik-dolgusu': { source: 'botoks-dolgu', description: 'Göz altı dolgusu görseli' },
  'cene-hatti-dolgusu': { source: 'botoks-dolgu', description: 'Çene dolgusu görseli' },
  'dolgu-eritme': { source: 'botoks-dolgu', description: 'Dolgu işlemi görseli' },
  
  // Cilt gençleştirme
  'ameliyatsiz-yuz-germe': { source: 'cilt-bakimi', description: 'Cilt bakımı görseli' },
  'mezobotoks': { source: 'botoks-dolgu', description: 'Mezobotoks görseli' },
  'somon-dna': { source: 'cilt-bakimi', description: 'Cilt bakımı görseli' },
  'kollajen-uygulamalari': { source: 'cilt-bakimi', description: 'Cilt bakımı görseli' },
  
  // Akne ve iz tedavileri
  'akne-ve-sivilce-tedavisi': { source: 'akne', description: 'Akne tedavisi görseli' },
  'akne-sivilce-izleri-tedavisi': { source: 'akne', description: 'Akne izleri görseli' },
  'cerrahi-travmatik-iz-tedavileri': { source: 'cilt-bakimi', description: 'İz tedavisi görseli' },
  'cosmelan-leke-maskesi': { source: 'cilt-bakimi', description: 'Leke maskesi görseli' },
  
  // Lazer uygulamaları
  'kilcal-damar-tedavisi': { source: 'lazer-ipl', description: 'Lazer tedavisi görseli' },
  'yuz-damarlarinin-lazerle-tedavisi': { source: 'lazer-ipl', description: 'Lazer tedavisi görseli' },
  'dovme-silme': { source: 'lazer-ipl', description: 'Lazer tedavisi görseli' },
  
  // Cilt bakımı
  'medikal-cilt-bakimi-jetpeel': { source: 'cilt-bakimi', description: 'Cilt bakımı görseli' },
  'kimyasal-peeling': { source: 'cilt-bakimi', description: 'Peeling görseli' },
  'isilti-peeling': { source: 'cilt-bakimi', description: 'Peeling görseli' },
  
  // Saç tedavileri
  'trikoskopik-sac-analizi': { source: 'sac-bakimi', description: 'Saç bakımı görseli' },
  'sac-mezoterapisi': { source: 'sac-bakimi', description: 'Saç bakımı görseli' },
  'sac-prp': { source: 'sac-bakimi', description: 'Saç bakımı görseli' },
  'sac-ekimi-danismanligi': { source: 'sac-bakimi', description: 'Saç bakımı görseli' },
  
  // Bölgesel
  'ben-aldirma': { source: 'cilt-bakimi', description: 'Ben aldırma görseli' },
};

// Görselleri kullanıcının gönderdiği görsellerden eşleştir
// Not: Gerçek görselleri kullanıcıdan alacağız, şimdilik placeholder
const sourceImages = {
  'botoks-dolgu': 'botoks-dolgu-antalya.jpg', // Blog görselinden
  'dudak-dolgusu': 'dudak-dolgusu.jpg', // Gönderilen görsel
  'cilt-bakimi': 'cilt-bakimi.jpg', // Gönderilen görsel
  'akne': 'akne-tedavisi-antalya.jpg', // Blog görselinden
  'lazer-ipl': 'lazer-epilasyon-antalya.jpg', // Blog görselinden
  'sac-bakimi': 'sac-bakimi.jpg', // Gönderilen görsel
};

const sourceDir = '/Users/ferhatorakci/Downloads/WEB Görselleri';
const targetDir = path.join(__dirname, '../public/images/treatments');

// Klasörü oluştur
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
  console.log(`Created directory: ${targetDir}`);
}

console.log('Uygulamalar görselleri için eşleştirme yapılıyor...\n');

// Mevcut blog görsellerini kontrol et
const blogImagesDir = path.join(__dirname, '../public/images/blogs');
let copied = 0;
let notFound = 0;

Object.entries(uygulamaImageMappings).forEach(([slug, mapping]) => {
  const targetPath = path.join(targetDir, `${slug}.webp`);
  
  // Eğer zaten varsa atla
  if (fs.existsSync(targetPath)) {
    console.log(`⏭ Skipped (already exists): ${slug}.webp`);
    return;
  }
  
  // Blog görsellerinden kopyala
  let sourcePath = null;
  
  if (mapping.source === 'botoks-dolgu') {
    sourcePath = path.join(blogImagesDir, 'botoks-dolgu-antalya.webp');
  } else if (mapping.source === 'akne') {
    sourcePath = path.join(blogImagesDir, 'akne-tedavisi-antalya.webp');
  } else if (mapping.source === 'lazer-ipl') {
    sourcePath = path.join(blogImagesDir, 'lazer-epilasyon-antalya.webp');
  }
  
  if (sourcePath && fs.existsSync(sourcePath)) {
    try {
      fs.copyFileSync(sourcePath, targetPath);
      console.log(`✓ Copied: ${slug}.webp (from ${mapping.source})`);
      copied++;
    } catch (error) {
      console.error(`✗ Error copying ${slug}:`, error.message);
      notFound++;
    }
  } else {
    console.log(`✗ Source not found for ${slug} (${mapping.source})`);
    notFound++;
  }
});

console.log(`\nCompleted: ${copied} images copied, ${notFound} need manual addition`);
console.log(`\nNote: Some images need to be added manually from the provided images`);
