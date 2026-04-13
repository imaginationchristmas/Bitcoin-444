# Bitcoin 444 Website — Build Plan

## Overview

A mobile-first, single-page Bitcoin beginner's guide website with a dark glass-morphism aesthetic, Asana-inspired colored section tabs, and the author's unfiltered personal voice preserved throughout.

**Target audience:** Complete Bitcoin beginners — people who have never bought or used Bitcoin.  
**Primary device:** Mobile (design mobile-first, enhance for desktop).  
**Deployment:** Vercel via GitHub repository [`Bitcoin-444`](https://github.com/imaginationchristmas/Bitcoin-444).
**Tech stack:** Static HTML/CSS/JS with proper file separation. No frameworks, no build tools needed initially.

---

## Design Direction

### What We're Keeping from the Existing Draft

The current [`docs/bitcoin444.html`](../docs/bitcoin444.html) has strong foundations:

- **Dark theme** with `--bg: #0a0a0f` and Bitcoin orange `#F7931A` accent
- **Glass-morphism cards** with `backdrop-filter: blur()` and subtle borders
- **Typography system**: Bebas Neue for headings, DM Sans for body, Space Mono for labels
- **Wallet tabs** — Hot / Cold / Multi-Sig tabbed interface
- **Facts grid** with icon cards
- **Scarcity math** section with large orange numbers
- **Do's / Don'ts** split layout with green/red color coding
- **Pro-tip callout boxes** with orange left border
- **Seed phrase warning** box — prominent and well-designed
- **Hero section** with stats bar and staggered fade-in animations
- **Satoshi Nakamoto quote** block
- **Footer** with tip jar

### What We're Adding / Changing

1. **Asana-inspired colored section tabs** — A sticky horizontal tab bar below the nav that lets users jump between the major sections. Each section gets a distinct color:
   - Step 1: Knowledge — Blue
   - Step 2: Stack Sats — Green  
   - Step 3: Self Custody — Purple
   - Do's and Don'ts — Red/Pink
   - Resources — Orange/Gold

   These tabs will be chevron/parallelogram shaped like the Asana reference, scroll horizontally on mobile, and highlight the active section as the user scrolls.

2. **Accordion/dropdown menus** for dense content — Exchange details, wallet descriptions, and long copy blocks will use expand/collapse to keep the page scannable. The existing `.step-card` accordion CSS exists but is unused; we'll activate and extend it.

3. **Restore the unfiltered voice** — The HTML draft sanitized lines like "go ahead you degenerate" and "I'm just some fucking guy." We'll bring back the raw tone from [`bitcoin 444.md`](../bitcoin%20444.md).

4. **Proper project structure** — Break the monolithic 1520-line HTML file into separate CSS and JS files.

5. **Enhanced mobile experience** — Larger touch targets, better spacing, swipeable tabs, and optimized typography for small screens.

6. **Smart SVG logos/icons** instead of photos — No photos for now. Each section and brand (Swan, River, Strike, Fold, wallet brands, etc.) gets a clean, minimal SVG icon or logo. These should feel designed and intentional — accenting each section without needing photography. We'll use inline SVGs for crisp rendering at any size.

7. **Embedded YouTube videos** — Key videos (God Bless Bitcoin documentary, BTC Sessions tutorials) will be embedded directly in the page using responsive `<iframe>` embeds so users don't need to leave the site. Embeds will use `loading="lazy"` for performance and be wrapped in a 16:9 aspect-ratio container that scales properly on mobile.

### Build Discipline

**Critical rule: Do NOT proceed to the next phase until the current phase is functioning and looking good.** Each phase must be verified as working before moving on. This prevents cascading issues and keeps the build clean. Mobile-first is non-negotiable — every element must be tested at mobile widths first.

6. **Scroll-triggered animations** — Sections fade/slide in as they enter the viewport using Intersection Observer.

7. **Image placeholders** — Ready for photos to be dropped in later.

### Design Tradeoffs

| Decision | Chosen Approach | Why | Alternative Considered |
|----------|----------------|-----|----------------------|
| Tech stack | Vanilla HTML/CSS/JS | Zero build complexity, instant Vercel deploy, easy to edit | React/Next.js — overkill for a single-page guide |
| Section tabs | Sticky below nav, Asana-style | Gives clear navigation for long content, fun visual element | Sidebar nav — doesn't work on mobile |
| Accordions | Native HTML details/summary + JS enhancement | Progressive enhancement, works without JS | Pure JS accordions — breaks without JS |
| Animations | Intersection Observer | Native API, no library needed, performant | GSAP/AOS library — unnecessary dependency |
| CSS approach | Single CSS file with CSS custom properties | Simple, maintainable, no build step | Tailwind — adds build complexity |
| Font loading | Google Fonts with preconnect | Simple, reliable CDN | Self-hosted — better perf but more setup |

---

## Project File Structure

```
Bitcoin 444/
├── index.html                  # Main page
├── css/
│   ├── variables.css           # CSS custom properties and theme
│   ├── base.css                # Reset, typography, body styles
│   ├── layout.css              # Container, grid, section spacing
│   ├── nav.css                 # Navigation + section tabs
│   ├── hero.css                # Hero section
│   ├── cards.css               # Glass cards, fact cards, exchange cards
│   ├── sections.css            # Section-specific styles
│   ├── components.css          # Accordions, tabs, tooltips, buttons
│   ├── footer.css              # Footer
│   ├── animations.css          # Keyframes and scroll-triggered animations
│   └── responsive.css          # Mobile-first media queries
├── js/
│   └── main.js                 # Navigation, accordions, tabs, scroll spy, animations
├── assets/
│   └── images/                 # Placeholder for future photos
├── docs/
│   └── bitcoin444.html         # Original draft - preserved for reference
├── plans/
│   └── bitcoin444-website-plan.md  # This file
├── bitcoin 444.md              # Source content
├── .gitignore
├── README.md
└── vercel.json                 # Vercel deployment config
```

---

## Build Phases

### Phase 1: Project Scaffolding and Foundation

- Create the folder structure above
- Create `index.html` with semantic HTML5 structure and all content sections as empty shells
- Create `css/variables.css` with the full design token system from the existing draft
- Create `css/base.css` with reset, typography, and body background effects
- Create `.gitignore`, `README.md`, and `vercel.json`
- Create `assets/images/` placeholder directory

**Outcome:** A skeleton page that loads with the correct dark theme, fonts, and background.

### Phase 2: Navigation System

- Build the fixed top nav bar — logo, desktop links with dropdowns, hamburger for mobile
- Build the **Asana-inspired section tab bar** — sticky below the nav, colored chevron tabs for each major section
- Implement scroll-spy in JS so the active tab highlights as the user scrolls
- Mobile: tabs scroll horizontally with snap points
- Mobile: hamburger opens full-screen overlay menu with nested details/summary dropdowns

**Outcome:** Full navigation working on both mobile and desktop with section awareness.

### Phase 3: Hero Section

- Port the hero from the existing draft: eyebrow label, large heading, subtitle, CTA buttons, stats bar
- Add scroll indicator animation
- Satoshi Nakamoto quote block below hero
- Ensure hero is full-viewport on mobile with proper spacing

**Outcome:** Impactful landing experience that works on all screen sizes.

### Phase 4: Content Sections

Build each section with all content from the markdown source, preserving the original unfiltered voice:

1. **Knowledge is Power** — Intro text with the "Bitcoin only" warning callout
2. **Why Bitcoin is Different** — Facts grid with 8 icon cards
3. **Scarcity by the Numbers** — 4 large-number cards + explanatory note
4. **Start Stacking Sats** — 4 exchange cards with expand/collapse for detailed info
5. **Take Custody** — Seed phrase warning, security tips grid, pro-tip callout
6. **Choosing Your Wallet** — Tabbed interface for Hot / Cold / Multi-Sig
7. **Do's and Don'ts** — Split green/red layout + 4-Year Rule callout
8. **Resources** — Categorized grid for Books, Documentary, YouTube, Podcasts
9. **Conclusion** — Quote block + CTA
10. **Footer** — Brand info, tip jar, disclaimer

**Outcome:** All content from the markdown is on the page, organized into clean sections.

### Phase 5: Interactive Components

- Wire up accordion expand/collapse on exchange cards and long content blocks
- Wire up wallet type tabs
- Implement smooth scroll for all anchor links
- Add click-outside-to-close for mobile menu and dropdowns

**Outcome:** All interactive elements functional.

### Phase 6: Mobile Optimization

- Audit all touch targets — minimum 44x44px
- Test and fix grid layouts at 320px, 375px, 414px, 768px breakpoints
- Ensure section tabs are swipeable and don't overflow awkwardly
- Optimize font sizes for readability on small screens
- Test hamburger menu UX — smooth open/close, proper z-indexing
- Ensure no horizontal scroll anywhere

**Outcome:** Polished mobile experience that feels native.

### Phase 7: Animations and Polish

- Add Intersection Observer-based fade-up animations for sections
- Subtle hover effects on all interactive elements
- Smooth transitions on accordion open/close
- Loading state for the page — prevent flash of unstyled content
- Active section tab indicator animation
- Grain texture overlay from existing draft

**Outcome:** The site feels alive and premium without being distracting.

### Phase 8: Copy Review

- Go through each section and compare against the original markdown
- Restore unfiltered language: "go ahead you degenerate," "I'm just some fucking guy," "have fun staying poor," etc.
- Light cleanup where grammar is genuinely broken, but preserve the conversational tone
- Ensure all referral links, promo codes, and specific details are accurate
- Verify the "21 Tips to Securing your Bitcoin" link and Stamp Seed promo code are included

**Outcome:** Copy reads like the original author wrote it, not an AI.

### Phase 9: Git and Deployment

- Initialize git repository if not already done
- Link to remote GitHub repository `Bitcoin-444`
- Create proper `.gitignore`
- Push to GitHub
- Configure `vercel.json` for static site deployment
- Deploy to Vercel

**Git setup commands:**
```bash
git init
git remote add origin https://github.com/YOUR_USERNAME/Bitcoin-444.git
git add .
git commit -m "Initial commit: Bitcoin 444 website"
git branch -M main
git push -u origin main
```

**Outcome:** Site is live on Vercel with CI/CD from GitHub.

### Phase 10: Photo Integration

- When photos are provided, add them to `assets/images/`
- Integrate into appropriate sections — hero background, exchange logos, wallet product shots, etc.
- Optimize images for web — proper sizing, lazy loading, WebP format where possible

**Outcome:** Visual richness added to the site.

---

## Section Tab Design — Asana Inspiration

```
┌─────────────────────────────────────────────────────────────────┐
│  ₿444                    [nav links]              [Get Started] │
├─────────────────────────────────────────────────────────────────┤
│  ╱ Knowledge ╲  ╱ Stack Sats ╲  ╱ Custody ╲  ╱ Rules ╲  ╱ Learn ╲  │
│  ╲  BLUE     ╱  ╲  GREEN     ╱  ╲ PURPLE  ╱  ╲ PINK  ╱  ╲ GOLD  ╱  │
└─────────────────────────────────────────────────────────────────┘
```

Each tab is a parallelogram/chevron shape using CSS `clip-path` or `skewX()` transforms. The active tab gets full opacity and a bottom indicator. On mobile, these scroll horizontally with CSS `overflow-x: auto` and `scroll-snap-type`.

**Color mapping — muted/glass approach (NOT bright/colorful):**

The tabs should NOT be vibrant or "colorful." They use the glass aesthetic with very subtle color tinting at ~10-15% opacity, keeping the dark theme dominant. Think frosted glass with a hint of color, not colored buttons.

- Knowledge/Why Bitcoin: `rgba(74, 144, 217, 0.12)` — subtle blue tint on glass
- Stack Sats/Exchanges: `rgba(76, 175, 80, 0.12)` — subtle green tint on glass
- Self Custody/Wallets: `rgba(156, 39, 176, 0.12)` — subtle purple tint on glass
- Do's and Don'ts: `rgba(233, 30, 99, 0.12)` — subtle pink tint on glass
- Resources: `rgba(247, 147, 26, 0.15)` — subtle orange tint on glass (matches brand)

Active state increases to ~25% opacity with a matching colored bottom border. The glass blur (`backdrop-filter: blur()`) and subtle white border remain consistent across all tabs.

---

## Risks and Dependencies

| Risk | Impact | Mitigation |
|------|--------|------------|
| Photos not provided yet | Visual sections will feel sparse | Use CSS background patterns and icon-based design until photos arrive |
| Colored tabs may clash with dark glass theme | Visual inconsistency | Use tabs at 15-20% opacity with glass blur, test extensively |
| Long content on mobile | Users won't scroll through everything | Accordions are critical — collapse by default, let users expand what interests them |
| Referral links may change | Broken links hurt credibility | Document all referral links in one place for easy updates |
| Single HTML page could get long | Performance and maintainability | Keep CSS/JS separate, use lazy loading for below-fold content |
| Git setup — user unfamiliar with git remote linking | Blocker for deployment | Provide exact commands in Phase 9 |

---

## Content Inventory

All content from [`bitcoin 444.md`](../bitcoin%20444.md) mapped to website sections:

| Markdown Section | Website Section | Status in Current Draft |
|-----------------|----------------|----------------------|
| Step 1: Knowledge is Power | Hero + Why Bitcoin + Facts | ✅ Present but sanitized |
| Fun facts about BTC | Facts Grid | ✅ Present |
| Hypothetical Scenario | Scarcity by Numbers | ✅ Present |
| Resources: Books | Resources Grid — Books | ✅ Present |
| Resources: Podcasts/Docs/YouTube | Resources Grid — Media | ✅ Present |
| Step 2: Start Stacking Sats | Exchanges Section | ✅ Present |
| Swan Bitcoin details | Exchange Card | ✅ Present but condensed |
| River details | Exchange Card | ✅ Present but condensed |
| Strike details | Exchange Card | ✅ Present but condensed |
| Fold details | Exchange Card | ✅ Present but condensed |
| Step 3: Take Custody | Self Custody Section | ✅ Present |
| Seed Phrase Knowledge | Seed Phrase Warning | ✅ Present but sanitized |
| Hot Wallet | Wallet Tabs — Hot | ✅ Present |
| Cold Storage Wallets | Wallet Tabs — Cold | ✅ Present |
| Multi Sig Wallets | Wallet Tabs — Multi-Sig | ✅ Present |
| DO's and DON'Ts | Do's and Don'ts Section | ✅ Present but sanitized |
| Conclusion | Conclusion Section | ✅ Present but sanitized |
| Tip jar / Contact | Footer | ✅ Present |
| "Hell I'll even go to you in person" | ❌ Missing — restore in Knowledge section |
| "go ahead you degenerate" | ❌ Missing — restore in altcoin warning |
| "I'm just some fucking guy" | ❌ Missing — restore in disclaimer/footer |
| "Have fun staying poor" | ❌ Missing — restore in conclusion |
| "Don't be a cheapass or dumbass" | ❌ Missing — restore in seed phrase section |
| Canadian truckers reference | ❌ Missing — restore in custody intro |
| 21 Tips to Securing your Bitcoin link | ❌ Missing — add to seed phrase section |
| UTXO management mention | ❌ Missing — add as advanced note |

---

## Affiliate & Referral Links Registry

All affiliate/referral links from the original content. These must be preserved exactly as-is in the website build:

| Platform | Link | Referral Bonus |
|----------|------|---------------|
| Swan Bitcoin | `https://www.swanbitcoin.com/toddbeam` | $10 in BTC on signup |
| River | `https://river.com/signup?r=5A6X6EPURI` | Up to $100 in BTC |
| Strike | `https://invite.strike.me/O3SWAM` | First $500 fee-free |
| Fold | `https://use.foldapp.com/r/9PKFNEJK` | $10 in Sats with first purchase |

**Other important links to preserve:**
| Resource | Link |
|----------|------|
| Everything Divided by 21 Million (book) | `https://www.amazon.com/Bitcoin-Everything-divided-21-million/dp/9916697191` |
| The Bitcoin Standard (book) | `https://www.amazon.com/dp/1119473861/?bestFormat=true&k=the%20bitcoin%20standard&ref_=nb_sb_ss_w_scx-ent-pd-bk-d_de_k0_1_12&crid=3VLFFPSGGZAYI&sprefix=the%20bitcoin%20` |
| Bitcoin Whitepaper | `https://bitcoin.org/bitcoin.pdf` |
| God Bless Bitcoin (documentary) | `https://www.youtube.com/watch?v=oksraL7wN6Q&t=37s` |
| BTC Sessions (YouTube) | `https://www.youtube.com/@BTCSessions` |
| Fountain App | `https://fountain.fm/` |
| Passport by Foundation | `https://foundation.xyz/passport-core/` |
| Bitkey | `https://bitkey.world/` |
| Blockstream Jade Plus | `https://blockstream.com/jade/` |
| Coldcard | `https://coldcard.com/` |
| Casa | `https://casa.io/` |
| Swan Vault | `https://www.swanbitcoin.com/vault/` |
| Unchained | `https://www.unchained.com/` |
| Stamp Seed | `https://www.stampseed.com/` |
| Venmo (tip jar) | `https://venmo.com/u/Todd-Beam` |
| Strike Lightning (tip jar) | `todd444@strike.me` |

⚠️ **Note:** The existing HTML draft changed the God Bless Bitcoin YouTube link to `https://www.youtube.com/watch?v=__mDG7GuvA0` — need to verify which is the correct/current URL. The original markdown has `https://www.youtube.com/watch?v=oksraL7wN6Q&t=37s`.

---

## Git Setup Instructions

Repository: [`https://github.com/imaginationchristmas/Bitcoin-444`](https://github.com/imaginationchristmas/Bitcoin-444)

```bash
# From the project root directory
git init
git remote add origin https://github.com/imaginationchristmas/Bitcoin-444.git
git add .
git commit -m "Initial commit: Bitcoin 444 website"
git branch -M main
git push -u origin main
```

If the repo already has content and you need to force-push:
```bash
git push -u origin main --force
```

---

## Next Steps

1. Review and approve this plan
2. Switch to Code mode to begin Phase 1
3. Set up Git remote for deployment

Ready to proceed when you are.
