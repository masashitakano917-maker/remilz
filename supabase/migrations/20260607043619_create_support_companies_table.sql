/*
# Create support_companies table

1. New Tables
   - `support_companies` - Directory of support companies (moving, insurance, housing, etc.)
     - `id` (uuid, PK)
     - `name` (text, not null)
     - `category` (text) - 国際引越し/保険/不動産/行政手続き/教育
     - `description` (text)
     - `services` (text[]) - array of service tags
     - `has_online_support` (boolean)
     - `has_english_support` (boolean)
     - `has_corporate_support` (boolean)
     - `website_url` (text)
     - `phone` (text)
     - `email` (text)
     - `is_featured` (boolean)
     - `created_at` (timestamptz)
     - `updated_at` (timestamptz)

2. Security
   - RLS enabled
   - Public read access (anon + authenticated)
   - Admin-only write access
*/

CREATE TABLE IF NOT EXISTS support_companies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  category text NOT NULL,
  description text,
  services text[] DEFAULT '{}',
  has_online_support boolean NOT NULL DEFAULT false,
  has_english_support boolean NOT NULL DEFAULT false,
  has_corporate_support boolean NOT NULL DEFAULT false,
  website_url text,
  phone text,
  email text,
  is_featured boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE support_companies ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_select_companies" ON support_companies;
CREATE POLICY "public_select_companies" ON support_companies FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "admin_insert_companies" ON support_companies;
CREATE POLICY "admin_insert_companies" ON support_companies FOR INSERT
  TO authenticated WITH CHECK (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true)
  );

DROP POLICY IF EXISTS "admin_update_companies" ON support_companies;
CREATE POLICY "admin_update_companies" ON support_companies FOR UPDATE
  TO authenticated
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true))
  WITH CHECK (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true));

DROP POLICY IF EXISTS "admin_delete_companies" ON support_companies;
CREATE POLICY "admin_delete_companies" ON support_companies FOR DELETE
  TO authenticated
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true));

CREATE INDEX IF NOT EXISTS idx_companies_category ON support_companies(category);
