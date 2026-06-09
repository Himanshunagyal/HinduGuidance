import { useState, useEffect } from 'react';

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const accepted = document.cookie.includes('ps_cookies_ok=1');
    if (!accepted) setVisible(true);
  }, []);

  const accept = () => {
    document.cookie = 'ps_cookies_ok=1; path=/; max-age=' + 60 * 60 * 24 * 365;
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 9999,
      padding: '12px',
      background: 'rgba(255,248,235,0.97)',
      borderTop: '1px solid rgba(212,175,55,0.3)',
      boxShadow: '0 -4px 20px rgba(0,0,0,0.1)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '10px',
    }}>
      <p style={{ fontSize: '12px', color: '#5a3e28', textAlign: 'center', margin: 0, lineHeight: 1.5 }}>
        🍪 This site uses cookies to remember your spiritual profile.{' '}
        <a href="/privacy" style={{ color: '#c2410c', textDecoration: 'underline' }}>Privacy Policy</a>
      </p>
      <button
        onClick={accept}
        style={{
          background: '#c2410c',
          color: 'white',
          border: 'none',
          padding: '8px 28px',
          fontSize: '13px',
          fontWeight: 600,
          borderRadius: '4px',
          cursor: 'pointer',
          width: '100%',
          maxWidth: '200px',
        }}
      >
        🙏 Accept
      </button>
    </div>
  );
}