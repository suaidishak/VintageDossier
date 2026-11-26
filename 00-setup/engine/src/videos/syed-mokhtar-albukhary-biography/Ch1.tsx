// Chapter 1 - The Cattle Boy (0 - C2): permit + lorries -> portrait -> 1951 card over the Kedah map -> Yemen route -> cattle -> rice & lorry.
import React from "react";
import { interpolate } from "remotion";
import { T } from "../../styles/dossier/tokens";
import { Arrow, clamp, CountryFocus, K, MapBase, MapText, mapXY, NATION, PenPath, printBox, PulseMarker, Roll, Stamp, useSec, WorldCam, WorldDesk, WPrint, wobblyEllipse } from "../../styles/dossier/kit";
import { Card, DateCard, DESK, E, glide, img, L, LC, LorryIcon, MAP, OCEAN, RollTape, WSvg } from "./common";

const PM = { x: 540, y: 1000, w: 820, h: 1060 };
const MP = { x: 1400, y: 1350, s: 0.62 }; const mw = (lon: number, lat: number): [number, number] => { const p = mapXY(MAP, lon, lat); return [MP.x + p[0] * MP.s, MP.y + p[1] * MP.s]; };
const ALOR = mw(100.37, 6.12);
const OC = { x: 2900, y: 200, s: 0.55 };
const P01 = { w: 700, a: 1.2909, keys: [{ t: 0, x: 540, y: 2500, s: 1, r: 1.5 }] as K[] };
const C1 = { w: 860, a: 1.4911, keys: [{ t: 0, x: 3450, y: 1700, s: 1, r: -1.5 }] as K[] };
const C3 = { w: 640, a: 1.4911, keys: [{ t: 0, x: 3300, y: 2650, s: 1, r: -3 }] as K[] };
const C2 = { w: 640, a: 1.4911, keys: [{ t: 0, x: 3600, y: 3290, s: 1, r: 3 }] as K[] };

const c0 = { x: 540, y: 1000, z: 0.98 };
const cP01 = { x: 540, y: 2500, z: 1.04 };
const cDate = { x: 1900, y: 1250, z: 0.96 };
const cYem = { x: 3450, y: 560, z: 0.93 };
const cC1 = { x: 3450, y: 1860, z: 1.0 };
const cRice = { x: 3440, y: 2980, z: 1.0 };
const CAM: K[] = [
  { ...c0, t: 0 }, { ...c0, t: E.glide_p01.t, z: 1.04 },
  ...glide({ ...c0, z: 1.04 }, cP01, E.glide_p01.t, E.glide_p01.dur, 0.75, 1).slice(1),
  { ...cP01, t: E.glide_born.t, z: 1.09 },
  ...glide({ ...cP01, z: 1.09 }, cDate, E.glide_born.t, E.glide_born.dur, 0.6, -2).slice(1),
  { ...cDate, t: E.glide_yemen.t, z: 1.0 },
  ...glide({ ...cDate, z: 1.0 }, cYem, E.glide_yemen.t, E.glide_yemen.dur, 0.62, 1.5).slice(1),
  { ...cYem, t: E.glide_c1.t, z: 0.97 },
  ...glide({ ...cYem, z: 0.97 }, cC1, E.glide_c1.t, E.glide_c1.dur, 0.7).slice(1),
  { ...cC1, t: E.c3_in.t - 0.45, z: 1.05 },
  ...glide({ ...cC1, z: 1.05 }, cRice, E.c3_in.t - 0.45, 0.55, 0.8).slice(1),
  { ...cRice, t: E.C2.t + 0.3, z: 1.06 },
];

