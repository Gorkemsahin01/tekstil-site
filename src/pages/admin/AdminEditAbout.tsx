import { useEffect, useState } from 'react';
import { Languages, Save } from 'lucide-react';
import { toast } from 'sonner';
import type { Locale } from '../../i18n/types';
import { useSiteContent } from '../../contexts/SiteContentContext';
import AdminField from '../../components/admin/AdminField';
import AdminFormCard from '../../components/admin/AdminFormCard';
import AdminLocaleTabs from '../../components/admin/AdminLocaleTabs';
import AdminPageHeader from '../../components/admin/AdminPageHeader';
import AdminPrimaryButton from '../../components/admin/AdminPrimaryButton';

export default function AdminEditAbout() {
  const { content, updateContent } = useSiteContent();
  const [locale, setLocale] = useState<Locale>('tr');
  const [aboutTr, setAboutTr] = useState(content.about.tr);
  const [aboutEn, setAboutEn] = useState(content.about.en);

  useEffect(() => {
    setAboutTr(content.about.tr);
    setAboutEn(content.about.en);
  }, [content.about]);

  const about = locale === 'tr' ? aboutTr : aboutEn;
  const setAbout = locale === 'tr' ? setAboutTr : setAboutEn;

  function save() {
    updateContent({ about: { tr: aboutTr, en: aboutEn } });
    toast.success('Kayıt başarılı', {
      description: 'Hakkımızda sayfası metinleri (TR + EN) güncellendi.',
    });
  }

  return (
    <div>
      <AdminPageHeader
        title="Hakkımızda (Vizyon)"
        description="/hakkimizda sayfası metinleri — Türkçe ve İngilizce ayrı."
      />

      <div className="mb-6 flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-600">
          <Languages className="h-4 w-4" aria-hidden />
          Düzenlenen dil:
        </span>
        <AdminLocaleTabs locale={locale} onChange={setLocale} />
      </div>

      <AdminFormCard className="space-y-6">
        <AdminField
          label="Ana başlık satırı 1"
          value={about.titleLine1}
          onChange={(v) => setAbout({ ...about, titleLine1: v })}
        />
        <AdminField
          label="Ana başlık satırı 2 (gri)"
          value={about.titleLine2}
          onChange={(v) => setAbout({ ...about, titleLine2: v })}
        />
        <AdminField
          label="Vizyon etiketi"
          value={about.visionLabel}
          onChange={(v) => setAbout({ ...about, visionLabel: v })}
        />
        <AdminField
          label="Vizyon metni"
          value={about.visionTitle}
          onChange={(v) => setAbout({ ...about, visionTitle: v })}
          multiline
        />
        <AdminField
          label="İkinci blok etiketi"
          value={about.whyLabel}
          onChange={(v) => setAbout({ ...about, whyLabel: v })}
        />
        <AdminField
          label="İkinci blok metni"
          value={about.whyBody}
          onChange={(v) => setAbout({ ...about, whyBody: v })}
          multiline
        />
        <AdminField
          label="Alt kutu başlığı"
          value={about.ctaTitle}
          onChange={(v) => setAbout({ ...about, ctaTitle: v })}
        />
        <AdminField
          label="Alt kutu metni"
          value={about.ctaBody}
          onChange={(v) => setAbout({ ...about, ctaBody: v })}
          multiline
        />
        <AdminField
          label="Alt kutu düğmesi"
          value={about.ctaButton}
          onChange={(v) => setAbout({ ...about, ctaButton: v })}
        />

        <AdminPrimaryButton onClick={save} icon={<Save className="h-4 w-4" />}>
          Kaydet
        </AdminPrimaryButton>
      </AdminFormCard>
    </div>
  );
}
