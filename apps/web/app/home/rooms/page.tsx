import { getSupabaseServerAdminClient } from '@kit/supabase/server-admin-client';

import { PageBody, PageHeader } from '@kit/ui/page';

import { RoomsClient } from './_components/rooms-client';

export default async function RoomsPage() {
  const supabase = getSupabaseServerAdminClient();
  const { data: rooms, error } = await supabase.from('hotel_rooms').select('*').order('hotel_slug');

  if (error) {
    if (error.code === '42P01' || error.message?.includes('does not exist')) {
      return (
        <>
          <PageHeader title={'Rooms'} description={'Manage hotel rooms.'} />
          <PageBody>
            <div className="rounded-md border border-amber-200 bg-amber-50 p-4 text-amber-800 dark:border-amber-800 dark:bg-amber-950/30 dark:text-amber-200">
              <p className="font-medium">`hotel_rooms` table not found</p>
              <p className="mt-1 text-sm">Run the migrations to create the hotel rooms tables.</p>
            </div>
          </PageBody>
        </>
      );
    }
    return (
      <>
        <PageHeader title={'Rooms'} description={'Manage hotel rooms.'} />
        <PageBody>
          <div className="rounded-md border border-rose-200 bg-rose-50 p-4 text-rose-800 dark:border-rose-800 dark:bg-rose-950/30 dark:text-rose-200">
            <p className="font-medium">Database error</p>
            <pre className="mt-2 text-sm whitespace-pre-wrap">{JSON.stringify({ code: error.code ?? null, message: error.message ?? null, details: error.details ?? null }, null, 2)}</pre>
            <p className="mt-2 text-sm">Check server logs and the Supabase/Postgres schema.</p>
          </div>
        </PageBody>
      </>
    );
  }

  return (
    <>
      <PageHeader description={'Rooms'} />
      <PageBody>
        <RoomsClient rooms={rooms ?? []} />
      </PageBody>
    </>
  );
}
