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
      tr: 'Numune takibinde görünürlük: Excel’den çıkmak neden kritik?',
      en: 'Visibility in sample tracking: why moving beyond Excel matters',
    },
    excerpt: {
      tr: 'Kayıp revizyonlar ve dağınık iletişim, tekstilde maliyeti görünmez kılar. Merkezi bir akışta veriyi tekilleştirmenin ilk adımları.',
      en: 'Lost revisions and scattered communication hide cost. First steps to a single source of truth in a central flow.',
    },
    readMinutes: { tr: '6 dk', en: '6 min' },
    body: {
      tr: [
        'Tekstilde numune süreci, markanın vitrinidir; aynı zamanda en çok sürtünmenin yaşandığı alanlardan biridir. Excel ve mesajlaşma uygulamalarıyla yürütülen takip, küçük ekiplerde işe yarasa da ölçek büyüdükçe “kim neyi onayladı?” sorusunun cevabı dağılır.',
        'Merkezi bir akışta veriyi tekilleştirmek, yalnızca IT projesi değil; revizyonların tekrarını azaltan, tedarikçi ile atölye arasındaki gerilimi düşüren bir üretim kararıdır. İlk adım, kritik durumların (gecikme, red, ikinci numune) tek ekranda görünür olmasıdır.',
        'Samplify.tr yaklaşımında, numune adımlarını görsel kanban ve net zaman çizelgeleriyle takip etmek, ekiplerin aynı dili konuşmasını sağlar. Excel’i tamamen yok saymak şart değil; ancak “tek doğru kaynak”ın bulutta ve erişilebilir olması şart.',
        'Sonuç olarak: görünürlük, maliyeti düşürür. Çünkü görünmeyen gecikme, görünmeyen stok ve görünmeyen itibar kaybı demektir.',
      ],
      en: [
        'In textiles, the sample journey is both your showcase and a major source of friction. Tracking in spreadsheets and chat apps can work for tiny teams, but as you scale, the answer to “who approved what?” fragments.',
        'Consolidating data in a central flow is not only an IT initiative; it is a production decision that reduces duplicate revisions and tension between suppliers and the shop floor. The first step is making critical states (delay, rejection, second round) visible on one surface.',
        'With Samplify.tr, visual Kanban boards and clear timelines help teams speak one language. You do not have to ban Excel overnight—but you do need a single source of truth that lives in the cloud and is accessible.',
        'In short: visibility cuts cost, because invisible delay means invisible inventory and invisible brand damage.',
      ],
    },
  },
  {
    id: '2',
    slug: 'tech-pack-olcu-tablolari',
    image:
      'https://images.unsplash.com/photo-1581091226825-a6a2a5a158d5?auto=format&fit=crop&w=1200&q=80',
    category: { tr: 'Üretim', en: 'Production' },
    date: '2026-03-05',
    title: {
      tr: 'Atölye ile ofis arasında tek dil: Tech Pack ve ölçü tabloları',
      en: 'One language between shop floor and office: Tech Packs and grading',
    },
    excerpt: {
      tr: 'Ölçü toleransları ve versiyonlar net değilse, hata kaçınılmaz. Ortak bir referansın gücü.',
      en: 'When tolerances and versions are unclear, errors follow. The power of a shared reference.',
    },
    readMinutes: { tr: '5 dk', en: '5 min' },
    body: {
      tr: [
        'Tech Pack, tasarımın “sözleşmesi”dir: hangi dikiş, hangi tolerans, hangi aksesuar. Sorun çoğu zaman dosyanın kendisi değil; versiyonların çakışması ve atölyede güncel olmayan çıktının kullanılmasıdır.',
        'Ölçü tablolarında net tolerans aralıkları ve revizyon numarası, tartışmayı bitirir. Dijital ortamda, aynı tablonun PDF’si ile üretim ekranındaki verinin eşlenmesi, “milimetrik” hataların önüne geçer.',
        'Samplify.tr ekosisteminde Measurify modülü bu dengeyi hedefler: versiyon karşılaştırma, tolerans mantığı ve tek tıkla standart çıktılar. Amaç hızlı olmak değil, önce doğru olmak; sonra hızı ölçeklemek.',
      ],
      en: [
        'A Tech Pack is the contract of a design: which seam, which tolerance, which trim. The issue is often not the file itself, but conflicting versions and shop-floor printouts that are out of date.',
        'Clear tolerance bands and revision numbers on measurement tables end debates. Digitally aligning the PDF with live production data prevents “millimetric” mistakes.',
        'The Measurify module in the Samplify.tr ecosystem aims for that balance: version diff, tolerance logic, and one-click standard outputs. The goal is to be right first—then scale speed.',
      ],
    },
  },
  {
    id: '3',
    slug: 'moduler-erp-buyume',
    image:
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1200&q=80',
    category: { tr: 'ERP', en: 'ERP' },
    date: '2026-02-28',
    title: {
      tr: 'Modüler ERP: ihtiyacınız olanı seçin, büyüdükçe genişletin',
      en: 'Modular ERP: pick what you need, expand as you grow',
    },
    excerpt: {
      tr: 'Hepsi-veya-hiç yerine aşamalı dijitalleşme. Sample Tracker ve Measurify gibi odaklı modüllerin avantajı.',
      en: 'Phased digitization instead of all-or-nothing. The upside of focused modules like Sample Tracker and Measurify.',
    },
    readMinutes: { tr: '4 dk', en: '4 min' },
    body: {
      tr: [
        'Büyük ERP dönüşümleri çoğu zaman “dondu”: kapsam şişti, eğitim yetişmedi, iş süreçleri bekledi. Modüler yaklaşım ise önce acı noktayı çözer: numune akışı, ölçü yönetimi, raporlama gibi.',
        'Sample Tracker ve Measurify gibi odaklı ürünler, kullanıcıların günlük işine doğrudan dokunduğu için benimsenme oranı yükselir. Entegrasyonlar aşamalı eklenebilir; önemli olan ilk modülün sahada gerçekten kullanılmasıdır.',
        'Samplify.tr felsefesi: önce değer, sonra kapsam. Küçük ama ölçülebilir kazanımlar, organizasyonun dijitale güvenini inşa eder.',
      ],
      en: [
        'Large ERP transformations often freeze: scope balloons, training lags, processes wait. A modular approach fixes the pain point first—sample flow, measurements, reporting.',
        'Focused products like Sample Tracker and Measurify touch daily work directly, so adoption rises. Integrations can arrive in phases; what matters is that the first module is actually used on the floor.',
        'The Samplify.tr philosophy: value first, breadth second. Small, measurable wins build organizational trust in digital change.',
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
      tr: 'Tasarım verilerinizi bulutta güvenle tutmanın temelleri',
      en: 'Basics of keeping design data safe in the cloud',
    },
    excerpt: {
      tr: 'Erişim katmanları, yedekleme ve sürüm kontrolü: markanızın en değerli varlığı için minimum standartlar.',
      en: 'Access layers, backups, and versioning: minimum standards for your brand’s most valuable asset.',
    },
    readMinutes: { tr: '7 dk', en: '7 min' },
    body: {
      tr: [
        'Tasarım dosyaları, tekstil markasının arşividir. USB ve kişisel bulut paylaşımları hızlıdır; fakat denetim izi ve erişim kontrolü açısından risklidir.',
        'Minimum standartlar: rol bazlı erişim, çok faktörlü kimlik doğrulama (mümkünse), düzenli yedekleme ve silinen dosyalar için saklama politikası. Revizyon geçmişi, “hangi dosya fabrikada?” sorusunun hukuki ve operasyonel cevabını sağlar.',
        'Buluta taşınan veri, yalnızca depolama değil; iş sürekliliği ve iş ortaklarıyla güven ilişkisidir. Samplify.tr vizyonunda güvenlik, sonradan eklenen bir katman değil; ürünün omurgasıdır.',
        'Ekibinize net kurallar: hassas çıktılar yalnızca onaylı kanallardan, watermark ve tarih damgasıyla paylaşılır. Basit disiplin, büyük sızıntıları önler.',
      ],
      en: [
        'Design files are the archive of a textile brand. USB drives and personal cloud shares are fast—but risky for audit trails and access control.',
        'Minimum standards: role-based access, multi-factor authentication where possible, regular backups, and retention policies for deleted files. Revision history answers “which file reached the factory?” legally and operationally.',
        'Data in the cloud is not only storage; it is business continuity and trust with partners. In the Samplify.tr vision, security is not a bolt-on—it is core.',
        'Simple team rules: sensitive exports only through approved channels, with watermarks and timestamps. Simple discipline prevents large leaks.',
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
