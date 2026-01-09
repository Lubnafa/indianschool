# About Section Implementation Guide

## Overview
Premium "About Us" section with center image and clean left/right content blocks, featuring smooth GSAP scroll-triggered animations.

## Files Created

### 1. `src/components/AboutSection.astro`
The main component with:
- 3-column layout (desktop): left text, center image, right text
- Stacked layout (mobile): image first, then text blocks
- Circular center image with decorative accent ring
- Animation-ready class hooks: `.about-left`, `.about-center`, `.about-right`
- Initial states: `opacity-0 translate-y-8` (left/right), `opacity-0 scale-95` (center)

### 2. `src/scripts/aboutAnimations.js`
GSAP animation module with:
- Sequential fade-in animations
- Staggered timing with 0.45s overlap
- Smooth `power2.out` easing
- Reduced motion support
- Export: `initAboutAnimations()`

## Usage in Astro Pages

```astro
---
import Layout from '../layouts/Layout.astro';
import AboutSection from '../components/AboutSection.astro';
---

<Layout>
  <AboutSection />
</Layout>

<script>
  import { initAboutAnimations } from '../scripts/aboutAnimations.js';
  
  // Initialize animations after DOM is ready
  if (import.meta.env.SSR === false) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        setTimeout(initAboutAnimations, 100);
      });
    } else {
      setTimeout(initAboutAnimations, 100);
    }
  }
</script>
```

## Animation Sequence

1. **Left content** (0s): Fades in + slides up from y: 32px
2. **Center image** (0.35s): Fades in + scales from 0.95 to 1.0
3. **Right content** (0.7s): Fades in + slides up from y: 32px

Total duration: ~1.15 seconds with smooth overlap

## Responsive Behavior

- **Desktop (lg+)**: 3 columns, center image 340px
- **Tablet (md)**: 3 columns, center image 320px
- **Mobile**: Stacked, image first (256px), centered

## Accessibility

- ✅ Semantic HTML structure
- ✅ Alt text for images
- ✅ Good color contrast (charcoal on ivory)
- ✅ Respects `prefers-reduced-motion`
- ✅ Works without JavaScript

## Customization

### Change Content
Edit `src/components/AboutSection.astro`:
- Left block: heading and paragraph
- Right block: supporting text
- Center image: replace `/images/nataraj.png`

### Adjust Animation Timing
Edit `src/scripts/aboutAnimations.js`:
- `duration`: Change from 0.8 to desired value
- Overlap: Change `'-=0.45'` to adjust stagger
- Easing: Change `'power2.out'` to other GSAP eases

### Modify Trigger Point
In `aboutAnimations.js`, change:
```js
start: 'top 80%' // Trigger when section is 80% down viewport
```

## Design Tokens Used

- **Background**: `bg-ivory`
- **Text**: `text-charcoal`, `text-ash`
- **Accent**: `text-saffron`, `border-saffron/20`
- **Placeholder**: `bg-stone`
- **Fonts**: Playfair Display (headings), Inter (body)

## Current Implementation

The About section is now live on the homepage at:
- After the Hero section
- Before any future sections
- Animations trigger on scroll at 80% viewport
