import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext';
import { brands } from '../data/brands';
import { products } from '../data/products';
import './HomeOption3.css';

export default function HomeOption3() {
  const { lang } = useLanguage();
  const isEn = lang === 'en';

  return (
    <div className="layout-option3">
      {/* 1. Gallery Mosaic Hero */}
      <section className="opt3-hero">
        <div className="container opt3-hero-inner">
          <div className="opt3-hero-text">
            <span className="opt3-pill">{isEn ? 'PREMIUM PET BRAND STUDIO' : '프리미엄 펫 브랜드 스튜디오'}</span>
            <h1>
              {isEn ? 'Crafting Happiness for Every Pet Moment' : '반려동물의 모든 순간을 빛나게 만드는 프리미엄 라이프'}
            </h1>
            <p>
              {isEn 
                ? 'Discover our curated portfolio of nutrition, treats, and lifestyle products for dogs and cats.'
                : '(주)부명이 선보이는 8개 전문 펫 브랜드의 완벽한 영양과 라이프스타일 큐레이션.'}
            </p>
            <div className="opt3-cta-group">
              <Link to="/brands" className="opt3-btn-main">
                {isEn ? 'Explore Brand Studio' : '브랜드 스튜디오 둘러보기'}
              </Link>
              <Link to="/catalog" className="opt3-btn-sub">
                {isEn ? 'Catalog Search' : '제품 검색'}
              </Link>
            </div>
          </div>

          <div className="opt3-mosaic-grid">
            {brands.slice(0, 4).map((b, i) => (
              <Link to={`/brands/${b.id}`} key={b.id} className={`opt3-mosaic-card card-pos-${i+1}`} style={{ '--accent-color': b.color }}>
                {b.hasLogo ? (
                  <img src={b.logo} alt={b.nameEn} className="opt3-mosaic-logo" />
                ) : (
                  <h3>{b.nameKo}</h3>
                )}
                <span className="opt3-card-tag">{b.tagline}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Pet Lifestyle Category Cards */}
      <section className="opt3-categories-section">
        <div className="container">
          <div className="opt3-title-center">
            <h2>{isEn ? 'Pet Life Solutions' : '반려동물 라이프 솔루션'}</h2>
            <p>{isEn ? 'Tailored category solutions for nutrition, care, and comfort.' : '사료, 간식, 위생용품까지 체계적인 분류를 제공합니다.'}</p>
          </div>

          <div className="opt3-categories-wheel">
            {[
              { id: '사료', nameKo: '프리미엄 사료', nameEn: 'Feed & Nutrition', descKo: '균형잡힌 맞춤 영양식', descEn: 'Balanced Nutrition', icon: '🍲' },
              { id: '간식', nameKo: '기능성 간식', nameEn: 'Healthy Treats', descKo: '기호성 높은 건강 스낵', descEn: 'Delicious Snack', icon: '🍖' },
              { id: '모래', nameKo: '고양이 모래', nameEn: 'Cat Litter', descKo: '쾌적하고 먼지 없는 벤토나이트', descEn: 'Dust-free Bentonite', icon: '✨' },
              { id: '용품', nameKo: '케어 & 용품', nameEn: 'Care & Supplies', descKo: '반려생활 필수 아이템', descEn: 'Essential Supplies', icon: '🧸' },
            ].map(cat => (
              <Link to={`/catalog?category=${cat.id}`} key={cat.id} className="opt3-cat-box">
                <div className="opt3-cat-icon">{cat.icon}</div>
                <h3>{isEn ? cat.nameEn : cat.nameKo}</h3>
                <p>{isEn ? cat.descEn : cat.descKo}</p>
                <span className="opt3-count">
                  {products.filter(p => p.category === cat.id).length} {isEn ? 'Items' : '개 제품'}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Featured Best Sellers Grid */}
      <section className="opt3-bestsellers">
        <div className="container">
          <div className="opt3-flex-title">
            <div>
              <h2>{isEn ? 'Featured Product Showcase' : '주요 제품 스포트라이트'}</h2>
              <p>{isEn ? 'Popular B2B products trusted by domestic and overseas partners.' : '국내외 바이어들에게 가장 각광받는 부명의 하이라이트 제품입니다.'}</p>
            </div>
            <Link to="/catalog" className="opt3-more-link">{isEn ? 'View All →' : '전체보기 →'}</Link>
          </div>

          <div className="opt3-product-grid">
            {products.slice(0, 4).map(p => {
              const b = brands.find(brand => brand.id === p.brandId);
              return (
                <Link to={`/catalog/${p.id}`} key={p.id} className="opt3-p-card">
                  <div className="opt3-p-img" style={{ background: `linear-gradient(135deg, ${b?.color || '#0284C7'}15 0%, ${b?.color || '#0284C7'}30 100%)` }}>
                    {b?.hasLogo ? (
                      <img src={b.logo} alt={b.nameEn} className="opt3-p-logo" />
                    ) : (
                      <span className="opt3-p-icon">🐾</span>
                    )}
                  </div>
                  <div className="opt3-p-body">
                    <span className="opt3-p-brand">{isEn ? (b?.nameEn || b?.nameKo) : b?.nameKo}</span>
                    <h4>{isEn ? p.nameEn : p.nameKo}</h4>
                    <p>{p.spec}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
