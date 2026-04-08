import { Pool } from 'pg'

let pool: Pool | null = null
let setupPromise: Promise<void> | null = null

function getConnectionString() {
  return process.env.CUSTOM_DATABASE_URL ?? process.env.DATABASE_URL
}

export function getDb() {
  const connectionString = getConnectionString()

  if (!connectionString) {
    throw new Error('Missing CUSTOM_DATABASE_URL (or DATABASE_URL) environment variable')
  }

  if (!pool) {
    pool = new Pool({
      connectionString,
    })
  }

  return pool
}

export async function ensureTrackingTables() {
  if (setupPromise) {
    return setupPromise
  }

  setupPromise = (async () => {
    const db = getDb()

    await db.query(`
      CREATE TABLE IF NOT EXISTS waitlist_signups (
        id BIGSERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        contact TEXT NOT NULL UNIQUE,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `)

    await db.query(`
      CREATE TABLE IF NOT EXISTS cta_events (
        id BIGSERIAL PRIMARY KEY,
        event_type TEXT NOT NULL,
        source TEXT NOT NULL,
        visitor_contact TEXT,
        metadata JSONB,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `)

    await db.query(`
      CREATE INDEX IF NOT EXISTS idx_cta_events_type_created_at
      ON cta_events (event_type, created_at DESC);
    `)
  })()

  return setupPromise
}
