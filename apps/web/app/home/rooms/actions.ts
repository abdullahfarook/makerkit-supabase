'use server';

import { revalidatePath } from 'next/cache';

import { enhanceAction } from '@kit/next/actions';
import { getSupabaseServerAdminClient } from '@kit/supabase/server-admin-client';
import { z } from 'zod';

const CreateRoomSchema = z.object({
  hotel_slug: z.string().min(1, 'Hotel is required'),
  room_number: z.string().min(1, 'Room number required'),
  name: z.string().min(1, 'Name is required'),
  room_category_id: z.preprocess((v) => Number(v), z.number()).optional(),
  beds: z.preprocess((v) => Number(v), z.number()).optional(),
  price_per_night: z.preprocess((v) => Number(v), z.number()).optional(),
  city_view: z.preprocess((v) => (v === 'on' || v === true), z.boolean()).optional(),
});

const UpdateRoomSchema = CreateRoomSchema.extend({ id: z.preprocess((v) => Number(v), z.number()) });
const DeleteRoomSchema = z.object({ id: z.preprocess((v) => Number(v), z.number()) });

export const createRoomAction = enhanceAction(async (formData: FormData, user) => {
  const data = Object.fromEntries(formData as any) as any;
  const parsed = CreateRoomSchema.safeParse(data);
  if (!parsed.success) throw new Error(parsed.error.errors[0]?.message ?? 'Invalid input');
  const supabase = getSupabaseServerAdminClient();
  const { error } = await supabase.from('hotel_rooms').insert({
    hotel_slug: parsed.data.hotel_slug,
    room_number: parsed.data.room_number,
    name: parsed.data.name,
    room_category_id: parsed.data.room_category_id ?? null,
    beds: parsed.data.beds ?? null,
    price_per_night: parsed.data.price_per_night ?? null,
    city_view: parsed.data.city_view ?? false,
  });
  if (error) throw error;
  revalidatePath('/home/rooms');
  return { success: true };
}, { auth: true });

export const updateRoomAction = enhanceAction(async (formData: FormData, user) => {
  const data = Object.fromEntries(formData as any) as any;
  const parsed = UpdateRoomSchema.safeParse(data);
  if (!parsed.success) throw new Error(parsed.error.errors[0]?.message ?? 'Invalid input');
  const supabase = getSupabaseServerAdminClient();
  const updatePayload: any = {
    hotel_slug: parsed.data.hotel_slug,
    room_number: parsed.data.room_number,
    name: parsed.data.name,
    room_category_id: parsed.data.room_category_id ?? null,
    beds: parsed.data.beds ?? null,
    price_per_night: parsed.data.price_per_night ?? null,
    city_view: parsed.data.city_view ?? false,
    updated_at: new Date().toISOString(),
  };
  const { error } = await supabase.from('hotel_rooms').update(updatePayload).eq('id', parsed.data.id);
  if (error) throw error;
  revalidatePath('/home/rooms');
  return { success: true };
}, { auth: true });

export const deleteRoomAction = enhanceAction(async (formData: FormData, user) => {
  const data = Object.fromEntries(formData as any) as any;
  const parsed = DeleteRoomSchema.safeParse(data);
  if (!parsed.success) throw new Error(parsed.error.errors[0]?.message ?? 'Invalid input');
  const supabase = getSupabaseServerAdminClient();
  const { error } = await supabase.from('hotel_rooms').delete().eq('id', parsed.data.id);
  if (error) throw error;
  revalidatePath('/home/rooms');
  return { success: true };
}, { auth: true });
