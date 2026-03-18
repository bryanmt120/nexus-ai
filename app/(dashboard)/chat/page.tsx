"use client";

import { useState, useRef, useEffect } from "react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!response.ok) throw new Error("Failed to get response");

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      const assistantMessage: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: "",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value);
          const lines = chunk.split("\n");
          for (const line of lines) {
            if (line.startsWith("data: ")) {
              const data = line.slice(6);
              if (data === "[DONE]") break;
              try {
                const parsed = JSON.parse(data);
                const delta = parsed.choices?.[0]?.delta?.content || "";
                if (delta) {
                  setMessages((prev) =>
                    prev.map((m) =>
                      m.id === assistantMessage.id
                        ? { ...m, content: m.content + delta }
                        : m
                    )
                  );
                }
              } catch {}
            }
          }
        }
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: "ERROR: Failed to connect to AI engine. Check your API configuration.",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="max-w-5xl h-[calc(100vh-8rem)] flex flex-col">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <div className="label-tag mb-1">AI_INTERFACE — claude-sonnet-4-20250514</div>
          <h1 className="section-heading text-3xl">CHAT_SESSION</h1>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 bg-tertiary animate-pulse" />
          <span className="font-mono text-xs text-outline-variant">CLAUDE_CONNECTED</span>
        </div>
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto bg-surface-container-lowest p-6 space-y-6 mb-4 custom-scrollbar">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center py-12">
            <div className="font-mono text-6xl text-outline-variant/20 mb-4">◈</div>
            <div className="label-tag mb-2 text-outline-variant">SYSTEM_READY</div>
            <p className="text-on-surface-variant text-sm max-w-sm">
              AI engine online. Send a message to begin your session.
            </p>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-2 w-full max-w-lg">
              {[
                "Explain how Supabase RLS works",
                "Write a Stripe webhook handler in TypeScript",
                "Help me design a database schema",
                "Create a Next.js API route with streaming",
              ].map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => setInput(prompt)}
                  className="bg-surface-container text-on-surface-variant text-xs text-left px-4 py-3 hover:bg-surface-container-high hover:text-tertiary transition-all border-l border-outline-variant/20 hover:border-tertiary"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((message) => (
          <div
            key={message.id}
            className={`message-appear flex gap-4 ${
              message.role === "user" ? "flex-row-reverse" : ""
            }`}
          >
            {/* Avatar */}
            <div
              className={`w-8 h-8 flex items-center justify-center text-xs font-bold font-mono flex-shrink-0 ${
                message.role === "user"
                  ? "bg-primary text-on-primary"
                  : "bg-tertiary/20 text-tertiary"
              }`}
            >
              {message.role === "user" ? "U" : "AI"}
            </div>

            {/* Content */}
            <div
              className={`max-w-[75%] ${
                message.role === "user" ? "items-end" : "items-start"
              } flex flex-col gap-1`}
            >
              <div
                className={`px-5 py-4 text-sm leading-relaxed font-body ${
                  message.role === "user"
                    ? "bg-surface-container-high text-on-surface"
                    : "bg-surface-container text-on-surface border-l-2 border-tertiary/30"
                }`}
              >
                {message.content}
                {message.role === "assistant" && isLoading && message.content === "" && (
                  <div className="flex gap-1 items-center h-4">
                    <div className="w-1 h-1 bg-tertiary typing-dot" />
                    <div className="w-1 h-1 bg-tertiary typing-dot" />
                    <div className="w-1 h-1 bg-tertiary typing-dot" />
                  </div>
                )}
              </div>
              <span className="font-mono text-[10px] text-outline-variant">
                {message.timestamp.toLocaleTimeString()}
              </span>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="bg-surface-container-low border border-outline-variant/10 p-4">
        <div className="flex items-end gap-4">
          <div className="flex-1 relative">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="ENTER_QUERY... (Enter to send, Shift+Enter for newline)"
              rows={1}
              disabled={isLoading}
              className="w-full bg-surface-container-lowest border-0 border-b-2 border-outline-variant focus:border-tertiary resize-none text-on-surface font-mono text-sm px-4 py-3 placeholder:text-outline-variant/40 outline-none transition-colors disabled:opacity-50"
              style={{ minHeight: "48px", maxHeight: "200px" }}
            />
          </div>
          <button
            onClick={() => handleSubmit()}
            disabled={!input.trim() || isLoading}
            className="bg-primary text-on-primary px-6 py-3 font-headline font-bold text-xs uppercase tracking-widest hover:brightness-110 active:scale-95 transition-all disabled:opacity-30 disabled:cursor-not-allowed disabled:active:scale-100 flex items-center gap-2"
          >
            {isLoading ? (
              <>
                <div className="w-3 h-3 border border-on-primary border-t-transparent animate-spin" />
                PROCESSING
              </>
            ) : (
              "SEND →"
            )}
          </button>
        </div>
        <div className="mt-2 flex items-center justify-between">
          <span className="font-mono text-[10px] text-outline-variant">
            MODEL: claude-sonnet-4-20250514 — STREAMING: ENABLED
          </span>
          <span className="font-mono text-[10px] text-outline-variant">
            {input.length} chars
          </span>
        </div>
      </div>
    </div>
  );
}
