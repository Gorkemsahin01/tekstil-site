import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, ExternalLink, Pencil, Plus, Save, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import type { AkademiPost } from '../../data/akademiPosts';
import { useBlogPosts } from '../../contexts/BlogPostsContext';
import AdminField from '../../components/admin/AdminField';
import AdminFormCard from '../../components/admin/AdminFormCard';
import AdminPageHeader from '../../components/admin/AdminPageHeader';
import AdminPrimaryButton from '../../components/admin/AdminPrimaryButton';
import AdminSectionTitle from '../../components/admin/AdminSectionTitle';

const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function textToParagraphs(t: string): string[] {
  const p = t
    .split(/\n\n+/)
    .map((s) => s.trim())
    .filter(Boolean);
  return p.length ? p : [''];
}

function paragraphsToText(p: string[]): string {
  return p.join('\n\n');
}

function emptyDraft(): AkademiPost {
  const d = new Date().toISOString().slice(0, 10);
  return {
    id: `post-${Date.now()}`,
    slug: `yazi-${Date.now()}`,
    image:
      'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1200&q=80',
    category: { tr: 'Genel', en: 'General' },
    date: d,
    title: { tr: 'Yeni başlık', en: 'New title' },
    excerpt: { tr: '', en: '' },
    readMinutes: { tr: '5 dk', en: '5 min' },
    body: {
      tr: ['İlk paragrafınızı buraya yazın. Paragraflar arasında boş satır bırakın.'],
      en: ['First paragraph. Leave a blank line between paragraphs.'],
    },
    featured: false,
  };
}

