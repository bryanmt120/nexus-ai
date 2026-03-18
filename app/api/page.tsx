import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function LandingPage() {
  const { userId } = await auth();
  if (userId) redirect("/dashboard");
  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh", overflowX: "hidden" }}>
      <Nav />
      <Hero />
      <LogoStrip />
      <Features />
      <HowItWorks />
      <Pricing />
      <Testimonials />
      <FAQ />
      <CTA />
      <Footer />
    </div>
  );
}

function Nav() {
  return (
    <header style={{ position:"fixed",top:0,left:0,right:0,zIndex:100,padding:"0 24px",background:"rgba(5,8,16,0.85)",backdropFilter:"blur(20px)",borderBottom:"1px solid var(--border)" }}>
      <div style={{ maxWidth:1200,margin:"0 auto",height:64,display:"flex",alignItems:"center",justifyContent:"space-between" }}>
        <Link href="/" style={{ display:"flex",alignItems:"center",gap:10,textDecoration:"none" }}>
          <div style={{ width:34,height:34,background:"linear-gradient(135deg,var(--cyan),var(--blue))",borderRadius:9,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,fontWeight:900,color:"#000",fontFamily:"Syne,sans-serif" }}>N</div>
          <span style={{ fontFamily:"Syne,sans-serif",fontWeight:800,fontSize:20,color:"var(--text)",letterSpacing:"-0.02em" }}>Nexus<span style={{ color:"var(--cyan)" }}>Flow</span></span>
        </Link>
        <nav style={{ display:"flex",gap:4,alignItems:"center" }}>
          {[["Características","features"],["Precios","pricing"],["Cómo funciona","how"],["FAQ","faq"]].map(([label,id]) => (
            <a key={id} href={`#${id}`} style={{ padding:"7px 14px",color:"var(--text-dim)",fontSize:14,fontWeight:500,textDecoration:"none",borderRadius:7,transition:"all 0.2s" }}>{label}</a>
          ))}
        </nav>
        <div style={{ display:"flex",gap:10,alignItems:"center" }}>
          <Link href="/sign-in" className="btn-secondary btn-sm" style={{ textDecoration:"none" }}>Iniciar sesión</Link>
          <Link href="/sign-up" className="btn-primary btn-sm" style={{ textDecoration:"none" }}>Comenzar gratis →</Link>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section style={{ padding:"160px 24px 100px",position:"relative",textAlign:"center" }}>
      <div style={{ position:"absolute",top:"15%",left:"50%",transform:"translateX(-50%)",width:700,height:350,background:"radial-gradient(ellipse,rgba(0,229,255,0.1) 0%,transparent 70%)",pointerEvents:"none" }} />
      <div style={{ position:"absolute",top:"45%",left:"15%",width:180,height:180,background:"radial-gradient(circle,rgba(77,159,255,0.07) 0%,transparent 70%)",pointerEvents:"none" }} />
      <div style={{ position:"absolute",top:"35%",right:"12%",width:140,height:140,background:"radial-gradient(circle,rgba(139,92,246,0.07) 0%,transparent 70%)",pointerEvents:"none" }} />
      <div style={{ maxWidth:900,margin:"0 auto",position:"relative" }}>
        <div className="badge animate-fade-up" style={{ marginBottom:28,display:"inline-flex" }}>
          <span className="badge-dot" />
          Plataforma de IA — v1.0 disponible ahora
        </div>
        <h1 className="animate-fade-up delay-100" style={{ fontFamily:"Syne,sans-serif",fontWeight:800,fontSize:"clamp(2.8rem,7vw,5.5rem)",lineHeight:1.06,letterSpacing:"-0.03em",marginBottom:28,color:"var(--text)" }}>
          La plataforma de IA que <span className="gradient-text">escala contigo</span>
        </h1>
        <p className="animate-fade-up delay-200" style={{ fontSize:"clamp(1rem,2vw,1.2rem)",color:"var(--text-dim)",lineHeight:1.7,maxWidth:580,margin:"0 auto 44px" }}>
          NexusFlow integra Claude AI, base de datos en tiempo real, autenticación y pagos en una sola plataforma. Construye en horas, no en meses.
        </p>
        <div className="animate-fade-up delay-300" style={{ display:"flex",gap:14,justifyContent:"center",flexWrap:"wrap" }}>
          <Link href="/sign-up" className="btn-primary" style={{ textDecoration:"none",fontSize:16,padding:"14px 32px" }}>Comenzar gratis — sin tarjeta</Link>
          <Link href="#features" className="btn-secondary" style={{ textDecoration:"none",fontSize:16,padding:"14px 32px" }}>Ver características →</Link>
        </div>
        <p className="animate-fade-up delay-400" style={{ marginTop:20,color:"var(--text-faint)",fontSize:13 }}>✓ Sin configuración compleja &nbsp;·&nbsp; ✓ Deploy en minutos &nbsp;·&nbsp; ✓ Cancela cuando quieras</p>

        {/* Hero mockup */}
        <div className="animate-fade-up delay-500" style={{ marginTop:72 }}>
          <div style={{ background:"var(--bg-2)",border:"1px solid var(--border-cyan)",borderRadius:20,overflow:"hidden",boxShadow:"0 0 0 1px rgba(0,229,255,0.08),0 40px 100px rgba(0,0,0,0.7),0 0 80px rgba(0,229,255,0.06)" }}>
            <div style={{ padding:"13px 18px",borderBottom:"1px solid var(--border)",display:"flex",alignItems:"center",gap:8,background:"var(--bg-3)" }}>
              <div style={{ width:12,height:12,borderRadius:"50%",background:"#ff5f57" }} /><div style={{ width:12,height:12,borderRadius:"50%",background:"#ffbd2e" }} /><div style={{ width:12,height:12,borderRadius:"50%",background:"#28c940" }} />
              <div style={{ flex:1,background:"var(--bg-1)",borderRadius:6,padding:"4px 12px",marginLeft:8,fontSize:12,color:"var(--text-dim)",textAlign:"left" }}>nexusflow.app/chat</div>
            </div>
            <div style={{ padding:28,textAlign:"left" }}>
              <div style={{ display:"flex",gap:12,marginBottom:18 }}>
                <div style={{ width:32,height:32,borderRadius:8,background:"linear-gradient(135deg,var(--cyan),var(--blue))",flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,fontWeight:700,color:"#000" }}>N</div>
                <div style={{ background:"var(--bg-3)",borderRadius:"4px 12px 12px 12px",padding:"12px 16px",color:"var(--text)",fontSize:14,lineHeight:1.6,maxWidth:480 }}>¡Hola! Soy NexusFlow AI. ¿En qué proyecto me puedo sumar hoy?</div>
              </div>
              <div style={{ display:"flex",gap:12,justifyContent:"flex-end",marginBottom:18 }}>
                <div style={{ background:"rgba(0,229,255,0.08)",border:"1px solid var(--border-cyan)",borderRadius:"12px 4px 12px 12px",padding:"12px 16px",color:"var(--text)",fontSize:14,maxWidth:360 }}>Ayúdame con el schema de Supabase para un e-commerce</div>
                <div style={{ width:32,height:32,borderRadius:8,background:"var(--surface)",flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,color:"var(--text-dim)" }}>U</div>
              </div>
              <div style={{ display:"flex",gap:12 }}>
                <div style={{ width:32,height:32,borderRadius:8,background:"linear-gradient(135deg,var(--cyan),var(--blue))",flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,fontWeight:700,color:"#000" }}>N</div>
                <div style={{ background:"var(--bg-3)",borderRadius:"4px 12px 12px 12px",padding:"14px 16px",flex:1 }}>
                  <div style={{ fontFamily:"JetBrains Mono,monospace",fontSize:12,lineHeight:1.8,color:"var(--text-dim)" }}>
                    <div style={{ color:"var(--cyan)",marginBottom:6 }}>-- Tablas principales</div>
                    <div><span style={{ color:"#4d9fff" }}>create table</span> products (id uuid, name text, price numeric);</div>
                    <div><span style={{ color:"#4d9fff" }}>create table</span> orders (id uuid, user_id text, status text);</div>
                    <div><span style={{ color:"#4d9fff" }}>create table</span> order_items (order_id uuid, product_id uuid, qty int);</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function LogoStrip() {
  const techs = [["Claude AI","#d4a27f"],["Supabase","#3ecf8e"],["Clerk","#7c3aed"],["Stripe","#635bff"],["Next.js 15","#fff"],["Vercel","#fff"],["TypeScript","#3178c6"],["Tailwind","#06b6d4"]];
  return (
    <section style={{ padding:"20px 24px 70px",textAlign:"center" }}>
      <p style={{ color:"var(--text-faint)",fontSize:11,letterSpacing:"0.15em",textTransform:"uppercase",marginBottom:20 }}>Construido con las mejores tecnologías</p>
      <div style={{ display:"flex",gap:10,justifyContent:"center",flexWrap:"wrap",maxWidth:840,margin:"0 auto" }}>
        {techs.map(([n,c]) => (
          <div key={n} style={{ display:"flex",alignItems:"center",gap:8,padding:"8px 16px",background:"var(--bg-2)",border:"1px solid var(--border)",borderRadius:8,fontSize:13,fontWeight:500,color:"var(--text-dim)" }}>
            <div style={{ width:7,height:7,borderRadius:"50%",background:c }} />{n}
          </div>
        ))}
      </div>
    </section>
  );
}

function Features() {
  const features = [
    { icon:"🤖",title:"IA de última generación",desc:"Claude claude-3-5-sonnet con streaming en tiempo real. Respuestas precisas y contexto largo para cualquier tarea técnica.",tag:"Claude AI" },
    { icon:"🔐",title:"Autenticación completa",desc:"Clerk integrado: email, Google, GitHub. MFA, sesiones seguras y rutas protegidas con middleware de Next.js.",tag:"Clerk Auth" },
    { icon:"🗄️",title:"Base de datos en tiempo real",desc:"Supabase PostgreSQL con Row Level Security. Esquema optimizado, índices y triggers automáticos desde el primer día.",tag:"Supabase" },
    { icon:"💳",title:"Pagos y suscripciones",desc:"Stripe con planes mensuales y anuales. Webhooks en tiempo real y portal de facturación para tus usuarios.",tag:"Stripe" },
    { icon:"🚀",title:"Deploy instantáneo",desc:"Vercel listo con vercel.json preconfigurado. Cada push a main hace deploy automático en segundos.",tag:"Vercel" },
    { icon:"📊",title:"Dashboard completo",desc:"Seguimiento de uso por usuario, tokens consumidos y métricas de suscripción en tiempo real.",tag:"Analytics" },
    { icon:"🛡️",title:"Seguridad empresarial",desc:"Rate limiting, validación de inputs, CORS y variables de entorno seguras. Listo para auditorías.",tag:"Security" },
    { icon:"📱",title:"100% Responsive",desc:"Interfaz optimizada para desktop, tablet y móvil. Navegación adaptativa en todas las pantallas.",tag:"Mobile-first" },
    { icon:"⚡",title:"Performance máximo",desc:"Server Components de Next.js 15, streaming y caché inteligente. Lighthouse score 95+.",tag:"Next.js 15" },
  ];
  return (
    <section id="features" style={{ padding:"100px 24px",maxWidth:1200,margin:"0 auto" }}>
      <div style={{ textAlign:"center",marginBottom:64 }}>
        <div className="badge" style={{ marginBottom:20,display:"inline-flex" }}>✦ Características</div>
        <h2 style={{ fontFamily:"Syne,sans-serif",fontWeight:800,fontSize:"clamp(2rem,4vw,3rem)",letterSpacing:"-0.03em",marginBottom:16 }}>
          Todo lo que necesitas, <span className="gradient-cyan">ya integrado</span>
        </h2>
        <p style={{ color:"var(--text-dim)",fontSize:17,maxWidth:500,margin:"0 auto" }}>No pierdas semanas configurando infraestructura. NexusFlow trae todo listo desde el primer día.</p>
      </div>
      <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(320px,1fr))",gap:14 }}>
        {features.map((f) => (
          <div key={f.title} className="card" style={{ display:"flex",flexDirection:"column",gap:12 }}>
            <div style={{ display:"flex",alignItems:"flex-start",justifyContent:"space-between" }}>
              <div style={{ fontSize:30 }}>{f.icon}</div>
              <span style={{ fontSize:11,fontWeight:600,letterSpacing:"0.08em",color:"var(--cyan)",background:"rgba(0,229,255,0.07)",border:"1px solid var(--border-cyan)",borderRadius:99,padding:"2px 10px" }}>{f.tag}</span>
            </div>
            <h3 style={{ fontFamily:"Syne,sans-serif",fontWeight:700,fontSize:16,color:"var(--text)",margin:0 }}>{f.title}</h3>
            <p style={{ color:"var(--text-dim)",fontSize:14,lineHeight:1.65,margin:0 }}>{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { n:"01",title:"Crea tu cuenta",desc:"Regístrate gratis con email o Google en menos de 30 segundos. Sin tarjeta de crédito requerida." },
    { n:"02",title:"Configura las integraciones",desc:"Conecta Supabase, Stripe y Anthropic con las variables de entorno. Guía paso a paso incluida." },
    { n:"03",title:"Personaliza y construye",desc:"Adapta los prompts de Claude, planes de pago y lógica de negocio a tu caso de uso específico." },
    { n:"04",title:"Publica en Vercel",desc:"Un push a GitHub y Vercel hace el deploy automático. Tu app live en minutos, no en días." },
  ];
  return (
    <section id="how" style={{ padding:"100px 24px",background:"var(--bg-1)" }}>
      <div style={{ maxWidth:1100,margin:"0 auto" }}>
        <div style={{ textAlign:"center",marginBottom:64 }}>
          <div className="badge" style={{ marginBottom:20,display:"inline-flex" }}>✦ Cómo funciona</div>
          <h2 style={{ fontFamily:"Syne,sans-serif",fontWeight:800,fontSize:"clamp(2rem,4vw,3rem)",letterSpacing:"-0.03em",marginBottom:16 }}>
            De cero a producción <span className="gradient-cyan">en 4 pasos</span>
          </h2>
        </div>
        <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))",gap:2 }}>
          {steps.map((s,i) => (
            <div key={s.n} style={{ padding:32,background:i%2===0?"var(--bg-2)":"var(--bg-3)" }}>
              <div style={{ fontFamily:"JetBrains Mono,monospace",fontSize:52,fontWeight:300,color:"rgba(0,229,255,0.12)",lineHeight:1,marginBottom:20 }}>{s.n}</div>
              <h3 style={{ fontFamily:"Syne,sans-serif",fontWeight:700,fontSize:18,color:"var(--text)",marginBottom:10 }}>{s.title}</h3>
              <p style={{ color:"var(--text-dim)",fontSize:14,lineHeight:1.65,margin:0 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  const plans = [
    { name:"Starter",price:"Gratis",period:"para siempre",desc:"Para explorar y proyectos personales.",features:["50 mensajes de IA / mes","1 espacio de trabajo","Supabase incluido","Deploy en Vercel","Soporte por comunidad"],cta:"Comenzar gratis",href:"/sign-up",featured:false,badge:"",color:"var(--text-dim)" },
    { name:"Pro",price:"$19",period:"/ mes",desc:"Para freelancers y proyectos en producción.",features:["Mensajes ilimitados","Claude claude-3-5-sonnet","Todos los modelos de IA","Soporte prioritario","Acceso a API","Analytics avanzado","Historial completo"],cta:"Comenzar con Pro",href:"/sign-up",featured:true,badge:"Más popular",color:"var(--cyan)" },
    { name:"Pro Anual",price:"$15",period:"/ mes",desc:"Todo de Pro, con 2 meses gratis ($180/año).",features:["Todo lo de Pro","2 meses de regalo","Acceso anticipado","Soporte dedicado 1:1","Facturación anual"],cta:"Ahorrar 21%",href:"/sign-up",featured:false,badge:"Mejor precio",color:"var(--blue)" },
    { name:"Empresa",price:"Custom",period:"a medida",desc:"Para equipos con necesidades específicas.",features:["Todo lo de Pro","Modelos personalizados","SSO / SAML","SLA garantizado","Onboarding dedicado","Facturación empresarial"],cta:"Contactar ventas",href:"mailto:hola@nexusflow.app",featured:false,badge:"",color:"var(--violet)" },
  ];
  return (
    <section id="pricing" style={{ padding:"100px 24px" }}>
      <div style={{ maxWidth:1200,margin:"0 auto" }}>
        <div style={{ textAlign:"center",marginBottom:64 }}>
          <div className="badge" style={{ marginBottom:20,display:"inline-flex" }}>✦ Planes</div>
          <h2 style={{ fontFamily:"Syne,sans-serif",fontWeight:800,fontSize:"clamp(2rem,4vw,3rem)",letterSpacing:"-0.03em",marginBottom:16 }}>
            Precios <span className="gradient-cyan">transparentes</span>
          </h2>
          <p style={{ color:"var(--text-dim)",fontSize:17,maxWidth:460,margin:"0 auto" }}>Sin sorpresas. Cancela cuando quieras. Empieza gratis y escala con tu proyecto.</p>
        </div>
        <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))",gap:16,alignItems:"start" }}>
          {plans.map(p => (
            <div key={p.name} style={{ background:p.featured?"linear-gradient(135deg,rgba(0,229,255,0.06),rgba(77,159,255,0.04))":"var(--bg-2)",border:`1px solid ${p.featured?"var(--border-cyan)":"var(--border)"}`,borderRadius:20,padding:28,display:"flex",flexDirection:"column",gap:18,position:"relative",boxShadow:p.featured?"0 0 0 1px rgba(0,229,255,0.1),0 20px 60px rgba(0,0,0,0.4)":"none",transition:"all 0.25s" }}>
              {p.badge&&<div style={{ position:"absolute",top:-12,left:"50%",transform:"translateX(-50%)",background:p.featured?"var(--cyan)":"var(--blue)",color:"#000",fontSize:11,fontWeight:700,letterSpacing:"0.06em",padding:"4px 14px",borderRadius:99,whiteSpace:"nowrap" }}>{p.badge}</div>}
              <div>
                <div style={{ fontSize:11,fontWeight:600,letterSpacing:"0.1em",textTransform:"uppercase",color:p.color,marginBottom:8 }}>{p.name}</div>
                <div style={{ display:"flex",alignItems:"baseline",gap:4,marginBottom:6 }}>
                  <span style={{ fontFamily:"Syne,sans-serif",fontWeight:800,fontSize:36,color:"var(--text)",letterSpacing:"-0.03em" }}>{p.price}</span>
                  <span style={{ color:"var(--text-dim)",fontSize:13 }}>{p.period}</span>
                </div>
                <p style={{ color:"var(--text-dim)",fontSize:13,margin:0,lineHeight:1.5 }}>{p.desc}</p>
              </div>
              <div className="divider" />
              <ul style={{ listStyle:"none",padding:0,margin:0,display:"flex",flexDirection:"column",gap:10,flex:1 }}>
                {p.features.map(f=>(
                  <li key={f} style={{ display:"flex",gap:10,fontSize:13,color:"var(--text-dim)",alignItems:"flex-start" }}>
                    <span style={{ color:p.featured?"var(--cyan)":"var(--text-faint)",marginTop:2,flexShrink:0 }}>✓</span>{f}
                  </li>
                ))}
              </ul>
              <Link href={p.href} className={p.featured?"btn-primary":"btn-secondary"} style={{ textDecoration:"none",width:"100%",textAlign:"center" }}>{p.cta}</Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const t = [
    { name:"Carlos Mendoza",role:"Founder @ DevStack MX",text:"NexusFlow nos permitió lanzar nuestro SaaS en 3 días. Antes nos hubiera tomado 2 meses configurar todo esto.",avatar:"CM" },
    { name:"Ana Ramírez",role:"Full-stack Developer",text:"La integración de Claude AI con streaming es impresionante. Mis clientes quedan sorprendidos con la velocidad.",avatar:"AR" },
    { name:"Luis Herrera",role:"CTO @ TechLab",text:"El esquema de Supabase con RLS ya configurado nos ahorró una semana de trabajo. Muy bien pensado.",avatar:"LH" },
    { name:"María González",role:"Indie Hacker",text:"Por fin una boilerplate que no se siente a medias. Todo funciona desde el primer deploy. Increíble.",avatar:"MG" },
    { name:"Javier Torres",role:"Backend Engineer",text:"Los webhooks de Stripe están perfectamente manejados. Cero problemas con pagos desde el día uno.",avatar:"JT" },
    { name:"Sofía Vargas",role:"Product Manager",text:"El dashboard es exactamente lo que necesitaba. Mis usuarios entienden su plan y uso sin soporte.",avatar:"SV" },
  ];
  return (
    <section style={{ padding:"100px 24px",background:"var(--bg-1)" }}>
      <div style={{ maxWidth:1200,margin:"0 auto" }}>
        <div style={{ textAlign:"center",marginBottom:56 }}>
          <div className="badge" style={{ marginBottom:20,display:"inline-flex" }}>✦ Testimonios</div>
          <h2 style={{ fontFamily:"Syne,sans-serif",fontWeight:800,fontSize:"clamp(2rem,4vw,3rem)",letterSpacing:"-0.03em" }}>Lo que dicen nuestros <span className="gradient-cyan">usuarios</span></h2>
        </div>
        <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(320px,1fr))",gap:14 }}>
          {t.map(item=>(
            <div key={item.name} className="card" style={{ display:"flex",flexDirection:"column" }}>
              <div style={{ fontSize:22,color:"var(--cyan)",marginBottom:14,fontFamily:"Georgia,serif" }}>"</div>
              <p style={{ color:"var(--text-dim)",fontSize:14,lineHeight:1.7,marginBottom:20,flex:1 }}>{item.text}</p>
              <div className="divider" style={{ marginBottom:16 }} />
              <div style={{ display:"flex",alignItems:"center",gap:12 }}>
                <div style={{ width:38,height:38,borderRadius:9,background:"linear-gradient(135deg,var(--cyan),var(--blue))",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"Syne,sans-serif",fontWeight:700,fontSize:13,color:"#000",flexShrink:0 }}>{item.avatar}</div>
                <div><div style={{ fontWeight:600,fontSize:14,color:"var(--text)" }}>{item.name}</div><div style={{ fontSize:12,color:"var(--text-dim)" }}>{item.role}</div></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const items = [
    { q:"¿Necesito saber programar para usar NexusFlow?",a:"Sí, NexusFlow es para desarrolladores. Necesitas conocimientos básicos de Next.js y TypeScript para personalizar el proyecto." },
    { q:"¿Cuánto tiempo toma el primer deploy?",a:"Con la guía de setup, el primer deploy en Vercel toma entre 15 y 30 minutos dependiendo de tu experiencia." },
    { q:"¿Puedo cambiar los modelos de Claude AI?",a:"Sí, puedes cambiar el modelo en app/api/chat/route.ts. Soportamos claude-3-5-sonnet, claude-3-haiku y cualquier modelo futuro." },
    { q:"¿El plan gratuito tiene límite de tiempo?",a:"No, el plan gratuito es para siempre. Solo tiene límite de 50 mensajes de IA al mes, que se renuevan cada mes." },
    { q:"¿Qué pasa si supero el límite del plan gratuito?",a:"Recibirás una notificación en el dashboard. Puedes actualizar a Pro en cualquier momento para continuar sin interrupciones." },
    { q:"¿Los pagos son seguros?",a:"Absolutamente. Los pagos son procesados por Stripe. NexusFlow nunca almacena datos de tarjetas de crédito." },
  ];
  return (
    <section id="faq" style={{ padding:"100px 24px" }}>
      <div style={{ maxWidth:760,margin:"0 auto" }}>
        <div style={{ textAlign:"center",marginBottom:56 }}>
          <div className="badge" style={{ marginBottom:20,display:"inline-flex" }}>✦ FAQ</div>
          <h2 style={{ fontFamily:"Syne,sans-serif",fontWeight:800,fontSize:"clamp(2rem,4vw,3rem)",letterSpacing:"-0.03em" }}>Preguntas <span className="gradient-cyan">frecuentes</span></h2>
        </div>
        <div style={{ display:"flex",flexDirection:"column",gap:2 }}>
          {items.map((item,i)=>(
            <details key={i} style={{ background:"var(--bg-2)",borderRadius:i===0?"12px 12px 2px 2px":i===items.length-1?"2px 2px 12px 12px":"2px" }}>
              <summary style={{ padding:"20px 24px",cursor:"pointer",fontFamily:"Syne,sans-serif",fontWeight:600,fontSize:15,color:"var(--text)",userSelect:"none",display:"flex",justifyContent:"space-between",alignItems:"center",listStyle:"none" }}>
                {item.q}<span style={{ color:"var(--cyan)",fontSize:18,flexShrink:0,marginLeft:16 }}>+</span>
              </summary>
              <div style={{ padding:"0 24px 20px",color:"var(--text-dim)",fontSize:14,lineHeight:1.7 }}>{item.a}</div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section style={{ padding:"80px 24px" }}>
      <div style={{ maxWidth:900,margin:"0 auto",background:"linear-gradient(135deg,rgba(0,229,255,0.06),rgba(77,159,255,0.04))",border:"1px solid var(--border-cyan)",borderRadius:24,padding:"64px 40px",textAlign:"center",position:"relative",overflow:"hidden" }}>
        <div style={{ position:"absolute",top:"-40%",left:"50%",transform:"translateX(-50%)",width:500,height:300,background:"radial-gradient(circle,rgba(0,229,255,0.08) 0%,transparent 70%)",pointerEvents:"none" }} />
        <h2 style={{ fontFamily:"Syne,sans-serif",fontWeight:800,fontSize:"clamp(1.8rem,4vw,2.8rem)",letterSpacing:"-0.03em",marginBottom:16,position:"relative" }}>
          Empieza a construir <span className="gradient-text">hoy mismo</span>
        </h2>
        <p style={{ color:"var(--text-dim)",fontSize:17,marginBottom:36,maxWidth:460,margin:"0 auto 36px",lineHeight:1.6 }}>Únete a los desarrolladores que ya usan NexusFlow para lanzar sus productos más rápido.</p>
        <div style={{ display:"flex",gap:14,justifyContent:"center",flexWrap:"wrap",position:"relative" }}>
          <Link href="/sign-up" className="btn-primary" style={{ textDecoration:"none",fontSize:16,padding:"14px 32px" }}>Crear cuenta gratis →</Link>
          <a href="https://github.com" target="_blank" className="btn-secondary" style={{ textDecoration:"none",fontSize:16,padding:"14px 32px" }}>Ver en GitHub</a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{ borderTop:"1px solid var(--border)",padding:"48px 24px" }}>
      <div style={{ maxWidth:1200,margin:"0 auto" }}>
        <div style={{ display:"grid",gridTemplateColumns:"2fr repeat(3,1fr)",gap:40,marginBottom:48 }}>
          <div>
            <div style={{ display:"flex",alignItems:"center",gap:10,marginBottom:16 }}>
              <div style={{ width:28,height:28,background:"linear-gradient(135deg,var(--cyan),var(--blue))",borderRadius:7,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"Syne,sans-serif",fontWeight:800,fontSize:14,color:"#000" }}>N</div>
              <span style={{ fontFamily:"Syne,sans-serif",fontWeight:800,fontSize:18,color:"var(--text)" }}>Nexus<span style={{ color:"var(--cyan)" }}>Flow</span></span>
            </div>
            <p style={{ color:"var(--text-dim)",fontSize:14,lineHeight:1.6,maxWidth:260 }}>La plataforma de IA para desarrolladores que quieren construir productos serios sin perder tiempo.</p>
          </div>
          {[["Producto",["Características","Precios","Changelog","Roadmap"]],["Recursos",["Documentación","API Reference","GitHub","Ejemplos"]],["Empresa",["Blog","Contacto","Privacidad","Términos"]]].map(([title,links])=>(
            <div key={title as string}>
              <div style={{ fontFamily:"Syne,sans-serif",fontWeight:600,fontSize:13,color:"var(--text)",marginBottom:16,letterSpacing:"0.05em" }}>{title as string}</div>
              <ul style={{ listStyle:"none",padding:0,margin:0,display:"flex",flexDirection:"column",gap:10 }}>
                {(links as string[]).map(l=>(<li key={l}><a href="#" style={{ color:"var(--text-dim)",fontSize:14,textDecoration:"none" }}>{l}</a></li>))}
              </ul>
            </div>
          ))}
        </div>
        <div className="divider" style={{ marginBottom:24 }} />
        <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:16 }}>
          <p style={{ color:"var(--text-faint)",fontSize:13,margin:0 }}>© 2025 NexusFlow. Todos los derechos reservados.</p>
          <div style={{ display:"flex",gap:6,alignItems:"center" }}>
            <span className="badge-dot" />
            <span style={{ color:"var(--text-faint)",fontSize:12 }}>Todos los sistemas operativos</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
