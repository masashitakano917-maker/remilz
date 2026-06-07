-- User Tasks (次にやること)
CREATE TABLE IF NOT EXISTS user_tasks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES profiles(id) ON DELETE CASCADE,
  title text NOT NULL,
  category text NOT NULL DEFAULT 'その他',
  status text NOT NULL DEFAULT '未対応',
  due_date date,
  link_url text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE user_tasks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "select_own_tasks" ON user_tasks FOR SELECT
  TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "insert_own_tasks" ON user_tasks FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "update_own_tasks" ON user_tasks FOR UPDATE
  TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "delete_own_tasks" ON user_tasks FOR DELETE
  TO authenticated USING (auth.uid() = user_id);

CREATE INDEX idx_user_tasks_user ON user_tasks(user_id);
CREATE INDEX idx_user_tasks_status ON user_tasks(status);

-- User Calendar Events (今週の予定)
CREATE TABLE IF NOT EXISTS user_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES profiles(id) ON DELETE CASCADE,
  title text NOT NULL,
  event_date date NOT NULL,
  color text NOT NULL DEFAULT 'blue',
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE user_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "select_own_events" ON user_events FOR SELECT
  TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "insert_own_events" ON user_events FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "update_own_events" ON user_events FOR UPDATE
  TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "delete_own_events" ON user_events FOR DELETE
  TO authenticated USING (auth.uid() = user_id);

CREATE INDEX idx_user_events_user ON user_events(user_id);
CREATE INDEX idx_user_events_date ON user_events(event_date);