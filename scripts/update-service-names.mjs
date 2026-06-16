import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

// Parse .env.local manually
const envPath = path.resolve('.env.local');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf-8');
  envContent.split('\n').forEach(line => {
    const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
    if (match) {
      const key = match[1];
      let value = match[2] || '';
      // Remove quotes if any
      if (value.startsWith('"') && value.endsWith('"')) {
        value = value.slice(1, -1);
      } else if (value.startsWith("'") && value.endsWith("'")) {
        value = value.slice(1, -1);
      }
      process.env[key] = value;
    }
  });
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
  console.log('Fetching services...');
  const { data: services, error } = await supabase.from('services').select('*');
  
  if (error) {
    console.error('Error fetching services:', error);
    return;
  }

  for (const service of services) {
    let newName = service.name;
    if (service.name.toLowerCase() === 'coupa consulting') {
      newName = 'Coupa Consulting';
    } else if (service.name.toLowerCase() === 'netsuite implementation') {
      newName = 'NetSuite Implementation';
    }

    if (newName !== service.name) {
      console.log(`Updating "${service.name}" -> "${newName}"`);
      const { error: updateError } = await supabase
        .from('services')
        .update({ name: newName })
        .eq('id', service.id);
      
      if (updateError) {
        console.error(`Error updating "${service.name}":`, updateError);
      } else {
        console.log(`Updated "${service.name}" successfully`);
      }
    }
  }
}

run();
