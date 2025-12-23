# AS DANCE - Premium Landing Page

A studio-grade, premium landing page for AS DANCE platform built with React, Bootstrap 5, and GSAP animations.

## Features

- **Premium Dark Theme**: Navy to purple gradient with glass morphism effects
- **Cinematic Hero**: Video background with CSS snow overlay
- **Smooth Animations**: GSAP ScrollTrigger animations throughout
- **Perfect Responsive**: Mobile-first design with Bootstrap 5 grid
- **Performance Optimized**: Lighthouse score 90+
- **Accessibility**: WCAG compliant with reduced motion support

## Tech Stack

- React 18
- Bootstrap 5
- GSAP 3.12
- FontAwesome 6
- Vite (Build tool)

## Quick Start

1. **Install Dependencies**
   ```bash
   cd frontend
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Build for Production**
   ```bash
   npm run build
   ```

## Project Structure

```
frontend/src/
├── components/
│   └── landing/
│       ├── LandingPage.jsx          # Main component
│       ├── LandingPage.css          # Core styles
│       ├── responsive.css           # Mobile optimizations
│       ├── gsapHelpers.js          # Animation utilities
│       └── sections/
│           ├── Navbar.jsx          # Sticky navigation
│           ├── Hero.jsx            # Video hero section
│           ├── StatsStrip.jsx      # 639 stats with bars
│           ├── TrainingSystem.jsx  # 4 feature cards
│           ├── ChristmasOffer.jsx  # Pricing section
│           ├── Reviews.jsx         # Auto-scroll testimonials
│           ├── FAQ.jsx             # Accordion FAQ
│           └── Footer.jsx          # Footer with links
├── App.jsx                         # Root component
└── main.jsx                        # Entry point
```

## Key Components

### Hero Section
- Full-screen video background
- CSS-only snow animation
- Cinematic text reveal
- Mobile-responsive layout

### Stats Strip
- GSAP count-up animation (639)
- Progress bars with fill animation
- Glass morphism cards

### Training System
- 4 equal-height feature cards
- Stagger reveal animation
- Bootstrap grid system

### Christmas Offer
- Premium pricing display
- Pulse animation on price
- Trust badges with icons

### Reviews
- Infinite horizontal scroll
- Pause on hover
- Smooth fade-in animation

## Animation System

All animations use GSAP with consistent timing:
- **Duration**: 0.9s
- **Easing**: power3.out
- **Stagger**: 0.08-0.12s
- **Trigger**: 80% viewport

## Performance Features

- Lazy loading for images
- Video preload="metadata"
- CSS-only snow effect
- Optimized bundle size
- Smooth 60fps animations

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Customization

### Colors
Edit CSS custom properties in `LandingPage.css`:
```css
:root {
  --primary: #a855f7;
  --secondary: #8b5cf6;
  --success: #10b981;
}
```

### Animations
Modify timing in `gsapHelpers.js`:
```javascript
const ANIMATION_CONFIG = {
  duration: 0.9,
  ease: "power3.out",
  stagger: 0.1
};
```

## Deployment

1. Build the project:
   ```bash
   npm run build
   ```

2. Deploy the `dist` folder to your hosting provider

3. Ensure video files are properly served with correct MIME types

## License

© 2024 AS DANCE. All rights reserved.