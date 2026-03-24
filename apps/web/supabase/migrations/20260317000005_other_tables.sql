-- Other tables: promotion, blog_post, search_log, review, review_detail_rating

-- Promotion table
create table if not exists public.promotion (
  code varchar(50),
  hotel_id uuid references public.hotel(id) on delete cascade,
  description text,
  discount_percent numeric check (discount_percent >= 0 and discount_percent <= 100),
  valid_from date,
  valid_to date,
  is_active boolean default true,
  primary key (code, hotel_id)
);

comment on table public.promotion is 'Promotional codes for specific hotels';

-- Blog Post table
create sequence if not exists public.blog_post_id_seq;
create table if not exists public.blog_post (
  id integer primary key default nextval('public.blog_post_id_seq'),
  title varchar(255) not null,
  short_description text,
  long_description text,
  thumbnail varchar(255),
  created_at timestamp default current_timestamp,
  created_by varchar(255),
  tags text[]
);

comment on table public.blog_post is 'Blog posts and news articles';

-- Search Log table
create sequence if not exists public.search_log_id_seq;
create table if not exists public.search_log (
  id integer primary key default nextval('public.search_log_id_seq'),
  location_id uuid references public.location(id) on delete set null,
  check_in_date date,
  check_out_date date,
  promocode varchar(50),
  search_datetime timestamp default current_timestamp,
  user_id uuid references public.accounts(id) on delete set null
);

comment on table public.search_log is 'Logging of user searches for analytics';

-- Review table
create sequence if not exists public.review_id_seq;
create table if not exists public.review (
  id integer primary key default nextval('public.review_id_seq'),
  booking_id uuid references public.booking(id) on delete set null,
  hotel_id uuid references public.hotel(id) on delete cascade,
  reviewer_name varchar(255) not null,
  reviewer_email varchar(255),
  overall_rating integer check (overall_rating >= 1 and overall_rating <= 5),
  feedback text default ''
);

comment on table public.review is 'User reviews and feedback for hotels';

-- Review Detail Rating table
create sequence if not exists public.review_detail_rating_id_seq;
create table if not exists public.review_detail_rating (
  id integer primary key default nextval('public.review_detail_rating_id_seq'),
  review_id integer references public.review(id) on delete cascade,
  service public.service_rating_category not null,
  rating integer check (rating >= 1 and rating <= 5)
);

comment on table public.review_detail_rating is 'Categorized ratings within a review (e.g. Cleanliness, Staff)';

-- Permissions
grant select on public.promotion to authenticated, anon;
grant select on public.blog_post to authenticated, anon;
grant select on public.review to authenticated, anon;
grant select on public.review_detail_rating to authenticated, anon;

grant all on public.promotion to service_role;
grant all on public.blog_post to service_role;
grant all on public.search_log to service_role;
grant all on public.review to service_role;
grant all on public.review_detail_rating to service_role;
