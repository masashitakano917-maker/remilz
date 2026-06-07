/*
# Create articles table

1. New Tables
   - `articles` - Blog/guide articles for returnees
     - `id` (uuid, PK)
     - `title` (text, not null)
     - `category` (text) - 手続き/税金・お金/住まい/教育/引越し/求人/保険/生活/FAQ/法人
     - `content` (text) - HTML body content
     - `excerpt` (text) - short summary
     - `status` (text) - published/draft
     - `published_at` (timestamptz)
     - `created_at` (timestamptz)
     - `updated_at` (timestamptz)

2. Security
   - RLS enabled
   - Public can read published articles
   - Admin-only write access
*/

CREATE TABLE IF NOT EXISTS articles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  category text NOT NULL,
  content text,
  excerpt text,
  status text NOT NULL DEFAULT 'draft',
  published_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE articles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_select_published_articles" ON articles;
CREATE POLICY "public_select_published_articles" ON articles FOR SELECT
  TO anon, authenticated USING (status = 'published');

DROP POLICY IF EXISTS "admin_select_all_articles" ON articles;
CREATE POLICY "admin_select_all_articles" ON articles FOR SELECT
  TO authenticated USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true)
  );

DROP POLICY IF EXISTS "admin_insert_articles" ON articles;
CREATE POLICY "admin_insert_articles" ON articles FOR INSERT
  TO authenticated WITH CHECK (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true)
  );

DROP POLICY IF EXISTS "admin_update_articles" ON articles;
CREATE POLICY "admin_update_articles" ON articles FOR UPDATE
  TO authenticated
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true))
  WITH CHECK (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true));

DROP POLICY IF EXISTS "admin_delete_articles" ON articles;
CREATE POLICY "admin_delete_articles" ON articles FOR DELETE
  TO authenticated
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true));

CREATE INDEX IF NOT EXISTS idx_articles_status ON articles(status);
CREATE INDEX IF NOT EXISTS idx_articles_category ON articles(category);
