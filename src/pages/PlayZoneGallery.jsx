import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import ModernNavbar from '../components/ModernNavbar';
import Footer from '../components/Footer';
import api from '../admin/utils/api';
import '../styles/playzone.css';

const PlayZoneGallery = () => {
  const [settings, setSettings] = useState(null);
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.classList.add('theme-playzone');
    fetchData();
    return () => document.body.classList.remove('theme-playzone');
  }, []);

  const fetchData = async () => {
    try {
      const [settingsRes, galleryRes] = await Promise.all([
        api.get('/playzone/about'),
        api.get('/playzone/gallery')
      ]);
      setSettings(settingsRes.data);
      setGallery(galleryRes.data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
      setSettings({});
    } finally {
      setLoading(false);
    }
  };

  const stagger = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };
  const scaleUp = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } }
  };

  if (loading) return <div style={{textAlign: 'center', padding: '4rem'}}>Loading...</div>;

  const d = settings || {};
  const baseUrl = (import.meta.env.VITE_API_URL || 'http://localhost:5001/api').replace('/api', '');

  return (
    <div style={{ background: '#fff9e6', minHeight: '100vh' }}>
      <ModernNavbar brandName={d.aboutTitle || "Lets Play Zone"} basePath="/play-zone" />
      
      <section className="page-hero" style={{ height: '300px' }}>
        {d.heroImage && <img src={baseUrl + d.heroImage} alt="Gallery Hero" className="page-hero-img" style={{filter: 'brightness(0.6)'}} />}
        <h1 className="page-hero-title">Fun Gallery</h1>
      </section>

      <section className="container content-section">
        <motion.div 
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}
          initial="hidden" animate="visible" variants={stagger}
        >
          {gallery.map((item) => (
            <motion.div key={item._id} variants={scaleUp} style={{ borderRadius: '24px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(245, 158, 11, 0.2)' }}>
              <img src={baseUrl + item.image} alt={item.altText} style={{ width: '100%', height: '250px', objectFit: 'cover', display: 'block' }} />
              <div style={{ padding: '15px', background: 'white', textAlign: 'center', fontWeight: 'bold', color: 'var(--primary-color)' }}>
                {item.altText}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <Footer brandName={d.aboutTitle || "Lets Play Zone"} description={d.aboutText || d.text} address={d.contactAddress} />
    </div>
  );
};

export default PlayZoneGallery;
