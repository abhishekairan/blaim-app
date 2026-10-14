import { AtAGlance } from "../sections/AtAGlance";
import { Overview } from "../sections/Overview";
import { Programme } from "../sections/Programme";
import { Leadership } from "../sections/Leadership";
import { Conclusion } from "../sections/Conclusion";

export function Main() {
  return (
    <main id="content" class="bg-black">
      <video
        class="block w-full max-w-screen aspect-video m-0 leading-none"
        autoplay
        muted
        loop
        playsinline
        controlslist="nodownload"
        preload="metadata"
      >
        <source src="/assets/red_hero_video.mp4" />
      </video>
      <AtAGlance />
      <Overview />
      <Programme />
      <Leadership />
      <Conclusion />
    </main>
  );
}
