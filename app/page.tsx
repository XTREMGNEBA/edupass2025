"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useImageExistence } from "@/hooks/useImageExistence";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { QrCode, Wallet, Bell, Star, MessageCircle } from "lucide-react";
import { Footer } from "@/components/footer";
import Image from "next/image";

export default function Home() {
  const bgImage = useImageExistence(
    "/images/bg/bg01.png",
    "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1920"
  );
  const bgImage1 = useImageExistence(
    "/images/badge/badge02.png",
    "https://images.unsplash.com/photo-1522252234503-e356532cafd5?w=500&h=300&fit=crop"
  );
  const bgImage2 = useImageExistence(
    "/images/cantine/cantine01.png",
    "https://images.unsplash.com/photo-1544025162-d76694265947?w=500&h=300&fit=crop"
  );
  const bgImage3 = useImageExistence(
    "/images/transport/bus01.png",
    "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=500&h=300&fit=crop"
  );


  return (
    <>
      <div className="relative">
        {/* Hero Section */}

        <section className="relative py-20 text-center">
        <div className="absolute inset-0 z-0">
          <Image
            src={bgImage}
            alt="École connectée"
            width={1920}
            height={1080}
            className="object-cover w-full h-full brightness-50"
            priority
          />
        </div>


          <div className="container relative z-10">
            <div className="max-w-3xl mx-auto text-white">
              <h1 className="text-4xl font-bold mb-6 md:text-6xl">
                Bienvenue sur EduPass+ by T. Gogo
              </h1>
              <p className="text-xl mb-8 text-gray-200">
                Votre badge, votre clé pour une école connectée, sans argent liquide
              </p>
              <div className="flex justify-center gap-4">
                <Button size="lg" variant="default">
                  Découvrir
                </Button>
                <Button size="lg" variant="outline" className="bg-white/10 backdrop-blur-sm hover:bg-white/20">
                  Nous contacter
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="px-20 py-20 bg-background">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-12">Nos Fonctionnalités</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <QrCode className="h-8 w-8 mb-2 text-primary" />
                  <CardTitle>Badge Intelligent</CardTitle>
                  <CardDescription>Un seul badge pour tous les services</CardDescription>
                </CardHeader>
                <CardContent>
                  <Image
                    src={bgImage1}
                    alt="Badge QR Code"
                    width={350}
                    height={250}
                    className="rounded-lg w-64 h-64   mx-auto"
                  />
                  <p className="text-sm text-muted-foreground">
                    Accédez à la cantine, aux transports et plus encore avec un seul badge sécurisé.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Wallet className="h-8 w-8 mb-2 text-primary" />
                  <CardTitle>Cantine Connectée</CardTitle>
                  <CardDescription>Réservation et paiement simplifiés</CardDescription>
                </CardHeader>
                <CardContent>
                  <Image
                    src={bgImage2}
                    alt="Cantine scolaire"
                    width={350}
                    height={250}
                    className="rounded-lg w-64 h-64   mx-auto"
                  />
                  <p className="text-sm text-muted-foreground">
                    Réservez les repas et gérez le solde en quelques clics.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Bell className="h-8 w-8 mb-2 text-primary" />
                  <CardTitle>Transport Scolaire</CardTitle>
                  <CardDescription>Suivi en temps réel</CardDescription>
                </CardHeader>
                <CardContent>
                  <Image
                    src= {bgImage3}
                    alt="Bus scolaire"
                    width={350}
                    height={250}
                    className="rounded-lg w-64 h-64   mx-auto"
                  />
                  <p className="text-sm text-muted-foreground">
                    Suivez les bus en temps réel et recevez des notifications.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-20">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-12">Ce qu'en pensent nos utilisateurs</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <Card key={i}>
                  <CardContent className="pt-6">
                    <div className="flex items-center mb-4">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className="h-5 w-5 fill-primary text-primary"
                        />
                      ))}
                    </div>
                    <p className="mb-4">
                      "EduPass+ a vraiment simplifié notre quotidien. Plus besoin de gérer l'argent liquide !"
                    </p>
                    <p className="text-sm font-semibold">Parent d'élève</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="text-center mt-8">
              <Button>
                <MessageCircle className="mr-2 h-4 w-4" />
                Ajouter un avis
              </Button>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-20 bg-accent">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-12">Questions Fréquentes</h2>
            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger>Comment fonctionne le badge ?</AccordionTrigger>
                  <AccordionContent>
                    Le badge utilise la technologie NFC et QR Code pour un accès sécurisé à tous les services de l'école.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>Comment recharger le compte ?</AccordionTrigger>
                  <AccordionContent>
                    Vous pouvez recharger le compte en ligne par carte bancaire ou par virement bancaire.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
  <AccordionTrigger>Que faire en cas de perte du badge ?</AccordionTrigger>
  <AccordionContent>
    Contactez immédiatement l'administration pour bloquer le badge et en obtenir un nouveau.
    La réfection du badge coûte 1000 FCFA.
  </AccordionContent>
</AccordionItem>

              </Accordion>
            </div>
          </div>
        </section>

{/* Pricing Section */}
<section id="pricing" className="px-20 py-20 bg-background">
  <div className="container">
    <h2 className="text-3xl font-bold text-center mb-12">Les tarifs</h2>
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {/* Plan Basique */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl text-center">Plan Basique</CardTitle>
          <p className="text-3xl font-bold text-center text-primary">5 000 FCFA</p>
          <CardDescription className="text-center">Accès aux fonctionnalités essentielles</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm">
            <li>✔ Accès à la cantine</li>
            <li>✔ Transport scolaire</li>
            <li>❌ Notifications en temps réel</li>
            <li>❌ Assistance prioritaire</li>
          </ul>
          <Button className="w-full mt-4">Choisir ce plan</Button>
        </CardContent>
      </Card>

      {/* Plan Standard */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl text-center">Plan Standard</CardTitle>
          <p className="text-3xl font-bold text-center text-primary">10 000 FCFA</p>
          <CardDescription className="text-center">Toutes les fonctionnalités courantes</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm">
            <li>✔ Accès à la cantine</li>
            <li>✔ Transport scolaire</li>
            <li>✔ Notifications en temps réel</li>
            <li>❌ Assistance prioritaire</li>
          </ul>
          <Button className="w-full mt-4">Choisir ce plan</Button>
        </CardContent>
      </Card>

      {/* Plan Premium */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl text-center">Plan Premium</CardTitle>
          <p className="text-3xl font-bold text-center text-primary">15 000 FCFA</p>
          <CardDescription className="text-center">Expérience complète et assistance prioritaire</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm">
            <li>✔ Accès à la cantine</li>
            <li>✔ Transport scolaire</li>
            <li>✔ Notifications en temps réel</li>
            <li>✔ Assistance prioritaire 24/7</li>
          </ul>
          <Button className="w-full mt-4">Choisir ce plan</Button>
        </CardContent>
      </Card>
    </div>
  </div>
</section>


        {/* Contact Section */}
        <section id="contact" className="py-20">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-12">Contactez-nous</h2>
            <div className="max-w-md mx-auto">
              <Card>
                <CardContent className="pt-6">
                  <form className="space-y-4">
                    <div>
                      <Input placeholder="Nom" />
                    </div>
                    <div>
                      <Input type="email" placeholder="Email" />
                    </div>
                    <div>
                      <Textarea placeholder="Message" className="min-h-[100px]" />
                    </div>
                    <Button className="w-full">Envoyer</Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

      </div>
      <Footer />
    </>
  );
}
