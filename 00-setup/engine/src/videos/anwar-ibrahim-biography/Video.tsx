// Anwar Ibrahim - From Prisoner to Prime Minister (vertical 1080x1920). Three chapter worlds, light-burn between them.
import React from "react";
import { AbsoluteFill, Audio, interpolate, staticFile } from "remotion";
import { T } from "../../styles/dossier/tokens";
import { BurnFlash, clamp, FilmLayer, Gate, useSec } from "../../styles/dossier/kit";
import { E, SLUG, TL } from "./common";
import { Ch1 } from "./Ch1";
import { Ch2 } from "./Ch2";
import { Ch3 } from "./Ch3";

const SHAKES = ["st_detained", "st_sacked", "st_guilty", "st_prison", "st_pardon"].map((k) => E[k].t);
export const AnwarVideo: React.FC = () => {
  const { s } = useSec(); const end = interpolate(s, [TL.duration - 0.6, TL.duration], [0, 1], clamp);
  const fadeIn = interpolate(s, [0, 0.35], [1, 0], clamp);
  const c2 = E.C2.t, c3 = E.C3.t;
  return <AbsoluteFill style={{ background: T.color.desk }}>
    <Gate shakes={SHAKES}>
      {s < c2 ? <Ch1 /> : s < c3 ? <Ch2 /> : <Ch3 />}
    </Gate>
    <BurnFlash t={c2} dur={0.4} />
    <BurnFlash t={c3} dur={0.4} />
    <FilmLayer vignette={0.86} />
    <AbsoluteFill style={{ background: "#000", opacity: Math.max(end, fadeIn) }} />
    <Audio src={staticFile(`${SLUG}/mix.wav`)} />
  </AbsoluteFill>;
};
