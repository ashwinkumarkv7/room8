import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import Hero from '../components/Hero/Hero';
import HowItWorks from '../components/HowItWorks/HowItWorks';
import FeaturedListings from '../components/FeaturedListings/FeaturedListings';
import WhyRoom8 from '../components/WhyRoom8/WhyRoom8';
import Testimonials from '../components/Testimonials/Testimonials';
import CTA from '../components/CTA/CTA';
import Footer from '../components/Footer/Footer';

export default function LandingPage() {
  return (
    <>
      <main>
        <Hero />
        <HowItWorks />
        <FeaturedListings />
        <WhyRoom8 />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </>
  );
}