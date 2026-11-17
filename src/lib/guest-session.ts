import type { Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

let guestSessionPromise: Promise<Session> | null = null;

/** Create one persistent guest identity per browser so existing RLS rules still isolate data. */
export function ensureGuestSession(): Promise<Session> {
  if (!guestSessionPromise) {
    guestSessionPromise = (async () => {
      const { data: current } = await supabase.auth.getSession();
      if (current.session) return current.session;

      const { data, error } = await supabase.auth.signInAnonymously();
      if (error) throw error;
      if (!data.session) throw new Error("A guest session could not be started.");
      return data.session;
    })().catch((error: unknown) => {
      guestSessionPromise = null;
      throw error;
    });
  }
  return guestSessionPromise;
}