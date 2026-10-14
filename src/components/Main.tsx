import { Hero } from "../sections/Hero";
import { KeyDates } from "../sections/KeyDates";
import { About } from "../sections/About";
import { Themes } from "../sections/Themes";
import { Speakers } from "../sections/Speakers";
import { Committees } from "../sections/Committees";
import { Abstracts } from "../sections/Abstracts";
import { Registration } from "../sections/Registration";
import { Host } from "../sections/Host";
import { Venue } from "../sections/Venue";

// Homepage, in the brochure's running order.
export function Main() {
  return (
    <main id="content">
      <Hero />
      <KeyDates />
      <About />
      <Themes />
      <Speakers />
      <Committees />
      <Abstracts />
      <Registration />
      <Host />
      <Venue />
    </main>
  );
}
