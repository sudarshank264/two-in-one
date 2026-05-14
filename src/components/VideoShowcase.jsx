import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FaPlay, FaArrowRight } from 'react-icons/fa';
import '../styles/VideoShowcase.css';

const VideoShowcase = ({ websiteType }) => {
    const [showcase, setShowcase] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchShowcase = async () => {
            try {
                const response = await axios.get(`http://localhost:5001/api/video-showcase/type/${websiteType}`);
                if (response.data.success) {
                    setShowcase(response.data.data);
                }
            } catch (error) {
                console.error("Error fetching video showcase:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchShowcase();
    }, [websiteType]);

    const extractYouTubeId = (url) => {
        if (!url) return null;
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    };

    if (loading || !showcase || !showcase.isActive) return null;

    const videoId = extractYouTubeId(showcase.videoUrl);
    const thumbnailUrl = videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : null;

    // We use a button block with Link if buttonLink starts with / or a function if it's 'Book Appointment' to open modal,
    // but the prompt says button and related text. We will use a link for simplicity, or handle 'openBookingModal' event.
    
    const handleButtonClick = (e) => {
        if (showcase.buttonLink === '/appointment' || showcase.buttonText?.toLowerCase().includes('book')) {
            e.preventDefault();
            window.dispatchEvent(new CustomEvent('openBookingModal'));
        }
    };

    return (
        <section className={`video-showcase-section ${websiteType}-theme`}>
            <div className="container">
                <div className="video-showcase-grid">
                    {/* Left Side: Single video player */}
                    <div className="video-showcase-player">
                        {videoId ? (
                            <iframe 
                                src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}`}
                                title={showcase.title}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className="video-iframe"
                            ></iframe>
                        ) : (
                            <div className="video-placeholder">Invalid Video URL</div>
                        )}
                        <div className="video-player-glow"></div>
                    </div>

                    {/* Right Side: Dynamic content */}
                    <div className="video-showcase-content">
                        <div className="video-showcase-badge">
                            <FaPlay className="badge-icon" /> Featured Video
                        </div>
                        <h2 className="video-showcase-title">{showcase.title}</h2>
                        <p className="video-showcase-description">{showcase.description}</p>
                        
                        <div className="video-showcase-action">
                            {showcase.buttonLink && showcase.buttonLink.startsWith('http') ? (
                                <a href={showcase.buttonLink} target="_blank" rel="noopener noreferrer" className={`theme-btn ${websiteType}-btn`}>
                                    {showcase.buttonText} <FaArrowRight />
                                </a>
                            ) : (
                                <Link to={showcase.buttonLink} onClick={handleButtonClick} className={`theme-btn ${websiteType}-btn`}>
                                    {showcase.buttonText} <FaArrowRight />
                                </Link>
                            )}
                            
                            {showcase.relatedText && (
                                <span className="video-showcase-related-text">{showcase.relatedText}</span>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default VideoShowcase;
