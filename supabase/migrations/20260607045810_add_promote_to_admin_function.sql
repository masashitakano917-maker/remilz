/*
# Add admin setup function

Creates a database function that promotes the first user to admin.
Only works when no admin users exist yet (first-time setup only).

1. New Functions
   - `promote_to_admin()` - RPC that marks the calling user as admin, 
     but ONLY if no admin users exist yet (first-time setup protection)

2. Security
   - Function uses SECURITY DEFINER to bypass RLS
   - Checks that no admin exists before promoting
*/

CREATE OR REPLACE FUNCTION public.promote_to_admin()
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  admin_count integer;
BEGIN
  SELECT count(*) INTO admin_count FROM profiles WHERE is_admin = true;
  IF admin_count > 0 THEN
    RETURN false;
  END IF;
  UPDATE profiles SET is_admin = true WHERE id = auth.uid();
  RETURN true;
END;
$$;
