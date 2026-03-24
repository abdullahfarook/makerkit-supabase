-- Seed data from remote Supabase (public schema)
-- Run with: supabase db reset (applies migrations then runs seed) or supabase seed

-- =============================================================================
-- public.accounts
-- =============================================================================
-- Ensure corresponding auth.users exist so RLS triggers can run safely.
-- Uses idempotent INSERT ... SELECT ... WHERE NOT EXISTS to avoid conflicts.
-- Disable user triggers so creating `auth.users` here doesn't invoke
-- the `on_auth_user_created` trigger that inserts incomplete `public.accounts` rows.
SET session_replication_role = replica;

-- INSERT INTO auth.users (id, aud, role, email, email_confirmed_at, raw_user_meta_data, created_at)
-- SELECT gen_random_uuid(), 'authenticated', 'authenticated', 'arfanali.cloud@gmail.com', CURRENT_TIMESTAMP, '{"name":"Arfan Ali","avatar_url":"https://lh3.googleusercontent.com/a/ACg8ocLwch9_mjd83ug5-c8Yeiz9Dn4LMDauMPCUW70Vk_ysat2hYQ=s96-c"}'::jsonb, CURRENT_TIMESTAMP
-- WHERE NOT EXISTS (SELECT 1 FROM auth.users WHERE email = 'arfanali.cloud@gmail.com');

-- INSERT INTO auth.users (id, aud, role, email, email_confirmed_at, raw_user_meta_data, created_at)
-- SELECT gen_random_uuid(), 'authenticated', 'authenticated', 'developersystem31@gmail.com', CURRENT_TIMESTAMP, '{"name":"Developer System","avatar_url":"https://lh3.googleusercontent.com/a/ACg8ocIzyp81Rtl2gvYOzbJXESxOLip8xsTfZyRbNRoUD1HzrJOFYQ=s96-c"}'::jsonb, CURRENT_TIMESTAMP
-- WHERE NOT EXISTS (SELECT 1 FROM auth.users WHERE email = 'developersystem31@gmail.com');

-- INSERT INTO auth.users (id, aud, role, email, email_confirmed_at, raw_user_meta_data, created_at)
-- SELECT gen_random_uuid(), 'authenticated', 'authenticated', 'faizanhamza0097@gmail.com', CURRENT_TIMESTAMP, '{"name":"Faizan Hamza","avatar_url":"https://lh3.googleusercontent.com/a/ACg8ocI79n-NhkkHQ31osytEcC2JshdkIneu77ZmhGz-q7rrqZttnUI=s96-c"}'::jsonb, CURRENT_TIMESTAMP
-- WHERE NOT EXISTS (SELECT 1 FROM auth.users WHERE email = 'faizanhamza0097@gmail.com');

-- INSERT INTO auth.users (id, aud, role, email, email_confirmed_at, raw_user_meta_data, created_at)
-- SELECT gen_random_uuid(), 'authenticated', 'authenticated', 'hassan@test.com', CURRENT_TIMESTAMP, '{"name":"hassan"}'::jsonb, CURRENT_TIMESTAMP
-- WHERE NOT EXISTS (SELECT 1 FROM auth.users WHERE email = 'hassan@test.com');

-- INSERT INTO auth.users (id, aud, role, email, email_confirmed_at, raw_user_meta_data, created_at)
-- SELECT gen_random_uuid(), 'authenticated', 'authenticated', 'jifive3997@alexida.com', CURRENT_TIMESTAMP, '{"name":"jifive3997"}'::jsonb, CURRENT_TIMESTAMP
-- WHERE NOT EXISTS (SELECT 1 FROM auth.users WHERE email = 'jifive3997@alexida.com');

-- INSERT INTO auth.users (id, aud, role, email, email_confirmed_at, raw_user_meta_data, created_at)
-- SELECT gen_random_uuid(), 'authenticated', 'authenticated', 'simiben662@httpsu.com', CURRENT_TIMESTAMP, '{"name":"simiben662"}'::jsonb, CURRENT_TIMESTAMP
-- WHERE NOT EXISTS (SELECT 1 FROM auth.users WHERE email = 'simiben662@httpsu.com');

-- INSERT INTO auth.users (id, aud, role, email, email_confirmed_at, raw_user_meta_data, created_at)
-- SELECT gen_random_uuid(), 'authenticated', 'authenticated', 'testuser@tradersempire.com', CURRENT_TIMESTAMP, '{"name":"testuser"}'::jsonb, CURRENT_TIMESTAMP
-- WHERE NOT EXISTS (SELECT 1 FROM auth.users WHERE email = 'testuser@tradersempire.com');

-- Re-enable triggers
SET session_replication_role = DEFAULT;

