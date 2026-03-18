import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

export const metadata: Metadata = {
  title: "NEXUS_AI — AI-Powered Assistant",
  description: "Build in a weekend. Scale to millions. Powered by Claude.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" className="dark">
        <body className="font-body text-on-background antialiased">
          <div className="scanline" />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
