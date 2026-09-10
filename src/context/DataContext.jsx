import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { brands as initialBrands } from '../data/brands';
import { products as initialProducts } from '../data/products';

const DataContext = createContext();

// Bump this when initialBrands/initialProducts change shape or content so
// browsers holding an older admin-edited snapshot in localStorage fall back
// to the shipped data instead of showing stale/broken entries.
// brands.js에 type 필드(own/imported)와 수입 브랜드 5종이 추가되어 데이터 모양이 바뀌었으므로 버전을 올림 —
// 이전 버전 localStorage 캐시를 쓰던 브라우저도 새 기본 데이터로 다시 시작하게 됨
const DATA_VERSION = '9';
const BRANDS_KEY = `boomyung_brands_v${DATA_VERSION}`;
const PRODUCTS_KEY = `boomyung_products_v${DATA_VERSION}`;
const SETTINGS_KEY = 'boomyung_site_settings_v2';

// 사이트 설정 기본값 - 관리자 페이지 "사이트 설정" 탭에서 바꾸지 않으면 이 값이 쓰임
// heroImage: 홈 화면 최상단 시네마틱 인트로 배경 사진 (단일 이미지, 캐러셀 아님)
const defaultSiteSettings = {
  contactEmail: 'help@petsb2b.co.kr',
  heroImage: './assets/hero_slide_4.jpg'
};

// 관리자 페이지에서 저장한 데이터를 모두가 볼 수 있도록 서버(Cloudflare KV)에도 동기화한다.
// /api/data가 없는 환경(예: 순수 vite dev 서버)에서는 조용히 무시되고 기존 localStorage 방식 그대로 동작한다.
async function persistToServer(partial) {
  try {
    const password = sessionStorage.getItem('admin_pw');
    if (!password) return; // 관리자로 로그인한 상태가 아니면 서버에 쓰지 않음
    const res = await fetch('/api/data', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-admin-password': password },
      body: JSON.stringify(partial)
    });
    if (!res.ok) throw new Error(`save failed: ${res.status}`);
  } catch (err) {
    console.error('서버 저장 실패 - 이 브라우저에는 반영되었지만 다른 방문자에게는 보이지 않을 수 있습니다.', err);
    window.alert('서버 저장에 실패했습니다. 네트워크 상태를 확인하고 다시 시도해 주세요.');
  }
}

export function DataProvider({ children }) {
  const [brands, setBrands] = useState(() => {
    const saved = localStorage.getItem(BRANDS_KEY);
    return saved ? JSON.parse(saved) : initialBrands;
  });

  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem(PRODUCTS_KEY);
    return saved ? JSON.parse(saved) : initialProducts;
  });

  const [siteSettings, setSiteSettings] = useState(() => {
    const saved = localStorage.getItem(SETTINGS_KEY);
    return saved ? { ...defaultSiteSettings, ...JSON.parse(saved) } : defaultSiteSettings;
  });

  const hydrated = useRef(false);

  useEffect(() => {
    localStorage.setItem(BRANDS_KEY, JSON.stringify(brands));
  }, [brands]);

  useEffect(() => {
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(siteSettings));
  }, [siteSettings]);

  // 최초 마운트 시 서버(KV) 데이터를 가져와 로컬 상태에 반영한다.
  // (관리자 로그인 여부와 무관하게 모든 방문자가 실행 - GET은 인증이 필요 없음)
  useEffect(() => {
    if (hydrated.current) return;
    hydrated.current = true;

    fetch('/api/data')
      .then((res) => (res.ok ? res.json() : null))
      .then((server) => {
        if (!server) return;
        if (server.brands) setBrands(server.brands);
        if (server.products) setProducts(server.products);
        if (server.siteSettings) setSiteSettings({ ...defaultSiteSettings, ...server.siteSettings });
      })
      .catch(() => {
        // /api/data 자체가 없는 환경(예: 순수 vite dev) - 기존 localStorage 동작 유지
      });
  }, []);

  // 관리자가 로그인한 직후 호출 - 이 브라우저에 남아있던 localStorage 데이터(로그인 전에는 서버에
  // 반영되지 않았을 수 있는 이전 테스트 편집분 포함)를 서버로 밀어 올려 모든 방문자에게 반영되게 한다.
  const syncNow = () => {
    persistToServer({ brands, products, siteSettings });
  };

  const addBrand = (newBrand) => {
    setBrands((prev) => {
      const next = [newBrand, ...prev];
      persistToServer({ brands: next });
      return next;
    });
  };

  const deleteBrand = (id) => {
    setBrands((prev) => {
      const next = prev.filter((b) => b.id !== id);
      persistToServer({ brands: next });
      return next;
    });
  };

  const updateBrand = (id, updates) => {
    setBrands((prev) => {
      const next = prev.map((b) => (b.id === id ? { ...b, ...updates } : b));
      persistToServer({ brands: next });
      return next;
    });
  };

  const addProduct = (newProduct) => {
    setProducts((prev) => {
      const next = [newProduct, ...prev];
      persistToServer({ products: next });
      return next;
    });
  };

  const deleteProduct = (id) => {
    setProducts((prev) => {
      const next = prev.filter((p) => p.id !== id);
      persistToServer({ products: next });
      return next;
    });
  };

  const updateProduct = (id, updates) => {
    setProducts((prev) => {
      const next = prev.map((p) => (p.id === id ? { ...p, ...updates } : p));
      persistToServer({ products: next });
      return next;
    });
  };

  const updateSiteSettings = (updates) => {
    setSiteSettings((prev) => {
      const next = { ...prev, ...updates };
      persistToServer({ siteSettings: next });
      return next;
    });
  };

  const resetData = () => {
    setBrands(initialBrands);
    setProducts(initialProducts);
    setSiteSettings(defaultSiteSettings);
    localStorage.removeItem(BRANDS_KEY);
    localStorage.removeItem(PRODUCTS_KEY);
    localStorage.removeItem(SETTINGS_KEY);
    persistToServer({ brands: initialBrands, products: initialProducts, siteSettings: defaultSiteSettings });
  };

  return (
    <DataContext.Provider value={{
      brands, products, addBrand, deleteBrand, updateBrand, addProduct, deleteProduct, updateProduct, resetData,
      siteSettings, updateSiteSettings, syncNow
    }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  return useContext(DataContext);
}
