import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from './sections/Navbar';
import Hero from './sections/Hero';
import StatsStrip from './sections/StatsStrip';
import TrainingSystem from './sections/TrainingSystem';
import ChristmasOffer from './sections/ChristmasOffer';
import Reviews from './sections/Reviews';
import FAQ from './sections/FAQ';
import Footer from './sections/Footer';
import './LandingPage.css';
import './responsive.css';

gsap.registerPlugin(ScrollTrigger);

const LandingPage = () => {
  useEffect(() => {
    // Initialize GSAP ScrollTrigger
    ScrollTrigger.refresh();
    
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="landing-page">
      <Navbar />
      <Hero />
      <StatsStrip />
      <TrainingSystem />
      <ChristmasOffer />
      <Reviews />
      <FAQ />
      <Footer />
    </div>
  );
};

export default LandingPage;