import React, { useEffect } from 'react';
import ModernNavbar from '../components/ModernNavbar';
import Footer from '../components/Footer';
import { doctorData } from '../data/doctorData';

const DoctorAbout = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.classList.add('theme-doctor');
    return () => document.body.classList.remove('theme-doctor');
  }, []);

  const d = doctorData;

  return (
    <div style={{ background: 'var(--background-light)', minHeight: '100vh' }}>
      <ModernNavbar brandName="Physio Care" basePath="/doctor" />
      
      <section className="page-hero" style={{ height: '300px' }}>
        <img src={d.about.image} alt="About Hero" className="page-hero-img" style={{filter: 'brightness(0.6)'}} />
        <h1 className="page-hero-title">About Us</h1>
      </section>

      <section className="container content-section" style={{ maxWidth: '900px' }}>
        <h2 className="section-title text-center">{d.about.title}</h2>
        <div style={{ background: 'white', padding: '40px', borderRadius: '16px', boxShadow: 'var(--shadow)', lineHeight: '1.8', color: '#475569', fontSize: '1.1rem' }}>
          <p>{d.about.text}</p>
          <p style={{ marginTop: '20px' }}>We have dedicated our lives to helping people move freely and without pain. Our state-of-the-art clinic is equipped with modern rehabilitation tools, and our staff brings decades of clinical experience. Your health is our utmost priority.</p>
        </div>
      </section>

      <Footer brandName="Physio Care" description={d.about.text} address={d.contact.address} />
    </div>
  );
};

export default DoctorAbout;
