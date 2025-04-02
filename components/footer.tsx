import { School } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container py-8">
        {/* Main Footer Content */}
        <div className="grid gap-8 md:grid-cols-4">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <Image 
                src="/images/logo/Logo.png" 
                alt="EduPass+ Logo"
                width={40}
                height={40}
                className="h-8 w-auto"
              />
              <span className="font-bold text-xl">EduPass+</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Votre solution tout-en-un pour une école connectée et moderne.
            </p>
          </div>

          {/* Services Section */}
          <div className="space-y-4">
            <h3 className="font-semibold">Services</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/scanner" className="text-muted-foreground hover:text-primary transition-colors">
                  Badge Scolaire
                </Link>
              </li>
              <li>
                <Link href="/cantine" className="text-muted-foreground hover:text-primary transition-colors">
                  Cantine
                </Link>
              </li>
              <li>
                <Link href="/transport" className="text-muted-foreground hover:text-primary transition-colors">
                  Transport
                </Link>
              </li>
              <li>
                <Link href="/activities" className="text-muted-foreground hover:text-primary transition-colors">
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
                <Link href="/faq" className="text-muted-foreground hover:text-primary transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/chatbot" className="text-muted-foreground hover:text-primary transition-colors">
                  Assistant IA
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="space-y-4">
            <h3 className="font-semibold">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="tel:+33123456789" className="text-muted-foreground hover:text-primary transition-colors">
                  Thierry Gogo : Développeur FullStack
                </a>
              </li>
                <li>
                <a href="tel:+33123456789" className="text-muted-foreground hover:text-primary transition-colors">
                  +225 07 58 96 61 56
                </a>
              </li>
              <li>
                <a href="mailto:contact@edupassplus.fr" className="text-muted-foreground hover:text-primary transition-colors">
                 2024dibo@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 pt-8 border-t border-muted">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} EduPass+. Tous droits réservés.
            </p>
            <div className="flex gap-4 text-sm">
              <Link href="/legal" className="text-muted-foreground hover:text-primary transition-colors">
                Mentions légales
              </Link>
              <Link href="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
                Confidentialité
              </Link>
              <Link href="/terms" className="text-muted-foreground hover:text-primary transition-colors">
                CGU
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}