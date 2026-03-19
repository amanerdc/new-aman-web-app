-- ============================================================================
-- SUPABASE MIGRATIONS FOR BROKERAGE ENTITY
-- ============================================================================
-- Run these migrations in order in your Supabase SQL Editor
-- ============================================================================

-- ============================================================================
-- MIGRATION 1: Create brokerages table
-- ============================================================================
CREATE TABLE IF NOT EXISTS brokerages (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  head_broker TEXT NOT NULL DEFAULT '',
  contact_no TEXT NOT NULL DEFAULT '',
  team TEXT NOT NULL CHECK (team IN ('alpha', 'mavericks', 'titans')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create trigger for updated_at
CREATE OR REPLACE FUNCTION update_brokerages_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_brokerages_updated_at_trigger ON brokerages;

CREATE TRIGGER update_brokerages_updated_at_trigger
BEFORE UPDATE ON brokerages
FOR EACH ROW
EXECUTE FUNCTION update_brokerages_updated_at();

-- ============================================================================
-- MIGRATION 2: Modify agents table - Add new columns
-- ============================================================================
ALTER TABLE agents ADD COLUMN IF NOT EXISTS email TEXT DEFAULT '';
ALTER TABLE agents ADD COLUMN IF NOT EXISTS contact_no TEXT DEFAULT '';
ALTER TABLE agents ADD COLUMN IF NOT EXISTS brokerage_id TEXT;

-- Add foreign key constraint
ALTER TABLE agents ADD CONSTRAINT agents_brokerage_id_fk 
FOREIGN KEY (brokerage_id) REFERENCES brokerages(id) ON DELETE RESTRICT;

-- ============================================================================
-- MIGRATION 3: Populate initial brokerages data
-- ============================================================================
INSERT INTO brokerages (id, name, head_broker, contact_no, team) VALUES
-- Alpha Team
('a10', 'Aces & B Realty', '', '', 'alpha'),
('a20', 'Audjean Realty', 'Armando L. Aman', '', 'alpha'),
('a30', 'Deocrats Realty', 'Angelica S. De Castro', '', 'alpha'),
('a40', 'Dezhomes Realty', '', '', 'alpha'),
('a50', 'Red Zeal Realty', 'Roden A. Rojo', '', 'alpha'),
('a60', 'Sweetville Realty', 'Allan D. Remoquillo', '', 'alpha'),
('a70', 'Viva Realm Realty', 'Viva Francia A. Rojo', '', 'alpha'),
('a80', 'Cariaga Realty', 'Rowella P. Cariaga', '', 'alpha'),
('a90', 'Giya Realty Services', 'Maricel B. Adan', '', 'alpha'),
-- Mavericks Team
('m10', 'De Laber Realty & Marketing Enterprises', 'Cynthia B. De las Alas', '', 'mavericks'),
('m20', 'Adeg & Co.REB', 'Edna C. De Chavez', '', 'mavericks'),
('m30', 'Olaño Realty', 'Elena P. Barde', '', 'mavericks'),
-- Titans Team
('t10', 'Young Achievers'' Realty', 'Jerwin A. Rojo', '', 'titans'),
('t20', 'K-rgealty', '', '', 'titans'),
('t30', 'EDP968 Real Estate Services', '', '', 'titans'),
('t40', 'CMR REALTY SERVICES', 'Regina C. Raynera', '', 'titans')
ON CONFLICT (id) DO NOTHING;

-- ============================================================================
-- MIGRATION 4: Migrate existing brokerage names to foreign keys
-- ============================================================================
UPDATE agents SET brokerage_id = 'a10' WHERE brokerage = 'Aces & B Realty';
UPDATE agents SET brokerage_id = 'a20' WHERE brokerage = 'Audjean Realty';
UPDATE agents SET brokerage_id = 'a30' WHERE brokerage = 'Deocrats Realty';
UPDATE agents SET brokerage_id = 'a40' WHERE brokerage = 'Dezhomes Realty';
UPDATE agents SET brokerage_id = 'a50' WHERE brokerage = 'Red Zeal Realty';
UPDATE agents SET brokerage_id = 'a60' WHERE brokerage = 'Sweetville Realty';
UPDATE agents SET brokerage_id = 'a70' WHERE brokerage = 'Viva Realm Realty';
UPDATE agents SET brokerage_id = 'a80' WHERE brokerage = 'Cariaga Realty';
UPDATE agents SET brokerage_id = 'a90' WHERE brokerage = 'Giya Realty Services';
UPDATE agents SET brokerage_id = 'm10' WHERE brokerage = 'De Laber Realty & Marketing Enterprises';
UPDATE agents SET brokerage_id = 'm20' WHERE brokerage = 'Adeg & Co.REB';
UPDATE agents SET brokerage_id = 'm30' WHERE brokerage = 'Olaño Realty';
UPDATE agents SET brokerage_id = 't10' WHERE brokerage = 'Young Achievers'' Realty';
UPDATE agents SET brokerage_id = 't20' WHERE brokerage = 'K-rgealty';
UPDATE agents SET brokerage_id = 't30' WHERE brokerage = 'EDP968 Real Estate Services';
UPDATE agents SET brokerage_id = 't40' WHERE brokerage = 'CMR REALTY SERVICES';

-- ============================================================================
-- MIGRATION 5: Make brokerage_id NOT NULL and drop old columns
-- ============================================================================
-- First, update any remaining NULL values
UPDATE agents SET brokerage_id = 'a10' WHERE brokerage_id IS NULL;

-- Now add the NOT NULL constraint
ALTER TABLE agents ALTER COLUMN brokerage_id SET NOT NULL;

-- Drop the old columns (only after successful migration)
-- Uncomment these lines after verifying the data migration is complete:
-- ALTER TABLE agents DROP COLUMN brokerage;
-- ALTER TABLE agents DROP COLUMN team;

-- ============================================================================
-- MIGRATION 6 (Optional): Add helper functions
-- ============================================================================
-- Function to get next agent number for a brokerage
CREATE OR REPLACE FUNCTION get_next_agent_number(brokerage_id TEXT)
RETURNS INT AS $$
  SELECT COALESCE(MAX(CAST(SUBSTRING(id FROM POSITION('-' IN id) + 1) AS INT)), 0) + 1
  FROM agents
  WHERE agents.brokerage_id = $1;
$$ LANGUAGE SQL;

-- View to get agent count by brokerage
CREATE OR REPLACE VIEW agent_count_by_brokerage AS
SELECT 
  brokerage_id,
  COUNT(*) as agent_count
FROM agents
GROUP BY brokerage_id;
