const fs = require('fs');
const path = require('path');

let sharp;
try {
  sharp = require('sharp');
} catch (e) {
  console.error('Sharp is not installed. Please run: npm install');
  process.exit(1);
}

const treatmentsDir = path.join(__dirname, '../public/images/treatments');

// Uygulamalar kategorisindeki görseller
const uygulamaImages = [
  'tum-yuz-botoksu',
  'terleme-botoksu',
  'dis-sikma-masseter-botoksu',
  'kas-kaldirma-botoksu',
  'hyaluronik-asit-dolgular',
  'dudak-dolgusu',
  'yuz-dolgusu',
  'goz-alti-isik-dolgusu',
  'cene-hatti-dolgusu',
  'dolgu-eritme',
  'ameliyatsiz-yuz-germe',
  'mezobotoks',
  'somon-dna',
  'kollajen-uygulamalari',
  'akne-ve-sivilce-tedavisi',
  'akne-sivilce-izleri-tedavisi',
  'cerrahi-travmatik-iz-tedavileri',
  'cosmelan-leke-maskesi',
  'kilcal-damar-tedavisi',
  'yuz-damarlarinin-lazerle-tedavisi',
  'dovme-silme',
  'medikal-cilt-bakimi-jetpeel',
  'kimyasal-peeling',
  'isilti-peeling',
  'trikoskopik-sac-analizi',
  'sac-mezoterapisi',
  'sac-prp',
  'sac-ekimi-danismanligi',
  'ben-aldirma',
];

console.log(`Optimizing ${uygulamaImages.length} uygulama images...\n`);

let optimized = 0;
let skipped = 0;
let errors = 0;

async function optimizeImage(filename) {
  const inputPath = path.join(treatmentsDir, `${filename}.webp`);
  const tempPath = path.join(treatmentsDir, `${filename}_temp.webp`);
  
  // Eğer dosya yoksa atla
  if (!fs.existsSync(inputPath)) {
    console.log(`⏭ Skipped (not found): ${filename}.webp`);
    skipped++;
    return;
  }
  
  try {
    // Görseli optimize et
    await sharp(inputPath)
      .resize(800, 600, {
        fit: 'inside',
        withoutEnlargement: true
      })
      .webp({ 
        quality: 85,
        effort: 6
      })
      .toFile(tempPath);
    
    // Orijinal dosyanın boyutunu kontrol et
    const originalStats = fs.statSync(inputPath);
    const newStats = fs.statSync(tempPath);
    
    // Yeni dosya daha küçükse değiştir
    if (newStats.size < originalStats.size) {
      fs.renameSync(tempPath, inputPath);
      const savings = ((1 - newStats.size / originalStats.size) * 100).toFixed(1);
      console.log(`✓ ${filename}.webp optimized (${(originalStats.size / 1024).toFixed(0)}KB -> ${(newStats.size / 1024).toFixed(0)}KB, ${savings}% smaller)`);
      optimized++;
    } else {
      // Yeni dosya daha büyükse sil
      fs.unlinkSync(tempPath);
      console.log(`⏭ ${filename}.webp already optimized`);
      skipped++;
    }
  } catch (error) {
    if (fs.existsSync(tempPath)) {
      fs.unlinkSync(tempPath);
    }
    console.error(`✗ Error processing ${filename}:`, error.message);
    errors++;
  }
}

async function processAll() {
  for (const filename of uygulamaImages) {
    await optimizeImage(filename);
  }
  
  console.log(`\nCompleted: ${optimized} optimized, ${skipped} skipped, ${errors} errors`);
}

processAll().catch(console.error);
