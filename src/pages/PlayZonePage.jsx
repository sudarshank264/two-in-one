import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaCheckCircle } from 'react-icons/fa';
import ModernNavbar from '../components/ModernNavbar';
import Footer from '../components/Footer';
import '../styles/playzone.css';
import api from '../admin/utils/api';

const PlayZonePage = () => {
  const [settings, setSettings] = useState(null);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.body.classList.add('theme-playzone');
    fetchData();
    return () => document.body.classList.remove('theme-playzone');
  }, []);

  const fetchData = async () => {
    try {
      const [settingsRes, actRes] = await Promise.all([
        api.get('/playzone/about'),
        api.get('/playzone/activities')
      ]);
      setSettings(settingsRes.data);
      setActivities(actRes.data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
      setSettings({});
    } finally {
      setLoading(false);
    }
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  if (loading) return <div style={{textAlign: 'center', padding: '4rem'}}>Loading...</div>;

  const d = settings || {};
  const baseUrl = (import.meta.env.VITE_API_URL || 'http://localhost:5001/api').replace('/api', '');

  return (
    <div>
      <ModernNavbar brandName={d.aboutTitle || "Lets Play Zone"} basePath="/play-zone" />

      <section className="pz-hero" style={{ backgroundImage: `url(${baseUrl + d.heroImage})` }}>
        <motion.div className="pz-hero-content" initial="hidden" animate="visible" variants={fadeUp}>
          <h1>{d.heroTitle || 'Welcome to Play Zone!'}</h1>
          <p>{d.heroSubtitle}</p>
          <a href="#explore" className="pz-btn">Explore Fun</a>
        </motion.div>
      </section>

      <section id="explore" className="pz-section">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeUp}>
          <h2 className="pz-section-title">Our Top Activities</h2>
          <p className="pz-section-subtitle">Discover endless joy and challenges designed for all ages!</p>
        </motion.div>

        <motion.div className="pz-activities-grid" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
          {activities.slice(0, 3).map((act) => (
            <motion.div key={act._id} className="pz-activity-card" variants={fadeUp}>
              <div className="pz-activity-img-wrap">
                <img src={baseUrl + act.image} alt={act.title} className="pz-activity-img" />
              </div>
              <div className="pz-activity-content">
                <h3>{act.title}</h3>
                <p>{act.description.substring(0, 100)}...</p>
                <Link to={`/play-zone/activities/${act._id}`} className="card-action">View Activity</Link>
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
          {d.features && d.features.map((feat, index) => (
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
            <div className="pz-contact-item"><FaPhoneAlt className="pz-contact-icon" /><span>{d.contactPhone}</span></div>
            <div className="pz-contact-item"><FaEnvelope className="pz-contact-icon" /><span>{d.contactEmail}</span></div>
            <div className="pz-contact-item"><FaMapMarkerAlt className="pz-contact-icon" /><span>{d.contactAddress}</span></div>
          </div>
        </motion.div>
      </section>

      <Footer brandName={d.aboutTitle || "Lets Play Zone"} description={d.aboutText || d.text} address={d.contactAddress} />
    </div>
  );
};

export default PlayZonePage;
