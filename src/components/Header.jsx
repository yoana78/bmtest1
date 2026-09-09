import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext';

const items = [
  { to: '/', ko: '홈', en: 'Home', end: true },
  { to: '/about', ko: '회사소개', en: 'About' },
  { to: '/brands', ko: '브랜드', en: 'Brands' },
  { to: '/imported-brands', ko: '수입브랜드', en: 'Imported Brands' },
  { to: '/catalog', ko: '제품 카탈로그', en: 'Products' },
  { to: '/trust', ko: '신뢰와 인증', en: 'Trust' }
];

export default function Header() {
  const { lang, toggleLang } = useLanguage();
  const isEn = lang === 'en';
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => { setMenuOpen(false); }, [location.pathname]);

  return (
    <>
    <header className="topbar">
      <div className="topbar-accent" />
      <div className="topbar-inner">
        <Link to="/" className="topbar-logo">
          <img src="./assets/boomyung_ci_logo.png" alt="BOOMYUNG" />
          <span className="topbar-logo-text">{isEn ? 'BOOMYUNG' : '(주)부명'}</span>
        </Link>

        <nav className="topbar-nav">
          {items.map((it) => (
            <NavLink
              key={it.to}
              to={it.to}
              end={it.end}
              className={({ isActive }) => `topbar-item ${isActive ? 'active' : ''}`}
            >
              {isEn ? it.en : it.ko}
            </NavLink>
          ))}
        </nav>

        <div className="topbar-right">
          <button className="topbar-lang" onClick={toggleLang}>
            {isEn ? 'KR' : 'EN'}
          </button>
          <Link to="/contact" className="topbar-cta">
            {isEn ? 'Contact' : '문의하기'}
          </Link>
          <button
            className={`topbar-burger ${menuOpen ? 'open' : ''}`}
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Menu"
          >
            <span /><span /><span />
          </button>
        </div>
      </div>
    </header>

    <div className={`topbar-drawer ${menuOpen ? 'open' : ''}`}>
      {items.map((it, i) => (
        <NavLink
          key={it.to}
          to={it.to}
          end={it.end}
          className={({ isActive }) => `topbar-drawer-item ${isActive ? 'active' : ''}`}
          style={{ transitionDelay: `${i * 0.04}s` }}
        >
          <span className="topbar-drawer-num">{String(i + 1).padStart(2, '0')}</span>
          {isEn ? it.en : it.ko}
        </NavLink>
      ))}
      <Link to="/contact" className="topbar-drawer-cta" style={{ transitionDelay: `${items.length * 0.04}s` }}>
        {isEn ? 'Contact' : '문의하기'} →
      </Link>
    </div>
    </>
  );
}
