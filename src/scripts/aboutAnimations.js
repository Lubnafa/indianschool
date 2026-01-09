/**
 * About Section Scroll Animations
 * Smooth, sequential fade-in with GSAP ScrollTrigger
 * 
 * Features:
 * - Left content: fade + slide up
 * - Center image: fade + scale
 * - Right content: fade + slide up
 * - Staggered timing with overlap
 * - Respects prefers-reduced-motion
 */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

/**
 * Initialize About section animations
 * Safe to call once per page load
 */
export function initAboutAnimations() {
  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  if (prefersReducedMotion) {
    // Skip animations, set final states immediately
    const aboutLeft = document.querySelector('.about-left');
    const aboutCenter = document.querySelector('.about-center');
    const aboutRight = document.querySelector('.about-right');
    
    if (aboutLeft) {
      gsap.set(aboutLeft, { opacity: 1, y: 0 });
    }
    if (aboutCenter) {
      gsap.set(aboutCenter, { opacity: 1, scale: 1 });
    }
    if (aboutRight) {
      gsap.set(aboutRight, { opacity: 1, y: 0 });
    }
    
    return;
  }

  // Get section and elements
  const aboutSection = document.querySelector('.about-section');
  const aboutLeft = document.querySelector('.about-left');
  const aboutCenter = document.querySelector('.about-center');
  const aboutRight = document.querySelector('.about-right');

  if (!aboutSection || !aboutLeft || !aboutCenter || !aboutRight) {
    console.warn('About section elements not found');
    return;
  }

  // Create timeline for sequential animations with overlap
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: aboutSection,
      start: 'top 80%', // Start when section is 80% down the viewport
      end: 'top 20%',
      toggleActions: 'play none none none', // Play once
      // markers: true, // Uncomment for debugging
    }
  });

  // Animation sequence with overlap
  tl.to(aboutLeft, {
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: 'power2.out'
  })
  .to(aboutCenter, {
    opacity: 1,
    scale: 1,
    duration: 0.8,
    ease: 'power2.out'
  }, '-=0.45') // Overlap by 0.45 seconds
  .to(aboutRight, {
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: 'power2.out'
  }, '-=0.45'); // Overlap by 0.45 seconds

  // Return cleanup function
  return () => {
    tl.kill();
    ScrollTrigger.getAll().forEach(trigger => {
      if (trigger.vars.trigger === aboutSection) {
        trigger.kill();
      }
    });
  };
}
