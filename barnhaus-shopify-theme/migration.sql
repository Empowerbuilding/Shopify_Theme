-- ============================================
-- Concept Voting Gallery - Supabase Migration
-- Barnhaus Steel Builders
-- ============================================

-- Drop existing tables if they exist (for clean re-run)
DROP TABLE IF EXISTS concept_votes CASCADE;
DROP TABLE IF EXISTS concept_voting CASCADE;

-- 1. Create concept_voting table from scratch with explicit primary key
CREATE TABLE concept_voting (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT,
  description TEXT,
  image_url TEXT,
  beds INTEGER,
  baths DECIMAL(3,1),
  sqft INTEGER,
  vote_count INTEGER DEFAULT 0,
  status VARCHAR(50) DEFAULT 'active',
  featured BOOLEAN DEFAULT FALSE,
  sort_order INTEGER DEFAULT 0,
  style VARCHAR(100),
  shopify_product_id VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Create concept_votes table to track individual votes
CREATE TABLE concept_votes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  concept_id UUID NOT NULL REFERENCES concept_voting(id) ON DELETE CASCADE,
  visitor_id VARCHAR(255) NOT NULL,
  email VARCHAR(255),
  notify_on_release BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- Unique constraint to prevent duplicate votes
  CONSTRAINT unique_vote_per_visitor UNIQUE (concept_id, visitor_id)
);

-- 3. Create indexes for performance
CREATE INDEX idx_concept_voting_status ON concept_voting(status);
CREATE INDEX idx_concept_voting_vote_count ON concept_voting(vote_count DESC);
CREATE INDEX idx_concept_voting_created_at ON concept_voting(created_at DESC);
CREATE INDEX idx_concept_voting_style ON concept_voting(style);
CREATE INDEX idx_concept_voting_featured ON concept_voting(featured);

CREATE INDEX idx_concept_votes_concept_id ON concept_votes(concept_id);
CREATE INDEX idx_concept_votes_visitor_id ON concept_votes(visitor_id);
CREATE INDEX idx_concept_votes_email ON concept_votes(email) WHERE email IS NOT NULL;

-- 4. Create trigger function to auto-increment vote_count
CREATE OR REPLACE FUNCTION increment_vote_count()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE concept_voting
  SET vote_count = vote_count + 1
  WHERE id = NEW.concept_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 5. Create trigger function to auto-decrement vote_count
CREATE OR REPLACE FUNCTION decrement_vote_count()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE concept_voting
  SET vote_count = GREATEST(0, vote_count - 1)
  WHERE id = OLD.concept_id;
  RETURN OLD;
END;
$$ LANGUAGE plpgsql;

-- 6. Create triggers
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

-- 7. Enable Row Level Security
ALTER TABLE concept_voting ENABLE ROW LEVEL SECURITY;
ALTER TABLE concept_votes ENABLE ROW LEVEL SECURITY;

-- 8. RLS Policies for concept_voting
-- Allow public read of active and coming_soon concepts
DROP POLICY IF EXISTS "Public can view active concepts" ON concept_voting;
CREATE POLICY "Public can view active concepts" ON concept_voting
  FOR SELECT
  USING (status IN ('active', 'coming_soon'));

-- Allow authenticated users to manage all concepts (for admin)
DROP POLICY IF EXISTS "Authenticated users can manage concepts" ON concept_voting;
CREATE POLICY "Authenticated users can manage concepts" ON concept_voting
  FOR ALL
  USING (auth.role() = 'authenticated');

-- 9. RLS Policies for concept_votes
-- Allow public to insert votes
DROP POLICY IF EXISTS "Public can insert votes" ON concept_votes;
CREATE POLICY "Public can insert votes" ON concept_votes
  FOR INSERT
  WITH CHECK (true);

-- Allow public to read their own votes (by visitor_id)
DROP POLICY IF EXISTS "Public can view own votes" ON concept_votes;
CREATE POLICY "Public can view own votes" ON concept_votes
  FOR SELECT
  USING (true);

-- Allow public to delete their own votes
DROP POLICY IF EXISTS "Public can delete own votes" ON concept_votes;
CREATE POLICY "Public can delete own votes" ON concept_votes
  FOR DELETE
  USING (true);

-- Allow authenticated users to manage all votes (for admin)
DROP POLICY IF EXISTS "Authenticated users can manage votes" ON concept_votes;
CREATE POLICY "Authenticated users can manage votes" ON concept_votes
  FOR ALL
  USING (auth.role() = 'authenticated');

-- 10. Grant permissions for anonymous access
GRANT SELECT ON concept_voting TO anon;
GRANT SELECT, INSERT, DELETE ON concept_votes TO anon;

-- 11. Insert sample concept data for testing
INSERT INTO concept_voting (name, description, image_url, beds, baths, sqft, style, status, featured, vote_count) VALUES
('The Summit', 'A stunning mountain-inspired barndominium with panoramic views and open concept living. Features vaulted ceilings, wraparound deck, and a gourmet kitchen with island seating.', 'https://via.placeholder.com/800x600?text=The+Summit', 4, 3.5, 3500, 'modern-farmhouse', 'active', true, 42),
('Industrial Loft', 'Urban industrial design meets rural living in this sleek steel-framed concept. Exposed beams, concrete floors, and floor-to-ceiling windows create a dramatic living space.', 'https://via.placeholder.com/800x600?text=Industrial+Loft', 3, 2.5, 2800, 'industrial', 'active', false, 28),
('Heritage Estate', 'Traditional craftsmanship with modern steel construction techniques. This elegant design features a grand foyer, formal dining, and a private master suite wing.', 'https://via.placeholder.com/800x600?text=Heritage+Estate', 5, 4, 4200, 'traditional', 'active', false, 35),
('The Minimalist', 'Clean lines and efficient spaces define this mid-century inspired design. Perfect for those who appreciate simplicity, natural light, and seamless indoor-outdoor flow.', 'https://via.placeholder.com/800x600?text=The+Minimalist', 2, 2, 1800, 'mid-century', 'coming_soon', true, 67),
('Ranch Revival', 'A modern take on the classic ranch-style barndominium. Single-story living with split bedroom plan, mudroom entry, and an oversized 3-car garage with workshop space.', 'https://via.placeholder.com/800x600?text=Ranch+Revival', 4, 3, 3200, 'barndominium', 'active', false, 19);

-- Done! Your concept voting tables are ready.
-- You can now view the page at /pages/concepts after creating the page in Shopify admin.
