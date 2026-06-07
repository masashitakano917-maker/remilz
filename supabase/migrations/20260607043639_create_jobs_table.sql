/*
# Create jobs table

1. New Tables
   - `jobs` - Job listings for returnees
     - `id` (uuid, PK)
     - `title` (text, not null)
     - `company_id` (uuid, FK to support_companies, nullable)
     - `company_name` (text) - denormalized for display
     - `location` (text)
     - `salary_min` (integer) - in 万円
     - `salary_max` (integer) - in 万円
     - `employment_type` (text) - 正社員/契約社員/業務委託
     - `description` (text) - overview
     - `duties` (text[]) - responsibilities list
     - `requirements` (text[]) - qualifications list
     - `tags` (text[]) - 英語使用, 海外経験歓迎, etc.
     - `status` (text) - published/draft/ended
     - `online_interview` (boolean)
     - `selection_flow` (text)
     - `application_count` (integer)
     - `is_featured` (boolean)
     - `published_at` (timestamptz)
     - `created_at` (timestamptz)
     - `updated_at` (timestamptz)

2. Security
   - RLS enabled
   - Public can read published jobs
   - Admin-only write access
*/

CREATE TABLE IF NOT EXISTS jobs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  company_id uuid REFERENCES support_companies(id) ON DELETE SET NULL,
  company_name text NOT NULL,
  location text,
  salary_min integer,
  salary_max integer,
  employment_type text NOT NULL DEFAULT '正社員',
  description text,
  duties text[] DEFAULT '{}',
  requirements text[] DEFAULT '{}',
  tags text[] DEFAULT '{}',
  status text NOT NULL DEFAULT 'draft',
  online_interview boolean NOT NULL DEFAULT false,
  selection_flow text,
  application_count integer NOT NULL DEFAULT 0,
  is_featured boolean NOT NULL DEFAULT false,
  published_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_select_published_jobs" ON jobs;
CREATE POLICY "public_select_published_jobs" ON jobs FOR SELECT
  TO anon, authenticated USING (status = 'published');

DROP POLICY IF EXISTS "admin_select_all_jobs" ON jobs;
CREATE POLICY "admin_select_all_jobs" ON jobs FOR SELECT
  TO authenticated USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true)
  );

DROP POLICY IF EXISTS "admin_insert_jobs" ON jobs;
CREATE POLICY "admin_insert_jobs" ON jobs FOR INSERT
  TO authenticated WITH CHECK (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true)
  );

DROP POLICY IF EXISTS "admin_update_jobs" ON jobs;
CREATE POLICY "admin_update_jobs" ON jobs FOR UPDATE
  TO authenticated
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true))
  WITH CHECK (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true));

DROP POLICY IF EXISTS "admin_delete_jobs" ON jobs;
CREATE POLICY "admin_delete_jobs" ON jobs FOR DELETE
  TO authenticated
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true));

CREATE INDEX IF NOT EXISTS idx_jobs_status ON jobs(status);
CREATE INDEX IF NOT EXISTS idx_jobs_company ON jobs(company_id);
