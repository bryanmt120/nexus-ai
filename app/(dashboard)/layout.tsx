import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const navItems = [
    { href: "/dashboard", label: "OVERVIEW", icon: "⬛" },
    { href: "/chat", label: "AI_CHAT", icon: "◈" },
    { href: "/billing", label: "BILLING", icon: "◆" },
    { href: "/settings", label: "SETTINGS", icon: "◉" },
  ];

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-surface-container-low border-r border-outline-variant/10 flex flex-col fixed h-full z-40">
        {/* Logo */}
        <div className="h-16 flex items-center gap-3 px-6 border-b border-outline-variant/10">
          <div className="w-2 h-2 bg-tertiary" />
          <span className="font-headline font-bold text-primary tracking-[0.2em] text-sm uppercase">
            NEXUS_AI
          </span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:text-tertiary hover:bg-surface-container-high transition-all group border-l-2 border-transparent hover:border-tertiary"
            >
              <span className="text-tertiary/50 group-hover:text-tertiary transition-colors text-sm">
                {item.icon}
              </span>
              <span className="font-headline text-xs font-bold uppercase tracking-[0.12em]">
                {item.label}
              </span>
            </Link>
          ))}
        </nav>

        {/* User section */}
        <div className="p-4 border-t border-outline-variant/10">
          <div className="flex items-center gap-3 px-4 py-3">
            <UserButton
              appearance={{
                variables: {
                  colorPrimary: "#b1c5ff",
                  colorBackground: "#171f33",
                  colorText: "#dae2fd",
                  borderRadius: "0px",
                },
              }}
            />
            <div>
              <div className="label-tag text-outline-variant">LOGGED_IN</div>
              <div className="font-mono text-[10px] text-on-surface-variant">
                STATUS: ACTIVE
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 ml-64 min-h-screen">
        {/* Top bar */}
        <header className="h-16 bg-background/90 backdrop-blur-sm border-b border-outline-variant/10 flex items-center justify-between px-8 sticky top-0 z-30">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-tertiary animate-pulse" />
            <span className="font-mono text-xs text-outline-variant">SYS.STATUS: ONLINE</span>
          </div>
          <div className="font-mono text-xs text-outline-variant">
            {new Date().toISOString().slice(0, 10)}
          </div>
        </header>

        {/* Page content */}
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}
