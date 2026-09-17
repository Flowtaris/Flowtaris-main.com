import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { revalidatePath } from 'next/cache';

const CMS_FILE_PATH = path.join(process.cwd(), 'src', 'data', 'cms.json');

export async function GET() {
  try {
    const fileContents = fs.readFileSync(CMS_FILE_PATH, 'utf8');
    const data = JSON.parse(fileContents);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to read CMS data' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Save to the JSON file
    fs.writeFileSync(CMS_FILE_PATH, JSON.stringify(data, null, 2), 'utf8');
    
    // Force Next.js to revalidate the home page so changes show instantly
    revalidatePath('/');
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save CMS data' }, { status: 500 });
  }
}
