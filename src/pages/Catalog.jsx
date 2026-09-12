import React, { useState, useEffect, useRef } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext';
import { usePageContent } from '../content/usePageContent';
import { useData } from '../context/DataContext';

const CATEGORY_EN = {
  '사료': 'Feed',
  '간식': 'Treats',
  '모래': 'Litter',
  '용품': 'Supplies'
};

const CATEGORIES = ['전체', '사료', '간식', '모래', '용품'];

export default function Catalog() {
  const { lang } = useLanguage();
  const { brands, products } = useData();
  const isEn = lang === 'en';
  const { txt, img } = usePageContent('catalog'); // 관리자 페이지에서 고칠 수 있는 문구/사진
  const [searchParams] = useSearchParams();

  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '전체');
  const [selectedBrand, setSelectedBrand] = useState(searchParams.get('brand') || '전체');
  const [view, setView] = useState('grid');
  const resultsRef = useRef(null);
  const isFirst = useRef(true);

  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false;
      return;
    }
    // 필터 변경 시 결과 목록 상단으로
    resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [selectedCategory, selectedBrand]);

  const matches = (p) =>
    (selectedCategory === '전체' || p.category === selectedCategory) &&
    (selectedBrand === '전체' || p.brandId === selectedBrand);

  const filtered = products.filter(matches);

  const countByCategory = (cat) =>
    products.filter(
      (p) => (cat === '전체' || p.category === cat) && (selectedBrand === '전체' || p.brandId === selectedBrand)
    ).length;

  const countByBrand = (id) =>
    products.filter(
      (p) => (id === '전체' || p.brandId === id) && (selectedCategory === '전체' || p.category === selectedCategory)
    ).length;

  const brandName = (id) => {
    const b = brands.find((x) => x.id === id);
    return isEn ? b?.nameEn || b?.nameKo : b?.nameKo;
  };

  const fallback = (e, brandId) => {
    e.target.onerror = null;
    const b = brands.find((x) => x.id === brandId);
    if (b?.logo) e.target.src = b.logo;
    else e.target.style.visibility = 'hidden';
  };

  return (
    <div className="daesang-sub-page">
      <section
        className="daesang-sub-hero"
        style={{
          backgroundImage: `url('${img('heroImage')}')`
        }}
      >
        <div className="daesang-sub-hero-content">
          <span className="daesang-poetic-sub">{txt('heroEyebrow')}</span>
          <h1 className="cms-text">{txt('heroTitle')}</h1>
          <p className="cms-text">
            {txt('heroBody')}
          </p>
        </div>
      </section>

      <section className="daesang-white-section">
        <div className="daesang-container-wide">
          <div className="cat-layout">
            {/* ===== 좌측 필터 레일 ===== */}
            <aside className="cat-rail">
              <div className="cat-rail-group">
                <h4>{isEn ? 'Category' : '카테고리'}</h4>
                <div className="cat-rail-list">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      className={`cat-rail-btn ${selectedCategory === cat ? 'on' : ''}`}
                      onClick={() => setSelectedCategory(cat)}
                    >
                      <span>{cat === '전체' ? (isEn ? 'All' : '전체') : isEn ? CATEGORY_EN[cat] : cat}</span>
                      <small>{String(countByCategory(cat)).padStart(2, '0')}</small>
                    </button>
                  ))}
                </div>
              </div>

              <div className="cat-rail-group">
                <h4>{isEn ? 'Brand' : '브랜드'}</h4>
                <div className="cat-rail-list">
                  <button
                    className={`cat-rail-btn ${selectedBrand === '전체' ? 'on' : ''}`}
                    onClick={() => setSelectedBrand('전체')}
                  >
                    <span>{isEn ? 'All brands' : '전체 브랜드'}</span>
                    <small>{String(countByBrand('전체')).padStart(2, '0')}</small>
                  </button>
                  {brands.map((b) => (
                    <button
                      key={b.id}
                      className={`cat-rail-btn ${selectedBrand === b.id ? 'on' : ''}`}
                      onClick={() => setSelectedBrand(b.id)}
                    >
                      <span>{isEn ? b.nameEn || b.nameKo : b.nameKo}</span>
                      <small>{String(countByBrand(b.id)).padStart(2, '0')}</small>
                    </button>
                  ))}
                </div>
              </div>
            </aside>

            {/* ===== 결과 ===== */}
            <div ref={resultsRef}>
              <div className="cat-toolbar">
                <span className="cat-count">
                  <b>{String(filtered.length).padStart(2, '0')}</b> {isEn ? 'products' : '개 제품'}
                  {selectedCategory !== '전체' && ` · ${isEn ? CATEGORY_EN[selectedCategory] : selectedCategory}`}
                  {selectedBrand !== '전체' && ` · ${brandName(selectedBrand)}`}
                </span>
                <div className="cat-view">
                  <button className={view === 'grid' ? 'on' : ''} onClick={() => setView('grid')}>
                    {isEn ? 'Grid' : '그리드'}
                  </button>
                  <button className={view === 'list' ? 'on' : ''} onClick={() => setView('list')}>
                    {isEn ? 'List' : '리스트'}
                  </button>
                </div>
              </div>

              {view === 'grid' ? (
                <div className="cat-grid">
                  {filtered.map((p) => (
                    <Link to={`/catalog/${p.id}`} key={p.id} className="cat-tile">
                      <div className="cat-tile-media">
                        <img src={p.image} alt={p.nameKo} onError={(e) => fallback(e, p.brandId)} />
                      </div>
                      <span className="cat-tile-brand">{brandName(p.brandId)}</span>
                      <h3>{isEn ? p.nameEn : p.nameKo}</h3>
                      <p className="cat-tile-spec">{p.spec || (isEn ? 'See specification' : '규격 정보 참조')}</p>
                      <div className="cat-tile-foot">
                        <span>{isEn ? CATEGORY_EN[p.category] || p.category : p.category}</span>
                        <i>→</i>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="cat-list">
                  {filtered.map((p) => (
                    <Link to={`/catalog/${p.id}`} key={p.id} className="cat-line">
                      <div className="cat-line-thumb">
                        <img src={p.image} alt="" onError={(e) => fallback(e, p.brandId)} />
                      </div>
                      <span className="cat-line-name">{isEn ? p.nameEn : p.nameKo}</span>
                      <span className="cat-line-brand">{brandName(p.brandId)}</span>
                      <span className="cat-line-spec">{p.spec}</span>
                      <span className="cat-line-arrow">→</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
