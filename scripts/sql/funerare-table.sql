-- Tabel pentru servicii funerare (pompe funebre, cimitire, crematorii)
-- Rulează în Supabase SQL Editor

CREATE TABLE IF NOT EXISTS funerare (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  nume TEXT NOT NULL,
  judet TEXT NOT NULL,
  oras TEXT DEFAULT '',
  adresa TEXT,
  telefon TEXT,
  email TEXT,
  website TEXT,
  descriere TEXT,
  servicii TEXT[],
  tip TEXT NOT NULL DEFAULT 'pompe_funebre', -- pompe_funebre | cimitir | crematoriu
  pret_pornire NUMERIC,
  status TEXT NOT NULL DEFAULT 'approved', -- approved | pending | rejected
  is_premium BOOLEAN NOT NULL DEFAULT false,
  show_in_slider BOOLEAN NOT NULL DEFAULT false,
  highlight TEXT,
  slug TEXT NOT NULL,
  lat NUMERIC,
  lng NUMERIC,
  rating NUMERIC,
  reviews INTEGER,
  place_id TEXT,
  google_url TEXT,
  images TEXT[],
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Indexuri pentru performanță
CREATE INDEX IF NOT EXISTS idx_funerare_judet ON funerare(judet);
CREATE INDEX IF NOT EXISTS idx_funerare_oras ON funerare(oras);
CREATE INDEX IF NOT EXISTS idx_funerare_slug ON funerare(slug);
CREATE INDEX IF NOT EXISTS idx_funerare_status ON funerare(status);
CREATE INDEX IF NOT EXISTS idx_funerare_tip ON funerare(tip);
CREATE INDEX IF NOT EXISTS idx_funerare_judet_tip ON funerare(judet, tip);
CREATE INDEX IF NOT EXISTS idx_funerare_judet_oras ON funerare(judet, oras);
CREATE INDEX IF NOT EXISTS idx_funerare_is_premium ON funerare(is_premium) WHERE is_premium = true;

-- Constraint: slug unic per județ
CREATE UNIQUE INDEX IF NOT EXISTS idx_funerare_judet_slug_unique ON funerare(judet, slug);

-- RLS (Row Level Security) — la fel ca la camine
ALTER TABLE funerare ENABLE ROW LEVEL SECURITY;

-- Politici: oricine poate citi cele approved, doar admin poate modifica
CREATE POLICY "funerare_public_read" ON funerare
  FOR SELECT USING (status = 'approved');

CREATE POLICY "funerare_admin_all" ON funerare
  FOR ALL USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- Trigger pentru updated_at (dacă nu există deja funcția)
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER funerare_updated_at
  BEFORE UPDATE ON funerare
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- Comentariu
COMMENT ON TABLE funerare IS 'Servicii funerare România — pompe funebre, cimitire, crematorii';
