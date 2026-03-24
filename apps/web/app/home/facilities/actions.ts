'use server';

import { revalidatePath } from 'next/cache';

import { enhanceAction } from '@kit/next/actions';
import { getSupabaseServerAdminClient } from '@kit/supabase/server-admin-client';
import { z } from 'zod';

const FACILITY_ICONS_BUCKET = 'facility_icons';

function slugFromName(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
}

async function uploadIcon(file: File, facilityId: string): Promise<string> {
  const supabase = getSupabaseServerAdminClient();
  const ext = file.name.split('.').pop() || 'png';
  const path = `${facilityId}.${ext}`;
  const bytes = await file.arrayBuffer();
  // Ensure facility_icons bucket exists (create if missing). Ignore errors
  // if creation isn't permitted or bucket already exists.
  try {
    // @ts-ignore: createBucket may not be present on the client typings
    await supabase.storage.createBucket?.(FACILITY_ICONS_BUCKET, { public: true });
  } catch (err) {
    // ignore
  }

  try {
    // Convert ArrayBuffer to Uint8Array for upload compatibility
    const buffer = new Uint8Array(bytes as ArrayBuffer);
    const { error } = await supabase.storage.from(FACILITY_ICONS_BUCKET).upload(path, buffer, { upsert: true });
    if (error) {
      // Provide more context in the thrown error for easier debugging
      const msg = `Supabase upload error: ${error.message ?? JSON.stringify(error)}`;
      // eslint-disable-next-line no-console
      console.error('uploadIcon:', { path, bucket: FACILITY_ICONS_BUCKET, error });
      throw new Error(msg);
    }
  } catch (err: any) {
    // eslint-disable-next-line no-console
    console.error('uploadIcon unexpected error', err);
    throw new Error(`Failed to upload icon: ${err?.message ?? String(err)}`);
  }
  const {
    data: { publicUrl },
  } = supabase.storage.from(FACILITY_ICONS_BUCKET).getPublicUrl(path);
  return publicUrl;
}

function getStoragePathFromUrl(url: string): string | null {
  try {
    const u = new URL(url);
    const match = u.pathname.match(/\/storage\/v1\/object\/public\/facility_icons\/(.+)/);
    return match ? match[1] : null;
  } catch {
    return null;
  }
}

const CreateFacilitySchema = z.object({
  name: z.string().min(1, 'Name is required'),
});
const UpdateFacilitySchema = z.object({
  id: z.preprocess((v) => Number(v), z.number()),
  name: z.string().min(1, 'Name is required'),
});
const DeleteFacilitySchema = z.object({
  id: z.preprocess((v) => Number(v), z.number()),
});

export const createFacilityAction = enhanceAction(
  async (formData: FormData, user) => {
    const name = formData.get('name') as string | null;
    const parsed = CreateFacilitySchema.safeParse({ name });
    if (!parsed.success) {
      throw new Error(parsed.error.errors[0]?.message ?? 'Invalid input');
    }
    const slug = slugFromName(parsed.data.name);
    const supabase = getSupabaseServerAdminClient();
    const iconFile = formData.get('icon') as File | null;
    let iconUrl: string | null = null;
    const { data: row, error: insertError } = await supabase
      .from('facility')
      .insert({ name: parsed.data.name, slug, icon: null })
      .select('id')
      .single();
    if (insertError) throw insertError;
    const facilityId = row.id;
    if (iconFile && iconFile.size > 0) {
      iconUrl = await uploadIcon(iconFile, String(facilityId));
      await supabase
        .from('facility')
        .update({ icon: iconUrl, updated_at: new Date().toISOString() })
        .eq('id', facilityId);
    }
    revalidatePath('/home/hotels');
    return { success: true };
  },
  { auth: true },
);

export const updateFacilityAction = enhanceAction(
  async (formData: FormData, user) => {
    const id = formData.get('id') as string | null;
    const name = formData.get('name') as string | null;
    const parsed = UpdateFacilitySchema.safeParse({ id, name });
    if (!parsed.success) {
      throw new Error(parsed.error.errors[0]?.message ?? 'Invalid input');
    }
    const slug = slugFromName(parsed.data.name);
    const supabase = getSupabaseServerAdminClient();
    const iconFile = formData.get('icon') as File | null;
    let iconUrl: string | null | undefined;
    if (iconFile && iconFile.size > 0) {
      iconUrl = await uploadIcon(iconFile, String(parsed.data.id));
    }
    const updatePayload: { name: string; slug: string; updated_at: string; icon?: string | null } = {
      name: parsed.data.name,
      slug,
      updated_at: new Date().toISOString(),
    };
    if (iconUrl !== undefined) updatePayload.icon = iconUrl;
    const { error } = await supabase
      .from('facility')
      .update(updatePayload)
      .eq('id', parsed.data.id);
    if (error) throw error;
    revalidatePath('/home/hotels');
    return { success: true };
  },
  { auth: true },
);

export const deleteFacilityAction = enhanceAction(
  async (formData: FormData, user) => {
    const id = formData.get('id') as string | null;
    const parsed = DeleteFacilitySchema.safeParse({ id });
    if (!parsed.success) {
      throw new Error(parsed.error.errors[0]?.message ?? 'Invalid input');
    }
    const supabase = getSupabaseServerAdminClient();
    const { data: facility } = await supabase
      .from('facility')
      .select('icon')
      .eq('id', parsed.data.id)
      .single();
    if (facility?.icon) {
      const path = getStoragePathFromUrl(facility.icon);
      if (path) {
        await supabase.storage.from(FACILITY_ICONS_BUCKET).remove([path]);
      }
    }
    const { error } = await supabase.from('facility').delete().eq('id', parsed.data.id);
    if (error) throw error;
    revalidatePath('/home/hotels');
    return { success: true };
  },
  { auth: true },
);