const Permit: React.FC = () => {
  const { s } = useSec(); const r4 = E.pm_4; const hot = s >= r4.t2;
  return <Card x={PM.x} y={PM.y} w={PM.w} h={PM.h} t={-1} rot={-1.2}>
    <L id="pm_head" size={40} x={60} y={70} />
    <div style={{ position: "absolute", left: 60, top: 150, width: PM.w - 120, height: 2, background: "rgba(40,30,20,0.5)" }} />
    <svg width={PM.w} height={PM.h} style={{ position: "absolute", left: 0, top: 0, overflow: "visible" }}>
      <LorryIcon a={[-380, 330]} b={[230, 330]} t={E.lorry_a.t} dur={E.lorry_a.dur} size={160} />
      <LorryIcon a={[-380, 330]} b={[580, 330]} t={E.lorry_b.t} dur={E.lorry_b.dur} size={160} />
      <LorryIcon a={[-380, 500]} b={[230, 500]} t={E.lorry_cd.t} dur={E.lorry_cd.dur} size={160} sacks={false} />
      <LorryIcon a={[-380, 500]} b={[580, 500]} t={E.lorry_cd.t + 0.15} dur={E.lorry_cd.dur} size={160} sacks={false} />
      <PenPath d={wobblyEllipse(650, 845, 95, 80, 4)} t={E.pm_circle.t} dur={E.pm_circle.dur} width={7} />
    </svg>
    <L id="pm_afford" size={40} bar={false} x={60} y={660} />
    {s >= E.pm_2.t ? <div style={{ position: "absolute", left: 600, top: 640, fontFamily: T.font.serif, fontWeight: 700, fontSize: 90, lineHeight: 1, color: T.color.ink }}><Roll from={E.pm_2.from} to={E.pm_2.to} t={E.pm_2.t} t2={E.pm_2.t2} /></div> : null}
    <L id="pm_permits" size={40} bar={false} x={60} y={810} />
    {s >= E.pm_permits.t + 0.4 ? <div style={{ position: "absolute", left: 600, top: 790, fontFamily: T.font.serif, fontWeight: 700, fontSize: 110, lineHeight: 1, color: hot ? T.color.red : T.color.ink }}><Roll from={r4.from} to={r4.to} t={r4.t} t2={r4.t2} /></div> : null}
  </Card>;
};

const MapSheet: React.FC = () => {
  const P = (lon: number, lat: number) => mapXY(MAP, lon, lat); const al = P(100.37, 6.12); const kl = P(101.69, 3.14);
  return <MapBase map={MAP} x={MP.x} y={MP.y} s={MP.s} rot={-0.7} land={(n) => n === "Malaysia" ? "rgba(226,210,168,0.72)" : "rgba(214,196,150,0.45)"} svg={<>
    <CountryFocus d={MAP.shapes["Malaysia"]} t={E.m_alor.t - 0.2} rgb={NATION.neutral} id="malS" />
    <MapText x={P(100.6, 7.05)[0]} y={P(100.6, 7.05)[1]} text="THAILAND" size={46} />
    <MapText x={P(102.7, 4.6)[0]} y={P(102.7, 4.6)[1]} text="MALAYSIA" size={54} spacing={0.5} />
    <MapText x={P(100.4, 0.5)[0]} y={P(100.4, 0.5)[1]} text="SUMATRA" size={46} />
    <circle cx={kl[0]} cy={kl[1]} r={11} fill={T.color.ink} /><MapText x={kl[0] + 40} y={kl[1] - 26} text="Kuala Lumpur" size={36} spacing={0.04} />
    <PulseMarker x={al[0]} y={al[1]} t={E.m_alor.t} r={18} />
  </>} />;
};

