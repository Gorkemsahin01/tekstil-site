# Samplify — ABP .NET backend

React (`../src`) ile aynı repoda tutulan, **Volo.ABP 10** tabanlı HTTP API çözümüdür. Şablon: `app`, **UI yok** (`--no-ui`), veritabanı: **SQLite** + **Entity Framework Core**.

## Çözüm yapısı

| Katman | Proje | Rol |
|--------|--------|-----|
| Contracts | `Samplify.Application.Contracts` | DTO’lar, `I*AppService` arayüzleri, izin sabitleri |
| Application | `Samplify.Application` | Uygulama servisleri (`*AppService`), iş kuralları |
| Domain | `Samplify.Domain` | Varlıklar, domain servisleri |
| EF Core | `Samplify.EntityFrameworkCore` | DbContext, migration’lar |
| HTTP API | `Samplify.HttpApi` | Controller / konvansiyonel API katmanı |
| Host | `Samplify.HttpApi.Host` | Kestrel, Swagger, OpenIddict validation, CORS |
| Migrator | `Samplify.DbMigrator` | Veritabanı oluşturma ve migration |

Örnek uç nokta (anonim): `SamplifyPublicAppService.GetInfoAsync` — tam yolu **Swagger** (`/swagger`) üzerinden kontrol edin (genelde `/api/app/...` altında listelenir).

## Gereksinimler

- [.NET SDK 10](https://dotnet.microsoft.com/download) (veya şablonun hedeflediği sürüm)
- Windows / macOS / Linux

## İlk çalıştırma

1. **Veritabanını oluştur** (migration + seed):

   ```bash
   cd aspnet-core/src/Samplify.DbMigrator
   dotnet run
   ```

2. **API’yi başlat**:

   ```bash
   cd aspnet-core/src/Samplify.HttpApi.Host
   dotnet run
   ```

3. Tarayıcı: **Swagger** — `https://localhost:44373/swagger` (port `launchSettings.json` ile aynıdır).

Varsayılan yönetici kullanıcısı ABP seed ile gelir; kullanıcı adı genelde **`admin`**, şifre ABP şablonunun varsayılanıdır (çoğu şablonda **`1q2w3E*`** — kendi ortamınızda `IdentityDataSeedContributor` / migrator çıktısını doğrulayın).

## React (Vite) ile bağlantı

- Geliştirmede `VITE_ABP_API_URL` boş bırakılırsa `vite.config.ts` içindeki **proxy** istekleri `https://localhost:44373` adresine yönlendirir (`/api`, `/connect`).
- Tam URL kullanacaksanız: `.env` içinde `VITE_ABP_API_URL=https://localhost:44373` ve backend **CORS** listesinde `http://localhost:5173` tanımlı olmalıdır (`appsettings.Development.json`).

## Yapılandırma

- `src/Samplify.HttpApi.Host/appsettings.json` — bağlantı dizesi, `App:SelfUrl`, `AuthServer:Authority`
- `appsettings.secrets.json` — üretim sırları (şablonla birlikte gelir; repoya commit etmeyin)

SQLite dosyası: `Samplify.db` (connection string `Data Source=Samplify.db`), çalışma dizinine göre oluşur; gerektiğinde yolu `appsettings.*.json` içinde güncelleyin.

## Üretim notları

- HTTPS ve gerçek `AuthServer:Authority` adresini kullanın.
- `StringEncryption:DefaultPassPhrase` ve veritabanı bağlantısını gizli yönetimle saklayın.
- React statik dosyaları CDN / sunucuda host edilir; API ayrı origin olacaksa CORS ve OpenIddict client ayarlarını güncelleyin.

## Daha fazla bilgi

- [ABP dokümantasyonu](https://abp.io/docs/latest)
- [Çözüm şablonu](https://abp.io/docs/latest/solution-templates/layered-web-application)
