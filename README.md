# NEXUS_AI 🤖

> Full-stack AI SaaS boilerplate — Claude + Supabase + Clerk + Stripe + Vercel

Built with the **Terminal Architect** design system from Google Stitch.

---

## TECH_STACK

| Layer         | Technology              |
|---------------|-------------------------|
| Framework     | Next.js 15 (App Router) |
| AI Engine     | Anthropic Claude        |
| Database      | Supabase (PostgreSQL)   |
| Auth          | Clerk                   |
| Payments      | Stripe                  |
| Deployment    | Vercel                  |
| Styling       | Tailwind CSS            |
| Language      | TypeScript              |

---

## QUICK_START

### 1. Clone & install

```bash
git clone https://github.com/your-username/nexus-ai.git
cd nexus-ai
npm install
```

### 2. Configure environment variables

```bash
cp .env.example .env.local
# Fill in all values in .env.local
```

### 3. Set up Supabase

1. Create a project at [supabase.com](https://supabase.com)
2. Go to **SQL Editor** and paste the contents of `supabase/schema.sql`
3. Run the script — this creates all tables, RLS policies, and indexes
4. Copy your `SUPABASE_URL` and keys to `.env.local`

### 4. Set up Clerk

1. Create an app at [clerk.com](https://clerk.com)
2. Enable **Email + Password** and any social providers you want
3. Go to **JWT Templates** → create a **Supabase** template
4. Add your keys to `.env.local`

### 5. Set up Stripe

1. Create an account at [stripe.com](https://stripe.com)
2. Go to **Products** → create two products:
   - **Pro Monthly** — Recurring, $19/month
   - **Pro Yearly** — Recurring, $190/year ($15.83/month)
3. Copy the **Price IDs** to `.env.local`
4. Go to **Webhooks** → add endpoint: `https://your-domain.com/api/webhooks/stripe`
5. Subscribe to events:
   - `checkout.session.completed`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.paid`
6. Copy the **Webhook Secret** to `.env.local`

### 6. Set up Anthropic

1. Get your API key at [console.anthropic.com](https://console.anthropic.com)
2. Add to `.env.local` as `ANTHROPIC_API_KEY`

### 7. Run locally

```bash
npm run dev
# App runs at http://localhost:3000

# In another terminal, forward Stripe webhooks:
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

---

## DEPLOYMENT

### Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Add all environment variables in Vercel Dashboard:
# Settings → Environment Variables
```

Or click: [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/nexus-ai)

---

## PROJECT_STRUCTURE

```
nexus-ai/
├── app/
│   ├── (auth)/
│   │   ├── sign-in/        # Clerk sign-in page
│   │   └── sign-up/        # Clerk sign-up page
│   ├── (dashboard)/
│   │   ├── layout.tsx      # Sidebar + header
│   │   ├── dashboard/      # Overview + stats
│   │   ├── chat/           # AI chat interface
│   │   ├── billing/        # Stripe subscription
│   │   └── settings/       # Clerk UserProfile
│   ├── api/
│   │   ├── chat/           # Claude streaming API
│   │   ├── subscription/   # Stripe checkout
│   │   └── webhooks/stripe/ # Stripe webhook handler
│   ├── globals.css         # Terminal Architect styles
│   ├── layout.tsx          # Root layout + Clerk provider
│   └── page.tsx            # Landing page
├── lib/
│   └── supabase.ts         # Supabase client helpers
├── supabase/
│   └── schema.sql          # Full DB schema + RLS + indexes
├── types/
│   └── index.ts            # TypeScript interfaces
├── middleware.ts            # Clerk route protection
├── .env.example            # Environment variable template
├── vercel.json             # Vercel deployment config
└── tailwind.config.ts      # Terminal Architect design system
```

---

## ENVIRONMENT_VARIABLES

See `.env.example` for a full list with comments.

---

## LICENSE

MIT — use it, fork it, ship it.
