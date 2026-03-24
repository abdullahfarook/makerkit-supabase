-- Hotel tables: hotel, hotel_facility, hotel_images

-- Hotel table
create table if not exists public.hotel (
  id uuid primary key default gen_random_uuid(),
  name varchar(255) not null,
  slug text unique generated always as (regexp_replace(lower(name), '\s+', '-', 'g')) stored,
  address varchar(255),
  location_slug text references public.location(slug) on update cascade,
  distance_from_haram numeric,
  latitude double precision,
  longitude double precision,
  coordinates extensions.geography(point, 4326) generated always as (extensions.st_setsrid(extensions.st_makepoint(longitude, latitude), 4326)) stored,
  class integer check (class >= 1 and class <= 5),
  liscense_no varchar(255) unique,
  description text,
  terms text,
  serve_breakfast boolean default false,
  payment_policies text,
  land_line varchar(50),
  phone_number varchar(50),
  email varchar(255),
  is_best_hotel boolean default false,
  is_active boolean default true
);

comment on table public.hotel is 'Hotel details and positioning';

-- Hotel-Facility Join Table
create table if not exists public.hotel_facility (
  hotel_id uuid references public.hotel(id) on delete cascade,
  facility_id integer references public.facility(id) on delete cascade,
  primary key (hotel_id, facility_id)
);

comment on table public.hotel_facility is 'Many-to-many relationship between hotels and facilities';

-- Hotel Images table
create sequence if not exists public.hotel_images_id_seq;
create table if not exists public.hotel_images (
  id integer primary key default nextval('public.hotel_images_id_seq'),
  hotel_slug text references public.hotel(slug) on update cascade on delete cascade,
  url varchar(255) not null,
  description varchar(255),
  sort_order integer default -1
);

comment on table public.hotel_images is 'Images associated with hotels';

-- Permissions
grant select on public.hotel to authenticated, anon;
grant select on public.hotel_facility to authenticated, anon;
grant select on public.hotel_images to authenticated, anon;

grant all on public.hotel to service_role;
grant all on public.hotel_facility to service_role;
grant all on public.hotel_images to service_role;
