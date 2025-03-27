"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { QrCode, Wallet, Bell, Star, MessageCircle } from "lucide-react";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <div className="relative">
        {/* Hero Section */}
        <section className="py-20 text-center">
          <div className="container">
            <h1 className="text-4xl font-bold mb-6 md:text-6xl">Bienvenue sur EduPass+ by T. Gogo</h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Votre badge, votre clé pour une école connectée, sans argent liquide
            </p>
            <div className="flex justify-center gap-4">
              <Button size="lg" asChild>
                <a href="#features">Découvrir</a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="#contact">Nous contacter</a>
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-accent">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-12">Nos Fonctionnalités</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card id="badge">
                <CardHeader>
                  <QrCode className="h-8 w-8 mb-2" />
                  <CardTitle>Badge Intelligent</CardTitle>
                  <CardDescription>Un seul badge pour tous les services</CardDescription>
                </CardHeader>
                <CardContent>
                  <img
                    src="https://images.unsplash.com/photo-1522252234503-e356532cafd5?w=500&h=300&fit=crop"
                    alt="Badge QR Code"
                    className="rounded-lg mb-4"
                  />
                  <p className="text-sm text-muted-foreground">
                    Accédez à la cantine, aux transports et plus encore avec un seul badge sécurisé.
                  </p>
                </CardContent>
              </Card>

              <Card id="cantine">
                <CardHeader>
                  <Wallet className="h-8 w-8 mb-2" />
                  <CardTitle>Cantine Connectée</CardTitle>
                  <CardDescription>Réservation et paiement simplifiés</CardDescription>
                </CardHeader>
                <CardContent>
                  <img
                    src="https://images.unsplash.com/photo-1544025162-d76694265947?w=500&h=300&fit=crop"
                    alt="Cantine scolaire"
                    className="rounded-lg mb-4"
                  />
                  <p className="text-sm text-muted-foreground">
                    Réservez les repas et gérez le solde en quelques clics.
                  </p>
                </CardContent>
              </Card>

              <Card id="transport">
                <CardHeader>
                  <Bell className="h-8 w-8 mb-2" />
                  <CardTitle>Transport Scolaire</CardTitle>
                  <CardDescription>Suivi en temps réel</CardDescription>
                </CardHeader>
                <CardContent>
                  <img
                    src="https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=500&h=300&fit=crop"
                    alt="Bus scolaire"
                    className="rounded-lg mb-4"
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
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
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