const Ocean: React.FC = () => {
  const P = (lon: number, lat: number) => mapXY(OCEAN, lon, lat); const ye = P(48.6, 15.9), ke = P(100.4, 6.1);
  return <MapBase map={OCEAN} x={OC.x} y={OC.y} s={OC.s} rot={1.2} grid={10} land={(n) => n === "Yemen" || n === "Malaysia" ? "rgba(226,210,168,0.75)" : "rgba(214,196,150,0.45)"} svg={<>
    <CountryFocus d={OCEAN.shapes["Yemen"]} t={E.y_pulse.t} rgb={NATION.neutral} id="yem" />
    <MapText x={P(75, 2)[0]} y={P(75, 2)[1]} text="INDIAN  OCEAN" size={64} spacing={0.5} />
    <MapText x={P(78.5, 22)[0]} y={P(78.5, 22)[1]} text="INDIA" size={56} />
    <MapText x={P(45, 23)[0]} y={P(45, 23)[1]} text="ARABIA" size={52} />
    <Arrow a={ye} c={[(ye[0] + ke[0]) / 2, ye[1] + 420]} b={ke} t={E.y_arrow.t} dur={E.y_arrow.dur} width={16} />
    <PulseMarker x={ye[0]} y={ye[1]} t={E.y_pulse.t} r={22} />
    <PulseMarker x={ke[0]} y={ke[1]} t={E.y_arrow.t + E.y_arrow.dur} r={18} />
  </>} />;
};

export const Ch1: React.FC = () => {
  const { s } = useSec();
  const { H: H1 } = printBox(C1.w, C1.a); const { H: H01 } = printBox(P01.w, P01.a); const { H: H2 } = printBox(C2.w, C2.a);
  const st = interpolate(s, [E.c1_strike.t, E.c1_strike.t + E.c1_strike.dur], [0, 1], clamp);
  const YE = (() => { const p = mapXY(OCEAN, 48.6, 15.9); return [OC.x + p[0] * OC.s, OC.y + p[1] * OC.s]; })();
  return <WorldCam keys={CAM}>
    <WorldDesk w={4400} h={4000} src={DESK} />
    <Permit />
    <WPrint src={img("01_syed_mokhtar")} aspect={P01.a} w={P01.w} keys={P01.keys} t0={E.p01_in.t} from={[0, -260, -7]}>
      <L id="p01_title" size={34} x={-24} y={-120} />
      <L id="p01_name" size={36} x={-24} y={-62} />
      <L id="p01_rich" size={40} red x={10} y={H01 + 16} />
    </WPrint>
    <MapSheet />
    <DateCard cx={1900} cy={760} dayId="d51_day" rollId="d51" />
    <L id="m_alor_t" size={36} x={ALOR[0] + 40} y={ALOR[1] - 30} />
    <Ocean />
    <L id="y_lab" size={36} x={YE[0] - 40} y={YE[1] + 70} />
    <WPrint src={img("c1_kampung_cattle")} aspect={C1.a} w={C1.w} keys={C1.keys} t0={E.c1_in.t} from={[-200, -120, -8]}>
      <L id="c1_lab" size={36} x={-24} y={-62} />
      <L id="c1_fmd" size={36} red x={10} y={H1 + 16} />
    </WPrint>
    <Stamp text="BUSINESS COLLAPSED" t={E.st_collapse.t} x={3460} y={1690} size={54} rot={-8} blend="normal" />
    <L id="c1_school" size={52} x={3060} y={2140} until={E.c3_in.t + 0.2} />
    <WSvg>{st > 0 && s < E.c3_in.t + 0.2 ? <line x1={3050} y1={2178} x2={3050 + 300 * st} y2={2172} stroke={T.color.red} strokeWidth={9} strokeLinecap="round" /> : null}</WSvg>
    <WPrint src={img("c3_kedah_paddy")} aspect={C3.a} w={C3.w} keys={C3.keys} t0={E.c3_in.t} from={[-160, -80, -6]}>
      <L id="c3_lab" size={36} x={-24} y={-60} />
    </WPrint>
    <L id="loan" size={34} red x={3030} y={2945} />
    <WPrint src={img("c2_old_lorry")} aspect={C2.a} w={C2.w} keys={C2.keys} t0={E.c2_in.t} from={[200, -60, 8]}>
      <RollTape id="age30" pre="AGE " post="" x={-20} y={H2 + 18} size={44} />
      <L id="million" size={48} red x={210} y={H2 + 16} />
    </WPrint>
  </WorldCam>;
};