-- INSERT INTO public.accounts (
--   name, first_name, last_name, email, phone, password_hash,
--   registration_date, last_login, picture_url, public_data, created_at, updated_at, created_by, updated_by
-- ) VALUES
--   ('Arfan Ali', 'Arfan', 'Ali', 'arfanali.cloud@gmail.com', NULL, '', '2025-12-04', NULL, 'https://lh3.googleusercontent.com/a/ACg8ocLwch9_mjd83ug5-c8Yeiz9Dn4LMDauMPCUW70Vk_ysat2hYQ=s96-c', '{}', '2025-12-04 11:58:57.259117+00', '2025-12-04 11:58:57.259117+00', NULL, NULL),
--   ('Developer System', 'Developer', 'System', 'developersystem31@gmail.com', NULL, '', '2025-12-03', NULL, 'https://lh3.googleusercontent.com/a/ACg8ocIzyp81Rtl2gvYOzbJXESxOLip8xsTfZyRbNRoUD1HzrJOFYQ=s96-c', '{}', '2025-12-03 08:25:06.682372+00', '2025-12-03 08:25:06.682372+00', NULL, NULL),
--   ('Faizan Hamza', 'Faizan', 'Hamza', 'faizanhamza0097@gmail.com', NULL, '', '2025-12-02', NULL, 'https://lh3.googleusercontent.com/a/ACg8ocI79n-NhkkHQ31osytEcC2JshdkIneu77ZmhGz-q7rrqZttnUI=s96-c', '{}', '2025-12-02 11:02:55.507015+00', '2025-12-02 11:02:55.507015+00', NULL, NULL),
--   ('hassan', 'hassan', '', 'hassan@test.com', NULL, '', '2026-02-16', NULL, '', '{}', '2026-02-16 10:59:22.837103+00', '2026-02-16 10:59:22.837103+00', NULL, NULL),
--   ('jifive3997', 'jifive3997', '', 'jifive3997@alexida.com', NULL, '', '2025-12-08', NULL, '', '{}', '2025-12-08 13:18:34.746761+00', '2025-12-08 13:18:34.746761+00', NULL, NULL),
--   ('simiben662', 'simiben662', '', 'simiben662@httpsu.com', NULL, '', '2025-12-06', NULL, '', '{}', '2025-12-06 09:09:20.727765+00', '2025-12-06 09:09:20.727765+00', NULL, NULL),
--   ('testuser', 'testuser', '', 'testuser@tradersempire.com', NULL, '', '2025-12-06', NULL, '', '{}', '2025-12-06 09:08:40.30768+00', '2025-12-06 09:08:40.30768+00', NULL, NULL)
-- ON CONFLICT (email) DO NOTHING;

-- =============================================================================
-- public.location
-- =============================================================================
INSERT INTO public.location (name, thumbnail) VALUES
  ('MECCA', 'https://egbkyzeqrzplsmlhuwdn.supabase.co/storage/v1/object/public/locations//mecca.webp'),
  ('MEDINA', 'https://egbkyzeqrzplsmlhuwdn.supabase.co/storage/v1/object/public/locations//medina.webp'),
  ('JEDDAH', 'https://egbkyzeqrzplsmlhuwdn.supabase.co/storage/v1/object/public/locations//jeddah.webp'),
  ('RIYADH', 'https://egbkyzeqrzplsmlhuwdn.supabase.co/storage/v1/object/public/locations//riyadh.webp')
ON CONFLICT DO NOTHING;

-- =============================================================================
-- public.facility (singular)
-- =============================================================================
INSERT INTO public.facility (name, icon) VALUES
  ('Accessibility', 'accessibility'),
  ('Air Conditioner', 'ac'),
  ('Cards Accepted', 'credit_card'),
  ('Club', 'bar'),
  ('Coffee Shop', 'cafe'),
  ('Elevator', 'elevator'),
  ('Fitness Center', 'fitness'),
  ('Restaurant', 'restaurant'),
  ('Shuttle Bus Service', 'airport_shuttle'),
  ('Swimming Pool', 'pool'),
  ('Wi-Fi Internet', 'wifi')
ON CONFLICT DO NOTHING;

-- =============================================================================
-- public.room_category
-- =============================================================================
INSERT INTO public.room_category (name) VALUES
  ('Double'),
  ('One bedroom suite, living, kitchen and bathroom'),
  ('Triple'),
  ('Deluxe Twin'),
  ('Quad'),
  ('(King Bed) Double'),
  ('Elite Studio King Bed'),
  ('One Bedroom Apartment'),
  ('Apartment (room and bathroom)'),
  ('Deluxe King'),
  ('Quintuple'),
  ('One Bedroom suite'),
  ('Executive Suite'),
  ('Family Room'),
  ('Superior Room'),
  ('Presidential Suite')
ON CONFLICT DO NOTHING;

-- =============================================================================
-- public.hotel
-- =============================================================================
INSERT INTO public.hotel (name, address, location_slug, class, description, latitude, longitude) VALUES
  ('Al Marwa Rayhaan by Rotana', 'King Abdul Aziz Endowment, Makkah 24231, Saudi Arabia', 'mecca', 4, 'Comfortable stay with excellent service', NULL, NULL),
  ('Holiday In al Aziziah', 'Al Aziziyah District, Makkah 24243, Saudi Arabia', 'mecca', 4, 'Premium stay with pool & gym', NULL, NULL),
  ('NEW HOTEL', 'ADDRESS', 'medina', NULL, 'DES', NULL, NULL),
  ('Shurfat Al Talayie Hotel', 'Ajyad St, Ar Rawabi, Makkah 24234, Saudi Arabia', 'medina', 3, 'Shurfat Al Talayie Hotel is located in Makkah, 1.4 km from Masjid al-Haram. The hotel provides complimentary Wi-Fi and offers free transportation to and from the Haram. All rooms are designed for groups, with quadruple occupancy standard across the property.', 21.4078056, 39.8185),
  ('Swissôtel Al Maqam Makkah', 'Ibrahim Al Khalil Rd, Makkah 21955, Saudi Arabia', 'mecca', 5, 'Luxury hotel with direct Haram view', NULL, NULL),
  ('voco Makkah, an IHG Hotel', 'Ibrahim Al Khalil, Misfalah, Makkah 24233, Saudi Arabia', 'mecca', 4, 'Modern hotel with IHG quality', NULL, NULL)
