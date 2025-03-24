"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { nhost } from "@/lib/nhost";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Mail, Lock, ToggleLeft as Google, Facebook } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  // États pour gérer le formulaire et le chargement
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const router = useRouter();
  const { toast } = useToast();

  // Fonction de connexion par email/mot de passe
  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { session, error } = await nhost.auth.signIn({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      if (session) {
        toast({
          title: "Connexion réussie",
          description: "Vous allez être redirigé vers votre tableau de bord",
        });
        router.push("/dashboard");
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erreur de connexion",
        description: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Fonction de connexion avec Google
  const handleGoogleLogin = async () => {
    try {
      const { error } = await nhost.auth.signIn({
        provider: "google",
      });

      if (error) {
        throw error;
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erreur de connexion Google",
        description: error.message,
      });
    }
  };

  // Fonction de connexion avec Facebook
  const handleFacebookLogin = async () => {
    try {
      const { error } = await nhost.auth.signIn({
        provider: "facebook",
      });

      if (error) {
        throw error;
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erreur de connexion Facebook",
        description: error.message,
      });
    }
  };

  return (
    <div className="container mx-auto flex h-screen items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Connexion</CardTitle>
          <CardDescription>
            Connectez-vous à votre compte EduPass+
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Formulaire de connexion par email */}
          <form onSubmit={handleEmailLogin} className="space-y-4">
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
                />
              </div>
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Connexion..." : "Se connecter"}
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Ou continuer avec
              </span>
            </div>
          </div>

          {/* Boutons de connexion sociale */}
          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" onClick={handleGoogleLogin}>
              <Google className="mr-2 h-4 w-4" />
              Google
            </Button>
            <Button variant="outline" onClick={handleFacebookLogin}>
              <Facebook className="mr-2 h-4 w-4" />
              Facebook
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex flex-wrap items-center justify-between gap-2">
          <div className="text-sm text-muted-foreground">
            Pas encore de compte ?{" "}
            <Link href="/auth/register" className="text-primary underline-offset-4 hover:underline">
              S'inscrire
            </Link>
          </div>
          <Link
            href="/auth/reset-password"
            className="text-sm text-primary underline-offset-4 hover:underline"
          >
            Mot de passe oublié ?
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}