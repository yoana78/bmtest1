import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext';
import { usePageContent } from '../content/usePageContent';
import { useData } from '../context/DataContext';

export default function Brands() {
  const { lang } = useLanguage();
  const { brands: allBrands } = useData();
  const brands = allBrands.filter(b => b.type !== 'imported'); // 자사 브랜드만 필터링
  const isEn = lang === 'en';
  const { txt, img } = usePageContent('brands'); // 관리자 페이지에서 고칠 수 있는 문구/사진

  return (
    <div className="daesang-sub-page">
      {/* Sub Page Hero */}
      <section className="daesang-sub-hero" style={{ backgroundImage: `url('${img('heroImage')}')` }}>
        <div className="daesang-section-overlay"></div>
        <div className="daesang-sub-hero-content">
          <span className="daesang-poetic-sub">{txt('heroEyebrow')}</span>
          <h1>{txt('heroTitle')}</h1>
          <p>{txt('heroBody')}</p>
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
