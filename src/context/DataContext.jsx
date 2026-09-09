import React, { createContext, useContext, useState, useEffect } from 'react';
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

  useEffect(() => {
    localStorage.setItem(BRANDS_KEY, JSON.stringify(brands));
  }, [brands]);

  useEffect(() => {
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(siteSettings));
  }, [siteSettings]);

  const addBrand = (newBrand) => {
    setBrands(prev => [newBrand, ...prev]);
  };

  const deleteBrand = (id) => {
    setBrands(prev => prev.filter(b => b.id !== id));
  };

  const updateBrand = (id, updates) => {
    setBrands(prev => prev.map(b => b.id === id ? { ...b, ...updates } : b));
  };

  const addProduct = (newProduct) => {
    setProducts(prev => [newProduct, ...prev]);
  };

  const deleteProduct = (id) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const updateProduct = (id, updates) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
  };

  const updateSiteSettings = (updates) => {
    setSiteSettings(prev => ({ ...prev, ...updates }));
  };

  const resetData = () => {
    setBrands(initialBrands);
    setProducts(initialProducts);
    setSiteSettings(defaultSiteSettings);
    localStorage.removeItem(BRANDS_KEY);
    localStorage.removeItem(PRODUCTS_KEY);
    localStorage.removeItem(SETTINGS_KEY);
  };

  return (
    <DataContext.Provider value={{
      brands, products, addBrand, deleteBrand, updateBrand, addProduct, deleteProduct, updateProduct, resetData,
      siteSettings, updateSiteSettings
    }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  return useContext(DataContext);
}
