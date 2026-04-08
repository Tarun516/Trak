-- Create waitlist table
CREATE TABLE IF NOT EXISTS waitlist (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create pricing interest tracking table
CREATE TABLE IF NOT EXISTS pricing_events (
  id SERIAL PRIMARY KEY,
  event_type VARCHAR(50) NOT NULL,
  email VARCHAR(255),
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Add index for email lookups
CREATE INDEX IF NOT EXISTS idx_waitlist_email ON waitlist(email);
CREATE INDEX IF NOT EXISTS idx_pricing_events_timestamp ON pricing_events(timestamp);
