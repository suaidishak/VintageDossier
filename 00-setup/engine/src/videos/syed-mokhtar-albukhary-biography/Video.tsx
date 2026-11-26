// Syed Mokhtar Albukhary - From Two Lorries to an Empire (vertical 1080x1920). Three chapter worlds, light-burn between them.
import React from "react";
import { AbsoluteFill, Audio, interpolate, staticFile } from "remotion";
import { T } from "../../styles/dossier/tokens";
import { BurnFlash, clamp, FilmLayer, Gate, useSec } from "../../styles/dossier/kit";
import { E, SLUG, TL } from "./common";
import { Ch1 } from "./Ch1";
import { Ch2 } from "./Ch2";
import { Ch3 } from "./Ch3";

const SHAKES = ["st_collapse", "st_nocomment"].map((k) => E[k].t).concat([E.pm_4.t2]);
export const SyedMokhtarVideo: React.FC = () => {
  const { s } = useSec(); const end = interpolate(s, [TL.duration - 0.6, TL.duration], [0, 1], clamp);
  const fadeIn = interpolate(s, [0, 0.3], [1, 0], clamp);
  return <AbsoluteFill style={{ background: T.color.desk }}>
    <Gate shakes={SHAKES}>{s < E.C2.t ? <Ch1 /> : s < E.C3.t ? <Ch2 /> : <Ch3 />}</Gate>
    <BurnFlash t={E.C2.t} dur={0.4} />
    <BurnFlash t={E.C3.t} dur={0.4} />
    <FilmLayer vignette={0.86} />
    <AbsoluteFill style={{ background: "#000", opacity: Math.max(end, fadeIn) }} />
    <Audio src={staticFile(`${SLUG}/mix.wav`)} />
  </AbsoluteFill>;
};
