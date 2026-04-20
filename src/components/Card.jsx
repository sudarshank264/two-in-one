import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaStethoscope, FaGamepad, FaArrowRight } from 'react-icons/fa';
import { usePlatform } from '../context/PlatformContext';

const Card = ({ id, title, icon, image, description, link }) => {
  const navigate = useNavigate();
  const { selectPlatform } = usePlatform();
  
  const renderIcon = () => {
    switch(icon) {
      case 'FaStethoscope': return <FaStethoscope />;
      case 'FaGamepad': return <FaGamepad />;
      default: return null;
    }
  };

  const handleCardClick = (e) => {
    e.preventDefault();
    selectPlatform(id); // Assign the exact platform context
    navigate(link);     // Safely transport the user
  };

  return (
    <div onClick={handleCardClick} className="card" style={{ cursor: 'pointer' }}>
      <div className="card-img-wrapper">
        <img src={image} alt={title} className="card-img" />
      </div>
      <div className="card-content">
        <div className="card-header">
          <span className="card-icon">{renderIcon()}</span>
          <h3 className="card-title">{title}</h3>
        </div>
        <p className="card-desc">{description}</p>
        <div className="card-action">
          Enter Infrastructure <FaArrowRight />
        </div>
      </div>
    </div>
  );
};

export default Card;
