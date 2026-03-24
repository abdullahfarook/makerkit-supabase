import { getSupabaseServerAdminClient } from '@kit/supabase/server-admin-client';

import { PageBody, PageHeader } from '@kit/ui/page';

import { ReviewsClient } from './_components/reviews-client';

export default async function ReviewsPage() {
  const supabase = getSupabaseServerAdminClient();
  const { data: reviews, error } = await supabase
    .from('review')
    .select('*, review_detail_rating(*)')
    .order('id', { ascending: false });

  if (error) {
    if (error.code === '42P01' || error.message?.includes('does not exist')) {
      return (
        <>
          <PageHeader title={'Reviews'} description={'View and manage reviews and ratings.'} />
          <PageBody>
            <div className="rounded-md border border-amber-200 bg-amber-50 p-4 text-amber-800 dark:border-amber-800 dark:bg-amber-950/30 dark:text-amber-200">
              <p className="font-medium">`review` or `review_detail_rating` tables not found</p>
              <p className="mt-1 text-sm">Run the migrations to add review tables.</p>
            </div>
          </PageBody>
        </>
      );
    }
    return (
      <>
        <PageHeader title={'Reviews'} description={'View and manage reviews and ratings.'} />
        <PageBody>
          <div className="rounded-md border border-rose-200 bg-rose-50 p-4 text-rose-800 dark:border-rose-800 dark:bg-rose-950/30 dark:text-rose-200">
            <p className="font-medium">Database error</p>
            <pre className="mt-2 text-sm whitespace-pre-wrap">{JSON.stringify({ code: error.code ?? null, message: error.message ?? null, details: error.details ?? null }, null, 2)}</pre>
          </div>
        </PageBody>
      </>
    );
  }

  return (
    <>
      <PageHeader description={'Reviews'} />
      <PageBody>
        <ReviewsClient reviews={reviews ?? []} />
      </PageBody>
    </>
  );
}
