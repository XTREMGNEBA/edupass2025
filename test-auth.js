const { createClient } = require('@supabase/supabase-js');

// Configuration avec clé de service
const SUPABASE_URL = 'https://esjalhkarxyqcjfdvspt.supabase.co';
const SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVzamFsaGthcnh5cWNqZmR2c3B0Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0Mjk5NDI4NSwiZXhwIjoyMDU4NTcwMjg1fQ.qZ-KxhzvpOgGCHmffKhHrq9smhp0PwiZz80xVg7atx4';

async function testAuthFlow() {
  // Client admin pour les opérations privilégiées
  const supabaseAdmin = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });

  // Client normal pour les opérations standard
  const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

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
        phone: '+33612345678'
      },
      emailRedirectTo: 'http://localhost:3000/auth/callback'
    }
  });

  if (signupError) {
    console.error('❌ Signup Error:', signupError.message);
    return;
  }

  console.log('✅ Signup Success!');
  console.log('User ID:', signupData.user?.id);
  console.log('Email:', signupData.user?.email);
  console.log('Phone Metadata:', signupData.user?.user_metadata?.phone);

  // 2. Confirmation forcée du compte
  console.log('\n=== Confirming User Email ===');
  const { data: confirmData, error: confirmError } = await supabaseAdmin.auth.admin.updateUserById(
    signupData.user.id,
    {
      email_confirm: true,
      user_metadata: { ...signupData.user.user_metadata } // Conserve les métadonnées
    }
  );

  if (confirmError) {
    console.error('❌ Confirmation Error:', confirmError.message);
    return;
  }
  console.log('✅ Email confirmed at:', confirmData.user.email_confirmed_at);

  // 3. Test de connexion
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
  console.log('Session Info:', {
    email: loginData.user.email,
    role: loginData.user.user_metadata?.role,
    phone: loginData.user.user_metadata?.phone
  });

  // 4. Vérification dans la table profiles
  console.log('\n=== Checking Profiles Table ===');
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('id, email, first_name, phoneNumber, role')
    .eq('id', loginData.user.id)
    .single();

  if (profileError) {
    console.error('❌ Profile Fetch Error:', profileError.message);
  } else {
    console.log('ℹ️ Profile Data:', {
      email: profile.email,
      first_name: profile.first_name,
      phone: profile.phoneNumber,
      role: profile.role
    });
  }

  // 5. Nettoyage
  console.log('\n=== Cleaning Up ===');
  const { error: deleteError } = await supabaseAdmin.auth.admin.deleteUser(loginData.user.id);

  if (deleteError) {
    console.error('⚠️ Failed to delete user:', deleteError.message);
  } else {
    console.log('🧹 Test user deleted successfully');

    // Suppression supplémentaire de la table profiles si nécessaire
    const { error: profileDeleteError } = await supabase
      .from('profiles')
      .delete()
      .eq('id', loginData.user.id);

    console.log(profileDeleteError
      ? '⚠️ Failed to delete profile'
      : '🧹 Profile deleted');
  }
}

// Exécution avec gestion des erreurs
testAuthFlow()
  .then(() => console.log('\n🎉 Test completed successfully!'))
  .catch((err) => {
    console.error('\n🔥 Test failed:');
    console.error(err);
    process.exit(1);
  });
