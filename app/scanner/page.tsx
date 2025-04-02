"use client";

import { useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

export default function ScannerPage() {
  const [scanResult, setScanResult] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      "reader",
      { fps: 10, qrbox: { width: 250, height: 250 } },
      false
    );

    scanner.render(
      (decodedText) => {
        setScanResult(decodedText);
        toast({
          title: "QR Code scanné !",
          description: "Code détecté : " + decodedText,
        });
        scanner.clear();
      },
      (error) => {
        console.warn(error);
      }
    );

    return () => {
      scanner.clear();
    };
  }, [toast]);

  return (
    <div className="container mx-auto max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle>Scanner un QR Code</CardTitle>
        </CardHeader>
        <CardContent>
          <div id="reader" className="mb-4"></div>
          {scanResult && (
            <div className="mt-4 p-4 bg-muted rounded-lg">
              <p className="font-medium">Résultat du scan :</p>
              <p className="text-sm text-muted-foreground">{scanResult}</p>
              <Button
                className="mt-2"
                onClick={() => window.location.reload()}
              >
                Scanner à nouveau
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}