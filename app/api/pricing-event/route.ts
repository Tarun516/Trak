import { ensureTrackingTables, getDb } from '@/lib/db'

export async function POST(request: Request) {
  try {
    const { eventType, source, contact, metadata } = await request.json()

    if (!eventType || !source) {
      return Response.json(
        { error: 'eventType and source are required' },
        { status: 400 }
      )
    }

    await ensureTrackingTables()
    const db = getDb()
    const result = await db.query(
      `
        INSERT INTO cta_events (event_type, source, visitor_contact, metadata)
        VALUES ($1, $2, $3, $4)
        RETURNING id, event_type, source, visitor_contact, metadata, created_at;
      `,
      [eventType, source, contact ?? null, metadata ?? null]
    )

    return Response.json({ success: true, data: result.rows[0] }, { status: 201 })
  } catch (error) {
    console.error('Pricing event error:', error)
    return Response.json(
      { error: 'Failed to log pricing event' },
      { status: 500 }
    )
  }
}
