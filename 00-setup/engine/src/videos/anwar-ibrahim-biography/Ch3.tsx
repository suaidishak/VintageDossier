// Chapter 3 - The Return (C3 - end). Date card -> alliance print -> pardon -> seats card -> 2022 -> PM portrait -> finale board.
import React from "react";
import { interpolate } from "remotion";
import { T } from "../../styles/dossier/tokens";
import { clamp, K, PenPath, pinAt, printBox, Roll, Stamp, StringLine, useSec, WorldCam, WorldDesk, WPrint, wobblyEllipse } from "../../styles/dossier/kit";
import { DateCard, E, glide, img, L, monoW, TL, WSvg } from "./common";

const P07 = { w: 900, a: 1.8473, keys: [{ t: 0, x: 540, y: 2050, s: 1, r: -1.2 }] as K[] };
const P05 = { w: 860, a: 1.7836, keys: [{ t: 0, x: 540, y: 2880, s: 1, r: 1.6 }] as K[] };
const SEATS = { x: 540, y: 4080 };
const D22 = { x: 540, y: 5150 };
const tE = E.glide_end.t;
const P06 = { w: 700, a: 0.8087, keys: [{ t: 0, x: 540, y: 6350, s: 1, r: -1 }, { t: tE, x: 540, y: 6350, s: 1, r: -1 }, { t: tE + 0.75, x: 330, y: 6110, s: 0.74, r: -3.5 }] as K[] };
const P01 = { w: 460, a: 0.6433, keys: [{ t: 0, x: 760, y: 6950, s: 1, r: 4 }] as K[] };

const cDate = { x: 540, y: 950, z: 1.0 };
const c07 = { x: 540, y: 2160, z: 1.02 };
const cPard = { x: 540, y: 2470, z: 0.97 };
const cSeats = { x: 540, y: 4100, z: 1.12 };
const cD22 = { x: 540, y: 5190, z: 1.08 };
const cP06 = { x: 540, y: 6330, z: 0.97 };
const cEnd = { x: 545, y: 6550, z: 0.8 };
const CAM: K[] = [
  { ...cDate, t: E.C3.t - 0.3 }, { ...cDate, t: E.glide_07.t, z: 1.05 },
  ...glide({ ...cDate, z: 1.05 }, c07, E.glide_07.t, E.glide_07.dur, 0.7, 1.5).slice(1),
  { ...c07, t: E.p05_in.t - 0.6, z: 1.06 },
  { ...cPard, t: E.p05_in.t + 0.1 }, { ...cPard, t: E.glide_seats.t, z: 1.01 },
  ...glide({ ...cPard, z: 1.01 }, cSeats, E.glide_seats.t, E.glide_seats.dur, 0.66, -1.5).slice(1),
  { ...cSeats, t: E.glide_pm.t, z: 1.17 },
  ...glide({ ...cSeats, z: 1.17 }, cD22, E.glide_pm.t, E.glide_pm.dur, 0.85).slice(1),
  { ...cD22, t: E.p06_in.t - 0.55, z: 1.12 },
  ...glide({ ...cD22, z: 1.12 }, cP06, E.p06_in.t - 0.55, 0.55, 0.8).slice(1),
  { ...cP06, t: tE, z: 1.02 },
  { ...cEnd, t: tE + 0.8 }, { ...cEnd, t: TL.duration, z: 0.83 },
];

const Alliance: React.FC = () => {
  const { b, H } = printBox(P07.w, P07.a); const h = P07.w / P07.a;
  return <WPrint src={img("07_anwar_mahathir")} aspect={P07.a} w={P07.w} keys={P07.keys} t0={E.p07_in.t} from={[0, -240, -7]}>
    <L id="p07_won" size={40} x={-20} y={-64} />
    <svg width={P07.w + 2 * b} height={H} style={{ position: "absolute", left: 0, top: 0, overflow: "visible" }}>
      <PenPath d={wobblyEllipse(b + 0.47 * P07.w, b + 0.36 * h, 0.33 * P07.w, 0.3 * h, 7)} t={E.p07_circle.t} dur={E.p07_circle.dur} width={6} />
    </svg>
    <L id="p07_rival" size={40} red x={10} y={H + 14} />
  </WPrint>;
};

