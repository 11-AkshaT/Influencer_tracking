/*
  # Create influencers and video_posts tables

  1. New Tables
    - `influencers`
      - `id` (uuid, primary key)
      - `username` (text, required)
      - `profile_url` (text, required)
      - `platform` (text, required)
      - `views_median` (integer, required)
      - `total_views` (integer, required)
      - `current_views` (integer)
      - `status` (text, required)
      - `is_paid` (boolean)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

    - `video_posts`
      - `id` (uuid, primary key)
      - `influencer_id` (uuid, foreign key)
      - `url` (text)
      - `posted_date` (date)
      - `views_count` (integer)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on both tables
    - Add policies for authenticated users to perform CRUD operations
*/

-- Create influencers table
CREATE TABLE IF NOT EXISTS influencers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  username text NOT NULL,
  profile_url text NOT NULL,
  platform text NOT NULL CHECK (platform IN ('Instagram', 'TikTok', 'Both')),
  views_median integer NOT NULL,
  total_views integer NOT NULL,
  current_views integer DEFAULT 0,
  status text NOT NULL CHECK (status IN ('Posted', 'Script Needed', 'Approval Needed')),
  is_paid boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create video_posts table
CREATE TABLE IF NOT EXISTS video_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  influencer_id uuid REFERENCES influencers(id) ON DELETE CASCADE,
  url text,
  posted_date date,
  views_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE influencers ENABLE ROW LEVEL SECURITY;
ALTER TABLE video_posts ENABLE ROW LEVEL SECURITY;

-- Create policies for influencers
CREATE POLICY "Allow all users to read influencers"
  ON influencers
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow all users to insert influencers"
  ON influencers
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow all users to update influencers"
  ON influencers
  FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Allow all users to delete influencers"
  ON influencers
  FOR DELETE
  TO authenticated
  USING (true);

-- Create policies for video_posts
CREATE POLICY "Allow all users to read video_posts"
  ON video_posts
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow all users to insert video_posts"
  ON video_posts
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow all users to update video_posts"
  ON video_posts
  FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Allow all users to delete video_posts"
  ON video_posts
  FOR DELETE
  TO authenticated
  USING (true);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_influencers_updated_at
  BEFORE UPDATE ON influencers
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_video_posts_updated_at
  BEFORE UPDATE ON video_posts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();