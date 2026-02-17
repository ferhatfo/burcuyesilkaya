const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Görselleri kaynak klasörden al ve işle
const sourceDir = '/Users/ferhatorakci/Downloads/cihazli-tedaviler-gorselleri';
const targetDir = path.join(__dirname, '../public/images/treatments');

// Cihazlı Tedaviler için görsel eşleştirmeleri (görsel açıklamalarına göre)
const imageMappings = {
  // Görsel 1: Microneedling RF device - Morpheus 8 veya Altın İğne
  'morpheus-8': {
    sourceFiles: ['microneedling', 'rf', 'morpheus', 'needle'],
    description: 'Morpheus 8'
  },
  'altin-igne': {
    sourceFiles: ['microneedling', 'rf', 'gold', 'needle'],
    description: 'Altın İğne'
  },
  // Görsel 2: Laser hair removal - Alexandrite & Diod Lazer
  'alexandrite-diod-lazer': {
    sourceFiles: ['laser', 'hair', 'removal', 'alexandrite'],
    description: 'Alexandrite & Diod Lazer'
  },
  // Görsel 3: Microneedling device - Altın İğne veya Morpheus 8
  // Görsel 4: Black peel-off mask - Karbon Peeling
  'karbon-peeling': {
    sourceFiles: ['carbon', 'peel', 'mask', 'black'],
    description: 'Karbon Peeling'
  },
  // Görsel 5: Airbrush/oxygen facial - Jet Peel
  'jet-peel': {
    sourceFiles: ['oxygen', 'airbrush', 'jet', 'facial'],
    description: 'Jet Peel'
  },
  // Görsel 6: HIFU device - Fokus Ultrason
  'fokus-ultrason-hifu': {
    sourceFiles: ['hifu', 'ultrasound', 'focused', 'ultrasonic'],
    description: 'Fokus Ultrason (HIFU)'
  },
  // Görsel 7: LED light therapy - LED Işık Tedavileri
  'led-isik-tedavileri': {
    sourceFiles: ['led', 'light', 'therapy', 'mask'],
    description: 'LED Işık Tedavileri'
  },
  // Görsel 8: Red light therapy - LED Işık Tedavileri (alternatif)
  // Görsel 9: Laser treatment - Q-Switched veya IPL
  'q-switched-ndyag-lazer': {
    sourceFiles: ['laser', 'q-switched', 'ndyag', 'treatment'],
    description: 'Q-Switched Nd:YAG Lazer'
  },
  'ipl-yogun-atimli-isik': {
    sourceFiles: ['ipl', 'light', 'pulse', 'intense'],
    description: 'IPL'
  },
  // Görsel 10: Laser treatment - Kılcal Damar Lazerleri
  'kilcal-damar-lazerleri': {
    sourceFiles: ['laser', 'vascular', 'vein', 'capillary'],
    description: 'Kılcal Damar Lazerleri'
  },
  // Görsel 11: LED mask - LED Işık Tedavileri
  // Görsel 12: Fraksiyonel CO₂ Lazer
  'fraksiyonel-co2-lazer': {
    sourceFiles: ['co2', 'fractional', 'laser', 'resurfacing'],
    description: 'Fraksiyonel CO₂ Lazer'
  },
  // VelaShape
  'velashape': {
    sourceFiles: ['velashape', 'body', 'contouring', 'radiofrequency'],
    description: 'VelaShape'
  }
};

async function findAndProcessImage(slug, mapping) {
  if (!fs.existsSync(sourceDir)) {
    console.log(`⚠️  Kaynak klasör bulunamadı: ${sourceDir}`);
    console.log('Lütfen görselleri bu klasöre kaydedin.');
    return false;
  }

  const files = fs.readdirSync(sourceDir);
  const imageFiles = files.filter(f => 
    /\.(jpg|jpeg|png|webp)$/i.test(f)
  );

  if (imageFiles.length === 0) {
    console.log(`⚠️  ${sourceDir} klasöründe görsel bulunamadı.`);
    return false;
  }

  // İlk görseli kullan (daha sonra eşleştirme yapılabilir)
  const sourceFile = imageFiles[0];
  const sourcePath = path.join(sourceDir, sourceFile);
  const targetPath = path.join(targetDir, `${slug}.webp`);

  try {
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
    return true;
  } catch (error) {
    console.error(`✗ Error creating ${slug}:`, error.message);
    return false;
  }
}

async function processAll() {
  console.log('Cihazlı Tedaviler görsellerini işliyorum...\n');
  
  let created = 0;
  let errors = 0;

  for (const [slug, mapping] of Object.entries(imageMappings)) {
    const success = await findAndProcessImage(slug, mapping);
    if (success) {
      created++;
    } else {
      errors++;
    }
  }

  console.log(`\nTamamlandı: ${created} oluşturuldu, ${errors} hata`);
  
  if (errors > 0) {
    console.log('\nNot: Görselleri şu klasöre kaydedin:');
    console.log(sourceDir);
    console.log('\nGörselleri kaydettikten sonra scripti tekrar çalıştırın.');
  }
}

processAll().catch(console.error);
