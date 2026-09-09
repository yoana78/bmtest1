import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext';
import { brands } from '../data/brands';
import { products } from '../data/products';
import './HomeOption2.css';

export default function HomeOption2() {
  const { lang } = useLanguage();
  const [selectedBrand, setSelectedBrand] = useState(brands[0].id);
  const isEn = lang === 'en';

  const activeBrand = brands.find(b => b.id === selectedBrand) || brands[0];
  const brandProducts = products.filter(p => p.brandId === activeBrand.id);

  return (
    <div className="layout-option2">
      {/* 1. Split Hero Section */}
      <section className="opt2-hero">
        <div className="opt2-hero-left">
          <span className="opt2-badge">{isEn ? 'GLOBAL PET B2B LEADER' : '글로벌 펫 B2B 전문기업'}</span>
          <h1>
            {isEn ? 'Pioneering Better Pet Lives Worldwide' : '(주)부명이 이끄는 반려동물 헬스케어 & 제조의 미래'}
          </h1>
          <p>
            {isEn 
              ? 'Comprehensive OEM/ODM, manufacturing, and global export infrastructure trusted by top distributors.' 
              : '자체 제조 시설과 엄격한 품질 관리를 기반으로 국내외 유통 파트너에게 최상의 펫 솔루션을 제공합니다.'}
          </p>
          <div className="opt2-hero-actions">
            <Link to="/contact" className="opt2-btn-primary">
              {isEn ? 'Inquire B2B Partnership' : 'B2B 입점/수출 문의하기'}
            </Link>
            <Link to="/catalog" className="opt2-btn-ghost">
              {isEn ? 'Browse Catalog →' : '전체 카탈로그 보기 →'}
            </Link>
          </div>
        </div>

        <div className="opt2-hero-right">
          <div className="opt2-hero-card" style={{ borderTop: `4px solid ${activeBrand.color || '#1B3A91'}` }}>
            <div className="opt2-card-header">
              <span className="opt2-spotlight-tag">{isEn ? 'BRAND SPOTLIGHT' : '대표 브랜드 스포트라이트'}</span>
              {activeBrand.hasLogo ? (
                <img src={activeBrand.logo} alt={activeBrand.nameEn} className="opt2-spotlight-logo" />
              ) : (
                <h2 style={{ color: activeBrand.color }}>{activeBrand.nameKo}</h2>
              )}
            </div>
            <h3>{isEn ? activeBrand.nameEn : activeBrand.nameKo}</h3>
            <p>{isEn ? activeBrand.descriptionEn : activeBrand.descriptionKo}</p>
            <div className="opt2-card-footer">
              <span>{isEn ? `${brandProducts.length} Products Available` : `보유 제품 ${brandProducts.length}개`}</span>
              <Link to={`/brands/${activeBrand.id}`} className="opt2-link" style={{ color: activeBrand.color || '#1B3A91' }}>
                {isEn ? 'Brand Details →' : '브랜드 상세보기 →'}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Key Business Metrics Stat Bar */}
      <section className="opt2-stats-bar">
        <div className="container opt2-stats-grid">
          <div className="stat-item">
            <span className="stat-number">7+</span>
            <span className="stat-label">{isEn ? 'Global Brands' : '독자 브랜드 라인업'}</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">100%</span>
            <span className="stat-label">{isEn ? 'Strict Quality Inspection' : '엄격한 품질 관리'}</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">16+</span>
            <span className="stat-label">{isEn ? 'Core Product Lines' : '주요 대표 제품군'}</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">B2B</span>
            <span className="stat-label">{isEn ? 'Export & Retail Ready' : '국내외 유통망 연동'}</span>
          </div>
        </div>
      </section>

      {/* 3. Interactive Brand Showcase (Tab Layout) */}
      <section className="opt2-brands-section">
        <div className="container">
          <div className="opt2-section-head">
            <h2>{isEn ? 'Brand Ecosystem' : '(주)부명 브랜드 포트폴리오'}</h2>
            <p>{isEn ? 'Select a brand to explore product lines.' : '브랜드를 선택하시면 세부 특장점을 확인하실 수 있습니다.'}</p>
          </div>

          <div className="opt2-brand-tabs">
            {brands.map(b => (
              <button 
                key={b.id} 
                className={`opt2-tab-btn ${selectedBrand === b.id ? 'active' : ''}`}
                onClick={() => setSelectedBrand(b.id)}
                style={{ '--active-color': b.color || '#1B3A91' }}
              >
                {isEn ? (b.nameEn || b.nameKo) : b.nameKo}
              </button>
            ))}
          </div>

          <div className="opt2-brand-showcase-box">
            <div className="opt2-showcase-info">
              <h3>{isEn ? activeBrand.nameEn : activeBrand.nameKo}</h3>
              <span className="opt2-tagline">{activeBrand.tagline}</span>
              <p>{isEn ? activeBrand.descriptionEn : activeBrand.descriptionKo}</p>
              <Link to={`/catalog?brand=${activeBrand.id}`} className="btn btn-primary">
                {isEn ? `View All ${activeBrand.nameEn} Products` : `${activeBrand.nameKo} 전체 제품 카탈로그`}
              </Link>
            </div>
            
            <div className="opt2-showcase-products">
              {brandProducts.slice(0, 3).map(p => (
                <Link to={`/catalog/${p.id}`} key={p.id} className="opt2-product-preview-card">
                  <div className="opt2-preview-icon">
                    {p.category === '사료' ? '🍲' : p.category === '간식' ? '🍖' : '✨'}
                  </div>
                  <h4>{isEn ? p.nameEn : p.nameKo}</h4>
                  <span>{p.spec}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. Partner Logos Grid */}
      <section className="opt2-partners">
        <div className="container">
          <h4>{isEn ? 'TRUSTED DISTRIBUTION PARTNERS' : '함께하는 대표 유통 파트너'}</h4>
          <div className="opt2-partner-logos">
            <span>이마트</span>
            <span>홈플러스</span>
            <span>이마트24</span>
            <span>세븐일레븐</span>
          </div>
        </div>
      </section>
    </div>
  );
}
