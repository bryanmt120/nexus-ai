"use client";

import React from "react";
import Link from "next/link";

export default function BillingPage() {
  return (
    <div className="max-w-4xl">
      <div className="mb-12">
        <div className="label-tag mb-3">SUBSCRIPTION_MANAGEMENT</div>
        <h1 className="font-headline font-extrabold text-5xl text-primary uppercase tracking-tighter">
          BILLING
        </h1>
      </div>

      {/* Current Plan */}
      <div className="bg-surface-container-low p-8 mb-6 border-l-4 border-outline-variant/30">
        <div className="label-tag mb-4">CURRENT_PLAN</div>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-headline text-2xl font-bold text-on-surface uppercase">FREE_TIER</h2>
            <p className="text-on-surface-variant text-sm mt-1">50 messages/month · 1 workspace</p>
          </div>
          <div className="text-right">
            <div className="font-headline text-3xl font-bold text-on-surface">$0</div>
            <div className="font-mono text-xs text-outline-variant">/ month</div>
          </div>
        </div>
      </div>

      {/* Upgrade Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {[
          {
            name: "PRO_MONTHLY",
            price: "$19",
            period: "month",
            savings: null,
            features: ["Unlimited messages", "All Claude models", "Priority support", "API access", "Advanced analytics"],
          },
          {
            name: "PRO_YEARLY",
            price: "$15",
            period: "month",
            savings: "SAVE 21%",
            features: ["Everything in Monthly", "2 months free", "Early feature access", "Dedicated support", "Custom integrations"],
          },
        ].map((plan) => (
          <div
            key={plan.name}
            className="bg-surface-container p-8 relative border border-outline-variant/10 hover:border-primary/30 transition-colors"
          >
            {plan.savings && (
              <div className="absolute top-4 right-4 bg-tertiary text-on-tertiary text-[10px] font-bold uppercase tracking-widest px-3 py-1">
                {plan.savings}
              </div>
            )}
            <div className="label-tag mb-4">{plan.name}</div>
            <div className="font-headline text-4xl font-bold text-primary mb-1">{plan.price}</div>
            <div className="font-mono text-xs text-outline-variant mb-6">/ {plan.period}</div>
            <ul className="space-y-2 mb-8">
              {plan.features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm text-on-surface-variant">
                  <div className="w-1 h-1 bg-tertiary flex-shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
            {/* This button will call /api/subscription to create a Stripe checkout */}
            <UpgradeButton planName={plan.name} />
          </div>
        ))}
      </div>

      {/* Billing history placeholder */}
      <div className="bg-surface-container-low p-8">
        <div className="label-tag mb-6">TRANSACTION_HISTORY</div>
        <div className="text-center py-12">
          <div className="font-mono text-xs text-outline-variant mb-2">NO_TRANSACTIONS_FOUND</div>
          <p className="text-on-surface-variant text-sm">
            Your payment history will appear here.
          </p>
        </div>
      </div>
    </div>
  );
}

"use client";

function UpgradeButton({ planName }: { planName: string }) {
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
      if (!res.ok) {
        setError(data.error ?? "Error desconocido");
        return;
      }
      // Redirect to Stripe checkout
      window.location.href = data.url;
    } catch (err: any) {
      setError(err.message ?? "Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={handleUpgrade}
        disabled={loading}
        className="btn-primary w-full text-xs py-3 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "PROCESANDO..." : "UPGRADE_NOW →"}
      </button>
      {error && (
        <p className="mt-2 font-mono text-xs text-error">ERROR: {error}</p>
      )}
    </div>
  );
}
