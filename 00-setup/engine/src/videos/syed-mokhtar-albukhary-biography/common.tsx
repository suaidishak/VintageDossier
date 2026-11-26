// Shared helpers for the Syed Mokhtar Albukhary vertical video (1080x1920).
import React from "react";
import { Img, interpolate, spring, staticFile } from "remotion";
import { T } from "../../styles/dossier/tokens";
import { clamp, K, Pin, Roll, TypeLabel, useProg, useSec } from "../../styles/dossier/kit";
import TLJ from "./timeline.json";
import MAPJ from "../../../public/syed-mokhtar-albukhary-biography/map_malaya.json";
import OCEANJ from "../../../public/syed-mokhtar-albukhary-biography/map_ocean.json";

export const TL = TLJ as any;
export const E = TL.ev as Record<string, any>;
export const MAP = MAPJ as any;
export const OCEAN = OCEANJ as any;
export const SLUG = "syed-mokhtar-albukhary-biography";
export const DESK = `${SLUG}/desk.jpg`;
export const img = (n: string) => `${SLUG}/${n}.jpg`;
export const monoW = (n: number, size: number) => n * 0.68 * size;
const INK = "#2a2118";

export const glide = (a: Omit<K, "t">, b: Omit<K, "t">, t: number, dur: number, zMid = 0.7, rMid = 0): K[] => [
  { ...a, t }, { t: t + dur * 0.5, x: (a.x + b.x) / 2, y: (a.y + b.y) / 2, z: zMid, r: rMid }, { ...b, t: t + dur },
];

export const L: React.FC<{ id: string; size?: number; x?: number; y?: number; red?: boolean; bar?: boolean; until?: number; style?: React.CSSProperties }> = ({ id, size = 30, x = 0, y = 0, red, bar = true, until = 1e9, style }) => {
  const { s } = useSec(); const e = E[id]; if (s >= until) return null;
  return <TypeLabel text={e.text} t={e.t} cps={e.cps} size={size} bar={bar} style={{ left: x, top: y, ...(red ? { background: T.color.red, color: "#f6eee0" } : {}), ...style }} />;
};
/** centred typed label */
export const LC: React.FC<{ id: string; size?: number; cx: number; y: number; red?: boolean; until?: number }> = ({ id, size = 30, cx, y, red, until }) =>
  <L id={id} size={size} x={cx - (monoW(E[id].text.length, size) + size * 0.9) / 2} y={y} red={red} until={until} />;

/** date card: optional typed small line over a huge rolling year */
export const DateCard: React.FC<{ cx: number; cy: number; dayId?: string; rollId: string; size?: number; suffix?: string }> = ({ cx, cy, dayId, rollId, size = 240, suffix = "" }) => {
  const { s } = useSec(); const r = E[rollId]; const rule = useProg(r.t, 0.45);
  const dot = interpolate(s, [r.t2, r.t2 + 0.12], [0, 1], clamp); const yOp = interpolate(s, [r.t - 0.05, r.t + 0.12], [0, 1], clamp);
  const ds = size * 0.19;
  return <>
    {dayId ? <TypeLabel text={E[dayId].text} t={E[dayId].t} cps={E[dayId].cps} size={ds} bar={false} style={{ color: T.color.title, left: cx - monoW(E[dayId].text.length, ds) / 2, top: cy - size * 0.8 }} /> : null}
    <div style={{ position: "absolute", left: cx - 600, width: 1200, top: cy - size * 0.55, textAlign: "center", fontFamily: T.font.serif, fontWeight: 700, fontSize: size, lineHeight: 1, color: T.color.title, opacity: yOp, textShadow: "0 6px 30px rgba(0,0,0,0.6)" }}>
      <Roll from={r.from} to={r.to} t={r.t} t2={r.t2} /><span style={{ opacity: dot }}>{suffix}</span><span style={{ color: T.color.red, opacity: dot }}>.</span>
    </div>
    <div style={{ position: "absolute", top: cy + size * 0.6, left: cx - 40 - 260 * rule, width: 260 * rule, height: 2, background: "rgba(239,230,210,0.55)" }} />
    <div style={{ position: "absolute", top: cy + size * 0.6, left: cx + 40, width: 260 * rule, height: 2, background: "rgba(239,230,210,0.55)" }} />
  </>;
};

