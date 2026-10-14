import { Navbar } from "@/components/layout/Navbar";
import { AppFooter } from "@/components/layout/AppFooter";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <div className="h-14 sm:h-16 lg:h-20" />
      <main className="container mx-auto px-3 sm:px-4 py-6 sm:py-8">
        {children}
      </main>
      <AppFooter />
    </>
  );
}
