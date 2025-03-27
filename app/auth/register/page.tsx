// app/auth/register/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";

const roles = [
  "Admin",
  "Responsable cantine",
  "Responsable finance",
  "Responsable logistique",
  "Responsable administratif",
  "Parent",
  "Student",
  "Responsable transport"
] as const;

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    role: 'Parent'
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({
    email: '',
    phone: '',
    password: ''
  });

  const router = useRouter();
  const { toast } = useToast();

  const validateForm = () => {
    const newErrors = { email: '', phone: '', password: '' };
    let isValid = true;

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email invalide';
      isValid = false;
    }

    if (!/^\+?[\d\s-]{10,}$/.test(formData.phoneNumber)) {
      newErrors.phone = 'Format: +33 6 12 34 56 78';
      isValid = false;
    }

    if (formData.password.length < 6) {
      newErrors.password = '6 caractères minimum';
      isValid = false;
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.password = 'Les mots de passe ne correspondent pas';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      // 1. Vérifier l'unicité email/téléphone
      const { data: existingUser } = await supabase
        .from('profiles')
        .select('email, phoneNumber')
        .or(`email.eq.${formData.email},phoneNumber.eq.${formData.phoneNumber}`)
        .maybeSingle();

      if (existingUser) {
        throw existingUser.email === formData.email
          ? new Error('EMAIL_EXISTS')
          : new Error('PHONE_EXISTS');
      }

      // 2. Créer le compte Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            first_name: formData.firstName,
            last_name: formData.lastName,
            role: formData.role,
            phone: formData.phoneNumber // Stocké dans user_metadata
          }
        }
      });

      if (authError) throw authError;

      // 3. Créer le profil (avec téléphone)
      if (authData.user) {
        await supabase.from('profiles').upsert({
          id: authData.user.id,
          email: formData.email,
          first_name: formData.firstName,
          last_name: formData.lastName,
          phoneNumber: formData.phoneNumber, // Stocké dans profiles
          role: formData.role
        });

        // 4. FORCER l'update du phone dans auth.users (solution garantie)
        await supabase.rpc('update_user_phone', {
          user_id: authData.user.id,
          phone: formData.phoneNumber
        });
      }

      toast({
        title: "✅ Inscription réussie",
        description: `Un email de confirmation a été envoyé à ${formData.email}`
      });
      setTimeout(() => router.push("/auth/login"), 2000);

    } catch (error: any) {
      const errorMessages = {
        EMAIL_EXISTS: "Email déjà utilisé",
        PHONE_EXISTS: "Téléphone déjà enregistré",
        'User already registered': "Compte existant",
        'Email rate limit exceeded': "Trop de tentatives - patientez 5 min"
      } as const;

      const message = error.message in errorMessages
        ? errorMessages[error.message as keyof typeof errorMessages]
        : "Erreur lors de l'inscription";

      toast({
        variant: "destructive",
        title: "Erreur",
        description: message
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto flex h-screen items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Créer un compte</CardTitle>
          <CardDescription>Rejoignez notre plateforme</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">Prénom *</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                  required
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Nom *</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
                disabled={isLoading}
              />
              {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phoneNumber">Téléphone *</Label>
              <Input
                id="phoneNumber"
                type="tel"
                placeholder="+33 6 12 34 56 78"
                value={formData.phoneNumber}
                onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})}
                required
                disabled={isLoading}
              />
              {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">Rôle *</Label>
              <select
                id="role"
                value={formData.role}
                onChange={(e) => setFormData({...formData, role: e.target.value as typeof roles[number]})}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:opacity-50"
                required
                disabled={isLoading}
              >
                {roles.map((role) => (
                  <option key={role} value={role}>{role}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Mot de passe *</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                required
                minLength={6}
                disabled={isLoading}
              />
              {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirmation *</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                required
                disabled={isLoading}
              />
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Inscription en cours..." : "S'inscrire"}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex justify-center">
          <p className="text-sm text-muted-foreground">
            Déjà un compte?{" "}
            <Link href="/auth/login" className="text-primary underline hover:underline">
              Se connecter
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
