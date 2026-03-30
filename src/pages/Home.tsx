import React from 'react';
import Hero from '../components/Hero';
import Features from '../components/Features';
import CTA from '../components/CTA';

export default function Home() {
  return (
    <div className="bg-[#FAFAFA] dark:bg-gray-950">
      <Hero />
      <Features />
      <CTA />
    </div>
  );
}
