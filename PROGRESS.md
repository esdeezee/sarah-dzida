# Progress — sarah-dzida site build

Last updated: 2026-08-15

## 2026-08-15 session

Sarah renamed several image files for clarity that morning (`SD-Secondary-Logo-{Black,White}.png` → `SD-Logo-{Black,White}.png`, `Deco Ring` assets) before the session started. The logo rename broke every page's favicon + header mark (8 pages all still pointed at the old filenames) — caught it before she asked, fixed by re-pointing all references to the new names. `Deco Ring` isn't wired into the site yet, so that rename didn't break anything.

Then a full page-by-page QA pass — she batched tickets across every page, then worked through review rounds against the rendered result. Two structural mistakes are worth banking as lessons since they cost several correction rounds each:

**Lesson: unreset browser-default margins on semantic elements (`blockquote`, `figure`).** Spent 3–4 rounds chasing a "testimonial cards aren't left-aligned" bug by patching the *parent* containers (`display: contents` removal, explicit widths, flex properties) — the real cause was that `.testimonial` is applied to a `<blockquote>`, and blockquotes get a browser-default `margin: 1em 40px` that was never reset. Same bug, same fix, hit again immediately after on `.case-figure` (a `<figure>`, same default-margin behavior) when she said the images weren't spanning full width. Fixed both at the root — added `blockquote, figure { margin: 0; }` to the shared reset — instead of patching each component individually. Takeaway for next time: when a layout bug survives multiple "should be right" CSS reads, check the *element's own tag defaults* before re-auditing ancestors again.

**Lesson: don't build wrapper-avoidant structure when the mockup's rhythm depends on grouping.** Repeatedly guessed at case-study "Concept → Launch" spacing (24/48px, then 32/64px) by putting flat margin values on sibling `<p class="case-note">` + `<figure>` elements, reasoning no wrapper was needed. Wrong four times running — she'd asked from round one whether it should be "its own container" and the answer was yes. Rebuilt as `.case-pair` — one wrapper div per note+figure(or video/dark-quotes), one spacing rule on the wrapper — and the "terrible spacing" complaint stopped. The generalizable mistake: when the same numeric tweak gets corrected twice, the fix usually isn't a better number, it's a missing structural container.

