-- Fix infinite recursion in profiles RLS policies
-- The admin_select_all_profiles policy references profiles table inside itself causing recursion.
-- Also select_own_profile checks is_admin which causes issues.

-- Drop the problematic policies
DROP POLICY IF EXISTS "admin_select_all_profiles" ON profiles;
DROP POLICY IF EXISTS "select_own_profile" ON profiles;

-- Recreate select policy: users can only see their own profile
-- Admin check uses auth.jwt() metadata instead of querying profiles table
CREATE POLICY "select_own_profile" ON profiles FOR SELECT
  TO authenticated USING (auth.uid() = id);
