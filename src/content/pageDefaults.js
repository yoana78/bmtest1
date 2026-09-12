// 관리자 페이지에서 고칠 수 있는 "페이지 문구/이미지" 목록입니다. (siteA 전용)
//
// 이 파일 하나가 두 가지 역할을 합니다.
//   1) 각 페이지가 화면에 뿌릴 기본 문구(= 지금 사이트에 나가고 있는 값)
//   2) 관리자 페이지 입력 폼을 자동으로 만들어주는 설계도
//
// 필드 옵션
//   type: 'text'(한 줄) | 'textarea'(여러 줄, 엔터 줄바꿈 그대로 반영) | 'image'
//   size: 화면 글자 크기 — 입력칸 옆에 안내로 표시 (크기가 다른 문구를 한 칸에 섞지 않기 위함)
//   koOnly: true면 영문 입력칸 없음 (원래부터 언어 구분 없이 나가는 문구)
//   width/height: 이미지 권장 해상도. 업로드 시 이 비율로 자동 크롭
//
// 제목에서 일부 단어만 강조하고 싶으면 *별표*로 감싸면 됩니다 (예: 아주 작고 *사소한* 것에서).

export const PAGE_SCHEMA = {
  home: {
    label: '홈',
    sections: [
      {
        label: '메인 상단 (인트로)',
        note: '배경 사진은 "사이트 설정" 탭의 인트로 이미지에서 바꿉니다. 제목은 *별표*로 감싼 부분이 강조됩니다.',
        fields: [
          { key: 'heroEyebrow', label: '작은 라벨', type: 'text', size: '0.68rem', ko: '(주)부명 — 반려동물 헬스케어', en: 'Boomyung Co., Ltd. — Pet Healthcare' },
          { key: 'heroTitle', label: '큰 제목 (*별표*로 강조)', type: 'textarea', size: '1.5~1.9rem', ko: '존중은 아주 작고 *사소한* 것에서 시작됩니다', en: 'Respect begins with the *smallest* things.' },
          { key: 'heroBody', label: '본문', type: 'textarea', size: '0.85rem', ko: '반려동물의 생명과 건강을 존중하는 정직한 품질로, 원료 연구부터 전국 배송까지 30년을 이어온 제조 기업입니다.', en: 'Thirty years of honest manufacturing for the pets we share our lives with — from formula research to nationwide delivery.' },
          { key: 'heroButton', label: '버튼 문구', type: 'text', size: '0.84rem', ko: '기업 소개 보기', en: 'Discover Boomyung' },
          { key: 'heroScroll', label: '스크롤 안내', type: 'text', size: '0.66rem', ko: '스크롤', en: 'Scroll' },
        ],
      },
      {
        label: '브랜드 섹션',
        note: '브랜드 카드 내용은 "브랜드 추가 등록" 탭에서 바꿉니다.',
        fields: [
          { key: 'brandsTitle', label: '섹션 제목', type: 'textarea', size: '1.1~1.25rem', ko: '네 개의 브랜드, 하나의 기준', en: 'Four brands, one standard.' },
          { key: 'brandsBody', label: '섹션 본문', type: 'textarea', size: '0.82rem', ko: '반려동물의 건강과 라이프 스타일에 따른 프리미엄 브랜드', en: "Premium brands tailored to your pet's health and lifestyle." },
          { key: 'importedTitle', label: '수입 브랜드 소제목', type: 'text', size: '0.95~1.05rem', ko: '직수입 브랜드', en: 'Imported Brands' },
        ],
      },
      {
        label: '유통 파트너 섹션',
        fields: [
          { key: 'networkTitle', label: '섹션 제목', type: 'textarea', size: '1.1~1.25rem', ko: '부명과 함께하는 국내 대형 유통 파트너', en: "Boomyung's Leading Retail Partners" },
          { key: 'networkBody', label: '섹션 본문', type: 'textarea', size: '0.82rem', ko: '이마트, 홈플러스, 코스트코, 쿠팡, 편의점 4사 등 국내 20개 이상 채널에 검증된 제품을 공급합니다.', en: 'Supplying verified products to more than 20 major retail and e-commerce channels in Korea.' },
        ],
      },
      {
        label: '펫 전문 유통사 섹션',
        fields: [
          { key: 'petDistTitle', label: '섹션 제목', type: 'textarea', size: '1.1~1.25rem', ko: '부명과 함께하는 국내 펫 전문 유통사', en: "Boomyung's Pet Specialty Retail Partners" },
          { key: 'petDistBody', label: '섹션 본문', type: 'textarea', size: '0.82rem', ko: '더키코, 수진펫, 야옹아멍멍해봐 등 국내 대형 펫 유통 채널에 검증된 제품을 공급합니다.', en: 'Supplying verified products to leading pet specialty retail channels in Korea, including THEKICO, SUJINPET and Dog&Cat Paradise.' },
        ],
      },
      {
        label: '제휴·수출 문의 배너',
        fields: [
          { key: 'ctaImage', label: '배너 사진', type: 'image', width: 1600, height: 2100, src: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1800&q=80' },
          { key: 'ctaEyebrow', label: '작은 라벨', type: 'text', size: '0.66rem', ko: '제휴 및 수출', en: 'Partnership & Export' },
          { key: 'ctaTitle', label: '제목', type: 'textarea', size: '1.1~1.25rem', ko: '국내 유통망을 넘어 세계 시장으로', en: 'Beyond Korea, into new markets.' },
          { key: 'ctaBody', label: '본문', type: 'textarea', size: '0.85rem', ko: '대형 할인마트, 이커머스, 글로벌 바이어와 OEM/ODM 및 수출 파트너십을 진행합니다. 필요한 내용을 알려주세요.', en: 'We work with hypermarkets, e-commerce platforms and global buyers on OEM/ODM and export partnerships. Tell us what you need.' },
          { key: 'ctaButton', label: '버튼 문구', type: 'text', size: '0.84rem', ko: 'B2B 문의하기', en: 'Start an inquiry' },
        ],
      },
    ],
  },

  about: {
    label: '회사소개',
    sections: [
      {
        label: '상단 배너',
        fields: [
          { key: 'heroImage', label: '배경 사진', type: 'image', width: 2560, height: 900, src: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=2560&q=80' },
          { key: 'heroEyebrow', label: '작은 라벨', type: 'text', size: '0.66rem', koOnly: true, ko: 'CORPORATE OVERVIEW & CI' },
          { key: 'heroTitle', label: '페이지 제목', type: 'text', size: '1.35~1.55rem', ko: '회사소개', en: 'About Us' },
          { key: 'heroBody', label: '본문', type: 'textarea', size: '0.85rem', ko: '30년이상 축적된 정직한 기술과 신뢰를 바탕으로 반려동물과 반려인의 행복한 내일을 열어갑니다.', en: 'Opening a happy tomorrow for pets and pet owners based on honest technology and trust accumulated over 30 years.' },
        ],
      },
      {
        label: '대표 인사말',
        fields: [
          { key: 'ceoEyebrow', label: '작은 라벨', type: 'text', size: '0.66rem', koOnly: true, ko: 'CEO MESSAGE' },
          { key: 'ceoHeading', label: '왼쪽 제목', type: 'textarea', size: '1.05~1.15rem', ko: '반려동물과 함께 행복한 세상을 꿈꿉니다', en: 'Dreaming of a happy world together with pets' },
          { key: 'ceoName', label: '대표 이름', type: 'text', size: '0.92rem', ko: '정성훈 대표이사', en: 'Seong-hoon Jeong, CEO' },
          { key: 'ceoCompany', label: '대표 직함/회사', type: 'text', size: '0.78rem', ko: '(주)부명 대표이사', en: '(주)BOOMYOUNG CO., LTD.' },
          { key: 'ceoSignature', label: '대표 서명 이미지', type: 'image', width: 600, height: 180, src: './assets/ceo_signature.png' },
          { key: 'ceoLead', label: '인사말 첫 문장 (손글씨체)', type: 'textarea', size: '1.4rem', ko: '안녕하십니까. 부명(BOOMYOUNG CO., LTD.) 대표이사 정성훈입니다.', en: 'Hello, I am Seong-hoon Jeong, CEO of BOOMYOUNG CO., LTD.' },
          { key: 'ceoBody', label: '인사말 본문 (손글씨체) — 빈 줄로 문단을 나눕니다', type: 'textarea', size: '1.4rem', ko: '부명은 반려동물과 반려인 모두에게 더 나은 제품과 서비스를 제공한다는 목표 아래 반려동물용품을 중심으로 상품 기획, 개발, 유통 및 물류 전반의 사업을 운영하고 있습니다.\n\n빠르게 변화하는 반려동물 시장의 트렌드와 소비자의 요구를 면밀히 분석하여 실용성과 품질을 갖춘 제품을 선보이고, 국내 주요 유통채널과의 안정적인 협력관계를 바탕으로 지속적인 성장을 이어가고 있습니다.\n\n앞으로도 신뢰를 바탕으로 하는 매장과 고객 모두가 만족할 수 있는 경영을 지향하며, 알찬 기획과 고품질 제조 역량으로 시장 지배력을 강화하고 가치 있는 미래를 만들어 가겠습니다. 감사합니다.', en: 'Under the goal of providing better products and services to both pets and pet owners, BOOMYOUNG operates across product planning, development, distribution, and logistics, centered around pet supplies.\n\nWe closely analyze fast-changing pet market trends and consumer demands to introduce practical and high-quality products, maintaining sustainable growth built on stable partnerships with major domestic distribution channels.\n\nGoing forward, we will pursue management that satisfies both stores and customers based on trust, strengthening market leadership through solid planning and high-quality manufacturing capabilities. Thank you.' },
        ],
      },
      {
        label: '섹션 제목',
        fields: [
          { key: 'historyTitle', label: '기업 연혁 제목', type: 'text', size: '1.1~1.2rem', ko: '기업 연혁', en: 'Company History' },
          { key: 'infraTitle', label: '인프라 섹션 제목', type: 'text', size: '1.1~1.2rem', ko: '생산 및 R&D 인프라', en: 'Infrastructure' },
          { key: 'ciTitle', label: 'CI 섹션 제목', type: 'text', size: '1.1~1.2rem', ko: 'CI 소개', en: 'Corporate Identity' },
        ],
      },
    ],
  },

  trust: {
    label: '신뢰와 인증',
    sections: [
      {
        label: '상단 배너',
        fields: [
          { key: 'heroImage', label: '배경 사진', type: 'image', width: 2560, height: 900, src: './assets/trust_hero.png' },
          { key: 'heroEyebrow', label: '작은 라벨', type: 'text', size: '0.66rem', koOnly: true, ko: 'QUALITY & GLOBAL TRUST' },
          { key: 'heroTitle', label: '페이지 제목', type: 'text', size: '1.35~1.55rem', ko: '신뢰와 인증', en: 'Trust & Certification' },
          { key: 'heroBody', label: '본문', type: 'textarea', size: '0.85rem', ko: '엄격한 품질 표준과 글로벌 박람회 출품을 통해 신뢰를 실증합니다.', en: 'Uncompromising safety protocols & international exhibition records.' },
        ],
      },
      {
        label: '품질 인증 섹션',
        fields: [
          { key: 'certEyebrow', label: '작은 라벨', type: 'text', size: '0.66rem', koOnly: true, ko: 'CERTIFICATIONS' },
          { key: 'certTitle', label: '섹션 제목', type: 'text', size: '1.1~1.2rem', ko: '품질 및 안전 인증 시스템', en: 'Quality Management System' },
        ],
      },
      {
        label: '보유 특허 섹션',
        fields: [
          { key: 'patentEyebrow', label: '작은 라벨', type: 'text', size: '0.66rem', koOnly: true, ko: 'INTELLECTUAL PROPERTY' },
          { key: 'patentTitle', label: '섹션 제목', type: 'text', size: '1.1~1.2rem', ko: '보유 특허', en: 'Patents Held' },
          { key: 'patentBody', label: '섹션 본문', type: 'textarea', size: '0.9rem', ko: '(주)부명은 반려동물 사료 및 용품 관련 기술에 대해 특허청(KIPO)에 등록된 특허, 디자인등록, 실용신안을 보유하고 있습니다.', en: 'BOOMYUNG holds patents, design registrations, and a utility model covering our pet food and accessory technologies, registered with the Korean Intellectual Property Office (KIPO).' },
        ],
      },
      {
        label: '유통 네트워크 섹션',
        fields: [
          { key: 'networkEyebrow', label: '작은 라벨', type: 'text', size: '0.66rem', koOnly: true, ko: 'PARTNERSHIP' },
          { key: 'networkTitle', label: '대형 유통 - 섹션 제목', type: 'textarea', size: '1.1~1.2rem', ko: '신뢰로 인정받은 국내 대형 유통 네트워크', en: 'Domestic Distribution Network' },
          { key: 'petDistTitle', label: '펫 전문 유통사 - 섹션 제목', type: 'textarea', size: '1.1~1.2rem', ko: '부명과 함께하는 국내 펫 전문 유통사', en: "Boomyung's Pet Specialty Retail Partners" },
        ],
      },
    ],
  },

  catalog: {
    label: '제품 카탈로그',
    sections: [
      {
        label: '상단 배너',
        note: '제품 카드는 "신규 제품 추가" 탭에서 바꿉니다.',
        fields: [
          { key: 'heroImage', label: '배경 사진', type: 'image', width: 2400, height: 850, src: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?auto=format&fit=crop&w=2400&q=80' },
          { key: 'heroEyebrow', label: '작은 라벨', type: 'text', size: '0.66rem', ko: '제품 카탈로그', en: 'Catalog' },
          { key: 'heroTitle', label: '페이지 제목', type: 'text', size: '1.35~1.55rem', ko: '부명이 만드는 모든 것', en: 'Everything we make.' },
          { key: 'heroBody', label: '본문', type: 'textarea', size: '0.85rem', ko: '4개 전문 펫 브랜드의 사료, 간식, 모래, 용품 전 품목을 한 곳에서 확인하실 수 있습니다.', en: 'Nutrition, treats, litter and daily supplies across four specialised pet brands.' },
        ],
      },
    ],
  },

  contact: {
    label: '문의하기',
    sections: [
      {
        label: '상단 배너',
        fields: [
          { key: 'heroImage', label: '배경 사진', type: 'image', width: 2560, height: 900, src: 'https://images.unsplash.com/photo-1423666639041-f56000c27a9a?auto=format&fit=crop&w=2560&q=80' },
          { key: 'heroEyebrow', label: '작은 라벨', type: 'text', size: '0.66rem', koOnly: true, ko: 'INQUIRY & SALES CONTACT' },
          { key: 'heroTitle', label: '페이지 제목', type: 'text', size: '1.35~1.55rem', ko: 'B2B 입점 및 영업 담당자 문의', en: 'Contact Us & Sales Routing' },
          { key: 'heroBody', label: '본문', type: 'textarea', size: '0.85rem', ko: '(주)부명과 함께 성장할 국내외 파트너사의 문의 및 영업 담당자를 안내합니다.', en: 'Connect with BOOMYUNG for domestic retail distribution and global export partnerships.' },
        ],
      },
      {
        label: '영업 담당자 명함 섹션',
        fields: [
          { key: 'cardsEyebrow', label: '작은 라벨', type: 'text', size: '0.66rem', koOnly: true, ko: 'SALES REPRESENTATIVES' },
          { key: 'cardsTitle', label: '섹션 제목', type: 'textarea', size: '1.1~1.2rem', ko: '부명 영업1팀 · 영업2팀 담당자 명함 안내', en: 'Direct Sales Representatives Business Cards' },
          { key: 'cardsBody', label: '섹션 본문', type: 'textarea', size: '0.82rem', ko: '문의 유형에 맞춰 담당 영업팀 명함을 확인하시거나 직접 연락을 주시면 더욱 빠르고 원활한 상담이 가능합니다.', en: 'Click on the card to inspect high-resolution business card details or reach out directly.' },
        ],
      },
      {
        label: '본사 안내',
        fields: [
          { key: 'hqEyebrow', label: '작은 라벨', type: 'text', size: '0.66rem', koOnly: true, ko: 'HEADQUARTERS' },
          { key: 'hqTitle', label: '제목', type: 'text', size: '1.05~1.15rem', ko: '(주)부명 본사 안내', en: 'Corporate Information' },
          { key: 'hqBody', label: '본문', type: 'textarea', size: '0.82rem', ko: '제품 유통, 대형마트 입점, 해외 수출 및 OEM/ODM 제조 관련 문의를 남겨주시면 담당 파트너십 팀이 안내해 드립니다.', en: 'Feel free to contact us regarding OEM/ODM manufacturing, retail distribution, or global export inquiries.' },
          { key: 'hqAddress', label: '주소', type: 'textarea', size: '0.86rem', ko: '경기도 구리시 건원대로34번길 19 306 (주)부명', en: '306, 19, Geonwon-daero 34beon-gil, Guri-si, Gyeonggi-do, Korea' },
          { key: 'hqTel', label: '전화번호', type: 'text', size: '0.86rem', koOnly: true, ko: '031-553-8003' },
          { key: 'hqFax', label: '팩스번호', type: 'text', size: '0.86rem', koOnly: true, ko: '031-592-2460' },
          { key: 'hqBizNo', label: '사업자등록번호', type: 'text', size: '0.86rem', koOnly: true, ko: '132-81-49973' },
        ],
      },
    ],
  },

  brands: {
    label: '브랜드 (목록 페이지)',
    sections: [
      {
        label: '상단 배너',
        note: '브랜드 카드 내용은 "브랜드 추가 등록" 탭에서 바꿉니다.',
        fields: [
          { key: 'heroImage', label: '배경 사진', type: 'image', width: 2560, height: 900, src: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=2560&q=80' },
          { key: 'heroEyebrow', label: '작은 라벨', type: 'text', size: '0.66rem', koOnly: true, ko: 'OUR PORTFOLIO' },
          { key: 'heroTitle', label: '페이지 제목', type: 'text', size: '1.35~1.55rem', ko: '브랜드 포트폴리오', en: 'Brand Ecosystem' },
          { key: 'heroBody', label: '본문', type: 'textarea', size: '0.85rem', ko: '(주)부명의 전문 펫 브랜드 라인업을 소개합니다.', en: 'Discover our specialized brands tailored for healthy pet life.' },
        ],
      },
    ],
  },

  importedBrands: {
    label: '수입브랜드 (목록 페이지)',
    sections: [
      {
        label: '상단 배너',
        fields: [
          { key: 'heroImage', label: '배경 사진', type: 'image', width: 2560, height: 900, src: './assets/hero_slide_2.jpg' },
          { key: 'heroEyebrow', label: '작은 라벨', type: 'text', size: '0.66rem', koOnly: true, ko: 'IMPORTED PORTFOLIO' },
          { key: 'heroTitle', label: '페이지 제목', type: 'text', size: '1.35~1.55rem', ko: '수입 브랜드', en: 'Imported Brands' },
          { key: 'heroBody', label: '본문', type: 'textarea', size: '0.85rem', ko: '(주)부명이 엄선하여 국내에 유통하는 글로벌 펫 브랜드를 소개합니다.', en: 'Global pet brands carefully selected and distributed by BOOMYUNG.' },
        ],
      },
    ],
  },
  legal: {
    label: '약관 (푸터 팝업)',
    sections: [
      {
        label: '개인정보처리방침',
        note: '푸터 링크를 누르면 뜨는 팝업 내용입니다. 줄바꿈과 빈 줄이 그대로 반영됩니다.',
        fields: [
          { key: 'privacyTitle', label: '팝업 제목', type: 'text', size: '기본', ko: '개인정보처리방침', en: 'Privacy Policy' },
          { key: 'privacyBody', label: '전문', type: 'textarea', size: '0.85rem', ko: "주식회사 부명(이하 '회사'라 함)은 정보주체의 자유와 권리 보호를 위해 「개인정보 보호법」 및 관계 법령이 정한 바를 준수하여, 적법하게 개인정보를 처리하고 안전하게 관리하고 있습니다. 이에 「개인정보 보호법」 제30조에 따라 정보주체에게 개인정보 처리에 관한 절차 및 기준을 안내하고, 이와 관련한 고충을 신속하고 원활하게 처리할 수 있도록 하기 위하여 다음과 같이 개인정보 처리방침을 수립·공개합니다.\n\n제1조 (개인정보의 처리 목적)\n회사는 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며, 이용 목적이 변경되는 경우에는 「개인정보 보호법」 제18조에 따라 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.\n\n1. 고객 문의 및 상담 관리\n   - 제휴·입점 문의, 대량 구매 및 OEM/ODM 상담, 고객 불만 접수 및 처리, 사실 확인을 위한 연락·통지, 처리 결과 통보 등\n2. 서비스 제공 및 계약 이행\n   - 견적서 발송, 비즈니스 협의, 물품 배송 및 계약 체결·이행 등\n3. 신규 서비스 개발 및 마케팅(선택 동의 시)\n   - 신규 서비스 및 제품 안내, 이벤트 및 프로모션 정보 제공(별도 마케팅 동의를 받은 경우에 한함)\n\n제2조 (처리하는 개인정보의 항목)\n회사는 원활한 상담 및 서비스 제공을 위해 최소한의 개인정보를 수집하고 있습니다.\n\n1. 문의하기 / 상담 접수 시\n   - 필수항목: 회사명(또는 성명), 담당자명, 연락처(전화번호 또는 휴대전화번호), 이메일 주소, 문의 내용\n   - 선택항목: 직책/부서, 첨부파일 내 포함된 개인정보 등\n2. 인터넷 서비스 이용 과정에서 자동으로 생성·수집될 수 있는 항목\n   - IP 주소, 쿠키(Cookie), 서비스 이용 기록, 방문 기록 등\n\n제3조 (개인정보의 처리 및 보유 기간)\n① 회사는 법령에 따른 개인정보 보유·이용 기간 또는 정보주체로부터 개인정보 수집 시에 동의받은 개인정보 보유·이용 기간 내에서 개인정보를 처리·보유합니다.\n② 각각의 개인정보 처리 및 보유 기간은 다음과 같습니다.\n\n- 고객 문의 및 상담 정보: 문의 접수 및 상담 완료 후 3년간 보관 (이력 관리 및 분쟁 해결 목적) 후 지체 없이 파기\n- 상법 및 전자상거래 등에서의 소비자보호에 관한 법률 등 관계 법령에 따른 보존 의무가 있는 경우:\n   - 계약 또는 청약철회 등에 관한 기록: 5년\n   - 대금결제 및 재화 등의 공급에 관한 기록: 5년\n   - 소비자의 불만 또는 분쟁처리에 관한 기록: 3년\n   - 웹사이트 방문 기록(통신비밀보호법): 3개월\n\n제4조 (개인정보의 제3자 제공)\n회사는 정보주체의 개인정보를 제1조(개인정보의 처리 목적)에서 명시한 범위 내에서만 처리하며, 정보주체의 동의, 법률의 특별한 규정 등 「개인정보 보호법」 제17조 및 제18조에 해당하는 경우에만 개인정보를 제3자에게 제공합니다.\n\n제5조 (개인정보 처리 업무의 위탁)\n① 회사는 원활한 업무 처리를 위하여 다음과 같이 개인정보 처리업무를 위탁하고 있습니다.\n\n- 수탁업체: 클라우드 서비스 제공사\n- 위탁업무 내용: 홈페이지 시스템 운영 및 서버 관리, 데이터 보관\n\n② 회사는 위탁계약 체결 시 「개인정보 보호법」 제26조에 따라 위탁업무 수행목적 외 개인정보 처리금지, 안전성 확보조치, 재위탁 제한, 수탁자에 대한 관리·감독, 손해배상 등 책임에 관한 사항을 명확히 규정하고 수탁자가 개인정보를 안전하게 처리하는지 감독하고 있습니다.\n\n제6조 (개인정보의 파기 절차 및 방법)\n① 회사는 개인정보 보유기간의 경과, 처리목적 달성 등 개인정보가 불필요하게 되었을 때에는 지체 없이 해당 개인정보를 파기합니다.\n② 파기의 절차 및 방법은 다음과 같습니다.\n\n1. 파기절차: 목적이 달성된 개인정보는 별도의 DB로 옮겨져(종이의 경우 별도의 서류함) 내부 방침 및 기타 관련 법령에 따라 일정 기간 저장된 후 혹은 즉시 파기됩니다.\n2. 파기방법: 전자적 파일 형태의 정보는 기록을 재생할 수 없는 기술적 방법을 사용하여 영구 삭제하며, 종이에 출력된 개인정보는 분쇄기로 분쇄하거나 소각하여 파기합니다.\n\n제7조 (정보주체와 법정대리인의 권리·의무 및 행사방법)\n① 정보주체는 회사에 대해 언제든지 개인정보 열람·정정·삭제·처리정지 요구 등의 권리를 행사할 수 있습니다.\n② 권리 행사는 회사에 대해 서면, 전화, 전자우편(E-mail) 등을 통하여 하실 수 있으며, 회사는 이에 대해 지체 없이 조치하겠습니다.\n③ 정보주체가 개인정보 오류 등의 정정을 요구한 경우, 회사는 정정을 완료할 때까지 당해 개인정보를 이용하거나 제공하지 않습니다.\n\n제8조 (개인정보의 안전성 확보 조치)\n회사는 개인정보의 안전성 확보를 위해 다음과 같은 조치를 취하고 있습니다.\n\n1. 관리적 조치: 내부관리계획 수립·시행, 개인정보 취급 직원의 최소화 및 정기적 교육 실시\n2. 기술적 조치: 개인정보처리시스템 등의 접근권한 관리, 접속기록 보관, 백신 소프트웨어 설치 및 주기적 점검, 네트워크 보안 장비 운영\n3. 물리적 조치: 전산실, 자료보관실 등 개인정보 보관 장소에 대한 접근통제\n\n제9조 (개인정보 자동 수집 장치의 설치·운영 및 거부에 관한 사항)\n① 회사는 이용자에게 개별적인 맞춤서비스를 제공하기 위해 이용정보를 저장하고 수시로 불러오는 '쿠키(cookie)'를 사용할 수 있습니다.\n② 쿠키는 웹사이트를 운영하는 데 이용되는 서버가 이용자의 컴퓨터 브라우저에 보내는 소량의 정보이며 이용자들의 PC 컴퓨터 내의 하드디스크에 저장되기도 합니다.\n\n- 쿠키의 설치·운영 및 거부: 웹브라우저 상단의 [설정] > [개인정보 및 보안] 메뉴를 통해 쿠키 저장을 거부할 수 있습니다.\n- 쿠키 저장을 거부할 경우 맞춤형 서비스 이용에 일부 어려움이 발생할 수 있습니다.\n\n제10조 (개인정보 보호책임자 및 담당부서)\n회사는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 정보주체의 불만처리 및 피해구제 등을 위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다.\n\n- 개인정보 보호책임자\n   - 성명: 조강현\n   - 직책: 과장\n   - 연락처: 070-4256-7389\n   - 이메일: help@petsb2b.co.kr\n\n제11조 (권익침해 구제방법)\n정보주체는 개인정보침해로 인한 구제를 받기 위하여 개인정보분쟁조정위원회, 한국인터넷진흥원 개인정보침해신고센터 등에 분쟁해결이나 상담 등을 신청할 수 있습니다.\n\n- 개인정보분쟁조정위원회: (국번없이) 1833-6972 (www.kopico.go.kr)\n- 개인정보침해신고센터: (국번없이) 118 (privacy.kisa.or.kr)\n- 대검찰청 사이버수사과: (국번없이) 1301 (www.spo.go.kr)\n- 경찰청 사이버수사국: (국번없이) 182 (ecrm.police.go.kr)\n\n제12조 (개인정보 처리방침의 변경)\n이 개인정보 처리방침은 2026년 9월 1일 부터 적용됩니다. 법령 및 방침에 따른 변경내용의 추가, 삭제 및 정정이 있는 경우에는 공지사항을 통하여 고지할 것입니다.", en: "BOOMYUNG CO., LTD. (hereinafter the \"Company\") complies with the Personal Information Protection Act and related laws to lawfully process personal information and protect the freedom and rights of data subjects. In accordance with Article 30 of the Personal Information Protection Act, the Company establishes and discloses this Privacy Policy to inform data subjects of the procedures and standards for processing personal information, and to promptly and smoothly handle related grievances.\n\nArticle 1 (Purpose of Processing Personal Information)\nThe Company processes personal information for the following purposes. Personal information processed will not be used for purposes other than those below, and if the purpose of use changes, the Company will take necessary measures such as obtaining separate consent pursuant to Article 18 of the Personal Information Protection Act.\n\n1. Managing customer inquiries and consultations\n   - Partnership/retail inquiries, bulk purchase and OEM/ODM consultation, receiving and handling customer complaints, contact/notification for fact verification, notification of processing results, etc.\n2. Providing services and fulfilling contracts\n   - Sending quotations, business consultation, delivery of goods, and contract execution/fulfillment\n3. Development of new services and marketing (only with separate consent)\n   - Guidance on new services and products, provision of event and promotional information (only where separate marketing consent has been obtained)\n\nArticle 2 (Items of Personal Information Processed)\nThe Company collects the minimum personal information necessary for smooth consultation and service provision.\n\n1. When submitting an inquiry / consultation request\n   - Required: Company name (or individual name), contact person, phone number, email address, inquiry details\n   - Optional: Job title/department, any personal information contained in attached files\n2. Items that may be automatically generated and collected while using internet services\n   - IP address, cookies, service usage records, visit history, etc.\n\nArticle 3 (Processing and Retention Period of Personal Information)\n① The Company processes and retains personal information within the retention/use period required by law or the period consented to by the data subject at the time of collection.\n② The specific processing and retention periods are as follows.\n\n- Customer inquiry and consultation information: Retained for 3 years after the inquiry/consultation is completed (for record management and dispute resolution purposes), then destroyed without delay\n- Where retention is required by the Commercial Act, the Act on Consumer Protection in Electronic Commerce, and other related laws:\n   - Records on contracts or withdrawal of subscription: 5 years\n   - Records on payment and supply of goods: 5 years\n   - Records on consumer complaints or dispute handling: 3 years\n   - Website visit records (Protection of Communications Secrets Act): 3 months\n\nArticle 4 (Provision of Personal Information to Third Parties)\nThe Company processes data subjects' personal information only within the scope specified in Article 1 (Purpose of Processing Personal Information), and provides personal information to third parties only in cases falling under Articles 17 and 18 of the Personal Information Protection Act, such as with the data subject's consent or where specifically permitted by law.\n\nArticle 5 (Outsourcing of Personal Information Processing)\n① The Company outsources personal information processing tasks as follows for the smooth performance of its operations.\n\n- Contracted party: Cloud service provider\n- Outsourced tasks: Operation of the website system and server management, data storage\n\n② When entering into an outsourcing contract, the Company clearly stipulates matters concerning the prohibition of processing personal information beyond the purpose of the outsourced work, security measures, restrictions on re-outsourcing, management and supervision of the contractor, and liability for damages, in accordance with Article 26 of the Personal Information Protection Act, and supervises whether the contractor safely processes personal information.\n\nArticle 6 (Procedures and Methods of Destroying Personal Information)\n① The Company destroys personal information without delay once the retention period has elapsed or the processing purpose has been achieved and the information becomes unnecessary.\n② The procedures and methods of destruction are as follows.\n\n1. Destruction procedure: Personal information for which the purpose has been achieved is transferred to a separate database (or a separate document storage for paper records) and is stored for a certain period in accordance with internal policy and relevant laws before being destroyed, or is destroyed immediately.\n2. Destruction method: Information in electronic file form is permanently deleted using technical methods that make the records unrecoverable, and personal information printed on paper is destroyed by shredding or incineration.\n\nArticle 7 (Rights and Obligations of Data Subjects and Legal Representatives, and Methods of Exercise)\n① Data subjects may exercise their rights to view, correct, delete, and request suspension of processing of their personal information at any time against the Company.\n② Such rights may be exercised in writing, by telephone, or by email, and the Company will take action without delay.\n③ If a data subject requests correction of an error in their personal information, the Company will not use or provide the relevant personal information until the correction is completed.\n\nArticle 8 (Measures to Ensure the Security of Personal Information)\nThe Company takes the following measures to ensure the security of personal information.\n\n1. Administrative measures: Establishment and implementation of an internal management plan, minimization and regular training of employees handling personal information\n2. Technical measures: Access authority management for the personal information processing system, retention of access records, installation and periodic inspection of anti-virus software, operation of network security equipment\n3. Physical measures: Access control for locations where personal information is stored, such as server rooms and data storage rooms\n\nArticle 9 (Installation, Operation, and Refusal of Automatic Personal Information Collection Devices)\n① The Company may use \"cookies\" that store and periodically retrieve usage information in order to provide personalized services to users.\n② Cookies are small pieces of information sent by the server operating the website to the user's browser and may be stored on the hard disk of the user's computer.\n\n- Setting/refusing cookies: Users can refuse to allow cookies by changing the settings in [Settings] > [Privacy and Security] in their web browser.\n- If cookie storage is refused, some difficulties may occur in using personalized services.\n\nArticle 10 (Personal Information Protection Officer and Department in Charge)\nThe Company designates a Personal Information Protection Officer as follows, who is responsible for overall personal information processing tasks and handles complaints and remedies related to personal information processing.\n\n- Personal Information Protection Officer\n   - Name: Kang-hyun Cho\n   - Title: Manager\n   - Contact: 070-4256-7389\n   - Email: help@petsb2b.co.kr\n\nArticle 11 (Remedies for Infringement of Rights)\nData subjects may apply for dispute resolution or consultation with the Personal Information Dispute Mediation Committee, the Korea Internet & Security Agency's Personal Information Infringement Report Center, and other relevant institutions to obtain relief for infringement of personal information.\n\n- Personal Information Dispute Mediation Committee: 1833-6972 (www.kopico.go.kr)\n- Personal Information Infringement Report Center: 118 (privacy.kisa.or.kr)\n- Supreme Prosecutors' Office Cyber Investigation Division: 1301 (www.spo.go.kr)\n- National Police Agency Cyber Investigation Bureau: 182 (ecrm.police.go.kr)\n\nArticle 12 (Changes to the Privacy Policy)\nThis Privacy Policy is effective from September 1, 2026. Any additions, deletions, or corrections to this Policy due to changes in laws or company policy will be announced through the notice board." },
        ],
      },
      {
        label: '이용약관',
        fields: [
          { key: 'termsTitle', label: '팝업 제목', type: 'text', size: '기본', ko: '이용약관', en: 'Terms of Service' },
          { key: 'termsBody', label: '전문', type: 'textarea', size: '0.85rem', ko: "서비스 이용약관\n\n제1조 (목적)\n본 약관은 주식회사 부명(이하 \"회사\"라 함)이 운영하는 공식 웹사이트(이하 \"홈페이지\"라 함)에서 제공하는 인터넷 관련 서비스(이하 \"서비스\"라 함)를 이용함에 있어 회사와 이용자의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.\n\n제2조 (정의)\n\n1. \"홈페이지\"란 회사가 상품 정보, 기업 정보, 인프라 현황 등의 정보를 이용자에게 제공하고 상담 접수 및 제휴 문의를 처리하기 위해 컴퓨터 등 정보통신설비를 이용하여 구축한 가상의 공간을 의미합니다.\n2. \"이용자\"란 홈페이지에 접속하여 본 약관에 따라 회사가 제공하는 서비스를 이용하는 고객 및 방문자를 말합니다.\n3. \"콘텐츠\"란 홈페이지에 게시된 부호, 문자, 음성, 음향, 이미지, 영상, 그래픽 등 일체의 정보 및 데이터를 의미합니다.\n\n제3조 (약관의 명시와 개정)\n\n1. 회사는 본 약관의 내용과 상호, 대표자 성명, 영업소 소재지 주소, 사업자등록번호, 연락처 등을 이용자가 쉽게 알 수 있도록 홈페이지 하단 또는 연결 화면에 게시합니다.\n2. 회사는 「약관의 규제에 관한 법률」, 「정보통신망 이용촉진 및 정보보호 등에 관한 법률」 등 관련 법령을 위배하지 않는 범위에서 본 약관을 개정할 수 있습니다.\n3. 회사가 약관을 개정할 경우에는 적용일자 및 개정 사유를 명시하여 현행 약관과 함께 개정 약관 적용일 최소 7일 전부터 홈페이지 공지사항 등을 통해 공지합니다. 단, 이용자에게 불리한 내용으로 변경되는 경우에는 최소 30일 이상의 유예기간을 두고 공지합니다.\n4. 이용자가 개정 약관의 적용에 동의하지 않는 경우 홈페이지 이용을 중단할 수 있으며, 개정 약관의 적용일 이후에도 계속해서 서비스를 이용하는 경우에는 변경된 약관에 동의한 것으로 봅니다.\n\n제4조 (서비스의 제공 및 변경)\n\n1. 회사는 홈페이지를 통해 다음과 같은 서비스를 제공합니다.\n   - 회사 소개, 연구개발(R&D), 생산 및 물류 인프라 정보 제공\n   - 생산 제품, 유통 브랜드 및 취급 품목 안내\n   - 사업 제휴, OEM/ODM 및 대량 구매 상담 접수 창구 운영\n   - 공지사항, 채용 정보 등 기타 회사가 정하는 제반 안내 서비스\n2. 회사는 기술적 사양의 변경이나 경영상의 정책 변경 등의 사유가 있는 경우 서비스의 내용을 변경할 수 있으며, 이 경우 홈페이지를 통해 안내합니다.\n\n제5조 (서비스의 중단)\n\n1. 회사는 컴퓨터 등 정보통신설비의 보수·점검·교체 및 고장, 통신의 두절 또는 천재지변 등의 불가항력적인 사유가 발생한 경우에는 서비스의 제공을 일시적으로 중단할 수 있습니다.\n2. 회사는 시스템 정기점검 등 필요한 경우 사전에 홈페이지를 통해 공지한 후 서비스 제공을 일시 중단할 수 있습니다.\n3. 회사는 제1항 및 제2항의 사유로 인한 서비스 중단으로 인해 이용자에게 발생한 손해에 대하여 고의 또는 중대한 과실이 없는 한 책임을 부담하지 않습니다.\n\n제6조 (이용자의 의무)\n이용자는 홈페이지를 이용할 때 다음 각 호의 행위를 하여서는 안 됩니다.\n\n1. 온라인 상담, 제휴 문의 등 작성 시 허위 사실을 기재하거나 타인의 정보를 도용하는 행위\n2. 홈페이지에 게시된 정보, 텍스트, 이미지 등을 회사의 사전 승낙 없이 무단으로 복제, 배포, 출판, 방송 기타 상업적 목적으로 이용하거나 제3자에게 제공하는 행위\n3. 회사 및 제3자의 저작권, 상표권, 특허권 등 지식재산권을 침해하는 행위\n4. 회사 및 제3자의 명예를 훼손하거나 업무를 방해하는 행위\n5. 외설, 폭력적인 메시지나 화상, 음성, 기타 공서양속에 반하는 정보를 전달하거나 유포하는 행위\n6. 회사의 시스템이나 서버에 무단으로 접근하거나 컴퓨터 바이러스 감염 자료를 등록·유포하는 등 정상적인 운영을 방해하는 행위\n7. 기타 관계 법령 및 본 약관에서 금지하는 행위\n\n제7조 (저작권 및 지식재산권의 귀속)\n\n1. 회사가 작성한 홈페이지 내 디자인, UI/UX, 브랜드 로고, 상표, 텍스트, 이미지, 영상, 카탈로그, 기술 설명서 등 모든 저작물에 대한 저작권 및 기타 지식재산권은 회사에 귀속됩니다.\n2. 이용자는 홈페이지를 이용함으로써 얻은 정보 중 회사에게 지식재산권이 귀속된 정보를 회사의 명시적인 사전 서면 승낙 없이 복제, 송신, 출판, 배포, 방송 기타 방법에 의하여 영리 목적으로 이용하거나 제3자에게 이용하게 하여서는 안 됩니다.\n\n제8조 (면책 조항)\n\n1. 회사는 천재지변, 전쟁, 기간통신사업자의 서비스 중지 또는 이에 준하는 불가항력으로 인하여 서비스를 제공할 수 없는 경우에는 서비스 제공에 관한 책임이 면제됩니다.\n2. 회사는 홈페이지에 게재된 정보, 자료, 사실의 신뢰도 및 정확성에 대해 선량한 관리자로서 주의를 기울이나, 이용자가 이를 신뢰하여 행한 결정이나 거래로 인해 발생한 직·간접적 손해에 대하여 회사의 고의 또는 중과실이 없는 한 책임을 지지 않습니다.\n3. 회사는 이용자가 홈페이지를 매개로 제3자와 행한 거래나 분쟁에 대하여 개입할 의무가 없으며, 이로 인한 손해를 배상할 책임을 지지 않습니다.\n4. 회사는 무료로 제공되는 홈페이지 정보 조회 및 문의 서비스의 이용과 관련하여 관련 법령에 특별한 규정이 없는 한 책임을 부담하지 않습니다.\n\n제9조 (분쟁 해결 및 관할 법원)\n\n1. 회사와 이용자는 홈페이지 서비스 이용과 관련하여 발생한 분쟁을 원만하게 해결하기 위하여 성실히 협의합니다.\n2. 본 약관과 관련된 분쟁에 대해서는 대한민국 법률을 준거법으로 적용합니다.\n3. 회사와 이용자 간에 발생한 분쟁으로 인하여 소송이 제기될 경우, 회사의 본점 소재지를 관할하는 법원을 전속관할 법원으로 합니다.", en: "Terms of Service\n\nArticle 1 (Purpose)\nThese Terms of Service (\"Terms\") govern the rights, obligations, and responsibilities of BOOMYUNG CO., LTD. (hereinafter the \"Company\") and users in connection with the internet-related services (hereinafter the \"Service\") provided through the Company's official website (hereinafter the \"Website\").\n\nArticle 2 (Definitions)\n\n1. \"Website\" means the virtual space established by the Company using computers and other information and communications facilities to provide users with product information, corporate information, infrastructure status, and other information, and to process consultation requests and partnership inquiries.\n2. \"User\" means a customer or visitor who accesses the Website and uses the services provided by the Company in accordance with these Terms.\n3. \"Content\" means all information and data, including signs, characters, voice, sound, images, video, and graphics, posted on the Website.\n\nArticle 3 (Disclosure and Amendment of Terms)\n\n1. The Company posts the content of these Terms, along with the company name, name of the representative, address of the place of business, business registration number, and contact information, at the bottom of the Website or on a linked page so that users can easily access them.\n2. The Company may amend these Terms to the extent that it does not violate the Act on the Regulation of Terms and Conditions, the Act on Promotion of Information and Communications Network Utilization and Information Protection, and other related laws.\n3. When amending the Terms, the Company will specify the effective date and reasons for the amendment and announce it, together with the current Terms, through the notice board on the Website at least 7 days prior to the effective date of the amended Terms. However, if the amendment is unfavorable to users, the Company will provide at least 30 days' notice.\n4. If a user does not agree to the application of the amended Terms, the user may discontinue use of the Website. Continued use of the Service after the effective date of the amended Terms will be deemed as agreement to the amended Terms.\n\nArticle 4 (Provision and Modification of Services)\n\n1. The Company provides the following services through the Website.\n   - Providing information on company overview, R&D, and production/logistics infrastructure\n   - Providing information on manufactured products, distribution brands, and handled items\n   - Operating a reception channel for business partnership, OEM/ODM, and bulk purchase inquiries\n   - Other general information services determined by the Company, such as notices and recruitment information\n2. The Company may change the content of the Service due to changes in technical specifications or management policy, and will notify users of such changes through the Website in such cases.\n\nArticle 5 (Suspension of Service)\n\n1. The Company may temporarily suspend the provision of the Service in the event of maintenance, inspection, replacement, or failure of computers or other information and communications facilities, communication outages, or force majeure events such as natural disasters.\n2. The Company may temporarily suspend the Service for necessary reasons, such as regular system maintenance, after giving prior notice through the Website.\n3. The Company shall not be liable for any damages incurred by users due to service suspension under paragraphs 1 and 2, unless caused by the Company's intent or gross negligence.\n\nArticle 6 (Obligations of Users)\nUsers shall not engage in any of the following acts while using the Website.\n\n1. Providing false information or using another person's information without authorization when submitting online consultations, partnership inquiries, etc.\n2. Reproducing, distributing, publishing, broadcasting, or otherwise using for commercial purposes, or providing to third parties, information, text, images, etc. posted on the Website without the Company's prior consent\n3. Infringing on the copyrights, trademark rights, patent rights, or other intellectual property rights of the Company or third parties\n4. Damaging the reputation of, or interfering with the business of, the Company or third parties\n5. Transmitting or distributing obscene or violent messages, images, sounds, or other information contrary to public order and morals\n6. Gaining unauthorized access to the Company's systems or servers, or registering or distributing materials infected with computer viruses, thereby interfering with normal operations\n7. Any other acts prohibited by relevant laws and these Terms\n\nArticle 7 (Ownership of Copyright and Intellectual Property Rights)\n\n1. Copyrights and other intellectual property rights in all works created by the Company on the Website, including design, UI/UX, brand logos, trademarks, text, images, video, catalogs, and technical documentation, belong to the Company.\n2. Users shall not reproduce, transmit, publish, distribute, broadcast, or otherwise use for profit, or allow third parties to use, information obtained through use of the Website to which the Company's intellectual property rights are attached, without the Company's prior written consent.\n\nArticle 8 (Disclaimer)\n\n1. The Company is exempted from liability for providing the Service if it is unable to do so due to natural disasters, war, suspension of service by a telecommunications carrier, or other force majeure events.\n2. The Company exercises the care of a good manager with respect to the reliability and accuracy of information, materials, and facts posted on the Website, but shall not be liable for any direct or indirect damages arising from decisions or transactions made by users in reliance on such information, unless caused by the Company's intent or gross negligence.\n3. The Company has no obligation to intervene in any transactions or disputes between users and third parties conducted through the Website, and shall not be liable for any damages arising therefrom.\n4. The Company shall not be liable for the use of free information inquiry and inquiry services provided on the Website, unless otherwise specifically provided by relevant laws.\n\nArticle 9 (Dispute Resolution and Jurisdiction)\n\n1. The Company and users shall make good-faith efforts to amicably resolve any disputes arising in connection with the use of the Website Service.\n2. Disputes related to these Terms shall be governed by the laws of the Republic of Korea.\n3. In the event of litigation arising from a dispute between the Company and a user, the court having jurisdiction over the location of the Company's headquarters shall have exclusive jurisdiction." },
        ],
      },
    ],
  },
};
