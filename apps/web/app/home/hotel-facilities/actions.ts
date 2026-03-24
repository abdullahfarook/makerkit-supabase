'use server';

import { revalidatePath } from 'next/cache';

import { enhanceAction } from '@kit/next/actions';
import { getSupabaseServerAdminClient } from '@kit/supabase/server-admin-client';
import { z } from 'zod';

const CreateHotelFacilitySchema = z.object({
  hotel_id: z.string().min(1, 'Hotel is required'),
  facility_id: z.preprocess((v) => Number(v), z.number()),
});

const DeleteHotelFacilitySchema = z.object({
  hotel_id: z.string().min(1),
  facility_id: z.preprocess((v) => Number(v), z.number()),
});

export const createHotelFacilityAction = enhanceAction(async (formData: FormData, user) => {
  const hotel_id = formData.get('hotel_id') as string | null;
  const facility_id = formData.get('facility_id') as string | null;
  const parsed = CreateHotelFacilitySchema.safeParse({ hotel_id, facility_id });
  if (!parsed.success) throw new Error(parsed.error.errors[0]?.message ?? 'Invalid input');

  const supabase = getSupabaseServerAdminClient();
  const { error } = await supabase.from('hotel_facility').insert({ hotel_id: parsed.data.hotel_id, facility_id: parsed.data.facility_id });
  if (error) throw error;
  revalidatePath('/home/hotel-facilities');
  return { success: true };
}, { auth: true });

export const deleteHotelFacilityAction = enhanceAction(async (formData: FormData, user) => {
  const hotel_id = formData.get('hotel_id') as string | null;
  const facility_id = formData.get('facility_id') as string | null;
  const parsed = DeleteHotelFacilitySchema.safeParse({ hotel_id, facility_id });
  if (!parsed.success) throw new Error(parsed.error.errors[0]?.message ?? 'Invalid input');

  const supabase = getSupabaseServerAdminClient();
  const { error } = await supabase.from('hotel_facility').delete().match({ hotel_id: parsed.data.hotel_id, facility_id: parsed.data.facility_id });
  if (error) throw error;
  revalidatePath('/home/hotel-facilities');
  return { success: true };
}, { auth: true });
