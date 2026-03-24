import { getSupabaseServerAdminClient } from '@kit/supabase/server-admin-client';

import { PageBody, PageHeader } from '@kit/ui/page';

import { FacilitiesClient } from './_components/facilities-client';

export default async function FacilitiesPage() {
    console.log("FacilitiesPage");
  const supabase = getSupabaseServerAdminClient();
  const { data: facilities, error } = await supabase
    .from('facility')
    .select('*')
    .order('name');

  if (error) {
    if (error.code === '42P01' || error.message?.includes('does not exist')) {
      return (
        <>
            <PageHeader
              title={'Facilities'}
              description={'Create and manage hotel facilities.'}
            />
          <PageBody>
              <div className="rounded-md border border-amber-200 bg-amber-50 p-4 text-amber-800 dark:border-amber-800 dark:bg-amber-950/30 dark:text-amber-200">
                <p className="font-medium">Facilities table not found</p>
                <p className="mt-1 text-sm">
                  Run the migration to create the <code className="rounded bg-amber-100 px-1 dark:bg-amber-900">facility</code> table
                  and <code className="rounded bg-amber-100 px-1 dark:bg-amber-900">facility_icons</code> storage bucket.
                </p>
                <p className="mt-2 text-sm">
                  From the project root: <code className="rounded bg-amber-100 px-1 dark:bg-amber-900">pnpm --filter web supabase db push</code> (hosted)
                  or <code className="rounded bg-amber-100 px-1 dark:bg-amber-900">pnpm --filter web supabase db reset</code> (local).
                </p>
              </div>
          </PageBody>
        </>
      );
    }
    // Render the full error for debugging in dev so it's visible in the browser
    return (
      <>
        <PageHeader
          title={'Facilities'}
          description={'Create and manage hotel facilities.'}
        />
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
      <PageHeader
        description={'Facilities'}
      />
      <PageBody>
        <FacilitiesClient facilities={facilities ?? []} />
      </PageBody>
    </>
  );
}
