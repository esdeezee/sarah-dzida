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

## 1.2 Grid & breakpoints `[CONFIRMED — see 2026-08-20 note]`

```css
--container-width: 1280px;
--gutter: clamp(20px, 5.6vw, 80px);   /* reaches 80px at desktop (≥~1350px); fluid below that */
```

**2026-08-20: this doc's original 1280px/80px numbers were correct and shipped CSS had drifted to 1160px/64px** — caught by pixel-measuring the real mockup PNGs directly (content starts exactly 80px in from the canvas edge on every mockup checked, an exact match for the numbers below). Fixed in code. One real, deliberate departure from what this doc originally specified: the gutter is a fluid `clamp()`, not a fixed 80/48/24 stepped at hard breakpoints — that was an earlier build-time decision, kept since it works and no visible bug has ever traced back to it.

**Breakpoints actually in use in the shipped CSS** (not the doc's original `sm 600 / md 900 / lg 1200`): mostly `899px` and `680px`, with a handful of component-specific ones (`599px`, `860px`, `1199px`) where a specific layout needed it. **Confirmed 2026-08-20** — Sarah checked every page live at these breakpoints and confirmed it's all correct as shipped. The doc's original 600/900/1200 tier is superseded; the shipped tier is now the standard, not a placeholder.

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
--hero-bg:     color-mix(in srgb, var(--teal) 45%, white);  /* homepage intro band ground — CONFIRMED, resolved below */
--surface-alt: #F5F5F5;   /* Work index background band, reused from v4's role */
--ink:         #000000;   /* body copy, badge text */
```

**2026-08-20: homepage intro band ground, resolved.** It's not an eleventh palette value — it's `color-mix(in srgb, var(--teal) 45%, white)`, a computed tint of `--teal`, not a sampled/guessed flat color.

**Badge color is not systematic — it's Sarah's per-page editorial call, confirmed.** About = coral, Etc. = yellow, Work = olive. This is not a rule to reverse-engineer or extend generatively; if a new interior page is added later, its badge color is a new creative decision, not something Claude Code infers from a pattern.

**Homepage "Choose an Adventure" panel grounds, confirmed as fixed (not rotating), exact values shipped:** Sarah Strategic Consulting = white ground / `--olive-text` badge (the darker, accessible olive variant — not the flat `--olive` fill, and not a rotating choice, both the badge and its adjacent link color use this specifically), framed in yellow border. Hey Virgil = teal ground / solid `--teal` badge (genuinely teal-on-teal, no separate deeper-teal variant exists — this only reads as distinct because of the badge's own edge/shadow, not a different fill color). Writer & Artist = coral ground / solid `--coral` badge (also genuinely coral-on-coral, same story). Neither Hey Virgil nor Writer & Artist actually needed the "confirm a variant exists" caution this doc originally flagged — both are the flat fill color on matching ground.

**Testimonial card colors, homepage: editorial, per-card, Sarah's choice each time — not a rule.** Confirmed still true. One accessibility-driven exception: the coral and olive card variants specifically don't use the flat `--coral`/`--olive` fills with white text (measured contrast failure, ~3.0–3.5:1) — instead the *quote text itself* was bumped to 1.2rem/700 sitewide, which is large/bold enough to legitimately clear WCAG's large-text 3:1 threshold without touching any card color. This was a real back-and-forth this session (tried darkening the fills first, which visually collapsed coral into looking like `--red` since the two sit at nearly the same hue in this palette — reverted). Red, teal, and yellow cards were never a contrast problem and are untouched.

**Text-safe variants — confirmed actual usage, not just intent:**
```css
--olive-text: #6E7556;   /* in active use — testimonial cards, quote-band cite/role text, case-note accents */
--coral-text: #BD4A42;   /* defined in CSS, not currently used anywhere on the shipped site */
--red-dark:   #B03330;   /* not confirmed in use */
```
`--olive-text` is genuinely load-bearing across several components now. `--coral-text` exists as a token but nothing currently uses it — it was tried for the testimonial-card fix above and reverted along with that approach.

## 1.5 Type — two faces, not three `[NEW]`

```css
--font-heading: 'Raleway', sans-serif;   /* H1, H2, H3, badges, nav, buttons, labels */
--font-body:    'Open Sans', sans-serif; /* body copy */
```

**No Prata anywhere on this site.** This is the single largest visual departure from v4 and should not be "corrected" toward the sarahstrategic system. H1 is Raleway, larger than v4's H2 scale — confirmed by Sarah as "exactly larger Raleway," not a new face.

Since only two faces exist here (vs. v4's three), there's no display/heading split to protect — Raleway carries both jobs. **H1 sizing, confirmed shipped (two contexts, both weight 700):** homepage hero H1 is `clamp(1.9rem, 3.4vw, 2.6rem)`; interior-page badge-hero H1 (`.page-head__label`) is `clamp(1.6rem, 1.3rem + 2vw, 2rem)`, slightly smaller since it's set inside a colored badge box rather than standing alone. Base `h1`/`h2`/`h3`/`h4` all share one rule (`1.5rem`, weight 700) as the fallback before either context-specific override applies.

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

**Nav hover/active state, confirmed shipped exactly as originally proposed:** white text, `--yellow` underline (`border-bottom: 2px solid`) on both `:hover` and `[aria-current="page"]` — persistent for the active page, hover-only otherwise. Note this yellow-underline convention is deliberately *not* reused for body-copy inline links (`.inline-link`) — those use a teal underline on hover instead, since yellow read as too shouty/nav-specific once tried on regular paragraph links this session.

## 1.9 Logo `[ASSET] [NEW]`

Nav mark is `SD-Logo-White.png` (renamed from the original `SD-Secondary-Logo-White.png` partway through build — see Part 5) — confirmed distinct from v4's `SD-Circle-Black.png`/`SD-Circle-White.png` pairing. Since nav ground is always teal here (never white, unlike v4 where nav could theoretically need both variants), the white lockup carries the nav — the black variant (`SD-Logo-Black.png`) exists too and is used for the light-mode favicon.

---

# PART 2 — PAGE-LEVEL HERO TREATMENTS `[NEW]`

**Confirmed: this site does not have one shared `.page-hero` component the way v4 does.** Three distinct treatments exist, deliberately, per page type. Do not consolidate them into one component — build three.

## 2.1 Badge-hero (About, Etc., Work index)
White page background, no pattern. A solid-color rectangle ("badge") containing the page title in `--ink` text, left-aligned near the top of the page. Badge color is Sarah's editorial call per page (§1.4) — not inferred, not systematized. Thin horizontal rule beneath the hero block, confirmed shipped: About = `--red`, Etc. = `--yellow`, Work index = `--olive` (matches its badge color, unlike About/Etc. where the rule color differs from the badge — Work's rule and badge happen to be the same value). Rule weight unified to `2px` across all three (was inconsistent 2–6px during build). Below the rule: optional one-line intro copy in body text (Etc. and Work index both have this; About does not).

## 2.2 Homepage intro band
Full-width band in the `--hero-bg` ground (§1.4, resolved — a computed tint of `--teal`, not a separate palette value), containing: portrait image (left), name + role headline + "Quick Intro" body copy (right), all left-aligned within `--container-width`. Below the band, centered call-to-scroll text ("↓ Choose an Adventure ↓") sits on the same ground before the page transitions into the framed panel stack. Mobile: portrait goes full-bleed edge-to-edge when it stacks above the text, rather than a small centered image.

## 2.3 Work detail hero (case-study pages)
Breadcrumb ("Work >") in small teal text, above a plain black/ink H1 (project name), above a client-list line, above two short paragraphs (intro + "The Challenge:"), all on white, left column. Right column: a photo/illustration banner specific to that project — full-bleed within its column. **Aspect ratio question resolved, see §3.5** — no fixed ratio, `min-height: 480px` + `background-size: cover` instead. No badge, no pattern, no teal ground on this hero type.

---

# PART 3 — COMPONENTS

## 3.1 "Choose an Adventure" panel stack (Homepage only) `[NEW]`

Reuses v4's `.framed` component (§1.7 border treatment) — three instances stacked vertically, each with a different ground color and content set. This is a homepage-specific arrangement of an inherited primitive, not a new component type to name and reuse elsewhere unless a future page calls for it.

Each panel contains: a colored badge (component identical to interior-page hero badges, §2.1, just placed mid-page instead of at page-top) with the venture name, one or two short paragraphs, a bolded call-to-action line, a text link to the external site (`sarahstrategic.com`, `heyvirgil.com`, `dthroughz.com`), and 2–3 small testimonial cards (§3.2).

Confirmed fixed per-panel grounds (not rotating, not extendable by pattern — see §1.4 for exact shipped values): Sarah Strategic Consulting (white ground, yellow frame, `--olive-text` badge), Hey Virgil (teal ground, flat `--teal` badge), Writer & Artist (coral ground, flat `--coral` badge). If a fourth venture is ever added, its ground/badge pairing is a new editorial decision, not inferred from these three.

## 3.2 Testimonial card (Homepage) `[NEW]`

Small rectangular card, white or light text on a solid accent fill (red, teal, yellow, olive, or coral — any of the five action/accent colors, chosen editorially per card by Sarah, not a fixed rotation — see §1.4). Contains a short quote and an attribution line (name only, or name + role for longer citations — "— Julia G." vs. "— George Bernard Shaw" — both patterns appear, no distinction needed in markup, just optional role text).

**Responsive behavior, confirmed shipped, adapted from v4's carousel arrow control** (real `<button>` prev/next, `aria-label`'d, 44×44 hit area, `aria-live="polite"`, fade transition respecting `prefers-reduced-motion`) but simplified from v4's "3→2→1 visible" spec to a binary switch: **all cards visible above `899px`, one-at-a-time carousel below it.** The breakpoint was originally `680px` but got raised — at `680px`, 3-card panels had single-digit pixels of margin before wrapping into an uneven multi-row grid on tablet widths (a real bug Sarah caught live), so it now matches this file's other `899px` tier instead of a number picked in isolation.

**Note this is a distinct component from the case-study testimonial (§3.4)** — different visual treatment, different context (multiple small cards vs. one large quote on a pattern ground), do not merge them.

## 3.3 Work index card grid `[NEW]`

**Confirmed: no filtering, no categories, no featured/hero tier.** At current volume (3 case studies, expected to grow to 10–15), this is a plain, equal-weight, unfiltered responsive grid. Order is manual (whatever order the case studies are listed in the page content) — no date field, no ranking logic needed at this volume. Revisit if/when the roster grows large enough that browsing becomes a real problem; not a concern to design against now.

**Card contents:** thumbnail image (sourced from that case study's own hero banner), project title, client name(s), one-line summary (reuse the existing "Challenge:" framing already written for each case study, truncated if needed — not a new content field to ask Sarah to write per card).

**Layout, confirmed shipped:** `grid-template-columns: repeat(auto-fit, minmax(260px, 1fr))` — a fluid auto-fit grid rather than a fixed 2-vs-3 column decision. This sidesteps the open question below entirely: column count isn't chosen at any breakpoint, it's however many 260px-minimum tiles fit the available width, which naturally becomes 1 column on narrow screens without a separate breakpoint rule. Whole card is the click target (single unique accessible name per WCAG 2.4.4, same rule as v4 §6.4 — "Read More" alone is never sufficient).

## 3.4 Case-study testimonial band — "quote-band" `[shipped spec below]`

Full-width band, pattern-image ground keyed per project (`--red`/`--teal`/`--olive`/`--coral`/`--yellow` variants, each paired with its matching high-res pattern PNG from `images/sophisticated patterns/` — **not** the smaller trimmed copies that briefly lived in `images/patterns/` and caused a real blur bug on desktop, since fixed). Single white card centered, confirmed real values: `border-radius: 16px`, `padding: 48px`, `max-width: 55%` at desktop, stepping up to `80%` below `1199px` and to a near-full width below `899px`. Cite line: name in `--ink` (bold), role/company in `--olive-text` (not full-caps company as originally specced — actual shipped citation is `Name · Role · Company`, regular weight for the role/company portion, olive-text color for that segment specifically). Thin top rule above the cite line in `#fbdd78` (yellow-tint). **Distinct from the homepage's small testimonial-card component (§3.2)** — different visual treatment, different context, do not conflate.

## 3.5 Work detail template `[NEW, consolidating four inconsistent mockups]`

**Confirmed: one canonical template, not four distinct layouts.** The four mockups (KidHQ, See Lexus, Travis County, WDYWK) show inconsistent banner dimensions and testimonial placement — Sarah has confirmed this is unintentional drift across drafts, not deliberate per-project variation, and wants one template extracted.

Canonical structure, top to bottom:
1. Hero (§2.3): breadcrumb, H1, client list, intro paragraph, "The Challenge:" paragraph, banner image (right column). **Aspect ratio resolved differently than originally planned** — no single fixed ratio was picked; instead the media column uses `min-height: 480px` + `background-size: cover`, which handles the four projects' genuinely different source image shapes without forcing a crop decision per project. One per-project override exists (`hero_position`, a raw CSS `background-position` value) for cases where a plain center-crop cuts off the subject — WDYWK's hero needed this.
2. "What I Did" — H2, body paragraphs, may include a bulleted list of what the project entailed
3. "Success Stats" — **confirmed H3** (demoted from H2 during build, nested under "What I Did" rather than a peer section)
4. "Expertise" — **confirmed H3**, same demotion, same reasoning
5. "Concept → Launch" — H2, one or more supporting artifacts, each note paired with a small arrow accent (`--olive`, not `--teal` as originally specced — corrected this session; there's no border on the H2 itself, the accent is a per-note arrow shape). **These artifacts are frequently static images `[STATIC IMAGE]`** — screenshots of flowcharts, spreadsheets, sticky-note photos, comparison matrices. Do not attempt to rebuild these as live components (e.g., the See Lexus comparison table with the black header row is a flat image of a table, not a table element to restyle — see the explicit callout below). Size and place as content images with appropriate alt text per v4 §6.5's existing alt-text philosophy (name what the image communicates, not just what it depicts).
6. Optional: video link (WDYWK, KidHQ both link to a Vimeo URL as plain text/link, not an embedded player — confirm this stays a link rather than becoming an embed, since embeds bring their own a11y/perf considerations not scoped here)
7. Optional: "Press" — H3, bulleted list of external links
8. Case-study testimonial band (§3.4), closing every case-study page

**Explicit callout, since this was flagged as a point of possible confusion:** any table-like, chart-like, or diagram-like visual inside a case study's "Concept → Launch" section that appears in the mockup as a flat screenshot (the See Lexus content-audit spreadsheet, the See Lexus black-header comparison matrix, the KidHQ system-flow diagram, the WDYWK sticky-note photo and entry-flow diagram) is a **static image**, full stop. None of these need a data-table component, a chart component, or a diagram-building tool in the new system. If Claude Code is ever unsure whether something in a case-study mockup is a static image or a component to build, **ask — don't guess.**

## 3.6 Etc. page — two-column category list `[NEW, extensible]`

Confirmed: **Awards only, for now.** Structure, real shipped values: a section label ("Awards") as a small eyebrow — `1rem`/weight 600, `--coral` — not a heavy H2 as first assumed mid-build, corrected after comparing directly against the mockup. Two-column grid on the right (`repeat(2, 1fr)`), each entry: bold title, meta line — issuer · year — in `--olive-text`, body paragraph. Built as a generic repeatable pattern (not hardcoded to "Awards"), so future categories (press, speaking, publications — confirmed as "more to come," not yet named or scoped) can be added as additional labeled sections without a template rebuild.

## 3.7 About page — annotated-edit block `[NEW]`

A real, reusable text-treatment component, confirmed by Sarah — not one-off throwaway copy.

**Visual treatment, confirmed shipped values:**
- Strikethrough text: `color-mix(in srgb, var(--ink) 65%, white)` — a computed muted gray, not `--olive-text`. Bumped from an original 45% mix after a real AA failure (~2.9:1 at 45%; 65% clears 4.5:1 with margin), so struck content still reads "quietly retired" without being an accessibility fail.
- Inserted/edited text: `--red`, as originally specced.
- Quoted block left border: **`--yellow`, 8px** — not `--teal`/`1px` as this doc originally specified. Confirmed against the actual mockup directly; the teal assumption was wrong.
- Intro line above each quoted block stays plain body text, as specced.

`[OPEN]` **Refresh cadence confirmed as open** — build the visual component now regardless (it doesn't need to know its own update frequency to render correctly), but note in content ownership that whether this gets periodically re-run/re-edited by Sarah or eventually replaced with static final copy is undecided. Doesn't block the build.

---

# PART 4 — STILL OPEN (Sarah's decisions, not Claude Code's)

**Resolved since v1, shipped, no longer open (2026-08-20 pass):** homepage intro band ground color (§1.4), Choose an Adventure badge colors (§1.4 — turned out to be flat fills, no hidden variant), nav hover/active treatment (§1.8), H1 size/weight (§1.5), Work index rule color (§2.1), Work detail banner aspect ratio (§3.5 — resolved as flexible min-height+cover rather than one fixed ratio), Work index desktop column count (§3.3 — resolved as a fluid auto-fit grid, sidestepping the fixed-count question entirely), tablet/mobile breakpoint values (§1.2 — Sarah checked every page live and confirmed the shipped 899/680-and-friends tier is correct as-is).

**Still genuinely open:**
1. **About annotated-edit block refresh cadence** `[OPEN]` — doesn't block anything, see §3.7.
2. **Etc. future category set (press, speaking, etc.)** `[OPEN]` — confirmed "more to come," not yet scoped.

---

# PART 5 — ASSET MANIFEST

**All delivered and shipped as of 2026-08-20** — this section is now a record of what exists, not a needs-list:
- Logo: `SD-Logo-Black.png` / `SD-Logo-White.png` (renamed from the original `SD-Secondary-Logo-*` filenames partway through build — every reference site-wide points to the current names)
- Pattern assets: `images/sophisticated patterns/Pattern-sophisticated-{olive,salmon,red,darkteal,yellow}.png`, real 3334×1875px files. A separate, smaller 900×506px "trimmed" copy briefly lived at `images/patterns/` and caused a real desktop blur bug (background-size:cover stretching a too-small source) — fixed by repointing to the real files above; the trimmed copies are now dead/unused.
- Case-study hero banners/photography: real assets in place for all four projects (`images/case-studies/{kidhq,see-lexus,wdywk}/` plus one top-level file for Travis County). **Travis County is the exception** — still running on one placeholder JPG, no real hero/content photography or "Concept → Launch" section delivered yet. This is the one open asset gap, hers to close.
- Homepage portrait: `images/sarah-portrait-2.jpg` (a second variant, `sarah-portrait-1.jpg`, exists but is unused)
- Static content images for each case study's "Concept → Launch" section: delivered and wired for KidHQ, See Lexus, WDYWK.

---

*End of v1. This document should be updated the same way v4 was — flagged deviations with reasoning, not silent edits — once Claude Code builds against it and real screen output surfaces problems the flat mockups couldn't show.*

*Reconciled against the live, shipped site on 2026-08-20 — the doc had drifted meaningfully from reality across six weeks of build (three verified factual errors in earlier prose, a wrong H2 treatment, a wrong border color, several `[OPEN]` items long since resolved by actual decisions that never made it back here). Every value changed above was checked against the real CSS/HTML, not re-asserted from memory. The two items still marked `[OPEN]` are genuinely unresolved — everything else in Part 4's original list is now closed.*
