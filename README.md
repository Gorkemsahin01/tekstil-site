# Tekstil Site + ABP Backend

Bu repo iki parçadan oluşur:

- **Frontend (Vite + React)**: kök dizin (`src/`, `vite.config.ts`)
- **Backend (ABP / ASP.NET Core)**: `backend/aspnet-core/`

## Frontend (lokal)

```bash
npm install
npm run dev
```

Geliştirmede API çağrıları için Vite proxy hazırdır: `vite.config.ts` içindeki `/api` ve `/connect` proxy’leri.

## Backend (lokal)

Önce PostgreSQL’i ayağa kaldır:

```bash
cd backend/aspnet-core
docker compose up -d
```

DB migration + seed:

```bash
dotnet run --project "src/Samplify.DbMigrator/Samplify.DbMigrator.csproj"
```

API host:

```bash
dotnet run --project "src/Samplify.HttpApi.Host/Samplify.HttpApi.Host.csproj"
```

## CMS API (site içeriği + blog)

Frontend’te CMS API entegrasyonu `.env` üzerinden açılır:

- `VITE_USE_CMS_API=true`
- `VITE_ABP_API_URL` boş bırakılırsa geliştirmede Vite proxy üzerinden `/api/...` çalışır.