const Seats: React.FC = () => {
  const { s } = useSec(); const r = E.n_82; const op = interpolate(s, [r.t - 0.05, r.t + 0.12], [0, 1], clamp);
  const u = interpolate(s, [E.n_under.t, E.n_under.t + E.n_under.dur], [0, 1], clamp);
  const nw = monoW(E.n_need.text.length, 52) + 46;
  return <>
    <L id="n_lab" size={44} x={SEATS.x - monoW(E.n_lab.text.length, 44) / 2 - 20} y={SEATS.y - 270} />
    {s >= r.t ? <div style={{ position: "absolute", left: SEATS.x - 500, width: 1000, top: SEATS.y - 190, textAlign: "center", fontFamily: T.font.serif, fontWeight: 700, fontSize: 280, lineHeight: 1, color: T.color.title, opacity: op, textShadow: "0 6px 30px rgba(0,0,0,0.6)" }}>
      <Roll from={r.from} to={r.to} t={r.t} t2={r.t2} /></div> : null}
    <L id="n_need" size={52} red x={SEATS.x - nw / 2} y={SEATS.y + 120} />
    <WSvg>{u > 0 ? <line x1={SEATS.x - nw / 2} y1={SEATS.y + 216} x2={SEATS.x - nw / 2 + nw * u} y2={SEATS.y + 220} stroke={T.color.red} strokeWidth={6} strokeLinecap="round" /> : null}</WSvg>
  </>;
};

export const Ch3: React.FC = () => {
  const { s } = useSec();
  const { H: H5 } = printBox(P05.w, P05.a); const { H: H6 } = printBox(P06.w, P06.a); const { H: H1 } = printBox(P01.w, P01.a);
  const a = pinAt(P01.w, P01.a, P01.keys, s), b = pinAt(P06.w, P06.a, P06.keys, s);
  return <WorldCam keys={CAM}>
    <WorldDesk w={2200} h={8200} />
    <DateCard cx={cDate.x} cy={cDate.y} dayId="d_may" rollId="d_2018" size={250} />
    <L id="d_twist" size={52} red x={540 - monoW(7, 52) / 2 - 23} y={cDate.y + 230} until={E.glide_07.t + 0.5} />
    <Alliance />
    <WPrint src={img("05_anwar_2018")} aspect={P05.a} w={P05.w} keys={P05.keys} t0={E.p05_in.t} from={[220, -60, 8]}>
      <L id="p05_date" size={40} x={-20} y={H5 + 12} />
    </WPrint>
    <Stamp text="PARDONED" t={E.st_pardon.t} x={600} y={2860} size={64} rot={-8} />
    <Seats />
    <DateCard cx={D22.x} cy={D22.y} dayId="e_day" rollId="e_2022" size={240} />
    <WPrint src={img("06_anwar_pm")} aspect={P06.a} w={P06.w} keys={P06.keys} t0={E.p06_in.t} from={[0, -260, 6]}>
      <L id="p06_tenth" size={46} red x={-20} y={H6 + 14} />
      <L id="p06_age" size={46} x={-20} y={H6 + 96} />
      {s >= E.p06_75.t ? <div style={{ position: "absolute", left: -20 + 3 * 0.68 * 46 + 70, top: H6 + 96, fontFamily: T.font.mono, fontWeight: 700, fontSize: 46, letterSpacing: "0.08em", color: T.color.tapeText, background: T.color.tape, padding: "6px 16px", lineHeight: 1.15 }}><Roll from={E.p06_75.from} to={E.p06_75.to} t={E.p06_75.t} t2={E.p06_75.t2} /></div> : null}
    </WPrint>
    <WPrint src={img("01_anwar_1998")} aspect={P01.a} w={P01.w} keys={P01.keys} t0={E.p01b_in.t} from={[160, 200, 9]}>
      <L id="f_pris" size={44} red x={-20} y={H1 + 14} />
    </WPrint>
    <WSvg><StringLine a={a} b={b} t={E.f_str.t} dur={E.f_str.dur} sag={120} /></WSvg>
    <L id="f_24" size={56} red x={600} y={5780} />
    <L id="f_pm" size={44} x={600} y={5890} />
  </WorldCam>;
};
