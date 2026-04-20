import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import ModernNavbar from '../components/ModernNavbar';
import Footer from '../components/Footer';
import { doctorData } from '../data/doctorData';

const DoctorServices = () => {
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
        <img src={d.hero.image} alt="Services Hero" className="page-hero-img" style={{filter: 'brightness(0.6)'}} />
        <h1 className="page-hero-title">Our Services</h1>
      </section>

      <section className="container content-section">
        <p className="text-center" style={{ marginBottom: '50px', color: '#64748b', fontSize: '1.2rem' }}>
          Explore our wide range of professional physiotherapy programs designed to help you recover faster.
        </p>
        
        <div className="cards-container mx-auto" style={{ margin: '0 auto' }}>
          {d.services.map((service) => (
            <Link to={`/doctor/services/${service.id}`} key={service.id} className="card">
              <div className="card-img-wrapper">
                <img src={service.image} alt={service.title} className="card-img" />
              </div>
              <div className="card-content">
                <h3 className="card-title" style={{ marginBottom: '15px' }}>{service.title}</h3>
                <p className="card-desc">{service.description}</p>
                <div className="card-action">View Full Detail &rarr;</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <Footer brandName="Physio Care" description={d.about.text} address={d.contact.address} />
    </div>
  );
};

export default DoctorServices;
