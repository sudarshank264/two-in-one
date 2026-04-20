import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaCheckCircle } from 'react-icons/fa';
import ModernNavbar from '../components/ModernNavbar';
import Footer from '../components/Footer';
import { doctorData } from '../data/doctorData';

const DoctorPage = () => {
  useEffect(() => {
    document.body.classList.add('theme-doctor');
    return () => document.body.classList.remove('theme-doctor');
  }, []);

  const d = doctorData;

  return (
    <div>
      <ModernNavbar brandName="Physio Care" basePath="/doctor" />
      
      <section className="page-hero">
        <img src={d.hero.image} alt="Physio Care" className="page-hero-img" />
        <h1 className="page-hero-title">{d.hero.title}</h1>
      </section>

      <section className="container content-section">
        <h2 className="section-title text-center">About Our Clinic</h2>
        <p className="about-text" style={{ margin: '0 auto 40px', textAlign: 'center' }}>
          {d.about.text.substring(0, 150)}...
        </p>
        <div className="text-center" style={{ marginBottom: '60px' }}>
          <Link to="/doctor/about" className="card-action">Read Full About Us &rarr;</Link>
        </div>

        <h2 className="section-title text-center">Our Services (Preview)</h2>
        <div className="services-grid">
          {d.services.slice(0, 3).map((service, index) => (
            <Link to={`/doctor/services/${service.id}`} key={index} className="service-card" style={{textDecoration: 'none'}}>
              <h4>{service.title}</h4>
              <p>{service.description}</p>
            </Link>
          ))}
        </div>
        <div className="text-center">
          <Link to="/doctor/services" className="card-action" style={{ fontSize: '1.1rem', marginBottom: '80px' }}>
            View All Services &rarr;
          </Link>
        </div>

        <h2 className="section-title text-center" style={{ marginTop: '80px' }}>Contact Details</h2>
        <div className="contact-info" style={{ maxWidth: '600px', margin: '0 auto', marginBottom: '80px' }}>
          <p><FaPhoneAlt color="var(--primary-color)" /> {d.contact.phone}</p>
          <p><FaEnvelope color="var(--primary-color)" /> {d.contact.email}</p>
          <p><FaMapMarkerAlt color="var(--primary-color)" /> {d.contact.address}</p>
        </div>
      </section>

      <Footer brandName="Physio Care" description={d.about.text} address={d.contact.address} />
    </div>
  );
};

export default DoctorPage;
