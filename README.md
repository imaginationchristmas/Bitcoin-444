# Bitcoin 444 Beginners Guide

A mobile-first, single-page Bitcoin beginner's guide website.

## Stack

- Vanilla HTML5 / CSS3 / JavaScript (no frameworks, no build tools)
- Deployed on [Vercel](https://vercel.com) via GitHub

## Project Structure

```
Bitcoin 444/
├── index.html              # Main page
├── css/
│   ├── variables.css       # Design tokens / CSS custom properties
│   ├── base.css            # Reset, typography, body
│   ├── layout.css          # Container, grid, section spacing
│   ├── nav.css             # Navigation + section tab bar
│   ├── hero.css            # Hero section
│   ├── cards.css           # Glass cards, fact cards, exchange cards
│   ├── sections.css        # Section-specific grid layouts
│   ├── components.css      # Buttons, tabs, accordions, callouts
│   ├── footer.css          # Footer
│   ├── animations.css      # Keyframes + scroll-triggered reveals
│   └── responsive.css      # Mobile-first media queries
├── js/
│   └── main.js             # All interactivity
├── assets/
│   └── images/             # Drop photos here when ready
├── docs/
│   └── bitcoin444.html     # Original draft (reference only)
├── plans/
│   └── bitcoin444-website-plan.md
├── bitcoin 444.md          # Source content
├── .gitignore
├── vercel.json
└── README.md
```

## Development

Open `index.html` directly in a browser — no build step needed.

For live reload during development, use VS Code's Live Server extension or:

```bash
npx serve .
```

## Deployment

Push to `main` branch on GitHub. Vercel auto-deploys on every push.

Repository: https://github.com/imaginationchristmas/Bitcoin-444

## Affiliate Links

All referral links are documented in `plans/bitcoin444-website-plan.md`.

---

*Not financial advice. DYOR. Tick Tock Next Block ₿*