ON CONFLICT DO NOTHING;

-- =============================================================================
-- public.hotel_images
-- =============================================================================
INSERT INTO public.hotel_images (hotel_slug, url, description, sort_order) VALUES
  ('al-marwa-rayhaan-by-rotana', 'https://egbkyzeqrzplsmlhuwdn.supabase.co/storage/v1/object/public/hotel-images/rotana-1.jpg', 'Exterior view', 1),
  ('al-marwa-rayhaan-by-rotana', 'https://egbkyzeqrzplsmlhuwdn.supabase.co/storage/v1/object/public/hotel-images/rotana-1.jpg', 'Exterior view', 1),
  ('al-marwa-rayhaan-by-rotana', 'https://egbkyzeqrzplsmlhuwdn.supabase.co/storage/v1/object/public/hotel-images/rotana-1.jpg', 'Exterior view', 1),
  ('al-marwa-rayhaan-by-rotana', 'https://egbkyzeqrzplsmlhuwdn.supabase.co/storage/v1/object/public/hotel-images/rotana-2.jpg', 'Reception', 2),
  ('al-marwa-rayhaan-by-rotana', 'https://egbkyzeqrzplsmlhuwdn.supabase.co/storage/v1/object/public/hotel-images/rotana-2.jpg', 'Reception', 2),
  ('al-marwa-rayhaan-by-rotana', 'https://egbkyzeqrzplsmlhuwdn.supabase.co/storage/v1/object/public/hotel-images/rotana-2.jpg', 'Reception', 2),
  ('al-marwa-rayhaan-by-rotana', 'https://egbkyzeqrzplsmlhuwdn.supabase.co/storage/v1/object/public/hotel-images/rotana-3.jpg', 'Guest room', 3),
  ('al-marwa-rayhaan-by-rotana', 'https://egbkyzeqrzplsmlhuwdn.supabase.co/storage/v1/object/public/hotel-images/rotana-3.jpg', 'Guest room', 3),
  ('al-marwa-rayhaan-by-rotana', 'https://egbkyzeqrzplsmlhuwdn.supabase.co/storage/v1/object/public/hotel-images/rotana-3.jpg', 'Guest room', 3),
  ('al-marwa-rayhaan-by-rotana', 'https://egbkyzeqrzplsmlhuwdn.supabase.co/storage/v1/object/public/hotel-images/rotana-4.jpg', 'Dining area', 4),
  ('al-marwa-rayhaan-by-rotana', 'https://egbkyzeqrzplsmlhuwdn.supabase.co/storage/v1/object/public/hotel-images/rotana-4.jpg', 'Dining area', 4),
  ('al-marwa-rayhaan-by-rotana', 'https://egbkyzeqrzplsmlhuwdn.supabase.co/storage/v1/object/public/hotel-images/rotana-4.jpg', 'Dining area', 4),
  ('holiday-in-al-aziziah', 'https://egbkyzeqrzplsmlhuwdn.supabase.co/storage/v1/object/public/hotel-images/holiday-1.jpg', 'Building', 1),
  ('holiday-in-al-aziziah', 'https://egbkyzeqrzplsmlhuwdn.supabase.co/storage/v1/object/public/hotel-images/holiday-1.jpg', 'Building', 1),
  ('holiday-in-al-aziziah', 'https://egbkyzeqrzplsmlhuwdn.supabase.co/storage/v1/object/public/hotel-images/holiday-1.jpg', 'Building', 1),
  ('holiday-in-al-aziziah', 'https://egbkyzeqrzplsmlhuwdn.supabase.co/storage/v1/object/public/hotel-images/holiday-2.jpg', 'Pool area', 2),
  ('holiday-in-al-aziziah', 'https://egbkyzeqrzplsmlhuwdn.supabase.co/storage/v1/object/public/hotel-images/holiday-2.jpg', 'Pool area', 2),
  ('holiday-in-al-aziziah', 'https://egbkyzeqrzplsmlhuwdn.supabase.co/storage/v1/object/public/hotel-images/holiday-2.jpg', 'Pool area', 2),
  ('holiday-in-al-aziziah', 'https://egbkyzeqrzplsmlhuwdn.supabase.co/storage/v1/object/public/hotel-images/holiday-3.jpg', 'Gym', 3),
  ('holiday-in-al-aziziah', 'https://egbkyzeqrzplsmlhuwdn.supabase.co/storage/v1/object/public/hotel-images/holiday-3.jpg', 'Gym', 3),
  ('holiday-in-al-aziziah', 'https://egbkyzeqrzplsmlhuwdn.supabase.co/storage/v1/object/public/hotel-images/holiday-3.jpg', 'Gym', 3),
  ('holiday-in-al-aziziah', 'https://egbkyzeqrzplsmlhuwdn.supabase.co/storage/v1/object/public/hotel-images/holiday-4.jpg', 'Breakfast area', 4),
  ('holiday-in-al-aziziah', 'https://egbkyzeqrzplsmlhuwdn.supabase.co/storage/v1/object/public/hotel-images/holiday-4.jpg', 'Breakfast area', 4),
  ('holiday-in-al-aziziah', 'https://egbkyzeqrzplsmlhuwdn.supabase.co/storage/v1/object/public/hotel-images/holiday-4.jpg', 'Breakfast area', 4),
  ('shurfat-al-talayie-hotel', 'https://egbkyzeqrzplsmlhuwdn.supabase.co/storage/v1/object/public/hotel-images/voco-1.jpg', 'Hotel exterior', 1),
  ('shurfat-al-talayie-hotel', 'https://egbkyzeqrzplsmlhuwdn.supabase.co/storage/v1/object/public/hotel-images/voco-2.jpg', 'Interior', 2),
  ('shurfat-al-talayie-hotel', 'https://egbkyzeqrzplsmlhuwdn.supabase.co/storage/v1/object/public/hotel-images/voco-3.jpg', 'Room', 3),
  ('shurfat-al-talayie-hotel', 'https://egbkyzeqrzplsmlhuwdn.supabase.co/storage/v1/object/public/hotel-images/voco-4.jpg', 'Restaurant', 4),
  ('swissôtel-al-maqam-makkah', 'https://egbkyzeqrzplsmlhuwdn.supabase.co/storage/v1/object/public/hotel-images/swissotel-1.jpg', 'Main facade', 1),
  ('swissôtel-al-maqam-makkah', 'https://egbkyzeqrzplsmlhuwdn.supabase.co/storage/v1/object/public/hotel-images/swissotel-1.jpg', 'Main facade', 1),
  ('swissôtel-al-maqam-makkah', 'https://egbkyzeqrzplsmlhuwdn.supabase.co/storage/v1/object/public/hotel-images/swissotel-1.jpg', 'Main facade', 1),
  ('swissôtel-al-maqam-makkah', 'https://egbkyzeqrzplsmlhuwdn.supabase.co/storage/v1/object/public/hotel-images/swissotel-2.jpg', 'Lobby area', 2),
  ('swissôtel-al-maqam-makkah', 'https://egbkyzeqrzplsmlhuwdn.supabase.co/storage/v1/object/public/hotel-images/swissotel-2.jpg', 'Lobby area', 2),
  ('swissôtel-al-maqam-makkah', 'https://egbkyzeqrzplsmlhuwdn.supabase.co/storage/v1/object/public/hotel-images/swissotel-2.jpg', 'Lobby area', 2),
  ('swissôtel-al-maqam-makkah', 'https://egbkyzeqrzplsmlhuwdn.supabase.co/storage/v1/object/public/hotel-images/swissotel-3.jpg', 'Room view', 3),
  ('swissôtel-al-maqam-makkah', 'https://egbkyzeqrzplsmlhuwdn.supabase.co/storage/v1/object/public/hotel-images/swissotel-3.jpg', 'Room view', 3),
  ('swissôtel-al-maqam-makkah', 'https://egbkyzeqrzplsmlhuwdn.supabase.co/storage/v1/object/public/hotel-images/swissotel-3.jpg', 'Room view', 3),
  ('swissôtel-al-maqam-makkah', 'https://egbkyzeqrzplsmlhuwdn.supabase.co/storage/v1/object/public/hotel-images/swissotel-4.jpg', 'Haram view', 4),
  ('swissôtel-al-maqam-makkah', 'https://egbkyzeqrzplsmlhuwdn.supabase.co/storage/v1/object/public/hotel-images/swissotel-4.jpg', 'Haram view', 4),
  ('swissôtel-al-maqam-makkah', 'https://egbkyzeqrzplsmlhuwdn.supabase.co/storage/v1/object/public/hotel-images/swissotel-4.jpg', 'Haram view', 4),
  ('voco-makkah,-an-ihg-hotel', 'https://egbkyzeqrzplsmlhuwdn.supabase.co/storage/v1/object/public/hotel-images/voco-1.jpg', 'Hotel exterior', 1),
  ('voco-makkah,-an-ihg-hotel', 'https://egbkyzeqrzplsmlhuwdn.supabase.co/storage/v1/object/public/hotel-images/voco-1.jpg', 'Hotel exterior', 1),
  ('voco-makkah,-an-ihg-hotel', 'https://egbkyzeqrzplsmlhuwdn.supabase.co/storage/v1/object/public/hotel-images/voco-1.jpg', 'Hotel exterior', 1),
  ('voco-makkah,-an-ihg-hotel', 'https://egbkyzeqrzplsmlhuwdn.supabase.co/storage/v1/object/public/hotel-images/voco-2.jpg', 'Interior', 2),
  ('voco-makkah,-an-ihg-hotel', 'https://egbkyzeqrzplsmlhuwdn.supabase.co/storage/v1/object/public/hotel-images/voco-2.jpg', 'Interior', 2),
  ('voco-makkah,-an-ihg-hotel', 'https://egbkyzeqrzplsmlhuwdn.supabase.co/storage/v1/object/public/hotel-images/voco-2.jpg', 'Interior', 2),
  ('voco-makkah,-an-ihg-hotel', 'https://egbkyzeqrzplsmlhuwdn.supabase.co/storage/v1/object/public/hotel-images/voco-3.jpg', 'Room', 3),
  ('voco-makkah,-an-ihg-hotel', 'https://egbkyzeqrzplsmlhuwdn.supabase.co/storage/v1/object/public/hotel-images/voco-3.jpg', 'Room', 3),
  ('voco-makkah,-an-ihg-hotel', 'https://egbkyzeqrzplsmlhuwdn.supabase.co/storage/v1/object/public/hotel-images/voco-3.jpg', 'Room', 3),
  ('voco-makkah,-an-ihg-hotel', 'https://egbkyzeqrzplsmlhuwdn.supabase.co/storage/v1/object/public/hotel-images/voco-4.jpg', 'Restaurant', 4),
  ('voco-makkah,-an-ihg-hotel', 'https://egbkyzeqrzplsmlhuwdn.supabase.co/storage/v1/object/public/hotel-images/voco-4.jpg', 'Restaurant', 4),
  ('voco-makkah,-an-ihg-hotel', 'https://egbkyzeqrzplsmlhuwdn.supabase.co/storage/v1/object/public/hotel-images/voco-4.jpg', 'Restaurant', 4)
