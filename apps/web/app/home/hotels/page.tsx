import { getSupabaseServerAdminClient } from '@kit/supabase/server-admin-client';

import { PageBody, PageHeader } from '@kit/ui/page';

import { HotelsClient } from './_components/hotels-client';

export default async function HotelsPage() {
  const supabase = getSupabaseServerAdminClient();
  const [{ data: hotels, error }, { data: facilities }] = await Promise.all([
    supabase.from('hotel').select('*, hotel_facility(facility_id)').order('name'),
    supabase.from('facility').select('id,name,icon').order('name'),
  ]);

  if (error) {
    if (error.code === '42P01' || error.message?.includes('does not exist')) {
      return (
        <>
          <PageHeader title={'Hotels'} description={'Create and manage hotels.'} />
          <PageBody>
            <div className="rounded-md border border-amber-200 bg-amber-50 p-4 text-amber-800 dark:border-amber-800 dark:bg-amber-950/30 dark:text-amber-200">
              <p className="font-medium">Hotel table not found</p>
              <p className="mt-1 text-sm">
                Run the migration to create the <code className="rounded bg-amber-100 px-1 dark:bg-amber-900">hotel</code> table.
              </p>
            </div>
          </PageBody>
        </>
      );
    }

    return (
      <>
        <PageHeader title={'Hotels'} description={'Create and manage hotels.'} />
        <PageBody>
          <div className="rounded-md border border-rose-200 bg-rose-50 p-4 text-rose-800 dark:border-rose-800 dark:bg-rose-950/30 dark:text-rose-200">
            <p className="font-medium">Database error</p>
            <pre className="mt-2 text-sm whitespace-pre-wrap">
              {JSON.stringify(
                {
                  code: error.code ?? null,
                  message: error.message ?? null,
                  details: error.details ?? null,
                },
                null,
                2,
              )}
            </pre>
            <p className="mt-2 text-sm">Check server logs and the Supabase/Postgres schema.</p>
          </div>
        </PageBody>
      </>
    );
  }

  return (
    <>
      <PageHeader description={'Hotels'} />
      <PageBody>
        <HotelsClient hotels={hotels ?? []} facilities={facilities ?? []} />
      </PageBody>
    </>
  );
}
