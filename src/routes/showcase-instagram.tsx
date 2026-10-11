import { createFileRoute } from "@tanstack/react-router";
import type { CSSProperties, ReactNode } from "react";
import { z } from "zod";

const W = 1080;
const H = 1350;

export const Route = createFileRoute("/showcase-instagram")({
  validateSearch: z.object({ post: z.number().int().min(1).max(3).optional() }),
  head: () => ({
    meta: [
      { title: "MealMate Instagram Campaign | Posts" },
      { name: "description", content: "Three connected Instagram posts for MealMate." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "MealMate Instagram Campaign" },
      { property: "og:description", content: "Three connected Instagram posts for MealMate." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: InstagramShowcase,
});

const S = "/showcase/";
const scr = (n: string) => `${S}screens/${n}.jpg`;

const FLOW =
  "M -60 1080 C 260 960, 420 1220, 700 1090 S 1000 820, 1240 940 S 1640 1200, 1900 1060 S 2240 760, 2480 900 S 2900 1180, 3300 1000";
const FLOW2 = "M -60 300 C 400 220, 700 420, 1080 330 S 1700 200, 2160 300 S 2900 440, 3300 320";

type Floater = { x: number; y: number; w: number; src: string; r: number; round?: boolean };
const FLOATERS: Floater[] = [
  { x: 830, y: 1080, w: 230, src: "potjiekos.jpg", r: -8, round: true },
  { x: 980, y: 640, w: 200, src: "cut-tomato.png", r: -12 },
  { x: 30, y: 1050, w: 240, src: "cut-basil.png", r: 18 },
  { x: 1880, y: 1110, w: 210, src: "tacos.jpg", r: 10, round: true },
  { x: 2060, y: 560, w: 230, src: "cut-chili.png", r: 28 },
  { x: 1180, y: 1120, w: 200, src: "cut-avocado.png", r: -18 },
  { x: 2240, y: 1120, w: 140, src: "cut-lime.png", r: 30 },
  { x: 3010, y: 1040, w: 210, src: "alfredo.jpg", r: 8, round: true },
  { x: 2990, y: 430, w: 190, src: "bowl.jpg", r: -6, round: true },
];

function Phone({ src, style, w, alt }: { src: string; style?: CSSProperties; w: number; alt: string }) {
  const h = Math.round(w * (844 / 390));
  return (
    <div
      className="absolute"
      style={{
        width: w + 20,
        height: h + 20,
        padding: 10,
        borderRadius: w * 0.15,
        background: "var(--sc-ink)",
        boxShadow: "var(--sc-shadow), inset 0 0 0 2px oklch(0.35 0 0)",
        ...style,
      }}
    >
      <img src={src} alt={alt} width={w} height={h} className="block h-full w-full object-cover" style={{ borderRadius: w * 0.13 }} />
    </div>
  );
}

function Post({ i, n, kicker, title, children }: { i: number; n: string; kicker: string; title: ReactNode; children: ReactNode }) {
  const off = i * W;
  return (
    <section
      data-post={i + 1}
      className="relative shrink-0 overflow-hidden"
      style={{ width: W, height: H, background: "var(--sc-ink)", color: "var(--sc-paper)" }}
    >
      <svg className="pointer-events-none absolute inset-0" width={W} height={H} viewBox={`${off} 0 ${W} ${H}`} aria-hidden>
        <path d={FLOW2} fill="none" stroke="var(--sc-paper)" strokeOpacity="0.14" strokeWidth="2" strokeDasharray="4 14" strokeLinecap="round" />
        <path d={FLOW} fill="none" stroke="var(--sc-paper)" strokeOpacity="0.08" strokeWidth="50" strokeLinecap="round" />
        <path d={FLOW} fill="none" stroke="var(--sc-paper)" strokeWidth="4" strokeLinecap="round" />
      </svg>
      <header className="absolute left-[70px] right-[70px] top-[70px] z-30">
        <div className="flex items-center gap-4 font-sans text-[22px] font-semibold uppercase tracking-[0.3em]" style={{ color: "var(--sc-mute)" }}>
          <span style={{ color: "var(--sc-paper)" }}>{n}</span>
          <span className="h-[2px] w-14" style={{ background: "var(--sc-mute)" }} />
          {kicker}
        </div>
        <h2 className="mt-6 font-display text-[92px] font-extrabold uppercase leading-[0.9] tracking-[-0.03em]">{title}</h2>
      </header>
      <div className="absolute inset-0 z-10">{children}</div>
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
            border: f.round ? "7px solid var(--sc-paper)" : undefined,
            filter: f.round ? undefined : "drop-shadow(0 30px 30px oklch(0 0 0 / 0.55))",
          }}
        />
      ))}
    </section>
  );
}

