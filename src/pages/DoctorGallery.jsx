import React, { useEffect, useState } from 'react';
import ModernNavbar from '../components/ModernNavbar';
import Footer from '../components/Footer';
import api from '../admin/utils/api';

const DoctorGallery = () => {
  const [settings, setSettings] = useState(null);
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.classList.add('theme-doctor');
    fetchData();
    return () => document.body.classList.remove('theme-doctor');
  }, []);

  const fetchData = async () => {
    try {
      const [settingsRes, galleryRes] = await Promise.all([
        api.get('/about'),
        api.get('/gallery')
      ]);
      setSettings(settingsRes.data);
      setGallery(galleryRes.data || []);
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
        {d.heroImage && <img src={baseUrl + d.heroImage} alt="Gallery Hero" className="page-hero-img" style={{filter: 'brightness(0.6)'}} />}
        <h1 className="page-hero-title">Our Gallery</h1>
      </section>

      <section className="container content-section">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
          {gallery.map((item) => (
            <div key={item._id} style={{ borderRadius: '12px', overflow: 'hidden', boxShadow: 'var(--shadow)' }}>
              <img src={baseUrl + item.image} alt={item.altText} style={{ width: '100%', height: '250px', objectFit: 'cover', display: 'block' }} />
              <div style={{ padding: '15px', background: 'white', textAlign: 'center', fontWeight: '500' }}>
                {item.altText}
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer brandName={d.aboutTitle || "Physio Care"} description={d.aboutText} address={d.contactAddress} />
    </div>
  );
};

export default DoctorGallery;
