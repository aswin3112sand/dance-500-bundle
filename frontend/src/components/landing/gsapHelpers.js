import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Common animation settings
const ANIMATION_CONFIG = {
  duration: 0.9,
  ease: "power3.out",
  stagger: 0.1
};

// Reveal animation for sections
export const revealUp = (elements, options = {}) => {
  const config = { ...ANIMATION_CONFIG, ...options };

  gsap.fromTo(elements,
    {
      opacity: 0,
      y: 40,
      scale: 0.98
    },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: config.duration,
      ease: config.ease,
      stagger: config.stagger,
      scrollTrigger: {
        trigger: elements[0] || elements,
        start: "top 85%",
        toggleActions: "play none none none"
      }
    }
  );
};

// Count up animation for numbers
export const countUp = (element, targetValue, options = {}) => {
  const config = {
    duration: 2.5,
    ease: "power2.out",
    ...options
  };

  const obj = { value: 0 };

  gsap.to(obj, {
    value: targetValue,
    duration: config.duration,
    ease: config.ease,
    onUpdate: () => {
      element.textContent = Math.round(obj.value);
    },
    scrollTrigger: {
      trigger: element,
      start: "top 85%",
      toggleActions: "play none none none"
    }
  });
};

// Progress bar fill animation
export const fillBars = (bars, percentages) => {
  bars.forEach((bar, index) => {
    gsap.to(bar, {
      width: `${percentages[index]}%`,
      duration: 2,
      ease: "power3.out",
      delay: index * 0.1,
      scrollTrigger: {
        trigger: bar,
        start: "top 90%",
        toggleActions: "play none none none"
      }
    });
  });
};

// Fade in animation
export const fadeIn = (elements, options = {}) => {
  const config = {
    duration: 1.2,
    ease: "power2.out",
    stagger: 0.1,
    ...options
  };

  gsap.fromTo(elements,
    { opacity: 0 },
    {
      opacity: 1,
      duration: config.duration,
      ease: config.ease,
      stagger: config.stagger,
      scrollTrigger: {
        trigger: elements,
        start: "top 85%",
        toggleActions: "play none none none"
      }
    }
  );
};

// Hero sequence animation
export const heroSequence = () => {
  const tl = gsap.timeline({ delay: 0.2 });

  tl.fromTo('.navbar-custom',
    { y: -100, opacity: 0 },
    { y: 0, opacity: 1, duration: 1, ease: "power4.out" }
  )
    .fromTo('.hero-subtitle',
      { opacity: 0, x: -30 },
      { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" },
      "-=0.4"
    )
    .fromTo('.hero-title',
      { opacity: 0, y: 50, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 1, ease: "power3.out" },
      "-=0.6"
    )
    .fromTo('.hero-description, .hero-buttons, .trust-badge',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", stagger: 0.1 },
      "-=0.5"
    )
    .fromTo('.hero-dancer',
      { opacity: 0, x: 100, scale: 0.8 },
      { opacity: 0.6, x: 0, scale: 1, duration: 1.5, ease: "power3.out" },
      "-=1.2"
    );
};

// Price pulse animation
export const pricePulse = (element) => {
  gsap.to(element, {
    scale: 1.1,
    duration: 0.8,
    ease: "power2.inOut",
    yoyo: true,
    repeat: -1,
    repeatDelay: 0.5
  });
};

// Button hover glow effect
export const buttonGlow = (button) => {
  // Glow is handled via CSS transitions for performance, 
  // but we can add extra GSAP micro-interactions here if needed.
};

// Stagger reveal for cards
export const staggerCards = (cards, options = {}) => {
  const config = {
    duration: 1,
    ease: "power4.out",
    stagger: 0.15,
    ...options
  };

  gsap.fromTo(cards,
    {
      opacity: 0,
      y: 60,
      scale: 0.95
    },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: config.duration,
      ease: config.ease,
      stagger: config.stagger,
      scrollTrigger: {
        trigger: cards[0],
        start: "top 85%",
        toggleActions: "play none none none"
      }
    }
  );
};

// Initialize all animations
export const initializeAnimations = () => {
  ScrollTrigger.refresh();
  heroSequence();
};

// Clean up animations
export const cleanupAnimations = () => {
  ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  gsap.killTweensOf("*");
};