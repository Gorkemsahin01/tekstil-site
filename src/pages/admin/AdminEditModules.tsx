import { useState } from 'react';
import { Save } from 'lucide-react';
import { toast } from 'sonner';
import { useSiteContent } from '../../contexts/SiteContentContext';
import AdminField from '../../components/admin/AdminField';
import AdminFormCard from '../../components/admin/AdminFormCard';
import AdminPageHeader from '../../components/admin/AdminPageHeader';
import AdminPrimaryButton from '../../components/admin/AdminPrimaryButton';
import AdminSectionTitle from '../../components/admin/AdminSectionTitle';

export default function AdminEditModules() {
  const { content, updateContent } = useSiteContent();
  const [modules, setModules] = useState(content.modules);

  function save() {
    updateContent({ modules });
    toast.success('Kayıt başarılı', {
      description: 'Modüller sayfası metinleri güncellendi.',
    });
  }

  return (
    <div>
      <AdminPageHeader
        title="Modüller sayfası"
        description="/moduller adresindeki başlık ve modül açıklamaları."
      />

      <AdminFormCard className="space-y-8">
        <div className="space-y-6">
          <AdminField
            label="Üst rozet"
            value={modules.badge}
            onChange={(v) => setModules({ ...modules, badge: v })}
          />
          <AdminField
            label="Başlık satırı 1"
            value={modules.titleLine1}
            onChange={(v) => setModules({ ...modules, titleLine1: v })}
          />
          <AdminField
            label="Başlık satırı 2 (gri)"
            value={modules.titleLine2}
            onChange={(v) => setModules({ ...modules, titleLine2: v })}
          />
          <AdminField
            label="Giriş paragrafı"
            value={modules.intro}
            onChange={(v) => setModules({ ...modules, intro: v })}
            multiline
          />
        </div>

        <AdminSectionTitle>Sample Tracker</AdminSectionTitle>
        <div className="space-y-6 pt-2">
          <AdminField
            label="Başlık"
            value={modules.stTitle}
            onChange={(v) => setModules({ ...modules, stTitle: v })}
          />
          <AdminField
            label="Açıklama"
            value={modules.stBody}
            onChange={(v) => setModules({ ...modules, stBody: v })}
            multiline
          />
          <AdminField
            label="Özellik 1"
            value={modules.stFeatures[0]}
            onChange={(v) =>
              setModules({
                ...modules,
                stFeatures: [v, modules.stFeatures[1], modules.stFeatures[2]],
              })
            }
          />
          <AdminField
            label="Özellik 2"
            value={modules.stFeatures[1]}
            onChange={(v) =>
              setModules({
                ...modules,
                stFeatures: [modules.stFeatures[0], v, modules.stFeatures[2]],
              })
            }
          />
          <AdminField
            label="Özellik 3"
            value={modules.stFeatures[2]}
            onChange={(v) =>
              setModules({
                ...modules,
                stFeatures: [modules.stFeatures[0], modules.stFeatures[1], v],
              })
            }
          />
          <AdminField
            label="Kart etiketi (küçük)"
            value={modules.stCardTag}
            onChange={(v) => setModules({ ...modules, stCardTag: v })}
          />
          <AdminField
            label="Kart başlığı"
            value={modules.stCardTitle}
            onChange={(v) => setModules({ ...modules, stCardTitle: v })}
          />
        </div>

        <AdminSectionTitle>Measurify</AdminSectionTitle>
        <div className="space-y-6 pt-2">
          <AdminField
            label="Başlık"
            value={modules.mfTitle}
            onChange={(v) => setModules({ ...modules, mfTitle: v })}
          />
          <AdminField
            label="Açıklama"
            value={modules.mfBody}
            onChange={(v) => setModules({ ...modules, mfBody: v })}
            multiline
          />
          <AdminField
            label="Özellik 1"
            value={modules.mfFeatures[0]}
            onChange={(v) =>
              setModules({
                ...modules,
                mfFeatures: [v, modules.mfFeatures[1], modules.mfFeatures[2]],
              })
            }
          />
          <AdminField
            label="Özellik 2"
            value={modules.mfFeatures[1]}
            onChange={(v) =>
              setModules({
                ...modules,
                mfFeatures: [modules.mfFeatures[0], v, modules.mfFeatures[2]],
              })
            }
          />
          <AdminField
            label="Özellik 3"
            value={modules.mfFeatures[2]}
            onChange={(v) =>
              setModules({
                ...modules,
                mfFeatures: [modules.mfFeatures[0], modules.mfFeatures[1], v],
              })
            }
          />
          <AdminField
            label="Kart etiketi"
            value={modules.mfCardTag}
            onChange={(v) => setModules({ ...modules, mfCardTag: v })}
          />
          <AdminField
            label="Kart başlığı"
            value={modules.mfCardTitle}
            onChange={(v) => setModules({ ...modules, mfCardTitle: v })}
          />
        </div>

        <AdminPrimaryButton onClick={save} icon={<Save className="h-4 w-4" />}>
          Kaydet
        </AdminPrimaryButton>
      </AdminFormCard>
    </div>
  );
}
