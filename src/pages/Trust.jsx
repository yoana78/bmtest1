import React, { useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { partners } from '../data/partners';
import { petDistributors } from '../data/petDistributors';
import { expoPhotos } from '../data/expo';

export default function Trust() {
  const { lang } = useLanguage();
  const isEn = lang === 'en';

  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(null);
  const [selectedCert, setSelectedCert] = useState(null);
  const [selectedPatent, setSelectedPatent] = useState(null);

  const certifications = [
    {
      code: 'ISO 14001',
      titleKo: '환경경영시스템 (ISO 14001)',
      titleEn: 'Environmental Management System',
      descKo: '생산 전 과정에서 환경 영향을 최소화하는 국제 표준 환경경영시스템을 적용합니다.',
      descEn: 'Certified environmental management system minimizing environmental impact across production processes.',
      image: './assets/certifications/iso14001.png',
      imageEn: './assets/certifications/iso14001_en.png'
    },
    {
      code: 'ISO 22000',
      titleKo: '식품안전경영시스템 (ISO 22000)',
      titleEn: 'Food Safety Management System',
      descKo: '원료 입고부터 제조, 포장 전 과정에 걸쳐 국제 표준 식품안전 경영시스템을 적용합니다.',
      descEn: 'Certified international food safety management from raw materials to final packaging.',
      image: './assets/certifications/iso22000.png',
      imageEn: './assets/certifications/iso22000_en.png'
    },
    {
      code: 'HACCP',
      titleKo: 'HACCP 위해요소 중점관리',
      titleEn: 'Hazard Analysis Critical Control Point',
      descKo: '제조 공정상 발생할 수 있는 위해요소를 사전 차단하여 안전한 사료와 간식을 생산합니다.',
      descEn: 'Rigorous monitoring and prevention of biological, chemical, and physical hazards.',
      image: './assets/certifications/haccp.png',
      imageEn: './assets/certifications/haccp_en.png'
    },
    {
      code: 'AAFCO',
      titleKo: 'AAFCO 미국사료관리협회 영양기준',
      titleEn: 'AAFCO Nutritional Guidelines Compliant',
      descKo: '미국사료관리협회(AAFCO)의 개·고양이 필수 영양 가이드라인을 준수합니다.',
      descEn: 'Formulated to meet global AAFCO nutritional standards for dogs and cats.',
      image: null
    }
  ];

  // Patents / design registrations / utility model. The certificates
  // themselves only exist in Korean (KIPO issues no separate English
  // copy) but already carry the official bilingual boilerplate; the
  // titleEn below is our own translation of the specific invention
  // title shown as a caption under the image, not a fabricated document.
  const patents = [
    {
      type: 'patent',
      typeKo: '특허',
      typeEn: 'Patent',
      no: '10-2252390',
      titleKo: '반려 동물용 육포 및 그 제조방법',
      titleEn: 'Pet Jerky and Manufacturing Method Thereof',
      image: './assets/patents/patent_2252390.jpg'
    },
    {
      type: 'patent',
      typeKo: '특허',
      typeEn: 'Patent',
      no: '10-2042458',
      titleKo: '벤토나이트를 함유한 고양이 모래 및 그 제조방법',
      titleEn: 'Bentonite-Containing Cat Litter and Manufacturing Method Thereof',
      image: './assets/patents/patent_2042458.jpg'
    },
    {
      type: 'patent',
      typeKo: '특허',
      typeEn: 'Patent',
      no: '10-2042457',
      titleKo: '두부 부산물을 함유한 고양이 모래 및 그 제조방법',
      titleEn: 'Tofu-Byproduct Cat Litter and Manufacturing Method Thereof',
      image: './assets/patents/patent_2042457.jpg'
    },
    {
      type: 'patent',
      typeKo: '특허',
      typeEn: 'Patent',
      no: '10-2248006',
      titleKo: '노즈워크매트',
      titleEn: 'Nosework Mat',
      image: './assets/patents/patent_2248006.jpg'
    },
    {
      type: 'patent',
      typeKo: '특허',
      typeEn: 'Patent',
      no: '10-2233264',
      titleKo: '반려 동물용 육포 포장방법',
      titleEn: 'Packaging Method for Pet Jerky',
      image: './assets/patents/patent_2233264.jpg'
    },
    {
      type: 'patent',
      typeKo: '특허',
      typeEn: 'Patent',
      no: '10-2254626',
      titleKo: '치석제거가 가능한 반려동물용 껌',
      titleEn: 'Tartar-Removing Chew Gum for Pets',
      image: './assets/patents/patent_2254626.jpg'
    },
    {
      type: 'patent',
      typeKo: '특허',
      typeEn: 'Patent',
      no: '10-2246000',
      titleKo: '원료육이 코팅된 반려동물용 간식 및 이의 제조방법',
      titleEn: 'Meat-Coated Pet Treat and Manufacturing Method Thereof',
      image: './assets/patents/patent_2246000.jpg'
    },
    {
      type: 'patent',
      typeKo: '특허',
      typeEn: 'Patent',
      no: '10-2956733',
      titleKo: '반려동물 안구를 위한 식품 조성물',
      titleEn: 'Food Composition for Pet Eye Health',
      image: './assets/patents/patent_2956733.jpg'
    },
    {
      type: 'design',
      typeKo: '디자인등록',
      typeEn: 'Design Registration',
      no: '30-0833217',
      titleKo: '애견용 패드',
      titleEn: 'Pet Pad',
      image: './assets/patents/design_0833217.png'
    },
    {
      type: 'design',
      typeKo: '디자인등록',
      typeEn: 'Design Registration',
      no: '30-0847166',
      titleKo: '애완동물용 목줄',
      titleEn: 'Pet Leash',
      image: './assets/patents/design_0847166.png'
    },
  ];

  const expoYearMeta = {
    '2019': {
      labelKo: '2019 미국 올랜도 글로벌 펫 엑스포',
      labelEn: '2019 Global Pet Expo, Orlando',
      descKo: '미국 올랜도 글로벌 펫 엑스포 참가 현장',
      descEn: "Boomyung's booth at Global Pet Expo, Orlando, USA."
    },
    '2023': {
      labelKo: '2023 태국 국제 펫 박람회 현장 갤러리',
      labelEn: '2023 Pet Fair South East Asia',
      descKo: '방콕 현지 부명 브랜드 전시 및 상담 현장',
      descEn: "Showcasing Boomyung's premium brands to global buyers in Bangkok."
    },
    '2024': {
      labelKo: '2024 태국 국제 펫 박람회 현장 갤러리',
      labelEn: '2024 Pet Fair South East Asia',
      descKo: '방콕 현지 부명 브랜드 전시 및 상담 현장',
      descEn: "Showcasing Boomyung's premium brands to global buyers in Bangkok."
    },
    '2025': {
      labelKo: '2025 태국 국제 펫 박람회 현장 갤러리',
      labelEn: '2025 Pet Fair South East Asia',
      descKo: '방콕 현지 부명 브랜드 전시 및 상담 현장',
      descEn: "Showcasing Boomyung's premium brands to global buyers in Bangkok."
    }
  };

  const expoYearGroups = [];
  expoPhotos.forEach((photo, index) => {
    const meta = expoYearMeta[photo.year] || { labelKo: photo.year, labelEn: photo.year, descKo: '', descEn: '' };
    let group = expoYearGroups.find(g => g.year === photo.year);
    if (!group) {
      group = { year: photo.year, ...meta, items: [] };
      expoYearGroups.push(group);
    }
    group.items.push({ photo, index });
  });

  const openLightbox = (index) => {
    setSelectedPhotoIndex(index);
  };

  const closeLightbox = () => {
    setSelectedPhotoIndex(null);
  };

  const nextPhoto = (e) => {
    e.stopPropagation();
    if (selectedPhotoIndex !== null) {
      setSelectedPhotoIndex((selectedPhotoIndex + 1) % expoPhotos.length);
    }
  };

  const prevPhoto = (e) => {
    e.stopPropagation();
    if (selectedPhotoIndex !== null) {
      setSelectedPhotoIndex((selectedPhotoIndex - 1 + expoPhotos.length) % expoPhotos.length);
    }
  };

  return (
    <div className="daesang-sub-page">
      {/* Sub Page Hero */}
      <section className="daesang-sub-hero" style={{ backgroundImage: "url('./assets/trust_hero.png')" }}>
        <div className="daesang-section-overlay"></div>
        <div className="daesang-sub-hero-content">
          <span className="daesang-poetic-sub">QUALITY & GLOBAL TRUST</span>
          <h1>{isEn ? 'Trust & Certification' : '신뢰와 인증'}</h1>
          <p>{isEn ? 'Uncompromising safety protocols & international exhibition records.' : '엄격한 품질 표준과 글로벌 박람회 출품을 통해 신뢰를 실증합니다.'}</p>
        </div>
      </section>

      {/* Certifications Grid Section */}
      <section className="daesang-white-section">
        <div className="daesang-container-wide">
          <span className="daesang-brand-num">CERTIFICATIONS</span>
          <h2 className="daesang-section-h2">{isEn ? 'Quality Management System' : '품질 및 안전 인증 시스템'}</h2>

          <div className="daesang-trust-grid">
            {certifications.map(cert => {
              const hasImage = !!cert.image;
              return (
                <div
                  key={cert.code}
                  className="daesang-trust-card"
                  onClick={hasImage ? () => setSelectedCert(cert) : undefined}
                  style={hasImage ? { cursor: 'pointer' } : undefined}
                  title={hasImage ? (isEn ? 'Click to view certificate' : '클릭하면 인증서를 볼 수 있습니다') : undefined}
                >
                  <span className="trust-code">{cert.code}</span>
                  <h3>{isEn ? cert.titleEn : cert.titleKo}</h3>
                  <p>{isEn ? cert.descEn : cert.descKo}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Patents / IP Section */}
      <section className="daesang-white-section" style={{ background: '#F8F9FA', borderTop: '1px solid #EAEAEA' }}>
        <div className="daesang-container-wide">
          <span className="daesang-brand-num">INTELLECTUAL PROPERTY</span>
          <h2 className="daesang-section-h2">{isEn ? 'Patents Held' : '보유 특허'}</h2>
          <p style={{ color: '#666', fontSize: '0.9rem', marginTop: '-8px', marginBottom: '20px' }}>
            {isEn
              ? 'BOOMYUNG holds patents, design registrations, and a utility model covering our pet food and accessory technologies, registered with the Korean Intellectual Property Office (KIPO).'
              : '(주)부명은 반려동물 사료 및 용품 관련 기술에 대해 특허청(KIPO)에 등록된 특허, 디자인등록, 실용신안을 보유하고 있습니다.'}
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '14px' }}>
            {patents.map(p => (
              <div
                key={p.no}
                onClick={() => setSelectedPatent(p)}
                style={{
                  background: '#FFFFFF',
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  transition: 'box-shadow 0.2s ease, transform 0.2s ease',
                  aspectRatio: '210 / 297',
                  display: 'flex',
                  flexDirection: 'column'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 6px 16px rgba(0,0,0,0.1)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div style={{ flex: 1, minHeight: 0, background: '#F3F4F6', overflow: 'hidden' }}>
                  <img src={p.image} alt={p.titleKo} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} />
                </div>
                <div style={{ padding: '8px 10px', flexShrink: 0 }}>
                  <span style={{ fontSize: '0.65rem', fontWeight: 700, color: 'var(--dh-blue)', letterSpacing: '0.02em' }}>
                    {isEn ? p.typeEn : p.typeKo} {p.no}
                  </span>
                  <p style={{
                    fontSize: '0.75rem', color: '#374151', margin: '3px 0 0',
                    display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden'
                  }}>
                    {isEn ? p.titleEn : p.titleKo}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Global Exhibition Galleries, one section per year */}
      {expoYearGroups.map(({ year, labelKo, labelEn, descKo, descEn, items }, groupIdx) => (
        <section
          key={year}
          className="daesang-white-section"
          style={{
            borderTop: '1px solid #EAEAEA',
            background: groupIdx % 2 === 1 ? '#F8F9FA' : undefined
          }}
        >
          <div className="daesang-container-wide">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '30px', flexWrap: 'wrap', gap: '16px' }}>
              <div>
                <span className="daesang-brand-num">GLOBAL EXHIBITION</span>
                <h2 className="daesang-section-h2" style={{ marginBottom: '8px' }}>
                  {isEn ? labelEn : labelKo}
                </h2>
                <p style={{ color: '#666', fontSize: '0.95rem' }}>
                  {isEn ? descEn : descKo}
                </p>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '16px' }}>
              {items.map(({ photo, index }) => (
                <div
                  key={photo.id}
                  onClick={() => openLightbox(index)}
                  style={{
                    position: 'relative',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    height: '180px',
                    background: '#EAEAEA',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.03)';
                    e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.06)';
                  }}
                >
                  <img
                    src={photo.image}
                    alt={isEn ? photo.titleEn : photo.titleKo}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(180deg, transparent 60%, rgba(0,0,0,0.7) 100%)',
                    display: 'flex',
                    alignItems: 'flex-end',
                    padding: '10px 12px'
                  }}>
                    <span style={{ color: '#FFF', fontSize: '0.78rem', opacity: 0.9 }}>
                      {isEn ? photo.locationEn : photo.locationKo}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* Distribution Network Wall (13 Partners) */}
      <section className="daesang-white-section" style={{ background: expoYearGroups.length % 2 === 1 ? '#F8F9FA' : undefined, borderTop: '1px solid #EAEAEA' }}>
        <div className="daesang-container-wide">
          <span className="daesang-brand-num">PARTNERSHIP</span>
          <h2 className="daesang-section-h2">{isEn ? 'Domestic Distribution Network' : '신뢰로 인정받은 국내 대형 유통 네트워크'}</h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '20px', marginTop: '30px' }}>
            {partners.map(p => (
              <div
                key={p.id}
                style={{
                  background: '#FFFFFF',
                  border: '1px solid #E5E7EB',
                  borderRadius: '10px',
                  padding: '10px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '110px',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.02)'
                }}
              >
                <img src={p.logo} alt={p.nameKo} style={{ maxHeight: '70px', maxWidth: '100%', objectFit: 'contain' }} />
                <span style={{ fontSize: '0.82rem', color: '#666', marginTop: '4px', fontWeight: 500 }}>
                  {isEn ? p.nameEn : p.nameKo}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pet Specialty Retail Partners */}
      <section className="daesang-white-section" style={{ background: expoYearGroups.length % 2 === 0 ? '#F8F9FA' : undefined, borderTop: '1px solid #EAEAEA' }}>
        <div className="daesang-container-wide">
          <span className="daesang-brand-num">PARTNERSHIP</span>
          <h2 className="daesang-section-h2">{isEn ? 'Boomyung\'s Pet Specialty Retail Partners' : '부명과 함께하는 국내 펫 전문 유통사'}</h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '20px', marginTop: '30px' }}>
            {petDistributors.map(p => (
              <div
                key={p.id}
                style={{
                  background: '#FFFFFF',
                  border: '1px solid #E5E7EB',
                  borderRadius: '10px',
                  padding: '10px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '110px',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.02)'
                }}
              >
                {p.logo && (
                  <>
                    <img src={p.logo} alt={p.nameKo} style={{ maxHeight: '49px', maxWidth: '70%', objectFit: 'contain' }} />
                    <span style={{ fontSize: '0.82rem', color: '#666', marginTop: '4px', fontWeight: 500 }}>
                      {isEn ? p.nameEn : p.nameKo}
                    </span>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CERTIFICATE MODAL */}
      {selectedCert !== null && (
        <div className="modal-backdrop" onClick={() => setSelectedCert(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setSelectedCert(null)}>&times;</button>
            <img
              src={isEn ? selectedCert.imageEn : selectedCert.image}
              alt={isEn ? selectedCert.titleEn : selectedCert.titleKo}
            />
            <div className="modal-caption">
              <div>
                <h4 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 500 }}>
                  {selectedCert.code} — {isEn ? selectedCert.titleEn : selectedCert.titleKo}
                </h4>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* PATENT / IP MODAL */}
      {selectedPatent !== null && (
        <div className="modal-backdrop" onClick={() => setSelectedPatent(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setSelectedPatent(null)}>&times;</button>
            <img src={selectedPatent.image} alt={selectedPatent.titleKo} />
            <div className="modal-caption" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '4px' }}>
              <h4 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 500 }}>
                {(isEn ? selectedPatent.typeEn : selectedPatent.typeKo)} {selectedPatent.no}
              </h4>
              <span style={{ fontSize: '0.9rem', color: '#CBD5E1' }}>
                {isEn ? selectedPatent.titleEn : selectedPatent.titleKo}
              </span>
              {isEn && (
                <span style={{ fontSize: '0.75rem', color: '#94A3B8' }}>
                  Original certificate issued in Korean by the Korean Intellectual Property Office (KIPO); title translated above for reference.
                </span>
              )}
            </div>
          </div>
        </div>
      )}

      {/* LIGHTBOX MODAL */}
      {selectedPhotoIndex !== null && (
        <div className="modal-backdrop" onClick={closeLightbox}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={closeLightbox}>&times;</button>
            <img 
              src={expoPhotos[selectedPhotoIndex].image} 
              alt={expoPhotos[selectedPhotoIndex].titleKo} 
            />
            <div className="modal-caption">
              <div>
                <h4 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 500 }}>
                  {isEn ? expoPhotos[selectedPhotoIndex].titleEn : expoPhotos[selectedPhotoIndex].titleKo}
                </h4>
                <span style={{ fontSize: '0.85rem', color: '#AAA' }}>
                  {isEn ? expoPhotos[selectedPhotoIndex].locationEn : expoPhotos[selectedPhotoIndex].locationKo} ({selectedPhotoIndex + 1} / {expoPhotos.length})
                </span>
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button className="modal-nav-btn" onClick={prevPhoto}>&larr; {isEn ? 'Prev' : '이전'}</button>
                <button className="modal-nav-btn" onClick={nextPhoto}>{isEn ? 'Next' : '다음'} &rarr;</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