/** rolling number in a tape bar */
export const RollTape: React.FC<{ id: string; pre: string; post: string; x: number; y: number; size?: number; red?: boolean; fmt?: (v: number) => string }> = ({ id, pre, post, x, y, size = 30, red }) => {
  const { s } = useSec(); const r = E[id]; if (s < r.t) return null;
  return <div style={{ position: "absolute", left: x, top: y, fontFamily: T.font.mono, fontWeight: 700, fontSize: size, letterSpacing: "0.08em", color: red ? "#f6eee0" : T.color.tapeText, background: red ? T.color.red : T.color.tape, padding: `${size * 0.18}px ${size * 0.45}px`, whiteSpace: "pre", lineHeight: 1.15, boxShadow: "0 2px 6px rgba(0,0,0,0.5)" }}>
    {pre}<Roll from={r.from} to={r.to} t={r.t} t2={r.t2} />{post}
  </div>;
};

export const WSvg: React.FC<{ children: React.ReactNode }> = ({ children }) => <svg width={10} height={10} style={{ position: "absolute", left: 0, top: 0, overflow: "visible" }}>{children}</svg>;

/** paper index card dropped on the desk (world centre x,y), with a pin and children inside */
export const Card: React.FC<{ x: number; y: number; w: number; h: number; t: number; rot?: number; children?: React.ReactNode }> = ({ x, y, w, h, t, rot = 0, children }) => {
  const { f, fr, fps } = useSec(); if (f < fr(t)) return null;
  const p = spring({ frame: f - fr(t), fps, config: T.motion.printIn }); const lift = 1 - p;
  return <div style={{ position: "absolute", left: x - w / 2, top: y - h / 2, width: w, height: h, transform: `translate(0px, ${-70 * lift}px) rotate(${rot + 6 * lift}deg) scale(${1 + 0.25 * lift})`, opacity: Math.min(1, p * 2.5), background: T.color.paperEdge, boxShadow: `0 ${16 + 40 * lift}px ${36 + 50 * lift}px rgba(0,0,0,0.55), 0 3px 8px rgba(0,0,0,0.5)` }}>
    <Img src={staticFile("paper.jpg")} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.7, mixBlendMode: "multiply" }} />
    <Pin x={w / 2} y={14} />
    {children}
  </div>;
};

