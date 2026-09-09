import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext';
import { privacyPolicyKo, privacyPolicyEn } from '../data/privacyPolicy';
import { termsOfServiceKo, termsOfServiceEn } from '../data/termsOfService';

export default function Footer() {
  const { lang } = useLanguage();
  const isEn = lang === 'en';
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);

  return (
    <footer className="daesang-footer-real">
      <div className="daesang-container-wide">
        <div className="daesang-footer-row">
          <div className="daesang-footer-info" style={{ maxWidth: '600px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '20px' }}>
              <img 
                src="./assets/boomyung_ci_logo.png" 
                alt="BOOMYUNG" 
                style={{ height: '42px', objectFit: 'contain', background: '#FFFFFF', padding: '4px', borderRadius: '50%' }}
              />
              <span className="daesang-footer-logo-text" style={{ margin: 0 }}>
                {isEn ? 'BOOMYUNG CO., LTD.' : '(주)부명 BOOMYUNG'}
              </span>
            </div>
            <p>
              {isEn
                ? '306, 19, Geonwon-daero 34beon-gil, Guri-si, Gyeonggi-do, Republic of Korea | TEL: +82-31-553-8003 | FAX: +82-31-592-2460'
                : '경기도 구리시 건원대로34번길 19 306 | TEL: 031-553-8003 | FAX: 031-592-2460'}
            </p>
            <p>
              {isEn
                ? 'E-MAIL: help@petsb2b.co.kr | Business Registration No.: 132-81-49973'
                : 'E-MAIL: help@petsb2b.co.kr | 사업자등록번호: 132-81-49973'}
            </p>
          </div>

          <div style={{ display: 'flex', gap: '60px', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <span style={{ color: '#FFFFFF', fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.1em' }}>
                {isEn ? 'COMPANY' : '기업 안내'}
              </span>
              <Link to="/about" style={{ color: '#CBD5E1', textDecoration: 'none' }}>
                {isEn ? 'About Us' : '회사소개'}
              </Link>
              <Link to="/brands" style={{ color: '#CBD5E1', textDecoration: 'none' }}>
                {isEn ? 'Our Brands' : '브랜드'}
              </Link>
              <Link to="/trust" style={{ color: '#CBD5E1', textDecoration: 'none' }}>
                {isEn ? 'Trust & Quality' : '신뢰와 인증'}
              </Link>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <span style={{ color: '#FFFFFF', fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.1em' }}>
                {isEn ? 'BUSINESS' : '비즈니스'}
              </span>
              <Link to="/catalog" style={{ color: '#CBD5E1', textDecoration: 'none' }}>
                {isEn ? 'Product Catalog' : '제품 카탈로그'}
              </Link>
              <Link to="/contact" style={{ color: '#CBD5E1', textDecoration: 'none' }}>
                {isEn ? 'B2B Inquiry' : 'B2B 입점 문의'}
              </Link>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.15)', paddingTop: '28px', flexWrap: 'wrap', gap: '16px' }}>
          <p>© 2026 BOOMYUNG Co., Ltd. All Rights Reserved.</p>
          <div style={{ display: 'flex', gap: '24px' }}>
            <span style={{ color: '#CBD5E1', cursor: 'pointer' }} onClick={() => setShowPrivacyModal(true)}>{isEn ? 'Privacy Policy' : '개인정보처리방침'}</span>
            <span style={{ color: '#CBD5E1', cursor: 'pointer' }} onClick={() => setShowTermsModal(true)}>{isEn ? 'Terms of Service' : '이용약관'}</span>
            <Link to="/admin" style={{ color: '#CBD5E1', textDecoration: 'none' }}>
              {isEn ? 'Admin' : '관리자'}
            </Link>
          </div>
        </div>
      </div>

      {showPrivacyModal && (
        <div className="modal-backdrop" onClick={() => setShowPrivacyModal(false)}>
          <div
            className="modal-content"
            onClick={e => e.stopPropagation()}
            style={{ maxWidth: '760px', maxHeight: '80vh', overflowY: 'auto', background: '#FFFFFF', padding: '32px', textAlign: 'left', color: 'var(--dh-text, #1F2937)' }}
          >
            <button className="modal-close-btn" onClick={() => setShowPrivacyModal(false)}>&times;</button>
            <h2 style={{ marginTop: 0, marginBottom: '20px', color: 'var(--dh-navy)' }}>
              {isEn ? 'Privacy Policy' : '개인정보처리방침'}
            </h2>
            <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word', fontFamily: 'inherit', fontSize: '0.85rem', lineHeight: 1.7, color: '#374151', margin: 0 }}>
              {isEn ? privacyPolicyEn : privacyPolicyKo}
            </pre>
          </div>
        </div>
      )}

      {showTermsModal && (
        <div className="modal-backdrop" onClick={() => setShowTermsModal(false)}>
          <div
            className="modal-content"
            onClick={e => e.stopPropagation()}
            style={{ maxWidth: '760px', maxHeight: '80vh', overflowY: 'auto', background: '#FFFFFF', padding: '32px', textAlign: 'left', color: 'var(--dh-text, #1F2937)' }}
          >
            <button className="modal-close-btn" onClick={() => setShowTermsModal(false)}>&times;</button>
            <h2 style={{ marginTop: 0, marginBottom: '20px', color: 'var(--dh-navy)' }}>
              {isEn ? 'Terms of Service' : '이용약관'}
            </h2>
            <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word', fontFamily: 'inherit', fontSize: '0.85rem', lineHeight: 1.7, color: '#374151', margin: 0 }}>
              {isEn ? termsOfServiceEn : termsOfServiceKo}
            </pre>
          </div>
        </div>
      )}
    </footer>
  );
}

