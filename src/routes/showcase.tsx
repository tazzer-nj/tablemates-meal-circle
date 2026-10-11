import { createFileRoute } from "@tanstack/react-router";
import type { CSSProperties, ReactNode } from "react";
import { z } from "zod";

const W = 1080;
const H = 1920;

export const Route = createFileRoute("/showcase")({
  validateSearch: z.object({ panel: z.number().int().min(1).max(6).optional() }),
  head: () => ({
    meta: [
      { title: "MealMate Launch Campaign | Screenshots" },
      { name: "description", content: "Six connected promotional screenshots for MealMate." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "MealMate Launch Campaign" },
      { property: "og:description", content: "Six connected promotional screenshots for MealMate." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Showcase,
});

const S = "/showcase/";
const scr = (n: string) => `${S}screens/${n}.jpg`;

/* ---------- shared, cross-panel elements (global x across 6480px) ---------- */
const FLOW =
  "M -60 1500 C 300 1380, 520 1650, 820 1480 S 1180 1180, 1420 1300 S 1900 1560, 2160 1380 S 2560 980, 2900 1160 S 3300 1560, 3560 1420 S 3980 1080, 4320 1250 S 4800 1600, 5100 1420 S 5600 1020, 5900 1180 S 6400 1400, 6560 1300";
const FLOW2 =
  "M -60 380 C 400 300, 700 520, 1080 420 S 1700 240, 2160 360 S 2900 560, 3240 420 S 3900 220, 4320 340 S 5000 520, 5400 400 S 6200 280, 6560 360";

type Floater = { x: number; y: number; w: number; src: string; r: number; round?: boolean };
const FLOATERS: Floater[] = [
  { x: 780, y: 220, w: 230, src: "cut-tomato.png", r: -12 },
  { x: 1000, y: 1560, w: 300, src: "cut-basil.png", r: 18 },
  { x: 2090, y: 260, w: 260, src: "cut-chili.png", r: 24 },
  { x: 3170, y: 1520, w: 250, src: "cut-avocado.png", r: -18 },
  { x: 4250, y: 300, w: 200, src: "cut-lime.png", r: 30 },
  { x: 5340, y: 1600, w: 240, src: "cut-tomato.png", r: 14 },
  { x: 120, y: 1260, w: 360, src: "potjiekos.jpg", r: -8, round: true },
  { x: 1830, y: 1530, w: 300, src: "tacos.jpg", r: 10, round: true },
  { x: 2660, y: 230, w: 260, src: "pancakes.jpg", r: -6, round: true },
  { x: 3820, y: 1580, w: 300, src: "bowl.jpg", r: 6, round: true },
  { x: 4920, y: 260, w: 250, src: "bunny.jpg", r: -10, round: true },
  { x: 6080, y: 1520, w: 320, src: "alfredo.jpg", r: 8, round: true },
];

function Phone({ src, style, w = 470, alt }: { src: string; style?: CSSProperties; w?: number; alt: string }) {
  const h = Math.round(w * (844 / 390));
  return (
    <div
      className="absolute"
      style={{
        width: w + 24,
        height: h + 24,
        padding: 12,
        borderRadius: w * 0.15,
        background: "var(--sc-ink)",
        boxShadow: "var(--sc-shadow), inset 0 0 0 2px oklch(0.35 0 0)",
        ...style,
      }}
    >
      <img src={src} alt={alt} width={w} height={h} className="block h-full w-full object-cover" style={{ borderRadius: w * 0.13 }} />
      <div
        className="absolute left-1/2 -translate-x-1/2"
        style={{ top: 24, width: w * 0.28, height: 30, borderRadius: 20, background: "var(--sc-ink)" }}
      />
    </div>
  );
}

function Panel({ i, n, kicker, title, children }: { i: number; n: string; kicker: string; title: ReactNode; children: ReactNode }) {
  const off = i * W;
  return (
    <section
      data-panel={i + 1}
      className="relative shrink-0 overflow-hidden"
      style={{ width: W, height: H, background: "var(--sc-ink)", color: "var(--sc-paper)" }}
    >
      <svg className="pointer-events-none absolute inset-0" width={W} height={H} viewBox={`${off} 0 ${W} ${H}`} aria-hidden>
        <path d={FLOW2} fill="none" stroke="var(--sc-paper)" strokeOpacity="0.14" strokeWidth="2" strokeDasharray="4 14" strokeLinecap="round" />
        <path d={FLOW} fill="none" stroke="var(--sc-paper)" strokeOpacity="0.08" strokeWidth="60" strokeLinecap="round" />
        <path d={FLOW} fill="none" stroke="var(--sc-paper)" strokeWidth="5" strokeLinecap="round" />
      </svg>
      {FLOATERS.filter((f) => f.x + f.w > off - 40 && f.x < off + W + 40).map((f, k) => (
        <img
          key={k}
          src={S + f.src}
          alt=""
          aria-hidden
          className="absolute z-20 object-cover"
          style={{
            left: f.x - off,
            top: f.y,
            width: f.w,
            height: f.round ? f.w : "auto",
            borderRadius: f.round ? "9999px" : 0,
            transform: `rotate(${f.r}deg)`,
            boxShadow: f.round ? "var(--sc-shadow)" : undefined,
            border: f.round ? "8px solid var(--sc-paper)" : undefined,
            filter: f.round ? undefined : "drop-shadow(0 30px 30px oklch(0 0 0 / 0.55))",
          }}
        />
      ))}
      <header className="absolute left-[80px] right-[80px] top-[90px] z-30">
        <div className="flex items-center gap-5 font-sans text-[26px] font-semibold uppercase tracking-[0.3em]" style={{ color: "var(--sc-mute)" }}>
          <span style={{ color: "var(--sc-paper)" }}>{n}</span>
          <span className="h-[2px] w-16" style={{ background: "var(--sc-mute)" }} />
          {kicker}
        </div>
        <h2 className="mt-8 font-display text-[118px] font-extrabold uppercase leading-[0.9] tracking-[-0.03em]">{title}</h2>
      </header>
      <div className="absolute inset-0 z-10">{children}</div>
    </section>
  );
}

const Dot = () => <span style={{ color: "var(--sc-accent)" }}>.</span>;

const PANELS = [
  <Panel key={1} i={0} n="01" kicker="Discover" title={<>Your next<br />favourite<br />bite<Dot /></>}>
    <Phone alt="MealMate home screen" src={scr("home")} style={{ left: 330, top: 720, transform: "rotate(-7deg)" }} />
  </Panel>,
  <Panel key={2} i={1} n="02" kicker="Find your spot" title={<>Good food.<br />Right around<br />you<Dot /></>}>
    <Phone alt="MealMate dining screen" src={scr("dining")} w={430} style={{ left: 110, top: 820, transform: "rotate(-9deg)" }} />
    <Phone alt="MealMate restaurant discovery" src={scr("dining")} w={430} style={{ left: 520, top: 700, transform: "rotate(6deg)", filter: "brightness(1)" }} />
  </Panel>,
  <Panel key={3} i={2} n="03" kicker="Cook something crazy" title={<>What's<br />cooking<br />today?</>}>
    <Phone alt="MealMate recipes screen" src={scr("recipes")} w={400} style={{ left: 90, top: 860, transform: "rotate(-5deg)" }} />
    <Phone alt="MealMate recipe details" src={scr("recipe")} w={460} style={{ left: 500, top: 720, transform: "rotate(7deg)" }} />
  </Panel>,
  <Panel key={4} i={3} n="04" kicker="Plan your week" title={<>Less stress.<br />More<br />flavour<Dot /></>}>
    <svg className="absolute inset-0" width={W} height={H} aria-hidden>
      <path d="M 330 1000 C 480 760, 640 1380, 800 1100" fill="none" stroke="var(--sc-accent)" strokeWidth="6" strokeLinecap="round" strokeDasharray="2 18" />
    </svg>
    <Phone alt="MealMate meal planner" src={scr("planner")} w={440} style={{ left: 80, top: 760, transform: "rotate(-8deg)" }} />
    <Phone alt="MealMate grocery list" src={scr("list")} w={440} style={{ left: 540, top: 880, transform: "rotate(8deg)" }} />
  </Panel>,
  <Panel key={5} i={4} n="05" kicker="Meet Mia" title={<>Your food<br />sidekick<Dot /></>}>
    <Phone alt="Mia, the MealMate AI chef chat" src={scr("chat")} style={{ left: 300, top: 700, transform: "rotate(5deg)" }} />
    <img src={S + "mia.png"} alt="Mia, the MealMate mascot" className="absolute z-20" style={{ left: 40, top: 1180, width: 380, transform: "rotate(-10deg)", filter: "drop-shadow(0 40px 40px oklch(0 0 0 / 0.6))" }} />
    <div className="absolute z-30 rounded-[40px] px-10 py-7 font-sans text-[34px] font-semibold" style={{ left: 80, top: 1040, background: "var(--sc-paper)", color: "var(--sc-ink)", transform: "rotate(-4deg)", boxShadow: "var(--sc-shadow)" }}>
      What's cooking, Chef?
    </div>
  </Panel>,
  <Panel key={6} i={5} n="06" kicker="Every bite connects" title={<>Your food life.<br />One app<Dot /></>}>
    <Phone alt="MealMate recipes" src={scr("recipes")} w={300} style={{ left: 30, top: 900, transform: "rotate(-14deg)" }} />
    <Phone alt="MealMate dining" src={scr("dining")} w={320} style={{ left: 230, top: 760, transform: "rotate(-6deg)" }} />
    <Phone alt="MealMate AI chef" src={scr("chat")} w={300} style={{ left: 740, top: 900, transform: "rotate(14deg)" }} />
    <Phone alt="MealMate planner" src={scr("planner")} w={320} style={{ left: 520, top: 760, transform: "rotate(6deg)" }} />
    <Phone alt="MealMate home" src={scr("home")} w={360} style={{ left: 340, top: 640, transform: "rotate(0deg)", zIndex: 5 }} />
    <div className="absolute bottom-[90px] left-0 right-0 z-30 flex items-center justify-center gap-6">
      <img src="/mascots/mascot-cherry.webp" alt="" width={110} height={110} className="rounded-[30px]" />
      <span className="font-display text-[96px] font-extrabold tracking-[-0.03em]">MealMate</span>
    </div>
  </Panel>,
];

function Showcase() {
  const { panel } = Route.useSearch();
  if (panel) {
    return <div className="showcase-root" style={{ width: W, height: H }}>{PANELS[panel - 1]}</div>;
  }
  const scale = 0.3;
  return (
    <main className="showcase-root min-h-screen p-8" style={{ background: "var(--sc-paper)", color: "var(--sc-ink)" }}>
      <h1 className="font-display text-3xl font-bold">MealMate launch campaign</h1>
      <p className="mt-1 text-sm" style={{ color: "oklch(0.45 0 0)" }}>Six connected screenshots. Open any panel for a full-size 1080×1920 export.</p>
      <div className="mt-6 overflow-x-auto pb-4">
        <div style={{ width: W * 6 * scale, height: H * scale }}>
          <div className="flex origin-top-left" style={{ transform: `scale(${scale})`, width: W * 6 }}>{PANELS}</div>
        </div>
      </div>
      <div className="mt-8 grid grid-cols-2 gap-6 md:grid-cols-3">
        {PANELS.map((p, i) => (
          <a key={i} href={`/showcase?panel=${i + 1}`} target="_blank" rel="noreferrer" className="block">
            <div className="overflow-hidden rounded-xl" style={{ width: W * 0.28, height: H * 0.28 }}>
              <div className="origin-top-left" style={{ transform: "scale(0.28)", width: W }}>{p}</div>
            </div>
            <span className="mt-2 block text-sm font-semibold">Panel {i + 1} — open full size</span>
          </a>
        ))}
      </div>
    </main>
  );
}
