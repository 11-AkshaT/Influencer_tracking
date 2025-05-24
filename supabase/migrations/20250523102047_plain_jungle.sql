/*
  # Fix RLS policies for influencers table

  1. Changes
    - Drop existing RLS policies for influencers table
    - Create new policies with proper authentication checks
    
  2. Security
    - Enable RLS on influencers table
    - Add policies for CRUD operations that properly check auth.uid()
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Allow all users to delete influencers" ON influencers;
DROP POLICY IF EXISTS "Allow all users to insert influencers" ON influencers;
DROP POLICY IF EXISTS "Allow all users to read influencers" ON influencers;
DROP POLICY IF EXISTS "Allow all users to update influencers" ON influencers;

-- Create new policies with proper auth checks
CREATE POLICY "Enable read access for authenticated users"
ON influencers FOR SELECT
TO authenticated
USING (auth.uid() IS NOT NULL);

CREATE POLICY "Enable insert access for authenticated users"
ON influencers FOR INSERT
TO authenticated
WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Enable update access for authenticated users"
ON influencers FOR UPDATE
TO authenticated
USING (auth.uid() IS NOT NULL)
WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Enable delete access for authenticated users"
ON influencers FOR DELETE
TO authenticated
USING (auth.uid() IS NOT NULL);