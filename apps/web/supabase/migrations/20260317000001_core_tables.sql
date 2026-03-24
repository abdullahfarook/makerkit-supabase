-- Core tables: location, facility, room_category

-- Location table
create table if not exists public.location (
  id uuid primary key default gen_random_uuid(),
  name varchar(255) not null,
  slug text unique generated always as (regexp_replace(lower(name), '\s+', '-', 'g')) stored,
  thumbnail varchar(255)
);

comment on table public.location is 'Geographic locations for hotels';

-- Facility table (singular)
create sequence if not exists public.facility_id_seq;
create table if not exists public.facility (
  id integer primary key default nextval('public.facility_id_seq'),
  name varchar(255) not null unique,
  slug text unique generated always as (regexp_replace(lower(name), '\s+', '-', 'g')) stored,
  icon varchar(255)
);

comment on table public.facility is 'Hotel facilities (e.g. WiFi, Pool)';

-- Room Category table
create sequence if not exists public.room_category_id_seq;
create table if not exists public.room_category (
  id integer primary key default nextval('public.room_category_id_seq'),
  name varchar(255) not null,
  slug text unique generated always as (regexp_replace(lower(name), '\s+', '-', 'g')) stored
);

comment on table public.room_category is 'Categories for hotel rooms (e.g. Deluxe, Suite)';

-- Permissions
grant select on public.location to authenticated, anon;
grant select on public.facility to authenticated, anon;
grant select on public.room_category to authenticated, anon;

grant all on public.location to service_role;
grant all on public.facility to service_role;
grant all on public.room_category to service_role;
