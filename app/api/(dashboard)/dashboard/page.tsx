import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";

export default async function DashboardPage() {
  const user = await currentUser();
  const name = user?.firstName ?? user?.emailAddresses[0]?.emailAddress?.split("@")[0] ?? "Usuario";

  const stats = [
    { label:"Mensajes enviados", value:"0",   unit:"este mes",    color:"var(--cyan)",   icon:"◈" },
    { label:"Tokens usados",     value:"0",   unit:"tokens",      color:"var(--blue)",   icon:"⬡" },
    { label:"Conversaciones",    value:"0",   unit:"sesiones",    color:"var(--violet)", icon:"◆" },
    { label:"Plan actual",       value:"FREE",unit:"Starter",     color:"#28c940",       icon:"◉" },
  ];

  const quickActions = [
    { title:"Nueva conversación IA", desc:"Inicia un chat con Claude claude-3-5-sonnet", icon:"🤖", href:"/chat", primary:true },
    { title:"Gestionar suscripción", desc:"Actualiza tu plan o revisa facturación",      icon:"💳", href:"/billing", primary:false },
    { title:"Configurar perfil",     desc:"Ajusta tu cuenta, contraseña y preferencias", icon:"⚙️", href:"/settings", primary:false },
  ];

  return (
    <div style={{ maxWidth:1100 }}>
      {/* Header */}
      <div className="animate-fade-up" style={{ marginBottom:40 }}>
        <div style={{ fontSize:12, fontWeight:600, letterSpacing:"0.12em", textTransform:"uppercase", color:"var(--cyan)", marginBottom:8 }}>Dashboard</div>
        <h1 style={{ fontFamily:"Syne,sans-serif", fontWeight:800, fontSize:"clamp(1.8rem,3vw,2.5rem)", letterSpacing:"-0.03em", color:"var(--text)", margin:"0 0 8px" }}>
          Hola, {name} 👋
        </h1>
        <p style={{ color:"var(--text-dim)", fontSize:15 }}>Todos los sistemas operativos. Aquí está el resumen de tu actividad.</p>
      </div>

      {/* Stats */}
      <div className="animate-fade-up delay-100" style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))", gap:14, marginBottom:32 }}>
        {stats.map(s => (
          <div key={s.label} style={{ background:"var(--bg-2)", border:"1px solid var(--border)", borderRadius:16, padding:"24px 24px 20px", position:"relative", overflow:"hidden" }}>
            <div style={{ position:"absolute", top:0, left:0, right:0, height:2, background:`linear-gradient(90deg, ${s.color}, transparent)` }} />
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:16 }}>
              <div style={{ fontSize:22 }}>{s.icon}</div>
              <div style={{ fontSize:20, color:s.color, opacity:0.2, fontFamily:"Syne,sans-serif", fontWeight:800 }}>{s.value}</div>
            </div>
            <div style={{ fontFamily:"Syne,sans-serif", fontWeight:800, fontSize:32, color:"var(--text)", letterSpacing:"-0.02em", marginBottom:4 }}>{s.value}</div>
            <div style={{ fontSize:12, fontWeight:600, color:s.color, textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:2 }}>{s.unit}</div>
            <div style={{ fontSize:12, color:"var(--text-faint)" }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Quick actions */}
      <div className="animate-fade-up delay-200" style={{ display:"grid", gridTemplateColumns:"2fr 1fr 1fr", gap:14, marginBottom:32 }}>
        {quickActions.map(a => (
          <Link key={a.href} href={a.href} style={{ textDecoration:"none", background: a.primary ? "linear-gradient(135deg,rgba(0,229,255,0.08),rgba(77,159,255,0.05))" : "var(--bg-2)", border:`1px solid ${a.primary ? "var(--border-cyan)" : "var(--border)"}`, borderRadius:16, padding:28, display:"flex", flexDirection:"column", gap:12, transition:"all 0.2s", cursor:"pointer" }}>
            <div style={{ fontSize:32 }}>{a.icon}</div>
            <div>
              <div style={{ fontFamily:"Syne,sans-serif", fontWeight:700, fontSize:16, color:"var(--text)", marginBottom:6 }}>{a.title}</div>
              <div style={{ fontSize:13, color:"var(--text-dim)", lineHeight:1.5 }}>{a.desc}</div>
            </div>
            <div style={{ color:a.primary ? "var(--cyan)" : "var(--text-faint)", fontSize:13, fontWeight:500, marginTop:"auto" }}>
              Ir → 
            </div>
          </Link>
        ))}
      </div>

      {/* Activity */}
      <div className="animate-fade-up delay-300" style={{ background:"var(--bg-2)", border:"1px solid var(--border)", borderRadius:16, padding:28 }}>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:24 }}>
          <div>
            <div style={{ fontSize:11, fontWeight:600, letterSpacing:"0.1em", textTransform:"uppercase", color:"var(--cyan)", marginBottom:4 }}>Actividad reciente</div>
            <h2 style={{ fontFamily:"Syne,sans-serif", fontWeight:700, fontSize:18, color:"var(--text)", margin:0 }}>Conversaciones</h2>
          </div>
          <Link href="/chat" className="btn-secondary btn-sm" style={{ textDecoration:"none" }}>Nueva conversación</Link>
        </div>
        <div style={{ textAlign:"center", padding:"48px 0" }}>
          <div style={{ fontSize:48, marginBottom:16, opacity:0.3 }}>◈</div>
          <div style={{ fontFamily:"Syne,sans-serif", fontWeight:600, fontSize:16, color:"var(--text-dim)", marginBottom:8 }}>Sin conversaciones aún</div>
          <p style={{ color:"var(--text-faint)", fontSize:14, marginBottom:24 }}>Inicia tu primera conversación con Claude AI.</p>
          <Link href="/chat" className="btn-primary" style={{ textDecoration:"none" }}>Comenzar ahora →</Link>
        </div>
      </div>
    </div>
  );
}
