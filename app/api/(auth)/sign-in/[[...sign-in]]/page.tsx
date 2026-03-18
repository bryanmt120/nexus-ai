import { SignIn } from "@clerk/nextjs";
import Link from "next/link";

export default function SignInPage() {
  return (
    <div style={{ minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",padding:24 }}>
      <div style={{ width:"100%",maxWidth:480 }}>
        <Link href="/" style={{ display:"flex",alignItems:"center",gap:10,textDecoration:"none",marginBottom:36 }}>
          <div style={{ width:32,height:32,background:"linear-gradient(135deg,var(--cyan),var(--blue))",borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",fontSize:15,fontWeight:900,color:"#000",fontFamily:"Syne,sans-serif" }}>N</div>
          <span style={{ fontFamily:"Syne,sans-serif",fontWeight:800,fontSize:19,color:"var(--text)",letterSpacing:"-0.02em" }}>Nexus<span style={{ color:"var(--cyan)" }}>Flow</span></span>
        </Link>
        <div style={{ marginBottom:24 }}>
          <h1 style={{ fontFamily:"Syne,sans-serif",fontWeight:800,fontSize:"1.8rem",letterSpacing:"-0.03em",color:"var(--text)",marginBottom:8 }}>Iniciar sesión</h1>
          <p style={{ color:"var(--text-dim)",fontSize:14 }}>Accede a tu plataforma de IA.</p>
        </div>
        <SignIn appearance={{ variables: { colorPrimary:"#00e5ff",colorBackground:"#0d1425",colorText:"#e8eeff",colorInputBackground:"#080d1a",colorInputText:"#e8eeff",borderRadius:"10px" } }} />
      </div>
    </div>
  );
}
