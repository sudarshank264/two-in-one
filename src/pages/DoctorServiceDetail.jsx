import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ModernNavbar from '../components/ModernNavbar';
import Footer from '../components/Footer';
import { doctorData } from '../data/doctorData';
import { FaCheckCircle, FaArrowLeft } from 'react-icons/fa';

const DoctorServiceDetail = () => {
  const { id } = useParams();
  const d = doctorData;
  const service = d.services.find(s => s.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.classList.add('theme-doctor');
    return () => document.body.classList.remove('theme-doctor');
  }, [id]);

  if (!service) {
    return (
      <div style={{ textAlign: 'center', padding: '100px' }}>
        <h2>Service Not Found</h2>
        <Link to="/doctor/services">Back to Services</Link>
      </div>
    );
  }

  return (
    <div style={{ background: 'var(--background-light)', minHeight: '100vh' }}>
      <ModernNavbar brandName="Physio Care" basePath="/doctor" />
      
      <section className="page-hero" style={{ height: '400px' }}>
        <img src={service.image} alt={service.title} className="page-hero-img" style={{filter: 'brightness(0.6)'}} />
        <h1 className="page-hero-title">{service.title}</h1>
      </section>

      <section className="container content-section" style={{ maxWidth: '900px' }}>
        <div style={{ marginBottom: '30px' }}>
          <Link to="/doctor/services" style={{ color: 'var(--primary-color)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '500' }}>
            <FaArrowLeft /> Back to Services
          </Link>
        </div>

        <div style={{ background: 'white', padding: '50px', borderRadius: '16px', boxShadow: 'var(--shadow)' }}>
          <h2 style={{ marginBottom: '20px', color: 'var(--text-dark)', fontSize: '2rem' }}>Overview</h2>
          <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#475569', marginBottom: '40px' }}>
            {service.fullDetail}
          </p>

          <h3 style={{ marginBottom: '20px', color: 'var(--text-dark)' }}>Key Features</h3>
          <ul style={{ listStyle: 'none', padding: 0, marginBottom: '50px' }}>
            {service.features.map((feat, index) => (
              <li key={index} style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px', fontSize: '1.1rem', color: '#444' }}>
                <FaCheckCircle color="var(--primary-color)" /> {feat}
              </li>
            ))}
          </ul>

          <div className="text-center">
            <button style={{ padding: '15px 40px', fontSize: '1.1rem', fontWeight: '600', color: 'white', background: 'var(--primary-color)', border: 'none', borderRadius: '8px', cursor: 'pointer', transition: 'background 0.3s' }}>
              Book an Appointment
            </button>
          </div>
        </div>
      </section>

      <Footer brandName="Physio Care" description={d.about.text} address={d.contact.address} />
    </div>
  );
};

export default DoctorServiceDetail;
