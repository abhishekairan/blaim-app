import { glyphs, type GlyphName } from "./icons.data";

/**
 * Inline SVG replacement for the Font Awesome webfont icons. The viewBox is one em tall (512 units)
 * with the font's ascent (448) at the top, so the glyph sits exactly where the font glyph did.
 * Size it with a height class (e.g. h-[18px]); width follows the glyph's advance.
 */
export function Icon({ name, class: className = "" }: { name: GlyphName; class?: string }) {
  const glyph = glyphs[name];
  return (
    <svg
      class={`fill-current ${className}`}
      viewBox={`0 0 ${glyph.width} 512`}
      aria-hidden="true"
      focusable="false"
    >
      <path transform="translate(0 448) scale(1 -1)" d={glyph.d} />
    </svg>
  );
}
