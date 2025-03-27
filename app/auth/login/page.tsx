"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Mail, Lock, Key } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const { toast } = useToast();

  const redirectByRole = (role: string) => {
    const rolePaths: Record<string, string> = {
      'Admin': '/Admin-dev/page.tsx',
      'Responsable cantine': '/cantine/page.tsx',
      'Responsable finance': '/finance/page.tsx',
      'Parent': '/parent/page.tsx',
      'Student': '/student/page.tsx',
      'Responsable logistique': '/logistique/page.tsx',
      'Responsable transport': '/transport/page.tsx',
      'Responsable administratif':  '/administratif/page.tsx',
      'default': '/dashboard'
    };
    return rolePaths[role] || rolePaths.default;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // 1. Connexion avec Supabase Auth
      let authData;
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      authData = data;

      if (error) {
        // Gestion spécifique des erreurs de confirmation email
        if (error.message.includes('not confirmed')) {
          // Tentative de confirmation automatique (mode développement)
          try {
            const { data: userData } = await supabase
              .from('profiles')
              .select('id')
              .eq('email', email)
              .single();

            if (userData?.id) {
              const { error: confirmError } = await supabase.auth.admin.updateUserById(
                userData.id,
                { email_confirm: true }
              );

              if (!confirmError) {
                // Réessaye la connexion après confirmation
                const { data: retryData, error: retryError } = await supabase.auth.signInWithPassword({
                  email,
                  password
                });
                if (retryData) {
                  authData = retryData;
                }
              }
            }
          } catch (adminError) {
            console.error("Auto-confirmation failed:", adminError);
          }
        }

        if (!authData) throw error;
      }

      // 2. Récupération du rôle depuis le profil
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', authData.user?.id)
        .single();

      if (!profile) throw new Error("Profil utilisateur introuvable");

      // 3. Redirection selon le rôle
      router.push(redirectByRole(profile.role));

      toast({
        title: "Connexion réussie",
        description: authData?.user?.email ? `Bienvenue ${authData.user.email}` : "Bienvenue",
      });

    } catch (error: any) {
      console.error("Login error:", error);

      const errorMessages: Record<string, string> = {
        'Invalid login credentials': 'Email ou mot de passe incorrect',
        'Email not confirmed': 'Veuillez vérifier vos emails pour confirmer votre compte',
        'default': error.message || 'Erreur de connexion'
      };

      toast({
        variant: "destructive",
        title: "Erreur",
        description: errorMessages[error.message] || errorMessages.default,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleOAuthLogin = async (provider: 'google' | 'facebook') => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${location.origin}/auth/callback`
        }
      });

      if (error) throw error;

    } catch (error: any) {
      toast({
        variant: "destructive",
        title: `Erreur de connexion ${provider}`,
        description: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto flex h-screen items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Connexion</CardTitle>
          <CardDescription>Accédez à votre compte EduPass+</CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="exemple@email.com"
                  className="pl-10"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Mot de passe</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  className="pl-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Connexion..." : "Se connecter"}
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Ou continuer avec
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button
              variant="outline"
              onClick={() => handleOAuthLogin('google')}
              disabled={isLoading}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mr-2 h-4 w-4"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
              </svg>
              Google
            </Button>

            <Button
              variant="outline"
              onClick={() => handleOAuthLogin('facebook')}
              disabled={isLoading}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mr-2 h-4 w-4"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
              </svg>
              Facebook
            </Button>
          </div>
        </CardContent>

        <CardFooter className="flex flex-wrap justify-between gap-2">
          <Link href="/auth/register" className="text-sm text-primary underline-offset-4 hover:underline">
            Créer un compte
          </Link>
          <Link href="/auth/reset-password" className="text-sm text-primary underline-offset-4 hover:underline">
            <Key className="inline mr-1 h-4 w-4" />
            Mot de passe oublié ?
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
