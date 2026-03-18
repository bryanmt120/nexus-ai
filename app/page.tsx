import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function LandingPage() {
  const { userId } = await auth();
  if (userId) redirect("/dashboard");

  return (
    <main className="min-h-screen bg-background overflow-hidden">
      {/* Navigation */}
      <header className="fixed top-0 w-full z-50 bg-background/90 backdrop-blur-sm border-b border-outline-variant/10">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-tertiary animate-pulse" />
            <span className="font-headline font-bold text-primary tracking-[0.2em] text-sm uppercase">
              NEXUS_AI
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            {["FEATURES", "PRICING", "DOCS"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="font-headline text-xs uppercase tracking-[0.15em] text-on-surface-variant hover:text-tertiary transition-colors"
              >
                {item}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            <Link
              href="/sign-in"
              className="font-headline text-xs uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors px-4 py-2"
            >
              SIGN_IN
            </Link>
            <Link href="/sign-up" className="btn-primary text-xs py-2.5 px-6">
              GET_ACCESS
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-40 pb-32 px-6 max-w-7xl mx-auto relative">
        {/* Background accent */}
        <div className="absolute top-0 right-0 w-1/2 h-full pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-l from-primary-container/30 to-transparent" />
          <div className="h-full flex flex-col items-end pt-40 pr-12 space-y-3 opacity-20">
            {[96, 48, 72, 32, 56, 80, 24].map((w, i) => (
              <div key={i} className="h-px bg-primary" style={{ width: `${w * 2}px` }} />
            ))}
          </div>
        </div>

        <div className="max-w-3xl relative">
          <div className="label-tag mb-6 flex items-center gap-2">
            <span className="w-4 h-px bg-tertiary" />
            SYSTEM_STATUS: ONLINE — v2.4.1
          </div>
          <h1 className="font-headline font-extrabold text-6xl md:text-8xl text-primary tracking-tighter uppercase leading-none mb-8">
            BUILD IN A
            <br />
            WEEKEND.
            <br />
            <span className="text-tertiary">SCALE TO</span>
            <br />
            MILLIONS.
          </h1>
          <p className="font-body text-on-surface-variant text-lg leading-relaxed max-w-xl mb-12">
            Full-stack AI SaaS boilerplate. Claude AI + Supabase + Clerk + Stripe,
            all wired up and ready to deploy on Vercel.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/sign-up" className="btn-primary inline-flex items-center gap-3">
              START_BUILDING
              <span className="font-mono text-xs opacity-60">→</span>
            </Link>
            <a
              href="https://github.com"
              target="_blank"
              className="btn-ghost inline-flex items-center gap-3"
            >
              VIEW_ON_GITHUB
            </a>
          </div>
        </div>

        {/* Tech stack badges */}
        <div className="mt-20 pt-10 border-t border-outline-variant/10">
          <p className="label-tag text-outline-variant mb-6">POWERED_BY</p>
          <div className="flex flex-wrap gap-3">
            {[
              { name: "CLAUDE", color: "#d4a27f" },
              { name: "SUPABASE", color: "#3ecf8e" },
              { name: "CLERK", color: "#7c3aed" },
              { name: "STRIPE", color: "#635bff" },
              { name: "VERCEL", color: "#ffffff" },
              { name: "NEXT.JS", color: "#ffffff" },
            ].map(({ name, color }) => (
              <div
                key={name}
                className="bg-surface-container-low border border-outline-variant/10 px-4 py-2 flex items-center gap-2"
              >
                <div className="w-1.5 h-1.5" style={{ backgroundColor: color }} />
                <span className="font-headline text-xs font-bold text-on-surface-variant tracking-widest">
                  {name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-6 bg-surface-container-low">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <div className="label-tag mb-4">MODULE_INDEX</div>
            <h2 className="section-heading text-4xl md:text-5xl">
              EVERYTHING
              <br />
              <span className="text-primary">PRE-WIRED.</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
            {[
              {
                id: "01",
                title: "Claude AI Chat",
                desc: "Streaming chat interface powered by Claude claude-sonnet-4-20250514. Context-aware, multi-turn conversations stored in Supabase.",
                tag: "AI / ANTHROPIC",
              },
              {
                id: "02",
                title: "Clerk Auth",
                desc: "Production-ready authentication. Social logins, MFA, and user management. Routes protected via middleware.",
                tag: "AUTH / SECURITY",
              },
              {
                id: "03",
                title: "Supabase Database",
                desc: "PostgreSQL with RLS policies. Stores users, conversations, messages, and subscription data.",
                tag: "DATABASE / INFRA",
              },
              {
                id: "04",
                title: "Stripe Payments",
                desc: "Subscription billing with monthly/yearly plans. Webhook handler for real-time subscription updates.",
                tag: "PAYMENTS / BILLING",
              },
              {
                id: "05",
                title: "Vercel Deploy",
                desc: "One-click deploy via vercel.json config. Automatic preview deployments on every PR.",
                tag: "DEPLOYMENT / CI",
              },
              {
                id: "06",
                title: "GitHub Ready",
                desc: "Proper .gitignore, PR templates, and GitHub Actions for lint/type-check on every push.",
                tag: "VERSION CONTROL",
              },
            ].map((f) => (
              <div
                key={f.id}
                className="bg-surface-container p-8 border-l-2 border-transparent hover:border-tertiary hover:bg-surface-container-high transition-all group cursor-default"
              >
                <div className="label-tag mb-3">{f.tag}</div>
                <div className="font-mono text-xs text-outline-variant mb-4">_{f.id}</div>
                <h3 className="font-headline text-xl font-bold text-on-surface mb-3">
                  {f.title}
                </h3>
                <p className="text-on-surface-variant text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <div className="label-tag mb-4">SUBSCRIPTION_TIERS</div>
            <h2 className="section-heading text-4xl md:text-5xl">
              SIMPLE
              <br />
              <span className="text-primary">PRICING.</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl">
            {/* Free */}
            <div className="card border border-outline-variant/20">
              <div className="label-tag mb-6 text-outline">FREE_TIER</div>
              <div className="font-headline text-5xl font-bold text-on-surface mb-1">$0</div>
              <div className="text-on-surface-variant text-sm mb-8">/ month</div>
              <ul className="space-y-3 mb-8">
                {["50 AI messages/month", "1 project workspace", "Community support"].map((f) => (
                  <li key={f} className="flex items-center gap-3 text-sm text-on-surface-variant">
                    <div className="w-1.5 h-1.5 bg-outline-variant" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link href="/sign-up" className="btn-ghost w-full text-center block text-xs py-3">
                START_FREE
              </Link>
            </div>
            {/* Pro */}
            <div className="bg-primary-container border border-primary/20 p-8 relative overflow-hidden">
              <div className="absolute top-4 right-4 bg-tertiary text-on-tertiary text-[10px] font-bold uppercase tracking-widest px-3 py-1">
                RECOMMENDED
              </div>
              <div className="label-tag mb-6">PRO_TIER</div>
              <div className="font-headline text-5xl font-bold text-primary mb-1">$19</div>
              <div className="text-on-surface-variant text-sm mb-8">/ month</div>
              <ul className="space-y-3 mb-8">
                {[
                  "Unlimited AI messages",
                  "Unlimited projects",
                  "Priority support",
                  "Advanced models",
                  "API access",
                ].map((f) => (
                  <li key={f} className="flex items-center gap-3 text-sm text-on-surface-variant">
                    <div className="w-1.5 h-1.5 bg-tertiary" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link href="/sign-up" className="btn-primary w-full text-center block text-xs py-3">
                GET_PRO_ACCESS
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 bg-surface-container-low border-t border-outline-variant/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
          <div>
            <div className="label-tag mb-4">READY_TO_DEPLOY?</div>
            <h2 className="section-heading text-4xl">
              CLONE. CONFIGURE.
              <br />
              <span className="text-tertiary">LAUNCH.</span>
            </h2>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/sign-up" className="btn-primary">
              CREATE_ACCOUNT
            </Link>
            <a href="https://github.com" target="_blank" className="btn-ghost">
              VIEW_DOCS
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-6 border-t border-outline-variant/10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-1.5 bg-tertiary" />
            <span className="font-headline text-xs text-outline uppercase tracking-widest">
              NEXUS_AI © 2025
            </span>
          </div>
          <div className="font-mono text-xs text-outline-variant">
            BUILD v0.1.0 — MIT LICENSE
          </div>
        </div>
      </footer>
    </main>
  );
}
