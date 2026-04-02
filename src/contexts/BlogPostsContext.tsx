import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  akademiToApiInput,
  createBlogPost,
  deleteBlogPost,
  fetchBlogPosts,
  mapApiBlogToAkademi,
  updateBlogPost,
} from '../api/cmsApi';
import { USE_CMS_API } from '../config/cms';
import { DEFAULT_AKADEMI_POSTS } from '../data/akademiPosts';
import type { AkademiPost } from '../data/akademiPosts';

const STORAGE_KEY = 'samplify_blog_posts_v1';

/** Unsplash’ta kaldırılmış fotoğraf (404); eski seed/API kayıtlarında kalabilir */
const REMOVED_UNSPLASH_ID = 'photo-1581091226825-a6a2a5a158d5';
const TECH_PACK_POST_IMAGE_FIX =
  'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=1200&q=80';

function fixRemovedBlogImages(posts: AkademiPost[]): AkademiPost[] {
  return posts.map((p) =>
    p.image?.includes(REMOVED_UNSPLASH_ID) ? { ...p, image: TECH_PACK_POST_IMAGE_FIX } : p
  );
}

function loadStored(): AkademiPost[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [...DEFAULT_AKADEMI_POSTS];
    const parsed = JSON.parse(raw) as AkademiPost[];
    if (!Array.isArray(parsed) || parsed.length === 0) return [...DEFAULT_AKADEMI_POSTS];
    const fixed = fixRemovedBlogImages(parsed);
    if (JSON.stringify(fixed) !== JSON.stringify(parsed)) {
      writeStorage(fixed);
    }
    return fixed;
  } catch {
    return [...DEFAULT_AKADEMI_POSTS];
  }
}

function writeStorage(posts: AkademiPost[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
  } catch {
    /* ignore */
  }
}

function mergeSavePost(
  prev: AkademiPost[],
  post: AkademiPost,
  previousSlug?: string
): AkademiPost[] {
  let next = prev.filter((p) => {
    if (previousSlug !== undefined && p.slug === previousSlug) return false;
    if (p.slug === post.slug) return false;
    return true;
  });
  if (post.featured) {
    next = next.map((p) => ({ ...p, featured: false }));
  }
  return [...next, post].sort((a, b) => (a.date < b.date ? 1 : -1));
}

type BlogPostsContextValue = {
  posts: AkademiPost[];
  setPosts: (posts: AkademiPost[]) => void;
  savePost: (post: AkademiPost, previousSlug?: string) => void;
  deletePost: (slug: string) => void;
  resetToDefaults: () => void;
};

const BlogPostsContext = createContext<BlogPostsContextValue | null>(null);

export function BlogPostsProvider({ children }: { children: React.ReactNode }) {
  const [posts, setPostsState] = useState<AkademiPost[]>(loadStored);

  useEffect(() => {
    if (!USE_CMS_API) return;
    let cancelled = false;
    void (async () => {
      try {
        const list = await fetchBlogPosts();
        const mapped = fixRemovedBlogImages(list.map(mapApiBlogToAkademi));
        if (!cancelled) {
          setPostsState(mapped);
          writeStorage(mapped);
        }
      } catch {
        /* API yok — loadStored kullanılır */
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const setPosts = useCallback((next: AkademiPost[]) => {
    setPostsState(next);
    writeStorage(next);
  }, []);

  const savePost = useCallback(
    (post: AkademiPost, previousSlug?: string) => {
      const applyLocal = (prev: AkademiPost[]) => mergeSavePost(prev, post, previousSlug);

      if (!USE_CMS_API) {
        setPostsState((prev) => {
          const next = applyLocal(prev);
          writeStorage(next);
          return next;
        });
        return;
      }

      void (async () => {
        try {
          const input = akademiToApiInput(post);
          const prevPost =
            previousSlug !== undefined
              ? posts.find((p) => p.slug === previousSlug)
              : posts.find((p) => p.slug === post.slug);

          if (prevPost?.entityId) {
            await updateBlogPost(prevPost.entityId, input);
          } else {
            await createBlogPost(input);
          }
          const list = await fetchBlogPosts();
          const mapped = fixRemovedBlogImages(list.map(mapApiBlogToAkademi));
          setPostsState(mapped);
          writeStorage(mapped);
        } catch {
          setPostsState((prev) => {
            const next = applyLocal(prev);
            writeStorage(next);
            return next;
          });
        }
      })();
    },
    [posts]
  );

  const deletePost = useCallback(
    (slug: string) => {
      const target = posts.find((p) => p.slug === slug);

      if (!USE_CMS_API || !target?.entityId) {
        setPostsState((prev) => {
          const next = prev.filter((p) => p.slug !== slug);
          writeStorage(next);
          return next;
        });
        return;
      }

      void (async () => {
        try {
          await deleteBlogPost(target.entityId!);
          const list = await fetchBlogPosts();
          const mapped = fixRemovedBlogImages(list.map(mapApiBlogToAkademi));
          setPostsState(mapped);
          writeStorage(mapped);
        } catch {
          setPostsState((prev) => {
            const next = prev.filter((p) => p.slug !== slug);
            writeStorage(next);
            return next;
          });
        }
      })();
    },
    [posts]
  );

  const resetToDefaults = useCallback(() => {
    const fresh = [...DEFAULT_AKADEMI_POSTS];
    setPostsState(fresh);
    writeStorage(fresh);
  }, []);

  const value = useMemo(
    () => ({ posts, setPosts, savePost, deletePost, resetToDefaults }),
    [posts, setPosts, savePost, deletePost, resetToDefaults]
  );

  return (
    <BlogPostsContext.Provider value={value}>{children}</BlogPostsContext.Provider>
  );
}

export function useBlogPosts() {
  const ctx = useContext(BlogPostsContext);
  if (!ctx) throw new Error('useBlogPosts must be used within BlogPostsProvider');
  return ctx;
}
