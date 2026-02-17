const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Eksik görseller için kaynak eşleştirmeleri
const missingImages = {
  // Dolgu uygulamaları - dudak dolgusu görselinden
  'hyaluronik-asit-dolgular': { 
    source: 'botoks-dolgu-antalya.webp', 
    category: 'blogs',
    description: 'Dolgu uygulaması görseli'
  },
  'dudak-dolgusu': { 
    source: 'botoks-dolgu-antalya.webp', 
    category: 'blogs',
    description: 'Dudak dolgusu görseli'
  },
  
  // Cilt gençleştirme - cilt bakımı görselinden
  'ameliyatsiz-yuz-germe': { 
    source: 'cilt-lekeleri-tedavisi-antalya.webp', 
    category: 'blogs',
    description: 'Cilt bakımı görseli'
  },
  'somon-dna': { 
    source: 'cilt-lekeleri-tedavisi-antalya.webp', 
    category: 'blogs',
    description: 'Cilt bakımı görseli'
  },
  'kollajen-uygulamalari': { 
    source: 'cilt-lekeleri-tedavisi-antalya.webp', 
    category: 'blogs',
    description: 'Cilt bakımı görseli'
  },
  
  // İz tedavileri
  'cerrahi-travmatik-iz-tedavileri': { 
    source: 'akne-tedavisi-antalya.webp', 
    category: 'blogs',
    description: 'İz tedavisi görseli'
  },
  'cosmelan-leke-maskesi': { 
    source: 'cilt-lekeleri-tedavisi-antalya.webp', 
    category: 'blogs',
    description: 'Leke maskesi görseli'
  },
  
  // Cilt bakımı
  'medikal-cilt-bakimi-jetpeel': { 
    source: 'cilt-lekeleri-tedavisi-antalya.webp', 
    category: 'blogs',
    description: 'Cilt bakımı görseli'
  },
  'kimyasal-peeling': { 
    source: 'cilt-lekeleri-tedavisi-antalya.webp', 
    category: 'blogs',
    description: 'Peeling görseli'
  },
  'isilti-peeling': { 
    source: 'cilt-lekeleri-tedavisi-antalya.webp', 
    category: 'blogs',
    description: 'Peeling görseli'
  },
  
  // Saç tedavileri
  'trikoskopik-sac-analizi': { 
    source: 'sac-dokulmesi-tedavisi-antalya.webp', 
    category: 'blogs',
    description: 'Saç analizi görseli'
  },
  'sac-mezoterapisi': { 
    source: 'sac-dokulmesi-tedavisi-antalya.webp', 
    category: 'blogs',
    description: 'Saç mezoterapisi görseli'
  },
  'sac-prp': { 
    source: 'sac-dokulmesi-tedavisi-antalya.webp', 
    category: 'blogs',
    description: 'Saç PRP görseli'
  },
  'sac-ekimi-danismanligi': { 
    source: 'sac-dokulmesi-tedavisi-antalya.webp', 
    category: 'blogs',
    description: 'Saç ekimi görseli'
  },
  
  // Bölgesel
  'ben-aldirma': { 
    source: 'cilt-lekeleri-tedavisi-antalya.webp', 
    category: 'blogs',
    description: 'Ben aldırma görseli'
  },
};

const blogsDir = path.join(__dirname, '../public/images/blogs');
const treatmentsDir = path.join(__dirname, '../public/images/treatments');

console.log('Creating missing uygulama images from blog images...\n');

let created = 0;
let errors = 0;

async function createImage(slug, mapping) {
  const sourcePath = path.join(blogsDir, mapping.source);
  const targetPath = path.join(treatmentsDir, `${slug}.webp`);
  
  if (!fs.existsSync(sourcePath)) {
    console.log(`✗ Source not found: ${mapping.source}`);
    errors++;
    return;
  }
  
  try {
    // Görseli optimize et ve kopyala
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
    console.log(`✓ Created: ${slug}.webp (${(stats.size / 1024).toFixed(0)}KB)`);
    created++;
  } catch (error) {
    console.error(`✗ Error creating ${slug}:`, error.message);
    errors++;
  }
}

async function processAll() {
  for (const [slug, mapping] of Object.entries(missingImages)) {
    await createImage(slug, mapping);
  }
  
  console.log(`\nCompleted: ${created} created, ${errors} errors`);
}

processAll().catch(console.error);
