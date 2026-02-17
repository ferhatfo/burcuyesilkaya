const fs = require('fs');
const path = require('path');

let sharp;
try {
  sharp = require('sharp');
} catch (e) {
  console.error('Sharp is not installed. Please run: npm install');
  process.exit(1);
}

const blogsDir = path.join(__dirname, '../public/images/blogs');

// Tüm JPG/PNG dosyalarını bul
const files = fs.readdirSync(blogsDir).filter(file => 
  /\.(jpg|jpeg|png|JPG|JPEG|PNG)$/i.test(file)
);

console.log(`Found ${files.length} blog images to optimize...\n`);

let converted = 0;
let errors = 0;

async function optimizeImage(file) {
  const inputPath = path.join(blogsDir, file);
  const outputPath = path.join(blogsDir, file.replace(/\.(jpg|jpeg|png|JPG|JPEG|PNG)$/i, '.webp'));
  
  // Eğer webp zaten varsa atla
  if (fs.existsSync(outputPath)) {
    console.log(`⏭ Skipped (already exists): ${file}`);
    return;
  }
  
  try {
    // Görseli optimize et ve webp'ye dönüştür
    await sharp(inputPath)
      .resize(1200, 800, {
        fit: 'inside',
        withoutEnlargement: true
      })
      .webp({ 
        quality: 85,
        effort: 6
      })
      .toFile(outputPath);
    
    // Orijinal dosyanın boyutunu kontrol et
    const originalStats = fs.statSync(inputPath);
    const newStats = fs.statSync(outputPath);
    const savings = ((1 - newStats.size / originalStats.size) * 100).toFixed(1);
    
    console.log(`✓ ${file} -> ${path.basename(outputPath)} (${(originalStats.size / 1024).toFixed(0)}KB -> ${(newStats.size / 1024).toFixed(0)}KB, ${savings}% smaller)`);
    
    // Orijinal dosyayı sil
    fs.unlinkSync(inputPath);
    
    converted++;
  } catch (error) {
    console.error(`✗ Error processing ${file}:`, error.message);
    errors++;
  }
}

async function processAll() {
  for (const file of files) {
    await optimizeImage(file);
  }
  
  console.log(`\nCompleted: ${converted} converted, ${errors} errors`);
}

processAll().catch(console.error);
