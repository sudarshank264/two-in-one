import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ModernNavbar from '../components/ModernNavbar';
import Footer from '../components/Footer';
import { playZoneData } from '../data/playZoneData';
import '../styles/playzone.css';

const PlayZoneActivities = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.classList.add('theme-playzone');
    return () => document.body.classList.remove('theme-playzone');
  }, []);

  const d = playZoneData;

  const fadeUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };
  const stagger = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  return (
    <div style={{ background: '#fff9e6', minHeight: '100vh' }}>
      <ModernNavbar brandName="Lets Play Zone" basePath="/play-zone" />
      
      <section className="page-hero" style={{ height: '300px' }}>
        <img src={d.hero.image} alt="Activities Hero" className="page-hero-img" style={{filter: 'brightness(0.6)'}} />
        <h1 className="page-hero-title">All Activities</h1>
      </section>

      <section className="container content-section">
        <p className="text-center" style={{ marginBottom: '50px', fontSize: '1.2rem' }}>
          Explore all the fun we have to offer!
        </p>
        
        <motion.div className="pz-activities-grid" initial="hidden" animate="visible" variants={stagger}>
          {d.activities.map((act) => (
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
      </section>

      <Footer brandName="Lets Play Zone" description={d.about.text} address={d.contact.address} />
    </div>
  );
};

export default PlayZoneActivities;
