/**
 * Scroll Animations Utility
 * Handles smooth scroll animations throughout the application
 */

// Smooth scroll polyfill for better browser support
function smoothScrollPolyfill() {
  if (!('scrollBehavior' in document.documentElement.style)) {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/gh/cferdinandi/smooth-scroll@15/dist/smooth-scroll.polyfills.min.js';
    document.head.appendChild(script);
  }
}

// Initialize smooth scrolling for anchor links
function initSmoothScroll() {
  // Handle all anchor links
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  
  anchorLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      // Skip empty anchors
      if (href === '#' || href === '#!') {
        e.preventDefault();
        return;
      }
      
      const target = document.querySelector(href);
      
      if (target) {
        e.preventDefault();
        
        // Calculate offset for fixed header
        const headerHeight = window.innerWidth < 768 ? 64 : 80;
        const targetPosition = target.offsetTop - headerHeight;
        
        // Smooth scroll
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
        
        // Update URL without triggering scroll
        if (history.pushState) {
          history.pushState(null, null, href);
        }
      }
    });
  });
}

// Scroll animation observer
function initScrollAnimations() {
  // Check if Intersection Observer is supported
  if (!('IntersectionObserver' in window)) {
    // Fallback: show all elements immediately
    document.querySelectorAll('.scroll-animate').forEach(el => {
      el.classList.add('revealed');
    });
    return;
  }

  // Create intersection observer
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -100px 0px', // Trigger when element is 100px from viewport
    threshold: 0.1 // Trigger when 10% of element is visible
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const element = entry.target;
        
        // Determine animation type from classes
        if (element.classList.contains('fade-in')) {
          element.classList.add('revealed-fade-in');
        } else if (element.classList.contains('fade-in-up')) {
          element.classList.add('revealed-fade-in-up');
          element.style.transform = 'translateY(30px)';
        } else if (element.classList.contains('fade-in-down')) {
          element.classList.add('revealed-fade-in-down');
          element.style.transform = 'translateY(-30px)';
        } else if (element.classList.contains('fade-in-left')) {
          element.classList.add('revealed-fade-in-left');
          element.style.transform = 'translateX(-30px)';
        } else if (element.classList.contains('fade-in-right')) {
          element.classList.add('revealed-fade-in-right');
          element.style.transform = 'translateX(30px)';
        } else if (element.classList.contains('scale-in')) {
          element.classList.add('revealed-scale-in');
          element.style.transform = 'scale(0.9)';
        } else if (element.classList.contains('slide-up')) {
          element.classList.add('revealed-slide-up');
          element.style.transform = 'translateY(50px)';
        } else {
          // Default fade-in
          element.classList.add('revealed-fade-in');
        }
        
        element.classList.add('revealed');
        
        // Stop observing once animated
        observer.unobserve(element);
      }
    });
  }, observerOptions);

  // Observe all elements with scroll-animate class
  document.querySelectorAll('.scroll-animate').forEach(el => {
    observer.observe(el);
  });
}

// Parallax scroll effect for background elements
function initParallaxScroll() {
  const parallaxElements = document.querySelectorAll('.parallax');
  
  if (parallaxElements.length === 0) return;

  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    
    parallaxElements.forEach(element => {
      const rate = scrolled * (element.dataset.speed || 0.5);
      element.style.transform = `translateY(${rate}px)`;
    });
  }, { passive: true });
}

// Stagger animation for child elements
function initStaggerAnimations() {
  const staggerContainers = document.querySelectorAll('.stagger-animate');
  
  staggerContainers.forEach(container => {
    const children = container.querySelectorAll('.scroll-animate');
    
    children.forEach((child, index) => {
      child.classList.add(`animate-delay-${(index % 5 + 1) * 100}`);
    });
  });
}

// Smooth scroll to top function
function scrollToTop(smooth = true) {
  window.scrollTo({
    top: 0,
    behavior: smooth ? 'smooth' : 'auto'
  });
}

// Initialize all scroll animations
export function initScrollAnimationsSystem() {
  if (typeof window === 'undefined') return;
  
  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      smoothScrollPolyfill();
      initSmoothScroll();
      initScrollAnimations();
      initParallaxScroll();
      initStaggerAnimations();
    });
  } else {
    smoothScrollPolyfill();
    initSmoothScroll();
    initScrollAnimations();
    initParallaxScroll();
    initStaggerAnimations();
  }
}

// Export scroll to top function
export { scrollToTop };
