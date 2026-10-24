import { createClient } from "@supabase/supabase-js";
import type { SupabaseClient } from "@supabase/supabase-js";

// No generated database types in this project, so the client is untyped.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Db = SupabaseClient<any, "public", any>;

let client: Db | null = null;

/** Server-only Supabase client (service role). Never import in a client component. */
export function db(): Db {
  if (client) return client;
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("Supabase env vars are not set");
  client = createClient(url, key, { auth: { persistSession: false } });
  return client;
}
