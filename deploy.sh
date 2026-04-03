#!/bin/bash
set -e

echo "=== Samplify Production Deploy ==="

# .env dosyasini yukle
if [ -f .env ]; then
  export $(grep -v '^#' .env | xargs)
fi

# 1. En son imajlari cek
echo ">>> Docker imajlari cekiliyor..."
docker compose -f docker-compose.prod.yml pull

# 2. Servisleri baslat/guncelle
echo ">>> Servisler baslatiliyor..."
docker compose -f docker-compose.prod.yml up -d

echo ""
echo "=== Deploy tamamlandi ==="
echo "Site:    https://samplify.tr"
echo "API:     https://samplify.tr/api"
echo "Swagger: https://samplify.tr/swagger"
echo ""
docker compose -f docker-compose.prod.yml ps
