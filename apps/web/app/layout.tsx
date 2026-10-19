import type { Metadata, Viewport } from "next";
import "./globals.css";
import { NotificationsProvider } from "@/contexts/NotificationsContext";

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
      <body className="min-h-screen bg-paper text-ink font-sans antialiased">
        <NotificationsProvider>{children}</NotificationsProvider>
      </body>
    </html>
  );
}
