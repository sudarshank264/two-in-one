import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaCheckCircle } from 'react-icons/fa';
import ModernNavbar from '../components/ModernNavbar';
import Footer from '../components/Footer';
import '../styles/playzone.css';
import { playZoneData } from '../data/playZoneData';

const PlayZonePage = () => {
  useEffect(() => {
    document.body.classList.add('theme-playzone');
    return () => document.body.classList.remove('theme-playzone');
  }, []);

  const d = playZoneData;

  const fadeUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  return (
    <div>
      <ModernNavbar brandName="Lets Play Zone" basePath="/play-zone" />

      <section className="pz-hero" style={{ backgroundImage: `url(${d.hero.image})` }}>
        <motion.div className="pz-hero-content" initial="hidden" animate="visible" variants={fadeUp}>
          <h1>{d.hero.title}</h1>
          <p>{d.hero.subtitle}</p>
          <a href="#explore" className="pz-btn">Explore Fun</a>
        </motion.div>
      </section>

      <section id="explore" className="pz-section">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeUp}>
          <h2 className="pz-section-title">Our Top Activities</h2>
          <p className="pz-section-subtitle">Discover endless joy and challenges designed for all ages!</p>
        </motion.div>

        <motion.div className="pz-activities-grid" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
          {d.activities.slice(0, 3).map((act) => (
            <motion.div key={act.id} className="pz-activity-card" variants={fadeUp}>
              <div className="pz-activity-img-wrap">
                <img src={act.image} alt={act.title} className="pz-activity-img" />
              </div>
              <div className="pz-activity-content">
                <h3>{act.title}</h3>
                <p>{act.description}</p>
                <Link to={`/play-zone/activities/${act.id}`} className="card-action">View Activity</Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <div className="text-center" style={{ marginTop: '40px' }}>
          <Link to="/play-zone/activities" className="pz-btn" style={{ background: '#ef4444' }}>Explore All Activities</Link>
        </div>
      </section>

      <section className="pz-section pz-features">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <h2 className="pz-section-title">Why Choose Us?</h2>
        </motion.div>
        <motion.div className="pz-features-grid" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
          {d.features.map((feat, index) => (
            <motion.div key={index} className="pz-feature-box" variants={fadeUp}>
              <div className="pz-feature-icon" style={{ fontSize: '2rem', color: '#f59e0b' }}><FaCheckCircle /></div>
              <h4>{feat.title}</h4>
              <p>{feat.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <section className="pz-section" style={{ background: 'linear-gradient(to bottom, #fffbf0, #ffe5e5)' }}>
        <motion.div className="pz-contact-container" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <h2 className="pz-section-title">Get In Touch</h2>
          <div className="pz-contact-info">
            <div className="pz-contact-item"><FaPhoneAlt className="pz-contact-icon" /><span>{d.contact.phone}</span></div>
            <div className="pz-contact-item"><FaEnvelope className="pz-contact-icon" /><span>{d.contact.email}</span></div>
            <div className="pz-contact-item"><FaMapMarkerAlt className="pz-contact-icon" /><span>{d.contact.address}</span></div>
          </div>
        </motion.div>
      </section>

      <Footer brandName="Lets Play Zone" description={d.about.text} address={d.contact.address} />
    </div>
  );
};

export default PlayZonePage;
