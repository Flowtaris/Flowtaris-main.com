import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

function getAiClient() {
  const url = process.env.SUPABASE_URL_AI ?? "";
  const key = process.env.SUPABASE_SERVICE_KEY_AI ?? "";
  if (!url || !key) return null;
  return createClient(url, key);
}

export async function GET(_req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const client = getAiClient();
  if (!client) return NextResponse.json({ error: "Missing AI credentials" }, { status: 500 });
  const params = await ctx.params;
  const { data, error } = await client.from("insights").select("*").eq("id", params.id).single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data });
}

export async function PUT(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const client = getAiClient();
  if (!client) return NextResponse.json({ error: "Missing AI credentials" }, { status: 500 });
  const body = await req.json();
  const params = await ctx.params;
  const { data, error } = await client.from("insights").update(body).eq("id", params.id).select();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data });
}

export async function DELETE(_req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const client = getAiClient();
  if (!client) return NextResponse.json({ error: "Missing AI credentials" }, { status: 500 });
  const params = await ctx.params;
  const { error } = await client.from("insights").delete().eq("id", params.id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}