ON CONFLICT DO NOTHING;

-- =============================================================================
-- public.hotel_facility
-- =============================================================================
-- Insert hotel <-> facility mappings by slug so IDs are resolved at insert time
INSERT INTO public.hotel_facility (hotel_id, facility_id)
SELECT h.id, f.id FROM public.hotel h CROSS JOIN public.facility f
WHERE h.slug = 'shurfat-al-talayie-hotel' AND f.slug IN ('elevator','cards-accepted','air-conditioner','wi-fi-internet','accessibility','shuttle-bus-service')
ON CONFLICT DO NOTHING;

INSERT INTO public.hotel_facility (hotel_id, facility_id)
SELECT h.id, f.id FROM public.hotel h CROSS JOIN public.facility f
WHERE h.slug = 'voco-makkah,-an-ihg-hotel' AND f.slug IN ('elevator','air-conditioner','wi-fi-internet','accessibility','shuttle-bus-service','coffee-shop','restaurant')
ON CONFLICT DO NOTHING;

INSERT INTO public.hotel_facility (hotel_id, facility_id)
SELECT h.id, f.id FROM public.hotel h CROSS JOIN public.facility f
WHERE h.slug = 'holiday-in-al-aziziah' AND f.slug IN ('elevator','cards-accepted','air-conditioner','wi-fi-internet','accessibility','coffee-shop','fitness-center','swimming-pool')
ON CONFLICT DO NOTHING;

