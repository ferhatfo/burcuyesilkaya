const fs = require('fs');
const path = require('path');
const https = require('https');
const sharp = require('sharp');

// Görsel URL'leri ve eşleştirmeleri
// Not: Bu görselleri kullanıcı sağladı, ancak URL'leri bilmiyoruz
// Bu yüzden görselleri bir klasöre kaydetmesi gerekecek

// Cihazlı Tedaviler için görsel eşleştirmeleri
const imageMappings = {
  'morpheus-8': {
    description: 'Morpheus 8 - Microneedling RF device',
    keywords: ['microneedling', 'rf', 'radiofrequency', 'needle']
  },
  'altin-igne': {
    description: 'Altın İğne - Microneedling RF',
    keywords: ['microneedling', 'rf', 'radiofrequency', 'needle']
  },
  'fraksiyonel-co2-lazer': {
    description: 'Fraksiyonel CO₂ Lazer',
    keywords: ['laser', 'co2', 'fractional']
  },
  'q-switched-ndyag-lazer': {
    description: 'Q-Switched Nd:YAG Lazer',
    keywords: ['laser', 'q-switched', 'ndyag']
  },
  'ipl-yogun-atimli-isik': {
    description: 'IPL - Yoğun Atımlı Işık',
    keywords: ['ipl', 'light', 'pulse']
  },
  'alexandrite-diod-lazer': {
    description: 'Alexandrite & Diod Lazer - Laser hair removal',
    keywords: ['laser', 'hair removal', 'alexandrite', 'diod']
  },
  'kilcal-damar-lazerleri': {
    description: 'Kılcal Damar Lazerleri',
    keywords: ['laser', 'vascular', 'vein']
  },
  'jet-peel': {
    description: 'Jet Peel - Oksijenli Cilt Bakımı',
    keywords: ['oxygen', 'airbrush', 'jet', 'peel']
  },
  'karbon-peeling': {
    description: 'Karbon Peeling - Hollywood Peeling',
    keywords: ['carbon', 'peel', 'mask', 'black']
  },
  'velashape': {
    description: 'VelaShape - Body contouring',
    keywords: ['body', 'contouring', 'radiofrequency', 'vacuum']
  },
  'fokus-ultrason-hifu': {
    description: 'Fokus Ultrason (HIFU)',
    keywords: ['hifu', 'ultrasound', 'focused', 'ultrasonic']
  },
  'led-isik-tedavileri': {
    description: 'LED Işık Tedavileri',
    keywords: ['led', 'light', 'therapy', 'mask']
  }
};

const targetDir = path.join(__dirname, '../public/images/treatments');

console.log('Cihazlı Tedaviler için görsel işleme scripti hazır.');
console.log('\nGörselleri şu klasöre kaydedin:');
console.log('/Users/ferhatorakci/Downloads/cihazli-tedaviler-gorselleri/');
console.log('\nGörselleri kaydettikten sonra bu scripti çalıştırın.');
console.log('\nEşleştirmeler:');
Object.entries(imageMappings).forEach(([slug, info]) => {
  console.log(`- ${slug}: ${info.description}`);
});
