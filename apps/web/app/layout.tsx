import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { NotificationsProvider } from "@/contexts/NotificationsContext";
import { AppFooter } from "@/components/layout/AppFooter";

export const metadata: Metadata = {
  title: {
    default: "MycoMesh Protocol — Crop-agnostic soil infrastructure",
    template: "%s · MycoMesh Protocol",
  },
  description:
    "Enabling soil recovery, water efficiency and carbon sequestration through sovereign data infrastructure.",
  applicationName: "MycoMesh Protocol",
  authors: [{ name: "Carmen María Buendía Sánchez" }],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-offWhite text-charcoalGray">
        <NotificationsProvider>
          <Navbar />
          <div className="h-14 sm:h-16 lg:h-20" />
          <main className="container mx-auto px-3 sm:px-4 py-6 sm:py-8">
            {children}
          </main>
          <AppFooter />
        </NotificationsProvider>
      </body>
    </html>
  );
}
