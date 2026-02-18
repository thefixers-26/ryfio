
-- Visitor counter table (single row, public read, function-only write)
CREATE TABLE public.visitor_counter (
  id int PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  count bigint NOT NULL DEFAULT 0,
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Seed with initial count
INSERT INTO public.visitor_counter (id, count) VALUES (1, 1276);

-- Enable RLS
ALTER TABLE public.visitor_counter ENABLE ROW LEVEL SECURITY;

-- Anyone can read the counter
CREATE POLICY "Public read visitor counter"
  ON public.visitor_counter FOR SELECT
  USING (true);

-- No direct insert/update/delete from clients
-- Only edge function (service role) can update
