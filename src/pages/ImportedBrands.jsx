// 이 파일은 "수입 브랜드" 페이지입니다 (주소: /imported-brands).
// (주)부명이 국내에 유통하는 해외 수입 브랜드(type이 'imported'인 브랜드)를 카드 목록으로 보여줍니다.
// Brands.jsx와 구조가 거의 동일하되, 필터 조건과 링크 대상 경로만 다릅니다.
import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext';
import { usePageContent } from '../content/usePageContent';
import { useData } from '../context/DataContext';

export default function ImportedBrands() {
  const { lang } = useLanguage();
  const { brands: allBrands } = useData();
  const brands = allBrands.filter(b => b.type === 'imported'); // 수입 브랜드만 필터링
  const isEn = lang === 'en';
  const { txt, img } = usePageContent('importedBrands'); // 관리자 페이지에서 고칠 수 있는 문구/사진

  return (
    <div className="daesang-sub-page">
      {/* SECTION: 페이지 상단 히어로 배너 (제목/부제) */}
      <section className="daesang-sub-hero" style={{ backgroundImage: `url('${img('heroImage')}')` }}>
        <div className="daesang-section-overlay"></div>
        <div className="daesang-sub-hero-content">
          <span className="daesang-poetic-sub">{txt('heroEyebrow')}</span>
          <h1>{txt('heroTitle')}</h1>
          <p>{txt('heroBody')}</p>
        </div>
      </section>

      {/* SECTION: 브랜드 카드 그리드 (클릭 시 각 브랜드 상세 페이지로 이동) */}
      <section className="daesang-white-section">
        <div className="daesang-container-wide">
          <div className="daesang-grid-brands-page">
            {brands.map((b, idx) => (
              <Link to={`/imported-brands/${b.id}`} key={b.id} className="daesang-brand-card-detailed">
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