const usePop = (t: number) => { const { f, fr, fps } = useSec(); return f < fr(t) ? 0 : spring({ frame: f - fr(t), fps, config: { damping: 9, stiffness: 220, mass: 0.6 } }); };
/** cartoon lorry that drives from a to b between t and t+dur (svg, world or local px) */
export const LorryIcon: React.FC<{ a: [number, number]; b: [number, number]; t: number; dur: number; size?: number; sacks?: boolean }> = ({ a, b, t, dur, size = 150, sacks = true }) => {
  const { s, f } = useSec(); const pop = usePop(t); if (pop <= 0) return null;
  const u = interpolate(s, [t, t + dur], [0, 1], { ...clamp, easing: (x) => 1 - (1 - x) ** 3 });
  const x = a[0] + (b[0] - a[0]) * u, y = a[1] + (b[1] - a[1]) * u; const moving = u < 1; const bob = moving ? Math.sin(f * 1.4) * 1.6 : 0;
  return <g transform={`translate(${x},${y + bob}) scale(${(size / 100) * Math.min(1, pop)})`}>
    <ellipse cx={0} cy={30} rx={62} ry={9} fill="rgba(0,0,0,0.28)" />
    <rect x={-58} y={-26} width={74} height={44} rx={4} fill="#5b4a36" stroke={INK} strokeWidth={3} />
    {sacks ? [[-48, -34], [-28, -36], [-8, -34], [-38, -48], [-18, -48]].map(([sx, sy], i) => <ellipse key={i} cx={sx} cy={sy} rx={11} ry={8} fill="#d8ccb0" stroke={INK} strokeWidth={2.5} />) : null}
    <path d="M18,-18 L44,-18 L58,0 L58,18 L18,18 Z" fill={T.color.red} stroke={INK} strokeWidth={3} />
    <rect x={26} y={-13} width={18} height={12} fill="#d8ccb0" stroke={INK} strokeWidth={2} />
    {[-38, 38].map((wx) => <g key={wx} transform={`translate(${wx},22) rotate(${moving ? f * 25 : 0})`}><circle r={11} fill={INK} /><circle r={4} fill="#d8ccb0" /><rect x={-1.5} y={-10} width={3} height={6} fill="#d8ccb0" /></g>)}
    {moving ? <circle cx={-66 - (f % 6) * 3} cy={12} r={5 + (f % 6)} fill="rgba(120,108,90,0.45)" /> : null}
  </g>;
};
/** small pop-in pictograms (svg) */
export const Pict: React.FC<{ kind: "crane" | "power" | "plane" | "rice" | "mail" | "car" | "bank"; x: number; y: number; t: number; size?: number }> = ({ kind, x, y, t, size = 80 }) => {
  const pop = usePop(t); if (pop <= 0) return null; const k = (size / 100) * pop;
  const body = {
    crane: <g><rect x={-6} y={-60} width={12} height={70} fill={INK} /><rect x={-40} y={-64} width={80} height={10} fill={T.color.red} stroke={INK} strokeWidth={3} /><line x1={30} y1={-54} x2={30} y2={-20} stroke={INK} strokeWidth={3} /><rect x={20} y={-22} width={22} height={14} fill="#5b4a36" stroke={INK} strokeWidth={2} /><rect x={-30} y={10} width={60} height={8} fill={INK} /></g>,
    power: <g><path d="M-30,20 L-22,-40 L-8,-40 L0,20 Z" fill="#5b4a36" stroke={INK} strokeWidth={3} /><rect x={0} y={-10} width={36} height={30} fill="#5b4a36" stroke={INK} strokeWidth={3} /><path d="M18,-34 L8,-14 L18,-14 L10,6" fill="none" stroke={T.color.red} strokeWidth={5} strokeLinejoin="round" /><circle cx={-15} cy={-52} r={9} fill="rgba(120,108,90,0.55)" /></g>,
    plane: <g transform="rotate(-20)"><path d="M-50,0 Q-40,-8 40,-5 Q55,0 40,5 Q-40,8 -50,0 Z" fill={INK} /><path d="M-5,-5 L-18,-46 L2,-46 L18,-5 Z M-5,5 L-18,46 L2,46 L18,5 Z" fill="#5b4a36" stroke={INK} strokeWidth={3} /><circle cx={4} cy={-28} r={5} fill={T.color.red} /></g>,
    rice: <g><path d="M-30,30 Q-36,-10 -18,-32 L18,-32 Q36,-10 30,30 Z" fill="#d8ccb0" stroke={INK} strokeWidth={4} /><path d="M-18,-32 Q0,-44 18,-32" fill="none" stroke={INK} strokeWidth={4} /><path d="M-14,0 L14,0 M-14,10 L14,10" stroke={T.color.red} strokeWidth={5} /></g>,
    mail: <g><rect x={-40} y={-26} width={80} height={52} rx={4} fill="#d8ccb0" stroke={INK} strokeWidth={4} /><path d="M-40,-26 L0,6 L40,-26" fill="none" stroke={INK} strokeWidth={4} /><rect x={18} y={-20} width={14} height={16} fill={T.color.red} /></g>,
    car: <g><path d="M-48,8 L-40,-12 L-18,-14 L-6,-30 L26,-30 L40,-12 L50,-8 L50,10 L-48,10 Z" fill={T.color.red} stroke={INK} strokeWidth={4} strokeLinejoin="round" /><rect x={-2} y={-26} width={24} height={13} fill="#d8ccb0" stroke={INK} strokeWidth={2} />{[-26, 30].map((wx) => <g key={wx}><circle cx={wx} cy={12} r={11} fill={INK} /><circle cx={wx} cy={12} r={4} fill="#d8ccb0" /></g>)}</g>,
    bank: <g><path d="M-44,-14 L0,-44 L44,-14 Z" fill="#5b4a36" stroke={INK} strokeWidth={4} strokeLinejoin="round" />{[-30, -10, 10, 30].map((cx) => <rect key={cx} x={cx - 5} y={-12} width={10} height={36} fill="#d8ccb0" stroke={INK} strokeWidth={2.5} />)}<rect x={-48} y={24} width={96} height={10} fill={INK} /><circle cx={0} cy={-26} r={6} fill={T.color.red} /></g>,
  }[kind];
  return <g transform={`translate(${x},${y}) scale(${k})`}><ellipse cx={4} cy={36} rx={44} ry={8} fill="rgba(0,0,0,0.22)" />{body}</g>;
};
