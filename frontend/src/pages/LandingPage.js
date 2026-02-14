import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';
import CursorEffect from '../components/CursorEffect';
import NetworkBackground from '../components/NetworkBackground';
import KanalLogo from '../components/KanalLogo';

function LandingPage() {
  const navigate = useNavigate();

  const [isExiting, setIsExiting] = React.useState(false);
  const [isLoaded, setIsLoaded] = React.useState(false);

  React.useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleEnterContest = () => {
    setIsExiting(true);
    setTimeout(() => {
      navigate('/register');
    }, 1000); // Increased to 1s for smoother exit
  };

  return (
    <div className={`landing ${isLoaded ? 'landing--loaded' : ''} ${isExiting ? 'landing--exiting' : ''}`}>
      <CursorEffect />
      <NetworkBackground />

      {/* ── Top nav ── */}
      <nav className="landing__nav">
        <span className="landing__logo">
          <span className="landing__logo-icon">⬡</span> Bug Hunters
        </span>
        <button className="btn btn--ghost" onClick={() => navigate('/admin')}>
          Admin
        </button>
      </nav>

      {/* ... */}

      {/* ── Hero ── */}
      <main className="landing__hero">
        {/* Replaced Badge with Logo */}
        <KanalLogo />

        <h1 className="landing__title glitch" data-text="BUG HUNTERS">
          BUG HUNTERS
        </h1>

        <p className="landing__subtitle">
          Fix the Bug. Win the Glory. <br />
          Three rounds. Real code. Zero hints.
        </p>

        {/* ── Stats row ── */}
        <div className="landing__stats" style={{ animationDelay: '0.4s' }}>
          <div className="landing__stat">
            <span className="landing__stat-num">3</span>
            <span className="landing__stat-label">Rounds</span>
          </div>
          <div className="landing__stat">
            <span className="landing__stat-num">9</span>
            <span className="landing__stat-label">Questions</span>
          </div>
          <div className="landing__stat">
            <span className="landing__stat-num">3</span>
            <span className="landing__stat-label">Languages</span>
          </div>
        </div>

        {/* ── CTA ── */}
        <div className="landing__cta" style={{ animationDelay: '0.6s' }}>
          <button className="btn btn--primary btn--lg" onClick={handleEnterContest}>
            Enter Contest
          </button>
        </div>

        {/* ── Language pills ── */}
        <div className="landing__langs" style={{ animationDelay: '0.8s' }}>
          <span className="lang-pill lang-pill--c">C</span>
          <span className="lang-pill lang-pill--java">Java</span>
          <span className="lang-pill lang-pill--py">Python</span>
        </div>
      </main>

      {/* ── Footer note ── */}
      <footer className="landing__footer">
        No account needed · Select your language once · Compete at your own pace
      </footer>
    </div>
  );
}

export default LandingPage;