Also mis-scoped a "fix" for Awards/case-study "muted" text: swapped `--color-muted` (a gray `color-mix`) for `--olive-text` everywhere it was used, as a broad recommendation she approved — but it turned out wrong in 3 of 4 spots once she saw it rendered (`.work-tile__hook`, `.case-note`, `.award__meta` all needed to go back to ink; only the case-study quote-band citation was actually supposed to stay olive). Went back to the actual Etc. mockup PNG and rebuilt the Awards section to match it exactly (small coral eyebrow-style label, not a heavy H2; muted olive meta line restored; converted from two independent stacked columns to a real CSS grid so rows visually match height, reordering the 5 awards to match the mockup's row-pairing) rather than continuing to guess component-by-component.

Sitewide heading audit (asked for and shown before executing, per her instruction): H1 weight was inconsistent (Home hero was 600, everywhere else 700 — unified to 700); page-title H1s (`.page-head__label`) used a fixed `2rem` while Home/case-study H1s used fluid `clamp()` — unified to fluid; base H2 had no font-size at all in the shared rule, so `.awards__label` was silently falling back to raw browser defaults — added an explicit base size and removed the four separate per-component H2 overrides that were causing the visible size drift (adventure labels, work tiles, case-study sections).

Other build items, in the order she worked through pages:
- HP: five bold phrases in the intro paragraph converted to real `.inline-link`s pointing at Work index, Etc., and three case studies (splitting one compound phrase into two links); hero portrait now stretches to match the intro-text column's height until the mobile breakpoint (`align-items: stretch` + `object-fit: cover`); testimonial cards fixed-size (220×190) with a real gutter between them (bumped 8px → 24px on request).
- Footer (all 8 pages): border-top removed; Mila Thomsen credit linked to `https://strangerka.com/`; email + credit links now underline at rest (previously hover-only or missing entirely) with a bold-on-hover treatment; LinkedIn icon fill goes teal → yellow on hover (flagged, not blocking: yellow-on-white is ~1.9:1, under the 3:1 non-text-contrast minimum, but it's decorative and hover-only, and she asked for yellow specifically); switched from Raleway to Open Sans at `0.875rem` to match sarahstrategic.com's actual shipped footer CSS.
- Global nav: `position: sticky`.
- Work index: added a quote-band section (obviously-placeholder quote/name so it can't ship by accident); See Lexus tile is now the same looping video as its case-study hero (previously a static image); tile background tint switched from a teal wash to an olive one (matches Work's assigned badge color; text stays ink).
- KidHQ: real WSJ/Forbes/Buzzfeed press links added, Extreme Reach reference removed (wasn't in the mockup).
- See Lexus: hero swapped from a static image to a real autoplaying `<video>` (poster = the old static image, for graceful load); a second video asset (badly-named `Lexus_see_01 (1)-1753380414606.mp4`, renamed to `seelexus-sitewalkthrough.mp4`) now plays as the last Concept→Launch item, also autoplaying; "Five & Done" success-stat mention is now a real inline link.
- WDYWK: "KidHQ"/"DumDum" success-stat mentions are now real links; CommArts press link downgraded from `.text-link` (bold) to `.inline-link` (regular weight) to match the site's established prose-link convention; the "dark quotes" interview block was rebuilt twice — first as three individually-cropped images (was one flat 2092×552 PNG, split via a Python/PIL crop with full quote+attribution preserved as alt text), then converted again into a real carousel reusing the *exact* homepage testimonial-carousel component (same CSS classes, same `js/carousel.js`, now loaded on this page too) once she asked for "1×3 or carousel, nothing in between" — desktop shows all three shrinking together (via explicit per-image `aspect-ratio`) to always fit one row, mobile is a real one-at-a-time carousel with the same prev/next arrows.
- Case-study template (shared across KidHQ/See Lexus/WDYWK/Travis County): "Success Stats" and "Expertise" demoted from H2 to H3 (nested under "What I Did"); "Press" pulled out into its own section (was tacked onto the end of Concept→Launch); images now genuinely bleed full-width in their `.case-pair` (dropped a padding/border frame that was never asked for); three specific white-background diagram images (KidHQ flow, WDYWK entry-flow, See Lexus pitchdeck) got a `0.5px` ink border + white padding since they were blending into the page background; Concept→Launch note arrows recolored teal → olive; breadcrumb ("Work >") is now a real styled link — teal/semibold with a thin underline at rest, bold + yellow underline (2px, matching nav's hover weight) on hover, scoped so the underline sits under "Work" only, not the ">" (this one took five rounds — the actual bug on the last miss was that a CSS rule got updated to target a new `.breadcrumb__word` span that the HTML hadn't been given yet).
- Etc.: Awards rebuilt per the mockup-audit above.
- About: `.about-quote` border coral → yellow, thicker (4px→8px) with more left padding (22px→32px); footer/inline email unified to `sarah@sarahdzida.com` everywhere (resolves the old backlog inconsistency); `.text-link` (shared by the About email and Home's "Hey Virgil" link) now gets a yellow-underline hover state.

Site has zero horizontal-scroll/overflow CSS added this session; all fixed-size elements (testimonial cards, dark-quote images) have explicit mobile overrides.

Next up per Sarah: breakpoint QA pass (same page-by-page procedure).

## 2026-08-14 session

`reference/design-system-personal-v1.md` landed — now the authoritative build reference, superseding ad-hoc mockup-reading. Important finding: **this doc has verified factual errors where its prose contradicts the actual mockup PNGs it claims to be derived from.** Caught by cross-checking directly, not by trusting the text:
- Hey Virgil adventure panel: doc says solid teal ground w/ teal-on-teal badge; mockup shows white ground with a teal *frame* border (same pattern as the other two panels).
- Writer & Artist panel: doc says coral ground/white badge; mockup shows white ground/coral frame/coral badge — which is what the code already had. Almost "fixed" this toward the doc and would have broken something correct.
- About page quote-block border: doc says teal; mockup shows red/coral. Code was already right.
- Quote-band attribution color: shipped code used teal; confirmed via KidHQ + Lexus mockups it should be ink.

Lesson banked: don't trust this doc's color/layout prose without a mockup cross-check when the stakes are a code change.

Real case-study photography landed in `images/case-studies/{kidhq,see-lexus,wdywk}/` — mapped each real file to its slot by actually opening the images and matching content to the page's existing alt text, not by filename guessing. Rewired all three case-study pages + Work index thumbnails. `wdywk-flow.pdf` (single page) converted to `entry-flow.png` via `sips` (no other image tooling installed here). **Travis County still has no case-study asset folder** — untouched, waiting on her.

Sarah then did a page-by-page manual review and gave a large batch of concrete fixes, applied this session:
- HP: adventure panels rebuilt as true full-bleed framed sections (24px/16px/12px responsive border directly on the section, matching her reference `.framed` component from another project) instead of a section-with-nested-card. This is what surfaced/resolved the Hey Virgil contrast issue above.
- HP: CTA arrows to teal; testimonials left-aligned, tighter gap, wider fixed-ish cards, cite pinned to bottom, all text white (she confirmed this even for the yellow card despite the contrast drop).
- Footer: closed gap after last section; LinkedIn icon fixed (recolored the SVG fill directly instead of wrapping an already-self-contained badge icon in a second background square — that double-wrapping was the "weird border" she noticed).
- Global: case-study figure images now scale to fit their container (`max-width:100%`) instead of rendering at native size with horizontal scroll — one CSS rule, fixed the "images cut off" complaint across KidHQ/Lexus/WDYWK at once.
- WDYWK: hero/thumbnail crop repositioned toward the top so it doesn't crop to dead-center of a very tall image.
- KidHQ: hero swapped to the real `enter-kid-hq.gif`; video embed replaced with a plain text link (matches how the actual KidHQ mockup shows it — a raw URL, not an embedded player), pointed at her new Vimeo URL.

**Round 2 — all applied:**
- `.hero__cta` now sits flush against the top of the adventure--strategic section (zeroed hero's bottom padding + the cta's own margin, which was inheriting the global `p` bottom-margin).
- `.adventure__link` gets a yellow underline on hover, matching nav.
- Testimonial carousel (fixed-size cards, real carousel + arrows below a breakpoint) — **confirmed deferred to a future session**, zero JS on the site currently so this is a real build.
- Footer: resized to 0.8rem uniformly (contact info had been inheriting full 17px body size), all text now teal, hover state applied — used **red**, not yellow, because yellow underline on the footer's white ground measures ~1.4:1 contrast (nav gets away with yellow only because its ground is teal). LinkedIn icon is now inlined SVG (was an `<img>`) specifically so its fill can be CSS-driven to match the text hover.
- Work index: KidHQ tile now uses `enter-kid-hq.gif` (matches its case-study hero); WDYWK thumbnail crop tuned from a literal top-crop to `center 22%` — less severe, keeps her head in frame better.
- Travis County: left alone, confirmed fine.

**Round 3 — all applied:**
- Design-system doc's quote-band spec was also wrong (or under-specified) — pulled sarahstrategic.com's real, live CSS (`css/style.css` on that domain) and matched it exactly: `background-size:cover` (a stretched/zoomed single image, not a small repeating tile), a white card with `border-radius:16px` and percentage-based max-width that steps down at 1199/899/599px, and a cite line that splits into a bold ink name + a regular-weight, `--olive-text`-colored role/company (new token added, taken from the design doc's own already-specified text-safe olive value). Applied across all 4 case-study pages.
- KidHQ: video reverted back to an embedded iframe (her Round 2 instruction to make it a plain link got overridden — she wants it embedded after all), pointed at the new Vimeo ID (920794739).
- KidHQ: "previous partnership" is now a real inline link to the WDYWK case study, new `.inline-link` style (regular weight + underline, bold on hover — distinct from `.text-link`'s always-bold treatment).
- WDYWK: hero image was cropping to a useless sliver on mobile — root cause is a very tall/narrow portrait image forced into a wide-short 220px box; `background-size:cover` has to scale to the box's width, which crushes almost all of a portrait image into a tiny visible strip. Gave WDYWK's hero specifically a taller mobile min-height (380px vs. the shared 220px) rather than changing the shared rule and risking the other three (landscape) hero images. **She flagged this one to verify herself next session rather than trust it — put it back on the open list.**

## Round 4 (close of 2026-08-14 session)

- Bottom-stroke weight on every page-head/case-hero unified to 2px (she picked Work's weight as the standard — About was 6px, Etc./case studies were 4px).
- Added top padding under every section that follows a hero/page-head (About, Work index, Etc.'s Awards section, case-study body) — several were using thin off-scale values (8px, 16px, 24px, 56px); standardized to 48px, which is both on the design system's own spacing scale and matches what page-head already uses.
- Hero tablet layout: between 681–860px, portrait stays left / text stays right (matching desktop, just a narrower portrait column) instead of collapsing to a full single-column stack early — true mobile (≤680px) still stacks normally. (First pass had this backwards — swapped the column order instead of just delaying the stack breakpoint; corrected same session.)
- **Testimonial carousel — built**, not just referenced. Real per-panel carousels (3 independent instances on the homepage), desktop unchanged (all cards visible), ≤680px pages one card at a time via real `<button>` arrows, `aria-live="polite"`, fade animation respecting `prefers-reduced-motion`. Directly adapted from sarahstrategic.com's actual shipped carousel — fetched their real `js/carousel.js` and CSS rather than guessing at the pattern. This is the first JS file on the site (`js/carousel.js`). Simplified their "group of 4, paged 2-at-a-time on mobile" logic down to "one card, one slide" since our testimonial counts per panel are small (2–3), not logo-grid sized — and simplified the design doc's "3→2→1 visible" spec to "all visible → 1 at a time," flagged as a knowing simplification in `BACKLOG.md`.

Session closed here — continuing tomorrow.

## Where things stood as of 2026-08-12

First full build of the site is done: 8 static HTML pages (Home, About, Work index, Etc., and 4 case studies — KidHQ, See Lexus, Travis County, Whaddyawannaknow), one shared `css/style.css`, no build tooling (plain HTML/CSS/JS — see CLAUDE.md-adjacent decision below). Built from the mockups in `reference/mockups-20260812/` and the brand guide PDF.

Locked decisions:
- Palette: "Sophisticated" from the brand guide (coral/red/yellow/olive/teal).
- Type: Raleway (display) + Open Sans (body), self-hosted from `Fonts/`.
- No npm/node/static-site-generator — plain hand-authored files only. Sarah stopped me the first time I reached for `node`/11ty and said so explicitly.
- Work index tiles: no tag/filter UI (she called that idea bad — "a robot would say that"). Just thumbnail + title + one-line hook.

## What's been QA'd this session

Did a 5-hat self-review (UI/brand/dev/UX/writer) after she pushed back that the build needed real QA, not just "looks done":
- Fixed missing/skipped heading levels across all pages (About/Etc/Work-index had no `<h1>`; Home and Work index skipped straight to h3).
- Fixed a real fidelity bug: Work/About page-head labels use dark text on olive/coral in her actual mockup, not white like I'd first built (verified by pixel-cropping the mockup directly).
- Added Open Graph/Twitter meta tags and light/dark favicon variants (were missing).
- Ran actual WCAG contrast math on every text/background pairing; fixed one real bug that was my own construction (hero label contrast); left mockup-native contrast issues (white text on coral/olive testimonial cards, ~3.0–3.5:1, fails AA) in `BACKLOG.md` rather than silently changing her colors.
- Then she sent an actual browser screenshot and I compared it pixel-by-pixel against the mockup, which caught three more real layout bugs, now fixed:
  - Testimonial cards were sized/gapped too large and wrapped to 2+1 instead of 3-in-a-row like the mockup — shrunk card size and gap.
  - The "Hey Virgil" white inset card was capped at 880px inside a wider container, leaving a big empty teal strip on the right that isn't in the mockup — removed the cap.
  - Body paragraph text in the three Home adventure sections was also artificially capped at 880px; measured the mockup at ~1170px before wrapping, so removed the cap site-wide on `.adventure__inner`.
  - Portrait image was being forced into a 4:5 crop via `object-fit:cover`; the actual photo file is natively ~0.69 ratio, almost exactly the mockup's own proportions — removed the forced crop so it renders full-frame.

## Open/unresolved — pick this up first next session

**The LinkedIn icon mystery.** She sent a screenshot showing what looks like the LinkedIn icon rendering at the top-right of the Home hero section, when it should only exist once, in the footer. I checked the actual file (`grep` confirms only one instance of the LinkedIn markup in `index.html`, in the footer) and there's no `position: fixed`/`sticky`/`absolute` anywhere in the CSS that could displace it. I could not explain this from the code alone. I was about to ask her two diagnostic questions (does the icon do anything when clicked; how is she viewing the page — double-clicked file vs. local server) when she had to close the session. **Ask those two questions first thing next time.** My leading theory is a browser-side artifact (cache showing a stale render, a browser extension, or something about how the file is being opened) rather than an actual bug in the shipped code — but that's unconfirmed.

## Full backlog

Everything else needing her judgment (not blocking, not silently fixed) is tracked in `BACKLOG.md` at the repo root: mockup-native contrast issues, typos preserved verbatim from her copy, missing real URLs (LinkedIn profile, Mila Thomsen credit, some press links), the `sarah@` vs `hello@sarahdzida.com` email inconsistency, and domain-dependent SEO items (canonical URL, sitemap, og:image) that need a real deploy domain before they can be filled in.

## Known limitation this whole session

No browser/display access in this environment — `screencapture` fails outright, so nothing about actual rendering has been verified by me directly except by reading code and, once, from her own screenshot. Treat anything about actual visual appearance as unverified until she confirms it in a real browser.
