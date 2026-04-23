import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaCheckCircle } from 'react-icons/fa';
import ModernNavbar from '../components/ModernNavbar';
import Footer from '../components/Footer';
import api from '../admin/utils/api';

const DoctorPage = () => {
  const [settings, setSettings] = useState(null);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.body.classList.add('theme-doctor');
    fetchData();
    return () => document.body.classList.remove('theme-doctor');
  }, []);

  const fetchData = async () => {
    try {
      const [settingsRes, servicesRes] = await Promise.all([
        api.get('/about'),
        api.get('/services')
      ]);
      setSettings(settingsRes.data);
      setServices(servicesRes.data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div style={{textAlign: 'center', padding: '4rem'}}>Loading...</div>;
  if (!settings) return <div>Failed to load data.</div>;

  const d = settings;
  const baseUrl = import.meta.env.VITE_API_URL.replace('/api', '');

  return (
    <div>
      <ModernNavbar brandName={d.aboutTitle || "Physio Care"} basePath="/doctor" />
      
      <section className="page-hero" style={{ height: '500px' }}>
        <img 
          src={d.heroImage ? baseUrl + d.heroImage : 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2070&auto=format&fit=crop'} 
          alt={d.heroTitle || "Physiotherapy Clinic"} 
          className="page-hero-img" 
        />
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(to right, rgba(14, 165, 233, 0.7), rgba(16, 185, 129, 0.5))', zIndex: 1 }}></div>
        <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: '0 20px' }}>
          <h1 className="page-hero-title" style={{ fontSize: '4rem', textShadow: '0 4px 15px rgba(0,0,0,0.3)', marginBottom: '1rem' }}>
            {d.heroTitle || 'Expert Physiotherapy Care'}
          </h1>
          <p style={{ fontSize: '1.5rem', color: 'white', textShadow: '0 2px 10px rgba(0,0,0,0.3)', maxWidth: '800px', margin: '0 auto' }}>
            Providing comprehensive rehabilitation and wellness services for a pain-free life.
          </p>
        </div>
      </section>

      <section className="container content-section">
        <h2 className="section-title text-center">{d.aboutTitle || 'About Our Clinic'}</h2>
        <p className="about-text" style={{ margin: '0 auto 40px', textAlign: 'center' }}>
          {d.aboutText ? d.aboutText.substring(0, 150) + '...' : 'No description provided.'}
        </p>
        <div className="text-center" style={{ marginBottom: '60px' }}>
          <Link to="/doctor/about" className="card-action">Read Full About Us &rarr;</Link>
        </div>

        <h2 className="section-title text-center">Our Services (Preview)</h2>
        <div className="services-grid">
          {services.slice(0, 3).map((service) => (
            <Link to={`/doctor/services/${service._id}`} key={service._id} className="service-card" style={{textDecoration: 'none'}}>
              <h4>{service.title}</h4>
              <p>{service.shortDescription}</p>
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
          <p><FaPhoneAlt color="var(--primary-color)" /> {d.contactPhone}</p>
          <p><FaEnvelope color="var(--primary-color)" /> {d.contactEmail}</p>
          <p><FaMapMarkerAlt color="var(--primary-color)" /> {d.contactAddress}</p>
        </div>
      </section>

      <Footer brandName={d.aboutTitle || "Physio Care"} description={d.aboutText} address={d.contactAddress} />
    </div>
  );
};

export default DoctorPage;
