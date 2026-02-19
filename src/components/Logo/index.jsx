import React from 'react';
import { Link } from 'react-router-dom';
import { baseURL } from '../../utils/constants';
import { useAppSettings } from '../../context/SettingsContext';
import './styles.scss';

const Logo = ({ className = "" }) => {
  const { generalSettings, loading, error } = useAppSettings();
  const logoPath = generalSettings?.logo;
  const siteTitle = generalSettings?.site_title || "TIPTOPHUT";

  // if (loading) {
  //   return (
  //     <div className={`logo-skeleton shimmer ${className}`} 
  //          style={{ width: '249px', height: '67px', borderRadius: '4px' }} 
  //     />
  //   );
  // }

  // if (error || !logoPath) {
  //   return (
  //     <Link to="/" className={`logo-text-fallback d-flex align-items-center fw-bold text-decoration-none ${className}`}>
  //        {siteTitle}
  //     </Link>
  //   );
  // }

  return (
    <Link to="/" className={`logo-wrapper d-inline-block ${className}`}>
      <img 
        src="/logo.png"
        alt={siteTitle} 
        style={{ height: '67px', width: 'auto', objectFit: 'contain' }}
        onError={(e) => { e.target.style.display = 'none'; }} 
      />
    </Link>
  );
};

export default Logo;