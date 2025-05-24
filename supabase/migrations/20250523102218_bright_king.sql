/*
  # Fix RLS policies for influencers table

  1. Changes
    - Drop existing RLS policies that are causing issues
    - Create new, properly configured RLS policies for CRUD operations
    
  2. Security
    - Enable RLS on influencers table (already enabled)
    - Add policies for authenticated users to perform CRUD operations
    - Ensure policies are properly scoped for security
*/

-- Drop existing problematic policies
DROP POLICY IF EXISTS "Enable delete access for authenticated users" ON influencers;
DROP POLICY IF EXISTS "Enable insert access for authenticated users" ON influencers;
DROP POLICY IF EXISTS "Enable read access for authenticated users" ON influencers;
DROP POLICY IF EXISTS "Enable update access for authenticated users" ON influencers;

-- Create new, properly configured policies
CREATE POLICY "Enable read access for authenticated users"
ON public.influencers
FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Enable insert access for authenticated users"
ON public.influencers
FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Enable update access for authenticated users"
ON public.influencers
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "Enable delete access for authenticated users"
ON public.influencers
FOR DELETE
TO authenticated
USING (true);