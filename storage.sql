-- Create the bucket (if not exists)
insert into storage.buckets (id, name, public)
values ('outbard_storage', 'outbard_storage', true)
on conflict (id) do nothing;

-- DROP existing policies to clean up
drop policy if exists "Public Access" on storage.objects;
drop policy if exists "Authenticated access" on storage.objects;
drop policy if exists "Authenticated update" on storage.objects;
drop policy if exists "Authenticated delete" on storage.objects;
drop policy if exists "Public Insert" on storage.objects;
drop policy if exists "Public Update" on storage.objects;
drop policy if exists "Public Delete" on storage.objects;

-- Create permissive policies for 'outbard_storage'
-- 1. Allow Public SELECT (View)
create policy "Public Access"
  on storage.objects for select
  using ( bucket_id = 'outbard_storage' );

-- 2. Allow Public INSERT (Upload)
create policy "Public Insert"
  on storage.objects for insert
  with check ( bucket_id = 'outbard_storage' );

-- 3. Allow Public UPDATE (Replace)
create policy "Public Update"
  on storage.objects for update
  using ( bucket_id = 'outbard_storage' );

-- 4. Allow Public DELETE (Remove)
create policy "Public Delete"
  on storage.objects for delete
  using ( bucket_id = 'outbard_storage' );
