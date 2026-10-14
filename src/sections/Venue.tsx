// Venue, hotel guide and Vadodara (brochure pages 18-20).
import { conference, hotels, vadodara } from "../data/conference";
import { ArchImage, Backdrop, Eyebrow, Title, container } from "../components/ui";

const subhead = "font-sans text-[10.5px] font-bold uppercase tracking-[0.28em] text-amber";

export function Venue() {
  return (
    <section id="venue" class="relative isolate bg-night" aria-labelledby="venue-title">
      <Backdrop slug="pendant-light-arch" opacity="opacity-35" position="object-[center_20%]" />
      <div class={`${container} py-24 md:py-32`}>
        <div class="grid gap-14 lg:grid-cols-[1fr_360px] lg:items-end lg:gap-20">
          <div>
            <Eyebrow>Conference venue</Eyebrow>
            <Title id="venue-title" class="reveal text-sand">
              {conference.venue.name}, Vadodara.
            </Title>
            <p class="reveal mt-6 max-w-[36rem] text-[1.1rem] font-semibold leading-snug text-glow/90">{conference.venue.address}</p>
            <p class="reveal mt-4 max-w-[36rem] text-[15px] leading-relaxed text-sand/80">
              Hybrid mode: participants may join on campus in Vaghodia or online.
            </p>
          </div>
          <ArchImage slug="corridor-to-oculus" alt="" ratio="3/3.8" outline class="reveal mx-auto w-[min(100%,300px)]" sizes="300px" />
        </div>

        {/* Hotel guide */}
        <div class="reveal mt-20 border border-amber/20 bg-char/80 backdrop-blur-sm">
          <div class="grid gap-6 border-b border-amber/20 p-7 md:grid-cols-[auto_1fr] md:items-end md:p-9">
            <div>
              <p class={subhead}>Hotel guide</p>
              <h3 class="mt-2 font-display text-[1.6rem] leading-none text-glow">Welcome to Vaghodia &amp; Vadodara</h3>
            </div>
            <p class="text-[14px] leading-relaxed text-sand/80">{hotels.intro}</p>
          </div>
          <div class="overflow-x-auto">
            <table class="fee-table w-full min-w-[640px] border-collapse text-[14px]">
              <thead class="text-amber">
                <tr>
                  <th scope="col">Hotel</th>
                  <th scope="col" class="!text-left">Rating</th>
                  <th scope="col" class="!text-left">Booking</th>
                  <th scope="col" class="!text-left">Location</th>
                </tr>
              </thead>
              <tbody>
                {hotels.rows.map((h) => (
                  <tr>
                    <td class="font-sans font-bold text-sand">{h.name}</td>
                    <td class="!text-left text-[1rem] text-glow" aria-label={`${h.stars} star`}>
                      {"★".repeat(h.stars)}
                    </td>
                    <td class="!text-left text-sand/80">{h.booking || "—"}</td>
                    <td class="!text-left !whitespace-normal text-sand/80">{h.location}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <ul class="grid gap-2 border-t border-amber/20 p-7 text-[13.5px] text-sand/80 sm:grid-cols-2 md:px-9">
            {hotels.why.map((w) => (
              <li class="flex gap-3">
                <span class="mt-[0.6em] inline-block h-px w-4 shrink-0 bg-amber/60" aria-hidden="true"></span>
                {w}
              </li>
            ))}
          </ul>
        </div>

        {/* Vadodara */}
        <div class="mt-20 grid gap-12 lg:grid-cols-[1fr_1fr_0.8fr] lg:gap-10">
          <div class="reveal lg:col-span-3">
            <p class={subhead}>Vibrance of culture &amp; wonders</p>
            <h3 class="mt-2 font-display text-[1.7rem] leading-none text-glow">Nearby Vadodara</h3>
            <p class="mt-5 max-w-[48rem] text-[15px] leading-[1.75] text-sand/80">{vadodara.intro}</p>
          </div>
          <div class="reveal">
            <h4 class="border-b border-amber/20 pb-3 font-display text-[1.1rem] text-sand">Key tourist places in Vadodara</h4>
            <ul class="mt-4 space-y-3">
              {vadodara.city.map(([name, desc]) => (
                <li class="text-[14px] leading-relaxed text-sand/75">
                  <span class="font-sans font-bold text-sand">{name}</span>: {desc}
                </li>
              ))}
            </ul>
          </div>
          <div class="reveal">
            <h4 class="border-b border-amber/20 pb-3 font-display text-[1.1rem] text-sand">Nearby attractions (day trips)</h4>
            <ul class="mt-4 space-y-3">
              {vadodara.dayTrips.map(([name, desc, distance]) => (
                <li class="flex items-baseline justify-between gap-4 text-[14px] leading-relaxed text-sand/75">
                  <span>
                    <span class="font-sans font-bold text-sand">{name}</span>
                    {desc ? `: ${desc}` : ""}
                  </span>
                  <span class="shrink-0 font-display text-[0.95rem] font-bold text-amber">{distance}</span>
                </li>
              ))}
            </ul>
          </div>
          <div class="reveal">
            <h4 class="border-b border-amber/20 pb-3 font-display text-[1.1rem] text-sand">Recreation &amp; shopping</h4>
            <ul class="mt-4 space-y-3">
              {vadodara.recreation.map(([name, desc]) => (
                <li class="text-[14px] leading-relaxed text-sand/75">
                  <span class="font-sans font-bold text-sand">{name}</span>: {desc}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
