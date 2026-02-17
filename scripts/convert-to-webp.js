const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const treatmentsDir = path.join(__dirname, '../public/images/treatments');

// Tüm görselleri bul
const files = fs.readdirSync(treatmentsDir).filter(file => 
  /\.(jpg|jpeg|png|JPG|JPEG|PNG)$/i.test(file)
);

console.log(`Found ${files.length} images to convert...\n`);

let converted = 0;
let skipped = 0;

files.forEach(file => {
  const inputPath = path.join(treatmentsDir, file);
  const outputPath = path.join(treatmentsDir, file.replace(/\.(jpg|jpeg|png|JPG|JPEG|PNG)$/i, '.webp'));
  
  // Eğer webp zaten varsa atla
  if (fs.existsSync(outputPath)) {
    console.log(`⏭ Skipped (already exists): ${file}`);
    skipped++;
    return;
  }
  
  try {
    // ImageMagick kullan
    try {
      execSync(`convert "${inputPath}" -quality 85 -resize 1200x800> "${outputPath}"`, { stdio: 'ignore' });
      console.log(`✓ Converted: ${file} -> ${path.basename(outputPath)}`);
      converted++;
      // Orijinal dosyayı sil
      fs.unlinkSync(inputPath);
    } catch (e) {
      // cwebp kullan
      try {
        execSync(`cwebp -q 85 "${inputPath}" -o "${outputPath}"`, { stdio: 'ignore' });
        console.log(`✓ Converted: ${file} -> ${path.basename(outputPath)}`);
        converted++;
        // Orijinal dosyayı sil
        fs.unlinkSync(inputPath);
      } catch (e2) {
        console.log(`✗ Could not convert ${file} - ImageMagick or cwebp not found`);
        console.log(`  Install ImageMagick: brew install imagemagick`);
        console.log(`  Or install webp tools: brew install webp`);
      }
    }
  } catch (error) {
    console.error(`Error processing ${file}:`, error.message);
  }
});

console.log(`\nCompleted: ${converted} converted, ${skipped} skipped`);
