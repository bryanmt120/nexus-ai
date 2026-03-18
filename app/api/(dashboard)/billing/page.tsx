"use client";

import React from "react";
import Link from "next/link";

export default function BillingPage() {
  const plans = [
    {
      name:"Starter", price:"Gratis", period:"para siempre",
      features:["50 mensajes / mes","1 espacio de trabajo","Soporte comunidad"],
      planKey:"", color:"var(--text-dim)", current:true,
    },
    {
      name:"Pro Monthly", price:"$19", period:"/ mes",
      features:["Mensajes ilimitados","Todos los modelos Claude","Soporte prioritario","API access","Analytics"],
      planKey:"PRO_MONTHLY", color:"var(--cyan)", current:false, badge:"Popular",
    },
    {
      name:"Pro Yearly", price:"$15", period:"/ mes · $180/año",
      features:["Todo lo de Pro Monthly","2 meses gratis","Acceso anticipado","Soporte 1:1"],
      planKey:"PRO_YEARLY", color:"var(--blue)", current:false, badge:"Ahorra 21%",
    },
  ];

  return (
    <div style={{ maxWidth:900 }}>
      {/* Header */}
      <div className="animate-fade-up" style={{ marginBottom:40 }}>
        <div style={{ fontSize:12,fontWeight:600,letterSpacing:"0.12em",textTransform:"uppercase",color:"var(--cyan)",marginBottom:8 }}>Billing</div>
        <h1 style={{ fontFamily:"Syne,sans-serif",fontWeight:800,fontSize:"clamp(1.8rem,3vw,2.5rem)",letterSpacing:"-0.03em",color:"var(--text)",margin:"0 0 8px" }}>Facturación</h1>
        <p style={{ color:"var(--text-dim)",fontSize:15 }}>Gestiona tu plan, suscripción y método de pago.</p>
      </div>

      {/* Current plan banner */}
      <div className="animate-fade-up delay-100" style={{ background:"linear-gradient(135deg,rgba(40,201,64,0.06),rgba(40,201,64,0.03))",border:"1px solid rgba(40,201,64,0.2)",borderRadius:16,padding:"20px 24px",marginBottom:28,display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:12 }}>
        <div style={{ display:"flex",alignItems:"center",gap:12 }}>
          <div style={{ width:10,height:10,borderRadius:"50%",background:"#28c940",boxShadow:"0 0 8px #28c940" }} />
          <div>
            <div style={{ fontFamily:"Syne,sans-serif",fontWeight:700,fontSize:16,color:"var(--text)" }}>Plan Starter — Activo</div>
            <div style={{ fontSize:13,color:"var(--text-dim)" }}>50 mensajes restantes este mes · Se renueva el 1 de abril</div>
          </div>
        </div>
        <div style={{ fontFamily:"Syne,sans-serif",fontWeight:800,fontSize:24,color:"var(--text)" }}>$0<span style={{ fontSize:14,fontWeight:400,color:"var(--text-dim)" }}> / mes</span></div>
      </div>

      {/* Usage meter */}
      <div className="animate-fade-up delay-200" style={{ background:"var(--bg-2)",border:"1px solid var(--border)",borderRadius:16,padding:24,marginBottom:28 }}>
        <div style={{ display:"flex",justifyContent:"space-between",marginBottom:12 }}>
          <span style={{ fontSize:13,fontWeight:600,color:"var(--text)" }}>Uso de mensajes este mes</span>
          <span style={{ fontFamily:"JetBrains Mono,monospace",fontSize:13,color:"var(--cyan)" }}>0 / 50</span>
        </div>
        <div style={{ height:8,background:"var(--bg-1)",borderRadius:99,overflow:"hidden" }}>
          <div style={{ height:"100%",width:"0%",background:"linear-gradient(90deg,var(--cyan),var(--blue))",borderRadius:99,transition:"width 0.5s" }} />
        </div>
        <div style={{ fontSize:12,color:"var(--text-faint)",marginTop:8 }}>Se renueva automáticamente cada mes.</div>
      </div>

      {/* Plans */}
      <div className="animate-fade-up delay-300" style={{ marginBottom:32 }}>
        <div style={{ fontSize:12,fontWeight:600,letterSpacing:"0.12em",textTransform:"uppercase",color:"var(--text-dim)",marginBottom:16 }}>Planes disponibles</div>
        <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))",gap:14 }}>
          {plans.map(p => (
            <div key={p.name} style={{ background: p.badge==="Popular"?"linear-gradient(135deg,rgba(0,229,255,0.06),rgba(77,159,255,0.04))":"var(--bg-2)",border:`1px solid ${p.badge==="Popular"?"var(--border-cyan)":"var(--border)"}`,borderRadius:16,padding:24,position:"relative",display:"flex",flexDirection:"column",gap:16 }}>
              {p.badge&&<div style={{ position:"absolute",top:-10,right:16,background:p.badge==="Popular"?"var(--cyan)":"var(--blue)",color:"#000",fontSize:10,fontWeight:700,padding:"3px 12px",borderRadius:99 }}>{p.badge}</div>}
              {p.current&&<div style={{ position:"absolute",top:-10,left:16,background:"rgba(40,201,64,0.15)",border:"1px solid rgba(40,201,64,0.3)",color:"#28c940",fontSize:10,fontWeight:700,padding:"3px 12px",borderRadius:99 }}>Plan actual</div>}
              <div>
                <div style={{ fontSize:11,fontWeight:600,letterSpacing:"0.1em",textTransform:"uppercase",color:p.color,marginBottom:6 }}>{p.name}</div>
                <div style={{ fontFamily:"Syne,sans-serif",fontWeight:800,fontSize:30,color:"var(--text)",letterSpacing:"-0.02em" }}>{p.price}</div>
                <div style={{ fontSize:13,color:"var(--text-dim)" }}>{p.period}</div>
              </div>
              <div className="divider" />
              <ul style={{ listStyle:"none",padding:0,margin:0,display:"flex",flexDirection:"column",gap:8,flex:1 }}>
                {p.features.map(f=>(
                  <li key={f} style={{ display:"flex",gap:8,fontSize:13,color:"var(--text-dim)",alignItems:"flex-start" }}>
                    <span style={{ color:p.current?"var(--text-faint)":"var(--cyan)",flexShrink:0,marginTop:2 }}>✓</span>{f}
                  </li>
                ))}
              </ul>
              {p.current ? (
                <div style={{ textAlign:"center",padding:"10px",fontSize:13,color:"var(--text-faint)",border:"1px solid var(--border)",borderRadius:8 }}>Plan activo</div>
              ) : (
                <UpgradeButton planName={p.planKey} label={`Actualizar a ${p.name}`} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* History */}
      <div className="animate-fade-up delay-400" style={{ background:"var(--bg-2)",border:"1px solid var(--border)",borderRadius:16,padding:28 }}>
        <div style={{ marginBottom:20 }}>
          <div style={{ fontSize:11,fontWeight:600,letterSpacing:"0.1em",textTransform:"uppercase",color:"var(--cyan)",marginBottom:4 }}>Historial</div>
          <h2 style={{ fontFamily:"Syne,sans-serif",fontWeight:700,fontSize:18,color:"var(--text)",margin:0 }}>Transacciones</h2>
        </div>
        <div style={{ textAlign:"center",padding:"40px 0" }}>
          <div style={{ fontSize:36,opacity:0.2,marginBottom:12 }}>◆</div>
          <div style={{ color:"var(--text-faint)",fontSize:14 }}>Sin transacciones aún. Aquí aparecerán tus pagos.</div>
        </div>
      </div>
    </div>
  );
}

function UpgradeButton({ planName, label }: { planName: string; label: string }) {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleUpgrade = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/subscription", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: planName }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error ?? "Error desconocido"); return; }
      window.location.href = data.url;
    } catch (err: any) {
      setError(err.message ?? "Error de red");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={handleUpgrade} disabled={loading} className="btn-primary" style={{ width:"100%",opacity:loading?0.6:1,cursor:loading?"not-allowed":"pointer" }}>
        {loading ? "Procesando..." : label + " →"}
      </button>
      {error && <p style={{ marginTop:8,fontSize:12,color:"var(--error,#ff5f57)",fontFamily:"JetBrains Mono,monospace" }}>Error: {error}</p>}
    </div>
  );
}
