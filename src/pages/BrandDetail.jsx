import React from 'react';
import { useParams, Link, Navigate, useLocation } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext';
import { useData } from '../context/DataContext';

const CATEGORY_EN = { '사료': 'Feed', '간식': 'Treats', '모래': 'Litter', '용품': 'Supplies' };

// /brands/:brandId 와 /imported-brands/:brandId 양쪽 경로에서 공용으로 쓰이는 브랜드 상세 페이지
const BrandDetail = () => {
  const { brandId } = useParams();
  const { lang } = useLanguage();
  const location = useLocation();
  const { brands, products } = useData();
  const isImportedRoute = location.pathname.startsWith('/imported-brands');

  const brand = brands.find(b => b.id === brandId);
  if (!brand) return <Navigate to={isImportedRoute ? '/imported-brands' : '/brands'} replace />;

  const isEn = lang === 'en';
  const brandProducts = products.filter(p => p.brandId === brand.id);

  return (
    <div className="daesang-sub-page">
      <section
        className="daesang-sub-hero"
        style={{ backgroundColor: brand.color || '#1B3A91', backgroundImage: 'none' }}
      >
        <div className="daesang-sub-hero-content">
          <span className="daesang-poetic-sub">{isEn ? 'Brand' : '브랜드'}</span>
          {brand.hasLogo ? (
            <img src={brand.logo} alt={isEn ? brand.nameEn : brand.nameKo} style={{ height: '48px', objectFit: 'contain', background: '#FFFFFF', borderRadius: '8px', padding: '8px 14px', marginBottom: '16px' }} />
          ) : null}
          <h1>{isEn ? brand.nameEn : brand.nameKo}</h1>
          <p>{brand.tagline}</p>
        </div>
      </section>

      <section className="daesang-white-section">
        <div className="daesang-container-wide">
          <div className="cine-head">
            <h2>{isEn ? 'Brand Story' : '브랜드 스토리'}</h2>
            <p>
              {isEn
                ? 'Aiming for a healthy life for pets through top quality and innovative research. We satisfy both customers and pets through strict quality control and reliable ingredients.'
                : '최고의 품질과 혁신적인 연구로 반려동물의 건강한 삶을 지향합니다. 엄격한 품질 관리와 믿을 수 있는 원료를 통해 고객과 반려동물 모두에게 만족을 드립니다.'}
            </p>
          </div>

          {brandProducts.length === 0 ? (
            <p style={{ color: 'var(--dh-text-muted, #666)', padding: '24px 0' }}>
              {isEn ? 'Products for this brand will be added soon.' : '해당 브랜드의 제품이 곧 추가될 예정입니다.'}
            </p>
          ) : (
          <div className="cat-grid">
            {brandProducts.map(product => (
              <Link to={`/catalog/${product.id}`} key={product.id} className="cat-tile">
                <div className="cat-tile-media">
                  <img
                    src={product.image}
                    alt={product.nameKo}
                    onError={(e) => {
                      e.target.onerror = null;
                      if (brand.logo) e.target.src = brand.logo;
                      else e.target.style.visibility = 'hidden';
                    }}
                  />
                </div>
                <span className="cat-tile-brand">{isEn ? brand.nameEn || brand.nameKo : brand.nameKo}</span>
                <h3>{isEn ? product.nameEn : product.nameKo}</h3>
                <p className="cat-tile-spec">{product.spec || (isEn ? 'See specification' : '규격 정보 참조')}</p>
                <div className="cat-tile-foot">
                  <span>{isEn ? CATEGORY_EN[product.category] || product.category : product.category}</span>
                  <i>→</i>
                </div>
              </Link>
            ))}
          </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default BrandDetail;