INSERT INTO public.hotel_facility (hotel_id, facility_id)
SELECT h.id, f.id FROM public.hotel h CROSS JOIN public.facility f
WHERE h.slug = 'swissôtel-al-maqam-makkah' AND f.slug IN ('elevator','cards-accepted','air-conditioner','wi-fi-internet','coffee-shop','restaurant','fitness-center','swimming-pool')
ON CONFLICT DO NOTHING;

INSERT INTO public.hotel_facility (hotel_id, facility_id)
SELECT h.id, f.id FROM public.hotel h CROSS JOIN public.facility f
WHERE h.slug = 'al-marwa-rayhaan-by-rotana' AND f.slug IN ('elevator','cards-accepted','air-conditioner','wi-fi-internet','accessibility','coffee-shop','restaurant')
ON CONFLICT DO NOTHING;

-- =============================================================================
-- public.hotel_rooms
-- =============================================================================
INSERT INTO public.hotel_rooms (hotel_slug, room_category_id, room_number, name, description, beds, price_per_night, status, city_view, price_per_night_with_breakfast)
SELECT 'al-marwa-rayhaan-by-rotana', rc.id, '105', 'Apartment', 'Simple apartment with room and bathroom', 2, 800.00, 'AVAILABLE'::room_status_enum, false, NULL
FROM public.room_category rc WHERE rc.slug = 'apartment-(room-and-bathroom)'
UNION ALL
SELECT 'al-marwa-rayhaan-by-rotana', rc.id, '205', 'Family Room', 'Spacious room for families', 4, 1000.00, 'AVAILABLE'::room_status_enum, true, 1100.00
FROM public.room_category rc WHERE rc.slug = 'family-room'
UNION ALL
SELECT 'al-marwa-rayhaan-by-rotana', rc.id, '305', 'Superior Room', 'Upgraded room with premium features', 2, 900.00, 'AVAILABLE'::room_status_enum, true, 950.00
FROM public.room_category rc WHERE rc.slug = 'superior-room'
UNION ALL
SELECT 'al-marwa-rayhaan-by-rotana', rc.id, '405', 'Presidential Suite', 'Most luxurious suite in the hotel', 2, 2000.00, 'AVAILABLE'::room_status_enum, true, 2100.00
FROM public.room_category rc WHERE rc.slug = 'presidential-suite'
UNION ALL
SELECT 'holiday-in-al-aziziah', rc.id, '103', 'One Bedroom Suite', 'Suite with separate living area and kitchen', 2, 700.00, 'AVAILABLE'::room_status_enum, false, NULL
FROM public.room_category rc WHERE rc.slug = 'one-bedroom-suite'
UNION ALL
SELECT 'holiday-in-al-aziziah', rc.id, '203', 'Quad Room', 'Room with four single beds for groups', 4, 900.00, 'AVAILABLE'::room_status_enum, true, 950.00
FROM public.room_category rc WHERE rc.slug = 'quad'
UNION ALL
SELECT 'holiday-in-al-aziziah', rc.id, '303', 'Quintuple Room', 'Large room with five single beds', 5, 1100.00, 'AVAILABLE'::room_status_enum, false, 1150.00
FROM public.room_category rc WHERE rc.slug = 'quintuple'
UNION ALL
SELECT 'shurfat-al-talayie-hotel', rc.id, '101', 'Standard Double', 'Comfortable double room with basic amenities', 2, 350.00, 'AVAILABLE'::room_status_enum, true, 400.00
FROM public.room_category rc WHERE rc.slug = 'double'
UNION ALL
SELECT 'shurfat-al-talayie-hotel', rc.id, '201', 'Triple Room', 'Spacious room with three single beds', 3, 450.00, 'AVAILABLE'::room_status_enum, false, NULL
FROM public.room_category rc WHERE rc.slug = 'triple'
UNION ALL
SELECT 'shurfat-al-talayie-hotel', rc.id, '301', 'King Bed Double', 'Luxury double with king size bed', 2, 550.00, 'AVAILABLE'::room_status_enum, true, 600.00
FROM public.room_category rc WHERE rc.slug = '(king-bed)-double'
UNION ALL
SELECT 'swissôtel-al-maqam-makkah', rc.id, '104', 'One Bedroom Apartment', 'Luxury apartment with full amenities', 2, 1200.00, 'AVAILABLE'::room_status_enum, true, 1300.00
FROM public.room_category rc WHERE rc.slug = 'one-bedroom-apartment'
UNION ALL
SELECT 'swissôtel-al-maqam-makkah', rc.id, '204', 'One Bedroom Suite', 'Premium suite with Haram view', 2, 1500.00, 'AVAILABLE'::room_status_enum, true, 1600.00
FROM public.room_category rc WHERE rc.slug = 'one-bedroom-suite'
UNION ALL
SELECT 'swissôtel-al-maqam-makkah', rc.id, '304', 'Executive Suite', 'Exclusive suite with separate living area', 2, 1800.00, 'AVAILABLE'::room_status_enum, true, 1900.00
FROM public.room_category rc WHERE rc.slug = 'executive-suite'
UNION ALL
SELECT 'voco-makkah,-an-ihg-hotel', rc.id, '102', 'Deluxe Twin', 'Two comfortable twin beds with premium amenities', 2, 600.00, 'AVAILABLE'::room_status_enum, true, 650.00
FROM public.room_category rc WHERE rc.slug = 'deluxe-twin'
UNION ALL
SELECT 'voco-makkah,-an-ihg-hotel', rc.id, '202', 'Elite Studio', 'Studio with king bed and work area', 2, 750.00, 'AVAILABLE'::room_status_enum, true, 800.00
FROM public.room_category rc WHERE rc.slug = 'elite-studio-king-bed'
UNION ALL
SELECT 'voco-makkah,-an-ihg-hotel', rc.id, '302', 'Deluxe King', 'Spacious room with king bed and sitting area', 2, 850.00, 'AVAILABLE'::room_status_enum, true, 900.00
FROM public.room_category rc WHERE rc.slug = 'deluxe-king'
ON CONFLICT DO NOTHING;

