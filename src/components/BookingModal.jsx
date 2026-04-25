import React, { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import api from '../admin/utils/api';
import './BookingModal.css';

const BookingModal = ({ basePath }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [services, setServices] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });
  const [status, setStatus] = useState({ type: '', msg: '' });

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener('openBookingModal', handleOpen);

    // Fetch services based on basePath
    const fetchServices = async () => {
      try {
        const endpoint = basePath === '/doctor' ? '/services' : '/playzone/services';
        const { data } = await api.get(endpoint);
        setServices(data || []);
      } catch (error) {
        console.error('Error fetching services for booking modal:', error);
      }
    };

    fetchServices();

    return () => window.removeEventListener('openBookingModal', handleOpen);
  }, [basePath]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: 'loading', msg: 'Submitting...' });

    try {
      const source = basePath === '/doctor' ? 'doctor' : 'playzone';
      await api.post('/leads', { ...formData, source });
      setStatus({ type: 'success', msg: 'Appointment booked successfully! We will contact you soon.' });
      setTimeout(() => {
        setIsOpen(false);
        setStatus({ type: '', msg: '' });
        setFormData({ name: '', email: '', phone: '', service: '', message: '' });
      }, 3000);
    } catch (error) {
      console.error(error);
      setStatus({ type: 'error', msg: 'Failed to book appointment. Please try again.' });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="booking-modal-overlay">
      <div className="booking-modal-content">
        <button className="booking-modal-close" onClick={() => setIsOpen(false)}>
          <FaTimes />
        </button>

        <h2>Book Your Appointment</h2>

        {status.msg && (
          <div className={`booking-status ${status.type}`}>
            {status.msg}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name*</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
            />
          </div>

          <div className="form-group">
            <label>Email*</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label>Phone Number*</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
              required
            />
          </div>

          <div className="form-group">
            <label>Services*</label>
            <select name="service" value={formData.service} onChange={handleChange} required>
              <option value="">Select Service</option>
              {services.map(s => (
                <option key={s._id} value={s.title}>{s.title}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Write your message..."
              rows="4"
            ></textarea>
          </div>

          <button type="submit" className="booking-submit-btn" disabled={status.type === 'loading'}>
            {/* <span style={{ background: 'green', borderRadius: '50%', width: '24px', height: '24px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginRight: '10px' }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--doc-primary)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="19" x2="19" y2="5"></line><polyline points="9 5 19 5 19 15"></polyline></svg>
            </span> */}
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;
