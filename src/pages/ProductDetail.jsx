import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext';
import { useData } from '../context/DataContext';
import Reveal from '../components/Reveal';

const categoryEnMap = { '사료': 'Feed', '간식': 'Treats', '모래': 'Litter', '용품': 'Supplies' };
const petTypeEnMap = { dog: 'Dog', cat: 'Cat' };
const nutritionLabelMap = {
  protein: { ko: '조단백', en: 'Crude Protein' },
  fat: { ko: '조지방', en: 'Crude Fat' },
  fiber: { ko: '조섬유', en: 'Crude Fiber' },
  moisture: { ko: '수분', en: 'Moisture' },
  ash: { ko: '조회분', en: 'Crude Ash' },
  calcium: { ko: '칼슘', en: 'Calcium' },
  phosphorus: { ko: '인', en: 'Phosphorus' }
};

export default function ProductDetail() {
  const { productId } = useParams();
  const { lang } = useLanguage();
  const { brands, products } = useData();

  const product = products.find((p) => p.id === productId);
  if (!product) return <Navigate to="/catalog" replace />;

  const isEn = lang === 'en';
  const brand = brands.find((b) => b.id === product.brandId);

  const related = products.filter((p) => p.brandId === product.brandId && p.id !== product.id).slice(0, 4);

  const rawFeatures = Array.isArray(product.features)
    ? product.features
    : product.features
    ? product.features.split('\n')
    : [];
  const features = isEn ? product.featuresEn || rawFeatures : rawFeatures;

  const shelfLife = isEn ? product.shelfLifeEn || '18 months from manufacturing date' : product.shelfLife;
  const origin = isEn ? product.originEn || 'Republic of Korea' : product.origin;
  const ingredients = isEn ? product.ingredientsEn || product.ingredients : product.ingredients;

  // 값이 비어있는 항목은 표에 빈 줄로 남지 않도록 걸러낸다 (예전에 저장된 데이터 대비)
  const nutritionEntries = Object.entries(product.nutrition || {}).filter(([, v]) => v && String(v).trim());
  const showNutrition = nutritionEntries.length > 0 && (product.category === '사료' || product.category === '간식');

  const facts = [
    { k: isEn ? 'Code' : '상품코드', v: product.code },
    { k: isEn ? 'Spec' : '규격', v: product.spec || (isEn ? 'See specification' : '규격 정보 참조') },
    { k: isEn ? 'Shelf life' : '유통기한', v: shelfLife },
    { k: isEn ? 'Origin' : '제조국', v: origin },
    { k: isEn ? 'Category' : '카테고리', v: isEn ? categoryEnMap[product.category] || product.category : product.category },
    { k: isEn ? 'For' : '대상', v: isEn ? petTypeEnMap[product.petType] || product.petType : product.petType === 'dog' ? '강아지' : '고양이' }
  ].filter((f) => f.v);

  return (
    <div className="pd-split">
      {/* 좌: 화면에 고정되는 제품 이미지 */}
      <div className="pd-media">
        <img
          src={product.image}
          alt={product.nameKo}
          onError={(e) => {
            e.target.onerror = null;
            if (brand?.logo) e.target.src = brand.logo;
          }}
        />
      </div>

      {/* 우: 스크롤되는 정보 (탭 없이 한 흐름) */}
      <div className="pd-body">
        <div className="pd-crumb">
          <Link to="/catalog">{isEn ? 'Catalog' : '카탈로그'}</Link>
          {' / '}
          <Link to={`/brands/${brand?.id}`}>{isEn ? brand?.nameEn || brand?.nameKo : brand?.nameKo}</Link>
        </div>

        <Reveal as="span" className="pd-brand">
          {isEn ? brand?.nameEn || brand?.nameKo : brand?.nameKo}
        </Reveal>
        <Reveal as="h1" className="pd-title" delay={1}>
          {isEn ? product.nameEn : product.nameKo}
        </Reveal>

        <Reveal delay={2}>
          <dl className="pd-facts">
            {facts.map((f) => (
              <div className="pd-fact" key={f.k}>
                <dt>{f.k}</dt>
                <dd>{f.v}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        {features.length > 0 && (
          <Reveal className="pd-block">
            <h3>{isEn ? 'Key features' : '제품 특징'}</h3>
            {features.map((f, i) => (
              <div className="pd-feature" key={i}>
                <i>{String(i + 1).padStart(2, '0')}</i>
                <span>{f}</span>
              </div>
            ))}
          </Reveal>
        )}

        {ingredients && (
          <Reveal className="pd-block">
            <h3>{isEn ? 'Main ingredients' : '사용 원료'}</h3>
            <p className="pd-ing">{ingredients}</p>
          </Reveal>
        )}

        {Array.isArray(product.infoImages) && product.infoImages.length > 0 && (
          <Reveal className="pd-block">
            <h3>{isEn ? 'Detail images' : '상세 이미지'}</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {product.infoImages.map((src, idx) => (
                <img
                  key={idx}
                  src={src}
                  alt={`${isEn ? product.nameEn : product.nameKo} ${idx + 1}`}
                  style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
                />
              ))}
            </div>
          </Reveal>
        )}

        <Reveal className="pd-block">
          {product.purchaseUrl ? (
            <a href={product.purchaseUrl} target="_blank" rel="noopener noreferrer" className="cine-link solid">
              {isEn ? 'Buy Now' : '바로 구매하기'} ↗
            </a>
          ) : (
            <span className="cine-link" style={{ opacity: 0.5, cursor: 'not-allowed' }}>
              {isEn ? 'Buy Now (Coming Soon)' : '바로 구매하기 (준비중)'}
            </span>
          )}
        </Reveal>

        {showNutrition && (
          <Reveal className="pd-block">
            <h3>{isEn ? 'Guaranteed analysis' : '등록 성분량'}</h3>
            <dl className="pd-nutri">
              {nutritionEntries.map(([k, v]) => (
                <div key={k}>
                  <dt>{nutritionLabelMap[k] ? (isEn ? nutritionLabelMap[k].en : nutritionLabelMap[k].ko) : k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        )}

        {related.length > 0 && (
          <div className="pd-related">
            <h3 style={{ fontSize: '0.68rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '22px' }}>
              {isEn ? 'More from this brand' : '같은 브랜드의 다른 제품'}
            </h3>
            <div className="pd-related-grid">
              {related.map((rp) => (
                <Link to={`/catalog/${rp.id}`} key={rp.id} className="pd-related-card">
                  <div className="thumb">
                    <img
                      src={rp.image}
                      alt=""
                      onError={(e) => {
                        e.target.onerror = null;
                        if (brand?.logo) e.target.src = brand.logo;
                      }}
                    />
                  </div>
                  <span>{isEn ? rp.nameEn : rp.nameKo}</span>
                </Link>
              ))}
            </div>
          </div>
        )}

        <div style={{ marginTop: '48px' }}>
          <Link to="/catalog" className="cine-link">
            ← {isEn ? 'Back to catalog' : '카탈로그로 돌아가기'}
          </Link>
        </div>
      </div>
    </div>
  );
}
