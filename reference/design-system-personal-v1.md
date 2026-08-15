# Sarah Dzida (Personal Site) — Design System (v1)

**Build reference for Claude Code.** This is the source of truth for sarahdzida.com's visual system. Derived from two sources: `design-system-v4.md` (sarahstrategic.com, the proven shipped foundation — v3 is archived/superseded and was not consulted or used as a source for anything in this document) and the Figma mockups (About, Etc., Homepage, Work index, and four Work case-study pages: KidHQ & ToyLab, See Lexus, Travis County Civil & Family Courts, Whaddyawannaknow). Where v4 and the mockups disagree, this document — confirmed against Sarah directly — wins.

**How to read the marks:**
- `[INHERITED]` = carried over unchanged from sarahstrategic v4. No new decision was made; it's listed here so Claude Code has one complete reference instead of two documents to cross-check.
- `[NEW]` = unique to this site. Does not exist in v4, or deliberately departs from what v4 does.
- `[ASSET]` = depends on a file. See Part 5.
- `[OPEN]` = a decision still owned by Sarah, not Claude Code. Do not invent a resolution; leave it as specified and flag.
- `[STATIC IMAGE]` = an element visible in a mockup that is a flat image dropped into page content (a screenshot, a diagram, a spreadsheet capture), not a component. Do not build it as markup, do not attempt to reproduce its internal styling (fonts, table borders, colors) in CSS. It is content, sized and placed like any other inline image.

**Two things this system inherits from v4 and must not break:**
1. **Containers are square, controls are round.**
2. **The palette is the same ten core values as sarahstrategic.com — but role assignments differ per site.** Do not assume a hex code means the same thing here that it means on v4. See §1.4.

**One thing this system deliberately does NOT inherit:**
Prata is not used anywhere on this site. There is no display serif. All headings, including H1, are Raleway. This is a confirmed, deliberate departure — not an oversight to "fix" toward v4.

---

# PART 1 — FOUNDATIONS

## 1.1 Responsive principles `[INHERITED]`

Same rules as v4 §1.1: mobile-first, `min-width` queries only, no horizontal scroll at 320px, body text never below 16px, 44×44 minimum interactive target, DOM order matches visual order (same named-area-grid exception for carousel-style controls where a control repositions relative to the one thing it operates on).

## 1.2 Grid & breakpoints `[INHERITED]`

```css
--content-max: 1280px;
--gutter: 80px;   /* ≥1200 */   /* 48px ≥900 · 24px below */
```
Breakpoints: `sm 600 · md 900 · lg 1200`. Minimum supported width 320px.

