import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext';
import { useData } from '../context/DataContext';
import { partners } from '../data/partners';
import { petDistributors } from '../data/petDistributors';
import CineSticky from '../components/CineSticky';
import SectionDots from '../components/SectionDots';
import Reveal from '../components/Reveal';

export default function Home() {
  const { lang } = useLanguage();
  const isEn = lang === 'en';
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

  const storyBlocks = [
    {
      tag: isEn ? '01 — Philosophy' : '01 — 철학',
      title: isEn ? 'Respect begins with the smallest details.' : '존중은 아주 작고 사소한 것에서 시작됩니다',
      body: isEn ? (
        <>30 years, we have built products around a single question:<br />is this good enough for a life we love? Every formula, every pack, every shipment answers it.</>
      ) : (
        <>30년간 우리는 하나의 질문에서 출발했습니다.<br />사랑하는 생명에게 내어줄 만큼 좋은가. 모든 배합과 포장, 모든 출고가 그 질문에 답합니다.</>
      ),
      meta: isEn ? ['Since 1995', 'Pet Healthcare'] : ['1995년 설립', '펫 헬스케어'],
      image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=1800&q=80'
    },
    {
      tag: isEn ? '02 — Manufacturing' : '02 — 생산',
      title: isEn ? 'Certified lines, honest recipes.' : '인증된 라인에서, 정직한 배합으로',
      body: isEn
        ? 'Our plant runs ISO 22000 and HACCP certified processes, from raw material screening to automated packaging — traceable at every step.'
        : '원료 선별부터 자동 포장까지 ISO 22000 · HACCP 인증 공정으로 운영되며, 모든 단계가 추적 가능합니다.',
      meta: ['ISO 22000', 'HACCP'],
      image: './assets/homad/homad_01.jpg'
    },
    {
      tag: isEn ? '03 — Research' : '03 — 연구',
      title: isEn ? 'R&D, where formulas are proven.' : 'R&D, 배합을 증명하는 자리',
      body: isEn
        ? 'A dedicated pet healthcare research centre verifies raw materials and develops processing technology — officially recognised as a corporate R&D institute.'
        : '반려동물 전용 헬스케어 연구소에서 원료를 검증하고 가공 기술을 개발합니다. 기업부설 연구개발전담부서로 공식 인정받았습니다.',
      meta: isEn ? ['R&D Centre', 'Certified Lab'] : ['연구개발전담부서', '원료 검증'],
      image: './assets/wellzen/wellzen_01.png'
    },
    {
      tag: isEn ? '04 — Distribution' : '04 — 유통',
      title: isEn ? 'From our floor to the global market.' : '물류센터에서 글로벌 시장까지',
      body: isEn
        ? 'An integrated logistics centre keeps inventory accurate and delivery fast, supplying 20+ major retail channels across Korea and export partners abroad.'
        : '통합 물류센터가 재고를 정확하게, 배송을 빠르게 유지합니다. 국내 20개 이상 유통 채널과 해외 수출 파트너에 공급합니다.',
      meta: isEn ? ['20+ Channels', 'Global Export'] : ['20개+ 채널', '글로벌 수출'],
      image: 'https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=1800&q=80'
    }
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
            {isEn ? 'Boomyung Co., Ltd. — Pet Healthcare' : '(주)부명 — 반려동물 헬스케어'}
          </Reveal>
          <Reveal delay={1}>
            <h1 className="cine-title">
              {isEn ? (
                <>Respect begins with the <em>smallest</em> things.</>
              ) : (
                <>존중은 아주 작고 <em>사소한</em> 것에서 시작됩니다</>
              )}
            </h1>
          </Reveal>
          <Reveal delay={2}>
            <p className="cine-lead">
              {isEn
                ? 'Thirty years of honest manufacturing for the pets we share our lives with — from formula research to nationwide delivery.'
                : '반려동물의 생명과 건강을 존중하는 정직한 품질로, 원료 연구부터 전국 배송까지 30년을 이어온 제조 기업입니다.'}
            </p>
          </Reveal>
          <Reveal delay={3} className="cine-hero-foot">
            <Link to="/about" className="cine-link solid">
              {isEn ? 'Discover Boomyung' : '기업 소개 보기'} <span>→</span>
            </Link>
            <div className="cine-scroll-hint">
              <i />
              {isEn ? 'Scroll' : '스크롤'}
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
            {isEn ? 'Four brands, one standard.' : '네 개의 브랜드, 하나의 기준'}
          </Reveal>
          <Reveal as="p" delay={1} style={{ whiteSpace: 'nowrap', maxWidth: 'none' }}>
            {isEn
              ? 'Premium brands tailored to your pet’s health and lifestyle.'
              : '반려동물의 건강과 라이프 스타일에 따른 프리미엄 브랜드'}
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
            {isEn ? 'Imported Brands' : '직수입 브랜드'}
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
            {isEn ? 'Boomyung\'s Leading Retail Partners' : '부명과 함께하는 국내 대형 유통 파트너'}
          </Reveal>
          <Reveal as="p" delay={1}>
            {isEn
              ? 'Supplying verified products to more than 20 major retail and e-commerce channels in Korea.'
              : '이마트, 홈플러스, 코스트코, 쿠팡, 편의점 4사 등 국내 20개 이상 채널에 검증된 제품을 공급합니다.'}
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
            {isEn ? 'Boomyung\'s Pet Specialty Retail Partners' : '부명과 함께하는 국내 펫 전문 유통사'}
          </Reveal>
          <Reveal as="p" delay={1}>
            {isEn
              ? 'Supplying verified products to leading pet specialty retail channels in Korea, including THEKICO, SUJINPET and Dog&Cat Paradise.'
              : '더키코, 수진펫, 야옹아멍멍해봐 등 국내 대형 펫 유통 채널에 검증된 제품을 공급합니다.'}
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
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1800&q=80"
            alt=""
          />
        </div>
        <div className="cine-cta-body">
          <Reveal as="span" className="cine-block-tag">
            {isEn ? 'Partnership & Export' : '제휴 및 수출'}
          </Reveal>
          <Reveal as="h2" delay={1}>
            {isEn ? 'Beyond Korea, into new markets.' : '국내 유통망을 넘어 세계 시장으로'}
          </Reveal>
          <Reveal as="p" delay={2}>
            {isEn
              ? 'We work with hypermarkets, e-commerce platforms and global buyers on OEM/ODM and export partnerships. Tell us what you need.'
              : '대형 할인마트, 이커머스, 글로벌 바이어와 OEM/ODM 및 수출 파트너십을 진행합니다. 필요한 내용을 알려주세요.'}
          </Reveal>
          <Reveal delay={3}>
            <Link to="/contact" className="cine-link solid">
              {isEn ? 'Start an inquiry' : 'B2B 문의하기'} <span>→</span>
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