-- =============================================================================
-- public.room_images
-- =============================================================================
INSERT INTO public.room_images (room_id, url) VALUES
  (1, 'https://egbkyzeqrzplsmlhuwdn.supabase.co/storage/v1/object/public/room-images/room_101.webp'),
  (2, 'https://egbkyzeqrzplsmlhuwdn.supabase.co/storage/v1/object/public/room-images/room_101.webp'),
  (3, 'https://egbkyzeqrzplsmlhuwdn.supabase.co/storage/v1/object/public/room-images/room_101.webp'),
  (4, 'https://egbkyzeqrzplsmlhuwdn.supabase.co/storage/v1/object/public/room-images/room_101.webp'),
  (5, 'https://egbkyzeqrzplsmlhuwdn.supabase.co/storage/v1/object/public/room-images/room_101.webp'),
  (6, 'https://egbkyzeqrzplsmlhuwdn.supabase.co/storage/v1/object/public/room-images/room_101.webp'),
  (7, 'https://egbkyzeqrzplsmlhuwdn.supabase.co/storage/v1/object/public/room-images/room_101.webp'),
  (8, 'https://egbkyzeqrzplsmlhuwdn.supabase.co/storage/v1/object/public/room-images/room_101.webp'),
  (9, 'https://egbkyzeqrzplsmlhuwdn.supabase.co/storage/v1/object/public/room-images/room_101.webp'),
  (10, 'https://egbkyzeqrzplsmlhuwdn.supabase.co/storage/v1/object/public/room-images/room_101.webp'),
  (11, 'https://egbkyzeqrzplsmlhuwdn.supabase.co/storage/v1/object/public/room-images/room_101.webp'),
  (12, 'https://egbkyzeqrzplsmlhuwdn.supabase.co/storage/v1/object/public/room-images/room_101.webp'),
  (13, 'https://egbkyzeqrzplsmlhuwdn.supabase.co/storage/v1/object/public/room-images/room_101.webp'),
  (14, 'https://egbkyzeqrzplsmlhuwdn.supabase.co/storage/v1/object/public/room-images/room_101.webp'),
  (15, 'https://egbkyzeqrzplsmlhuwdn.supabase.co/storage/v1/object/public/room-images/room_101.webp'),
  (16, 'https://egbkyzeqrzplsmlhuwdn.supabase.co/storage/v1/object/public/room-images/room_101.webp')
