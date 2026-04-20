import React, { useEffect, useState } from 'react';
import { fetchSiteData } from '../services/apiService';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const DoctorPage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Set the specific theme class
  useEffect(() => {
    document.body.classList.add('theme-doctor');
    return () => document.body.classList.remove('theme-doctor');
  }, []);

  useEffect(() => {
    const loadData = async () => {
      try {
        const apiData = await fetchSiteData();
        setData(apiData.doctorPage);
      } catch (error) {
        console.error('Failed to load doctor content', error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading || !data) {
    return (
      <div className="loader-container">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div>
      <Navbar brandName="Physio Care" contactEmail={data.contact.email} />
      
      <section className="page-hero">
        <img src={data.heroImage} alt="Physio Care" className="page-hero-img" />
        <h1 className="page-hero-title">{data.title}</h1>
      </section>

      <section className="container content-section">
        <h2 className="section-title text-center">About Our Clinic</h2>
        <p className="about-text" style={{ margin: '0 auto 60px', textAlign: 'center' }}>
          {data.about}
        </p>

        <h2 className="section-title text-center">Our Services</h2>
        <div className="services-grid">
          {data.services.map((service, index) => (
            <div key={index} className="service-card">
              <h4>{service.title}</h4>
              <p>{service.description}</p>
            </div>
          ))}
        </div>

        <h2 className="section-title text-center" style={{ marginTop: '80px' }}>Contact Details</h2>
        <div className="contact-info" style={{ maxWidth: '600px', margin: '0 auto', marginBottom: '80px' }}>
          <p><FaPhoneAlt color="var(--primary-color)" /> {data.contact.phone}</p>
          <p><FaEnvelope color="var(--primary-color)" /> {data.contact.email}</p>
          <p><FaMapMarkerAlt color="var(--primary-color)" /> {data.contact.address}</p>
        </div>
      </section>

      <Footer brandName="Physio Care" description={data.about} address={data.contact.address} />
    </div>
  );
};

export default DoctorPage;
