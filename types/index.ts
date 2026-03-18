// ─── Database types ──────────────────────────────────────────────────────────

export type SubscriptionStatus =
  | "free"
  | "active"
  | "past_due"
  | "canceled"
  | "trialing";

export interface User {
  id: string;            // Clerk userId
  email: string;
  created_at: string;
  updated_at: string;
}

export interface Subscription {
  id: string;
  user_id: string;
  stripe_customer_id: string | null;
  stripe_subscription_id: string | null;
  status: SubscriptionStatus;
  price_id: string | null;
  current_period_start: string | null;
  current_period_end: string | null;
  created_at: string;
  updated_at: string;
}

export interface Conversation {
  id: string;
  user_id: string;
  title: string;
  created_at: string;
  updated_at: string;
}

export interface Message {
  id: string;
  conversation_id: string;
  user_id: string;
  role: "user" | "assistant";
  content: string;
  tokens_used: number;
  created_at: string;
}

export interface Usage {
  id: string;
  user_id: string;
  stripe_customer_id: string | null;
  messages_count: number;
  tokens_count: number;
  period_start: string;
  updated_at: string;
}

// ─── API types ───────────────────────────────────────────────────────────────

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export interface ChatRequest {
  messages: ChatMessage[];
  conversationId?: string;
}

export interface SubscriptionCheckResult {
  canSendMessage: boolean;
  plan: SubscriptionStatus;
  messagesUsed: number;
  messagesLimit: number;
}