ON CONFLICT DO NOTHING;

-- =============================================================================
-- MCP / KSA: additional hotel_rooms (sync)
-- These rows mirror the KSA migration data and use room_category lookups.
-- Safe to re-run because of the UNIQUE(hotel_slug, room_number) constraint.
-- =============================================================================
INSERT INTO public.hotel_rooms (hotel_slug, room_category_id, room_number, name, description, beds, price_per_night, city_view, price_per_night_with_breakfast)
VALUES
  ('shurfat-al-talayie-hotel', (SELECT id FROM public.room_category WHERE slug = 'double'), '101', 'Standard Double', 'Comfortable double room with basic amenities', 2, 350.00, true, 400.00),
  ('shurfat-al-talayie-hotel', (SELECT id FROM public.room_category WHERE slug = 'triple'), '201', 'Triple Room', 'Spacious room with three single beds', 3, 450.00, false, NULL),
  ('shurfat-al-talayie-hotel', (SELECT id FROM public.room_category WHERE slug = '(king-bed)-double'), '301', 'King Bed Double', 'Luxury double with king size bed', 2, 550.00, true, 600.00),

  ('voco-makkah,-an-ihg-hotel', (SELECT id FROM public.room_category WHERE slug = 'deluxe-twin'), '102', 'Deluxe Twin', 'Two comfortable twin beds with premium amenities', 2, 600.00, true, 650.00),
  ('voco-makkah,-an-ihg-hotel', (SELECT id FROM public.room_category WHERE slug = 'elite-studio-king-bed'), '202', 'Elite Studio', 'Studio with king bed and work area', 2, 750.00, true, 800.00),
  ('voco-makkah,-an-ihg-hotel', (SELECT id FROM public.room_category WHERE slug = 'deluxe-king'), '302', 'Deluxe King', 'Spacious room with king bed and sitting area', 2, 850.00, true, 900.00),

  ('holiday-in-al-aziziah', (SELECT id FROM public.room_category WHERE slug = 'one-bedroom-suite'), '103', 'One Bedroom Suite', 'Suite with separate living area and kitchen', 2, 700.00, false, NULL),
  ('holiday-in-al-aziziah', (SELECT id FROM public.room_category WHERE slug = 'quad'), '203', 'Quad Room', 'Room with four single beds for groups', 4, 900.00, true, 950.00),
  ('holiday-in-al-aziziah', (SELECT id FROM public.room_category WHERE slug = 'quintuple'), '303', 'Quintuple Room', 'Large room with five single beds', 5, 1100.00, false, 1150.00),

  ('swissôtel-al-maqam-makkah', (SELECT id FROM public.room_category WHERE slug = 'one-bedroom-apartment'), '104', 'One Bedroom Apartment', 'Luxury apartment with full amenities', 2, 1200.00, true, 1300.00),
  ('swissôtel-al-maqam-makkah', (SELECT id FROM public.room_category WHERE slug = 'one-bedroom-suite'), '204', 'One Bedroom Suite', 'Premium suite with Haram view', 2, 1500.00, true, 1600.00),
  ('swissôtel-al-maqam-makkah', (SELECT id FROM public.room_category WHERE slug = 'executive-suite'), '304', 'Executive Suite', 'Exclusive suite with separate living area', 2, 1800.00, true, 1900.00),

  ('al-marwa-rayhaan-by-rotana', (SELECT id FROM public.room_category WHERE slug = 'apartment-(room-and-bathroom)'), '105', 'Apartment', 'Simple apartment with room and bathroom', 2, 800.00, false, NULL),
  ('al-marwa-rayhaan-by-rotana', (SELECT id FROM public.room_category WHERE slug = 'family-room'), '205', 'Family Room', 'Spacious room for families', 4, 1000.00, true, 1100.00),
  ('al-marwa-rayhaan-by-rotana', (SELECT id FROM public.room_category WHERE slug = 'superior-room'), '305', 'Superior Room', 'Upgraded room with premium features', 2, 900.00, true, 950.00),
  ('al-marwa-rayhaan-by-rotana', (SELECT id FROM public.room_category WHERE slug = 'presidential-suite'), '405', 'Presidential Suite', 'Most luxurious suite in the hotel', 2, 2000.00, true, 2100.00
)
ON CONFLICT DO NOTHING;
-- =============================================================================
-- Example seed data: promotions, bookings, payments, reviews, search logs
-- These are minimal, safe example rows that resolve foreign keys via lookups.
-- Add or remove entries as needed for local testing. They are idempotent
-- where possible and safe to re-run after migrations.
-- =============================================================================

-- Promotions (promocode per hotel)
INSERT INTO public.promotion (code, hotel_id, description, discount_percent, valid_from, valid_to, is_active)
VALUES (
  'WELCOME10',
  (SELECT id FROM public.hotel WHERE slug = 'shurfat-al-talayie-hotel'),
  '10% welcome discount',
  10.00,
  CURRENT_DATE,
  CURRENT_DATE + INTERVAL '30 days',
  TRUE
)
ON CONFLICT DO NOTHING;

