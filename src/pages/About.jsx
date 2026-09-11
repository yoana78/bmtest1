import React, { useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';

const wellzenImages = [
  './assets/wellzen/wellzen_01.png',
  './assets/wellzen/wellzen_02.png',
  './assets/wellzen/wellzen_03.png'
];

const homadImages = [
  './assets/homad/homad_01.jpg',
  './assets/homad/homad_02.jpg',
  './assets/homad/homad_03.jpg',
  './assets/homad/homad_04.jpg'
];

const qingdaoImages = [
  './assets/china/qingdao-factory.jpg'
];

export default function About() {
  const { lang } = useLanguage();
  const isEn = lang === 'en';
  const [galleryImages, setGalleryImages] = useState(null);
  const [showLogisticsVideo, setShowLogisticsVideo] = useState(false);

  const historyItems = [
    {
      year: '2024 ~ Present',
      titleKo: '글로벌 네트워크 및 브랜드 확정',
      titleEn: 'Global Network & Brand Expansion',
      itemsKo: ['사료 간식 공장', 'R&D 연구소 체계 구축', '글로벌 OEM/ODM 공급 체인 확장'],
      itemsEn: ['Pet food & snack factory', 'Established R&D Center system', 'Expanded global OEM/ODM supply chain']
    },
    {
      year: '2023',
      titleKo: '품질 인증 및 제조 혁신',
      titleEn: 'Quality Certification & Manufacturing Innovation',
      itemsKo: ['ISO 22000 및 HACCP 인증 획득, 전용 생산 시설 및 자동화 설비 도입'],
      itemsEn: ['Obtained ISO 22000 & HACCP certifications, introduced specialized manufacturing & automation facilities']
    },
    {
      year: '2021',
      itemsKo: ['요기요 입점', 'CJ홈쇼핑 사료 입점', '하우펫 브랜드 런칭'],
      itemsEn: ['Listed on Yogiyo', 'Listed feed on CJ Home Shopping', 'Launched HOWPET brand']
    },
    {
      year: '2020',
      itemsKo: ['이마트24 전점 입점', '마켓컬리 입점'],
      itemsEn: ['Listed in all E-mart24 stores', 'Listed on Market Kurly']
    },
    {
      year: '2019',
      itemsKo: ['킴스클럽 25개점 입점', '메가마트 12개점 입점'],
      itemsEn: ['Listed in 25 Kim\'s Club stores', 'Listed in 12 Megamart stores']
    },
    {
      year: '2018',
      itemsKo: ['유망 중소기업 대상 수상', '공영홈쇼핑 사료 입점'],
      itemsEn: ['Won Promising SME Award', 'Listed feed on Public Home Shopping']
    },
    {
      year: '2017',
      itemsKo: ['농협 하나로마트 계약', '농협 목우촌 제조위탁 계약', '국내 로얄바이츠 사료공장 설립'],
      itemsEn: ['Contracted with NongHyup Hanaro Mart', 'Contracted manufacturing with NongHyup Mokwoochon', 'Established Royal Bites domestic feed factory']
    },
    {
      year: '2008',
      itemsKo: ['미국 월마트 수출'],
      itemsEn: ['Exported to Walmart USA']
    },
    {
      year: '2006',
      itemsKo: ['GS마트 전점 입점', '롯데슈퍼 전점 입점'],
      itemsEn: ['Listed in all GS Mart stores', 'Listed in all Lotte Super stores']
    },
    {
      year: '2002',
      itemsKo: ['이마트 전점 입점'],
      itemsEn: ['Listed in all E-mart stores']
    },
    {
      year: '1995',
      titleKo: '(주)부명 설립',
      titleEn: 'Establishment of BOOMYOUNG CO., LTD.',
      itemsKo: [],
      itemsEn: []
    }
  ];

  return (
    <div className="daesang-sub-page">
      {/* 1. 메인 서브 히어로 이미지 */}
      <section
        className="daesang-sub-hero"
        style={{
          background: "linear-gradient(rgba(10,37,64,0.55), rgba(10,37,64,0.55)), url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=2560&q=80') center/cover no-repeat #0A2540"
        }}
      >
        <div className="daesang-section-overlay"></div>
        <div className="daesang-sub-hero-content">
          <span className="daesang-poetic-sub">CORPORATE OVERVIEW &amp; CI</span>
          <h1>{isEn ? 'About Us' : '회사소개'}</h1>
          <p>
            {isEn
              ? 'Opening a happy tomorrow for pets and pet owners based on honest technology and trust accumulated over 30 years.'
              : '30년이상 축적된 정직한 기술과 신뢰를 바탕으로 반려동물과 반려인의 행복한 내일을 열어갑니다.'}
          </p>
        </div>
      </section>

      {/* 2. CEO 메시지 */}
      <section className="daesang-white-section">
        <div className="daesang-container-wide">
          <div className="daesang-sub-split">
            <div className="daesang-sub-left">
              <span className="daesang-brand-num">CEO MESSAGE</span>
              <h2>{isEn ? 'Dreaming of a happy world together with pets' : '반려동물과 함께 행복한 세상을 꿈꿉니다'}</h2>
              <div style={{ marginTop: '20px', padding: '16px', background: 'var(--dh-surface)', backdropFilter: 'blur(20px)', border: '1px solid var(--dh-border)', borderRadius: '12px', borderLeft: '4px solid var(--accent)' }}>
                <p style={{ fontWeight: '700', fontSize: '0.92rem', color: 'var(--dh-navy)' }}>
                  {isEn ? 'Seong-hoon Jeong, CEO' : '정성훈 대표이사'}
                </p>
                <p style={{ fontSize: '0.78rem', color: 'var(--dh-text-muted)', marginTop: '2px' }}>
                  {isEn ? '(주)BOOMYOUNG CO., LTD.' : '(주)부명 대표이사'}
                </p>
              </div>
            </div>
            <div className="daesang-sub-right">
              <p className="daesang-lead-text">
                {isEn
                  ? 'Hello, I am Seong-hoon Jeong, CEO of BOOMYOUNG CO., LTD.'
                  : '안녕하십니까. 부명(BOOMYOUNG CO., LTD.) 대표이사 정성훈입니다.'}
              </p>
              <p style={{ marginBottom: '14px' }}>
                {isEn
                  ? 'Under the goal of providing better products and services to both pets and pet owners, BOOMYOUNG operates across product planning, development, distribution, and logistics, centered around pet supplies.'
                  : '부명은 반려동물과 반려인 모두에게 더 나은 제품과 서비스를 제공한다는 목표 아래 반려동물용품을 중심으로 상품 기획, 개발, 유통 및 물류 전반의 사업을 운영하고 있습니다.'}
              </p>
              <p style={{ marginBottom: '14px' }}>
                {isEn
                  ? 'We closely analyze fast-changing pet market trends and consumer demands to introduce practical and high-quality products, maintaining sustainable growth built on stable partnerships with major domestic distribution channels.'
                  : '빠르게 변화하는 반려동물 시장의 트렌드와 소비자의 요구를 면밀히 분석하여 실용성과 품질을 갖춘 제품을 선보이고, 국내 주요 유통채널과의 안정적인 협력관계를 바탕으로 지속적인 성장을 이어가고 있습니다.'}
              </p>
              <p style={{ marginBottom: '14px', position: 'relative' }}>
                {isEn
                  ? 'Going forward, we will pursue management that satisfies both stores and customers based on trust, strengthening market leadership through solid planning and high-quality manufacturing capabilities. Thank you.'
                  : '앞으로도 신뢰를 바탕으로 하는 매장과 고객 모두가 만족할 수 있는 경영을 지향하며, 알찬 기획과 고품질 제조 역량으로 시장 지배력을 강화하고 가치 있는 미래를 만들어 가겠습니다. 감사합니다.'}
                <img
                  src="./assets/ceo_signature.png"
                  alt={isEn ? 'CEO Signature' : '대표이사 서명'}
                  style={{
                    position: 'absolute',
                    height: '60px',
                    objectFit: 'contain',
                    right: isEn ? '-10px' : '-18px',
                    bottom: '-22px',
                    pointerEvents: 'none'
                  }}
                />
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. 연혁 (History) */}
      <section className="daesang-gray-section">
        <div className="daesang-container-wide">
          <h2 className="daesang-section-h2">
            {isEn ? 'Company History' : '기업 연혁'}
          </h2>
          <div className="daesang-timeline">
            {historyItems.map((item, index) => {
              const title = isEn ? item.titleEn : item.titleKo;
              const items = isEn ? item.itemsEn : item.itemsKo;
              return (
                <div key={index} className="daesang-timeline-item">
                  <span className="timeline-dot" />
                  <span className="timeline-year">{item.year}</span>
                  <div className="timeline-content">
                    {title && <h4>{title}</h4>}
                    {items.length > 1 ? (
                      <ul className="timeline-list">
                        {items.map((line, i) => <li key={i}>{line}</li>)}
                      </ul>
                    ) : items.length === 1 ? (
                      <p>{items[0]}</p>
                    ) : null}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. 인프라 */}
      <section className="daesang-white-section">
        <div className="daesang-container-wide">
          <h2 className="daesang-section-h2">
            {isEn ? 'Infrastructure' : '생산 및 R&D 인프라'}
          </h2>
          <div className="daesang-trust-grid">
            <div className="daesang-trust-card" onClick={() => setGalleryImages(homadImages)} style={{ cursor: 'pointer' }}>
              <span className="trust-code">KOREA FACTORY</span>
              <h3>{isEn ? 'Pet Food & Snack Factory' : '사료 및 간식 공장'}</h3>
              <p>
                {isEn
                  ? 'Pet food and food manufacturing facility holding ISO 22000 and HACCP certifications.'
                  : '반려동물 사료 및 식품 제조공장으로 ISO 22000 및 HACCP 인증을 보유하고 있습니다.'}
              </p>
              <div style={{ display: 'flex', gap: '6px' }}>
                <span style={{ fontSize: '0.72rem', padding: '3px 8px', background: '#EBF5FF', color: 'var(--dh-blue)', borderRadius: '4px', fontWeight: '600' }}>ISO 22000</span>
                <span style={{ fontSize: '0.72rem', padding: '3px 8px', background: '#EBF5FF', color: 'var(--dh-blue)', borderRadius: '4px', fontWeight: '600' }}>HACCP</span>
              </div>
            </div>

            <div className="daesang-trust-card" onClick={() => setGalleryImages(wellzenImages)} style={{ cursor: 'pointer' }}>
              <span className="trust-code">R&amp;D CENTER</span>
              <h3>{isEn ? 'R&D Center' : 'R&D 연구소'}</h3>
              <p>
                {isEn
                  ? 'Specialized pet healthcare research center leading raw material verification and processing technology development.'
                  : '반려동물 전용 헬스케어 전문 연구소로 고품질 원료 검증 및 가공 기술 개발을 주도합니다.'}
              </p>
              <div style={{ display: 'flex', gap: '6px' }}>
                <span style={{ fontSize: '0.72rem', padding: '3px 8px', background: '#EBF5FF', color: 'var(--dh-blue)', borderRadius: '4px', fontWeight: '600' }}>{isEn ? 'Healthcare R&D' : '헬스케어 R&D'}</span>
                <span style={{ fontSize: '0.72rem', padding: '3px 8px', background: '#EBF5FF', color: 'var(--dh-blue)', borderRadius: '4px', fontWeight: '600' }}>{isEn ? 'Raw Material Tech' : '원료가공 기술'}</span>
              </div>
            </div>

            <div className="daesang-trust-card" onClick={() => setShowLogisticsVideo(true)} style={{ cursor: 'pointer' }}>
              <span className="trust-code">LOGISTICS CENTER</span>
              <h3>{isEn ? 'Integrated Logistics Center' : '통합 물류센터'}</h3>
              <p>
                {isEn
                  ? 'Systematic inventory management and an optimized logistics system deliver a safe, fast nationwide distribution network.'
                  : '체계적인 재고 관리와 최적화된 물류 시스템을 통해 안전하고 신속한 전국 배송 네트워크를 제공합니다.'}
              </p>
              <div style={{ display: 'flex', gap: '6px' }}>
                <span style={{ fontSize: '0.72rem', padding: '3px 8px', background: '#EBF5FF', color: 'var(--dh-blue)', borderRadius: '4px', fontWeight: '600' }}>{isEn ? 'Nationwide Network' : '전국 공급망'}</span>
                <span style={{ fontSize: '0.72rem', padding: '3px 8px', background: '#EBF5FF', color: 'var(--dh-blue)', borderRadius: '4px', fontWeight: '600' }}>{isEn ? 'Global Network' : '글로벌 공급망'}</span>
              </div>
            </div>

            <div className="daesang-trust-card" onClick={() => setGalleryImages(qingdaoImages)} style={{ cursor: 'pointer' }}>
              <span className="trust-code">GLOBAL NETWORK</span>
              <h3>{isEn ? 'Qingdao Plant' : '칭다오 공장'}</h3>
              <p>
                {isEn
                  ? 'Hygiene products & global processing OEM/ODM facility.'
                  : '위생용품 및 글로벌 가공 OEM/ODM 공장입니다.'}
              </p>
              <div style={{ display: 'flex', gap: '6px' }}>
                <span style={{ fontSize: '0.72rem', padding: '3px 8px', background: '#FEF3C7', color: '#B45309', borderRadius: '4px', fontWeight: '600' }}>{isEn ? 'Hygiene Products' : '위생용품'}</span>
                <span style={{ fontSize: '0.72rem', padding: '3px 8px', background: '#FEF3C7', color: '#B45309', borderRadius: '4px', fontWeight: '600' }}>{isEn ? 'Global OEM/ODM' : '글로벌 OEM/ODM'}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CI 소개 (좌측 대형 CI 로고 + 우측 3개 분할 섹션 레이아웃) */}
      <section className="daesang-white-section">
        <div className="daesang-container-wide">
          <h2 className="daesang-section-h2">
            {isEn ? 'Corporate Identity' : 'CI 소개'}
          </h2>
          
          <div className="ci-layout" style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: '32px', alignItems: 'stretch' }}>
            {/* 좌측: 대형 CI 로고 박스 */}
            <div style={{
              background: '#FFFFFF',
              border: '1px solid var(--dh-border)',
              borderRadius: '12px',
              padding: '36px 24px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 15px rgba(0,0,0,0.03)',
              textAlign: 'center'
            }}>
              <img
                src="./assets/boomyung_ci_logo.png"
                alt="BOOMYOUNG Corporate Identity"
                style={{ maxHeight: '90px', maxWidth: '100%', objectFit: 'contain', marginBottom: '20px' }}
              />
              <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: 'var(--dh-blue)', letterSpacing: '0.04em', marginBottom: '4px' }}>
                (주)부명 BOOMYOUNG
              </h3>
              <p style={{ fontSize: '0.78rem', color: 'var(--dh-text-muted)', fontWeight: '500' }}>
                Corporate Identity System
              </p>
            </div>

            {/* 우측: 3개 수직 분할 설명 섹션 */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* 섹션 1: 심볼마크 의미 */}
              <div style={{
                background: 'var(--dh-surface)', backdropFilter: 'blur(20px)',
                border: '1px solid var(--dh-border)',
                borderLeft: '4px solid var(--dh-blue)',
                borderRadius: '8px',
                padding: '20px 24px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                  <span style={{ fontSize: '0.72rem', fontWeight: '700', color: 'var(--dh-blue)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>01. Symbol Mark</span>
                  <h4 style={{ fontSize: '0.92rem', fontWeight: '700', color: 'var(--dh-navy)' }}>
                    {isEn ? 'Symbolization of Trust & Life' : '심볼마크의 상징성'}
                  </h4>
                </div>
                <p style={{ fontSize: '0.8rem', color: 'var(--dh-text-muted)', lineHeight: '1.55' }}>
                  {isEn
                    ? 'The logo mark symbolizes solid trust with customers, scientific quality inspection, and deep respect for all pet lives.'
                    : '부명의 CI 심볼은 고객 및 파트너사와의 견고한 신뢰, 과학적인 품질 검증, 그리고 모든 반려동물 생명에 대한 깊은 존중을 상징합니다.'}
                </p>
              </div>

              {/* 섹션 2: 핵심 가치 */}
              <div style={{
                background: 'var(--dh-surface)', backdropFilter: 'blur(20px)',
                border: '1px solid var(--dh-border)',
                borderLeft: '4px solid var(--dh-blue)',
                borderRadius: '8px',
                padding: '20px 24px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                  <span style={{ fontSize: '0.72rem', fontWeight: '700', color: 'var(--dh-blue)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>02. Core Value</span>
                  <h4 style={{ fontSize: '0.92rem', fontWeight: '700', color: 'var(--dh-navy)' }}>
                    {isEn ? '30 Years of Honest Technology' : '30년 정직한 기술과 혁신'}
                  </h4>
                </div>
                <p style={{ fontSize: '0.8rem', color: 'var(--dh-text-muted)', lineHeight: '1.55' }}>
                  {isEn
                    ? 'Reflecting 30 years of accumulated manufacturing expertise and continuous innovation to lead the global pet healthcare market.'
                    : '30년 이상 축적된 정직한 제조 기술력을 바탕으로 고품질 원료 검증과 가공 기술 혁신을 주도하여 가치 있는 미래를 열어갑니다.'}
                </p>
              </div>

              {/* 섹션 3: 컬러 시스템 */}
              <div style={{
                background: 'var(--dh-surface)', backdropFilter: 'blur(20px)',
                border: '1px solid var(--dh-border)',
                borderLeft: '4px solid var(--dh-blue)',
                borderRadius: '8px',
                padding: '20px 24px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                  <span style={{ fontSize: '0.72rem', fontWeight: '700', color: 'var(--dh-blue)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>03. Color System</span>
                  <h4 style={{ fontSize: '0.92rem', fontWeight: '700', color: 'var(--dh-navy)' }}>
                    {isEn ? 'Corporate Blue Color (#0066B3)' : '시그니처 블루 컬러 (#0066B3)'}
                  </h4>
                </div>
                <p style={{ fontSize: '0.8rem', color: 'var(--dh-text-muted)', lineHeight: '1.55' }}>
                  {isEn
                    ? 'Main color #0066B3 signifies deep trust, honesty, and technological innovation expanding across the globe like the vast blue ocean.'
                    : '부명 대표 메인 블루 컬러(#0066B3)는 깊은 신뢰와 정직, 기술 혁신을 의미하며 푸른 바다처럼 넓은 세계로 뻗어나가는 (주)부명의 도전 정신을 상징합니다.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {showLogisticsVideo && (
        <div className="modal-backdrop" onClick={() => setShowLogisticsVideo(false)}>
          <div
            className="modal-content"
            onClick={e => e.stopPropagation()}
            style={{ maxWidth: '860px', width: '90%', background: '#000000', padding: 0, borderRadius: '10px', overflow: 'hidden' }}
          >
            <button className="modal-close-btn" onClick={() => setShowLogisticsVideo(false)} style={{ position: 'fixed', top: '24px', right: '32px' }}>&times;</button>
            <video
              src="./assets/logistics/logistics.mp4"
              controls
              autoPlay
              style={{ width: '100%', height: 'auto', display: 'block', maxHeight: '80vh' }}
            />
          </div>
        </div>
      )}

      {galleryImages && (
        <div className="modal-backdrop" onClick={() => setGalleryImages(null)}>
          <div
            className="modal-content"
            onClick={e => e.stopPropagation()}
            style={{ maxWidth: '760px', maxHeight: '85vh', overflowY: 'auto', background: 'transparent', boxShadow: 'none', padding: '12px' }}
          >
            <button className="modal-close-btn" onClick={() => setGalleryImages(null)}>&times;</button>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${galleryImages.length === 4 ? 2 : Math.min(galleryImages.length, 3)}, 1fr)`,
                gap: '20px'
              }}
            >
              {galleryImages.map((src, i) => (
                <div
                  key={i}
                  style={{
                    aspectRatio: '4 / 3',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    boxShadow: '0 14px 32px rgba(0,0,0,0.35), 0 4px 10px rgba(0,0,0,0.25)',
                    background: '#F3F4F6'
                  }}
                >
                  <img
                    src={src}
                    alt=""
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                      transition: 'transform 0.3s ease',
                      cursor: 'zoom-in'
                    }}
                    onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.5)'; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

