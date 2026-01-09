/**
 * Hero Section Scroll Animations
 * Inspired by Patreon's smooth, premium scroll experience
 * 
 * Features:
 * - Hero section pins during initial scroll
 * - Visuals animate independently with subtle slide and scale
 * - Cross-fade between multiple hero images
 * - Smooth easing, no harsh parallax
 */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Color constants for GSAP animations
const GOLD_GLOW = "rgba(200, 155, 60, 0.15)";
const DARK_OVERLAY = "rgba(28, 28, 28, 0.45)";

/**
 * Initialize hero animations
 * Called after DOM is ready
 */
export function initHeroAnimations() {
  const heroSection = document.querySelector('.hero-section');
  const heroVisuals = document.querySelector('.hero-visuals');
  const heroImages = document.querySelectorAll('.hero-image');
  const heroText = document.querySelector('.hero-text');
  
  if (!heroSection || !heroVisuals || !heroText) {
    console.warn('Hero elements not found');
    return;
  }

  // Set initial states for images (if multiple images exist)
  if (heroImages.length > 0) {
    gsap.set(heroImages, {
      opacity: 0,
      scale: 1.1,
      x: 20
    });

    // Show first image
    if (heroImages[0]) {
      gsap.set(heroImages[0], { opacity: 1, scale: 1, x: 0 });
    }
  }

  // Create scroll-triggered pin and animations
  const pinScrollTrigger = ScrollTrigger.create({
    trigger: heroSection,
    start: 'top top',
    end: '+=100vh', // Pin for one viewport height
    pin: true,
    pinSpacing: true,
    anticipatePin: 1,
    onUpdate: (self) => {
      const progress = self.progress;
      
      // Animate visuals container - subtle scale and movement
      gsap.to(heroVisuals, {
        scale: 1 - progress * 0.05, // Subtle scale down
        y: progress * 30, // Gentle downward movement
        duration: 0.3,
        ease: 'power2.out'
      });

      // Cross-fade between images based on scroll progress
      if (heroImages.length > 1) {
        heroImages.forEach((img, index) => {
          const imageProgress = (progress - index * 0.3) * 2;
          const opacity = Math.max(0, Math.min(1, 1 - Math.abs(imageProgress)));
          
          gsap.to(img, {
            opacity: opacity,
            scale: 1 + (1 - opacity) * 0.1,
            x: (1 - opacity) * 20,
            duration: 0.3,
            ease: 'power2.out'
          });
        });
      }

      // Subtle text fade as we exit hero
      if (progress > 0.7) {
        const textFade = (progress - 0.7) / 0.3;
        gsap.to(heroText, {
          opacity: 1 - textFade * 0.3,
          y: textFade * 20,
          duration: 0.3,
          ease: 'power2.out'
        });
      } else {
        gsap.to(heroText, {
          opacity: 1,
          y: 0,
          duration: 0.3,
          ease: 'power2.out'
        });
      }
    }
  });

  // Clean up on page unload
  return () => {
    pinScrollTrigger.kill();
  };
}