-- -- Booking + booking_detail + payment (example booking for `testuser`)
-- WITH new_booking AS (
--   INSERT INTO public.booking (
--     id, hotel_slug, room_id, check_in_date, check_out_date, nights, number_of_rooms,
--     booking_status, booking_date, promocode, guest_full_name, guest_email, guest_phone,
--     gross_total, discount, net_total, account_id
--   )
--   SELECT
--     gen_random_uuid(),
--     h.slug,
--     hr.id,
--     '2026-04-01'::date,
--     '2026-04-03'::date,
--     2,
--     1,
--     'CONFIRMED'::booking_status_enum,
--     CURRENT_DATE,
--     NULL,
--     'Test Guest',
--     'testuser@tradersempire.com',
--     NULL,
--     hr.price_per_night * 2,
--     0,
--     hr.price_per_night * 2,
--     a.id
--   FROM public.hotel h
--   JOIN public.hotel_rooms hr ON hr.hotel_slug = h.slug AND hr.room_number = '101'
--   JOIN public.accounts a ON a.email = 'testuser@tradersempire.com'
--   WHERE h.slug = 'shurfat-al-talayie-hotel'
--   RETURNING id, hotel_slug
-- )
-- INSERT INTO public.booking_detail (booking_id, room_id, no_of_rooms, room_price, gross_amount, discount, net_amount)
-- SELECT b.id, hr.id, 1, hr.price_per_night, hr.price_per_night, 0, hr.price_per_night
-- FROM new_booking b
-- JOIN public.hotel_rooms hr ON hr.hotel_slug = b.hotel_slug AND hr.room_number = '101'
-- ON CONFLICT DO NOTHING;

-- -- Payment for the example booking
-- INSERT INTO public.payment (booking_id, amount, payment_date, payment_method, payment_status)
-- SELECT b.id, b.gross_total, CURRENT_DATE, 'VISA'::payment_method_enum, 'COMPLETED'::payment_status_enum
-- FROM public.booking b
-- WHERE b.guest_email = 'testuser@tradersempire.com' AND b.booking_date = CURRENT_DATE
-- ON CONFLICT DO NOTHING;

-- -- Review and detailed ratings (based on the booking we just created)
-- WITH created_review AS (
--   INSERT INTO public.review (booking_id, hotel_id, reviewer_name, reviewer_email, overall_rating, feedback)
--   SELECT b.id, h.id, 'Test Guest', b.guest_email, 5, 'Great stay!'
--   FROM public.booking b
--   JOIN public.hotel h ON b.hotel_slug = h.slug
--   WHERE b.guest_email = 'testuser@tradersempire.com' AND b.booking_date = CURRENT_DATE
--   RETURNING id
-- )
-- INSERT INTO public.review_detail_rating (review_id, service, rating)
-- SELECT r.id, sc, 5
-- FROM created_review r,
--      (VALUES ('CLEANLINESS'::service_rating_category), ('STAFF'::service_rating_category), ('FOOD'::service_rating_category)) v(sc)
-- ON CONFLICT DO NOTHING;

-- Example search log entry
-- INSERT INTO public.search_log (location_id, check_in_date, check_out_date, promocode, search_datetime, user_id)
-- VALUES (
--   (SELECT id FROM public.location WHERE name = 'MECCA'),
--   '2026-04-01'::date,
--   '2026-04-03'::date,
--   'WELCOME10',
--   CURRENT_TIMESTAMP,
--   (SELECT id FROM public.accounts WHERE email = 'testuser@tradersempire.com')
-- )
-- ON CONFLICT DO NOTHING;

-- =============================================================================
-- public.blog_post
-- =============================================================================
INSERT INTO public.blog_post (title, short_description, long_description, created_by, tags) VALUES
  ('Top 5 Hotels in Makkah', 'A guide to the best luxury stays.', 'Detailed blog content about Makkah hotels...', 'Admin', ARRAY['makkah', 'luxury', 'hotels']),
  ('Visiting Madinah: Tips and Tricks', 'How to make the most of your trip.', 'Detailed blog content about Madinah...', 'Admin', ARRAY['madinah', 'travel'])
ON CONFLICT DO NOTHING;

-- =============================================================================
-- public.promotion
-- =============================================================================
-- OMITTED: `public.promotion` explicit inserts skipped because remote Supabase has no rows for this table.
-- To add promotions later, re-enable an INSERT ... SELECT that references `public.hotel`.

-- =============================================================================
-- public.booking
-- =============================================================================
-- OMITTED: `public.booking` explicit inserts skipped because remote Supabase has no rows for this table.
-- To add example bookings later, re-enable the INSERT ... SELECT block that joins `public.hotel_rooms` and `public.accounts`.

-- =============================================================================
-- public.booking_detail
-- =============================================================================
-- OMITTED: `public.booking_detail` explicit inserts skipped because remote Supabase has no rows for `public.booking`/`public.booking_detail`.

-- =============================================================================
-- public.payment
-- =============================================================================
-- OMITTED: `public.payment` explicit inserts skipped because remote Supabase has no rows for this table.

-- =============================================================================
-- public.review
-- =============================================================================
-- OMITTED: `public.review` explicit inserts skipped because remote Supabase has no rows for this table.

-- =============================================================================
-- public.review_detail_rating
-- =============================================================================
-- OMITTED: `public.review_detail_rating` explicit inserts skipped because remote Supabase has no rows for `public.review`.

-- =============================================================================
-- public.search_log
-- =============================================================================
-- OMITTED: `public.search_log` explicit inserts skipped because remote Supabase has no rows for this table.
