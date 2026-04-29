import React, { useEffect, useState } from 'react';
import { fetchSiteData } from '../services/apiService';
import Card from '../components/Card';
import { usePlatform } from '../context/PlatformContext';
import '../styles/BlobCards.css';

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
    <div className="d13-page">
      <div className="d13-header">
        <h1>Where Care <br /><span className="wave">Meets Joy</span></h1>
        <p className="d13-sub">Two thoughtfully crafted spaces — one for healing, one for happiness.</p>
      </div>

      <div className="d13-cards">
        {Array.isArray(cards) && cards.map((card) => (
          <Card key={card.id} {...card} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
