// Chapter 2 - The Empire (C2 - C3): 1990s card -> map with empire pins -> evidence board -> port -> fortune & debt -> NO COMMENT.
import React from "react";
import { interpolate, Easing } from "remotion";
import { T } from "../../styles/dossier/tokens";
import { clamp, K, MapBase, MapText, mapXY, PenPath, pinAt, printBox, Stamp, StringLine, useSec, WorldCam, WorldDesk, WPrint, wobblyEllipse } from "../../styles/dossier/kit";
import { Card, DateCard, DESK, E, glide, img, L, LC, MAP, Pict, WSvg } from "./common";

const MP = { x: -40, y: 1500, s: 0.62 }; const mw = (lon: number, lat: number): [number, number] => { const p = mapXY(MAP, lon, lat); return [MP.x + p[0] * MP.s, MP.y + p[1] * MP.s]; };
const KLANG = mw(101.39, 3.0), PELEPAS = mw(103.55, 1.36), MANJUNG = mw(100.66, 4.2), SENAI = mw(103.67, 1.64), ALOR = mw(100.37, 6.12);
const CEN = { w: 380, a: 1.2909, keys: [{ t: 0, x: 540, y: 4200, s: 1, r: -1.5 }] as K[] };
const PRO = { w: 400, a: 1.7689, keys: [{ t: 0, x: 270, y: 3780, s: 1, r: -4 }] as K[] };
const POS = { x: 830, y: 3790 }, BANK = { x: 270, y: 4640 }, RICE = { x: 830, y: 4640 };
const P02 = { w: 760, a: 1.0, keys: [{ t: 0, x: 540, y: 5700, s: 1, r: 1.5 }] as K[] };
const MY = 6800; // money block top

const c90 = { x: 540, y: 950, z: 1.0 };
const cMap = { x: 560, y: 2180, z: 1.05 };
const cBoard = { x: 540, y: 4210, z: 0.98 };
const cPort = { x: 540, y: 5720, z: 1.0 };
const cMoney = { x: 540, y: 7140, z: 1.0 };
const CAM: K[] = [
  { ...c90, t: E.C2.t - 0.3 }, { ...c90, t: E.glide_map.t, z: 1.05 },
  ...glide({ ...c90, z: 1.05 }, cMap, E.glide_map.t, E.glide_map.dur, 0.7, 1.5).slice(1),
  { ...cMap, t: E.glide_board.t, z: 1.1 },
  ...glide({ ...cMap, z: 1.1 }, cBoard, E.glide_board.t, E.glide_board.dur, 0.62, -1.5).slice(1),
  { ...cBoard, t: E.glide_port.t, z: 1.03 },
  ...glide({ ...cBoard, z: 1.03 }, cPort, E.glide_port.t, E.glide_port.dur, 0.72).slice(1),
  { ...cPort, t: E.glide_money.t, z: 1.05 },
  ...glide({ ...cPort, z: 1.05 }, cMoney, E.glide_money.t, E.glide_money.dur, 0.75, 1).slice(1),
  { ...cMoney, t: E.C3.t + 0.3, z: 1.06 },
];

const EmpireMap: React.FC = () => {
  const P = (lon: number, lat: number) => mapXY(MAP, lon, lat); const kl = P(101.69, 3.14);
  return <MapBase map={MAP} x={MP.x} y={MP.y} s={MP.s} rot={1.0} land={(n) => n === "Malaysia" ? "rgba(226,210,168,0.72)" : "rgba(214,196,150,0.45)"} svg={<>
    <MapText x={P(100.6, 7.05)[0]} y={P(100.6, 7.05)[1]} text="THAILAND" size={46} />
    <MapText x={P(100.4, 0.5)[0]} y={P(100.4, 0.5)[1]} text="SUMATRA" size={46} />
      </>} />;
};

