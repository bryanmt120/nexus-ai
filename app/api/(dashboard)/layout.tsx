"use client";

import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/dashboard", label: "Overview", icon: "⬡" },
  { href: "/chat",      label: "AI Chat",  icon: "◈" },
  { href: "/billing",   label: "Billing",  icon: "◆" },
  { href: "/settings",  label: "Settings", icon: "◉" },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <div style={{ display:"flex", minHeight:"100vh" }}>
      {/* Sidebar */}
      <aside style={{ width:240, background:"var(--bg-1)", borderRight:"1px solid var(--border)", display:"flex", flexDirection:"column", position:"fixed", height:"100vh", zIndex:50, flexShrink:0 }}>
        {/* Logo */}
        <Link href="/" style={{ display:"flex", alignItems:"center", gap:10, padding:"20px 20px", borderBottom:"1px solid var(--border)", textDecoration:"none" }}>
          <div style={{ width:30,height:30,background:"linear-gradient(135deg,var(--cyan),var(--blue))",borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,fontWeight:900,color:"#000",fontFamily:"Syne,sans-serif",flexShrink:0 }}>N</div>
          <span style={{ fontFamily:"Syne,sans-serif",fontWeight:800,fontSize:17,color:"var(--text)",letterSpacing:"-0.02em" }}>Nexus<span style={{ color:"var(--cyan)" }}>Flow</span></span>
        </Link>

        {/* Nav */}
        <nav style={{ flex:1, padding:"16px 12px", display:"flex", flexDirection:"column", gap:4 }}>
          <div style={{ fontSize:11, fontWeight:600, letterSpacing:"0.12em", color:"var(--text-faint)", textTransform:"uppercase", padding:"4px 8px 10px", marginTop:4 }}>Plataforma</div>
          {navItems.map(item => {
            const active = pathname === item.href || (item.href !== "/" && pathname?.startsWith(item.href));
            return (
              <Link key={item.href} href={item.href} style={{
                display:"flex", alignItems:"center", gap:10, padding:"10px 12px", borderRadius:10,
                textDecoration:"none", fontSize:14, fontWeight:500, transition:"all 0.15s",
                background: active ? "rgba(0,229,255,0.08)" : "transparent",
                color: active ? "var(--cyan)" : "var(--text-dim)",
                border: active ? "1px solid rgba(0,229,255,0.2)" : "1px solid transparent",
              }}>
                <span style={{ fontSize:16 }}>{item.icon}</span>
                {item.label}
                {active && <div style={{ marginLeft:"auto", width:5, height:5, borderRadius:"50%", background:"var(--cyan)" }} />}
              </Link>
            );
          })}
        </nav>

        {/* Status badge */}
        <div style={{ padding:"12px 16px", margin:"0 12px 8px", background:"rgba(40,201,64,0.06)", border:"1px solid rgba(40,201,64,0.15)", borderRadius:10 }}>
          <div style={{ display:"flex", alignItems:"center", gap:8 }}>
            <div style={{ width:7,height:7,borderRadius:"50%",background:"#28c940",boxShadow:"0 0 6px #28c940",flexShrink:0 }} />
            <div>
              <div style={{ fontSize:12, fontWeight:600, color:"#28c940" }}>Todos los sistemas</div>
              <div style={{ fontSize:11, color:"var(--text-faint)" }}>API online · 99.9% uptime</div>
            </div>
          </div>
        </div>

        {/* User */}
        <div style={{ padding:"16px", borderTop:"1px solid var(--border)", display:"flex", alignItems:"center", gap:10 }}>
          <UserButton appearance={{ variables: { colorPrimary:"#00e5ff", colorBackground:"var(--bg-2)", colorText:"var(--text)", borderRadius:"8px" } }} />
          <div>
            <div style={{ fontSize:13, fontWeight:500, color:"var(--text)" }}>Mi cuenta</div>
            <div style={{ fontSize:11, color:"var(--text-faint)" }}>Plan Starter</div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main style={{ flex:1, marginLeft:240, minHeight:"100vh", display:"flex", flexDirection:"column" }}>
        {/* Topbar */}
        <header style={{ height:60, background:"rgba(5,8,16,0.8)", backdropFilter:"blur(12px)", borderBottom:"1px solid var(--border)", display:"flex", alignItems:"center", justifyContent:"space-between", padding:"0 32px", position:"sticky", top:0, zIndex:40 }}>
          <div style={{ display:"flex", alignItems:"center", gap:8 }}>
            <div style={{ width:6,height:6,borderRadius:"50%",background:"var(--cyan)",boxShadow:"0 0 8px var(--cyan)" }} />
            <span style={{ fontFamily:"JetBrains Mono,monospace", fontSize:12, color:"var(--text-faint)" }}>
              nexusflow.app{pathname}
            </span>
          </div>
          <div style={{ display:"flex", alignItems:"center", gap:16 }}>
            <span style={{ fontFamily:"JetBrains Mono,monospace", fontSize:11, color:"var(--text-faint)" }}>
              {new Date().toLocaleDateString("es-MX", { weekday:"short", day:"numeric", month:"short" })}
            </span>
          </div>
        </header>

        {/* Content */}
        <div style={{ flex:1, padding:"36px 40px" }}>
          {children}
        </div>
      </main>
    </div>
  );
}
