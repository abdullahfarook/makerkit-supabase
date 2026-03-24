'use server';

import { revalidatePath } from 'next/cache';

import { enhanceAction } from '@kit/next/actions';
import { getSupabaseServerAdminClient } from '@kit/supabase/server-admin-client';
import { z } from 'zod';

const CreatePromotionSchema = z.object({
  code: z.string().min(1, 'Code is required'),
  hotel_id: z.string().optional(),
  discount_percent: z.preprocess((v) => Number(v), z.number()).optional(),
  valid_from: z.string().optional(),
  valid_to: z.string().optional(),
  is_active: z.preprocess((v) => (v === 'on' || v === true), z.boolean()).optional(),
});

const UpdatePromotionSchema = CreatePromotionSchema.extend({
  code: z.string().min(1, 'Code is required'),
});

const DeletePromotionSchema = z.object({
  code: z.string().min(1),
});

export const createPromotionAction = enhanceAction(async (formData: FormData, user) => {
  const code = formData.get('code') as string | null;
  const hotel_id = formData.get('hotel_id') as string | null;
  const discount_percent = formData.get('discount_percent') as string | null;
  const valid_from = formData.get('valid_from') as string | null;
  const valid_to = formData.get('valid_to') as string | null;
  const is_active = formData.get('is_active');

  const parsed = CreatePromotionSchema.safeParse({ code, hotel_id, discount_percent, valid_from, valid_to, is_active });
  if (!parsed.success) throw new Error(parsed.error.errors[0]?.message ?? 'Invalid input');

  const supabase = getSupabaseServerAdminClient();
  const { error } = await supabase.from('promotion').insert({
    code: parsed.data.code,
    hotel_id: parsed.data.hotel_id ?? null,
    discount_percent: parsed.data.discount_percent ?? null,
    valid_from: parsed.data.valid_from ?? null,
    valid_to: parsed.data.valid_to ?? null,
    is_active: parsed.data.is_active ?? true,
  });
  if (error) throw error;
  revalidatePath('/home/promotions');
  return { success: true };
}, { auth: true });

export const updatePromotionAction = enhanceAction(async (formData: FormData, user) => {
  const code = formData.get('code') as string | null;
  const hotel_id = formData.get('hotel_id') as string | null;
  const discount_percent = formData.get('discount_percent') as string | null;
  const valid_from = formData.get('valid_from') as string | null;
  const valid_to = formData.get('valid_to') as string | null;
  const is_active = formData.get('is_active');

  const parsed = UpdatePromotionSchema.safeParse({ code, hotel_id, discount_percent, valid_from, valid_to, is_active });
  if (!parsed.success) throw new Error(parsed.error.errors[0]?.message ?? 'Invalid input');

  const supabase = getSupabaseServerAdminClient();
  const updatePayload: any = {
    hotel_id: parsed.data.hotel_id ?? null,
    discount_percent: parsed.data.discount_percent ?? null,
    valid_from: parsed.data.valid_from ?? null,
    valid_to: parsed.data.valid_to ?? null,
    is_active: parsed.data.is_active ?? true,
    updated_at: new Date().toISOString(),
  };
  const { error } = await supabase.from('promotion').update(updatePayload).eq('code', parsed.data.code);
  if (error) throw error;
  revalidatePath('/home/promotions');
  return { success: true };
}, { auth: true });

export const deletePromotionAction = enhanceAction(async (formData: FormData, user) => {
  const code = formData.get('code') as string | null;
  const parsed = DeletePromotionSchema.safeParse({ code });
  if (!parsed.success) throw new Error(parsed.error.errors[0]?.message ?? 'Invalid input');
  const supabase = getSupabaseServerAdminClient();
  const { error } = await supabase.from('promotion').delete().eq('code', parsed.data.code);
  if (error) throw error;
  revalidatePath('/home/promotions');
  return { success: true };
}, { auth: true });
