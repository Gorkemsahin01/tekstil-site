import { useState } from 'react';
import { Save } from 'lucide-react';
import { toast } from 'sonner';
import { useSiteContent } from '../../contexts/SiteContentContext';
import AdminField from '../../components/admin/AdminField';
import AdminFormCard from '../../components/admin/AdminFormCard';
import AdminPageHeader from '../../components/admin/AdminPageHeader';
import AdminPrimaryButton from '../../components/admin/AdminPrimaryButton';

export default function AdminEditContact() {
  const { content, updateContent } = useSiteContent();
  const [contact, setContact] = useState(content.contact);

  function save() {
    updateContent({ contact });
    toast.success('Kayıt başarılı', {
      description: 'İletişim sayfası metinleri güncellendi.',
    });
  }

  return (
    <div>
      <AdminPageHeader
        title="İletişim"
        description="/iletisim sayfası üst metinleri ve iletişim bilgileri."
      />

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
