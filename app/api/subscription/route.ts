import { auth, currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

// Validate at startup
if (!process.env.STRIPE_SECRET_KEY) {
  console.error("MISSING ENV: STRIPE_SECRET_KEY is not set!");
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "", {
apiVersion: "2025-02-24.acacia",
});

const PRICE_MAP: Record<string, string | undefined> = {
  PRO_MONTHLY: process.env.STRIPE_PRICE_PRO_MONTHLY,
  PRO_YEARLY: process.env.STRIPE_PRICE_PRO_YEARLY,
};

export async function POST(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Validate Stripe key
  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json(
      { error: "STRIPE_SECRET_KEY not configured on server." },
      { status: 500 }
    );
  }

  try {
    // Accept both JSON and form data
    let plan: string;
    const contentType = req.headers.get("content-type") ?? "";

    if (contentType.includes("application/json")) {
      const body = await req.json();
      plan = body.plan;
    } else {
      const body = await req.formData();
      plan = body.get("plan") as string;
    }

    const priceId = PRICE_MAP[plan];

    if (!priceId) {
      console.error(`[/api/subscription] Invalid plan "${plan}". PRICE_MAP:`, PRICE_MAP);
      return NextResponse.json(
        { error: `Invalid plan "${plan}". Check STRIPE_PRICE_PRO_MONTHLY and STRIPE_PRICE_PRO_YEARLY env vars.` },
        { status: 400 }
      );
    }

    const user = await currentUser();
    const email = user?.emailAddresses[0]?.emailAddress;

    const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      billing_address_collection: "auto",
      customer_email: email,
      line_items: [{ price: priceId, quantity: 1 }],
      mode: "subscription",
      allow_promotion_codes: true,
      subscription_data: {
        metadata: { userId },
      },
      success_url: `${appUrl}/billing?success=true`,
      cancel_url: `${appUrl}/billing?canceled=true`,
      metadata: { userId },
    });

    if (!session.url) {
      throw new Error("Stripe did not return a checkout URL");
    }

    // If called via fetch (JSON), return the URL
    if (contentType.includes("application/json")) {
      return NextResponse.json({ url: session.url });
    }

    // If called via form submit, redirect directly
    return NextResponse.redirect(session.url, { status: 303 });
  } catch (err: any) {
    console.error("[/api/subscription] Stripe error:", err?.message ?? err);
    return NextResponse.json(
      { error: err?.message ?? "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
