import { School } from "lucide-react";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container py-12">
        {/* Main Footer Content */}
        <div className="grid gap-8 md:grid-cols-4">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <School className="h-6 w-6" />
              <span className="font-bold text-xl">EduPass+</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Votre badge, votre clé pour une école connectée, sans argent liquide.
            </p>
            <Separator className="my-4" />
            <div className="space-y-2 text-sm">
              <p className="font-medium">Développé par GogoSoft+</p>
              <address className="not-italic text-muted-foreground">
                <p>Thierry Gogo</p>
                <p>Développeur FullStack</p>
                <p>Abidjan, Côte d'Ivoire</p>
              </address>
            </div>
          </div>

          {/* Services Section */}
          <div className="space-y-4">
            <h3 className="font-semibold">Services</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/#badge" className="text-muted-foreground hover:text-foreground transition-colors">
                  Badge Scolaire
                </Link>
              </li>
              <li>
                <Link href="/#cantine" className="text-muted-foreground hover:text-foreground transition-colors">
                  Cantine
                </Link>
              </li>
              <li>
                <Link href="/#transport" className="text-muted-foreground hover:text-foreground transition-colors">
                  Transport
                </Link>
              </li>
              <li>
                <Link href="/#activities" className="text-muted-foreground hover:text-foreground transition-colors">
                  Sport & Activités
                </Link>
              </li>
            </ul>
          </div>

          {/* Support Section */}
          <div className="space-y-4">
            <h3 className="font-semibold">Support</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/#faq" className="text-muted-foreground hover:text-foreground transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="text-muted-foreground hover:text-foreground transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/forum" className="text-muted-foreground hover:text-foreground transition-colors">
                  Forum
                </Link>
              </li>
              <li>
                <Link href="/aide" className="text-muted-foreground hover:text-foreground transition-colors">
                  Centre d'aide
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="space-y-4">
            <h3 className="font-semibold">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li className="text-muted-foreground">
                <a href="tel:+2250758966156" className="hover:text-foreground transition-colors">
                  +225 07 58 96 61 56
                </a>
              </li>
              <li className="text-muted-foreground">
                <a href="tel:+2250141573641" className="hover:text-foreground transition-colors">
                  +225 01 41 57 36 41
                </a>
              </li>
              <li>
                <a href="mailto:contact@edupassplus.ci" className="text-muted-foreground hover:text-foreground transition-colors">
                  contact@edupassplus.ci
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 pt-8 border-t">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} EduPass+ by GogoSoft+. Tous droits réservés.
            </p>
            <div className="flex gap-4 text-sm">
              <Link href="/mentions-legales" className="text-muted-foreground hover:text-foreground transition-colors">
                Mentions légales
              </Link>
              <Link href="/confidentialite" className="text-muted-foreground hover:text-foreground transition-colors">
                Confidentialité
              </Link>
              <Link href="/cgv" className="text-muted-foreground hover:text-foreground transition-colors">
                CGV
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}