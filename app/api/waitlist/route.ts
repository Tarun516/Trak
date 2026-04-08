import { ensureTrackingTables, getDb } from '@/lib/db'

export async function POST(request: Request) {
  try {
    const { name, contact } = await request.json()

    if (!name || !contact) {
      return Response.json(
        { error: 'name and contact are required' },
        { status: 400 }
      )
    }

    await ensureTrackingTables()
    const db = getDb()
    const result = await db.query(
      `
        INSERT INTO waitlist_signups (name, contact)
        VALUES ($1, $2)
        ON CONFLICT (contact)
        DO UPDATE SET name = EXCLUDED.name, updated_at = NOW()
        RETURNING id, name, contact, created_at, updated_at;
      `,
      [name, contact]
    )

    return Response.json({ success: true, data: result.rows[0] }, { status: 201 })
  } catch (error) {
    console.error('Waitlist error:', error)
    return Response.json(
      { error: 'Failed to join waitlist' },
      { status: 500 }
    )
  }
}
