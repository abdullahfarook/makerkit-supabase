-- Room tables: hotel_rooms, room_images

-- Hotel Rooms table
create sequence if not exists public.hotel_rooms_id_seq;
create table if not exists public.hotel_rooms (
  id integer primary key default nextval('public.hotel_rooms_id_seq'),
  hotel_slug text references public.hotel(slug) on update cascade on delete cascade,
  room_category_id integer references public.room_category(id) on delete restrict,
  room_number varchar(50) not null,
  name varchar(255),
  description text,
  beds integer default 1,
  price_per_night numeric not null,
  status public.room_status_enum default 'AVAILABLE',
  city_view boolean default false,
  price_per_night_with_breakfast numeric
);

comment on table public.hotel_rooms is 'Individual rooms available in hotels';

-- Room Images table
create sequence if not exists public.room_images_id_seq;
create table if not exists public.room_images (
  id integer primary key default nextval('public.room_images_id_seq'),
  room_id integer references public.hotel_rooms(id) on delete cascade,
  url varchar(255) not null
);

comment on table public.room_images is 'Images associated with specific hotel rooms';

-- Permissions
grant select on public.hotel_rooms to authenticated, anon;
grant select on public.room_images to authenticated, anon;

grant all on public.hotel_rooms to service_role;
grant all on public.room_images to service_role;
