import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

function getAiClient() {
  const url = process.env.SUPABASE_URL_AI || "";
  const key = process.env.SUPABASE_SERVICE_KEY_AI || "";
  if (!url || !key) return null;
  return createClient(url, key);
}

export async function GET() {
  const client = getAiClient();
  if (!client) return NextResponse.json({ error: "Missing AI Supabase credentials" }, { status: 500 });
  const { data, error } = await client.from("site_config").select("*").limit(1).single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data ?? {});
}

export async function POST(request: NextRequest) {
  const client = getAiClient();
  if (!client) return NextResponse.json({ error: "Missing AI Supabase credentials" }, { status: 500 });
  try {
    const body = await request.json();
    const { data: current } = await client.from("site_config").select("id").limit(1).single();
    const id = current?.id || "00000000-0000-0000-0000-000000000001";
    const { error } = await client.from("site_config").update(body).eq("id", id);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    try { (revalidateTag as any)("site-config"); } catch {}
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