export default function AdminEditBlog() {
  const { posts, savePost, deletePost, resetToDefaults } = useBlogPosts();
  const [mode, setMode] = useState<'list' | 'edit'>('list');
  const [previousSlug, setPreviousSlug] = useState<string | undefined>(undefined);
  const [draft, setDraft] = useState<AkademiPost | null>(null);

  const sorted = useMemo(
    () => [...posts].sort((a, b) => (a.date < b.date ? 1 : -1)),
    [posts]
  );

  function openNew() {
    setDraft(emptyDraft());
    setPreviousSlug(undefined);
    setMode('edit');
  }

  function openEdit(post: AkademiPost) {
    setDraft({ ...post });
    setPreviousSlug(post.slug);
    setMode('edit');
  }

  function cancelEdit() {
    setDraft(null);
    setPreviousSlug(undefined);
    setMode('list');
  }

  function handleSave() {
    if (!draft) return;
    if (!SLUG_RE.test(draft.slug)) {
      toast.error('Slug yalnızca küçük harf, rakam ve tire içerebilir (örn: yeni-yazi-basligi).');
      return;
    }
    const next: AkademiPost = {
      ...draft,
      body: {
        tr: textToParagraphs(paragraphsToText(draft.body.tr)),
        en: textToParagraphs(paragraphsToText(draft.body.en)),
      },
    };
    savePost(next, previousSlug);
    toast.success('Kayıt başarılı', { description: 'Akademi yazıları güncellendi.' });
    cancelEdit();
  }

  function handleDelete() {
    if (!draft || !previousSlug) return;
    if (!confirm('Bu yazı silinsin mi?')) return;
    deletePost(draft.slug);
    toast.success('Yazı silindi');
    cancelEdit();
  }

  function resetAll() {
    if (!confirm('Tüm blog yazıları varsayılan içeriğe dönsün mü?')) return;
    resetToDefaults();
    toast.success('Varsayılan yazılar yüklendi');
    if (mode === 'edit') cancelEdit();
  }

  if (mode === 'edit' && draft) {
    return (
      <div>
        <AdminPageHeader
          title={previousSlug ? 'Yazıyı düzenle' : 'Yeni yazı'}
          description="Başlıklar, özet ve gövde metinleri TR / EN olarak kaydedilir. Paragraflar arasında boş satır kullanın."
          action={
            <button
              type="button"
              onClick={cancelEdit}
              className="rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-50"
            >
              Listeye dön
            </button>
          }
        />

        <div className="mb-6 flex flex-wrap gap-3">
          <AdminPrimaryButton
            onClick={handleSave}
            icon={<Save className="h-4 w-4" />}
            className="w-auto min-w-[160px] px-8"
          >
            Kaydet
          </AdminPrimaryButton>
          {previousSlug && (
            <button
              type="button"
              onClick={handleDelete}
              className="inline-flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700 transition hover:bg-red-100"
            >
              <Trash2 className="h-4 w-4" />
              Sil
            </button>
          )}
          <Link
            to={`/akademi/${draft.slug}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-800 shadow-sm transition hover:bg-gray-50"
          >
            <ExternalLink className="h-4 w-4" />
            Önizle
          </Link>
        </div>

        <AdminFormCard className="space-y-8">
          <AdminSectionTitle>Adres ve görsel</AdminSectionTitle>
          <div className="grid gap-6 pt-2 md:grid-cols-2">
            <AdminField
              label="URL slug (küçük harf, tire)"
              value={draft.slug}
              onChange={(v) => setDraft({ ...draft, slug: v.trim().toLowerCase().replace(/\s+/g, '-') })}
              hint="Örn: numune-surecinde-ipuclari"
            />
            <AdminField
              label="Yayın tarihi (YYYY-AA-GG)"
              value={draft.date}
              onChange={(v) => setDraft({ ...draft, date: v })}
            />
            <div className="md:col-span-2">
              <AdminField
                label="Kapak görseli URL"
                value={draft.image}
                onChange={(v) => setDraft({ ...draft, image: v })}
              />
            </div>
            <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-gray-200 bg-gray-50/80 px-4 py-3">
              <input
                type="checkbox"
                checked={!!draft.featured}
                onChange={(e) => setDraft({ ...draft, featured: e.target.checked })}
                className="h-4 w-4 rounded border-gray-300 text-brand-600 focus:ring-brand-500"
              />
              <span className="text-sm font-medium text-gray-800">Öne çıkan yazı (yalnızca biri)</span>
            </label>
          </div>

          <AdminSectionTitle>Kategori ve süre</AdminSectionTitle>
          <div className="grid gap-6 pt-2 md:grid-cols-2">
            <AdminField
              label="Kategori (TR)"
              value={draft.category.tr}
              onChange={(v) => setDraft({ ...draft, category: { ...draft.category, tr: v } })}
            />
            <AdminField
              label="Category (EN)"
              value={draft.category.en}
              onChange={(v) => setDraft({ ...draft, category: { ...draft.category, en: v } })}
            />
            <AdminField
              label="Okuma süresi (TR)"
              value={draft.readMinutes.tr}
              onChange={(v) => setDraft({ ...draft, readMinutes: { ...draft.readMinutes, tr: v } })}
            />
            <AdminField
              label="Reading time (EN)"
              value={draft.readMinutes.en}
              onChange={(v) => setDraft({ ...draft, readMinutes: { ...draft.readMinutes, en: v } })}
            />
          </div>

          <AdminSectionTitle>Başlık ve özet</AdminSectionTitle>
          <div className="grid gap-6 pt-2 md:grid-cols-2">
            <AdminField
              label="Başlık (TR)"
              value={draft.title.tr}
              onChange={(v) => setDraft({ ...draft, title: { ...draft.title, tr: v } })}
            />
            <AdminField
              label="Title (EN)"
              value={draft.title.en}
              onChange={(v) => setDraft({ ...draft, title: { ...draft.title, en: v } })}
            />
            <AdminField
              label="Özet (TR)"
              value={draft.excerpt.tr}
              onChange={(v) => setDraft({ ...draft, excerpt: { ...draft.excerpt, tr: v } })}
              multiline
            />
            <AdminField
              label="Excerpt (EN)"
              value={draft.excerpt.en}
              onChange={(v) => setDraft({ ...draft, excerpt: { ...draft.excerpt, en: v } })}
              multiline
            />
          </div>

          <AdminSectionTitle>Makale gövdesi</AdminSectionTitle>
          <div className="grid gap-6 pt-2 md:grid-cols-2">
            <AdminField
              label="Gövde (TR) — paragraflar arası boş satır"
              value={paragraphsToText(draft.body.tr)}
              onChange={(v) =>
                setDraft({ ...draft, body: { ...draft.body, tr: textToParagraphs(v) } })
              }
              multiline
            />
            <AdminField
              label="Body (EN) — blank line between paragraphs"
              value={paragraphsToText(draft.body.en)}
              onChange={(v) =>
                setDraft({ ...draft, body: { ...draft.body, en: textToParagraphs(v) } })
              }
              multiline
            />
          </div>
        </AdminFormCard>
      </div>
    );
  }

  return (
    <div>
      <AdminPageHeader
        title="Akademi (blog)"
        description="Ziyaretçi /akademi sayfasındaki yazıları buradan yönetin. Yeni yazı ekleyebilir, düzenleyebilir veya silebilirsiniz."
        action={
          <button
            type="button"
            onClick={resetAll}
            className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-2.5 text-sm font-medium text-amber-900 transition hover:bg-amber-100"
          >
            Varsayılan içeriği yükle
          </button>
        }
      />

      <div className="mb-8 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={openNew}
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-brand-600 to-violet-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-500/25 transition hover:from-brand-500 hover:to-violet-500"
        >
          <Plus className="h-4 w-4" />
          Yeni yazı
        </button>
        <p className="text-sm text-gray-500">
          Toplam <span className="font-semibold text-gray-800">{posts.length}</span> yazı
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {sorted.map((post) => (
          <div
            key={post.id}
            className="group flex flex-col overflow-hidden rounded-2xl border border-gray-200/90 bg-white shadow-sm transition hover:border-brand-200 hover:shadow-md"
          >
            <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
              <img src={post.image} alt="" className="h-full w-full object-cover" loading="lazy" />
              {post.featured && (
                <span className="absolute left-3 top-3 rounded-full bg-brand-600 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
                  Öne çıkan
                </span>
              )}
            </div>
            <div className="flex flex-1 flex-col p-4">
              <p className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-gray-400">
                {post.date} · {post.slug}
              </p>
              <h3 className="mb-3 line-clamp-2 text-base font-bold text-gray-900">{post.title.tr}</h3>
              <div className="mt-auto flex flex-wrap gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => openEdit(post)}
                  className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-gray-900 px-3 py-2.5 text-xs font-bold text-white transition hover:bg-brand-600"
                >
                  <Pencil className="h-3.5 w-3.5" />
                  Düzenle
                </button>
                <Link
                  to={`/akademi/${post.slug}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-gray-200 px-3 py-2.5 text-xs font-bold text-gray-700 transition hover:bg-gray-50"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  Görüntüle
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {sorted.length === 0 && (
        <div className="rounded-2xl border border-dashed border-gray-300 bg-white/80 px-8 py-16 text-center">
          <BookOpen className="mx-auto mb-4 h-12 w-12 text-gray-300" />
          <p className="text-gray-600">Henüz yazı yok. Yukarıdan &quot;Yeni yazı&quot; ile ekleyin.</p>
        </div>
      )}
    </div>
  );
}
