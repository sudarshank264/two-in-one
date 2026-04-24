import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ModernNavbar from '../components/ModernNavbar';
import Footer from '../components/Footer';
import api from '../admin/utils/api';
import '../styles/doctor.css';

const DoctorBlogDetail = () => {
  const { id } = useParams();
  const [settings, setSettings] = useState(null);
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.body.classList.add('theme-doctor');
    window.scrollTo(0, 0);
    fetchData();
    return () => document.body.classList.remove('theme-doctor');
  }, [id]);

  const fetchData = async () => {
    try {
      const [settingsRes, blogRes] = await Promise.all([
        api.get('/about'),
        api.get(`/blogs/${id}`)
      ]);
      setSettings(settingsRes.data);
      setBlog(blogRes.data);
    } catch (error) {
      console.error('Error fetching blog details:', error);
      setSettings({});
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div style={{textAlign: 'center', padding: '4rem', color: '#22577A'}}>Loading...</div>;
  if (!blog) return <div style={{textAlign: 'center', padding: '4rem', color: '#22577A'}}>Blog not found</div>;

  const d = settings || {};
  const baseUrl = (import.meta.env.VITE_API_URL || 'http://localhost:5001/api').replace('/api', '');

  return (
    <div>
      <ModernNavbar brandName={d.aboutTitle || "Physio Care"} basePath="/doctor" />
      
      <div className="doc-hero" style={{ minHeight: '30vh', background: 'var(--doc-primary-dark)' }}>
        <div className="container doc-hero-content" style={{ textAlign: 'center', paddingTop: '4rem' }}>
          <h1 className="doc-hero-title" style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{blog.title}</h1>
          <p style={{ color: 'rgba(255,255,255,0.8)' }}>
            Published on {new Date(blog.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      <section style={{ backgroundColor: 'white', padding: '4rem 0' }}>
        <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
          <Link to="/doctor/blogs" style={{ display: 'inline-block', marginBottom: '2rem', color: 'var(--doc-primary)', fontWeight: '600' }}>
            &larr; Back to Blogs
          </Link>
          
          <img 
            src={baseUrl + blog.image} 
            alt={blog.title} 
            style={{ width: '100%', borderRadius: '15px', marginBottom: '2rem', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }} 
          />
          
          <div style={{ lineHeight: '1.8', color: '#334155', fontSize: '1.1rem' }} dangerouslySetInnerHTML={{ __html: blog.mainContent.replace(/\n/g, '<br/>') }} />
        </div>
      </section>

      <Footer brandName={d.aboutTitle || "Physio Care"} description={d.aboutText} address={d.contactAddress} />
    </div>
  );
};

export default DoctorBlogDetail;
