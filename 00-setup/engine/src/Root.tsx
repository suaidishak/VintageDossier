import React from "react";
import { Composition } from "remotion";
import { SelfTest } from "./selftest/SelfTest";
import { AnwarVideo } from "./videos/anwar-ibrahim-biography/Video";
import AnwarTL from "./videos/anwar-ibrahim-biography/timeline.json";
import { SyedMokhtarVideo } from "./videos/syed-mokhtar-albukhary-biography/Video";
import SyedTL from "./videos/syed-mokhtar-albukhary-biography/timeline.json";
// VIDEO-REGISTRY: Claude adds one <Composition> per video below (id = slug in PascalCase, duration from timeline.json).
export const Root: React.FC = () => <>
  <Composition id="SelfTest" component={SelfTest} width={1920} height={1080} fps={30} durationInFrames={120} />
  <Composition id="AnwarIbrahimBiography" component={AnwarVideo} width={1080} height={1920} fps={30} durationInFrames={Math.ceil(AnwarTL.duration * 30)} />
  <Composition id="SyedMokhtarAlbukharyBiography" component={SyedMokhtarVideo} width={1080} height={1920} fps={30} durationInFrames={Math.ceil(SyedTL.duration * 30)} />
</>;
