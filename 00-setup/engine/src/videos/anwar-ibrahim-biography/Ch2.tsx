// Chapter 2 - The Fall (C2 - C3). Descending column: crisis -> split -> sacked -> Reformasi -> arrest -> courts -> map 2 -> prison.
import React from "react";
import { interpolate } from "remotion";
import { T } from "../../styles/dossier/tokens";
import { clamp, K, MapBase, MapText, mapXY, PenPath, pinAt, printBox, PulseMarker, Roll, Stamp, StringLine, useSec, WorldCam, WorldDesk, WPrint, wobblyEllipse } from "../../styles/dossier/kit";
import { E, glide, img, L, MAP, monoW, RollTape, WSvg } from "./common";

const tS = E.b_split.t;
const MAH = { w: 380, a: 0.7473, keys: [{ t: 0, x: 330, y: 1560, s: 1, r: -3 }, { t: tS, x: 330, y: 1560, s: 1, r: -3 }, { t: tS + 0.45, x: 300, y: 1590, s: 0.96, r: -7 }] as K[] };
const ANW = { w: 380, a: 0.6433, keys: [{ t: 0, x: 760, y: 1560, s: 1, r: 2.5 }, { t: tS, x: 760, y: 1560, s: 1, r: 2.5 }, { t: tS + 0.45, x: 770, y: 1580, s: 1, r: 5 }] as K[] };
const P04 = { w: 900, a: 1.569, keys: [{ t: 0, x: 540, y: 2740, s: 1, r: -1.5 }] as K[] };
const C2P = { w: 900, a: 1.4911, keys: [{ t: 0, x: 540, y: 3930, s: 1, r: 1.2 }] as K[] };
const MP = { x: 1500, y: 3020, s: 0.62 };
const mw = (lon: number, lat: number): [number, number] => { const p = mapXY(MAP, lon, lat); return [MP.x + p[0] * MP.s, MP.y + p[1] * MP.s]; };
const PP = mw(100.42, 5.40);
const C3P = { w: 860, a: 1.4911, keys: [{ t: 0, x: 2020, y: 4560, s: 1, r: -1.8 }] as K[] };
const LX = 110, LY = 4340; // verdict sheet labels

const cTop = { x: 540, y: 1150, z: 1.0 };
const cSack = { x: 540, y: 1420, z: 1.04 };
const cRef = { x: 540, y: 2760, z: 1.0 };
const cArr = { x: 540, y: 1660, z: 1.2 };
const cCourt = { x: 540, y: 4200, z: 0.98 };
const cMap = { x: 1880, y: 3560, z: 1.18 };
const cPrison = { x: 2020, y: 4620, z: 1.05 };
const CAM: K[] = [
  { ...cTop, t: E.C2.t - 0.3 }, { ...cTop, t: E.b_date.t - 0.5, z: 1.04 },
  { ...cSack, t: E.b_date.t + 0.1 }, { ...cSack, t: E.p04_in.t - 0.5, z: 1.17 },
  ...glide({ ...cSack, z: 1.17 }, cRef, E.p04_in.t - 0.5, 0.55, 0.72, 1.5).slice(1),
  { ...cRef, t: E.glide_arrest.t, z: 1.05 },
  ...glide({ ...cRef, z: 1.05 }, cArr, E.glide_arrest.t, E.glide_arrest.dur, 0.68, -1.5).slice(1),
  { ...cArr, t: E.c2_in.t - 0.7, z: 1.25 },
  ...glide({ ...cArr, z: 1.25 }, cCourt, E.c2_in.t - 0.7, 0.7, 0.6, 1).slice(1),
  { ...cCourt, t: E.glide_2008.t, z: 1.04 },
  ...glide({ ...cCourt, z: 1.04 }, cMap, E.glide_2008.t, E.glide_2008.dur, 0.6, -2).slice(1),
  { ...cMap, t: E.c3_in.t - 0.55, z: 1.23 },
  ...glide({ ...cMap, z: 1.23 }, cPrison, E.c3_in.t - 0.55, 0.55, 0.8).slice(1),
  { ...cPrison, t: E.C3.t + 0.3, z: 1.1 },
];

const Split: React.FC = () => {
  const { s } = useSec();
  const pa = pinAt(MAH.w, MAH.a, MAH.keys, s), pb = pinAt(ANW.w, ANW.a, ANW.keys, s);
  const { b, H } = printBox(ANW.w, ANW.a); const h = ANW.w / ANW.a;
  const showStr = s < tS + 0.05;
  return <>
    <WPrint src={img("03_mahathir_1980s")} aspect={MAH.a} w={MAH.w} keys={MAH.keys} t0={E.C2.t + 0.2} from={[-140, 40, -6]} />
    <WPrint src={img("01_anwar_1998")} aspect={ANW.a} w={ANW.w} keys={ANW.keys} t0={E.C2.t + 0.35} from={[140, 40, 6]}>
      <svg width={ANW.w + 2 * b} height={H} style={{ position: "absolute", left: 0, top: 0, overflow: "visible" }}>
        <PenPath d={wobblyEllipse(b + 0.52 * ANW.w, b + 0.71 * h, 0.21 * ANW.w, 0.13 * h, 5)} t={E.b_circle.t} dur={E.b_circle.dur} width={4} />
      </svg>
      <L id="b_arrest" size={30} x={-40} y={H + 12} />
    </WPrint>
    <WSvg>
      {showStr ? <StringLine a={pa} b={pb} t={E.C2.t + 0.9} dur={0.4} sag={110} /> : null}
      <PenPath d={`M${545 - 45},${1310} L${545 + 45},${1390} M${545 + 45},${1310} L${545 - 45},${1390}`} t={tS} dur={E.b_split.dur} width={8} />
    </WSvg>
    <Stamp text="SACKED" t={E.st_sacked.t} x={770} y={1420} size={58} rot={-11} />
  </>;
};

