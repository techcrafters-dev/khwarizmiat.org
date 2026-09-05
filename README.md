# Khwarizmiat — khwarizmiat.org

Static marketing site for Khwarizmiat (خوارزميات), v1, English-only. Plain
HTML/CSS with no build step, self-hosted fonts, and no server-side runtime
dependencies — built to be a straight CSS/content swap for a future
Arabic/RTL bilingual pass rather than a rebuild (logical CSS properties
throughout, `lang`/`dir` already set on `<html>`, mono slots documented for
the future IBM Plex Sans Arabic swap).

## Structure

```
index.html          single-page v1 (mission, three commitments, who we are, contact)
css/style.css        design tokens, layout, components
css/fonts.css         self-hosted @font-face declarations
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

- Colors, layout, and copy follow the v1 design system: flat color fields
  (no gradients/shadows), 0px border-radius throughout, drawn borders
  between sections, and functional color use (magenta = action, blue =
  systems, gold = heritage accents only — reserved for decorative motif
  line art and small meta labels, since it fails text-contrast checks on
  both Ink and Paper backgrounds).
- The geometric motif (an abstracted eight-point star) is a single inline
  SVG `<symbol>` referenced via `<use>` at three scales (hero, section
  motifs, favicon) and recolored with CSS via `currentColor`.
- Entrance animation on the hero is gated behind `prefers-reduced-motion`.
