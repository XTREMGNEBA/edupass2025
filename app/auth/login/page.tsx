"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Mail, Lock, Key } from "lucide-react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useToast } from "@/components/ui/use-toast";
import { useUser } from "@/contexts/user-context";
import { UserRole, ROLE_ROUTES } from "@/types/user";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  const router = useRouter();
  const { refreshProfile } = useUser();
  const supabase = createClientComponentClient();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data: { user }, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password
      });

      if (error) throw error;
      if (!user) throw new Error("Utilisateur non trouvé");

      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('role, first_name')
        .eq('id', user.id)
        .single();

      if (profileError) throw profileError;

      // Refresh the user profile in context
      await refreshProfile();

      toast({
        title: "Connexion réussie",
        description: `Bienvenue ${profile?.first_name || formData.email}`,
      });

      // Use Next.js router for client-side navigation
      router.push(ROLE_ROUTES[profile?.role as UserRole] || ROLE_ROUTES.STUDENT);
      router.refresh();

    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erreur de connexion",
        description: error.message
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto flex min-h-screen items-center justify-center px-4 py-8">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Image
              src="/images/logo/Logo.png"
              alt="EduPass+ Logo"
              width={80}
              height={80}
              className="h-20 w-auto"
              priority
            />
          </div>
          <CardTitle className="text-2xl">Connexion</CardTitle>
          <CardDescription>Accédez à votre compte EduPass+</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email*</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="exemple@email.com"
                  className="pl-10"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Mot de passe*</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  className="pl-10"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? "Connexion en cours..." : "Se connecter"}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col gap-2 text-center">
          <Link
            href="/auth/register"
            className="text-sm text-primary underline-offset-4 hover:underline"
          >
            Créer un nouveau compte
          </Link>
          <Link
            href="/auth/reset-password"
            className="text-sm text-primary underline-offset-4 hover:underline flex items-center justify-center"
          >
            <Key className="mr-1 h-4 w-4" />
            Mot de passe oublié ?
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
