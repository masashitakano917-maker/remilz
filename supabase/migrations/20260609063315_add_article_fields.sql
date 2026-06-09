ALTER TABLE articles ADD COLUMN IF NOT EXISTS slug text;
ALTER TABLE articles ADD COLUMN IF NOT EXISTS author text;
ALTER TABLE articles ADD COLUMN IF NOT EXISTS featured_image text;
ALTER TABLE articles ADD COLUMN IF NOT EXISTS is_featured boolean NOT NULL DEFAULT false;

CREATE UNIQUE INDEX IF NOT EXISTS idx_articles_slug ON articles(slug) WHERE slug IS NOT NULL;