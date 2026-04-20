/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaCheckCircle, FaSmile, FaChild, FaCoffee, FaShieldAlt } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/playzone.css';
import { fetchPzActivities, fetchPzAbout, fetchPzServices, fetchPzGallery } from '../services/apiService';

// Backend URL helper for images
const BACKEND_URL = 'http://localhost:5001';
const getImgUrl = (path) => {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  return `${BACKEND_URL}${path}`;
};

// --- STATIC CONFIG FOR FEATURES/CONTACT (These were not specified for backend APIs) --- //
const staticData = {
  hero: {
    title: "Welcome to Lets Play Zone! 🎈",
    subtitle: "The ultimate destination for fun, learning, and endless smiles.",
    image: "https://images.unsplash.com/photo-1566455589947-ce47eb5bf50b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
  },
  features: [
    { title: "Trained Staff", desc: "Our team is certified in child care and first aid.", icon: <FaCheckCircle /> },
    { title: "Daily Cleaning", desc: "Rigorous sanitization protocols every day.", icon: <FaCheckCircle /> },
    { title: "Secure Entry", desc: "Controlled access for absolute peace of mind.", icon: <FaCheckCircle /> }
  ],
  contact: {
    phone: "+1 (800) 123-PLAY",
    email: "fun@playzone.com",
    address: "123 Magic Lane, Wonderland City, WP 98765"
  }
};

const PlayZonePage = () => {
  const [data, setData] = useState({
    activities: [],
    about: null,
    services: [],
    gallery: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Set the specific theme class
  useEffect(() => {
    document.body.classList.add('theme-playzone');
    return () => document.body.classList.remove('theme-playzone');
  }, []);

  // Fetch API Data
  useEffect(() => {
    const loadData = async () => {
      try {
        const [activities, about, services, gallery] = await Promise.all([
          fetchPzActivities(),
          fetchPzAbout(),
          fetchPzServices(),
          fetchPzGallery()
        ]);

        setData({ activities, about, services, gallery });
        setLoading(false);
      } catch (err) {
        console.error('Error fetching backend APIs for playzone:', err);
        setError(true);
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Framer Motion Variants
  const fadeUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <h2>Loading Play Zone... 🎈</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <h2>Oops! Could not connect to the fun servers. Please try again later.</h2>
      </div>
    );
  }

  return (
    <div>
      <Navbar brandName="Lets Play Zone" contactEmail={staticData.contact.email} />

      {/* 1. Hero Section */}
      <section className="pz-hero" style={{ backgroundImage: `url(${staticData.hero.image})` }}>
        <motion.div
          className="pz-hero-content"
          initial="hidden"
          animate="visible"
          variants={fadeUp}
        >
          <h1>{staticData.hero.title}</h1>
          <p>{staticData.hero.subtitle}</p>
          <a href="#activities" className="pz-btn">Explore Fun</a>
        </motion.div>
      </section>

      {/* 2. Activities / Play Zone Cards */}
      <section id="activities" className="pz-section">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp}
        >
          <h2 className="pz-section-title">Our Activities</h2>
          <p className="pz-section-subtitle">Discover endless joy and challenges designed for all ages!</p>
        </motion.div>

        {data.activities.length === 0 ? (
          <p className="text-center">New activities coming soon!</p>
        ) : (
          <motion.div
            className="pz-activities-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer}
          >
            {data.activities.map((act) => (
              <motion.div key={act._id} className="pz-activity-card" variants={fadeUp}>
                <div className="pz-activity-img-wrap">
                  <img src={getImgUrl(act.image)} alt={act.title} className="pz-activity-img" />
                </div>
                <div className="pz-activity-content">
                  <h3>{act.title}</h3>
                  <p>{act.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </section>

      {/* 3. About Section */}
      {data.about && (
        <section id="about" className="pz-section pz-about">
          <motion.div
            className="pz-about-container"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <div className="pz-about-content">
              <h2 className="pz-section-title" style={{ textAlign: 'left' }}>{data.about.title || 'About Us'}</h2>
              <p>{data.about.text}</p>
              <a href="#contact" className="pz-btn">Contact Us</a>
            </div>
            <div className="pz-about-image">
              <img src={getImgUrl(data.about.image)} alt="About Lets Play Zone" />
            </div>
          </motion.div>
        </section>
      )}

      {/* 4. Services Section */}
      <section id="services" className="pz-section">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <h2 className="pz-section-title">Awesome Services</h2>
          <p className="pz-section-subtitle">We go the extra mile to make your experience perfect.</p>
        </motion.div>

        {data.services.length === 0 ? (
          <p className="text-center">Checking our awesome services...</p>
        ) : (
          <motion.div
            className="pz-services-list"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {data.services.map((srv) => (
              <motion.div key={srv._id} className="pz-service-item" variants={fadeUp}>
                {/* Fallback Icon mapping for demo, usually one maps DB strings to Icon components */}
                <div className="pz-service-icon"><FaSmile /></div>
                <h4>{srv.title}</h4>
                <p>{srv.description}</p>
              </motion.div>
            ))}
          </motion.div>
        )}
      </section>

      {/* 5. Gallery Section */}
      <section id="gallery" className="pz-section" style={{ background: '#fafafa' }}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <h2 className="pz-section-title">Fun Gallery</h2>
          <p className="pz-section-subtitle">Take a sneak peek into the amazing moments at Lets Play Zone.</p>
        </motion.div>

        {data.gallery.length === 0 ? (
          <p className="text-center">Adding new memories to the gallery soon!</p>
        ) : (
          <motion.div
            className="pz-gallery-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {data.gallery.map((item) => (
              <motion.div key={item._id} className="pz-gallery-item" variants={fadeUp}>
                <img src={getImgUrl(item.image)} alt={item.altText || 'Gallery Item'} />
                <div className="pz-gallery-overlay">
                  <span>➕</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </section>

      {/* 6. Features Section (Static mapping) */}
      <section id="features" className="pz-section pz-features">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <h2 className="pz-section-title">Why Choose Us?</h2>
          <p className="pz-section-subtitle">Your child's safety and joy are our top priorities.</p>
        </motion.div>

        <motion.div
          className="pz-features-grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          {staticData.features.map((feat, index) => (
            <motion.div key={index} className="pz-feature-box" variants={fadeUp}>
              <div className="pz-feature-icon">{feat.icon}</div>
              <h4>{feat.title}</h4>
              <p>{feat.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* 7. Contact Section (Static mapping) */}
      <section id="contact" className="pz-section" style={{ background: 'linear-gradient(to bottom, #fffbf0, #ffe5e5)' }}>
        <motion.div
          className="pz-contact-container"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <h2 className="pz-section-title">Get In Touch</h2>
          <p className="pz-section-subtitle">Ready to join the fun? We are just a message away!</p>

          <div className="pz-contact-info">
            <div className="pz-contact-item">
              <FaPhoneAlt className="pz-contact-icon" />
              <span>{staticData.contact.phone}</span>
            </div>
            <div className="pz-contact-item">
              <FaEnvelope className="pz-contact-icon" />
              <span>{staticData.contact.email}</span>
            </div>
            <div className="pz-contact-item">
              <FaMapMarkerAlt className="pz-contact-icon" />
              <span>{staticData.contact.address}</span>
            </div>
          </div>

          <div style={{ marginTop: '3rem' }}>
            <button className="pz-btn">Book Now</button>
          </div>
        </motion.div>
      </section>

      <Footer
        brandName="Lets Play Zone"
        description={data.about ? data.about.text : staticData.hero.subtitle}
        address={staticData.contact.address}
      />
    </div>
  );
};

export default PlayZonePage;
