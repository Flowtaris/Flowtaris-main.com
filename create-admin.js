const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

// Read and parse .env.local natively so we don't need the dotenv package
const envContent = fs.readFileSync('.env.local', 'utf8');
const envVars = {};
envContent.split('\n').forEach(line => {
  const match = line.match(/^([^=]+)=(.*)$/);
  if (match) envVars[match[1].trim()] = match[2].trim();
});

const supabaseUrl = envVars['NEXT_PUBLIC_SUPABASE_URL'];
const supabaseKey = envVars['SUPABASE_SERVICE_ROLE_KEY'];

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase URL or Service Role Key in .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function createAdminUser() {
  const email = 'saas@gmail.com';
  const password = '123456';

  console.log(`Creating user: ${email}`);

  const { data, error } = await supabase.auth.admin.createUser({
    email: email,
    password: password,
    email_confirm: true
  });

  if (error) {
    console.error("Error creating user:", error.message);
  } else {
    console.log("User created successfully!");
    console.log("ID:", email);
    console.log("Password:", password);
    
    // Attempt to set profile role to admin if there is a profiles table
    try {
      const { error: profileError } = await supabase
        .from('profiles')
        .update({ role: 'super_admin' })
        .eq('id', data.user.id);
      
      if (profileError) {
         // Attempt insert instead
         const { error: insertError } = await supabase
           .from('profiles')
           .insert({ id: data.user.id, role: 'super_admin' });
           
         if (insertError) {
             console.log("Could not set profile role:", insertError.message);
         } else {
             console.log("Profile role set to super_admin.");
         }
      } else {
        console.log("Profile role updated to super_admin.");
      }
    } catch(e) {
      console.log("Could not update profiles table.");
    }
  }
}

createAdminUser();
