# Backlog

Open items that need your judgment, not mine. Bugs I could just fix are already fixed and aren't listed here — this is only the stuff that's your call. Updated 2026-08-16.

## 2026-08-15 — resolved this session

Footer LinkedIn icon hover, Mila Thomsen credit link, KidHQ press links (real URLs, Extreme Reach removed), footer email inconsistency (unified to `sarah@sarahdzida.com`), See Lexus hero video vs. static (went with video). Full detail in `PROGRESS.md`.

## 2026-08-16 — RESOLVED: the 2026-08-15 "Jekyll didn't work" blocker was a preview-tool mismatch, not a build defect

Previously flagged here as blocking, read-first, do-not-trust. That was wrong to leave unresolved this long — full account in `PROGRESS.md` under "2026-08-16 session — Jekyll build independently verified working." Short version: a separate Claude Code session, working from Sarah directly (not from this session's own account of itself), ran `bundle exec jekyll build` against the exact uncommitted Jekyll restructuring from 2026-08-15 and confirmed it compiles cleanly — all 8 pages generated, all 4 case studies at their correct existing URLs, zero unrendered Liquid/front-matter leakage anywhere in the output.

What actually happened on 2026-08-15: Sarah was viewing the raw, uncompiled source files (the ones still containing `--- front matter ---` and `{% liquid tags %}`) through VSCode's Live Preview extension on `127.0.0.1:3000` — a plain static file server with no knowledge of Jekyll or Liquid. It rendered the literal template source as visible page text, which is expected behavior for that tool pointed at that kind of file, not a sign the Jekyll conversion failed. The session's own answer at the time — "that's just what happens with Jekyll" — was accurate but incomplete: it didn't identify the wrong-server cause or hand her a fix, which is why the session ended without a path forward.

**Do not re-litigate this.** The Jekyll restructuring is sound. Going forward, preview this site locally with `bundle exec jekyll serve --livereload` (compiled output, auto-refreshing) — never by pointing a static file server at the raw `_layouts`/`_includes`/`_case_studies` source.

## 2026-08-15 — still open

- **Sitewide grid/breakpoint/spacing foundation** — flagged last session as untouched (design-system doc specifies `1280px`/`80·48·24px` gutters/`600·900·1200` breakpoints; shipped CSS uses `1160px`/fluid clamp gutter/`680·860` breakpoints) and still true going into today's breakpoint QA pass. Worth keeping in mind while you QA — if a breakpoint looks wrong, this foundational mismatch may be why.
- **WDYWK mobile hero crop** — still marked "attempted, not confirmed working" from two sessions ago. Should get real signal once breakpoint QA reaches it.
- **Footer LinkedIn icon still links to `#`** — hover color is fixed (teal → yellow), but there's still no real profile URL. Also flagging: yellow-on-white for that hover state is ~1.9:1 contrast, under the 3:1 minimum for a UI icon — decorative/hover-only so shipped as asked, but noting in case you want a deeper gold instead.
- **Design-system doc has drifted further from shipped reality** — today's Awards rebuild (small eyebrow-style label, not a heavy H2), the H1/H2 weight unification, and the case-study H3 demotion aren't reflected in `reference/design-system-personal-v1.md`. Same standing issue as before: doc prose vs. actual shipped code are diverging, worth a doc pass if you want it trustworthy as a standalone reference again.
- **Two now-orphaned assets** — `images/case-studies/see-lexus/see-lexus-websitestatic.jpg` (replaced by the autoplay video) and the full `images/case-studies/wdywk/wdywk-interview-quotes.png` (replaced by three individual crops) are unused but still on disk. Not urgent, just noting.
- **Travis County case study** — still has no real hero/content-image assets, still running on one old top-level JPG, no "Concept → Launch" section built. Unchanged since last session — waiting on you to drop the files.
- **See Lexus hero video vs. static** — resolved (see above), noting here only because the old backlog entry framed it as open.

## Accessibility: contrast issues traced to your own color choices

Unchanged from last session — I didn't silently change these, they come from your mockup's color choices, not something I invented. Numbers are WCAG contrast ratios; AA requires 4.5:1 for normal text, 3:1 for large/bold text (~19px+bold or ~24px+).

- **White text on coral (`#EB6D66`)** — 3.04:1. Fails AA at every size, including normal text. Used on the "Andrea L." testimonial card (Home) and the coral testimonial-card color generally.
- **White text on olive (`#858E69`)** — 3.53:1. Fails AA for normal-size text (George Bernard Shaw / "the Artist herself" quotes on Home), passes for large bold text (section label chips).
- **Coral or olive as bold "large text" labels** (adventure section labels, the Awards heading on Etc.) sit at 3.0–3.5:1 — clears the large-text 3:1 minimum today, but barely.
- **About page's struck-through `<del>` text** renders at ~2.9:1 — fails AA outright. Might be intentional (the whole visual metaphor is de-emphasis). Your call.

## Typos preserved verbatim from your mockup copy

Unchanged — still kept exactly as written per your "stick to the mockups" instruction:

- Travis County: "I was responsible for the **follwoing** components"
- KidHQ: "In 2018, THAT **what** Forbes called" (likely missing "was")
- About: "I asked the 🤖 **what is** might say" (likely meant "it")
- WDYWK: "In the process of getting it **launch**, I navigated..." (likely missing "to")
- WDYWK: "THAT **was able pitch** more focus group testing" (likely missing "to")

## SEO items that need a real domain (can't guess a URL)

Unchanged — no canonical `<link>` tags, no `og:image`, no `sitemap.xml` — all need your actual domain once you know where this deploys. `robots.txt` and a branded 404 page are still just suggestions, not built.

## One enhancement I added beyond the mockup

The nav bar shows a yellow underline on whichever page you're currently on. Your mockups don't show an active-state treatment at all — added as a standard usability default. Easy to remove if you don't want it.
