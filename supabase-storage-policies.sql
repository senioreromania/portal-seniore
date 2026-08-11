-- Permite utilizatorilor autentificați să încarce imagini în bucket-ul camine-images
CREATE POLICY "Authenticated users can upload camin images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'camine-images');

-- Permite oricui să vadă imaginile (bucket public)
CREATE POLICY "Public can view camin images"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'camine-images');

-- Permite utilizatorilor autentificați să șteargă imagini
CREATE POLICY "Authenticated users can delete camin images"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'camine-images');

-- Permite utilizatorilor autentificați să actualizeze imagini (opțional)
CREATE POLICY "Authenticated users can update camin images"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'camine-images');
