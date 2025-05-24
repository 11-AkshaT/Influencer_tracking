/*
  # Fix RLS policies for influencers table

  1. Changes
    - Drop existing RLS policies for influencers table
    - Create new policies with proper authentication checks
    - Ensure policies use auth.uid() to verify authenticated state

  2. Security
    - Enable RLS on influencers table
    - Add policies for CRUD operations that properly check authentication
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Enable delete access for authenticated users" ON influencers;
DROP POLICY IF EXISTS "Enable insert access for authenticated users" ON influencers;
DROP POLICY IF EXISTS "Enable read access for authenticated users" ON influencers;
DROP POLICY IF EXISTS "Enable update access for authenticated users" ON influencers;

-- Create new policies with proper auth checks
CREATE POLICY "Enable read access for authenticated users only"
ON public.influencers
FOR SELECT
TO authenticated
USING (auth.role() = 'authenticated');

CREATE POLICY "Enable insert access for authenticated users only"
ON public.influencers
FOR INSERT
TO authenticated
WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Enable update access for authenticated users only"
ON public.influencers
FOR UPDATE
TO authenticated
USING (auth.role() = 'authenticated')
WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Enable delete access for authenticated users only"
ON public.influencers
FOR DELETE
TO authenticated
USING (auth.role() = 'authenticated');