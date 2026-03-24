-- Enable PostGIS extension for geography types
create extension if not exists postgis schema extensions;

-- Create custom Enums
do $$
begin
    if not exists (select 1 from pg_type where typname = 'room_status_enum') then
        create type public.room_status_enum as enum ('AVAILABLE', 'OCCUPIED', 'MAINTENANCE');
    end if;
    
    if not exists (select 1 from pg_type where typname = 'booking_status_enum') then
        create type public.booking_status_enum as enum ('PENDING', 'CONFIRMED', 'CANCELLED', 'CHECKED_IN', 'COMPLETED');
    end if;
    
    if not exists (select 1 from pg_type where typname = 'payment_method_enum') then
        create type public.payment_method_enum as enum ('MASTER', 'VISA', 'MADA', 'APPLE_PAY');
    end if;
    
    if not exists (select 1 from pg_type where typname = 'payment_status_enum') then
        create type public.payment_status_enum as enum ('PENDING', 'COMPLETED', 'FAILED');
    end if;
    
    if not exists (select 1 from pg_type where typname = 'service_rating_category') then
        create type public.service_rating_category as enum ('CLEANLINESS', 'STAFF', 'FOOD', 'VALUE_FOR_MONEY', 'COMFORT');
    end if;
end $$;
