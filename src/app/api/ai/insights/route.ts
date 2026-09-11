import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

function getAiClient() {
  const url = process.env.SUPABASE_URL_AI ?? "";
  const key = process.env.SUPABASE_SERVICE_KEY_AI ?? "";
  if (!url || !key) return null;
  return createClient(url, key);
}

export async function GET() {
  const client = getAiClient();
  if (!client) return NextResponse.json({ error: "Missing AI credentials" }, { status: 500 });
  const { data, error } = await client.from("insights").select("*").order("created_at", { ascending: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data });
}

export async function POST(req: NextRequest) {
  const client = getAiClient();
  if (!client) return NextResponse.json({ error: "Missing AI credentials" }, { status: 500 });
  const body = await req.json();
  const { data, error } = await client.from("insights").upsert(body).select();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data });
}