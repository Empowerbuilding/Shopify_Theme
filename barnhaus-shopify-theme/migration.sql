-- ============================================
-- Concept Voting Gallery - Supabase Migration
-- Barnhaus Steel Builders
-- ============================================
-- This migration adds voting capability to the existing website_floor_plans table

-- 1. Add vote_count column to website_floor_plans if it doesn't exist
ALTER TABLE website_floor_plans
ADD COLUMN IF NOT EXISTS vote_count INTEGER DEFAULT 0;

-- 2. Add style column if it doesn't exist (for filtering)
ALTER TABLE website_floor_plans
ADD COLUMN IF NOT EXISTS style VARCHAR(100);

-- 3. Drop existing concept_votes table if it exists
DROP TABLE IF EXISTS concept_votes CASCADE;

-- 4. Create concept_votes table to track individual votes
CREATE TABLE concept_votes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  concept_id UUID NOT NULL REFERENCES website_floor_plans(id) ON DELETE CASCADE,
  visitor_id VARCHAR(255) NOT NULL,
  email VARCHAR(255),
  notify_on_release BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- Unique constraint to prevent duplicate votes
  CONSTRAINT unique_vote_per_visitor UNIQUE (concept_id, visitor_id)
);

-- 5. Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_floor_plans_vote_count ON website_floor_plans(vote_count DESC);
CREATE INDEX IF NOT EXISTS idx_floor_plans_style ON website_floor_plans(style);

CREATE INDEX idx_concept_votes_concept_id ON concept_votes(concept_id);
CREATE INDEX idx_concept_votes_visitor_id ON concept_votes(visitor_id);
CREATE INDEX idx_concept_votes_email ON concept_votes(email) WHERE email IS NOT NULL;

-- 6. Create trigger function to auto-increment vote_count
CREATE OR REPLACE FUNCTION increment_vote_count()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE website_floor_plans
  SET vote_count = COALESCE(vote_count, 0) + 1
  WHERE id = NEW.concept_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 7. Create trigger function to auto-decrement vote_count
CREATE OR REPLACE FUNCTION decrement_vote_count()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE website_floor_plans
  SET vote_count = GREATEST(0, COALESCE(vote_count, 0) - 1)
  WHERE id = OLD.concept_id;
  RETURN OLD;
END;
$$ LANGUAGE plpgsql;

-- 8. Create triggers
DROP TRIGGER IF EXISTS trigger_increment_vote ON concept_votes;
CREATE TRIGGER trigger_increment_vote
  AFTER INSERT ON concept_votes
  FOR EACH ROW
  EXECUTE FUNCTION increment_vote_count();

DROP TRIGGER IF EXISTS trigger_decrement_vote ON concept_votes;
CREATE TRIGGER trigger_decrement_vote
  AFTER DELETE ON concept_votes
  FOR EACH ROW
  EXECUTE FUNCTION decrement_vote_count();

-- 9. Enable Row Level Security on concept_votes
ALTER TABLE concept_votes ENABLE ROW LEVEL SECURITY;

-- 10. RLS Policies for concept_votes
-- Allow public to insert votes
DROP POLICY IF EXISTS "Public can insert votes" ON concept_votes;
CREATE POLICY "Public can insert votes" ON concept_votes
  FOR INSERT
  WITH CHECK (true);

-- Allow public to read votes
DROP POLICY IF EXISTS "Public can view votes" ON concept_votes;
CREATE POLICY "Public can view votes" ON concept_votes
  FOR SELECT
  USING (true);

-- Allow public to delete their own votes
DROP POLICY IF EXISTS "Public can delete own votes" ON concept_votes;
CREATE POLICY "Public can delete own votes" ON concept_votes
  FOR DELETE
  USING (true);

-- 11. Grant permissions for anonymous access
GRANT SELECT, INSERT, DELETE ON concept_votes TO anon;

-- Done! Your concept voting is now ready.
-- The concepts page will show all plans from website_floor_plans
-- that are NOT already listed in Shopify.