No component-specific breakpoint exceptions are confirmed for this site yet (v4 had two — nav at 1200, bio block at 599 — both tied to sarahstrategic-specific components that don't exist here). If Claude Code hits a real wrapping problem building this site, that's a new `[OPEN]` item for Sarah, not a silent reuse of v4's exception values.

## 1.3 Spacing scale `[INHERITED]`

`4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 128`. Bands defined by padding, not fixed height.

| Band | Desktop / mobile padding |
|---|---|
| Nav | height 80 / 64 |
| Homepage intro band | 96 / 64 · min-height 480 |
| Badge-hero (interior pages) | 64 / 48 |
| Work detail banner | no fixed padding — image is edge-to-edge within its column, see §3.20 |
| White content section | 96 / 64 |
| "Choose an Adventure" panel | 96 / 64 per panel |
| Case-study testimonial band | 96 / 64 |
| Footer | 48 / 32 |

## 1.4 Colour `[NEW roles, INHERITED values]`

**Same ten core hex values as v4 — reused with different roles.** This is the single most important thing to get right: do not copy v4's role table.

```css
--teal:        #26575a;   /* nav ground; footer ground(?see §3.25); Hey Virgil panel; case-study testimonial ground; H2s */
--red:         #D34340;   /* action only — links, one testimonial-card variant; NOT nav hover, see below */
--yellow:      #F8C417;   /* Etc. badge; framed-panel border (Choose an Adventure outer frame); one testimonial-card variant */
--yellow-tint: #FBE18B;   /* reserved — no confirmed use yet on this site */
--olive:       #858E69;   /* Work badge; Sarah Strategic Consulting panel ground; one testimonial-card variant */
--coral:       #EB6D66;   /* About badge; Writer & Artist panel ground; one testimonial-card variant */
--coral-tint:  #F29F9A;   /* reserved — no confirmed use yet on this site */
--dusty-teal:  [SAMPLE FROM MOCKUP — not yet in the v4 palette, see below]  /* homepage intro band ground */
--surface-alt: #F5F5F5;   /* Work index background band, reused from v4's role */
--ink:         #000000;   /* body copy, badge text */
```

`[OPEN]` **The homepage intro band's dusty blue-teal ground is not one of the ten confirmed palette values** — it reads visibly lighter/greyer than `--teal`. Before Claude Code builds this, confirm with Sarah: is this a genuine eleventh value (a tint of teal, needs its own token and contrast-check against white and `--ink` text), or is it `--teal` at reduced opacity over white? Do not guess-sample it from the flat PNG export and ship it as final — flat exports can shift color slightly from source.

**Badge color is not systematic — it's Sarah's per-page editorial call, confirmed.** About = coral, Etc. = yellow, Work = olive. This is not a rule to reverse-engineer or extend generatively; if a new interior page is added later, its badge color is a new creative decision, not something Claude Code infers from a pattern.

**Homepage "Choose an Adventure" panel grounds, confirmed as fixed (not rotating):** Sarah Strategic Consulting = white ground / olive badge, framed in yellow border. Hey Virgil = teal ground / teal badge-on-teal (badge reads as a slightly deeper teal fill — sample and confirm exact value, don't assume it equals `--teal` itself since a same-color badge-on-ground would have zero contrast). Writer & Artist = coral ground / white badge-on-coral (again, sample and confirm — coral badge on coral ground would fail contrast, so there's a variant at play; flag exact values to Sarah before locking in code).

**Testimonial card colors, homepage: editorial, per-card, Sarah's choice each time — not a rule.** Rotation observed in mockup (red/teal/coral for Sarah Strategic panel; olive/red for Hey Virgil panel; teal/yellow/olive for Writer & Artist panel) is not a formula to extend. When new cards are added, the color is picked by Sarah at time of writing, same as badge colors. Build the component to accept any of the five action/accent colors (red, teal, yellow, olive, coral) as a card variant; do not hardcode a rotation sequence in the markup or JS.

**Text-safe variants — inherited requirement, not yet confirmed which are in use here:**
```css
--olive-text: #6E7556;
--coral-text: #BD4A42;
--red-dark:   #B03330;
```
Same rule as v4: these fill colors fail or barely pass AA as small text on white. Wherever olive, coral, or red text under 24px appears on a light ground on this site (footer text, meta lines, small labels), use the text-safe variant, not the fill color — even though no mockup explicitly shows this distinction on this site, the underlying contrast math doesn't change between sites. Flag any place in the mockups where a fill color appears to be used as small text directly (I did not spot one in this set, but Claude Code should check against real rendered output, not just the flat export).

## 1.5 Type — two faces, not three `[NEW]`

```css
--font-heading: 'Raleway', sans-serif;   /* H1, H2, H3, badges, nav, buttons, labels */
--font-body:    'Open Sans', sans-serif; /* body copy */
```

**No Prata anywhere on this site.** This is the single largest visual departure from v4 and should not be "corrected" toward the sarahstrategic system. H1 is Raleway, larger than v4's H2 scale — confirmed by Sarah as "exactly larger Raleway," not a new face.

Since only two faces exist here (vs. v4's three), there's no display/heading split to protect — Raleway carries both jobs. `[OPEN]`: exact H1 clamp size/weight is not yet specified. Recommend extending v4's fluid-scale approach rather than a fixed size: something in the range of `clamp(1.75rem, 1.3rem + 2vw, 2.75rem)` at weight 600–700, sized visibly larger than v4's H2 (`clamp(1.25rem, 1.1rem + 0.7vw, 1.5rem)`) but without Prata's serif weight doing contrast work, so Raleway's own bold weight needs to carry that job. **This needs Sarah's sign-off on the actual number before Claude Code locks it** — flagged, not decided, here.

Everything else in v4's type table (H3, lede, body, pull quote, meta/eyebrow, sub-label, footer sizing/line-height/weight logic) is `[INHERITED]` as a starting point — apply the same roles, substituting Raleway wherever v4 said Prata.

## 1.6 Radius `[INHERITED]`

```css
--radius-none: 0;   /* framed panels, badges, testimonial cards (to confirm — see §3.19), case-study tables-as-images */
--radius-sm:   8px; /* buttons */
--radius-md:   16px; /* reserved */
```
**Rule: containers are square, controls are round.** Same as v4 — do not apply a global radius default.

## 1.7 Borders & focus `[INHERITED mechanism, NEW colors]`

Focus treatment is identical to v4 §1.7 — one treatment, every control, `--red-dark` ring, never removed without replacement. `prefers-reduced-motion` respected on any transition (testimonial-card carousel fade, hover states).

**Framed-panel border:** yellow, `24px` desktop / `16px` below 900 — same values as v4's framed-panel border, reused directly for the "Choose an Adventure" outer container. Confirmed this is a literal reuse of the `.framed` component from v4, stacked three times with different ground colors and content per instance — not a new component built from scratch.

## 1.8 Nav — new ground, new interaction states `[NEW]`

Nav ground is **always solid `--teal`**, white text — unlike v4, where nav is white-ground with dark text and coral/red-on-hover. Because the ground itself is teal here, v4's coral hover treatment (designed for coral-on-white contrast) does not carry over — coral text on a teal ground does not have confirmed contrast and wasn't tested for this palette pairing.

**`[OPEN]` Nav hover/active state is not yet designed.** Recommend to Sarah: white text with a `--yellow` underline on hover (yellow is the only accent color in the ten-value palette that reads with strong contrast against `--teal`, and it's already doing "attention" work elsewhere on this site — Etc.'s badge, the framed-panel border). Active/current-page state: same yellow, but persistent underline rather than hover-only, consistent with how v4 handles selected states (underline, not fill). **This is a proposal, not a decision — confirm before Claude Code builds it.**

## 1.9 Logo `[ASSET] [NEW]`

Nav mark is `SD-Secondary-Logo-White.png` — confirmed distinct from v4's `SD-Circle-Black.png`/`SD-Circle-White.png` pairing. Since nav ground is always teal here (never white, unlike v4 where nav could theoretically need both variants), only the white lockup is needed — no reversed/dark variant required unless a future teal-ground component elsewhere needs it.

---

# PART 2 — PAGE-LEVEL HERO TREATMENTS `[NEW]`

**Confirmed: this site does not have one shared `.page-hero` component the way v4 does.** Three distinct treatments exist, deliberately, per page type. Do not consolidate them into one component — build three.

## 2.1 Badge-hero (About, Etc., Work index)
White page background, no pattern. A solid-color rectangle ("badge") containing the page title in `--ink` text, left-aligned near the top of the page. Badge color is Sarah's editorial call per page (§1.4) — not inferred, not systematized. Thin horizontal rule beneath the hero block in a fourth accent color (About uses `--red` per the mockup; Etc. uses `--yellow`; confirm Work index's rule color — not fully legible in the flat export, flag to Sarah rather than guess). Below the rule: optional one-line intro copy in body text (Etc. and Work index both have this; About does not).

## 2.2 Homepage intro band
Full-width band in the `[OPEN]` dusty-teal ground (§1.4), containing: square portrait image (left), name + role headline + "Quick Intro" body copy (right), all left-aligned within `--content-max`. Below the band, centered call-to-scroll text ("↓ Choose an Adventure ↓") sits on the same ground before the page transitions into the framed panel stack.

## 2.3 Work detail hero (case-study pages)
Breadcrumb ("Work >") in small teal text, above a plain black/ink H1 (project name), above a client-list line, above two short paragraphs (intro + "The Challenge:"), all on white, left column. Right column: a photo/illustration banner specific to that project — full-bleed within its column, no fixed aspect ratio confirmed across the four mockups (dimensions were inconsistent per Sarah — see Part 3 for the single template this needs to resolve to). No badge, no pattern, no teal ground on this hero type.

---

# PART 3 — COMPONENTS

## 3.1 "Choose an Adventure" panel stack (Homepage only) `[NEW]`

Reuses v4's `.framed` component (§1.7 border treatment) — three instances stacked vertically, each with a different ground color and content set. This is a homepage-specific arrangement of an inherited primitive, not a new component type to name and reuse elsewhere unless a future page calls for it.

Each panel contains: a colored badge (component identical to interior-page hero badges, §2.1, just placed mid-page instead of at page-top) with the venture name, one or two short paragraphs, a bolded call-to-action line, a text link to the external site (`sarahstrategic.com`, `heyvirgil.com`, `dthroughz.com`), and 2–3 small testimonial cards (§3.2).

Confirmed fixed per-panel grounds (not rotating, not extendable by pattern — see §1.4): Sarah Strategic Consulting (white ground, yellow frame, olive badge), Hey Virgil (teal ground, teal-toned badge), Writer & Artist (coral ground, white badge). If a fourth venture is ever added, its ground/badge pairing is a new editorial decision, not inferred from these three.

## 3.2 Testimonial card (Homepage) `[NEW]`

Small rectangular card, white or light text on a solid accent fill (red, teal, yellow, olive, or coral — any of the five action/accent colors, chosen editorially per card by Sarah, not a fixed rotation — see §1.4). Contains a short quote and an attribution line (name only, or name + role for longer citations — "— Julia G." vs. "— George Bernard Shaw" — both patterns appear, no distinction needed in markup, just optional role text).

**Responsive behavior, confirmed:** 3 cards visible at desktop width, reducing to 2, then 1, at mobile breakpoints — **using v4's existing carousel arrow control** (§3.16 in v4: real `<button>` prev/next, `aria-label`'d, 44×44 hit area, `aria-live="polite"`, fade transition respecting `prefers-reduced-motion`). This is a direct reuse of the carousel mechanism v4 already built and proved out for the trusted-by logo strip — same interaction pattern, different content (quote cards instead of client logos). Do not rebuild the carousel logic from scratch.

