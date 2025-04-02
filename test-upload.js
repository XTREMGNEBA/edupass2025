  
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

// Configuration

// Configuration
const SUPABASE_URL = 'https://xnnaawpqfmpzilahrdgt.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhubmFhd3BxZm1wemlsYWhyZGd0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMxNjU2NDUsImV4cCI6MjA1ODc0MTY0NX0.skr_iYUsy2rU1WLSjRwZjyqvucMglLsux46DEQ9dq1Q';

async function testUpload() {
  const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
  const filePath = path.join('public', 'images', 'logo', 'test-avatar.png');

  try {
    // 1. Vérification du fichier
    if (!fs.existsSync(filePath)) {
      throw new Error(`Fichier introuvable: ${filePath}`);
    }

    // 2. Préparation du fichier
    const fileBuffer = fs.readFileSync(filePath);
    const fileName = `avatar-test-${Date.now()}.png`;
    const fileType = 'image/png';

    console.log('ℹ️ Fichier prêt:', {
      path: filePath,
      size: fileBuffer.length,
      type: fileType
    });

    // 3. Upload avec contournement du problème de version
    console.log('⬆️ Tentative d\'upload (méthode alternative)...');
    
    // Solution alternative: utiliser l'API REST directement
    const formData = new FormData();
    formData.append('file', new Blob([fileBuffer]), fileName);

    const response = await fetch(`${SUPABASE_URL}/storage/v1/object/avatars/${fileName}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'multipart/form-data'
      },
      body: formData
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Échec de l\'upload');
    }

    const data = await response.json();
    console.log('✅ Upload réussi! (méthode alternative)', data);

    // 4. Nettoyage
    await supabase.storage.from('avatars').remove([fileName]);
    console.log('🧹 Fichier test supprimé');

    return data;

  } catch (error) {
    console.error('❌ Erreur technique critique:', {
      message: error.message,
      details: error.stack
    });

    // Solution de dernier recours
    console.log('\n⚙️ Tentative de solution radicale:');
    console.log('1. Allez dans Supabase Dashboard > Storage');
    console.log('2. Créez un NOUVEAU bucket "avatars-v2"');
    console.log('3. Réessayez avec le nouveau bucket');

    process.exit(1);
  }
}

// Exécution
testUpload()
  .then(() => console.log('🎉 Test complété avec succès!'))
  .catch(() => process.exit(1));