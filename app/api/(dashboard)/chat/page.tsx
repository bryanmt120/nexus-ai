"use client";

import { useState, useRef, useEffect } from "react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  ts: Date;
}

const SUGGESTIONS = [
  "Explica cómo funciona el Row Level Security en Supabase",
  "Escribe un webhook handler de Stripe en TypeScript",
  "Diseña un schema de base de datos para un marketplace",
  "Crea un componente React con animaciones CSS",
  "¿Cuáles son las mejores prácticas de seguridad en Next.js?",
  "Explica la diferencia entre SSR, SSG y CSR",
];

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const autoResize = () => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 180) + "px";
  };

  const sendMessage = async (text?: string) => {
    const content = (text ?? input).trim();
    if (!content || loading) return;
    setInput("");
    if (textareaRef.current) textareaRef.current.style.height = "auto";

    const userMsg: Message = { id: crypto.randomUUID(), role: "user", content, ts: new Date() };
    const allMsgs = [...messages, userMsg];
    setMessages(allMsgs);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: allMsgs.map(m => ({ role: m.role, content: m.content })) }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const assistantId = crypto.randomUUID();
      const assistantMsg: Message = { id: assistantId, role: "assistant", content: "", ts: new Date() };
      setMessages(prev => [...prev, assistantMsg]);

      const reader = res.body?.getReader();
      const dec = new TextDecoder();
      if (reader) {
        let buffer = "";
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += dec.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() ?? "";
          for (const line of lines) {
            if (!line.startsWith("data: ")) continue;
            const raw = line.slice(6).trim();
            if (raw === "[DONE]") break;
            try {
              const parsed = JSON.parse(raw);
              if (parsed.error) {
                setMessages(prev => prev.map(m => m.id === assistantId ? { ...m, content: `❌ Error: ${parsed.error}` } : m));
                break;
              }
              if (parsed.text) {
                setMessages(prev => prev.map(m => m.id === assistantId ? { ...m, content: m.content + parsed.text } : m));
              }
            } catch {}
          }
        }
      }
    } catch (err: any) {
      setMessages(prev => [...prev, {
        id: crypto.randomUUID(), role: "assistant",
        content: `❌ No se pudo conectar con el AI. Verifica que ANTHROPIC_API_KEY esté configurada. (${err.message})`,
        ts: new Date(),
      }]);
    } finally {
      setLoading(false);
    }
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  };

  return (
    <div style={{ maxWidth:900, height:"calc(100vh - 132px)", display:"flex", flexDirection:"column" }}>
      {/* Header */}
      <div className="animate-fade-up" style={{ marginBottom:20, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <div>
          <div style={{ fontSize:12,fontWeight:600,letterSpacing:"0.12em",textTransform:"uppercase",color:"var(--cyan)",marginBottom:6 }}>AI Chat</div>
          <h1 style={{ fontFamily:"Syne,sans-serif",fontWeight:800,fontSize:"clamp(1.5rem,2.5vw,2rem)",letterSpacing:"-0.03em",color:"var(--text)",margin:0 }}>Conversación con Claude</h1>
        </div>
        <div style={{ display:"flex",alignItems:"center",gap:8,background:"rgba(0,229,255,0.06)",border:"1px solid var(--border-cyan)",borderRadius:10,padding:"8px 14px" }}>
          <div style={{ width:7,height:7,borderRadius:"50%",background:"var(--cyan)",boxShadow:"0 0 8px var(--cyan)",animation:"pulse-dot 2s infinite" }} />
          <span style={{ fontFamily:"JetBrains Mono,monospace",fontSize:12,color:"var(--cyan)" }}>claude-3-5-sonnet</span>
        </div>
      </div>

      {/* Messages */}
      <div style={{ flex:1,overflow:"auto",background:"var(--bg-2)",border:"1px solid var(--border)",borderRadius:16,padding:24,display:"flex",flexDirection:"column",gap:20,marginBottom:16 }}>
        {messages.length === 0 && (
          <div style={{ flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",textAlign:"center",gap:24,padding:20 }}>
            <div style={{ width:64,height:64,background:"linear-gradient(135deg,var(--cyan),var(--blue))",borderRadius:18,display:"flex",alignItems:"center",justifyContent:"center",fontSize:28,fontWeight:900,color:"#000",fontFamily:"Syne,sans-serif" }}>N</div>
            <div>
              <div style={{ fontFamily:"Syne,sans-serif",fontWeight:700,fontSize:20,color:"var(--text)",marginBottom:8 }}>NexusFlow AI listo</div>
              <p style={{ color:"var(--text-dim)",fontSize:14,maxWidth:420,lineHeight:1.65 }}>Soy tu asistente de IA especializado en desarrollo de software. Pregúntame lo que necesites.</p>
            </div>
            <div style={{ display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:8,width:"100%",maxWidth:520 }}>
              {SUGGESTIONS.map(s => (
                <button key={s} onClick={() => sendMessage(s)} style={{ background:"var(--bg-3)",border:"1px solid var(--border)",borderRadius:10,padding:"10px 14px",fontSize:12,color:"var(--text-dim)",cursor:"pointer",textAlign:"left",transition:"all 0.15s",lineHeight:1.4 }}
                  onMouseEnter={e=>{ (e.currentTarget).style.borderColor="var(--border-cyan)"; (e.currentTarget).style.color="var(--text)"; }}
                  onMouseLeave={e=>{ (e.currentTarget).style.borderColor="var(--border)"; (e.currentTarget).style.color="var(--text-dim)"; }}
                >{s}</button>
              ))}
            </div>
          </div>
        )}

        {messages.map(msg => (
          <div key={msg.id} className="message-appear" style={{ display:"flex",gap:12,flexDirection:msg.role==="user"?"row-reverse":"row",alignItems:"flex-start" }}>
            <div style={{ width:34,height:34,borderRadius:10,flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,fontWeight:700,fontFamily:"Syne,sans-serif",
              background:msg.role==="user"?"var(--surface)":"linear-gradient(135deg,var(--cyan),var(--blue))",
              color:msg.role==="user"?"var(--text-dim)":"#000",
            }}>{msg.role==="user"?"U":"N"}</div>

            <div style={{ maxWidth:"75%",display:"flex",flexDirection:"column",gap:4,alignItems:msg.role==="user"?"flex-end":"flex-start" }}>
              <div style={{
                padding:"12px 16px",borderRadius:msg.role==="user"?"14px 4px 14px 14px":"4px 14px 14px 14px",fontSize:14,lineHeight:1.65,color:"var(--text)",
                background:msg.role==="user"?"rgba(0,229,255,0.07)":"var(--bg-3)",
                border:`1px solid ${msg.role==="user"?"rgba(0,229,255,0.2)":"var(--border)"}`,
              }}>
                {msg.content === "" && loading ? (
                  <div style={{ display:"flex",gap:4,alignItems:"center",padding:"4px 0" }}>
                    <div className="typing-dot" style={{ width:6,height:6,borderRadius:"50%",background:"var(--cyan)" }} />
                    <div className="typing-dot" style={{ width:6,height:6,borderRadius:"50%",background:"var(--cyan)" }} />
                    <div className="typing-dot" style={{ width:6,height:6,borderRadius:"50%",background:"var(--cyan)" }} />
                  </div>
                ) : (
                  <div className="prose-chat" style={{ whiteSpace:"pre-wrap" }}>{msg.content}</div>
                )}
              </div>
              <span style={{ fontFamily:"JetBrains Mono,monospace",fontSize:10,color:"var(--text-faint)",padding:"0 4px" }}>
                {msg.ts.toLocaleTimeString("es-MX",{hour:"2-digit",minute:"2-digit"})}
              </span>
            </div>
          </div>
        ))}
        <div ref={endRef} />
      </div>

      {/* Input */}
      <div style={{ background:"var(--bg-2)",border:"1px solid var(--border)",borderRadius:16,padding:16,display:"flex",gap:12,alignItems:"flex-end" }}>
        <textarea
          ref={textareaRef}
          value={input}
          onChange={e=>{ setInput(e.target.value); autoResize(); }}
          onKeyDown={onKeyDown}
          placeholder="Escribe tu mensaje... (Enter para enviar, Shift+Enter para nueva línea)"
          disabled={loading}
          rows={1}
          style={{ flex:1,background:"transparent",border:"none",outline:"none",resize:"none",color:"var(--text)",fontSize:14,lineHeight:1.6,fontFamily:"DM Sans,sans-serif",minHeight:24,maxHeight:180,overflow:"auto",paddingTop:4 }}
        />
        <div style={{ display:"flex",gap:8,alignItems:"center",flexShrink:0 }}>
          <span style={{ fontFamily:"JetBrains Mono,monospace",fontSize:10,color:"var(--text-faint)" }}>{input.length}</span>
          <button onClick={() => sendMessage()} disabled={!input.trim()||loading} className="btn-primary btn-sm" style={{ flexShrink:0 }}>
            {loading ? (
              <div style={{ width:14,height:14,border:"2px solid rgba(0,0,0,0.3)",borderTopColor:"#000",borderRadius:"50%",animation:"spin 0.8s linear infinite" }} />
            ) : "→"}
          </button>
        </div>
      </div>
      <div style={{ textAlign:"center",marginTop:8,fontSize:11,color:"var(--text-faint)" }}>
        Claude puede cometer errores. Verifica información importante.
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
