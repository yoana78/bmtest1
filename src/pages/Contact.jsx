import React, { useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { usePageContent } from '../content/usePageContent';
import { useData } from '../context/DataContext';
import { useSiteList } from '../content/siteLists';

export default function Contact() {
  const { lang } = useLanguage();
  const isEn = lang === 'en';
  const { txt, img } = usePageContent('contact'); // 관리자 페이지에서 고칠 수 있는 문구/사진
  const businessCards = useSiteList('businessCards');
  const { siteSettings, brands } = useData();

  const [formData, setFormData] = useState({
    company: '',
    name: '',
    email: '',
    phone: '',
    country: '',
    category: 'export', // export, domestic, other
    brand: brands[0]?.id || '',
    message: ''
  });

  const [activeCardModal, setActiveCardModal] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 서버가 없는 정적 사이트이므로 mailto: 링크로 사용자의 메일 앱을 열어 문의 내용을 자동으로 채워줌
  const handleSubmit = (e) => {
    e.preventDefault();
    const typeLabel = formData.category === 'export'
      ? (isEn ? 'Global Export' : '해외수출')
      : formData.category === 'domestic'
      ? (isEn ? 'Domestic Retail' : '국내입점')
      : (isEn ? 'General' : '기타');

    const selectedBrand = brands.find(b => b.id === formData.brand);
    const brandLabel = selectedBrand ? (isEn ? (selectedBrand.nameEn || selectedBrand.nameKo) : selectedBrand.nameKo) : '-';

    const subject = `[BOOMYUNG 문의 - ${typeLabel}] ${formData.company || '(회사명 미입력)'}`;
    const body = [
      `문의 유형: ${typeLabel}`,
      `회사명: ${formData.company}`,
      `담당자: ${formData.name}`,
      `이메일: ${formData.email}`,
      `연락처: ${formData.phone}`,
      `국가/지역: ${formData.country}`,
      `관심 브랜드: ${brandLabel}`,
      '',
      '상세 문의 내용:',
      formData.message
    ].join('\n');

    window.location.href = `mailto:${siteSettings.contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    alert(isEn
      ? 'Your email app will open with this inquiry pre-filled — please press Send there to complete it.'
      : '메일 작성 화면이 열립니다. 내용을 확인하신 뒤 메일 앱에서 "보내기"를 눌러주셔야 문의가 실제로 접수됩니다.');
  };


  return (
    <div className="daesang-sub-page">
      {/* Sub Page Hero */}
      <section className="daesang-sub-hero" style={{ backgroundImage: `url('${img('heroImage')}')` }}>
        <div className="daesang-section-overlay"></div>
        <div className="daesang-sub-hero-content">
          <span className="daesang-poetic-sub">{txt('heroEyebrow')}</span>
          <h1 className="cms-text">{txt('heroTitle')}</h1>
          <p className="cms-text">{txt('heroBody')}</p>
        </div>
      </section>

      {/* SECTION 1: BUSINESS CARDS SHOWCASE (영업 1팀 / 2팀 명함) */}
      <section className="daesang-white-section" style={{ borderBottom: '1px solid var(--dh-border)' }}>
        <div className="daesang-container-wide">
          <div style={{ marginBottom: '24px' }}>
            <span className="daesang-brand-num">{txt('cardsEyebrow')}</span>
            <h2 className="daesang-section-h2" style={{ marginBottom: '8px' }}>
              {txt('cardsTitle')}
            </h2>
            <p style={{ color: 'var(--dh-text-muted)', fontSize: '0.82rem' }}>
              {txt('cardsBody')}
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
            {businessCards.map(card => {
              const currentImg = isEn ? card.imgEn : card.imgKr;
              return (
                <div 
                  key={card.id}
                  style={{
                    background: '#FFFFFF',
                    border: '1px solid var(--dh-border)',
                    borderRadius: '12px',
                    padding: '20px',
                    boxShadow: '0 2px 8px rgba(0, 102, 179, 0.04)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--dh-blue)', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                      {isEn ? card.titleEn : card.titleKo}
                    </span>
                                      </div>

                  <div 
                    onClick={() => setActiveCardModal(currentImg)}
                    style={{ 
                      width: '100%', 
                      borderRadius: '8px', 
                      overflow: 'hidden', 
                      border: '1px solid var(--dh-border)',
                      cursor: 'pointer',
                      background: '#FFFFFF',
                      boxShadow: '0 2px 6px rgba(0,0,0,0.03)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      aspectRatio: '936 / 520'
                    }}
                  >
                    <img 
                      src={currentImg} 
                      alt={isEn ? card.titleEn : card.titleKo} 
                      style={{ width: '100%', height: '100%', display: 'block', objectFit: 'contain' }}
                    />
                  </div>

                  <p style={{ marginTop: '12px', fontSize: '0.9rem', color: 'var(--dh-text-muted)', textAlign: 'center', lineHeight: 1.45 }}>
                    {isEn ? card.descEn : card.descKo}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 2: FORM & HEADQUARTERS INFO */}
      <section className="daesang-white-section">
        <div className="daesang-container-wide">
          <div className="daesang-contact-grid">
            <div className="contact-info-col">
              <span className="daesang-brand-num">{txt('hqEyebrow')}</span>
              <h2 className="cms-text">{txt('hqTitle')}</h2>
              <p className="contact-desc">
                {txt('hqBody')}
              </p>

              <div className="contact-meta">
                <div className="meta-row">
                  <strong>ADDRESS:</strong>
                  <span className="cms-text">{txt('hqAddress')}</span>
                </div>
                <div className="meta-row">
                  <strong>TEL:</strong>
                  <span>{txt('hqTel')}</span>
                </div>
                <div className="meta-row">
                  <strong>FAX:</strong>
                  <span>{txt('hqFax')}</span>
                </div>
                <div className="meta-row">
                  <strong>E-MAIL:</strong>
                  <span>{siteSettings.contactEmail}</span>
                </div>
                <div className="meta-row">
                  <strong>{isEn ? 'BIZ REG NO.:' : '사업자등록번호:'}</strong>
                  <span>{txt('hqBizNo')}</span>
                </div>
              </div>
            </div>

            <div className="contact-form-col">
              <form onSubmit={handleSubmit} className="daesang-contact-form">
                {/* Inquiry Category Select */}
                <div className="form-group">
                  <label style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--dh-navy)' }}>
                    {isEn ? 'Inquiry Type / Category *' : '문의 유형 (유입 목적) *'}
                  </label>
                  <select name="category" value={formData.category} onChange={handleChange} style={{ fontWeight: 600 }}>
                    <option value="export">{isEn ? 'Global Export Partnership (해외 수출 문의)' : '해외 수출 문의 (Global Export)'}</option>
                    <option value="domestic">{isEn ? 'Domestic Retail Distribution (국내 유통/입점 문의)' : '국내 대형마트 / 편의점 / 이커머스 입점 문의'}</option>
                    <option value="other">{isEn ? 'Other / OEM / ODM (기타 및 제품 제휴)' : '기타 / OEM · ODM / 일반 제휴 문의'}</option>
                  </select>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>{isEn ? 'Company Name *' : '회사명 (업체명) *'}</label>
                    <input type="text" name="company" required value={formData.company} onChange={handleChange} placeholder={isEn ? "e.g. Boomyung International" : "예: (주)부명유통"} />
                  </div>
                  <div className="form-group">
                    <label>{isEn ? 'Contact Person *' : '담당자 성함 *'}</label>
                    <input type="text" name="name" required value={formData.name} onChange={handleChange} />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>{isEn ? 'Email *' : '이메일 주소 *'}</label>
                    <input type="email" name="email" required value={formData.email} onChange={handleChange} />
                  </div>
                  <div className="form-group">
                    <label>{isEn ? 'Phone / Contact *' : '연락처 *'}</label>
                    <input type="tel" name="phone" required value={formData.phone} onChange={handleChange} />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>{isEn ? 'Country / Region' : '국가 / 지역'}</label>
                    <input type="text" name="country" value={formData.country} onChange={handleChange} placeholder={isEn ? "e.g. South Korea, USA, Thailand" : "예: 대한민국, 태국, 미국 등"} />
                  </div>
                  <div className="form-group">
                    <label>{isEn ? 'Interested Brand' : '관심 브랜드'}</label>
                    <select name="brand" value={formData.brand} onChange={handleChange}>
                      {brands.map(b => (
                        <option key={b.id} value={b.id}>{isEn ? (b.nameEn || b.nameKo) : b.nameKo}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label>{isEn ? 'Inquiry Details *' : '상세 문의 내용 *'}</label>
                  <textarea name="message" rows="5" required value={formData.message} onChange={handleChange} placeholder={isEn ? "Please describe your business inquiry..." : "희망 품목, 희망 수량, 예상 공급 시기 등을 자유롭게 적어주세요."}></textarea>
                </div>

                <button type="submit" className="daesang-form-submit">
                  {isEn ? 'SUBMIT INQUIRY' : '문의 접수하기'} →
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Business Card Lightbox Modal */}
      {activeCardModal && (
        <div className="modal-backdrop" onClick={() => setActiveCardModal(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '600px', background: '#FFFFFF', padding: '24px' }}>
            <button className="modal-close-btn" onClick={() => setActiveCardModal(null)}>&times;</button>
            <img src={activeCardModal} alt="Business Card High-Res" style={{ width: '100%', height: 'auto', borderRadius: '8px' }} />
          </div>
        </div>
      )}
    </div>
  );
}

