import { useCallback, useEffect, useState, type ReactNode } from "react";
import { Loader2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ensureGuestSession } from "@/lib/guest-session";

export function GuestSessionGate({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [error, setError] = useState(false);

  const startGuestSession = useCallback(() => {
    setError(false);
    void ensureGuestSession()
      .then(() => setReady(true))
      .catch(() => setError(true));
  }, []);

  useEffect(() => {
    startGuestSession();
  }, [startGuestSession]);

  if (ready) return <>{children}</>;

  if (error) {
    return (
      <main className="flex min-h-[50dvh] flex-col items-center justify-center gap-4 px-6 text-center">
        <Sparkles className="size-8 text-primary" />
        <div>
          <h1 className="font-display text-2xl">Your kitchen isn’t ready yet</h1>
          <p className="mt-2 text-sm text-muted-foreground">Please try connecting again.</p>
        </div>
        <Button onClick={startGuestSession}>Try again</Button>
      </main>
    );
  }

  return (
    <main className="flex min-h-[50dvh] items-center justify-center" role="status" aria-label="Starting MealMate">
      <Loader2 className="size-7 animate-spin text-primary" />
    </main>
  );
}