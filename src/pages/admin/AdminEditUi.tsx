import { useEffect, useState } from 'react';
import { Languages, Save } from 'lucide-react';
import { toast } from 'sonner';
import type { Locale } from '../../i18n/types';
import { UI_STRING_KEYS, type UiStrings } from '../../i18n/ui';
import { useSiteContent } from '../../contexts/SiteContentContext';
import AdminField from '../../components/admin/AdminField';
import AdminFormCard from '../../components/admin/AdminFormCard';
import AdminLocaleTabs from '../../components/admin/AdminLocaleTabs';
import AdminPageHeader from '../../components/admin/AdminPageHeader';
import AdminPrimaryButton from '../../components/admin/AdminPrimaryButton';
import AdminSectionTitle from '../../components/admin/AdminSectionTitle';
import { UI_ADMIN_LABELS, isUiFieldMultiline } from '../../site/uiAdminLabels';

function updateUiLocale(
  prev: UiStrings,
  key: keyof UiStrings,
  value: string
): UiStrings {
  return { ...prev, [key]: value };
}

export default function AdminEditUi() {
  const { content, updateContent } = useSiteContent();
  const [locale, setLocale] = useState<Locale>('tr');
  const [draftTr, setDraftTr] = useState(content.ui.tr);
  const [draftEn, setDraftEn] = useState(content.ui.en);

  useEffect(() => {
    setDraftTr(content.ui.tr);
    setDraftEn(content.ui.en);
  }, [content.ui]);

  const draft = locale === 'tr' ? draftTr : draftEn;

  function setField(key: keyof UiStrings, value: string) {
    if (locale === 'tr') {
      setDraftTr((d) => updateUiLocale(d, key, value));
    } else {
      setDraftEn((d) => updateUiLocale(d, key, value));
    }
  }

  function save() {
    updateContent({
      ui: {
        tr: draftTr,
        en: draftEn,
      },
    });
    toast.success('Kayıt başarılı', {
      description: 'Ortak arayüz metinleri güncellendi.',
    });
  }

  return (
    <div>
      <AdminPageHeader
        title="Arayüz & ortak metinler"
        description="Menü, footer, iletişim formu etiketleri, akademi listesi ve tema metinleri. Türkçe ve İngilizce ayrı düzenlenir."
      />

      <div className="mb-6 flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-600">
          <Languages className="h-4 w-4" aria-hidden />
          Düzenlenen dil:
        </span>
        <AdminLocaleTabs locale={locale} onChange={setLocale} />
      </div>

      <AdminFormCard className="space-y-10">
        <AdminSectionTitle>
          {locale === 'tr' ? 'Türkçe metinler' : 'English copy'}
        </AdminSectionTitle>

        <div className="space-y-6">
          {UI_STRING_KEYS.map((key) => (
            <AdminField
              key={`${locale}-${key}`}
              label={UI_ADMIN_LABELS[key]}
              value={draft[key]}
              onChange={(v) => setField(key, v)}
              multiline={isUiFieldMultiline(key)}
            />
          ))}
        </div>

        <div className="flex justify-end border-t border-gray-100 pt-6">
          <AdminPrimaryButton onClick={save} icon={<Save className="h-4 w-4" aria-hidden />} className="w-auto min-w-[200px]">
            Kaydet
          </AdminPrimaryButton>
        </div>
      </AdminFormCard>
    </div>
  );
}
