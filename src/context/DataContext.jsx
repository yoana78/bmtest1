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

// 관리자 페이지에서 저장한 데이터를 모두가 볼 수 있도록 서버(D1)에도 동기화한다.
// D1로 옮기면서 /api/data 통짜 저장 방식 대신 브랜드/제품 각각을 개별 엔드포인트로
// 저장한다 (homepage와 동일한 구조) — /api/data는 이제 공개 조회 전용 GET만 지원.
function authHeaders() {
  const password = sessionStorage.getItem('admin_pw');
  return { 'Content-Type': 'application/json', ...(password ? { Authorization: `Bearer ${password}` } : {}) };
}

async function persistBrand(method, id, body) {
  try {
    if (!sessionStorage.getItem('admin_pw')) return; // 관리자로 로그인한 상태가 아니면 서버에 쓰지 않음
    const url = method === 'POST' ? '/api/brands' : `/api/brands/${encodeURIComponent(id)}`;
    const res = await fetch(url, { method, headers: authHeaders(), body: body !== undefined ? JSON.stringify(body) : undefined });
    if (!res.ok) throw new Error(`save failed: ${res.status}`);
  } catch (err) {
    console.error('서버 저장 실패 - 이 브라우저에는 반영되었지만 다른 방문자에게는 보이지 않을 수 있습니다.', err);
    window.alert('서버 저장에 실패했습니다. 네트워크 상태를 확인하고 다시 시도해 주세요.');
  }
}

async function persistProduct(method, id, body) {
  try {
    if (!sessionStorage.getItem('admin_pw')) return;
    const url = method === 'POST' ? '/api/products' : `/api/products/${encodeURIComponent(id)}`;
    const res = await fetch(url, { method, headers: authHeaders(), body: body !== undefined ? JSON.stringify(body) : undefined });
    if (!res.ok) throw new Error(`save failed: ${res.status}`);
  } catch (err) {
    console.error('서버 저장 실패 - 이 브라우저에는 반영되었지만 다른 방문자에게는 보이지 않을 수 있습니다.', err);
    window.alert('서버 저장에 실패했습니다. 네트워크 상태를 확인하고 다시 시도해 주세요.');
  }
}

async function persistSettings(updates) {
  try {
    if (!sessionStorage.getItem('admin_pw')) return;
    const res = await fetch('/api/settings', { method: 'PUT', headers: authHeaders(), body: JSON.stringify(updates) });
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

  // D1로 옮기면서 "통짜 동기화" 개념 자체가 없어짐 - 각 편집이 그 즉시 개별
  // 엔드포인트로 저장되므로, 로그인 시점에 따로 밀어 올릴 것이 없다. 기존
  // 호출부(Admin.jsx)만 건드리지 않도록 시그니처는 남겨둔다.
  const syncNow = () => {};

  const addBrand = (newBrand) => {
    setBrands((prev) => [...prev, newBrand]);
    persistBrand('POST', null, newBrand);
  };

  const deleteBrand = (id) => {
    setBrands((prev) => prev.filter((b) => b.id !== id));
    persistBrand('DELETE', id);
  };

  const updateBrand = (id, updates) => {
    setBrands((prev) => prev.map((b) => (b.id === id ? { ...b, ...updates } : b)));
    persistBrand('PUT', id, updates);
  };

  const addProduct = (newProduct) => {
    setProducts((prev) => [...prev, newProduct]);
    persistProduct('POST', null, newProduct);
  };

  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    persistProduct('DELETE', id);
  };

  const updateProduct = (id, updates) => {
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, ...updates } : p)));
    persistProduct('PUT', id, updates);
  };

  const updateSiteSettings = (updates) => {
    setSiteSettings((prev) => ({ ...prev, ...updates }));
    persistSettings(updates);
  };

  const resetData = async () => {
    try {
      if (!sessionStorage.getItem('admin_pw')) return;
      const res = await fetch('/api/reset', { method: 'POST', headers: authHeaders() });
      if (!res.ok) throw new Error('reset failed');
      const data = await fetch('/api/data').then((r) => r.json());
      setBrands(data.brands || initialBrands);
      setProducts(data.products || initialProducts);
      setSiteSettings({ ...defaultSiteSettings, ...(data.siteSettings || {}) });
      localStorage.removeItem(BRANDS_KEY);
      localStorage.removeItem(PRODUCTS_KEY);
      localStorage.removeItem(SETTINGS_KEY);
    } catch (err) {
      console.error('초기화 실패', err);
      window.alert('초기화에 실패했습니다. 네트워크 상태를 확인하고 다시 시도해 주세요.');
    }
  };

  // 이미지 파일을 서버에 업로드하고, 모든 방문자에게 보이는 공개 URL(/api/images/:id)을 돌려받음
  const uploadImage = async (dataUrl) => {
    const res = await fetch('/api/upload', { method: 'POST', headers: authHeaders(), body: JSON.stringify({ dataUrl }) });
    if (!res.ok) throw new Error((await res.json()).error || '이미지 업로드 실패');
    const { url } = await res.json();
    return url;
  };

  return (
    <DataContext.Provider value={{
      brands, products, addBrand, deleteBrand, updateBrand, addProduct, deleteProduct, updateProduct, resetData,
      siteSettings, updateSiteSettings, syncNow, uploadImage
    }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  return useContext(DataContext);
}
