import type { AkademiPost } from '../data/akademiPosts';
import { abpClient } from './abpClient';

/** ABP dinamik API — `Samplify.Application` conventional controllers */
const APP = '/api/app';

export type SiteContentApiDto = {
  contentJson: string;
};

export type BlogLocalized = { tr: string; en: string };
export type BlogBodyLocalized = { tr: string[]; en: string[] };

/** Sunucu DTO — camelCase JSON */
export type BlogPostApiDto = {
  entityId: string;
  id: string;
  slug: string;
  featured: boolean;
  image: string;
  category: BlogLocalized;
  date: string;
  title: BlogLocalized;
  excerpt: BlogLocalized;
  readMinutes: BlogLocalized;
  body: BlogBodyLocalized;
};

export type CreateUpdateBlogPostInput = {
  slug: string;
  externalKey?: string;
  featured: boolean;
  image: string;
  date: string;
  category: BlogLocalized;
  title: BlogLocalized;
  excerpt: BlogLocalized;
  readMinutes: BlogLocalized;
  body: BlogBodyLocalized;
};

export async function fetchSiteContent(): Promise<SiteContentApiDto> {
  const { data } = await abpClient.get<SiteContentApiDto>(`${APP}/site-content`);
  return data;
}

export async function putSiteContent(contentJson: string): Promise<void> {
  await abpClient.put(`${APP}/site-content`, { contentJson } satisfies { contentJson: string });
}

export async function fetchBlogPosts(): Promise<BlogPostApiDto[]> {
  const { data } = await abpClient.get<BlogPostApiDto[]>(`${APP}/blog-post`);
  return data;
}

export async function fetchBlogPostBySlug(slug: string): Promise<BlogPostApiDto> {
  const { data } = await abpClient.get<BlogPostApiDto>(
    `${APP}/blog-post/by-slug/${encodeURIComponent(slug)}`
  );
  return data;
}

export async function createBlogPost(input: CreateUpdateBlogPostInput): Promise<BlogPostApiDto> {
  const { data } = await abpClient.post<BlogPostApiDto>(`${APP}/blog-post`, input);
  return data;
}

export async function updateBlogPost(
  entityId: string,
  input: CreateUpdateBlogPostInput
): Promise<BlogPostApiDto> {
  const { data } = await abpClient.put<BlogPostApiDto>(`${APP}/blog-post/${entityId}`, input);
  return data;
}

export async function deleteBlogPost(entityId: string): Promise<void> {
  await abpClient.delete(`${APP}/blog-post/${entityId}`);
}

export function mapApiBlogToAkademi(p: BlogPostApiDto): AkademiPost {
  return {
    entityId: p.entityId,
    slug: p.slug,
    id: p.id,
    image: p.image,
    category: p.category,
    date: p.date,
    title: p.title,
    excerpt: p.excerpt,
    readMinutes: p.readMinutes,
    body: p.body,
    featured: p.featured,
  };
}

export function akademiToApiInput(post: AkademiPost): CreateUpdateBlogPostInput {
  return {
    slug: post.slug,
    externalKey: post.id,
    featured: post.featured ?? false,
    image: post.image,
    date: post.date,
    category: post.category,
    title: post.title,
    excerpt: post.excerpt,
    readMinutes: post.readMinutes,
    body: post.body,
  };
}
