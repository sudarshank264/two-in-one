import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ModernNavbar from '../components/ModernNavbar';
import Footer from '../components/Footer';
import api from '../admin/utils/api';

const DoctorServices = () => {
  const [settings, setSettings] = useState(null);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
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
    <div style={{ background: 'var(--background-light)', minHeight: '100vh' }}>
      <ModernNavbar brandName={d.aboutTitle || "Physio Care"} basePath="/doctor" />
      
      <section className="page-hero" style={{ height: '300px' }}>
        {d.heroImage && <img src={baseUrl + d.heroImage} alt="Services Hero" className="page-hero-img" style={{filter: 'brightness(0.6)'}} />}
        <h1 className="page-hero-title">Our Services</h1>
      </section>

      <section className="container content-section">
        <p className="text-center" style={{ marginBottom: '50px', color: '#64748b', fontSize: '1.2rem' }}>
          Explore our wide range of professional physiotherapy programs designed to help you recover faster.
        </p>
        
        <div className="cards-container mx-auto" style={{ margin: '0 auto' }}>
          {services.map((service) => (
            <Link to={`/doctor/services/${service._id}`} key={service._id} className="card">
              <div className="card-img-wrapper">
                <img src={baseUrl + service.image} alt={service.title} className="card-img" />
              </div>
              <div className="card-content">
                <h3 className="card-title" style={{ marginBottom: '15px' }}>{service.title}</h3>
                <p className="card-desc">{service.shortDescription}</p>
                <div className="card-action">View Full Detail &rarr;</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <Footer brandName={d.aboutTitle || "Physio Care"} description={d.aboutText} address={d.contactAddress} />
    </div>
  );
};

export default DoctorServices;
