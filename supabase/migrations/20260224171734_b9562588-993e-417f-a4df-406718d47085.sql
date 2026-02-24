
-- Create atomic increment function for visitor counter
CREATE OR REPLACE FUNCTION public.increment_visitor_count()
RETURNS bigint
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  new_count bigint;
BEGIN
  UPDATE visitor_counter
  SET count = count + 1, updated_at = now()
  WHERE id = 1
  RETURNING count INTO new_count;
  RETURN new_count;
END;
$$;