const Board: React.FC = () => {
  const { s } = useSec(); const c = pinAt(CEN.w, CEN.a, CEN.keys, s), pp = pinAt(PRO.w, PRO.a, PRO.keys, s);
  const { b, H } = printBox(PRO.w, PRO.a); const h = PRO.w / PRO.a;
  const cardPin = (p: { x: number; y: number }): [number, number] => [p.x, p.y - 110 + 14];
  const t0 = E.b_str.t;
  return <>
    <WPrint src={img("01_syed_mokhtar")} aspect={CEN.a} w={CEN.w} keys={CEN.keys} t0={E.glide_board.t + 0.2} from={[0, -120, 5]} />
    <WPrint src={img("03_proton_saga")} aspect={PRO.a} w={PRO.w} keys={PRO.keys} t0={E.b_proton.t} from={[-160, -60, -8]}>
      <div style={{ position: "absolute", left: -16, top: H + 10, fontFamily: T.font.mono, fontWeight: 700, fontSize: 30, letterSpacing: "0.08em", color: T.color.tapeText, background: T.color.tape, padding: "5px 13px" }}>PROTON</div>
      <svg width={PRO.w + 2 * b} height={H} style={{ position: "absolute", left: 0, top: 0, overflow: "visible" }}>
        <PenPath d={wobblyEllipse(b + PRO.w / 2, b + h / 2, PRO.w * 0.6, h * 0.75, 2)} t={E.b_car_c.t} dur={E.b_car_c.dur} width={6} />
      </svg>
    </WPrint>
    <Card x={POS.x} y={POS.y} w={320} h={220} t={E.b_pos.t} rot={3}>
      <svg width={320} height={220} style={{ position: "absolute" }}><Pict kind="mail" x={160} y={95} t={E.b_pos.t + 0.1} size={90} /></svg>
      <div style={{ position: "absolute", left: 0, width: 320, top: 160, textAlign: "center", fontFamily: T.font.mono, fontWeight: 700, fontSize: 28, color: T.color.ink, letterSpacing: "0.06em" }}>POS MALAYSIA</div>
    </Card>
    <Card x={BANK.x} y={BANK.y} w={320} h={220} t={E.b_bank.t} rot={-2}>
      <svg width={320} height={220} style={{ position: "absolute" }}><Pict kind="bank" x={160} y={100} t={E.b_bank.t + 0.1} size={90} /></svg>
      <div style={{ position: "absolute", left: 0, width: 320, top: 160, textAlign: "center", fontFamily: T.font.mono, fontWeight: 700, fontSize: 28, color: T.color.ink, letterSpacing: "0.06em" }}>BANK MUAMALAT</div>
    </Card>
    <Card x={RICE.x} y={RICE.y} w={320} h={220} t={E.b_bank.t + 0.25} rot={2.5}>
      <svg width={320} height={220} style={{ position: "absolute" }}><Pict kind="rice" x={160} y={95} t={E.b_bank.t + 0.35} size={90} /></svg>
      <div style={{ position: "absolute", left: 0, width: 320, top: 160, textAlign: "center", fontFamily: T.font.mono, fontWeight: 700, fontSize: 28, color: T.color.ink, letterSpacing: "0.06em" }}>BERNAS RICE</div>
    </Card>
    <WSvg>
      <StringLine a={c} b={pp} t={t0} dur={0.4} sag={60} />
      <StringLine a={c} b={cardPin(POS)} t={t0 + 0.08} dur={0.4} sag={60} />
      <StringLine a={c} b={cardPin(BANK)} t={t0 + 0.16} dur={0.4} sag={80} />
      <StringLine a={c} b={cardPin(RICE)} t={t0 + 0.24} dur={0.4} sag={80} />
      <PenPath d={wobblyEllipse(RICE.x, RICE.y, 200, 150, 5)} t={E.b_rice_c.t} dur={E.b_rice_c.dur} width={7} />
      <PenPath d={wobblyEllipse(POS.x, POS.y, 200, 150, 6)} t={E.b_pos_c.t} dur={E.b_pos_c.dur} width={7} />
    </WSvg>
  </>;
};

