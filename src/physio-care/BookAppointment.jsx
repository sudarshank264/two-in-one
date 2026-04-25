import { Link } from 'react-router-dom';
import { MapPin, Clock } from 'lucide-react';
import './Home.css';
import logo from './assets/physio-care-logo.svg';

export default function BookAppointment() {
  return (
    <div className="app-wrapper">
      
      {/* 1. TOP BAR */}
      <div className="top-bar">
        <div className="container top-bar-inner">
          <div className="top-left">
            <span><MapPin size={14}/> Gorakhpur, Uttar Pradesh</span>
          </div>
          <div className="top-right">
            <span>Help Desk: +91 98765 43210</span>
          </div>
        </div>
      </div>

      {/* 2. NAVBAR */}
      <div className="navbar-wrapper">
        <nav className="navbar">
          <div className="brand"><Link to="/"><img src={logo} alt="Logo" className="logo-img" /></Link></div>
          <ul className="nav-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/blogs">Blogs</Link></li>
            <li><Link to="/gallery">Gallery</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
          {/* Note: This button is already active since we are on the page */}
          <Link to="/doctor/book-appointment" className="btn-primary btn-round">Book Appointment</Link>
        </nav>
      </div>

      {/* 3. IMAGE BANNER HEADER */}
      <div className="internal-header booking-header-bg">
        <div className="container">
          <h1>Book an Appointment</h1>
          <p>Home / Book Appointment</p>
        </div>
      </div>

      {/* 4. BOOKING FORM SECTION */}
      <section className="booking-section">
        <div className="container">
          <div className="booking-card">
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
              <span className="subtitle">SCHEDULE A VISIT</span>
              <h2 style={{ color: 'var(--clr-dark)' }}>Request Your Consultation</h2>
              <p>Fill out the form below and our team will contact you to confirm your appointment time.</p>
            </div>

            <form onSubmit={(e) => e.preventDefault()}>
              <div className="form-grid">
                <div className="form-group">
                  <label>Full Name *</label>
                  <input type="text" className="form-control" placeholder="John Doe" required />
                </div>
                <div className="form-group">
                  <label>Email Address *</label>
                  <input type="email" className="form-control" placeholder="john@example.com" required />
                </div>
                <div className="form-group">
                  <label>Phone Number *</label>
                  <input type="tel" className="form-control" placeholder="+91 98765 43210" required />
                </div>
                <div className="form-group">
                  <label>Select Service *</label>
                  <select className="form-control" required>
                    <option value="">Choose a treatment...</option>
                    <option value="geriatric">Geriatric Physiotherapy</option>
                    <option value="neurological">Neurological Physiotherapy</option>
                    <option value="post-surgical">Post Surgical Rehabilitation</option>
                    <option value="orthopaedic">Orthopaedic Physiotherapy</option>
                    <option value="pain-management">Pain Management Therapy</option>
                  </select>
                </div>
              </div>
              
              <div className="form-group" style={{ marginBottom: '20px' }}>
                <label>Additional Message / Symptoms</label>
                <textarea className="form-control" placeholder="Briefly describe what you need help with..."></textarea>
              </div>

              <button type="submit" className="btn-submit">Submit Appointment Request</button>
            </form>
          </div>
        </div>
      </section>

    </div>
  );
}