# Khwarizmiat — khwarizmiat.org

Static marketing site for Khwarizmiat (خوارزميات), v1.1, English-only. Plain
HTML/CSS/JS with no build step, self-hosted fonts, and no server-side runtime
dependencies — built to be a straight CSS/content swap for a future
Arabic/RTL bilingual pass rather than a rebuild (logical CSS properties
throughout, `lang`/`dir` already set on `<html>`, mono slots documented for
the future IBM Plex Sans Arabic swap).

**Privacy:** the site names no individual (no bios, roles, or photos — this
is a collective initiative) and lists exactly one contact channel,
`info@khwarizmiat.org`. Don't reintroduce a personal email, phone number, or
named contact anywhere (visible text, `mailto:`/`tel:` links, meta tags, or
comments) without deliberately deciding to.

## Structure

```
index.html          single-page v1.1 (mission, three commitments, what we do,
                      focus areas, who we are, contact)
css/style.css        design tokens, layout, components
css/fonts.css         self-hosted @font-face declarations
js/main.js           progressive enhancement: scroll reveals, icon draw-in,
                      background-texture parallax — all gated behind
                      prefers-reduced-motion and behind a `.js` class so the
                      page renders fully without JavaScript
fonts/                IBM Plex Sans + IBM Plex Mono (woff2, SIL OFL 1.1, see LICENSE files)
favicon.svg           geometric motif mark
```

## Local preview

No build tooling is required. Serve the directory with any static file
server, e.g.:

```
npx serve .
```

or `python3 -m http.server` — then open the printed URL.

## Deploying to Cloudflare Pages

This is a zero-build static site, so the Pages project needs no framework
preset:

1. In the Cloudflare dashboard: **Workers & Pages → Create → Pages → Connect
   to Git**, and select this repository.
2. Build settings:
   - **Framework preset:** `None`
   - **Build command:** *(leave empty)*
   - **Build output directory:** `/`
3. Deploy. Every push to the production branch redeploys automatically.

### Pointing khwarizmiat.org at the Pages project

1. In the Pages project, go to **Custom domains → Set up a custom domain**.
2. Add `khwarizmiat.org` (and `www.khwarizmiat.org` if you want the `www`
   host to resolve too).
3. If the domain's DNS is already on Cloudflare, Pages adds the required
   CNAME/DNS records automatically. If it's registered elsewhere, point it
   at Cloudflare nameservers first (or add a CNAME to
   `<project>.pages.dev` per Cloudflare's instructions) then re-check the
   custom domain step.
4. `canonical`/`og:url` in `index.html` are already set to
   `https://khwarizmiat.org/`.

## Fonts

IBM Plex Sans (Regular/SemiBold/Bold) and IBM Plex Mono (Regular/Medium) are
self-hosted as woff2 under `fonts/` (no Google Fonts CDN dependency, so the
site works on slower or restricted connections). Both are licensed under the
SIL Open Font License 1.1 — see `fonts/ibm-plex-sans/LICENSE` and
`fonts/ibm-plex-mono/LICENSE`.

**Future bilingual pass:** IBM Plex Sans Arabic is the matched sibling of
IBM Plex Sans (same superfamily, same visual voice), so the Arabic version
is a script swap, not a type-pairing redesign. Plex Mono has no Arabic
sibling — true monospacing doesn't suit Arabic's connected script — so the
Arabic version should switch the mono-type slots (nav, labels, data) to IBM
Plex Sans Arabic at tighter tracking instead. `css/style.css` has a
commented-out `html[lang="ar"]` block sketching this switch.

## Notes

- Colors, layout, and copy follow the design system: flat color fields (no
  gradients/shadows), 0px border-radius throughout, drawn borders between
  sections, and functional color use — magenta = action, blue = systems,
  gold = heritage. All three now also carry full-fill backgrounds (tags,
  buttons, nav hover) in addition to line art; the current token values were
  chosen so every fill/text pairing actually used on the page clears WCAG AA
  — re-check contrast before changing a token, don't just swap the hex.
- The icon family (an abstracted eight-point star, interlocking rings, a
  geometric eye/lens, and a node-and-line network glyph) are inline SVG
  `<symbol>`s referenced via `<use>` and recolored with CSS via
  `currentColor`. The same star shape, scaled down, tiles as the low-opacity
  background texture behind the hero and footer.
- Icons draw themselves on (stroke-dashoffset) the first time they scroll
  into view, section blocks reveal on scroll, interactive elements (nav,
  icons, buttons) get a small hover transform, and the background texture
  shifts slightly on scroll (parallax) — all in `js/main.js`, all gated
  behind `prefers-reduced-motion`, and all no-ops (content fully visible,
  static) if JavaScript doesn't run.
