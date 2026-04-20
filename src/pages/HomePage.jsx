import React, { useEffect, useState } from 'react';
import { fetchSiteData } from '../services/apiService';
import Card from '../components/Card';
import { usePlatform } from '../context/PlatformContext';

const HomePage = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const { clearPlatform } = usePlatform();

  useEffect(() => {
    // Whenever hitting home page, reset any isolated platform instance
    clearPlatform();
    document.body.classList.remove('theme-doctor', 'theme-playzone');

    const loadData = async () => {
      try {
        const data = await fetchSiteData();
        setCards(data.homeCards);
      } catch (error) {
        console.error('Failed to load home page data', error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="loader-container">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--background-light)' }}>
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Select Your Gateway</h1>
          <p className="hero-subtitle">
            Welcome to the main portal. From here, you can enter fully isolated website environments. Navigation between them is strictly contained.
          </p>
        </div>
        <div className="cards-container">
          {Array.isArray(cards) && cards.map((card) => (
            <Card key={card.id} {...card} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
