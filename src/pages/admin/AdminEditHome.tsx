import { useState } from 'react';
import { Save, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { useSiteContent } from '../../contexts/SiteContentContext';
import AdminField from '../../components/admin/AdminField';
import AdminFormCard from '../../components/admin/AdminFormCard';
import AdminPageHeader from '../../components/admin/AdminPageHeader';
import AdminPrimaryButton from '../../components/admin/AdminPrimaryButton';
import AdminSectionTitle from '../../components/admin/AdminSectionTitle';

export default function AdminEditHome() {
  const { content, updateContent, resetToDefaults } = useSiteContent();
  const [home, setHome] = useState(content.home);
  const [brandDisplay, setBrandDisplay] = useState(content.brandDisplay);
  const [brandFooterWatermark, setBrandFooterWatermark] = useState(
    content.brandFooterWatermark
  );

  function save() {
    updateContent({
      brandDisplay,
      brandFooterWatermark,
      home,
    });
    toast.success('Kayıt başarılı', {
      description: 'Ana sayfa ve marka metinleri güncellendi.',
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
        description="Hero, özellikler ve alt CTA metinleri. Kaydettiğinizde ziyaretçi sayfasında görünür."
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

      <AdminFormCard className="space-y-8">
        <AdminSectionTitle>Marka (header / footer)</AdminSectionTitle>
        <div className="space-y-6 pt-2">
          <AdminField
            label="Logo yanı metin"
            value={brandDisplay}
            onChange={setBrandDisplay}
            hint="Örn: Samplify.tr"
          />
          <AdminField
            label="Footer büyük yazı"
            value={brandFooterWatermark}
            onChange={setBrandFooterWatermark}
            hint="Footer’daki watermark harfleri"
          />
        </div>

        <AdminSectionTitle>Hero</AdminSectionTitle>
        <div className="space-y-6 pt-2">
          <AdminField
            label="Rozet"
            value={home.heroBadge}
            onChange={(v) => setHome({ ...home, heroBadge: v })}
          />
          <AdminField
            label="Başlık satırı 1"
            value={home.heroTitleLine1}
            onChange={(v) => setHome({ ...home, heroTitleLine1: v })}
          />
          <AdminField
            label="Vurgulu başlık (gradient)"
            value={home.heroTitleHighlight}
            onChange={(v) => setHome({ ...home, heroTitleHighlight: v })}
          />
          <AdminField
            label="Alt başlık"
            value={home.heroSubtitle}
            onChange={(v) => setHome({ ...home, heroSubtitle: v })}
            multiline
          />
          <AdminField
            label="Birincil düğme"
            value={home.primaryCta}
            onChange={(v) => setHome({ ...home, primaryCta: v })}
          />
          <AdminField
            label="İkincil düğme"
            value={home.secondaryCta}
            onChange={(v) => setHome({ ...home, secondaryCta: v })}
          />
        </div>

        <AdminSectionTitle>Özellikler bölümü</AdminSectionTitle>
        <div className="space-y-6 pt-2">
          <AdminField
            label="Başlık (ilk satır)"
            value={home.featuresHeading}
            onChange={(v) => setHome({ ...home, featuresHeading: v })}
          />
          <AdminField
            label="Başlık vurgusu"
            value={home.featuresHeadingAccent}
            onChange={(v) => setHome({ ...home, featuresHeadingAccent: v })}
          />
          <AdminField
            label="Giriş paragrafı"
            value={home.featuresIntro}
            onChange={(v) => setHome({ ...home, featuresIntro: v })}
            multiline
          />
          <AdminField
            label="Kart 1 başlık"
            value={home.f1Title}
            onChange={(v) => setHome({ ...home, f1Title: v })}
          />
          <AdminField
            label="Kart 1 metin"
            value={home.f1Body}
            onChange={(v) => setHome({ ...home, f1Body: v })}
            multiline
          />
          <AdminField
            label="Kart 2 başlık"
            value={home.f2Title}
            onChange={(v) => setHome({ ...home, f2Title: v })}
          />
          <AdminField
            label="Kart 2 metin"
            value={home.f2Body}
            onChange={(v) => setHome({ ...home, f2Body: v })}
            multiline
          />
          <AdminField
            label="Kart 3 başlık"
            value={home.f3Title}
            onChange={(v) => setHome({ ...home, f3Title: v })}
          />
          <AdminField
            label="Kart 3 metin"
            value={home.f3Body}
            onChange={(v) => setHome({ ...home, f3Body: v })}
            multiline
          />
          <AdminField
            label="Kart 4 başlık"
            value={home.f4Title}
            onChange={(v) => setHome({ ...home, f4Title: v })}
          />
          <AdminField
            label="Kart 4 metin"
            value={home.f4Body}
            onChange={(v) => setHome({ ...home, f4Body: v })}
            multiline
          />
          <AdminField
            label="Kart 4 bağlantı yazısı"
            value={home.f4LinkLabel}
            onChange={(v) => setHome({ ...home, f4LinkLabel: v })}
          />
        </div>

        <AdminSectionTitle>Alt CTA</AdminSectionTitle>
        <div className="space-y-6 pt-2">
          <AdminField label="Başlık" value={home.ctaTitle} onChange={(v) => setHome({ ...home, ctaTitle: v })} />
          <AdminField
            label="Alt metin"
            value={home.ctaSubtitle}
            onChange={(v) => setHome({ ...home, ctaSubtitle: v })}
            multiline
          />
          <AdminField label="Düğme" value={home.ctaButton} onChange={(v) => setHome({ ...home, ctaButton: v })} />
        </div>

        <AdminPrimaryButton onClick={save} icon={<Save className="h-4 w-4" />}>
          Kaydet
        </AdminPrimaryButton>
      </AdminFormCard>
    </div>
  );
}
