import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifySession, COOKIE_NAME } from "@/lib/auth/session";
import { getUserById } from "../../../../packages/db/src";
import { Navbar } from "@/components/layout/Navbar"; // Ajusta tus imports
import { AppFooter } from "@/components/layout/AppFooter";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = (await cookies()).get(COOKIE_NAME)?.value;
  const session = token ? await verifySession(token) : null;

  if (!session) redirect("/login");

  const user = await getUserById(session.userId);
  if (!user) redirect("/login");

  return (
    <div className="min-h-screen bg-[#F5F2EA] text-ink font-sans relative overflow-hidden">
      {/* CUADRÍCULA GLOBAL */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#2B363C 1px, transparent 1px), linear-gradient(90deg, #2B363C 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      {/* 2. Resplandor Solar (Solarpunk) */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-solar/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-chloro/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-50">
        <Navbar userName={user.name} userEmail={user.email} />
      </div>

      <main className="pt-24 pb-12 px-4 sm:px-6 max-w-7xl mx-auto relative z-10">
        {children}
      </main>

      <AppFooter />
    </div>
  );
}
