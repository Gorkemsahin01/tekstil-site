import { useEffect, useState } from 'react';
import { Languages, Save, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import type { Locale } from '../../i18n/types';
import type { HomeContent } from '../../site/types';
import { useSiteContent } from '../../contexts/SiteContentContext';
import AdminField from '../../components/admin/AdminField';
import AdminFormCard from '../../components/admin/AdminFormCard';
import AdminLocaleTabs from '../../components/admin/AdminLocaleTabs';
import AdminPageHeader from '../../components/admin/AdminPageHeader';
import AdminPrimaryButton from '../../components/admin/AdminPrimaryButton';
import AdminSectionTitle from '../../components/admin/AdminSectionTitle';

export default function AdminEditHome() {
  const { content, updateContent, resetToDefaults } = useSiteContent();
  const [locale, setLocale] = useState<Locale>('tr');
  const [homeTr, setHomeTr] = useState(content.home.tr);
  const [homeEn, setHomeEn] = useState(content.home.en);
  const [brandTr, setBrandTr] = useState(content.brandDisplay.tr);
  const [brandEn, setBrandEn] = useState(content.brandDisplay.en);
  const [wfTr, setWfTr] = useState(content.brandFooterWatermark.tr);
  const [wfEn, setWfEn] = useState(content.brandFooterWatermark.en);

  useEffect(() => {
    setHomeTr(content.home.tr);
    setHomeEn(content.home.en);
    setBrandTr(content.brandDisplay.tr);
    setBrandEn(content.brandDisplay.en);
    setWfTr(content.brandFooterWatermark.tr);
    setWfEn(content.brandFooterWatermark.en);
  }, [content]);

  const home = locale === 'tr' ? homeTr : homeEn;
  const setHome = locale === 'tr' ? setHomeTr : setHomeEn;

  function patchHome(patch: Partial<HomeContent>) {
    setHome((h) => ({ ...h, ...patch }));
  }

  function save() {
    updateContent({
      brandDisplay: { tr: brandTr, en: brandEn },
      brandFooterWatermark: { tr: wfTr, en: wfEn },
      home: { tr: homeTr, en: homeEn },
    });
    toast.success('Kayıt başarılı', {
      description: 'Ana sayfa ve marka metinleri (TR + EN) güncellendi.',
    });
  }

  function resetAll() {
    if (!confirm('Tüm site içeriği varsayılan metinlere dönsün mü?')) return;
    resetToDefaults();
    toast.success('İçerik sıfırlandı', { description: 'Sayfa yenileniyor…' });
    window.setTimeout(() => window.location.reload(), 700);
  }

  return (
    <div>
      <AdminPageHeader
        title="Ana sayfa içeriği"
        description="Hero, özellikler ve alt CTA — Türkçe ve İngilizce ayrı düzenlenir. Kayıt her iki dili de saklar."
        action={
          <button
            type="button"
            onClick={resetAll}
            className="inline-flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-sm font-medium text-red-700 transition hover:bg-red-100"
          >
            <Trash2 className="h-4 w-4" aria-hidden />
            Tüm siteyi sıfırla
          </button>
        }
      />

      <div className="mb-6 flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-600">
          <Languages className="h-4 w-4" aria-hidden />
          Düzenlenen dil:
        </span>
        <AdminLocaleTabs locale={locale} onChange={setLocale} />
      </div>

      <AdminFormCard className="space-y-8">
        <AdminSectionTitle>Marka (header / footer)</AdminSectionTitle>
        <div className="space-y-6 pt-2">
          <AdminField
            label="Logo yanı metin"
            value={locale === 'tr' ? brandTr : brandEn}
            onChange={locale === 'tr' ? setBrandTr : setBrandEn}
            hint="Örn: Samplify.tr"
          />
          <AdminField
            label="Footer büyük yazı"
            value={locale === 'tr' ? wfTr : wfEn}
            onChange={locale === 'tr' ? setWfTr : setWfEn}
            hint="Footer’daki watermark harfleri"
          />
        </div>

        <AdminSectionTitle>Hero</AdminSectionTitle>
        <div className="space-y-6 pt-2">
          <AdminField label="Rozet" value={home.heroBadge} onChange={(v) => patchHome({ heroBadge: v })} />
          <AdminField
            label="Başlık satırı 1"
            value={home.heroTitleLine1}
            onChange={(v) => patchHome({ heroTitleLine1: v })}
          />
          <AdminField
            label="Başlık satırı 2"
            value={home.heroTitleLine2 ?? ''}
            onChange={(v) => patchHome({ heroTitleLine2: v })}
            hint="Boş bırakılırsa bu satır gösterilmez."
          />
          <AdminField
            label="Vurgulu başlık (gradient)"
            value={home.heroTitleHighlight}
            onChange={(v) => patchHome({ heroTitleHighlight: v })}
          />
          <AdminField
            label="Alt başlık"
            value={home.heroSubtitle}
            onChange={(v) => patchHome({ heroSubtitle: v })}
            multiline
          />
          <AdminField
            label="Birincil düğme"
            value={home.primaryCta}
            onChange={(v) => patchHome({ primaryCta: v })}
          />
          <AdminField
            label="İkincil düğme"
            value={home.secondaryCta}
            onChange={(v) => patchHome({ secondaryCta: v })}
          />
          <AdminField
            label="Hero istatistik — üretim değeri"
            value={home.heroStatProductionValue ?? '+45%'}
            onChange={(v) => patchHome({ heroStatProductionValue: v })}
            hint="Sol yüzen karttaki büyük rakam (örn. +45%)."
          />
          <AdminField
            label="Hero istatistik — kullanıcı değeri"
            value={home.heroStatWorkshopValue ?? ''}
            onChange={(v) => patchHome({ heroStatWorkshopValue: v })}
            hint="Sağ yüzen karttaki değer (örn. 148/196)."
          />
        </div>

        <AdminSectionTitle>Özellikler bölümü</AdminSectionTitle>
        <div className="space-y-6 pt-2">
          <AdminField
            label="Başlık (ilk satır)"
            value={home.featuresHeading}
            onChange={(v) => patchHome({ featuresHeading: v })}
          />
          <AdminField
            label="Başlık vurgusu"
            value={home.featuresHeadingAccent}
            onChange={(v) => patchHome({ featuresHeadingAccent: v })}
          />
          <AdminField
            label="Giriş paragrafı"
            value={home.featuresIntro}
            onChange={(v) => patchHome({ featuresIntro: v })}
            multiline
          />
          <AdminField label="Kart 1 başlık" value={home.f1Title} onChange={(v) => patchHome({ f1Title: v })} />
          <AdminField
            label="Kart 1 metin"
            value={home.f1Body}
            onChange={(v) => patchHome({ f1Body: v })}
            multiline
          />
          <AdminField label="Kart 2 başlık" value={home.f2Title} onChange={(v) => patchHome({ f2Title: v })} />
          <AdminField
            label="Kart 2 metin"
            value={home.f2Body}
            onChange={(v) => patchHome({ f2Body: v })}
            multiline
          />
          <AdminField label="Kart 3 başlık" value={home.f3Title} onChange={(v) => patchHome({ f3Title: v })} />
          <AdminField
            label="Kart 3 metin"
            value={home.f3Body}
            onChange={(v) => patchHome({ f3Body: v })}
            multiline
          />
          <AdminField label="Kart 4 başlık" value={home.f4Title} onChange={(v) => patchHome({ f4Title: v })} />
          <AdminField
            label="Kart 4 metin"
            value={home.f4Body}
            onChange={(v) => patchHome({ f4Body: v })}
            multiline
          />
          <AdminField
            label="Kart 4 bağlantı yazısı"
            value={home.f4LinkLabel}
            onChange={(v) => patchHome({ f4LinkLabel: v })}
          />
        </div>

        <AdminSectionTitle>Alt CTA</AdminSectionTitle>
        <div className="space-y-6 pt-2">
          <AdminField label="Başlık" value={home.ctaTitle} onChange={(v) => patchHome({ ctaTitle: v })} />
          <AdminField
            label="Alt metin"
            value={home.ctaSubtitle}
            onChange={(v) => patchHome({ ctaSubtitle: v })}
            multiline
          />
          <AdminField label="Düğme" value={home.ctaButton} onChange={(v) => patchHome({ ctaButton: v })} />
        </div>

        <AdminPrimaryButton onClick={save} icon={<Save className="h-4 w-4" />}>
          Kaydet
        </AdminPrimaryButton>
      </AdminFormCard>
    </div>
  );
}
