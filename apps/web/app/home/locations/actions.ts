'use server';

import { revalidatePath } from 'next/cache';

import { enhanceAction } from '@kit/next/actions';
import { getSupabaseServerAdminClient } from '@kit/supabase/server-admin-client';
import { z } from 'zod';

const LOCATIONS_BUCKET = 'locations';

const CreateLocationSchema = z.object({
  name: z.string().min(1),
  slug: z.string().optional(),
  thumbnail: z.string().optional(),
});

const UpdateLocationSchema = CreateLocationSchema.extend({ id: z.string() });

async function uploadThumbnail(file: File, locationId: string): Promise<string> {
  const supabase = getSupabaseServerAdminClient();
  const ext = file.name.split('.').pop() || 'png';
  const path = `${locationId}.${ext}`;
  const bytes = await file.arrayBuffer();

  // Ensure bucket exists (create if missing). Some Supabase projects may not have the
  // `locations` bucket pre-created.
  try {
    // createBucket requires service role; if bucket already exists this may return an error
    // which we ignore.
    // @ts-ignore - supabase storage typings may not expose createBucket on this client wrapper
    await supabase.storage.createBucket?.(LOCATIONS_BUCKET, { public: true });
  } catch (err) {
    // ignore errors here (e.g., bucket already exists or insufficient permissions)
  }

  const { error } = await supabase.storage.from(LOCATIONS_BUCKET).upload(path, bytes, { upsert: true });
  if (error) throw error;
  const {
    data: { publicUrl },
  } = supabase.storage.from(LOCATIONS_BUCKET).getPublicUrl(path);
  return publicUrl;
}

function getStoragePathFromUrl(url: string): string | null {
  try {
    const u = new URL(url);
    const match = u.pathname.match(/\/storage\/v1\/object\/public\/locations\/(.+)/);
    return match ? match[1] : null;
  } catch {
    return null;
  }
}

export const createLocationAction = enhanceAction(async (formData: FormData, user) => {
  const name = formData.get('name') as string | null;
  const slug = formData.get('slug') as string | null;
  const thumbnailUrl = formData.get('thumbnail') as string | null;
  const parsed = CreateLocationSchema.safeParse({ name, slug, thumbnail: thumbnailUrl });
  if (!parsed.success) throw new Error(parsed.error.errors[0]?.message ?? 'Invalid input');

  const supabase = getSupabaseServerAdminClient();
  const thumbnailFile = formData.get('thumbnailFile') as File | null;

  const { data: row, error: insertError } = await supabase
    .from('location')
    .insert({ name: parsed.data.name, slug: parsed.data.slug ?? null, thumbnail: null })
    .select('id')
    .single();
  if (insertError) throw insertError;
  const locationId = row.id;

  let finalUrl: string | null = null;
  if (thumbnailFile && thumbnailFile.size > 0) {
    finalUrl = await uploadThumbnail(thumbnailFile, String(locationId));
  } else if (thumbnailUrl) {
    finalUrl = thumbnailUrl;
  }

  if (finalUrl) {
    await supabase.from('location').update({ thumbnail: finalUrl }).eq('id', locationId);
  }

  revalidatePath('/home/locations');
  return { success: true };
}, { auth: true });

export const updateLocationAction = enhanceAction(async (formData: FormData, user) => {
  const id = formData.get('id') as string | null;
  const name = formData.get('name') as string | null;
  const slug = formData.get('slug') as string | null;
  const thumbnailUrl = formData.get('thumbnail') as string | null;
  const parsed = UpdateLocationSchema.safeParse({ id, name, slug, thumbnail: thumbnailUrl });
  if (!parsed.success) throw new Error(parsed.error.errors[0]?.message ?? 'Invalid input');

  const supabase = getSupabaseServerAdminClient();
  const thumbnailFile = formData.get('thumbnailFile') as File | null;

  let finalUrl: string | null | undefined;
  if (thumbnailFile && thumbnailFile.size > 0) {
    finalUrl = await uploadThumbnail(thumbnailFile, String(parsed.data.id));
  } else if (thumbnailUrl) {
    finalUrl = thumbnailUrl;
  }

  const updatePayload: { name: string; slug?: string | null; thumbnail?: string | null } = { name: parsed.data.name };
  if (parsed.data.slug !== undefined) updatePayload.slug = parsed.data.slug ?? null;
  if (finalUrl !== undefined) updatePayload.thumbnail = finalUrl;

  const { error } = await supabase.from('location').update(updatePayload).eq('id', parsed.data.id);
  if (error) throw error;

  revalidatePath('/home/locations');
  return { success: true };
}, { auth: true });

export const deleteLocationAction = enhanceAction(async (formData: FormData, user) => {
  const id = formData.get('id') as string | null;
  if (!id) throw new Error('Missing id');
  const supabase = getSupabaseServerAdminClient();

  const { data: location } = await supabase.from('location').select('thumbnail').eq('id', id).single();
  if (location?.thumbnail) {
    const path = getStoragePathFromUrl(location.thumbnail);
    if (path) await supabase.storage.from(LOCATIONS_BUCKET).remove([path]);
  }
  const { error } = await supabase.from('location').delete().eq('id', id);
  if (error) throw error;
  revalidatePath('/home/locations');
  return { success: true };
}, { auth: true });

// No default export for server actions (only async exports allowed)
