import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export async function GET() {
  try {
    const db = await getDb();

    const [rows] = await db.query(`
      SELECT 
        id_users, 
        username, 
        email,
        role       
      FROM users
      ORDER BY id_users ASC
    `);

    return NextResponse.json({ success: true, data: rows });

  } catch (err) {
    console.error("GET USERS ERROR:", err);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
