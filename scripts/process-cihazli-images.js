const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Görsellerin açıklamalarına göre cihazlı tedaviler eşleştirmesi
// Kullanıcı görselleri gönderdi, bunları işlemek için bir script

const targetDir = path.join(__dirname, '../public/images/treatments');

// Görsel açıklamalarına göre eşleştirmeler
// Not: Görselleri kullanıcı gönderdi, bunları bir klasöre kaydetmesi gerekiyor
const imageMappings = {
  // Görsel 1: Microneedling RF device (forehead treatment)
  'morpheus-8': {
    description: 'Morpheus 8 - Microneedling RF device',
    note: 'İlk görsel: Microneedling RF cihazı'
  },
  // Görsel 2: Laser hair removal (underarm)
  'alexandrite-diod-lazer': {
    description: 'Alexandrite & Diod Lazer - Laser hair removal',
    note: 'İkinci görsel: Lazer epilasyon'
  },
  // Görsel 3: Microneedling device (cheek treatment)
  'altin-igne': {
    description: 'Altın İğne - Microneedling RF',
    note: 'Üçüncü görsel: Microneedling cihazı'
  },
  // Görsel 4: Black peel-off mask
  'karbon-peeling': {
    description: 'Karbon Peeling - Black peel-off mask',
    note: 'Dördüncü görsel: Siyah maske'
  },
  // Görsel 5: Airbrush/oxygen facial
  'jet-peel': {
    description: 'Jet Peel - Oksijenli cilt bakımı',
    note: 'Beşinci görsel: Oksijen/airbrush cihazı'
  },
  // Görsel 6: HIFU device (jawline treatment)
  'fokus-ultrason-hifu': {
    description: 'Fokus Ultrason (HIFU)',
    note: 'Altıncı görsel: HIFU cihazı'
  },
  // Görsel 7: LED light therapy device
  'led-isik-tedavileri': {
    description: 'LED Işık Tedavileri',
    note: 'Yedinci görsel: LED ışık cihazı'
  },
  // Görsel 8: Red light therapy (neck/chest)
  'led-isik-tedavileri-alt': {
    description: 'LED Işık Tedavileri (alternatif)',
    note: 'Sekizinci görsel: Kırmızı ışık tedavisi'
  },
  // Görsel 9: Laser treatment (face)
  'q-switched-ndyag-lazer': {
    description: 'Q-Switched Nd:YAG Lazer',
    note: 'Dokuzuncu görsel: Lazer tedavisi'
  },
  // Görsel 10: Laser treatment (cheek)
  'kilcal-damar-lazerleri': {
    description: 'Kılcal Damar Lazerleri',
    note: 'Onuncu görsel: Lazer tedavisi (damar)'
  },
  // Görsel 11: LED mask
  'led-isik-tedavileri-mask': {
    description: 'LED Işık Tedavileri (maske)',
    note: 'On birinci görsel: LED maske'
  },
  // Fraksiyonel CO₂ Lazer için görsel yok, mevcut görsellerden biri kullanılabilir
  'fraksiyonel-co2-lazer': {
    description: 'Fraksiyonel CO₂ Lazer',
    note: 'Mevcut lazer görsellerinden biri kullanılabilir'
  },
  // VelaShape için görsel yok
  'velashape': {
    description: 'VelaShape',
    note: 'Body contouring görseli gerekli'
  },
  // IPL için görsel yok
  'ipl-yogun-atimli-isik': {
    description: 'IPL (Yoğun Atımlı Işık)',
    note: 'IPL görseli gerekli'
  }
};

console.log('Cihazlı Tedaviler için görsel eşleştirmeleri:\n');
Object.entries(imageMappings).forEach(([slug, info]) => {
  console.log(`${slug}:`);
  console.log(`  - ${info.description}`);
  console.log(`  - ${info.note}\n`);
});

console.log('\nGörselleri işlemek için:');
console.log('1. Görselleri şu klasöre kaydedin: /Users/ferhatorakci/Downloads/cihazli-tedaviler-gorselleri/');
console.log('2. Görselleri sırayla numaralandırın (1.jpg, 2.jpg, vb.)');
console.log('3. Scripti çalıştırın: node scripts/process-cihazli-images-from-folder.js');
