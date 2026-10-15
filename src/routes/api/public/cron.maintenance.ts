import { createFileRoute } from "@tanstack/react-router";

// Daily maintenance job. Callers must send `Authorization: Bearer <CRON_SECRET>`.
// Vercel Cron sends this header automatically when CRON_SECRET is set.
async function authorized(request: Request): Promise<boolean> {
  const secrets = [process.env["CRON_SECRET"], process.env["LOVABLE_CRON_SECRET"]].filter(
    (s): s is string => !!s,
  );
  if (secrets.length === 0) return false;
  const m = /^Bearer ([^\s,]+)$/.exec(request.headers.get("authorization") ?? "");
  if (!m) return false;
  const { createHash, timingSafeEqual } = await import("node:crypto");
  const d = (v: string) => createHash("sha256").update(v, "utf8").digest();
  const given = d(m[1]!);
  return secrets.some((s) => timingSafeEqual(given, d(s)));
}

async function run(request: Request): Promise<Response> {
  if (!(await authorized(request))) return new Response("Unauthorized", { status: 401 });
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const now = new Date().toISOString();
  // Expire subscriptions whose paid period has ended and won't renew.
  const { data, error } = await supabaseAdmin
    .from("subscriptions")
    .update({ status: "expired" })
    .in("status", ["active", "trialing", "in_grace"])
    .eq("auto_renew", false)
    .lt("period_end", now)
    .select("id");
  if (error) return Response.json({ ok: false, error: error.message }, { status: 500 });
  return Response.json({ ok: true, expired: data?.length ?? 0, at: now });
}

export const Route = createFileRoute("/api/public/cron/maintenance")({
  server: { handlers: { GET: ({ request }) => run(request), POST: ({ request }) => run(request) } },
});
