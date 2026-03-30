import { useState } from 'react';
import { Save } from 'lucide-react';
import { toast } from 'sonner';
import { useSiteContent } from '../../contexts/SiteContentContext';
import AdminField from '../../components/admin/AdminField';
import AdminFormCard from '../../components/admin/AdminFormCard';
import AdminPageHeader from '../../components/admin/AdminPageHeader';
import AdminPrimaryButton from '../../components/admin/AdminPrimaryButton';

export default function AdminEditAbout() {
  const { content, updateContent } = useSiteContent();
  const [about, setAbout] = useState(content.about);

  function save() {
    updateContent({ about });
    toast.success('Kayıt başarılı', {
      description: 'Hakkımızda sayfası metinleri güncellendi.',
    });
  }

  return (
    <div>
      <AdminPageHeader
        title="Hakkımızda (Vizyon)"
        description="/hakkimizda sayfası metinleri."
      />

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
