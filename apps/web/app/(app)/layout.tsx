import { Navbar } from "@/components/layout/Navbar";
import { AppFooter } from "@/components/layout/AppFooter";
import { COOKIE_NAME, verifySession } from "@/lib/auth/session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getUserById } from "../../../../packages/db/src";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = (await cookies()).get(COOKIE_NAME)?.value;
  const session = token ? await verifySession(token) : null;

  if (!session) {
    redirect("/login");
  }

  // 2. Buscamos al usuario real en la base de datos
  const user = await getUserById(session.userId);

  if (!user) {
    redirect("/login");
  }

  return (
    <>
      <Navbar userName={user.name} userEmail={user.email} />
      <div className="h-14 sm:h-16 lg:h-20" />
      <main className="container mx-auto px-3 sm:px-4 py-6 sm:py-8">
        {children}
      </main>
      <AppFooter />
    </>
  );
}
