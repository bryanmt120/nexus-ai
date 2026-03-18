import { createClient as createSupabaseClient } from "@supabase/supabase-js";

// ─── Browser client (uses anon key, respects RLS) ───────────────────────────
let browserClient: ReturnType<typeof createSupabaseClient> | null = null;

export function createBrowserClient() {
  if (browserClient) return browserClient;
  browserClient = createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  return browserClient;
}

// ─── Server/admin client (uses service role, bypasses RLS) ──────────────────
export function createServerClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );
}
