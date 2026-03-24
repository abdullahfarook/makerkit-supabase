-- Booking and Payment tables: booking, booking_detail, payment

-- Booking table
create table if not exists public.booking (
  id uuid primary key default gen_random_uuid(),
  hotel_slug text references public.hotel(slug) on update cascade on delete restrict,
  room_id integer references public.hotel_rooms(id) on delete restrict,
  check_in_date date not null,
  check_out_date date not null,
  nights integer,
  number_of_rooms integer default 1,
  booking_status public.booking_status_enum default 'PENDING',
  booking_date date default current_date,
  promocode varchar(50),
  guest_full_name varchar(255),
  guest_email varchar(255),
  guest_phone varchar(50),
  special_request text,
  gross_total numeric,
  discount numeric,
  net_total numeric,
  account_id uuid references public.accounts(id) on delete set null
);

comment on table public.booking is 'Hotel booking records';

-- Booking Detail table
create sequence if not exists public.booking_detail_id_seq;
create table if not exists public.booking_detail (
  id bigint primary key default nextval('public.booking_detail_id_seq'),
  booking_id uuid references public.booking(id) on delete cascade,
  room_id integer references public.hotel_rooms(id) on delete restrict,
  no_of_rooms integer default 1,
  room_price numeric not null,
  gross_amount numeric not null,
  discount numeric default 0,
  net_amount numeric not null,
  includes_breakfast boolean default false
);

comment on table public.booking_detail is 'Detailed line items for each booking';
comment on column public.booking_detail.includes_breakfast is 'Whether this booking detail includes breakfast';

-- Payment table
create sequence if not exists public.payment_id_seq;
create table if not exists public.payment (
  id integer primary key default nextval('public.payment_id_seq'),
  booking_id uuid references public.booking(id) on delete restrict,
  amount numeric not null,
  payment_date date default current_date,
  payment_method public.payment_method_enum,
  payment_status public.payment_status_enum default 'PENDING'
);

comment on table public.payment is 'Financial payment tracking for bookings';

-- Permissions
grant select on public.booking to authenticated;
grant select on public.booking_detail to authenticated;
grant select on public.payment to authenticated;

grant all on public.booking to service_role;
grant all on public.booking_detail to service_role;
grant all on public.payment to service_role;