const Money: React.FC = () => {
  const { s } = useSec(); const r = E.money;
  const v = interpolate(s, [r.t, r.t2], [r.from, r.to], { ...clamp, easing: Easing.out(Easing.quad) }); const op = interpolate(s, [r.t - 0.05, r.t + 0.12], [0, 1], clamp);
  const land = s >= r.t2 ? interpolate(s, [r.t2, r.t2 + 0.25], [1.08, 1], clamp) : 1;
  const g = interpolate(s, [E.bar_group.t, E.bar_group.t + 0.6], [0, 1], { ...clamp, easing: Easing.out(Easing.cubic) });
  const d = interpolate(s, [E.bar_debt.t, E.bar_debt.t + 0.6], [0, 1], { ...clamp, easing: Easing.out(Easing.cubic) });
  const bar = (y: number, label: string, u: number, red: boolean, show: boolean) => show ? <>
    <div style={{ position: "absolute", left: 90, top: y, fontFamily: T.font.mono, fontWeight: 700, fontSize: 40, letterSpacing: "0.08em", color: T.color.tapeText, background: T.color.tape, padding: "7px 18px" }}>{label}</div>
    <div style={{ position: "absolute", left: 340, top: y + 8, width: 640 * u, height: 50, background: red ? T.color.red : "rgba(239,230,210,0.85)", boxShadow: "0 3px 8px rgba(0,0,0,0.5)" }} />
  </> : null;
  return <>
    <LC id="forbes" size={44} cx={540} y={MY} />
    {s >= r.t ? <div style={{ position: "absolute", left: 40, width: 1000, top: MY + 90, textAlign: "center", fontFamily: T.font.serif, fontWeight: 700, fontSize: 170, lineHeight: 1, color: T.color.title, opacity: op, transform: `scale(${land})`, textShadow: "0 6px 30px rgba(0,0,0,0.6)" }}>
      <span style={{ fontSize: 90 }}>US$ </span>{(v / 10).toFixed(1)}<span style={{ fontSize: 90 }}> BN</span><span style={{ color: T.color.red }}>.</span></div> : null}
    {bar(MY + 380, "GROUP", g, false, s >= E.bar_group.t)}
    {bar(MY + 480, "DEBT ", d, true, s >= E.bar_debt.t)}
  </>;
};

export const Ch2: React.FC = () => {
  const { H: HP2 } = printBox(P02.w, P02.a);
  return <WorldCam keys={CAM}>
    <WorldDesk w={2200} h={8200} src={DESK} />
    <DateCard cx={540} cy={800} dayId="d90_day" rollId="d90" suffix="s" />
    <LC id="privat" size={56} cx={540} y={1100} red />
    <EmpireMap />
    <WSvg>
      <Pict kind="crane" x={KLANG[0]} y={KLANG[1]} t={E.i_ports.t} size={130} />
      <Pict kind="crane" x={PELEPAS[0] - 60} y={PELEPAS[1]} t={E.i_ports.t + 0.12} size={130} />
      <Pict kind="power" x={MANJUNG[0]} y={MANJUNG[1]} t={E.i_power.t} size={130} />
      <Pict kind="plane" x={SENAI[0] - 40} y={SENAI[1] - 170} t={E.i_air.t} size={130} />
      <Pict kind="rice" x={ALOR[0] + 20} y={ALOR[1]} t={E.i_rice.t} size={130} />
    </WSvg>
    <L id="l_ports" size={42} x={KLANG[0] + 80} y={KLANG[1] - 30} />
    <L id="l_power" size={42} x={MANJUNG[0] + 90} y={MANJUNG[1] - 30} />
    <L id="l_air" size={42} x={SENAI[0] - 400} y={SENAI[1] - 200} />
    <L id="l_rice" size={42} x={ALOR[0] + 100} y={ALOR[1] - 30} />
    <Board />
    <WPrint src={img("02_tanjung_pelepas")} aspect={P02.a} w={P02.w} keys={P02.keys} t0={E.p02_in.t} from={[0, -260, 7]}>
      <L id="p02_lab" size={36} x={-24} y={-62} />
      <L id="p02_big" size={38} red x={10} y={HP2 + 16} />
    </WPrint>
    <Money />
    <Stamp text="NO COMMENT" t={E.st_nocomment.t} x={560} y={MY + 330} size={84} rot={-9} blend="normal" />
  </WorldCam>;
};
