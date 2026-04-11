import type { Locale } from '../i18n/types';

export type AkademiPost = {
  /** ABP BlogPost entity Guid (API kayıtlarında) */
  entityId?: string;
  slug: string;
  id: string;
  image: string;
  category: Record<Locale, string>;
  date: string;
  title: Record<Locale, string>;
  excerpt: Record<Locale, string>;
  readMinutes: Record<Locale, string>;
  /** Makale gövdesi — paragraflar */
  body: Record<Locale, string[]>;
  featured?: boolean;
};

export const DEFAULT_AKADEMI_POSTS: AkademiPost[] = [
  {
    id: '1',
    slug: 'numune-takibinde-gorunurluk-excel',
    featured: true,
    image:
      'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1200&q=80',
    category: { tr: 'Dijital dönüşüm', en: 'Digital transformation' },
    date: '2026-03-12',
    title: {
      tr: 'Numune Takibinde Görünürlük: Excel’den Çıkmak Neden Kritik?',
      en: 'Visibility in sample tracking: why leaving Excel is critical',
    },
    excerpt: {
      tr: 'Görünmeyen gecikmelere ve Excel karmaşasına son verin. Samplify.tr ile numune süreçlerinizi tek çatı altında toplayarak Critical Path üzerinde tam kontrol sağlamak için erken erişim listemize katılın.',
      en: 'End invisible delays and Excel chaos. Join our early access list to bring your sample processes under one roof with Samplify.tr and gain full control over the Critical Path.',
    },
    readMinutes: { tr: '6 dk', en: '6 min' },
    body: {
      tr: [
        'Dikişli Ürünler Endüstrisinde numune süreci, markanın vitrinidir; aynı zamanda en çok sürtünmenin yaşandığı alanlardan biridir. Excel ve mesajlaşma uygulamalarıyla yürütülen takip, küçük ekiplerde işe yarasa da ölçek büyüdükçe “kim neyi onayladı?” sorusunun cevabı dağılır.',
        'Merkezi bir akışta veriyi tekilleştirmek, yalnızca bir IT projesi değil; revizyonların tekrarını azaltan, müşteri temsilcisi ile modelhane arasındaki gerilimi düşüren stratejik bir üretim kararıdır. İlk adım, kritik durumların (gecikme, ret, second proto talebi) tek ekranda görünür olmasıdır.',
        'Samplify.tr yaklaşımında, numune adımlarını görsel kanban ve net zaman çizelgeleriyle takip etmek, ekiplerin aynı dili konuşmasını sağlar. Excel’i tamamen yok saymak şart değil; ancak “tek doğru kaynağın” (Single Source of Truth) bulutta ve herkes için anında erişilebilir olması şart.',
        'Sonuç olarak: Görünürlük, maliyeti düşürür. Çünkü görünmeyen gecikme; görünmeyen stok ve görünmeyen itibar kaybı demektir.',
      ],
      en: [
        'In the sewn products industry, the sample process is the brand’s showcase—and one of the areas with the most friction. Tracking via Excel and messaging apps may work for small teams, but as you scale, the answer to “who approved what?” fragments.',
        'Consolidating data in a central flow is not merely an IT project; it is a strategic production decision that reduces repeat revisions and eases tension between merchandisers and the sample room. The first step is making critical situations (delay, rejection, second-proto requests) visible on one screen.',
        'In the Samplify.tr approach, tracking sample steps with visual Kanban and clear timelines helps teams speak the same language. You do not have to abandon Excel entirely—but the “single source of truth” must live in the cloud and be instantly accessible to everyone.',
        'In short: visibility reduces cost—because invisible delay means invisible inventory and invisible reputational loss.',
      ],
    },
  },
  {
    id: '2',
    slug: 'tech-pack-olcu-tablolari',
    image:
      'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=1200&q=80',
    category: { tr: 'Üretim', en: 'Production' },
    date: '2026-03-05',
    title: {
      tr: 'Atölye ile Ofis Arasında Tek Dil: Dinamik Tech Pack ve Ölçü Tabloları',
      en: 'One language between workshop and office: dynamic Tech Pack and measurement tables',
    },
    excerpt: {
      tr: 'Tech Pack sahada “sözleşme”; Excel’de çakışan versiyonlar ve güncel olmayan çıktılar risk. Measurify ile dinamik karşılaştırma ve tolerans.',
      en: 'The Tech Pack is your contract in production; conflicting Excel versions and outdated specs are the risk—Measurify brings dynamic comparison and tolerance control.',
    },
    readMinutes: { tr: '5 dk', en: '5 min' },
    body: {
      tr: [
        'Tech Pack, dikişli ürünler üretiminde tasarımın ‘sözleşmesi’dir: Hangi dikiş tipi, hangi tolerans payı, hangi aksesuar kullanılacak? Sahada sorun çoğu zaman dosyanın eksikliği değil; Excel’de dolaşan eski versiyonların çakışması ve atölyede güncel olmayan çıktının (outdated spec) kullanılmasıdır.',
        'Ölçü tablolarında net tolerans aralıkları ve bulut tabanlı revizyon takibi, modelhane ile müşteri temsilcisi (merchandiser) arasındaki bitmek bilmeyen tartışmayı anında bitirir. Dijital ortamda, onaylanan tablonun verileri ile üretim ekranındaki referansın eşzamanlı olması, o korkulan ‘milimetrik’ hataların ve çöpe giden size set’lerin önüne geçer.',
        'Samplify.tr ekosistemindeki Measurify modülü tam olarak bu dengeyi hedefler: Dinamik versiyon karşılaştırma, otomatik tolerans hesaplama ve tek tıkla standart Tech Pack çıktıları. Amacımız sadece süreci hızlandırmak değil; önce ‘sıfır hata’ ile doğruyu bulmak, sonra bu kaliteyi ölçeklemektir. 📐 ✂️',
      ],
      en: [
        'In sewn-products manufacturing, the Tech Pack is the “contract” of the design: which seam type, which tolerance allowance, which accessory? On the floor, the problem is often not a missing file—but conflicting old versions in Excel and outdated specs used in the workshop.',
        'Clear tolerance bands and cloud-based revision tracking end the endless back-and-forth between the sample room and the merchandiser. Digitally, keeping approved table data in sync with the reference on the production screen prevents those dreaded “millimetric” mistakes and wasted size sets.',
        'The Measurify module in the Samplify.tr ecosystem targets exactly this balance: dynamic version comparison, automatic tolerance calculation, and one-click standard Tech Pack outputs. Our goal is not only to speed things up—first to get it right with “zero error,” then to scale that quality. 📐 ✂️',
      ],
    },
  },
  {
    id: '3',
    slug: 'moduler-erp-buyume',
    image:
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1200&q=80',
    category: { tr: 'Ür-Ge', en: 'R&D' },
    date: '2026-02-28',
    title: {
      tr: 'Modüler Yapı: İhtiyacınız Olanı Seçin, Büyüdükçe Genişletin',
      en: 'Modular by design: choose what you need, expand as you grow',
    },
    excerpt: {
      tr: 'Devasa ERP yerine nokta atışı modüller: Trackify, Measurify ve sahada gerçekten kullanılan yazılım.',
      en: 'Surgical modules instead of monolithic ERP: Trackify, Measurify, and software people actually use on the floor.',
    },
    readMinutes: { tr: '4 dk', en: '4 min' },
    body: {
      tr: [
        'Devasa ERP/PLM paketlerini devreye almak çoğu zaman sahanın hızını keser: Proje kapsamı sürekli şişer, bitmek bilmeyen eğitimler operasyonu yavaşlatır ve atölyedeki kullanıcılar o karmaşık arayüzleri kullanmayı reddeder. Sonuç; devasa bütçeler harcanan ama rafta tozlanan yazılımlar olur.',
        'Modüler yaklaşım ise nokta atışı bir müdahale gibidir: Önce en büyük acı noktanızı (pain point) çözer. Yola sadece numune Critical Path takibi (Trackify) veya ölçü tolerans yönetimi (Measurify) gibi odaklı ürünlerle çıkarsınız.',
        'Bu modüller kullanıcıların günlük işine ve gerçek dertlerine doğrudan dokunduğu için, ekibin yazılımı benimseme ve adaptasyon oranı hızla yükselir. Mevcut sistemlerinizle entegrasyonlar aşamalı olarak eklenebilir; çünkü günün sonunda önemli olan, yazılımın ne kadar çok özelliğe sahip olduğu değil, sahada gerçekten kullanılıyor olmasıdır.',
        'Samplify.tr felsefesi nettir: Önce değer üret, sonra kapsamı genişlet. Elde edilen hızlı ve ölçülebilir kazanımlar, organizasyonun dijital dönüşüme olan güvenini sarsılmaz bir şekilde inşa eder. 🚀',
      ],
      en: [
        'Rolling out massive ERP/PLM suites often slows the shop floor: scope keeps swelling, endless training drags operations down, and workshop users refuse those complex UIs. The result: huge budgets spent on software that gathers dust on the shelf.',
        'A modular approach is a surgical intervention: it solves your biggest pain point first. You start with focused products—sample Critical Path tracking (Trackify) or tolerance management (Measurify).',
        'Because these modules touch users’ daily work and real problems, adoption rises fast. Integrations with existing systems can be phased in—because in the end, feature count matters less than whether the software is actually used in the field.',
        'The Samplify.tr philosophy is clear: create value first, then broaden scope. Fast, measurable wins build unshakable trust in digital transformation. 🚀',
      ],
    },
  },
  {
    id: '4',
    slug: 'bulutta-tasarim-guvenligi',
    image:
      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80',
    category: { tr: 'Güvenlik', en: 'Security' },
    date: '2026-02-18',
    title: {
      tr: 'Tasarım Verilerinizi Bulutta Güvenle Tutmanın Temelleri',
      en: 'Foundations for keeping your design data secure in the cloud',
    },
    excerpt: {
      tr: 'IP, B2B güvenlik, MFA ve kusursuz revizyon geçmişi: dikişli ürünlerde tasarım verisi için minimum standartlar.',
      en: 'IP, B2B security, MFA, and flawless revision history: minimum standards for design data in sewn products.',
    },
    readMinutes: { tr: '7 dk', en: '7 min' },
    body: {
      tr: [
        'Tasarım dosyaları ve kalıplar, dikişli ürünler endüstrisinde faaliyet gösteren bir markanın en değerli fikri mülkiyetidir (IP). USB bellekler, mesajlaşma uygulamaları ve kişisel bulut paylaşımları sahada pratik görünse de; denetim izi (audit trail) ve yetkilendirme açısından devasa bir güvenlik riski taşır.',
        'Minimum B2B güvenlik standartları şunları içermelidir: Rol bazlı erişim, çok faktörlü kimlik doğrulama (MFA), anlık yedekleme ve silinen dosyalar için sıkı bir saklama politikası. Kusursuz bir revizyon geçmişi tutmak, “Şu an fabrikada hangi Tech Pack versiyonu dikiliyor?” sorusunun hem hukuki hem de operasyonel tek garantisidir.',
        'Veriyi güvenli bir bulut altyapısına taşımak sadece bir depolama hamlesi değil; kesintisiz iş sürekliliği ve fason üreticilerle (subcontractors) kurulan güven ilişkisinin temelidir. Samplify.tr vizyonunda veri güvenliği, sisteme sonradan yama yapılan bir katman değil; platformun doğrudan omurgasıdır.',
        'Ekibinize koyacağınız kural net olmalıdır: Hassas ölçü tabloları ve çizimler yalnızca onaylı platformlar üzerinden, dinamik watermark (filigran) ve tarih/saat damgasıyla paylaşılır. Basit ve sistematik bir dijital disiplin, telafisi olmayan büyük veri sızıntılarını daha doğmadan önler. 🛡️',
      ],
      en: [
        'Design files and patterns are a brand’s most valuable intellectual property (IP) in the sewn products industry. USB drives, messaging apps, and personal cloud shares may feel practical on the floor—but they pose massive security risks for audit trails and authorization.',
        'Minimum B2B security standards should include: role-based access, multi-factor authentication (MFA), real-time backups, and a strict retention policy for deleted files. Flawless revision history is the only guarantee—legal and operational—to answer “Which Tech Pack version is being sewn at the factory right now?”',
        'Moving data to secure cloud infrastructure is not merely a storage exercise; it is the foundation of business continuity and trust with subcontractors. In the Samplify.tr vision, data security is not a layer patched on later—it is the backbone of the platform.',
        'The rule you set for your team must be clear: sensitive measurement tables and drawings are shared only through approved platforms, with dynamic watermarks and date/time stamps. Simple, systematic digital discipline stops irreparable large data breaches before they happen. 🛡️',
      ],
    },
  },
];

export function getAkademiPostBySlug(
  slug: string | undefined,
  posts: AkademiPost[]
): AkademiPost | undefined {
  if (!slug) return undefined;
  return posts.find((p) => p.slug === slug);
}
