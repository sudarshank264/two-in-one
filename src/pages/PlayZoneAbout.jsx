import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import ModernNavbar from '../components/ModernNavbar';
import Footer from '../components/Footer';
import { playZoneData } from '../data/playZoneData';
import '../styles/playzone.css';

const PlayZoneAbout = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.classList.add('theme-playzone');
    return () => document.body.classList.remove('theme-playzone');
  }, []);

  const d = playZoneData;

  return (
    <div style={{ background: '#fff9e6', minHeight: '100vh' }}>
      <ModernNavbar brandName="Lets Play Zone" basePath="/play-zone" />
      
      <section className="page-hero" style={{ height: '300px' }}>
        <img src={d.about.image} alt="About PlayZone" className="page-hero-img" style={{filter: 'brightness(0.6)'}} />
        <h1 className="page-hero-title">About Lets Play Zone</h1>
      </section>

      <section className="container content-section" style={{ maxWidth: '900px' }}>
        <motion.div 
          className="pz-about-content pz-card" 
          initial={{ opacity: 0, y: 50 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.6 }}
          style={{ background: 'white', padding: '40px', borderRadius: '24px', boxShadow: '0 10px 30px rgba(245, 158, 11, 0.15)', textAlign: 'center' }}
        >
          <h2 className="pz-section-title">{d.about.title}</h2>
          <p style={{ fontSize: '1.2rem', lineHeight: '1.8', color: '#444' }}>{d.about.text}</p>
        </motion.div>
      </section>

      <Footer brandName="Lets Play Zone" description={d.about.text} address={d.contact.address} />
    </div>
  );
};

export default PlayZoneAbout;
