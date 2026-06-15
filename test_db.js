const { createClient } = require('@supabase/supabase-js')

const supabase = createClient(
  'https://mvymhdaepjrepznyhndx.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im12eW1oZGFlcGpyZXB6bnlobmR4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEzMzIxMjcsImV4cCI6MjA5NjkwODEyN30.ZVG467euAEvmBGpIn0z18goDOYc72pDc1PcIdQg598M'
)

async function test() {
  const { data, error } = await supabase.from('case_studies').insert([{ title: 'gvdfh', slug: 'case-studies-gvdfh' }]).select()
  console.log('Error:', error)
  console.log('Data:', data)
}

test()
