const { createClient } = require('@supabase/supabase-js');

// Configuration
const SUPABASE_URL = 'https://esjalhkarxyqcjfdvspt.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVzamFsaGthcnh5cWNqZmR2c3B0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI5OTQyODUsImV4cCI6MjA1ODU3MDI4NX0._Cqv3eIptxYqYY1WL1mVo7tfuudtkiGtOVVvKZY5rgM';

async function testAuthFlow() {
  const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
  const testEmail = `test${Math.floor(Math.random() * 10000)}@gmail.com`;
  const testPassword = 'testpassword123';

  console.log('🔵 Testing with:', testEmail);

  // 1. Test d'inscription
  console.log('\n=== Testing Sign Up ===');
  const { data: signupData, error: signupError } = await supabase.auth.signUp({
    email: testEmail,
    password: testPassword,
    options: {
      data: {
        first_name: 'Test',
        last_name: 'User',
        role: 'Parent',
        phone: '+33612345678' // Ajout du téléphone
      }
    }
  });

  console.log('Supabase URL:', SUPABASE_URL);
  console.log('Supabase Key:', SUPABASE_KEY);

  if (signupError) {
    console.error('❌ Signup Error:', signupError.message);
    console.log('Response:', signupError);
    return;
  }

  console.log('✅ Signup Success!');
  console.log('User ID:', signupData.user?.id);
  console.log('Email:', signupData.user?.email);
  console.log('Phone:', signupData.user?.user_metadata?.phone);

  // 2. Test de connexion
  console.log('\n=== Testing Sign In ===');
  const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
    email: testEmail,
    password: testPassword
  });

  if (loginError) {
    console.error('❌ Login Error:', loginError.message);
    return;
  }

  console.log('✅ Login Success!');
  console.log('Session:', {
    user: loginData.user?.email,
    role: loginData.user?.user_metadata?.role,
    phone: loginData.user?.user_metadata?.phone
  });

  // 3. Vérification dans la table profiles
  console.log('\n=== Checking Profiles Table ===');
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', loginData.user?.id)
    .single();

  if (profileError) {
    console.error('❌ Profile Fetch Error:', profileError.message);
  } else {
    console.log('ℹ️ Profile Data:', {
      email: profile.email,
      first_name: profile.first_name,
      phoneNumber: profile.phoneNumber, // Vérifiez cette colonne
      role: profile.role
    });
  }

  // 4. Nettoyage (optionnel)
  console.log('\n=== Cleaning Up ===');
  const { error: deleteError } = await supabase
    .from('profiles')
    .delete()
    .eq('id', loginData.user?.id);

  if (deleteError) {
    console.error('⚠️ Cleanup Warning:', deleteError.message);
  } else {
    console.log('🧹 Test user deleted from profiles table');
  }
}

// Exécution du test
testAuthFlow()
  .then(() => console.log('\nTest completed!'))
  .catch((err) => console.error('\nTest failed:', err));
