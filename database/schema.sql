-- Supabase Database Schema for EF TACTICS AI

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (optional - for authentication)
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Saved tactics table
CREATE TABLE IF NOT EXISTS saved_tactics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  tactic_data JSONB NOT NULL,
  name VARCHAR(255) NOT NULL,
  formation VARCHAR(50) NOT NULL,
  playstyle VARCHAR(100) NOT NULL,
  tags TEXT[],
  is_public BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Preset tactics table
CREATE TABLE IF NOT EXISTS preset_tactics (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  formation VARCHAR(50) NOT NULL,
  playstyle VARCHAR(100) NOT NULL,
  tactic_data JSONB NOT NULL,
  tags TEXT[],
  description TEXT,
  difficulty_level VARCHAR(50),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User favorites table
CREATE TABLE IF NOT EXISTS user_favorites (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  tactic_id UUID REFERENCES saved_tactics(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, tactic_id)
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_saved_tactics_user_id ON saved_tactics(user_id);
CREATE INDEX IF NOT EXISTS idx_saved_tactics_formation ON saved_tactics(formation);
CREATE INDEX IF NOT EXISTS idx_saved_tactics_playstyle ON saved_tactics(playstyle);
CREATE INDEX IF NOT EXISTS idx_saved_tactics_is_public ON saved_tactics(is_public);
CREATE INDEX IF NOT EXISTS idx_preset_tactics_formation ON preset_tactics(formation);
CREATE INDEX IF NOT EXISTS idx_user_favorites_user_id ON user_favorites(user_id);

-- Row Level Security (RLS) policies
ALTER TABLE saved_tactics ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_favorites ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view their own tactics
CREATE POLICY "Users can view own tactics"
  ON saved_tactics FOR SELECT
  USING (auth.uid() = user_id OR is_public = TRUE);

-- Policy: Users can insert their own tactics
CREATE POLICY "Users can insert own tactics"
  ON saved_tactics FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Policy: Users can update their own tactics
CREATE POLICY "Users can update own tactics"
  ON saved_tactics FOR UPDATE
  USING (auth.uid() = user_id);

-- Policy: Users can delete their own tactics
CREATE POLICY "Users can delete own tactics"
  ON saved_tactics FOR DELETE
  USING (auth.uid() = user_id);

-- Policy: Users can manage their own favorites
CREATE POLICY "Users can manage own favorites"
  ON user_favorites FOR ALL
  USING (auth.uid() = user_id);

-- Insert sample preset tactics
INSERT INTO preset_tactics (id, name, formation, playstyle, tactic_data, tags, description, difficulty_level)
VALUES
  ('preset_1', '4-3-3 Possession Master', '4-3-3', 'Possession Game', '{}', ARRAY['META', 'ADVANCED', 'BALANCED'], 'Classic possession-based 4-3-3 for controlling the game', 'Advanced'),
  ('preset_2', '5-2-1-2 Counter Attack', '5-2-1-2', 'Quick Counter', '{}', ARRAY['BEGINNER', 'DEFENSIVE'], 'Solid defensive setup perfect for counter-attacking', 'Beginner'),
  ('preset_3', '4-2-3-1 Balanced', '4-2-3-1', 'Possession Game', '{}', ARRAY['META', 'BEGINNER', 'BALANCED'], 'Most popular formation with excellent balance', 'Beginner'),
  ('preset_4', '3-4-2-1 Wing Attack', '3-4-2-1', 'Out Wide', '{}', ARRAY['ADVANCED', 'ATTACKING'], 'Attacking formation focused on wing play', 'Advanced'),
  ('preset_5', '4-4-2 Long Ball', '4-4-2', 'Long Ball Counter', '{}', ARRAY['BEGINNER', 'DEFENSIVE'], 'Simple and effective long ball tactics', 'Beginner')
ON CONFLICT (id) DO NOTHING;

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-update updated_at
CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_saved_tactics_updated_at
  BEFORE UPDATE ON saved_tactics
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
