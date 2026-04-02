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

export default function AdminEditContact() {
  const { content, updateContent } = useSiteContent();
  const [locale, setLocale] = useState<Locale>('tr');
  const [contactTr, setContactTr] = useState(content.contact.tr);
  const [contactEn, setContactEn] = useState(content.contact.en);

  useEffect(() => {
    setContactTr(content.contact.tr);
    setContactEn(content.contact.en);
  }, [content.contact]);

  const contact = locale === 'tr' ? contactTr : contactEn;
  const setContact = locale === 'tr' ? setContactTr : setContactEn;

  function save() {
    updateContent({ contact: { tr: contactTr, en: contactEn } });
    toast.success('Kayıt başarılı', {
      description: 'İletişim sayfası metinleri (TR + EN) güncellendi.',
    });
  }

  return (
    <div>
      <AdminPageHeader
        title="İletişim"
        description="/iletisim üst metinleri ve iletişim bilgileri — her dil için ayrı (e-posta/konum farklı olabilir)."
      />

      <div className="mb-6 flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-600">
          <Languages className="h-4 w-4" aria-hidden />
          Düzenlenen dil:
        </span>
        <AdminLocaleTabs locale={locale} onChange={setLocale} />
      </div>

      <AdminFormCard className="space-y-6">
        <AdminField label="Rozet" value={contact.badge} onChange={(v) => setContact({ ...contact, badge: v })} />
        <AdminField
          label="Başlık satırı 1"
          value={contact.titleLine1}
          onChange={(v) => setContact({ ...contact, titleLine1: v })}
        />
        <AdminField
          label="Vurgulu başlık"
          value={contact.titleHighlight}
          onChange={(v) => setContact({ ...contact, titleHighlight: v })}
        />
        <AdminField
          label="Giriş paragrafı"
          value={contact.intro}
          onChange={(v) => setContact({ ...contact, intro: v })}
          multiline
        />
        <AdminField
          label="E-posta (görünen)"
          value={contact.email}
          onChange={(v) => setContact({ ...contact, email: v })}
        />
        <AdminField
          label="Konum"
          value={contact.location}
          onChange={(v) => setContact({ ...contact, location: v })}
        />

        <AdminPrimaryButton onClick={save} icon={<Save className="h-4 w-4" />}>
          Kaydet
        </AdminPrimaryButton>
      </AdminFormCard>
    </div>
  );
}
