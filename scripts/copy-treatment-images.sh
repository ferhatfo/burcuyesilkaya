#!/bin/bash

# Görselleri kopyalama ve webp'ye dönüştürme scripti
# Not: Bu script görselleri kopyalar, webp dönüşümü için ImageMagick veya cwebp gerekir

SOURCE_DIR="/Users/ferhatorakci/Downloads/WEB Görselleri"
TARGET_DIR="public/images/treatments"

# Klasörü oluştur
mkdir -p "$TARGET_DIR"

# Görsel eşleştirmeleri - HİZMETLER klasöründen
declare -A images=(
  ["vitiligo"]="HİZMETLER/vitiligo.jpg"
  ["sedef-hastaligi-psoriasis"]="HİZMETLER/Sedef Hastalığı (Psoriasis).jpg"
  ["egzema-atopik-seboreik-kontakt-dermatit"]="HİZMETLER/Egzema (Atopik, Seboreik, Kontakt Dermatit).jpg"
  ["akne-sivilce"]="HİZMETLER/Akne (Sivilce).jpg"
  ["rosacea-gul-hastaligi"]="HİZMETLER/Rosacea (Gül Hastalığı).jpg"
  ["urtiker-kurdesen"]="HİZMETLER/Ürtiker (Kurdeşen).jpg"
  ["mantar-enfeksiyonlari"]="HİZMETLER/Mantar Enfeksiyonları.jpg"
  ["bakteriyel-cilt-enfeksiyonlari"]="HİZMETLER/Bakteriyel Cilt Enfeksiyonları.jpg"
  ["viral-cilt-hastaliklari-ucuk-zona-vb"]="HİZMETLER/Viral Cilt Hastalıkları (Uçuk, Zona vb.).jpg"
  ["paraziter-cilt-hastaliklari-uyuz-bit"]="HİZMETLER/Paraziter Cilt Hastalıkları (Uyuz, Bit).jpg"
  ["cilt-lekeleri-melasma-gunes-lekeleri-vb"]="HİZMETLER/Cilt Lekeleri (Melasma, Güneş Lekeleri vb.).jpg"
  ["cilt-kanserleri-ve-kanser-oncesi-lezyonlar"]="HİZMETLER/Cilt Kanserleri ve Kanser Öncesi Lezyonlar.jpg"
  ["benler-ve-deri-lezyonlari"]="HİZMETLER/Benler ve Deri Lezyonları.jpg"
  ["asiri-terleme-hiperhidroz"]="HİZMETLER/Aşırı Terleme (Hiperhidroz).jpg"
  ["genetik-sac-dokulmesi-androgenetik-alopesi"]="Saç ve Deri Hastalıkları/Genetik Saç Dökülmesi (Androgenetik Alopesi).jpg"
  ["sackiran-alopecia-areata"]="Saç ve Deri Hastalıkları/Saçkıran (Alopecia Areata).jpg"
  ["sacli-deri-egzemasi-ve-kepek"]="Saç ve Deri Hastalıkları/Saçlı Deri Egzeması ve Kepek.jpg"
  ["sac-koku-iltihaplari-folikulit"]="Saç ve Deri Hastalıkları/Saç Kökü İltihapları (Folikülit).jpg"
  ["tirnak-mantari-onikomikoz"]="Tırnak Hastalıkları/Tırnak Mantarı.jpg"
  ["tirnak-deformiteleri"]="Tırnak Hastalıkları/Tırnak Deformasyonları.JPG"
  ["kilcal-damar-problemleri"]="Diğer Dermatolojik Durumlar/Kılcal Damar Problemleri.jpg"
  ["kasinti-hastaliklar"]="Diğer Dermatolojik Durumlar/Kaşıntı Hastalıkları.jpg"
  ["deri-kalinlasmalari-ve-nasirlar"]="Diğer Dermatolojik Durumlar/Deri Kalınlaşmaları ve Nasırlar.jpg"
)

# Görselleri kopyala
for slug in "${!images[@]}"; do
  source_file="$SOURCE_DIR/${images[$slug]}"
  target_file="$TARGET_DIR/$slug.webp"
  
  if [ -f "$source_file" ]; then
    # Önce orijinal formatı kopyala
    cp "$source_file" "$TARGET_DIR/$slug${source_file##*.}"
    echo "Copied: $source_file -> $TARGET_DIR/$slug${source_file##*.}"
    
    # WebP dönüşümü için ImageMagick veya cwebp kullanılabilir
    # convert "$source_file" -quality 85 -resize 1200x800 "$target_file" 2>/dev/null || \
    # cwebp -q 85 "$source_file" -o "$target_file" 2>/dev/null || \
    echo "Note: Convert $TARGET_DIR/$slug${source_file##*.} to WebP format manually"
  else
    echo "Not found: $source_file"
  fi
done

echo "Image copying completed!"
