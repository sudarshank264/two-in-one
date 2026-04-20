import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import ModernNavbar from '../components/ModernNavbar';
import Footer from '../components/Footer';
import { playZoneData } from '../data/playZoneData';
import '../styles/playzone.css';

const PlayZoneGallery = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.classList.add('theme-playzone');
    return () => document.body.classList.remove('theme-playzone');
  }, []);

  const d = playZoneData;
  const stagger = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };
  const scaleUp = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } }
  };

  return (
    <div style={{ background: '#fff9e6', minHeight: '100vh' }}>
      <ModernNavbar brandName="Lets Play Zone" basePath="/play-zone" />
      
      <section className="page-hero" style={{ height: '300px' }}>
        <img src={d.hero.image} alt="Gallery Hero" className="page-hero-img" style={{filter: 'brightness(0.6)'}} />
        <h1 className="page-hero-title">Fun Gallery</h1>
      </section>

      <section className="container content-section">
        <motion.div 
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}
          initial="hidden" animate="visible" variants={stagger}
        >
          {d.gallery.map((item) => (
            <motion.div key={item.id} variants={scaleUp} style={{ borderRadius: '24px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(245, 158, 11, 0.2)' }}>
              <img src={item.image} alt={item.description} style={{ width: '100%', height: '250px', objectFit: 'cover', display: 'block' }} />
              <div style={{ padding: '15px', background: 'white', textAlign: 'center', fontWeight: 'bold', color: 'var(--primary-color)' }}>
                {item.description}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <Footer brandName="Lets Play Zone" description={d.about.text} address={d.contact.address} />
    </div>
  );
};

export default PlayZoneGallery;
