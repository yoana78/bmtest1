import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext';

const items = [
  { to: '/', ko: '홈', en: 'Home', end: true },
  { to: '/about', ko: '회사소개', en: 'About' },
  { to: '/brands', ko: '브랜드', en: 'Brands' },
  { to: '/catalog', ko: '제품', en: 'Products' },
  { to: '/trust', ko: '인증', en: 'Trust' },
  { to: '/contact', ko: '문의', en: 'Contact' }
];

export default function RailNav() {
  const { lang, toggleLang } = useLanguage();
  const isEn = lang === 'en';

  return (
    <aside className="rail">
      <Link to="/" className="rail-logo">
        <img src="./assets/boomyung_ci_logo.png" alt="BOOMYUNG" />
        <span className="rail-logo-text">
          <b>{isEn ? 'BOOMYUNG' : '(주)부명'}</b>
          <small>CO., LTD.</small>
        </span>
      </Link>

      <nav className="rail-menu">
        {items.map((it, i) => (
          <NavLink
            key={it.to}
            to={it.to}
            end={it.end}
            className={({ isActive }) => `rail-item ${isActive ? 'active' : ''}`}
          >
            <span className="rail-num">{String(i + 1).padStart(2, '0')}</span>
            <span className="rail-label">{isEn ? it.en : it.ko}</span>
          </NavLink>
        ))}
      </nav>

      <div className="rail-foot">
        <button className="rail-lang" onClick={toggleLang}>
          <span className="rail-lang-glyph">⌘</span>
          <span className="rail-lang-text">{isEn ? '한국어로 보기' : 'View in English'}</span>
        </button>
      </div>
    </aside>
  );
}