**Note this is a distinct component from the case-study testimonial (§3.4)** — different visual treatment, different context (multiple small cards vs. one large quote on a pattern ground), do not merge them.

## 3.3 Work index card grid `[NEW]`

**Confirmed: no filtering, no categories, no featured/hero tier.** At current volume (3 case studies, expected to grow to 10–15), this is a plain, equal-weight, unfiltered responsive grid. Order is manual (whatever order the case studies are listed in the page content) — no date field, no ranking logic needed at this volume. Revisit if/when the roster grows large enough that browsing becomes a real problem; not a concern to design against now.

**Card contents:** thumbnail image (sourced from that case study's own hero banner), project title, client name(s), one-line summary (reuse the existing "Challenge:" framing already written for each case study, truncated if needed — not a new content field to ask Sarah to write per card).

**Layout:** responsive grid, suggest 2–3 columns at desktop widths (`≥900px`), collapsing to 1 column `≤680px` — consistent with v4's general breakpoint philosophy of collapsing two-column patterns before 900px rather than at it. Whole card is the click target (single unique accessible name per WCAG 2.4.4, same rule as v4 §6.4 — "Read More" alone is never sufficient).

`[OPEN]` Exact column count at desktop (2 vs. 3) not yet confirmed — flag to Sarah once real thumbnail images exist; depends on how the images crop.

## 3.4 Case-study testimonial band `[INHERITED from v4]`

Full-width band, pattern-image ground (per-project pattern, not systematized — see Part 5 note on pattern assets), single white quote card centered, quote + attribution (`Name · Title · COMPANY`, full-caps company per v4's existing citation convention). **This is a direct reuse of v4's case-study testimonial pattern** — not the homepage's small testimonial-card component (§3.2). Do not conflate the two; they look different and serve different contexts (one big authoritative quote closing a case study vs. several small quotes inside a homepage panel).

## 3.5 Work detail template `[NEW, consolidating four inconsistent mockups]`

**Confirmed: one canonical template, not four distinct layouts.** The four mockups (KidHQ, See Lexus, Travis County, WDYWK) show inconsistent banner dimensions and testimonial placement — Sarah has confirmed this is unintentional drift across drafts, not deliberate per-project variation, and wants one template extracted.

Canonical structure, top to bottom:
1. Hero (§2.3): breadcrumb, H1, client list, intro paragraph, "The Challenge:" paragraph, banner image (right column, needs a confirmed fixed aspect ratio — `[OPEN]`, flag to Sarah since the four mockups don't agree; recommend picking one ratio, e.g. matching a standard widescreen crop, and cropping all four project banners to it rather than letting each project banner set its own dimensions)
2. "What I Did" — H2, body paragraphs, may include a bulleted list of what the project entailed
3. "Success Stats" — H3/bold label, bulleted list of outcomes/numbers
4. "Expertise" — H3/bold label, bulleted list of skill/discipline tags (this is the natural taxonomy source if a future filter is ever added to the Work index — noted for later, not built now per §3.3)
5. "Concept → Launch" — H2 with a small left-border accent (teal, matching v4's callout-box border convention), one or more supporting artifacts. **These artifacts are frequently static images `[STATIC IMAGE]`** — screenshots of flowcharts, spreadsheets, sticky-note photos, comparison matrices. Do not attempt to rebuild these as live components (e.g., the See Lexus comparison table with the black header row is a flat image of a table, not a table element to restyle — see the explicit callout below). Size and place as content images with appropriate alt text per v4 §6.5's existing alt-text philosophy (name what the image communicates, not just what it depicts).
6. Optional: video link (WDYWK, KidHQ both link to a Vimeo URL as plain text/link, not an embedded player — confirm this stays a link rather than becoming an embed, since embeds bring their own a11y/perf considerations not scoped here)
7. Optional: "Press" — H3, bulleted list of external links
8. Case-study testimonial band (§3.4), closing every case-study page

**Explicit callout, since this was flagged as a point of possible confusion:** any table-like, chart-like, or diagram-like visual inside a case study's "Concept → Launch" section that appears in the mockup as a flat screenshot (the See Lexus content-audit spreadsheet, the See Lexus black-header comparison matrix, the KidHQ system-flow diagram, the WDYWK sticky-note photo and entry-flow diagram) is a **static image**, full stop. None of these need a data-table component, a chart component, or a diagram-building tool in the new system. If Claude Code is ever unsure whether something in a case-study mockup is a static image or a component to build, **ask — don't guess.**

## 3.6 Etc. page — two-column category list `[NEW, extensible]`

Confirmed: **Awards only, for now.** Structure: a section label ("Awards") in small caps/eyebrow style on the left, a two-column list of entries on the right (each entry: bold title, meta line — issuer · year — in text-safe olive, body paragraph). Build the two-column list as a generic repeatable pattern (not hardcoded to "Awards" specifically) so future categories (press, speaking, publications — confirmed as "more to come," not yet named or scoped) can be added as additional labeled sections using the same list pattern, without a template rebuild. Do not pre-build placeholder sections for categories that don't exist yet — just don't make the "Awards" label structurally special in a way that blocks adding a sibling section later.

## 3.7 About page — annotated-edit block `[NEW]`

A real, reusable text-treatment component, confirmed by Sarah — not one-off throwaway copy.

**Visual treatment:**
- Strikethrough text: muted tone, not full alarm-red — recommend `--olive-text` or a similarly muted grey-olive, so struck content reads as "quietly retired" rather than "flagged as an error." (Matches the component's actual intent: this is editorial self-revision, not a warning.)
- Inserted/edited text: `--red`, matching what's already shown in the mockup.
- Quoted block (the AI-generated text being annotated): left border accent in `--teal`, reusing v4's existing callout-box border convention (`1px --teal`, v4 §1.7) rather than inventing a new border treatment for this one component.
- Intro line above each quoted block (e.g. "Here's what the 🤖 says about me as of July 31, 2026, with strikethroughs and edits by me:") stays plain body text — no special styling needed beyond what's already in the type scale.

`[OPEN]` **Refresh cadence confirmed as open** — build the visual component now regardless (it doesn't need to know its own update frequency to render correctly), but note in content ownership that whether this gets periodically re-run/re-edited by Sarah or eventually replaced with static final copy is undecided. Doesn't block the build.

---

# PART 4 — STILL OPEN (Sarah's decisions, not Claude Code's)

1. **Homepage intro band ground color** `[OPEN]` — not a confirmed palette value; needs sampling/confirmation before coding, see §1.4.
2. **"Choose an Adventure" panel badge colors for Hey Virgil (teal-on-teal) and Writer & Artist (white-on-coral)** `[OPEN]` — need exact hex confirmation since same-color-on-same-ground would fail contrast; something more specific is happening in the mockup that needs sampling, see §1.4.
3. **Nav hover/active color treatment** `[OPEN]` — proposed (yellow underline) but not confirmed, see §1.8.
4. **H1 exact size/weight** `[OPEN]` — proposed range given, not confirmed, see §1.5.
5. **Work index rule-color beneath the badge** `[OPEN]` — not clearly legible in the flat mockup export, see §2.1.
6. **Work detail banner aspect ratio** `[OPEN]` — four mockups disagree, needs one confirmed ratio before building the consolidated template, see §3.5.
7. **Work index desktop column count (2 vs. 3)** `[OPEN]` — see §3.3.
8. **About annotated-edit block refresh cadence** `[OPEN]` — doesn't block build, see §3.7.
9. **Etc. future category set (press, speaking, etc.)** `[OPEN]` — confirmed "more to come," not yet scoped.

---

# PART 5 — ASSET MANIFEST

Confirmed present, reused from v4:
- `SD-Secondary-Logo-White.png` — nav mark for this site (distinct from v4's nav asset choice)

Needed, not yet confirmed as delivered:
- Per-project pattern images for each case-study testimonial band (§3.4) — v4's five pattern assets (`Pattern-sophisticated-{olive,salmon,red,darkteal,yellow}.png`) may or may not be the intended source; mockups show patterns that don't match the confirmed v4 assets exactly (per Sarah, mockup pattern art is not final — flagged, not a blocker)
- Case-study hero banners/photography for KidHQ, See Lexus, Travis County, WDYWK (four separate assets, real content, not placeholders)
- Homepage portrait (may be the same `sarah-portrait.jpg` used on sarahstrategic.com, or a distinct image — not confirmed)
- Static content images for each case study's "Concept → Launch" section (diagrams, screenshots, photos — see §3.5) — these are per-project content assets, not systemic design assets, and should come from Sarah as final files rather than being extracted from the Figma flat exports

---

*End of v1. This document should be updated the same way v4 was — flagged deviations with reasoning, not silent edits — once Claude Code builds against it and real screen output surfaces problems the flat mockups couldn't show.*
