'use server';

import { revalidatePath } from 'next/cache';

import { enhanceAction } from '@kit/next/actions';
import { getSupabaseServerAdminClient } from '@kit/supabase/server-admin-client';
import { z } from 'zod';

function slugFromName(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
}

const CreateHotelSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  address: z.string().optional(),
  class: z.number().optional(),
  location_slug: z.string().optional(),
  is_active: z.preprocess((v) => (v === 'on' || v === true), z.boolean()).optional(),
});

const UpdateHotelSchema = z.object({
  id: z.preprocess((v) => Number(v), z.number()),
  name: z.string().min(1, 'Name is required'),
  address: z.string().optional(),
  class: z.number().optional(),
  location_slug: z.string().optional(),
  is_active: z.preprocess((v) => (v === 'on' || v === true), z.boolean()).optional(),
});

const DeleteHotelSchema = z.object({
  id: z.preprocess((v) => Number(v), z.number()),
});

export const createHotelAction = enhanceAction(async (formData: FormData, user) => {
  const name = formData.get('name') as string | null;
  const address = formData.get('address') as string | null;
  const classValue = formData.get('class') as string | null;
  const location_slug = formData.get('location_slug') as string | null;
  const is_active = formData.get('is_active');

  const parsed = CreateHotelSchema.safeParse({
    name,
    address,
    class: classValue ? Number(classValue) : undefined,
    location_slug,
    is_active,
  });
  if (!parsed.success) {
    throw new Error(parsed.error.errors[0]?.message ?? 'Invalid input');
  }

  const slug = slugFromName(parsed.data.name);
  const supabase = getSupabaseServerAdminClient();

  const { error } = await supabase.from('hotel').insert({
    name: parsed.data.name,
    slug,
    address: parsed.data.address ?? null,
    class: parsed.data.class ?? null,
    location_slug: parsed.data.location_slug ?? null,
    is_active: parsed.data.is_active ?? true,
  });
  if (error) throw error;

  revalidatePath('/home/hotels');
  return { success: true };
}, { auth: true });

export const updateHotelAction = enhanceAction(async (formData: FormData, user) => {
  const id = formData.get('id') as string | null;
  const name = formData.get('name') as string | null;
  const address = formData.get('address') as string | null;
  const classValue = formData.get('class') as string | null;
  const location_slug = formData.get('location_slug') as string | null;
  const is_active = formData.get('is_active');

  const parsed = UpdateHotelSchema.safeParse({
    id,
    name,
    address,
    class: classValue ? Number(classValue) : undefined,
    location_slug,
    is_active,
  });
  if (!parsed.success) {
    throw new Error(parsed.error.errors[0]?.message ?? 'Invalid input');
  }

  const slug = slugFromName(parsed.data.name);
  const supabase = getSupabaseServerAdminClient();

  const updatePayload: any = {
    name: parsed.data.name,
    slug,
    address: parsed.data.address ?? null,
    class: parsed.data.class ?? null,
    location_slug: parsed.data.location_slug ?? null,
    is_active: parsed.data.is_active ?? true,
    updated_at: new Date().toISOString(),
  };

  const { error } = await supabase.from('hotel').update(updatePayload).eq('id', parsed.data.id);
  if (error) throw error;

  revalidatePath('/home/hotels');
  return { success: true };
}, { auth: true });

export const deleteHotelAction = enhanceAction(async (formData: FormData, user) => {
  const id = formData.get('id') as string | null;
  const parsed = DeleteHotelSchema.safeParse({ id });
  if (!parsed.success) {
    throw new Error(parsed.error.errors[0]?.message ?? 'Invalid input');
  }
  const supabase = getSupabaseServerAdminClient();
  const { error } = await supabase.from('hotel').delete().eq('id', parsed.data.id);
  if (error) throw error;
  revalidatePath('/home/hotels');
  return { success: true };
}, { auth: true });
