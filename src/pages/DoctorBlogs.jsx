import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ModernNavbar from '../components/ModernNavbar';
import Footer from '../components/Footer';
import api from '../admin/utils/api';
import '../styles/doctor.css';

const DoctorBlogs = () => {
  const [settings, setSettings] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.body.classList.add('theme-doctor');
    fetchData();
    return () => document.body.classList.remove('theme-doctor');
  }, []);

  const fetchData = async () => {
    try {
      const [settingsRes, blogsRes] = await Promise.all([
        api.get('/about'),
        api.get('/blogs')
      ]);
      setSettings(settingsRes.data);
      setBlogs(blogsRes.data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
      setSettings({});
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div style={{textAlign: 'center', padding: '4rem', color: '#22577A'}}>Loading...</div>;

  const d = settings || {};
  const baseUrl = (import.meta.env.VITE_API_URL || 'http://localhost:5001/api').replace('/api', '');

  return (
    <div>
      <ModernNavbar brandName={d.aboutTitle || "Physio Care"} basePath="/doctor" />
      
      <div className="doc-hero" style={{ minHeight: '40vh', backgroundImage: `url(${d.heroImage ? baseUrl + d.heroImage : 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2070&auto=format&fit=crop'})` }}>
        <div className="doc-hero-overlay" style={{ background: 'linear-gradient(90deg, rgba(34, 87, 122, 0.9) 0%, rgba(56, 163, 165, 0.8) 100%)' }}></div>
        <div className="container doc-hero-content" style={{ textAlign: 'center', paddingTop: '4rem' }}>
          <h1 className="doc-hero-title">Our Health Blog</h1>
          <p className="doc-hero-subtitle">Stay informed with the latest insights and tips from our experts.</p>
        </div>
      </div>

      <section className="doc-services-section" style={{ backgroundColor: '#F8FAFC' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
            {blogs && blogs.length > 0 ? (
              blogs.map((blog) => (
                <div key={blog._id} className="doc-service-card" style={{ display: 'flex', flexDirection: 'column' }}>
                  <img 
                    src={baseUrl + blog.image} 
                    alt={blog.title} 
                    style={{ width: '100%', height: '200px', objectFit: 'cover' }} 
                  />
                  <div style={{ padding: '2rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <h3 style={{ fontSize: '1.25rem', color: 'var(--doc-primary-dark)', marginBottom: '1rem' }}>
                      {blog.title}
                    </h3>
                    <p style={{ color: '#475569', lineHeight: '1.6', marginBottom: '1.5rem', flex: 1 }}>
                      {blog.shortDescription}
                    </p>
                    <Link 
                      to={`/doctor/blogs/${blog._id}`} 
                      className="nav-book-btn" 
                      style={{ alignSelf: 'flex-start', padding: '0.5rem 1rem', fontSize: '0.9rem' }}
                    >
                      Read More
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3rem', color: '#64748B' }}>
                No blogs published yet. Check back soon!
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer brandName={d.aboutTitle || "Physio Care"} description={d.aboutText} address={d.contactAddress} />
    </div>
  );
};

export default DoctorBlogs;
