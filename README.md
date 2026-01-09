# Indian School Website

An elegant, premium website for an Indian cultural and dance school, featuring smooth scroll-driven animations inspired by Patreon's hero experience.

## Tech Stack

- **Framework**: Astro (static site, performance-focused)
- **Styling**: Tailwind CSS
- **Animations**: GSAP with ScrollTrigger
- **Fonts**: Playfair Display (headings), Inter (body text)

## Project Setup

### Install Dependencies

```bash
npm install
```

### Development

```bash
npm run dev
```

The site will be available at `http://localhost:4321`

### Build

```bash
npm run build
```

This generates a static site in the `dist/` folder, ready for deployment to Netlify or Vercel.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
  ├── components/
  │   ├── Header.astro      # Header with logo placeholder
  │   └── Hero.astro         # Hero section with scroll animations
  ├── layouts/
  │   └── Layout.astro       # Base layout component
  ├── pages/
  │   └── index.astro        # Home page
  ├── scripts/
  │   └── hero-animations.js # GSAP ScrollTrigger animations
  └── styles/
      └── global.css         # Global styles and fonts
```

## Design Philosophy

- **Elegant**: Clean, refined aesthetic
- **Minimal**: No unnecessary elements
- **Cultural**: Respectful representation of Indian arts
- **Premium**: High-quality, polished experience
- **Modern**: Contemporary while timeless
- **Calm**: Peaceful, not flashy

## Animation Approach

The hero section features:

- **Pin on scroll**: Hero section stays fixed during initial scroll
- **Independent visual animation**: Images animate separately from text
- **Cross-fade**: Smooth transitions between multiple hero images
- **Subtle motion**: Slow, intentional movements like dance
- **No harsh parallax**: Gentle, premium transitions

## Placeholder Assets

The following placeholders are marked for replacement:

1. **Logo**: Header component has a placeholder div - replace with `/images/iis-logo-new.png`
2. **Hero Images**: Three placeholder SVG backgrounds in Hero.astro - replace with actual images
   - Recommended size: 1200x1600px (portrait orientation)
   - High-quality images of Indian dance, music, or cultural scenes

## Deployment

This project is configured for static deployment on:

- **Netlify**: Connect your repository and deploy
- **Vercel**: Connect your repository and deploy

No build configuration needed - Astro outputs static files ready for hosting.

## Browser Support

Modern browsers with support for:
- CSS Grid and Flexbox
- ES6+ JavaScript
- CSS Custom Properties

## Notes

- Animations are disabled on mobile/tablet for performance
- Hero visuals are hidden below 1024px viewport width
- All animations use `will-change` for optimal performance
- GSAP ScrollTrigger handles scroll-based animations efficiently

