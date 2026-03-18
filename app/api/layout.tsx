import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

export const metadata: Metadata = {
  title: "NexusFlow — Plataforma de IA",
  description: "La plataforma de IA que escala contigo. Claude AI + Supabase + Stripe + Vercel.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="es">
        <body>
          <div className="scanline" />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
