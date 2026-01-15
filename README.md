# StackSage Website

Production-ready marketing site built with Next.js App Router, TypeScript, Tailwind, and Framer Motion.

## Tech
- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion
- Vercel Analytics

## Run locally
```bash
npm install
npm run dev
```
Open http://localhost:3000

## Build
```bash
npm run build
npm run start
```

## Env vars
- `NEXT_PUBLIC_TYPEFORM_ID`: Typeform form ID for the demo embed (optional). If missing, a native form is shown.
- `NEXT_PUBLIC_SITE_URL`: The canonical site URL (e.g., `https://stacksageai.com`). Used for sitemap/robots and metadata.
- `NEXT_PUBLIC_ANALYTICS_ID`: Optional additional analytics ID if you add a provider.

## Deployment (Vercel recommended)
1. Push the repo to GitHub.
2. Import the project in Vercel.
3. Set env vars in the Vercel project settings.
4. Add your domain and deploy.

## QA checklist
- Navigation anchors scroll correctly and account for sticky nav.
- CTAs have visible focus rings and hover states.
- Dark mode: verify contrast (WCAG AA) in both themes.
- Mobile menu: opens/closes and is keyboard navigable.
- Typeform embed displays; native form works without ID.
- Lighthouse targets: Performance 90+, Accessibility 95+, Best Practices 95+, SEO 95+.

## Notes
- Most images are SVG or CSS; use `next/image` when adding raster images.
- The site follows system dark mode by default. A manual toggle can be added.
