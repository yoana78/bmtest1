import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext';
import { useData } from '../context/DataContext';
import { useSiteList } from '../content/siteLists';
import { usePageContent } from '../content/usePageContent';
import RichText from '../components/RichText';
import CineSticky from '../components/CineSticky';
import SectionDots from '../components/SectionDots';
import Reveal from '../components/Reveal';

export default function Home() {
  const { lang } = useLanguage();
  const isEn = lang === 'en';
  const { txt, img } = usePageContent('home'); // 관리자 페이지에서 고칠 수 있는 문구/사진
  const partners = useSiteList('partners');
  const petDistributors = useSiteList('petDistributors');
  const storyList = useSiteList('storyBlocks');

  // 저장된 스토리 블록을 현재 언어에 맞춰 CineSticky가 쓰는 형태로 바꾼다
  const storyBlocks = storyList.map((b) => ({
    tag: isEn ? (b.tagEn || b.tagKo) : b.tagKo,
    title: isEn ? (b.titleEn || b.titleKo) : b.titleKo,
    body: ((isEn ? (b.bodyEn?.length ? b.bodyEn : b.bodyKo) : b.bodyKo) || []).join('\n'),
    meta: isEn ? (b.metaEn?.length ? b.metaEn : b.metaKo) : b.metaKo,
    image: b.image
  }));
  const { siteSettings, brands } = useData(); // 관리자 페이지 "사이트 설정" 탭에서 등록한 인트로 히어로 사진 + 실시간 브랜드 목록(D1)
  const ownBrands = brands.filter((b) => b.type === 'own');
  const importedBrands = brands.filter((b) => b.type === 'imported');

  const sections = [
    { id: 'intro', label: isEn ? 'Intro' : '인트로' },
    { id: 'story', label: isEn ? 'Story' : '스토리' },
    { id: 'brands', label: isEn ? 'Brands' : '브랜드' },
    { id: 'network', label: isEn ? 'Network' : '네트워크' },
    { id: 'contact', label: isEn ? 'Contact' : '문의' }
  ];


  return (
    <div>
      <SectionDots sections={sections} />

      {/* ===== 01. 시네마틱 인트로 ===== */}
      <section id="intro" className="cine-hero">
        <div className="cine-hero-media">
          <img
            src={siteSettings.heroImage}
            alt=""
          />
        </div>
        <div className="cine-hero-inner">
          <Reveal className="cine-kicker">
            {txt('heroEyebrow')}
          </Reveal>
          <Reveal delay={1}>
            <RichText as="h1" className="cine-title" text={txt('heroTitle')} />
          </Reveal>
          <Reveal delay={2}>
            <p className="cine-lead">
              {txt('heroBody')}
            </p>
          </Reveal>
          <Reveal delay={3} className="cine-hero-foot">
            <Link to="/about" className="cine-link solid">
              {txt('heroButton')} <span>→</span>
            </Link>
            <div className="cine-scroll-hint">
              <i />
              {txt('heroScroll')}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== 02. 스크롤 시네마틱 스토리 ===== */}
      <div id="story">
        <CineSticky blocks={storyBlocks} />
      </div>

      {/* ===== 04. 브랜드 인덱스 ===== */}
      <section id="brands" className="cine-section">
        <div className="cine-head">
          <Reveal as="h2" style={{ whiteSpace: 'nowrap', maxWidth: 'none' }}>
            {txt('brandsTitle')}
          </Reveal>
          <Reveal as="p" delay={1} style={{ whiteSpace: 'nowrap', maxWidth: 'none' }}>
            {txt('brandsBody')}
          </Reveal>
        </div>

        <div className="cine-index">
          {ownBrands.map((b, i) => (
            <Reveal key={b.id} delay={Math.min(i + 1, 4)}>
              <Link to={`/brands/${b.id}`} className="cine-row">
                <span className="cine-row-logo-wrap">
                  {b.logo && <img className="cine-row-logo" src={b.logo} alt="" />}
                </span>
                <span className="cine-row-name">{isEn ? (b.nameEn || b.nameKo) : b.nameKo}</span>
                <span className="cine-row-desc">{isEn ? b.descriptionEn : b.descriptionKo}</span>
              </Link>
            </Reveal>
          ))}
        </div>

        <div className="cine-head" style={{ marginTop: '64px' }}>
          <Reveal as="h3">
            {txt('importedTitle')}
          </Reveal>
        </div>

        <div className="cine-index">
          {importedBrands.map((b, i) => (
            <Reveal key={b.id} delay={Math.min(i + 1, 4)}>
              <Link to={`/imported-brands/${b.id}`} className="cine-row">
                <span className="cine-row-logo-wrap">
                  {b.logo && <img className="cine-row-logo" src={b.logo} alt="" />}
                </span>
                <span className="cine-row-name">{isEn ? (b.nameEn || b.nameKo) : b.nameKo}</span>
                <span className="cine-row-desc">{isEn ? b.descriptionEn : b.descriptionKo}</span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ===== 05. 네트워크 ===== */}
      <section id="network" className="cine-section tight">
        <div className="cine-head">
          <Reveal as="h2">
            {txt('networkTitle')}
          </Reveal>
          <Reveal as="p" delay={1}>
            {txt('networkBody')}
          </Reveal>
        </div>
      </section>

      <div className="marquee-container">
        <div className="marquee-track">
          {[...partners, ...partners].map((p, i) => (
            <div key={`${p.id}-${i}`} className="marquee-item" title={isEn ? p.nameEn : p.nameKo}>
              <img src={p.logo} alt={p.nameKo} />
            </div>
          ))}
        </div>
      </div>

      {/* ===== 05-2. 펫 전문 유통사 ===== */}
      <section className="cine-section tight">
        <div className="cine-head">
          <Reveal as="h2">
            {txt('petDistTitle')}
          </Reveal>
          <Reveal as="p" delay={1}>
            {txt('petDistBody')}
          </Reveal>
        </div>
        <div className="pet-distributor-grid">
          {petDistributors.map((p) => (
            <div key={p.id} className="pet-distributor-card">
              {p.logo && <img src={p.logo} alt={p.nameKo} />}
            </div>
          ))}
        </div>
      </section>

      {/* ===== 06. CTA ===== */}
      <section id="contact" className="cine-cta">
        <div className="cine-cta-media">
          <img
            src={img('ctaImage')}
            alt=""
          />
        </div>
        <div className="cine-cta-body">
          <Reveal as="span" className="cine-block-tag">
            {txt('ctaEyebrow')}
          </Reveal>
          <Reveal as="h2" delay={1}>
            {txt('ctaTitle')}
          </Reveal>
          <Reveal as="p" delay={2}>
            {txt('ctaBody')}
          </Reveal>
          <Reveal delay={3}>
            <Link to="/contact" className="cine-link solid">
              {txt('ctaButton')} <span>→</span>
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
