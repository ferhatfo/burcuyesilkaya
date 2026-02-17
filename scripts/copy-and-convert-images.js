const fs = require('fs');
const path = require('path');

// Görsel eşleştirmeleri
const imageMappings = {
  'vitiligo': { source: 'HİZMETLER/vitiligo.jpg', category: 'HİZMETLER' },
  'sedef-hastaligi-psoriasis': { source: 'HİZMETLER/Sedef Hastalığı (Psoriasis).jpg', category: 'HİZMETLER' },
  'egzema-atopik-seboreik-kontakt-dermatit': { source: 'HİZMETLER/Egzema (Atopik, Seboreik, Kontakt Dermatit).jpg', category: 'HİZMETLER' },
  'akne-sivilce': { source: 'HİZMETLER/Akne (Sivilce).jpg', category: 'HİZMETLER' },
  'rosacea-gul-hastaligi': { source: 'HİZMETLER/Rosacea (Gül Hastalığı).jpg', category: 'HİZMETLER' },
  'urtiker-kurdesen': { source: 'HİZMETLER/Ürtiker (Kurdeşen).jpg', category: 'HİZMETLER' },
  'mantar-enfeksiyonlari': { source: 'HİZMETLER/Mantar Enfeksiyonları.jpg', category: 'HİZMETLER' },
  'bakteriyel-cilt-enfeksiyonlari': { source: 'HİZMETLER/Bakteriyel Cilt Enfeksiyonları.jpg', category: 'HİZMETLER' },
  'viral-cilt-hastaliklari-ucuk-zona-vb': { source: 'HİZMETLER/Viral Cilt Hastalıkları (Uçuk, Zona vb.).jpg', category: 'HİZMETLER' },
  'paraziter-cilt-hastaliklari-uyuz-bit': { source: 'HİZMETLER/Paraziter Cilt Hastalıkları (Uyuz, Bit).jpg', category: 'HİZMETLER' },
  'cilt-lekeleri-melasma-gunes-lekeleri-vb': { source: 'HİZMETLER/Cilt Lekeleri (Melasma, Güneş Lekeleri vb.).jpg', category: 'HİZMETLER' },
  'cilt-kanserleri-ve-kanser-oncesi-lezyonlar': { source: 'HİZMETLER/Cilt Kanserleri ve Kanser Öncesi Lezyonlar.jpg', category: 'HİZMETLER' },
  'benler-ve-deri-lezyonlari': { source: 'HİZMETLER/Benler ve Deri Lezyonları.jpg', category: 'HİZMETLER' },
  'asiri-terleme-hiperhidroz': { source: 'HİZMETLER/Aşırı Terleme (Hiperhidroz).jpg', category: 'HİZMETLER' },
  'genetik-sac-dokulmesi-androgenetik-alopesi': { source: 'Saç ve Deri Hastalıkları/Genetik Saç Dökülmesi (Androgenetik Alopesi).jpg', category: 'Saç ve Deri Hastalıkları' },
  'sackiran-alopecia-areata': { source: 'Saç ve Deri Hastalıkları/Saçkıran (Alopecia Areata).jpg', category: 'Saç ve Deri Hastalıkları' },
  'sacli-deri-egzemasi-ve-kepek': { source: 'Saç ve Deri Hastalıkları/Saçlı Deri Egzeması ve Kepek.jpg', category: 'Saç ve Deri Hastalıkları' },
  'sac-koku-iltihaplari-folikulit': { source: 'Saç ve Deri Hastalıkları/Saç Kökü İltihapları (Folikülit).jpg', category: 'Saç ve Deri Hastalıkları' },
  'tirnak-mantari-onikomikoz': { source: 'Tırnak Hastalıkları/Tırnak Mantarı.jpg', category: 'Tırnak Hastalıkları' },
  'tirnak-deformiteleri': { source: 'Tırnak Hastalıkları/Tırnak Deformasyonları.JPG', category: 'Tırnak Hastalıkları' },
  'kilcal-damar-problemleri': { source: 'Diğer Dermatolojik Durumlar/Kılcal Damar Problemleri.jpg', category: 'Diğer Dermatolojik Durumlar' },
  'kasinti-hastaliklar': { source: 'Diğer Dermatolojik Durumlar/Kaşıntı Hastalıkları.jpg', category: 'Diğer Dermatolojik Durumlar' },
  'deri-kalinlasmalari-ve-nasirlar': { source: 'Diğer Dermatolojik Durumlar/Deri Kalınlaşmaları ve Nasırlar.jpg', category: 'Diğer Dermatolojik Durumlar' },
};

const sourceDir = '/Users/ferhatorakci/Downloads/WEB Görselleri';
const targetDir = path.join(__dirname, '../public/images/treatments');

// Klasörü oluştur
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
  console.log(`Created directory: ${targetDir}`);
}

// Görselleri kopyala (şimdilik orijinal formatında)
let copied = 0;
let notFound = 0;

Object.entries(imageMappings).forEach(([slug, mapping]) => {
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
console.log(`\nNote: To convert to WebP format, you can:`);
console.log(`1. Use an online converter (e.g., https://cloudconvert.com/jpg-to-webp)`);
console.log(`2. Use ImageMagick: convert input.jpg -quality 85 -resize 1200x800 output.webp`);
console.log(`3. Use cwebp: cwebp -q 85 input.jpg -o output.webp`);
