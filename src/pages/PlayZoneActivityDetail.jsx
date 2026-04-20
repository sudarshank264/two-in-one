import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ModernNavbar from '../components/ModernNavbar';
import Footer from '../components/Footer';
import { playZoneData } from '../data/playZoneData';
import { FaCheckCircle, FaArrowLeft } from 'react-icons/fa';
import '../styles/playzone.css';

const PlayZoneActivityDetail = () => {
  const { id } = useParams();
  const d = playZoneData;
  const activity = d.activities.find(a => a.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.classList.add('theme-playzone');
    return () => document.body.classList.remove('theme-playzone');
  }, [id]);

  if (!activity) {
    return (
      <div style={{ textAlign: 'center', padding: '100px' }}>
        <h2>Activity Not Found! 😢</h2>
        <Link to="/play-zone/activities">Back to Fun Activities</Link>
      </div>
    );
  }

  return (
    <div style={{ background: '#fff9e6', minHeight: '100vh' }}>
      <ModernNavbar brandName="Lets Play Zone" basePath="/play-zone" />
      
      <section className="page-hero" style={{ height: '400px' }}>
        <img src={activity.image} alt={activity.title} className="page-hero-img" style={{filter: 'brightness(0.6)'}} />
        <motion.h1 
          className="page-hero-title"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {activity.title}
        </motion.h1>
      </section>

      <section className="container content-section" style={{ maxWidth: '900px' }}>
        <div style={{ marginBottom: '30px' }}>
          <Link to="/play-zone/activities" style={{ color: 'var(--primary-color)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 'bold' }}>
            <FaArrowLeft /> Back to Activities
          </Link>
        </div>

        <motion.div 
          style={{ background: 'white', padding: '50px', borderRadius: '32px', boxShadow: '0 15px 40px rgba(245, 158, 11, 0.15)' }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 style={{ marginBottom: '30px', color: 'var(--text-dark)', fontSize: '2.5rem', fontWeight: '800' }}>More Details!</h2>
          <p style={{ fontSize: '1.2rem', lineHeight: '1.8', color: '#555', marginBottom: '40px' }}>
            {activity.fullDetail}
          </p>

          <h3 style={{ marginBottom: '25px', color: 'var(--text-dark)', fontSize: '1.8rem' }}>Awesome Features</h3>
          <ul style={{ listStyle: 'none', padding: 0, marginBottom: '50px' }}>
            {activity.features.map((feat, index) => (
              <motion.li 
                key={index} 
                style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px', fontSize: '1.2rem', color: '#444', fontWeight: '500' }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.4 + (index * 0.1) }}
              >
                <div style={{ background: '#fef3c7', padding: '10px', borderRadius: '50%', display: 'flex' }}>
                  <FaCheckCircle color="var(--primary-color)" size="1.5rem" />
                </div>
                {feat}
              </motion.li>
            ))}
          </ul>

          <div className="text-center">
            <motion.button 
              className="pz-btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Book This Activity Now! 🚀
            </motion.button>
          </div>
        </motion.div>
      </section>

      <Footer brandName="Lets Play Zone" description={d.about.text} address={d.contact.address} />
    </div>
  );
};

export default PlayZoneActivityDetail;
