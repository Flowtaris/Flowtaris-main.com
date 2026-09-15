const { createClient } = require('@supabase/supabase-js');
const url = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://xmtcmqdttzbvqvhcsnlf.supabase.co';
const key = process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhtdGNtcWR0dHpidnF2aGNzbmxmIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NzA3ODQwNCwiZXhwIjoyMTAyNjU0NDA0fQ.baDvbRksRXAoMrpMDsU4VWIkTml79cjTvQ_JzbM3um8';

const supabase = createClient(url, key);

async function run() {
  const { data: currentConfig } = await supabase.from('site_config').select('id').limit(1).single();
  const id = currentConfig?.id || '00000000-0000-0000-0000-000000000001';
  
  // Set capability_details_config to an empty object to reset all capabilities to their hardcoded defaults
  const { error } = await supabase.from('site_config').update({ capability_details_config: {} }).eq('id', id);
  if (error) {
    console.error('Error:', error);
  } else {
    console.log('Successfully reset capability_details_config in DB.');
  }
}
run();
