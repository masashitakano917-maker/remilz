/*
# Create inquiries and checklist tables

1. New Tables
   - `inquiries` - Contact form submissions / user inquiries
     - `id` (uuid, PK)
     - `user_id` (uuid, FK to profiles, nullable)
     - `name` (text)
     - `email` (text)
     - `category` (text) - 引越し/法人/住まい/保険/求人/その他
     - `title` (text)
     - `message` (text)
     - `status` (text) - pending/reviewing/resolved
     - `created_at` (timestamptz)
     - `updated_at` (timestamptz)

   - `checklist_phases` - Moving checklist phases
     - `id` (uuid, PK)
     - `phase_number` (integer)
     - `phase_name` (text)
     - `timeline` (text) - e.g. "6〜9ヶ月前"
     - `order_index` (integer)

   - `checklist_items` - Individual checklist tasks
     - `id` (uuid, PK)
     - `phase_id` (uuid, FK)
     - `title` (text)
     - `description` (text)
     - `order_index` (integer)

   - `user_checklist_progress` - User's completion tracking
     - `id` (uuid, PK)
     - `user_id` (uuid, FK, default auth.uid())
     - `item_id` (uuid, FK)
     - `completed_at` (timestamptz)

2. Security
   - RLS enabled on all tables
   - Inquiries: users can insert, admins can read/update
   - Checklists: public read, admin write
   - User progress: user-scoped CRUD
*/

-- Inquiries
CREATE TABLE IF NOT EXISTS inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE SET NULL,
  name text NOT NULL,
  email text NOT NULL,
  category text NOT NULL DEFAULT 'その他',
  title text NOT NULL,
  message text NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anyone_insert_inquiry" ON inquiries;
CREATE POLICY "anyone_insert_inquiry" ON inquiries FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "user_select_own_inquiries" ON inquiries;
CREATE POLICY "user_select_own_inquiries" ON inquiries FOR SELECT
  TO authenticated USING (user_id = auth.uid());

DROP POLICY IF EXISTS "admin_select_all_inquiries" ON inquiries;
CREATE POLICY "admin_select_all_inquiries" ON inquiries FOR SELECT
  TO authenticated USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true)
  );

DROP POLICY IF EXISTS "admin_update_inquiries" ON inquiries;
CREATE POLICY "admin_update_inquiries" ON inquiries FOR UPDATE
  TO authenticated
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true))
  WITH CHECK (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true));

DROP POLICY IF EXISTS "admin_delete_inquiries" ON inquiries;
CREATE POLICY "admin_delete_inquiries" ON inquiries FOR DELETE
  TO authenticated
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true));

CREATE INDEX IF NOT EXISTS idx_inquiries_status ON inquiries(status);

-- Checklist Phases
CREATE TABLE IF NOT EXISTS checklist_phases (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  phase_number integer NOT NULL,
  phase_name text NOT NULL,
  timeline text NOT NULL,
  order_index integer NOT NULL DEFAULT 0
);

ALTER TABLE checklist_phases ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_select_phases" ON checklist_phases;
CREATE POLICY "public_select_phases" ON checklist_phases FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "admin_insert_phases" ON checklist_phases;
CREATE POLICY "admin_insert_phases" ON checklist_phases FOR INSERT
  TO authenticated WITH CHECK (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true)
  );

DROP POLICY IF EXISTS "admin_update_phases" ON checklist_phases;
CREATE POLICY "admin_update_phases" ON checklist_phases FOR UPDATE
  TO authenticated
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true))
  WITH CHECK (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true));

DROP POLICY IF EXISTS "admin_delete_phases" ON checklist_phases;
CREATE POLICY "admin_delete_phases" ON checklist_phases FOR DELETE
  TO authenticated
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true));

-- Checklist Items
CREATE TABLE IF NOT EXISTS checklist_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  phase_id uuid NOT NULL REFERENCES checklist_phases(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  order_index integer NOT NULL DEFAULT 0
);

ALTER TABLE checklist_items ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_select_items" ON checklist_items;
CREATE POLICY "public_select_items" ON checklist_items FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "admin_insert_items" ON checklist_items;
CREATE POLICY "admin_insert_items" ON checklist_items FOR INSERT
  TO authenticated WITH CHECK (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true)
  );

DROP POLICY IF EXISTS "admin_update_items" ON checklist_items;
CREATE POLICY "admin_update_items" ON checklist_items FOR UPDATE
  TO authenticated
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true))
  WITH CHECK (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true));

DROP POLICY IF EXISTS "admin_delete_items" ON checklist_items;
CREATE POLICY "admin_delete_items" ON checklist_items FOR DELETE
  TO authenticated
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true));

-- User Checklist Progress
CREATE TABLE IF NOT EXISTS user_checklist_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES profiles(id) ON DELETE CASCADE,
  item_id uuid NOT NULL REFERENCES checklist_items(id) ON DELETE CASCADE,
  completed_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(user_id, item_id)
);

ALTER TABLE user_checklist_progress ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "select_own_progress" ON user_checklist_progress;
CREATE POLICY "select_own_progress" ON user_checklist_progress FOR SELECT
  TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "insert_own_progress" ON user_checklist_progress;
CREATE POLICY "insert_own_progress" ON user_checklist_progress FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "update_own_progress" ON user_checklist_progress;
CREATE POLICY "update_own_progress" ON user_checklist_progress FOR UPDATE
  TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "delete_own_progress" ON user_checklist_progress;
CREATE POLICY "delete_own_progress" ON user_checklist_progress FOR DELETE
  TO authenticated USING (auth.uid() = user_id);
