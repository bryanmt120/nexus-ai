import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";

export default async function DashboardPage() {
  const user = await currentUser();

  const stats = [
    { label: "MESSAGES_SENT", value: "0", unit: "total" },
    { label: "TOKENS_USED", value: "0", unit: "tokens" },
    { label: "CONVERSATIONS", value: "0", unit: "sessions" },
    { label: "PLAN_STATUS", value: "FREE", unit: "tier" },
  ];

  return (
    <div className="max-w-6xl animate-fade-in">
      {/* Header */}
      <div className="mb-12">
        <div className="label-tag mb-3">COMMAND_CENTER</div>
        <h1 className="font-headline font-extrabold text-5xl text-primary uppercase tracking-tighter">
          DASHBOARD
        </h1>
        <p className="text-on-surface-variant mt-2 text-sm">
          Welcome back,{" "}
          <span className="text-primary font-mono">
            {user?.firstName ?? user?.emailAddresses[0].emailAddress}
          </span>
          . All systems operational.
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-1 mb-12">
        {stats.map((s) => (
          <div key={s.label} className="bg-surface-container-low p-6 border-l-2 border-outline-variant/20">
            <div className="label-tag mb-3">{s.label}</div>
            <div className="font-headline text-4xl font-bold text-on-surface">{s.value}</div>
            <div className="font-mono text-xs text-outline-variant mt-1">{s.unit}</div>
          </div>
        ))}
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
        <div className="bg-primary-container p-8 relative overflow-hidden group hover:brightness-110 transition-all">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
          <div className="relative">
            <div className="label-tag mb-4">PRIMARY_ACTION</div>
            <h2 className="font-headline text-2xl font-bold text-primary uppercase tracking-tighter mb-3">
              Start AI Chat
            </h2>
            <p className="text-on-surface-variant text-sm mb-6">
              Open a new conversation with Claude claude-sonnet-4-20250514.
            </p>
            <Link href="/chat" className="btn-primary text-xs py-3">
              OPEN_CHAT →
            </Link>
          </div>
        </div>

        <div className="bg-surface-container p-8 group hover:bg-surface-container-high transition-all">
          <div className="label-tag mb-4">SUBSCRIPTION_MODULE</div>
          <h2 className="font-headline text-2xl font-bold text-on-surface uppercase tracking-tighter mb-3">
            Upgrade to Pro
          </h2>
          <p className="text-on-surface-variant text-sm mb-6">
            Unlock unlimited messages and advanced models.
          </p>
          <Link href="/billing" className="btn-ghost text-xs py-3">
            VIEW_PLANS →
          </Link>
        </div>
      </div>

      {/* Recent activity */}
      <div className="bg-surface-container-low p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="label-tag mb-1">ACTIVITY_LOG</div>
            <h2 className="section-heading text-xl">RECENT_SESSIONS</h2>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="font-mono text-xs text-outline-variant mb-2">NO_SESSIONS_FOUND</div>
          <p className="text-on-surface-variant text-sm">
            Start your first conversation to see activity here.
          </p>
        </div>
      </div>
    </div>
  );
}
