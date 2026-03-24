-- Facilities table for hotel attributes
create table if not exists public.facilities (
  id uuid primary key default extensions.uuid_generate_v4(),
  name text not null,
  slug text not null unique,
  icon text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

comment on table public.facilities is 'Hotel facilities (e.g. pool, gym); icon stores URL of uploaded image in Storage';

alter table public.facilities enable row level security;

-- Authenticated users can read all facilities
create policy facilities_select on public.facilities
  for select to authenticated using (true);

-- Authenticated users can insert
create policy facilities_insert on public.facilities
  for insert to authenticated with check (true);

-- Authenticated users can update
create policy facilities_update on public.facilities
  for update to authenticated using (true) with check (true);

-- Authenticated users can delete
create policy facilities_delete on public.facilities
  for delete to authenticated using (true);

grant select, insert, update, delete on public.facilities to authenticated;
grant select, insert, update, delete on public.facilities to service_role;

-- Storage bucket for facility icon images
insert into storage.buckets (id, name, public)
values ('facility_icons', 'facility_icons', true)
on conflict (id) do nothing;

-- RLS: authenticated can read and upload to facility_icons
create policy facility_icons_read on storage.objects
  for select to authenticated using (bucket_id = 'facility_icons');

create policy facility_icons_insert on storage.objects
  for insert to authenticated with check (bucket_id = 'facility_icons');

create policy facility_icons_update on storage.objects
  for update to authenticated using (bucket_id = 'facility_icons');

create policy facility_icons_delete on storage.objects
  for delete to authenticated using (bucket_id = 'facility_icons');
