const fs = require('fs');
const path = require('path');

// Görsel eşleştirmeleri
const imageMappings = {
  'Vitiligo': 'vitiligo.jpg',
  'Sedef Hastalığı (Psoriasis)': 'Sedef Hastalığı (Psoriasis).jpg',
  'Egzema (Atopik, Seboreik, Kontakt Dermatit)': 'Egzema (Atopik, Seboreik, Kontakt Dermatit).jpg',
  'Akne (Sivilce)': 'Akne (Sivilce).jpg',
  'Rosacea (Gül Hastalığı)': 'Rosacea (Gül Hastalığı).jpg',
  'Ürtiker (Kurdeşen)': 'Ürtiker (Kurdeşen).jpg',
  'Mantar Enfeksiyonları': 'Mantar Enfeksiyonları.jpg',
  'Bakteriyel Cilt Enfeksiyonları': 'Bakteriyel Cilt Enfeksiyonları.jpg',
  'Viral Cilt Hastalıkları (Uçuk, Zona vb.)': 'Viral Cilt Hastalıkları (Uçuk, Zona vb.).jpg',
  'Paraziter Cilt Hastalıkları (Uyuz, Bit)': 'Paraziter Cilt Hastalıkları (Uyuz, Bit).jpg',
  'Cilt Lekeleri (Melasma, Güneş Lekeleri vb.)': 'Cilt Lekeleri (Melasma, Güneş Lekeleri vb.).jpg',
  'Cilt Kanserleri ve Kanser Öncesi Lezyonlar': 'Cilt Kanserleri ve Kanser Öncesi Lezyonlar.jpg',
  'Benler ve Deri Lezyonları': 'Benler ve Deri Lezyonları.jpg',
  'Aşırı Terleme (Hiperhidroz)': 'Aşırı Terleme (Hiperhidroz).jpg',
  'Genetik Saç Dökülmesi (Androgenetik Alopesi)': 'Genetik Saç Dökülmesi (Androgenetik Alopesi).jpg',
  'Saçkıran (Alopecia Areata)': 'Saçkıran (Alopecia Areata).jpg',
  'Saçlı Deri Egzeması ve Kepek': 'Saçlı Deri Egzeması ve Kepek.jpg',
  'Saç Kökü İltihapları (Folikülit)': 'Saç Kökü İltihapları (Folikülit).jpg',
  'Tırnak Mantarı (Onikomikoz)': 'Tırnak Mantarı.jpg',
  'Tırnak Deformiteleri': 'Tırnak Deformasyonları.JPG',
  'Kılcal Damar Problemleri': 'Kılcal Damar Problemleri.jpg',
  'Kaşıntı Hastalıklar': 'Kaşıntı Hastalıkları.jpg',
  'Deri Kalınlaşmaları ve Nasırlar': 'Deri Kalınlaşmaları ve Nasırlar.jpg',
};

const sourceDir = '/Users/ferhatorakci/Downloads/WEB Görselleri/HİZMETLER';
const targetDir = path.join(__dirname, '../public/images/treatments');

// Klasörü oluştur
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// Görselleri kopyala ve webp'ye çevir (basit kopyalama, webp dönüşümü için sharp gerekir)
Object.entries(imageMappings).forEach(([treatmentName, imageFile]) => {
  const sourcePath = path.join(sourceDir, imageFile);
  const slug = treatmentName.toLowerCase()
    .replace(/ç/g, 'c')
    .replace(/ğ/g, 'g')
    .replace(/ı/g, 'i')
    .replace(/ö/g, 'o')
    .replace(/ş/g, 's')
    .replace(/ü/g, 'u')
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+|-+$/g, '');
  
  const targetPath = path.join(targetDir, `${slug}.webp`);
  
  if (fs.existsSync(sourcePath)) {
    // Şimdilik orijinal dosyayı kopyala, webp dönüşümü için sharp kullanılabilir
    const ext = path.extname(imageFile).toLowerCase();
    const tempPath = path.join(targetDir, `${slug}${ext}`);
    fs.copyFileSync(sourcePath, tempPath);
    console.log(`Copied: ${imageFile} -> ${slug}${ext}`);
  } else {
    console.log(`Not found: ${sourcePath}`);
  }
});

console.log('Image processing completed. Note: Convert images to WebP format manually or use sharp library.');
