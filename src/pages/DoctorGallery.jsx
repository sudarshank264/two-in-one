import React, { useEffect } from 'react';
import ModernNavbar from '../components/ModernNavbar';
import Footer from '../components/Footer';
import { doctorData } from '../data/doctorData';

const DoctorGallery = () => {
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
        <img src={d.hero.image} alt="Gallery Hero" className="page-hero-img" style={{filter: 'brightness(0.6)'}} />
        <h1 className="page-hero-title">Our Gallery</h1>
      </section>

      <section className="container content-section">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
          {d.gallery.map((item) => (
            <div key={item.id} style={{ borderRadius: '12px', overflow: 'hidden', boxShadow: 'var(--shadow)' }}>
              <img src={item.image} alt={item.description} style={{ width: '100%', height: '250px', objectFit: 'cover', display: 'block' }} />
              <div style={{ padding: '15px', background: 'white', textAlign: 'center', fontWeight: '500' }}>
                {item.description}
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer brandName="Physio Care" description={d.about.text} address={d.contact.address} />
    </div>
  );
};

export default DoctorGallery;
