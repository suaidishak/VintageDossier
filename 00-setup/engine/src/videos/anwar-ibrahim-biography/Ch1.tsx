// Chapter 1 - The Heir (0 - C2). One desk world: date card -> hero print -> map of Malaya -> 1982 board.
import React from "react";
import { interpolate } from "remotion";
import { T } from "../../styles/dossier/tokens";
import { clamp, CountryFocus, K, MapBase, MapText, mapXY, NATION, PenPath, pinAt, printBox, PulseMarker, RouteLine, Stamp, StringLine, useSec, WorldCam, WorldDesk, WPrint, wobblyEllipse } from "../../styles/dossier/kit";
import { DateCard, E, glide, hold, img, L, MAP, RollTape, WSvg } from "./common";

// ---------- world layout ----------
const MP = { x: 1500, y: 1300, s: 0.62 };
const mw = (lon: number, lat: number): [number, number] => { const p = mapXY(MAP, lon, lat); return [MP.x + p[0] * MP.s, MP.y + p[1] * MP.s]; };
const PENANG = mw(100.33, 5.41), BALING = mw(100.92, 5.68);

const P01 = { w: 760, a: 0.6433, keys: [{ t: 0, x: 540, y: 2560, s: 1, r: -2 }] as K[] };
const P02 = {
  w: 470, a: 0.598, keys: [
    { t: 0, x: 2270, y: 2520, s: 1, r: 3 }, { t: E.m_1974.t - 0.4, x: 2270, y: 2520, s: 1, r: 3 }, { t: E.m_1974.t + 0.3, x: 2330, y: 2380, s: 0.62, r: -4 },
    { t: E.p02_move.t, x: 2330, y: 2380, s: 0.62, r: -4 }, { t: E.p02_move.t + E.p02_move.dur, x: 3520, y: 2930, s: 1, r: 2 },
  ] as K[],
};
const C1 = { w: 500, a: 1.4911, keys: [{ t: 0, x: 2050, y: 1320, s: 1, r: -3 }] as K[] };
const P03 = { w: 540, a: 0.7473, keys: [{ t: 0, x: 3300, y: 1960, s: 1, r: -2.5 }] as K[] };
const YEAR82 = { x: 3420, y: 1130 };

// ---------- camera ----------
const c0 = { x: 540, y: 950, z: 1 };
const cP01 = { x: 540, y: 2470, z: 1.02 };
const cP01b = { x: 540, y: 2560, z: 0.93 };
const cMap = { x: 2040, y: 1990, z: 0.95 };
const c74 = { x: 2050, y: 1760, z: 1.05 };
const cDet = { x: 2150, y: 1990, z: 1.06 };
const c82 = { x: YEAR82.x, y: YEAR82.y + 60, z: 1.08 };
const cMah = { x: 3330, y: 1990, z: 1.12 };
const cBoth = { x: 3430, y: 2480, z: 0.74 };
const cCareer = { x: 3500, y: 3280, z: 1.05 };
const CAM: K[] = [
  ...hold(c0, 0, E.p01_in.t - 0.5, 0.05),
  ...glide({ ...c0, z: 1.05 }, cP01, E.p01_in.t - 0.5, 0.55, 0.78, -1).slice(1),
  { ...cP01, t: E.p01_heir.t - 1.3, z: 1.07 },
  { ...cP01b, t: E.p01_heir.t - 0.6 }, { ...cP01b, t: E.glide_map.t, z: 0.97 },
  ...glide({ ...cP01b, z: 0.97 }, cMap, E.glide_map.t, E.glide_map.dur, 0.58, 2).slice(1),
  { ...cMap, t: E.m_1974.t - 0.45, z: 1.0 },
  { ...c74, t: E.m_1974.t + 0.3 }, { ...c74, t: E.st_detained.t - 0.45, z: 1.16 },
  { ...cDet, t: E.st_detained.t - 0.05 }, { ...cDet, t: E.glide_1982.t, z: 1.09 },
  ...glide({ ...cDet, z: 1.09 }, c82, E.glide_1982.t, E.glide_1982.dur, 0.6, -2).slice(1),
  { ...c82, t: E.p03_in.t - 0.55, z: 1.12 },
  { ...cMah, t: E.p03_in.t - 0.05 }, { ...cMah, t: E.p02_move.t - 0.1, z: 1.16 },
  { ...cBoth, t: E.p02_move.t + 0.75 }, { ...cBoth, t: E.p02_fin.t - 0.7, z: 0.77 },
  { ...cCareer, t: E.p02_fin.t - 0.05 }, { ...cCareer, t: E.p02_heir.t - 1.2, z: 1.1 },
  { ...cBoth, t: E.p02_heir.t - 0.3, z: 0.8 }, { ...cBoth, t: E.C2.t + 0.3, z: 0.84 },
];

const P01Print: React.FC = () => {
  const { s } = useSec(); const { b, H } = printBox(P01.w, P01.a); const h = P01.w / P01.a;
  const strike = interpolate(s, [E.p01_strike.t, E.p01_strike.t + E.p01_strike.dur], [0, 1], clamp);
  return <WPrint src={img("01_anwar_1998")} aspect={P01.a} w={P01.w} keys={P01.keys} t0={E.p01_in.t} from={[-60, -260, 8]}>
    <L id="p01_role" size={40} x={-26} y={-66} />
    <L id="p01_date" size={40} x={-26} y={-6} />
    <svg width={P01.w + 2 * b} height={H} style={{ position: "absolute", left: 0, top: 0, overflow: "visible" }}>
      <PenPath d={wobblyEllipse(b + 0.52 * P01.w, b + 0.71 * h, 0.2 * P01.w, 0.13 * h, 3)} t={E.p01_circle.t} dur={E.p01_circle.dur} width={6} />
    </svg>
    <L id="p01_name" size={44} x={P01.w + 2 * b - 440} y={H - 170} />
    <L id="p01_heir" size={46} red x={10} y={H + 18} />
    <svg width={10} height={10} style={{ position: "absolute", left: 0, top: 0, overflow: "visible" }}>
      {strike > 0 ? <line x1={0} y1={H + 52} x2={(10 + 13 * 0.68 * 46 + 50) * strike} y2={H + 44} stroke={T.color.red} strokeWidth={6} strokeLinecap="round" /> : null}
    </svg>
    <L id="p01_q" size={46} x={10} y={H + 100} />
  </WPrint>;
};

