const fs = require('fs');
const path = require('path');

// Blog görsel eşleştirmeleri
const blogImageMappings = {
  'akne-tedavisi-antalya': { source: 'HİZMETLER/Akne (Sivilce).jpg', category: 'HİZMETLER' },
  'cilt-lekeleri-tedavisi-antalya': { source: 'HİZMETLER/Cilt Lekeleri (Melasma, Güneş Lekeleri vb.).jpg', category: 'HİZMETLER' },
  'sac-dokulmesi-tedavisi-antalya': { source: 'Saç ve Deri Hastalıkları/Genetik Saç Dökülmesi (Androgenetik Alopesi).jpg', category: 'Saç ve Deri Hastalıkları' },
  'botoks-dolgu-antalya': { source: 'SLIDER/Botox & Dolgu-Küçük dokunuşlar, büyük farklar yaratabilir..jpg', category: 'SLIDER' },
  'lazer-epilasyon-antalya': { source: 'UYGULAMALAR/Lazer Uygulamaları.jpg', category: 'UYGULAMALAR' },
  'morpheus-8-antalya': { source: 'SLIDER/Morpheus 8 Mucizesi.jpg', category: 'SLIDER' },
};

const sourceDir = '/Users/ferhatorakci/Downloads/WEB Görselleri';
const targetDir = path.join(__dirname, '../public/images/blogs');

// Klasörü oluştur
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
  console.log(`Created directory: ${targetDir}`);
}

// Görselleri kopyala
let copied = 0;
let notFound = 0;

Object.entries(blogImageMappings).forEach(([slug, mapping]) => {
  const sourcePath = path.join(sourceDir, mapping.source);
  const ext = path.extname(mapping.source);
  const targetPath = path.join(targetDir, `${slug}${ext}`);
  
  if (fs.existsSync(sourcePath)) {
    try {
      fs.copyFileSync(sourcePath, targetPath);
      console.log(`✓ Copied: ${mapping.source} -> ${slug}${ext}`);
      copied++;
    } catch (error) {
      console.error(`✗ Error copying ${mapping.source}:`, error.message);
    }
  } else {
    console.log(`✗ Not found: ${sourcePath}`);
    notFound++;
  }
});

console.log(`\nCompleted: ${copied} images copied, ${notFound} not found`);
console.log(`\nNote: Run optimize-images.js to convert to WebP format`);
