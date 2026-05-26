"use client";

import { useEffect } from 'react';

import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TechStack } from './components/TechStack';
import { About } from './components/About';
import { Projects } from './components/Projects';
import { Experience } from './components/Experience';
import { Testimonials } from './components/Testimonials';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

export default function App() {
  useEffect(() => {
    const flashByHash = () => {
      const id = window.location.hash.replace(/^#/, '');
      if (!id) return;
      const el = document.getElementById(id);
      if (!el) return;

      el.classList.remove('flash-border');
      // Force reflow so the animation can re-trigger
      void el.offsetWidth;
      el.classList.add('flash-border');
      window.setTimeout(() => el.classList.remove('flash-border'), 1400);
    };

    // Initial hash (deep link) + subsequent navbar clicks.
    flashByHash();
    window.addEventListener('hashchange', flashByHash);
    return () => window.removeEventListener('hashchange', flashByHash);
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <TechStack />
      <About />
      <Projects />
      <Experience />
    #  <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
}