const Verdict: React.FC = () => {
  const { s } = useSec();
  const strike = interpolate(s, [E.c2_strike.t, E.c2_strike.t + E.c2_strike.dur], [0, 1], clamp);
  const sw = monoW(E.c2_sod.text.length, 40) + 36;
  const r = E.c2_2004; const op = interpolate(s, [r.t - 0.05, r.t + 0.12], [0, 1], clamp);
  return <>
    <L id="c2_cor" size={40} x={LX} y={LY} />
    <L id="c2_sod" size={40} x={LX} y={LY + 76} />
    <WSvg>{strike > 0 ? <line x1={LX - 10} y1={LY + 104} x2={LX - 10 + (sw + 20) * strike} y2={LY + 100} stroke={T.color.red} strokeWidth={7} strokeLinecap="round" /> : null}</WSvg>
    <L id="c2_over" size={40} red x={LX + sw + 30} y={LY + 76} />
    <L id="c2_pol" size={40} red x={LX} y={LY + 172} />
    <L id="c2_rights" size={40} red x={LX} y={LY + 248} />
    {s >= r.t ? <div style={{ position: "absolute", left: 540 - 500, width: 1000, top: LY + 350, textAlign: "center", fontFamily: T.font.serif, fontWeight: 700, fontSize: 200, lineHeight: 1, color: T.color.title, opacity: op, textShadow: "0 6px 30px rgba(0,0,0,0.6)" }}>
      <Roll from={r.from} to={r.to} t={r.t} t2={r.t2} /><span style={{ color: T.color.red }}>.</span></div> : null}
    <RollTape id="c2_six" pre="FREE AFTER " post=" YEARS" x={LX + 60} y={LY + 590} size={44} />
  </>;
};

const Map2: React.FC = () => {
  const P = (lon: number, lat: number) => mapXY(MAP, lon, lat); const pp = P(100.42, 5.40); const kl = P(101.69, 3.14);
  return <MapBase map={MAP} x={MP.x} y={MP.y} s={MP.s} rot={-1.1} land={(n) => n === "Malaysia" ? "rgba(226,210,168,0.72)" : "rgba(214,196,150,0.45)"} svg={<>
    <MapText x={P(100.6, 7.05)[0]} y={P(100.6, 7.05)[1]} text="THAILAND" size={46} />
    <MapText x={P(102.7, 4.6)[0]} y={P(102.7, 4.6)[1]} text="MALAYSIA" size={54} spacing={0.5} />
    <circle cx={kl[0]} cy={kl[1]} r={11} fill={T.color.ink} /><MapText x={kl[0] + 40} y={kl[1] - 26} text="Kuala Lumpur" size={36} spacing={0.04} />
    <PulseMarker x={pp[0]} y={pp[1]} t={E.m2_seat.t} r={18} />
  </>} />;
};

export const Ch2: React.FC = () => {
  const { H: HC3 } = printBox(C3P.w, C3P.a); const { H: H4 } = printBox(P04.w, P04.a);
  return <WorldCam keys={CAM}>
    <WorldDesk w={3400} h={5400} />
    <L id="b_crisis" size={44} x={540 - monoW(22, 44) / 2 - 20} y={680} />
    <RollTape id="b_1997" pre="" post="" x={540 - monoW(4, 80) / 2 - 36} y={790} size={80} red />
    <L id="b_date" size={50} x={540 - monoW(11, 50) / 2 - 22} y={1930} until={E.glide_arrest.t + 0.2} />
    <Split />
    <WPrint src={img("04_reformasi_1998")} aspect={P04.a} w={P04.w} keys={P04.keys} t0={E.p04_in.t} from={[0, -240, -7]}>
      <L id="p04_lab" size={56} red x={-20} y={H4 + 16} />
    </WPrint>
    <Map2 />
    <WPrint src={img("c2_courtroom")} aspect={C2P.a} w={C2P.w} keys={C2P.keys} t0={E.c2_in.t} from={[0, -260, 6]} />
    <Stamp text="GUILTY" t={E.st_guilty.t} x={560} y={3880} size={70} rot={-7} />
    <Verdict />
    <L id="m2_2008" size={60} x={PP[0] - 300} y={PP[1] - 190} />
    <L id="m2_pp" size={36} x={PP[0] + 36} y={PP[1] - 36} />
    <L id="m2_opp" size={36} red x={PP[0] + 36} y={PP[1] + 30} />
    <WPrint src={img("c3_prison_corridor")} aspect={C3P.a} w={C3P.w} keys={C3P.keys} t0={E.c3_in.t} from={[200, -200, 8]}>
      <L id="c3_lab" size={44} x={-20} y={HC3 + 16} />
    </WPrint>
    <Stamp text="PRISON 2015" t={E.st_prison.t} x={2020} y={4540} size={58} rot={-6} />
  </WorldCam>;
};
