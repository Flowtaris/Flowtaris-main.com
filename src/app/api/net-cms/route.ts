import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL_NET || '';
const supabaseKey = process.env.SUPABASE_SERVICE_KEY_NET || '';

export async function GET() {
  try {
    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({ error: 'Missing credentials for .net' }, { status: 500 });
    }

    const client = createClient(supabaseUrl, supabaseKey);
    const { data, error } = await client.from('page_content').select('*').eq('id', 'net-cms').single();

    if (data && data.content) {
      return NextResponse.json(data.content);
    }

    // Fallback: fetch default from GitHub if DB is empty
    const fallbackRes = await fetch('https://raw.githubusercontent.com/Flowtaris/net_flowtaris/main/src/data/cms.json');
    if (fallbackRes.ok) {
      const fallbackData = await fallbackRes.json();
      return NextResponse.json(fallbackData);
    }

    return NextResponse.json({ error: 'No data found' }, { status: 404 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to read CMS data' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const content = await request.json();
    
    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({ error: 'Missing credentials for .net' }, { status: 500 });
    }

    const client = createClient(supabaseUrl, supabaseKey);
    const { error } = await client.from('page_content').upsert({
      id: 'net-cms',
      content: content,
      updated_at: new Date().toISOString()
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save CMS data' }, { status: 500 });
  }
}
