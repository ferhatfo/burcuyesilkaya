const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Kaynak klasöründeki UYGULAMALAR görsellerini eşleştir
const sourceMappings = {
  'Botulinum Toksin (Botoks) Uygulamaları.jpg': [
    'tum-yuz-botoksu',
    'terleme-botoksu',
    'dis-sikma-masseter-botoksu',
    'kas-kaldirma-botoksu',
  ],
  'Dolgu Uygulamaları.jpg': [
    'hyaluronik-asit-dolgular',
    'dudak-dolgusu',
    'yuz-dolgusu',
    'goz-alti-isik-dolgusu',
    'cene-hatti-dolgusu',
    'dolgu-eritme',
  ],
  'Cilt Bakımı & Peeling.jpg': [
    'medikal-cilt-bakimi-jetpeel',
    'kimyasal-peeling',
    'isilti-peeling',
  ],
  'Leke, İz & Akne Tedavileri.jpg': [
    'akne-ve-sivilce-tedavisi',
    'akne-sivilce-izleri-tedavisi',
    'cerrahi-travmatik-iz-tedavileri',
    'cosmelan-leke-maskesi',
  ],
  'Saç Sağlığı & Saç Tedavileri.jpg': [
    'trikoskopik-sac-analizi',
    'sac-mezoterapisi',
    'sac-prp',
    'sac-ekimi-danismanligi',
  ],
};

const sourceDir = '/Users/ferhatorakci/Downloads/WEB Görselleri/UYGULAMALAR';
const targetDir = path.join(__dirname, '../public/images/treatments');

console.log('Copying and optimizing uygulama images from source...\n');

let processed = 0;
let errors = 0;

async function processImage(sourceFile, targetSlugs) {
  const sourcePath = path.join(sourceDir, sourceFile);
  
  if (!fs.existsSync(sourcePath)) {
    console.log(`✗ Source not found: ${sourceFile}`);
    errors++;
    return;
  }
  
  for (const slug of targetSlugs) {
    const targetPath = path.join(targetDir, `${slug}.webp`);
    
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
      console.log(`✓ ${slug}.webp (${(stats.size / 1024).toFixed(0)}KB) from ${sourceFile}`);
      processed++;
    } catch (error) {
      console.error(`✗ Error processing ${slug}:`, error.message);
      errors++;
    }
  }
}

async function processAll() {
  for (const [sourceFile, targetSlugs] of Object.entries(sourceMappings)) {
    await processImage(sourceFile, targetSlugs);
  }
  
  console.log(`\nCompleted: ${processed} images processed, ${errors} errors`);
}

processAll().catch(console.error);
