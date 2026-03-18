import { currentUser } from "@clerk/nextjs/server";
import { UserProfile } from "@clerk/nextjs";

export default async function SettingsPage() {
  const user = await currentUser();
  return (
    <div style={{ maxWidth:800 }}>
      <div className="animate-fade-up" style={{ marginBottom:36 }}>
        <div style={{ fontSize:12,fontWeight:600,letterSpacing:"0.12em",textTransform:"uppercase",color:"var(--cyan)",marginBottom:8 }}>Settings</div>
        <h1 style={{ fontFamily:"Syne,sans-serif",fontWeight:800,fontSize:"clamp(1.8rem,3vw,2.5rem)",letterSpacing:"-0.03em",color:"var(--text)",margin:"0 0 8px" }}>Configuración</h1>
        <p style={{ color:"var(--text-dim)",fontSize:15 }}>Gestiona tu perfil, seguridad y preferencias de cuenta.</p>
      </div>

      {/* Quick info */}
      <div className="animate-fade-up delay-100" style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))",gap:14,marginBottom:28 }}>
        {[
{ label:"USER ID",   value: user?.id ? user.id.slice(0,16)+"..." : "—" },          { label:"EMAIL",     value: user?.emailAddresses[0]?.emailAddress ?? "—" },
          { label:"NOMBRE",    value: `${user?.firstName ?? ""} ${user?.lastName ?? ""}`.trim() || "—" },
          { label:"CREADO",    value: user?.createdAt ? new Date(user.createdAt).toLocaleDateString("es-MX") : "—" },
        ].map(({ label, value }) => (
          <div key={label} style={{ background:"var(--bg-2)",border:"1px solid var(--border)",borderRadius:12,padding:"16px 18px" }}>
            <div style={{ fontSize:10,fontWeight:600,letterSpacing:"0.1em",textTransform:"uppercase",color:"var(--cyan)",marginBottom:6 }}>{label}</div>
            <div style={{ fontFamily:"JetBrains Mono,monospace",fontSize:12,color:"var(--text)",wordBreak:"break-all" }}>{value}</div>
          </div>
        ))}
      </div>

      {/* Clerk profile */}
      <div className="animate-fade-up delay-200">
        <div style={{ fontSize:12,fontWeight:600,letterSpacing:"0.12em",textTransform:"uppercase",color:"var(--text-dim)",marginBottom:16 }}>Perfil completo</div>
        <UserProfile
          appearance={{ variables: { colorPrimary:"#00e5ff",colorBackground:"#0d1425",colorText:"#e8eeff",colorInputBackground:"#080d1a",colorInputText:"#e8eeff",borderRadius:"10px",fontFamily:"DM Sans, sans-serif" } }}
        />
      </div>
    </div>
  );
}