const MapSheet: React.FC = () => {
  const shapes = MAP.shapes as Record<string, string>;
  const P = (lon: number, lat: number) => mapXY(MAP, lon, lat);
  const pen = P(100.33, 5.41), bal = P(100.92, 5.68), kl = P(101.69, 3.14);
  return <MapBase map={MAP} x={MP.x} y={MP.y} s={MP.s} rot={0.8} land={(n) => n === "Malaysia" ? "rgba(226,210,168,0.72)" : "rgba(214,196,150,0.45)"} svg={<>
    <CountryFocus d={shapes["Malaysia"]} t={E.m_born.t} rgb={NATION.neutral} id="mal1" />
    <MapText x={P(100.6, 7.05)[0]} y={P(100.6, 7.05)[1]} text="THAILAND" size={46} />
    <MapText x={P(102.7, 4.6)[0]} y={P(102.7, 4.6)[1]} text="MALAYA" size={54} spacing={0.5} />
    <MapText x={P(100.4, 0.5)[0]} y={P(100.4, 0.5)[1]} text="SUMATRA" size={46} />
    <MapText x={P(99.9, 3.4)[0]} y={P(99.9, 3.4)[1]} text="STRAIT OF MALACCA" size={30} spacing={0.25} />
    <circle cx={kl[0]} cy={kl[1]} r={11} fill={T.color.ink} /><MapText x={kl[0] + 40} y={kl[1] - 26} text="Kuala Lumpur" size={36} spacing={0.04} />
    <RouteLine d={`M${pen[0]},${pen[1]} Q${pen[0] + 40},${pen[1] - 110} ${bal[0]},${bal[1]}`} t={E.m_route.t} dur={E.m_route.dur} width={9} />
    <PulseMarker x={pen[0]} y={pen[1]} t={E.m_penang.t} r={16} />
    <PulseMarker x={bal[0]} y={bal[1]} t={E.m_baling.t} r={16} />
  </>} />;
};

export const Ch1: React.FC = () => {
  const { s } = useSec();
  const pa = pinAt(P03.w, P03.a, P03.keys, s), pb = pinAt(P02.w, P02.a, P02.keys, s);
  const { H: H2 } = printBox(P02.w, P02.a);
  const p02early = E.p02_move.t; // student labels leave when the print travels
  return <WorldCam keys={CAM}>
    <WorldDesk w={4600} h={4200} />
    <DateCard cx={540} cy={950} dayId="a_month" rollId="a_year" size={250} />
    <P01Print />
    <MapSheet />
    {/* map labels in world px */}
    <L id="m_born" size={44} x={PENANG[0] - 250} y={PENANG[1] - 420} until={E.m_1974.t - 0.3} />
    <L id="m_village" size={34} x={PENANG[0] + 40} y={PENANG[1] + 30} until={E.m_1974.t - 0.3} />
    <L id="m_1974" size={56} x={BALING[0] - 100} y={BALING[1] + 120} />
    <L id="m_baling_t" size={36} x={BALING[0] + 30} y={BALING[1] + 24} />
    <WPrint src={img("c1_rubber_plantation")} aspect={C1.a} w={C1.w} keys={C1.keys} t0={E.c1_in.t} from={[160, -120, -8]}>
      <L id="c1_lab" size={30} x={-18} y={-50} />
    </WPrint>
    <WPrint src={img("02_anwar_young")} aspect={P02.a} w={P02.w} keys={P02.keys} t0={E.p02_in.t} from={[200, 60, 10]}>
      <L id="p02_role" size={36} x={-24} y={-104} until={E.m_1974.t - 0.2} />
      <L id="p02_abim" size={30} x={-24} y={-50} until={E.m_1974.t - 0.2} />
      <L id="p02_det" size={52} x={-24} y={H2 + 16} until={p02early} />
      <RollTape id="p02_months" pre="" post=" MONTHS" x={-24} y={H2 + 100} size={52} red until={p02early} />
      <L id="p02_umno" size={44} red x={-20} y={H2 + 16} />
      <L id="p02_fin" size={38} x={-20} y={H2 + 94} />
      <L id="p02_dpm" size={38} x={-20} y={H2 + 160} />
      <L id="p02_heir" size={50} red x={P02.w * 0.42} y={-80} />
    </WPrint>
    <Stamp text="DETAINED" t={E.st_detained.t} x={2330} y={2360} size={48} rot={-10} />
    <DateCard cx={YEAR82.x} cy={YEAR82.y} rollId="d_1982" size={230} />
    <WPrint src={img("03_mahathir_1980s")} aspect={P03.a} w={P03.w} keys={P03.keys} t0={E.p03_in.t} from={[-220, -100, -9]}>
      <L id="p03_name" size={36} x={-26} y={-62} />
      <L id="p03_role" size={36} x={-26} y={-6} />
    </WPrint>
    <WSvg><StringLine a={pa} b={pb} t={E.str_1.t} dur={E.str_1.dur} sag={90} /></WSvg>
  </WorldCam>;
};
