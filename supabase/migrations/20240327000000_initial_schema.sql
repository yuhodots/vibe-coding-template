-- This is an example migration file
-- Migrations are applied in order, based on the timestamp prefix

-- Create schema for profiles
create table if not exists public.profiles (
  id uuid primary key references auth.users on delete cascade,
  name text,
  bio text,
  created_at timestamptz default now() not null
);

-- Create a secure RLS policy for the profiles table
alter table public.profiles enable row level security;

-- Create policy to allow users to view their own profile
create policy "Users can view their own profile"
  on profiles for select
  using (auth.uid() = id);

-- Create policy to allow users to update their own profile
create policy "Users can update their own profile"
  on profiles for update
  using (auth.uid() = id);

-- Create a public profiles API
create function public.get_profile(profile_id uuid)
returns json as $$
  select json_build_object(
    'id', id,
    'name', name,
    'bio', bio
  )
  from public.profiles
  where id = profile_id
$$ language sql security definer;