const Dot = () => <span style={{ color: "var(--sc-accent)" }}>.</span>;

const POSTS = [
  <Post key={1} i={0} n="01" kicker="Discover" title={<>Your next<br />favourite bite<Dot /></>}>
    <Phone alt="MealMate restaurant discovery" src={scr("dining")} w={330} style={{ left: 120, top: 470, transform: "rotate(-9deg)" }} />
    <Phone alt="MealMate home screen" src={scr("home")} w={360} style={{ left: 480, top: 400, transform: "rotate(6deg)" }} />
  </Post>,
  <Post key={2} i={1} n="02" kicker="Plan & cook" title={<>What's cooking<br />today?</>}>
    <Phone alt="MealMate recipes" src={scr("recipe")} w={300} style={{ left: 60, top: 520, transform: "rotate(-11deg)" }} />
    <Phone alt="MealMate shopping list" src={scr("list")} w={300} style={{ left: 700, top: 520, transform: "rotate(11deg)" }} />
    <Phone alt="MealMate meal planner" src={scr("planner")} w={340} style={{ left: 360, top: 420, transform: "rotate(0deg)", zIndex: 5 }} />
  </Post>,
  <Post key={3} i={2} n="03" kicker="Your food sidekick" title={<>Your food life.<br />One app<Dot /></>}>
    <Phone alt="MealMate dining" src={scr("dining")} w={270} style={{ left: 60, top: 560, transform: "rotate(-12deg)" }} />
    <Phone alt="Mia, the MealMate AI chef" src={scr("chat")} w={340} style={{ left: 330, top: 420, zIndex: 5, transform: "rotate(3deg)" }} />
    <img src={S + "mia.png"} alt="Mia, the MealMate mascot" className="absolute z-20" style={{ left: 640, top: 780, width: 260, transform: "rotate(10deg)", filter: "drop-shadow(0 40px 40px oklch(0 0 0 / 0.6))" }} />
    <div className="absolute z-30 rounded-[32px] px-8 py-5 font-sans text-[28px] font-semibold" style={{ left: 640, top: 660, background: "var(--sc-paper)", color: "var(--sc-ink)", transform: "rotate(4deg)", boxShadow: "var(--sc-shadow)" }}>
      What's cooking, Chef?
    </div>
    <div className="absolute bottom-[50px] left-0 right-0 z-30 flex items-center justify-center gap-4">
      <img src="/mascots/mascot-cherry.webp" alt="" width={80} height={80} className="rounded-[22px]" />
      <span className="font-display text-[68px] font-extrabold tracking-[-0.03em]">MealMate</span>
    </div>
  </Post>,
];

function InstagramShowcase() {
  const { post } = Route.useSearch();
  if (post) {
    return <div className="showcase-root" style={{ width: W, height: H }}>{POSTS[post - 1]}</div>;
  }
  const scale = 0.4;
  return (
    <main className="showcase-root min-h-screen p-8" style={{ background: "var(--sc-paper)", color: "var(--sc-ink)" }}>
      <h1 className="font-display text-3xl font-bold">MealMate Instagram campaign</h1>
      <p className="mt-1 text-sm" style={{ color: "oklch(0.45 0 0)" }}>Three connected 1080×1350 posts. Open a post for a full-size PNG export.</p>
      <div className="mt-6 overflow-x-auto pb-4">
        <div className="flex gap-[2px]" style={{ width: (W * scale + 2) * 3, height: H * scale }}>
          {POSTS.map((p, i) => (
            <div key={i} className="overflow-hidden" style={{ width: W * scale, height: H * scale }}>
              <div className="origin-top-left" style={{ transform: `scale(${scale})`, width: W }}>{p}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-6 flex flex-wrap gap-3">
        {[1, 2, 3].map((n) => (
          <a key={n} href={`/showcase-instagram?post=${n}`} target="_blank" rel="noreferrer" className="rounded-full px-5 py-2 text-sm font-semibold" style={{ background: "var(--sc-ink)", color: "var(--sc-paper)" }}>
            Open post {n} full size
          </a>
        ))}
      </div>
    </main>
  );
}
