'use server';

import { revalidatePath } from 'next/cache';
import { enhanceAction } from '@kit/next/actions';
import { getSupabaseServerAdminClient } from '@kit/supabase/server-admin-client';
import { z } from 'zod';

const UpdateReviewSchema = z.object({
  id: z.preprocess((v) => Number(v), z.number()),
  comment: z.string().optional(),
});

const DeleteReviewSchema = z.object({ id: z.preprocess((v) => Number(v), z.number()) });

const UpdateRatingSchema = z.object({
  review_id: z.preprocess((v) => Number(v), z.number()),
  rating_id: z.preprocess((v) => Number(v), z.number()).optional(),
  rating: z.preprocess((v) => Number(v), z.number()),
});

export const updateReviewAction = enhanceAction(async (formData: FormData, user) => {
  const id = formData.get('id') as string | null;
  const comment = formData.get('comment') as string | null;
  const parsed = UpdateReviewSchema.safeParse({ id, comment });
  if (!parsed.success) throw new Error(parsed.error.errors[0]?.message ?? 'Invalid input');
  const supabase = getSupabaseServerAdminClient();
  const { error } = await supabase.from('review').update({ comment: parsed.data.comment ?? null, updated_at: new Date().toISOString() }).eq('id', parsed.data.id);
  if (error) throw error;
  revalidatePath('/home/reviews');
  return { success: true };
}, { auth: true });

export const deleteReviewAction = enhanceAction(async (formData: FormData, user) => {
  const id = formData.get('id') as string | null;
  const parsed = DeleteReviewSchema.safeParse({ id });
  if (!parsed.success) throw new Error(parsed.error.errors[0]?.message ?? 'Invalid input');
  const supabase = getSupabaseServerAdminClient();
  // delete ratings first
  await supabase.from('review_detail_rating').delete().eq('review_id', parsed.data.id);
  const { error } = await supabase.from('review').delete().eq('id', parsed.data.id);
  if (error) throw error;
  revalidatePath('/home/reviews');
  return { success: true };
}, { auth: true });

export const updateRatingAction = enhanceAction(async (formData: FormData, user) => {
  const review_id = formData.get('review_id') as string | null;
  const rating_id = formData.get('rating_id') as string | null;
  const rating = formData.get('rating') as string | null;
  const parsed = UpdateRatingSchema.safeParse({ review_id, rating_id, rating });
  if (!parsed.success) throw new Error(parsed.error.errors[0]?.message ?? 'Invalid input');
  const supabase = getSupabaseServerAdminClient();
  if (parsed.data.rating_id) {
    const { error } = await supabase.from('review_detail_rating').update({ rating: parsed.data.rating }).eq('id', parsed.data.rating_id);
    if (error) throw error;
  } else {
    const { error } = await supabase.from('review_detail_rating').insert({ review_id: parsed.data.review_id, rating: parsed.data.rating });
    if (error) throw error;
  }
  revalidatePath('/home/reviews');
  return { success: true };
}, { auth: true });
