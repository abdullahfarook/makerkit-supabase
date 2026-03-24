import { getSupabaseServerAdminClient } from '@kit/supabase/server-admin-client';

import { PageBody, PageHeader } from '@kit/ui/page';

import { PromotionsClient } from './_components/promotions-client';

export default async function PromotionsPage() {
  const supabase = getSupabaseServerAdminClient();
  const { data: promotions, error } = await supabase.from('promotion').select('*').order('code');

  if (error) {
    if (error.code === '42P01' || error.message?.includes('does not exist')) {
      return (
        <>
          <PageHeader title={'Promotions'} description={'Create and manage promotions.'} />
          <PageBody>
            <div className="rounded-md border border-amber-200 bg-amber-50 p-4 text-amber-800 dark:border-amber-800 dark:bg-amber-950/30 dark:text-amber-200">
              <p className="font-medium">`promotion` table not found</p>
              <p className="mt-1 text-sm">Run the migrations to create the promotion table.</p>
            </div>
          </PageBody>
        </>
      );
    }
    return (
      <>
        <PageHeader title={'Promotions'} description={'Create and manage promotions.'} />
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
      <PageHeader description={'Promotions'} />
      <PageBody>
        <PromotionsClient promotions={promotions ?? []} />
      </PageBody>
    </>
  );
}
