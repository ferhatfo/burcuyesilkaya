const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Kaynak klasör
const sourceDir = '/Users/ferhatorakci/Downloads/WEB Görselleri/CİHAZLI TEDAVİLER';
const targetDir = path.join(__dirname, '../public/images/treatments');

// Dosya isimlerine göre eşleştirmeler
const imageMappings = {
  'MORPHEUS 8 (Yeni Nesil Altın İğne – RF).png': 'morpheus-8',
  'ALTIN İĞNE (Mikro İğneli Radyofrekans).jpg': 'altin-igne',
  'FRAKSİYONEL CO₂ LAZER.jpg': 'fraksiyonel-co2-lazer',
  'Q-SWITCHED.Nd.YAGLAZER.jpg': 'q-switched-ndyag-lazer',
  'IPL (Yoğun Atımlı Işık).jpg': 'ipl-yogun-atimli-isik',
  'ALEXANDRITE & DİOD LAZER.png': 'alexandrite-diod-lazer',
  'KILCAL DAMAR LAZERLERİ.jpg': 'kilcal-damar-lazerleri',
  'JET PEEL (Oksijenli Cilt Bakımı).jpg': 'jet-peel',
  'KARBON PEELING (Hollywood Peeling).jpg': 'karbon-peeling',
  'VELASHAPE.jpg': 'velashape',
  'FOKUS ULTRASON (HIFU – Genel).jpg': 'fokus-ultrason-hifu',
  'LED IŞIK TEDAVİLERİ.jpg': 'led-isik-tedavileri'
};

console.log('Cihazlı Tedaviler görsellerini işliyorum...\n');

let created = 0;
let errors = 0;
let skipped = 0;

async function processImage(sourceFileName, targetSlug) {
  const sourcePath = path.join(sourceDir, sourceFileName);
  const targetPath = path.join(targetDir, `${targetSlug}.webp`);
  
  if (!fs.existsSync(sourcePath)) {
    console.log(`✗ Kaynak bulunamadı: ${sourceFileName}`);
    errors++;
    return false;
  }
  
  // Hedef dosya zaten varsa atla
  if (fs.existsSync(targetPath)) {
    console.log(`⊘ ${targetSlug}.webp zaten mevcut, atlanıyor`);
    skipped++;
    return true;
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
    console.log(`✓ ${targetSlug}.webp (${(stats.size / 1024).toFixed(0)}KB) - ${sourceFileName}`);
    created++;
    return true;
  } catch (error) {
    console.error(`✗ Hata: ${targetSlug} - ${error.message}`);
    errors++;
    return false;
  }
}

async function processAll() {
  // Önce kaynak klasördeki tüm dosyaları listele
  if (!fs.existsSync(sourceDir)) {
    console.log(`✗ Kaynak klasör bulunamadı: ${sourceDir}`);
    return;
  }
  
  const files = fs.readdirSync(sourceDir);
  console.log(`Kaynak klasörde ${files.length} dosya bulundu.\n`);
  
  // Eşleştirmeleri işle
  for (const [sourceFile, targetSlug] of Object.entries(imageMappings)) {
    await processImage(sourceFile, targetSlug);
  }
  
  console.log(`\nTamamlandı: ${created} oluşturuldu, ${skipped} atlandı, ${errors} hata`);
  
  if (created > 0) {
    console.log('\n✅ Görseller başarıyla işlendi ve WebP formatına dönüştürüldü!');
  }
}

processAll().catch(console.error);
