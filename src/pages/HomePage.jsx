import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaHeart, FaHome, FaUserFriends, FaRegStar, 
  FaGamepad, FaShieldAlt, FaPhoneAlt, FaMapMarkerAlt, 
  FaRegClock, FaBirthdayCake, FaSmile 
} from 'react-icons/fa';
import { MdDateRange } from 'react-icons/md';
import { usePlatform } from '../context/PlatformContext';
import styles from '../styles/Landing.module.css';

const HomePage = () => {
  const navigate = useNavigate();
  const { clearPlatform } = usePlatform();

  useEffect(() => {
    clearPlatform();
    document.body.classList.remove('theme-doctor', 'theme-playzone');
  }, [clearPlatform]);

  return (
    <div className={styles.landingPage}>
      {/* Header / Logo */}
      <header className={styles.header}>
        <div className={styles.logo}>
          <FaHome className={styles.logoIcon} />
          <div className={styles.logoText}>
            Where Care <span>Meets Joy</span>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className={styles.heroSection}>
        <FaHeart className={`${styles.floatingIcon} ${styles.heart}`} />
        <FaSmile className={`${styles.floatingIcon} ${styles.smile}`} />
        
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            Two thoughtfully <br />
            crafted spaces — <br />
            <span className={styles.highlight1}>one for healing,</span><br />
            <span className={styles.highlight2}>one for happiness.</span>
          </h1>
          <p className={styles.heroSubtitle}>
            Experience care. Celebrate life.
          </p>
        </div>
        <div className={styles.heroImageWrapper}>
          <img 
            src="/images/hero_hands.png" 
            alt="Caring Hands" 
            className={styles.heroImage} 
          />
        </div>
      </section>

      {/* Cards Section */}
      <section className={styles.cardsContainer}>
        {/* Healthcare Card */}
        <div className={styles.card}>
          <img 
            src="/images/stethoscope_3d.png" 
            alt="Healthcare" 
            className={styles.cardImage} 
          />
          <div className={styles.cardContent}>
            <span className={`${styles.cardBadge} ${styles.badgeBlue}`}>HEALTHCARE PORTAL</span>
            <h2 className={styles.cardTitle}>Dr. Preeti Choudhary</h2>
            <p className={styles.cardDesc}>
              Expert physiotherapist in Ghaziabad with 13+ years experience.
            </p>
            
            <div className={styles.statsRow}>
              <div className={styles.statItem}>
                <MdDateRange className={styles.statIcon} />
                <div className={styles.statText}>
                  <span className={styles.statValue}>13+</span>
                  <span className={styles.statLabel}>Years</span>
                </div>
              </div>
              <div className={styles.statItem}>
                <FaUserFriends className={styles.statIcon} />
                <div className={styles.statText}>
                  <span className={styles.statValue}>500+</span>
                  <span className={styles.statLabel}>Patients</span>
                </div>
              </div>
              <div className={styles.statItem}>
                <FaRegStar className={styles.statIcon} />
                <div className={styles.statText}>
                  <span className={styles.statValue}>4.9★</span>
                  <span className={styles.statLabel}>Rated</span>
                </div>
              </div>
            </div>

            <button 
              className={`${styles.ctaBtn} ${styles.btnBlue}`} 
              onClick={() => navigate('/doctor')}
            >
              Book Visit
            </button>
          </div>
        </div>

        {/* Play Zone Card */}
        <div className={styles.card}>
          <img 
            src="/images/playzone_3d.png" 
            alt="Play Zone" 
            className={styles.cardImage} 
          />
          <div className={styles.cardContent}>
            <span className={`${styles.cardBadge} ${styles.badgePink}`}>LET'S PLAY ZONE</span>
            <h2 className={styles.cardTitle}>Let's Play Zone</h2>
            <p className={styles.cardDesc}>
              Premium birthday parties & 30+ fun activities for kids.
            </p>
            
            <div className={styles.statsRow}>
              <div className={styles.statItem}>
                <FaBirthdayCake className={`${styles.statIcon} ${styles.statIconPink}`} />
                <div className={styles.statText}>
                  <span className={styles.statValue}>Birthday</span>
                  <span className={styles.statLabel}>Parties</span>
                </div>
              </div>
              <div className={styles.statItem}>
                <FaGamepad className={`${styles.statIcon} ${styles.statIconPink}`} />
                <div className={styles.statText}>
                  <span className={styles.statValue}>30+ Fun</span>
                  <span className={styles.statLabel}>Activities</span>
                </div>
              </div>
              <div className={styles.statItem}>
                <FaShieldAlt className={`${styles.statIcon} ${styles.statIconPink}`} />
                <div className={styles.statText}>
                  <span className={styles.statValue}>Safe &</span>
                  <span className={styles.statLabel}>Supervised</span>
                </div>
              </div>
            </div>

            <button 
              className={`${styles.ctaBtn} ${styles.btnPink}`} 
              onClick={() => navigate('/play-zone')}
            >
              Explore Zone
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.footerInfo}>
            <div className={styles.footerItem}>
              <div className={styles.footerIcon}>
                <FaMapMarkerAlt />
              </div>
              <div className={styles.footerText}>
                <strong>Ghaziabad</strong>
                <span>Uttar Pradesh</span>
              </div>
            </div>
            <div className={styles.footerItem}>
              <div className={styles.footerIcon}>
                <FaRegClock />
              </div>
              <div className={styles.footerText}>
                <strong>Mon - Sat</strong>
                <span>9:00 AM - 7:00 PM</span>
              </div>
            </div>
            <div className={styles.footerItem}>
              <div className={styles.footerIcon}>
                <FaPhoneAlt />
              </div>
              <div className={styles.footerText}>
                <strong>+91 98765 43210</strong>
                <span>www.wherecaremeetsjoy.com</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className={`${styles.footerContent} ${styles.footerBottom}`}>
          <div className={styles.footerMessage}>
            <div className={styles.heartCircle}>
              <FaHeart />
            </div>
            <span>Because every moment<br/>deserves care and joy.</span>
          </div>
          <div className={styles.qrSection}>
            <div className={styles.qrCode}>
              {/* Placeholder for QR Code, using a simple grid for now */}
              <div style={{width:'100%', height:'100%', display:'grid', gridTemplateColumns:'repeat(2, 1fr)', gap:'2px'}}>
                <div style={{background:'#1a1a2e', borderRadius:'2px'}}></div>
                <div style={{background:'#1a1a2e', borderRadius:'2px'}}></div>
                <div style={{background:'#1a1a2e', borderRadius:'2px'}}></div>
                <div style={{background:'#1a1a2e', borderRadius:'2px'}}></div>
              </div>
            </div>
            <span className={styles.qrText}>Scan to<br/>Connect</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
