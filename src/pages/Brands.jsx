import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext';
import { useData } from '../context/DataContext';

export default function Brands() {
  const { lang } = useLanguage();
  const { brands: allBrands } = useData();
  const brands = allBrands.filter(b => b.type !== 'imported'); // 자사 브랜드만 필터링
  const isEn = lang === 'en';

  return (
    <div className="daesang-sub-page">
      {/* Sub Page Hero */}
      <section className="daesang-sub-hero" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=2560&q=80')" }}>
        <div className="daesang-section-overlay"></div>
        <div className="daesang-sub-hero-content">
          <span className="daesang-poetic-sub">OUR PORTFOLIO</span>
          <h1>{isEn ? 'Brand Ecosystem' : '브랜드 포트폴리오'}</h1>
          <p>{isEn ? 'Discover our specialized brands tailored for healthy pet life.' : '(주)부명의 전문 펫 브랜드 라인업을 소개합니다.'}</p>
        </div>
      </section>

      {/* Brands Grid Section */}
      <section className="daesang-white-section">
        <div className="daesang-container-wide">
          <div className="daesang-grid-brands-page">
            {brands.map((b, idx) => (
              <Link to={`/brands/${b.id}`} key={b.id} className="daesang-brand-card-detailed">
                <div className="brand-card-logo">
                  {b.hasLogo ? (
                    <img src={b.logo} alt={b.nameEn} />
                  ) : (
                    <h3 style={{ color: b.color, fontSize: '1.8rem' }}>{b.nameKo}</h3>
                  )}
                </div>
                <div className="brand-card-info">
                  <span className="brand-card-num">0{idx + 1}</span>
                  <h2>{isEn ? (b.nameEn || b.nameKo) : b.nameKo}</h2>
                  <span className="brand-card-tagline">{isEn ? (b.taglineEn || b.tagline) : b.tagline}</span>
                  <p>{isEn ? b.descriptionEn : b.descriptionKo}</p>
                  <span className="brand-card-link">{isEn ? 'VIEW PRODUCTS' : '브랜드 세부보기'} _</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
