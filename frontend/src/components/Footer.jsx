import React from 'react';

const Footer = () => {
  return (
    <footer style={{
      backgroundColor: '#111',
      color: '#fff',
      padding: '30px 20px',
      textAlign: 'center',
      borderTop: '3px solid #D4AF37', 
      fontFamily: 'sans-serif',
      marginTop: '50px'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <h3 style={{ color: '#D4AF37', margin: 0, letterSpacing: '2px' }}>VELVET VOGUE</h3>
        <p style={{ fontSize: '14px', margin: 0, color: '#aaa' }}>
          Elevate Your Identity Through Your Style. Premium apparel curated for modern trends.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', fontSize: '14px' }}>
          <a href="#" style={{ color: '#fff', textDecoration: 'none' }}>Shop</a>
          <a href="#" style={{ color: '#fff', textDecoration: 'none' }}>Support</a>
          <a href="#" style={{ color: '#fff', textDecoration: 'none' }}>Privacy Policy</a>
        </div>
        <hr style={{ border: '0', borderTop: '1px solid #333', width: '100%' }} />
        <p style={{ fontSize: '12px', margin: 0, color: '#777' }}>
          &copy; {new Date().getFullYear()} Velvet Vogue Ltd. All Rights Reserved. Designed for CIS6004 Module.
        </p>
      </div>
    </footer>
  );
};

export default Footer;