// Shared helpers for the Anwar Ibrahim vertical video (1080x1920).
import React from "react";
import { interpolate } from "remotion";
import { T } from "../../styles/dossier/tokens";
import { clamp, K, Roll, TypeLabel, useProg, useSec } from "../../styles/dossier/kit";
import TLJ from "./timeline.json";
import MAPJ from "../../../public/anwar-ibrahim-biography/map_malaya.json";

export const TL = TLJ as any;
export const E = TL.ev as Record<string, any>;
export const MAP = MAPJ as any;
export const SLUG = "anwar-ibrahim-biography";
export const img = (n: string) => `${SLUG}/${n}.jpg`;
export const monoW = (n: number, size: number) => n * 0.68 * size;

/** camera glide: leave `a` at t, arc through a pulled-back midpoint, land on `b` at t+dur */
export const glide = (a: Omit<K, "t">, b: Omit<K, "t">, t: number, dur: number, zMid = 0.7, rMid = 0): K[] => [
  { ...a, t },
  { t: t + dur * 0.5, x: (a.x + b.x) / 2, y: (a.y + b.y) / 2, z: zMid, r: rMid },
  { ...b, t: t + dur },
];
/** hold with slow push (3-7 %) */
export const hold = (b: Omit<K, "t">, t: number, t2: number, push = 0.045): K[] => [{ ...b, t }, { ...b, t: t2, z: (b.z ?? 1) * (1 + push) }];
export const pushZ = (k: Omit<K, "t">, p: number) => ({ ...k, z: (k.z ?? 1) * (1 + p) });

/** typed label that disappears at `until` */
export const L: React.FC<{ id: string; size?: number; x?: number; y?: number; red?: boolean; bar?: boolean; until?: number; style?: React.CSSProperties }> = ({ id, size = 30, x = 0, y = 0, red, bar = true, until = 1e9, style }) => {
  const { s } = useSec(); const e = E[id]; if (s >= until) return null;
  return <TypeLabel text={e.text} t={e.t} cps={e.cps} size={size} bar={bar} style={{ left: x, top: y, ...(red ? { background: T.color.red, color: "#f6eee0" } : {}), ...style }} />;
};

/** date card: typed small line over a huge rolling year, hairline rules, red full stop (world coords, centred at cx) */
export const DateCard: React.FC<{ cx: number; cy: number; dayId?: string; rollId: string; size?: number }> = ({ cx, cy, dayId, rollId, size = 190 }) => {
  const { s } = useSec(); const r = E[rollId]; const rule = useProg(r.t, 0.45);
  const dot = interpolate(s, [r.t2, r.t2 + 0.12], [0, 1], clamp);
  const yOp = interpolate(s, [r.t - 0.05, r.t + 0.12], [0, 1], clamp);
  const half = size * 1.45;
  return <>
    {dayId ? <TypeLabel text={E[dayId].text} t={E[dayId].t} cps={E[dayId].cps} size={size * 0.19} bar={false} style={{ color: T.color.title, left: cx - monoW(E[dayId].text.length, size * 0.19) / 2, top: cy - size * 0.78 }} /> : null}
    <div style={{ position: "absolute", left: cx - 600, width: 1200, top: cy - size * 0.55, textAlign: "center", fontFamily: T.font.serif, fontWeight: 700, fontSize: size, lineHeight: 1, color: T.color.title, opacity: yOp, textShadow: "0 6px 30px rgba(0,0,0,0.6)" }}>
      <Roll from={r.from} to={r.to} t={r.t} t2={r.t2} /><span style={{ color: T.color.red, opacity: dot }}>.</span>
    </div>
    <div style={{ position: "absolute", top: cy + size * 0.6, left: cx - 40 - 260 * rule, width: 260 * rule, height: 2, background: "rgba(239,230,210,0.55)" }} />
    <div style={{ position: "absolute", top: cy + size * 0.6, left: cx + 40, width: 260 * rule, height: 2, background: "rgba(239,230,210,0.55)" }} />
  </>;
};

/** rolling number inside a tape bar: "<pre><n><post>" */
export const RollTape: React.FC<{ id: string; pre: string; post: string; x: number; y: number; size?: number; red?: boolean; until?: number }> = ({ id, pre, post, x, y, size = 30, red, until = 1e9 }) => {
  const { s } = useSec(); const r = E[id]; if (s < r.t || s >= until) return null;
  return <div style={{ position: "absolute", left: x, top: y, fontFamily: T.font.mono, fontWeight: 700, fontSize: size, letterSpacing: "0.08em", color: red ? "#f6eee0" : T.color.tapeText, background: red ? T.color.red : T.color.tape, padding: `${size * 0.18}px ${size * 0.45}px`, whiteSpace: "pre", lineHeight: 1.15, boxShadow: "0 2px 6px rgba(0,0,0,0.5)" }}>
    {pre}<Roll from={r.from} to={r.to} t={r.t} t2={r.t2} />{post}
  </div>;
};

/** world-space svg overlay */
export const WSvg: React.FC<{ children: React.ReactNode }> = ({ children }) => <svg width={10} height={10} style={{ position: "absolute", left: 0, top: 0, overflow: "visible" }}>{children}</svg>;
