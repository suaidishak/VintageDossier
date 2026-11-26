// Chapter 3 - Two Faces (C3 - end): critics board -> Anwar & rice -> supporters -> 1976 card -> philanthropy -> university -> lorry-to-university finale.
import React from "react";
import { K, pinAt, printBox, StringLine, useSec, WorldCam, WorldDesk, WPrint } from "../../styles/dossier/kit";
import { DateCard, DESK, E, glide, img, L, LC, RollTape, TL, WSvg, monoW } from "./common";

const SY = { w: 400, a: 1.2909, keys: [{ t: 0, x: 740, y: 1050, s: 1, r: 3 }] as K[] };
const MAH = { w: 400, a: 0.7473, keys: [{ t: 0, x: 290, y: 1100, s: 1, r: -3 }] as K[] };
const ANW = { w: 400, a: 0.8087, keys: [{ t: 0, x: 300, y: 2400, s: 1, r: -2 }] as K[] };
const C4 = { w: 480, a: 1.4911, keys: [{ t: 0, x: 765, y: 2410, s: 1, r: 2.5 }] as K[] };
const AIU = { w: 840, a: 1.3286, keys: [{ t: 0, x: 540, y: 5600, s: 1, r: -1 }] as K[] };
const LOR = { w: 420, a: 1.4911, keys: [{ t: 0, x: 300, y: 6380, s: 1, r: -4 }] as K[] };

const cCrit = { x: 540, y: 1000, z: 1.0 };
const cAnw = { x: 540, y: 2400, z: 1.05 };
const cSup = { x: 540, y: 3560, z: 1.05 };
const c76 = { x: 540, y: 4500, z: 1.0 };
const cAIU = { x: 540, y: 5660, z: 1.0 };
const cEnd = { x: 540, y: 5950, z: 0.82 };
const CAM: K[] = [
  { ...cCrit, t: E.C3.t - 0.3 }, { ...cCrit, t: E.glide_anw.t, z: 1.05 },
  ...glide({ ...cCrit, z: 1.05 }, cAnw, E.glide_anw.t, E.glide_anw.dur, 0.8).slice(1),
  { ...cAnw, t: E.glide_sup.t, z: 1.1 },
  ...glide({ ...cAnw, z: 1.1 }, cSup, E.glide_sup.t, E.glide_sup.dur, 0.78, 1).slice(1),
  { ...cSup, t: E.glide_76.t, z: 1.1 },
  ...glide({ ...cSup, z: 1.1 }, c76, E.glide_76.t, E.glide_76.dur, 0.8, -1).slice(1),
  { ...c76, t: E.glide_aiu.t, z: 1.05 },
  ...glide({ ...c76, z: 1.05 }, cAIU, E.glide_aiu.t, E.glide_aiu.dur, 0.8).slice(1),
  { ...cAIU, t: E.glide_end.t, z: 1.04 },
  { ...cEnd, t: E.glide_end.t + E.glide_end.dur }, { ...cEnd, t: TL.duration, z: 0.86 },
];

export const Ch3: React.FC = () => {
  const { s } = useSec();
  const { H: HM } = printBox(MAH.w, MAH.a); const { H: HA } = printBox(ANW.w, ANW.a); const { H: HC } = printBox(C4.w, C4.a);
  const { H: HU } = printBox(AIU.w, AIU.a); const { H: HL } = printBox(LOR.w, LOR.a);
  return <WorldCam keys={CAM}>
    <WorldDesk w={2200} h={7200} src={DESK} />
    <LC id="critics" size={60} cx={540} y={520} red />
    <WPrint src={img("01_syed_mokhtar")} aspect={SY.a} w={SY.w} keys={SY.keys} t0={E.p01c_in.t} from={[160, -60, 8]} />
    <WPrint src={img("03_mahathir_1980s")} aspect={MAH.a} w={MAH.w} keys={MAH.keys} t0={E.mah_in.t} from={[-160, -60, -8]}>
      <L id="mah_lab" size={28} x={-20} y={HM + 14} />
    </WPrint>
    <WSvg><StringLine a={pinAt(MAH.w, MAH.a, MAH.keys, s)} b={pinAt(SY.w, SY.a, SY.keys, s)} t={E.str_mah.t} dur={E.str_mah.dur} sag={90} /></WSvg>
    <WPrint src={img("06_anwar_pm")} aspect={ANW.a} w={ANW.w} keys={ANW.keys} t0={E.anw_in.t} from={[-160, -80, -7]}>
      <L id="anw_lab" size={32} x={-20} y={HA + 14} />
    </WPrint>
    <WPrint src={img("c4_rice_sacks")} aspect={C4.a} w={C4.w} keys={C4.keys} t0={E.c4_in.t} from={[160, -80, 8]}>
      <L id="mono" size={40} red x={10} y={HC + 16} />
    </WPrint>
    <LC id="supp" size={60} cx={540} y={3300} red />
    <LC id="quote" size={40} cx={540} y={3440} />
    <LC id="quote2" size={40} cx={540} y={3515} />
    <LC id="gave" size={44} cx={540} y={3620} />
    <DateCard cx={540} cy={4250} rollId="d76" />
    <LC id="half" size={46} cx={540} y={4480} />
    <RollTape id="fam15" pre="" post=" POOR FAMILIES" x={540 - (monoW(16, 46) + 41) / 2} y={4570} size={46} red />
    <LC id="hero1" size={36} cx={540} y={4710} />
    <LC id="hero2" size={46} cx={540} y={4780} red />
    <WPrint src={img("04_aiu_campus")} aspect={AIU.a} w={AIU.w} keys={AIU.keys} t0={E.p04_in.t} from={[0, -260, 6]}>
      <L id="aiu_free" size={44} red x={-20} y={-72} />
      <L id="aiu_name" size={36} x={-20} y={HU + 14} />
    </WPrint>
    <WPrint src={img("c2_old_lorry")} aspect={LOR.a} w={LOR.w} keys={LOR.keys} t0={E.c2b_in.t} from={[-180, 120, -8]}>
      <L id="end_left" size={30} x={-20} y={HL + 12} />
    </WPrint>
    <WSvg><StringLine a={pinAt(LOR.w, LOR.a, LOR.keys, s)} b={pinAt(AIU.w, AIU.a, AIU.keys, s)} t={E.end_str.t} dur={E.end_str.dur} sag={140} /></WSvg>
    <L id="end_pays" size={40} red x={570} y={6360} />
  </WorldCam>;
};
