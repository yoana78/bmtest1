import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { useLanguage } from '../i18n/LanguageContext';

// 업로드한 이미지를 D1에 저장하기 전에 용량을 줄인다 (D1 행 크기 제한 대비).
// PNG(투명 배경)는 PNG로, 그 외는 용량이 훨씬 작은 JPEG로 인코딩.
function compressImage(file, { maxDimension = 1600, startQuality = 0.85, maxBase64Length = 850000 } = {}) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const objectUrl = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(objectUrl);
      let { width, height } = img;
      // "긴 쪽" 기준이 아니라 가로 폭 기준으로만 1차 축소한다 — 세로로 아주 긴 상세페이지
      // 인포그래픽(예: 800x6563)을 긴 쪽(세로) 기준으로 줄이면 가로 폭이 200px 밑으로 떨어져
      // 글자를 알아볼 수 없게 된다.
      if (width > maxDimension) {
        const scale = maxDimension / width;
        width = maxDimension;
        height = Math.round(height * scale);
      }
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, width, height);

      const keepPng = file.type === 'image/png';
      let quality = startQuality;
      let dataUrl = canvas.toDataURL(keepPng ? 'image/png' : 'image/jpeg', quality);

      while (dataUrl.length > maxBase64Length && (quality > 0.3 || canvas.width > 300)) {
        if (quality > 0.3) quality -= 0.1;
        if (keepPng || quality <= 0.3) {
          canvas.width = Math.round(canvas.width * 0.85);
          canvas.height = Math.round(canvas.height * 0.85);
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          dataUrl = canvas.toDataURL(keepPng ? 'image/png' : 'image/jpeg', keepPng ? undefined : quality);
        } else {
          dataUrl = canvas.toDataURL('image/jpeg', quality);
        }
      }
      resolve(dataUrl);
    };
    img.onerror = reject;
    img.src = objectUrl;
  });
}

// 카테고리가 "사료"/"간식"일 때만 등록 성분량(조단백/조지방/조섬유/수분)을 저장한다.
const CATEGORIES_WITH_NUTRITION = ['사료', '간식'];
function buildNutrition(category, { protein, fat, fiber, moisture }) {
  if (!CATEGORIES_WITH_NUTRITION.includes(category)) return undefined;
  if (!protein && !fat && !fiber && !moisture) return undefined;
  return { protein, fat, fiber, moisture };
}

export default function Admin() {
  const { lang } = useLanguage();
  const isEn = lang === 'en';
  const {
    brands, products, addBrand, deleteBrand, updateBrand, addProduct, deleteProduct, updateProduct, resetData,
    siteSettings, updateSiteSettings, syncNow, uploadImage
  } = useData();

  // 파일을 압축한 뒤 서버(/api/upload)에 업로드하고, 모든 방문자에게 보이는 공개 URL을 돌려받는 공용 헬퍼
  const readAndUpload = async (file) => {
    const dataUrl = await compressImage(file);
    return uploadImage(dataUrl);
  };
  const [productFilterBrand, setProductFilterBrand] = useState('');
  const [productSearch, setProductSearch] = useState('');
  const [settingsEmail, setSettingsEmail] = useState(siteSettings.contactEmail);

  // Password Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const [activeTab, setActiveTab] = useState('brand');
  const [successMsg, setSuccessMsg] = useState('');

  // 1. Brand Form State
  const [brandForm, setBrandForm] = useState({
    nameKo: '',
    nameEn: '',
    type: 'own', // 'own' = 브랜드 페이지, 'imported' = 수입브랜드 페이지
    tagline: '',
    taglineEn: '',
    descriptionKo: '',
    descriptionEn: '',
    color: '#0066B3',
    logo: ''
  });

  // 기존 브랜드 수정 팝업
  const [editingBrandId, setEditingBrandId] = useState(null);
  const [editBrandForm, setEditBrandForm] = useState({
    nameKo: '', nameEn: '', type: 'own', tagline: '', taglineEn: '', descriptionKo: '', descriptionEn: '', color: '#0066B3', logo: ''
  });

  // 2. Product Form State
  const [productForm, setProductForm] = useState({
    nameKo: '',
    nameEn: '',
    brandId: '',
    category: '사료',
    petType: 'dog',
    code: '',
    spec: '',
    shelfLife: '제조일로부터 18개월까지',
    origin: '대한민국',
    features: '',
    ingredients: '',
    image: '',
    purchaseUrl: '',
    infoImages: [],
    protein: '', fat: '', fiber: '', moisture: ''
  });

  // 기존 제품 수정 팝업
  const [editingProductId, setEditingProductId] = useState(null);
  const [editingProductOriginal, setEditingProductOriginal] = useState(null);
  const [editForm, setEditForm] = useState({
    nameKo: '', nameEn: '', brandId: '', category: '사료', petType: 'dog', code: '', spec: '',
    shelfLife: '', origin: '', features: '', ingredients: '', image: '', purchaseUrl: '', infoImages: [],
    protein: '', fat: '', fiber: '', moisture: ''
  });

  // 관리자 저장 시 한국어 필드를 영문으로 자동 번역 (이미 값이 있으면 건드리지 않음)
  const translateText = async (text) => {
    if (!text || !text.trim()) return '';
    try {
      const token = sessionStorage.getItem('admin_pw') || '';
      const res = await fetch('/api/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ text })
      });
      if (!res.ok) return '';
      const { translated } = await res.json();
      return translated || '';
    } catch {
      return '';
    }
  };

  const translateProductFields = async ({ nameKo, nameEn, origin, originEn, shelfLife, shelfLifeEn, ingredients, ingredientsEn, features, featuresEn }) => {
    const [tNameEn, tOriginEn, tShelfLifeEn, tIngredientsEn, tFeaturesEn] = await Promise.all([
      nameEn || translateText(nameKo),
      originEn || translateText(origin),
      shelfLifeEn || translateText(shelfLife),
      ingredientsEn || translateText(ingredients),
      featuresEn && featuresEn.length ? featuresEn : Promise.all((features || []).map(translateText))
    ]);
    return { nameEn: tNameEn, originEn: tOriginEn, shelfLifeEn: tShelfLifeEn, ingredientsEn: tIngredientsEn, featuresEn: tFeaturesEn };
  };

  // Delete Brand
  const handleDeleteBrand = (brand) => {
    const usedByProducts = products.some(p => p.brandId === brand.id);
    const confirmMsg = usedByProducts
      ? (isEn
          ? `"${brand.nameKo}" has products linked to it. Delete the brand anyway? (linked products will remain but show no brand)`
          : `"${brand.nameKo}" 브랜드에 연결된 제품이 있습니다. 그래도 브랜드를 삭제하시겠습니까? (연결된 제품은 남지만 브랜드 정보가 사라집니다)`)
      : (isEn ? `Delete brand "${brand.nameKo}"?` : `"${brand.nameKo}" 브랜드를 삭제하시겠습니까?`);
    if (window.confirm(confirmMsg)) {
      deleteBrand(brand.id);
      setSuccessMsg(isEn ? `Brand "${brand.nameKo}" deleted.` : `브랜드 "${brand.nameKo}"이(가) 삭제되었습니다.`);
      setTimeout(() => setSuccessMsg(''), 4000);
    }
  };

  // Delete Product
  const handleDeleteProduct = (product) => {
    if (window.confirm(isEn ? `Delete product "${product.nameKo}"?` : `"${product.nameKo}" 제품을 삭제하시겠습니까?`)) {
      deleteProduct(product.id);
      setSuccessMsg(isEn ? `Product "${product.nameKo}" deleted.` : `제품 "${product.nameKo}"이(가) 삭제되었습니다.`);
      setTimeout(() => setSuccessMsg(''), 4000);
    }
  };

  // Password Verification
  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (passwordInput === '3051') {
      setIsAuthenticated(true);
      setPasswordError('');
      sessionStorage.setItem('admin_pw', passwordInput); // DataContext가 저장 요청 시 이 값을 서버 인증 헤더로 사용
      syncNow(); // 로그인 전 이 브라우저에 남아있던 localStorage 편집분을 서버로 동기화
    } else {
      setPasswordError(isEn ? 'Incorrect password.' : '비밀번호가 일치하지 않습니다.');
    }
  };

  // Handle Logo Upload
  const handleLogoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      const url = await readAndUpload(file);
      setBrandForm(prev => ({ ...prev, logo: url }));
    } catch (err) {
      alert(isEn ? 'Image upload failed.' : '이미지 업로드에 실패했습니다.');
    }
  };

  const handleEditBrandLogoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      const url = await readAndUpload(file);
      setEditBrandForm(prev => ({ ...prev, logo: url }));
    } catch (err) {
      alert(isEn ? 'Image upload failed.' : '이미지 업로드에 실패했습니다.');
    }
  };

  const handleOpenEditBrand = (brand) => {
    setEditingBrandId(brand.id);
    setEditBrandForm({
      nameKo: brand.nameKo || '',
      nameEn: brand.nameEn || '',
      type: brand.type === 'imported' ? 'imported' : 'own',
      tagline: brand.tagline || '',
      taglineEn: brand.taglineEn || '',
      descriptionKo: brand.descriptionKo || '',
      descriptionEn: brand.descriptionEn || '',
      color: brand.color || '#0066B3',
      logo: brand.logo || ''
    });
  };

  const handleCloseEditBrand = () => setEditingBrandId(null);

  const handleSaveBrandEdit = async (e) => {
    e.preventDefault();
    const taglineEn = editBrandForm.taglineEn || await translateText(editBrandForm.tagline);
    const descriptionEn = editBrandForm.descriptionEn || await translateText(editBrandForm.descriptionKo);
    updateBrand(editingBrandId, {
      nameKo: editBrandForm.nameKo,
      nameEn: editBrandForm.nameEn || editBrandForm.nameKo,
      type: editBrandForm.type,
      tagline: editBrandForm.tagline,
      taglineEn,
      descriptionKo: editBrandForm.descriptionKo,
      descriptionEn,
      color: editBrandForm.color,
      logo: editBrandForm.logo,
      hasLogo: !!editBrandForm.logo
    });
    setSuccessMsg(isEn ? 'Brand updated successfully!' : '브랜드 정보가 수정되었습니다!');
    handleCloseEditBrand();
    setTimeout(() => setSuccessMsg(''), 4000);
  };

  // Handle Product Image Upload
  const handleProductImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      const url = await readAndUpload(file);
      setProductForm(prev => ({ ...prev, image: url }));
    } catch (err) {
      alert(isEn ? 'Image upload failed.' : '이미지 업로드에 실패했습니다.');
    }
  };

  const handleEditImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      const url = await readAndUpload(file);
      setEditForm(prev => ({ ...prev, image: url }));
    } catch (err) {
      alert(isEn ? 'Image upload failed.' : '이미지 업로드에 실패했습니다.');
    }
  };

  // 상세 이미지 여러 장 업로드 - 기존 목록 뒤에 이어붙임 (setter를 받아 등록/수정 폼 양쪽에서 재사용)
  const handleInfoImagesUpload = async (e, setter) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;
    try {
      const urls = await Promise.all(files.map(readAndUpload));
      setter(prev => ({ ...prev, infoImages: [...prev.infoImages, ...urls] }));
    } catch (err) {
      alert(isEn ? 'Image upload failed.' : '이미지 업로드에 실패했습니다.');
    }
  };

  const handleRemoveInfoImage = (idx, setter) => {
    setter(prev => ({ ...prev, infoImages: prev.infoImages.filter((_, i) => i !== idx) }));
  };

  const handleOpenEdit = (product) => {
    setEditingProductId(product.id);
    setEditingProductOriginal(product);
    const rawFeatures = Array.isArray(product.features) ? product.features.join('\n') : (product.features || '');
    setEditForm({
      nameKo: product.nameKo || '',
      nameEn: product.nameEn || '',
      brandId: product.brandId || '',
      category: product.category || '사료',
      petType: product.petType || 'dog',
      code: product.code || '',
      spec: product.spec || '',
      shelfLife: product.shelfLife || '',
      origin: product.origin || '',
      features: rawFeatures,
      ingredients: product.ingredients || '',
      image: product.image || '',
      purchaseUrl: product.purchaseUrl || '',
      infoImages: Array.isArray(product.infoImages) ? product.infoImages : [],
      protein: product.nutrition?.protein || '',
      fat: product.nutrition?.fat || '',
      fiber: product.nutrition?.fiber || '',
      moisture: product.nutrition?.moisture || ''
    });
  };

  const handleCloseEdit = () => setEditingProductId(null);

  const handleSaveProductEdit = async (e) => {
    e.preventDefault();
    const featuresArray = editForm.features ? editForm.features.split('\n').filter(f => f.trim()) : [];
    const original = editingProductOriginal || {};
    const translated = await translateProductFields({
      nameKo: editForm.nameKo,
      nameEn: editForm.nameEn || original.nameEn,
      origin: editForm.origin,
      originEn: original.originEn,
      shelfLife: editForm.shelfLife,
      shelfLifeEn: original.shelfLifeEn,
      ingredients: editForm.ingredients,
      ingredientsEn: original.ingredientsEn,
      features: featuresArray,
      featuresEn: original.featuresEn
    });
    updateProduct(editingProductId, {
      nameKo: editForm.nameKo,
      nameEn: translated.nameEn || editForm.nameKo,
      originEn: translated.originEn,
      shelfLifeEn: translated.shelfLifeEn,
      ingredientsEn: translated.ingredientsEn,
      featuresEn: translated.featuresEn,
      brandId: editForm.brandId,
      category: editForm.category,
      petType: editForm.petType,
      code: editForm.code,
      spec: editForm.spec,
      shelfLife: editForm.shelfLife,
      origin: editForm.origin,
      features: featuresArray,
      ingredients: editForm.ingredients,
      image: editForm.image,
      purchaseUrl: editForm.purchaseUrl.trim(),
      infoImages: editForm.infoImages,
      nutrition: buildNutrition(editForm.category, editForm) || null
    });
    setSuccessMsg(isEn ? 'Product updated successfully!' : '제품 정보가 수정되었습니다!');
    handleCloseEdit();
    setTimeout(() => setSuccessMsg(''), 4000);
  };

  const handleSaveContactEmail = (e) => {
    e.preventDefault();
    updateSiteSettings({ contactEmail: settingsEmail.trim() });
    setSuccessMsg(isEn ? 'Contact email updated!' : '문의 수신 이메일이 저장되었습니다!');
    setTimeout(() => setSuccessMsg(''), 4000);
  };

  // 홈 화면 인트로 히어로 사진 교체 업로드
  const handleHeroImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      const url = await readAndUpload(file);
      updateSiteSettings({ heroImage: url });
      setSuccessMsg(isEn ? 'Hero image updated!' : '히어로 이미지가 변경되었습니다!');
      setTimeout(() => setSuccessMsg(''), 4000);
    } catch (err) {
      alert(isEn ? 'Image upload failed.' : '이미지 업로드에 실패했습니다.');
    }
  };

  // Submit Brand
  const handleBrandSubmit = async (e) => {
    e.preventDefault();
    if (!brandForm.nameKo) {
      alert(isEn ? 'Please enter brand name.' : '브랜드 이름을 입력해 주세요.');
      return;
    }

    const id = brandForm.nameEn
      ? brandForm.nameEn.toLowerCase().replace(/[^a-z0-9]/g, '')
      : `brand_${Date.now()}`;

    const taglineEn = brandForm.taglineEn || (await translateText(brandForm.tagline)) || 'Total Care for Pet Life';
    const descriptionEn = brandForm.descriptionEn || (await translateText(brandForm.descriptionKo)) || 'Premium Pet Care Brand';

    const newBrand = {
      id,
      nameKo: brandForm.nameKo,
      nameEn: brandForm.nameEn || brandForm.nameKo,
      type: brandForm.type,
      tagline: brandForm.tagline || 'Total Care for Pet Life',
      taglineEn,
      logo: brandForm.logo || '',
      hasLogo: !!brandForm.logo,
      descriptionKo: brandForm.descriptionKo || '프리미엄 펫케어 브랜드',
      descriptionEn,
      categories: [],
      color: brandForm.color || '#0066B3'
    };

    addBrand(newBrand);
    setSuccessMsg(isEn ? `Brand "${newBrand.nameKo}" added successfully!` : `브랜드 "${newBrand.nameKo}" 등록이 완료되었습니다!`);

    setBrandForm({
      nameKo: '', nameEn: '', type: 'own', tagline: '', taglineEn: '', descriptionKo: '', descriptionEn: '', color: '#0066B3', logo: ''
    });

    setTimeout(() => setSuccessMsg(''), 4000);
  };

  // Submit Product
  const handleProductSubmit = async (e) => {
    e.preventDefault();
    if (!productForm.nameKo) {
      alert(isEn ? 'Please enter product name.' : '제품명을 입력해 주세요.');
      return;
    }
    if (!productForm.brandId) {
      alert(isEn ? 'Please select a brand.' : '브랜드를 선택해 주세요.');
      return;
    }

    const id = `product-${Date.now()}`;
    const featuresArray = productForm.features
      ? productForm.features.split('\n').filter(f => f.trim())
      : [];

    const translated = await translateProductFields({
      nameKo: productForm.nameKo,
      nameEn: productForm.nameEn,
      origin: productForm.origin,
      originEn: '',
      shelfLife: productForm.shelfLife,
      shelfLifeEn: '',
      ingredients: productForm.ingredients,
      ingredientsEn: '',
      features: featuresArray,
      featuresEn: null
    });

    const newProduct = {
      id,
      nameKo: productForm.nameKo,
      nameEn: translated.nameEn || productForm.nameKo,
      originEn: translated.originEn,
      shelfLifeEn: translated.shelfLifeEn,
      ingredientsEn: translated.ingredientsEn,
      featuresEn: translated.featuresEn,
      brandId: productForm.brandId,
      code: productForm.code || '',
      spec: productForm.spec || '규격 정보 참조',
      shelfLife: productForm.shelfLife,
      features: featuresArray,
      ingredients: productForm.ingredients || '원료 정보 참조',
      origin: productForm.origin,
      category: productForm.category,
      petType: productForm.petType,
      image: productForm.image || '',
      purchaseUrl: productForm.purchaseUrl.trim(),
      infoImages: productForm.infoImages,
      nutrition: buildNutrition(productForm.category, productForm) || null
    };

    addProduct(newProduct);
    setSuccessMsg(isEn ? `Product "${newProduct.nameKo}" added successfully!` : `제품 "${newProduct.nameKo}" 등록이 완료되었습니다!`);

    setProductForm({
      nameKo: '', nameEn: '', brandId: brands[0]?.id || '', category: '사료', petType: 'dog', code: '', spec: '',
      shelfLife: '제조일로부터 18개월까지', origin: '대한민국', features: '', ingredients: '', image: '', purchaseUrl: '', infoImages: [],
      protein: '', fat: '', fiber: '', moisture: ''
    });

    setTimeout(() => setSuccessMsg(''), 4000);
  };

  // If Not Authenticated, Render Password Modal / Screen
  if (!isAuthenticated) {
    return (
      <div className="daesang-sub-page">
        <section className="daesang-sub-hero" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=2560&q=80')" }}>
          <div className="daesang-section-overlay"></div>
          <div className="daesang-sub-hero-content">
            <span className="daesang-poetic-sub">ADMINISTRATION</span>
            <h1>{isEn ? 'Boomyoung Admin Console' : '(주)부명 관리자 로그인'}</h1>
            <p>{isEn ? 'Please enter the passcode to access.' : '관리자 전용 페이지입니다. 비밀번호를 입력해 주세요.'}</p>
          </div>
        </section>

        <section className="daesang-white-section" style={{ padding: '80px 0 120px' }}>
          <div className="daesang-container" style={{ maxWidth: '440px', margin: '0 auto', padding: '0 20px' }}>
            <form onSubmit={handlePasswordSubmit} style={{ background: '#FFFFFF', padding: '40px 32px', borderRadius: '12px', border: '1px solid #E5E7EB', boxShadow: '0 8px 24px rgba(0,0,0,0.06)', textAlign: 'center' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '16px' }}>🔒</div>
              <h2 style={{ fontSize: '1.4rem', color: '#0A2540', marginBottom: '8px', fontWeight: '700' }}>
                {isEn ? 'Admin Authentication' : '관리자 비밀번호 확인'}
              </h2>
              <p style={{ color: '#6B7280', fontSize: '0.9rem', marginBottom: '24px' }}>
                {isEn ? 'Enter 4-digit passcode' : '접속 비밀번호 4자리를 입력해 주세요.'}
              </p>

              <input
                type="password"
                maxLength={8}
                autoFocus
                placeholder="비밀번호 입력"
                value={passwordInput}
                onChange={e => setPasswordInput(e.target.value)}
                style={{ width: '100%', padding: '14px', borderRadius: '8px', border: '1px solid #D1D5DB', fontSize: '1.2rem', letterSpacing: '0.3em', textAlign: 'center', marginBottom: '16px', outline: 'none' }}
              />

              {passwordError && (
                <div style={{ color: '#DC2626', fontSize: '0.85rem', marginBottom: '16px', fontWeight: '600' }}>
                  ⚠️ {passwordError}
                </div>
              )}

              <button
                type="submit"
                style={{ width: '100%', padding: '14px', backgroundColor: '#0066B3', color: '#FFFFFF', fontSize: '1.05rem', fontWeight: '700', border: 'none', borderRadius: '8px', cursor: 'pointer', boxShadow: '0 4px 12px rgba(0, 102, 179, 0.25)' }}
              >
                {isEn ? 'Unlock Console' : '관리자 인증'}
              </button>
            </form>
          </div>
        </section>
      </div>
    );
  }

  // Authenticated Screen
  return (
    <div className="daesang-sub-page">
      <section className="daesang-sub-hero" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=2560&q=80')" }}>
        <div className="daesang-section-overlay"></div>
        <div className="daesang-sub-hero-content">
          <span className="daesang-poetic-sub">ADMINISTRATION</span>
          <h1>{isEn ? 'Boomyoung Management Console' : '(주)부명 통합 관리자 시스템'}</h1>
          <p>{isEn ? 'Manage brand portfolio, catalog items, and specifications.' : '신규 브랜드 등록 및 신제품 추가 관리 콘솔입니다.'}</p>
        </div>
      </section>

      <section className="daesang-white-section" style={{ padding: '60px 0 100px' }}>
        <div className="daesang-container" style={{ maxWidth: '900px', margin: '0 auto', padding: '0 20px' }}>

          {successMsg && (
            <div style={{ padding: '16px 24px', backgroundColor: '#E0F2FE', color: '#0369A1', borderRadius: '8px', border: '1px solid #BAE6FD', marginBottom: '30px', fontWeight: '600', fontSize: '1rem' }}>
              ✓ {successMsg}
            </div>
          )}

          <div style={{ display: 'flex', gap: '12px', marginBottom: '36px', borderBottom: '2px solid #E5E7EB', paddingBottom: '12px', flexWrap: 'wrap' }}>
            <button
              onClick={() => setActiveTab('brand')}
              style={{ padding: '12px 28px', fontSize: '1.05rem', fontWeight: '700', border: 'none', borderRadius: '6px', cursor: 'pointer', backgroundColor: activeTab === 'brand' ? '#0066B3' : '#F3F4F6', color: activeTab === 'brand' ? '#FFFFFF' : '#4B5563', transition: 'all 0.2s ease' }}
            >
              1. {isEn ? 'Add New Brand' : '브랜드 추가 등록'}
            </button>
            <button
              onClick={() => setActiveTab('product')}
              style={{ padding: '12px 28px', fontSize: '1.05rem', fontWeight: '700', border: 'none', borderRadius: '6px', cursor: 'pointer', backgroundColor: activeTab === 'product' ? '#0066B3' : '#F3F4F6', color: activeTab === 'product' ? '#FFFFFF' : '#4B5563', transition: 'all 0.2s ease' }}
            >
              2. {isEn ? 'Add New Product' : '신규 제품 추가'}
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              style={{ padding: '12px 28px', fontSize: '1.05rem', fontWeight: '700', border: 'none', borderRadius: '6px', cursor: 'pointer', backgroundColor: activeTab === 'settings' ? '#0066B3' : '#F3F4F6', color: activeTab === 'settings' ? '#FFFFFF' : '#4B5563', transition: 'all 0.2s ease' }}
            >
              3. {isEn ? 'Site Settings' : '사이트 설정'}
            </button>
            <button
              onClick={() => {
                if (window.confirm(isEn ? 'Reset all custom added data?' : '추가한 데이터를 초기화하시겠습니까?')) {
                  resetData();
                  alert(isEn ? 'Data reset.' : '기본 데이터로 초기화되었습니다.');
                }
              }}
              style={{ marginLeft: 'auto', padding: '12px 18px', fontSize: '0.9rem', fontWeight: '600', border: '1px solid #FCA5A5', borderRadius: '6px', cursor: 'pointer', backgroundColor: '#FEF2F2', color: '#DC2626' }}
            >
              🔄 {isEn ? 'Reset Data' : '데이터 초기화'}
            </button>
          </div>

          {/* TAB 1: ADD BRAND */}
          {activeTab === 'brand' && (
            <form onSubmit={handleBrandSubmit} style={{ display: 'grid', gap: '24px', background: '#FFFFFF', padding: '36px', borderRadius: '12px', border: '1px solid #E5E7EB', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
              <h2 style={{ fontSize: '1.4rem', color: '#0A2540', marginBottom: '8px' }}>
                🏷️ {isEn ? 'Brand Registration' : '브랜드 정보 입력'}
              </h2>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div>
                  <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#374151' }}>
                    * {isEn ? 'Brand Name (Korean)' : '브랜드명 (한글)'}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="예: 웰젠, 부명케어"
                    value={brandForm.nameKo}
                    onChange={e => setBrandForm({ ...brandForm, nameKo: e.target.value })}
                    style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '1rem' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#374151' }}>
                    {isEn ? 'Brand Name (English)' : '브랜드명 (영문)'}
                  </label>
                  <input
                    type="text"
                    placeholder="예: WELLZEN"
                    value={brandForm.nameEn}
                    onChange={e => setBrandForm({ ...brandForm, nameEn: e.target.value })}
                    style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '1rem' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#374151' }}>
                  * {isEn ? 'Brand Type — decides which menu/page this brand appears on' : '브랜드 유형 (노출될 메뉴/페이지 결정)'}
                </label>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  <label style={{
                    flex: 1, minWidth: '220px', display: 'flex', alignItems: 'center', gap: '8px', padding: '12px',
                    borderRadius: '6px', border: `2px solid ${brandForm.type === 'own' ? '#0066B3' : '#D1D5DB'}`,
                    background: brandForm.type === 'own' ? '#EFF6FF' : '#FFFFFF', cursor: 'pointer', fontWeight: 600
                  }}>
                    <input type="radio" name="brandType" checked={brandForm.type === 'own'} onChange={() => setBrandForm({ ...brandForm, type: 'own' })} />
                    {isEn ? 'Own Brand → "Brands" menu' : '자사 브랜드 → "브랜드" 메뉴에 노출'}
                  </label>
                  <label style={{
                    flex: 1, minWidth: '220px', display: 'flex', alignItems: 'center', gap: '8px', padding: '12px',
                    borderRadius: '6px', border: `2px solid ${brandForm.type === 'imported' ? '#0066B3' : '#D1D5DB'}`,
                    background: brandForm.type === 'imported' ? '#EFF6FF' : '#FFFFFF', cursor: 'pointer', fontWeight: 600
                  }}>
                    <input type="radio" name="brandType" checked={brandForm.type === 'imported'} onChange={() => setBrandForm({ ...brandForm, type: 'imported' })} />
                    {isEn ? 'Imported Brand → "Imported Brands" menu' : '수입 브랜드 → "수입브랜드" 메뉴에 노출'}
                  </label>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#374151' }}>
                  {isEn ? 'Brand Tagline / Slogan' : '브랜드 슬로건 (Tagline)'}
                </label>
                <input
                  type="text"
                  placeholder="예: Healthy & Happy Pet Care"
                  value={brandForm.tagline}
                  onChange={e => setBrandForm({ ...brandForm, tagline: e.target.value })}
                  style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '1rem' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#374151' }}>
                  {isEn ? 'Tagline (English)' : '브랜드 슬로건 (영문, 비워두면 자동 번역)'}
                </label>
                <input
                  type="text"
                  placeholder="e.g. Healthy & Happy Pet Care"
                  value={brandForm.taglineEn}
                  onChange={e => setBrandForm({ ...brandForm, taglineEn: e.target.value })}
                  style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '1rem' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div>
                  <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#374151' }}>
                    {isEn ? 'Description (Korean)' : '브랜드 설명 (한글)'}
                  </label>
                  <textarea
                    rows={3}
                    placeholder="브랜드에 대한 간단한 소개를 입력하세요."
                    value={brandForm.descriptionKo}
                    onChange={e => setBrandForm({ ...brandForm, descriptionKo: e.target.value })}
                    style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '0.95rem' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#374151' }}>
                    {isEn ? 'Description (English)' : '브랜드 설명 (영문)'}
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Enter brand description in English."
                    value={brandForm.descriptionEn}
                    onChange={e => setBrandForm({ ...brandForm, descriptionEn: e.target.value })}
                    style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '0.95rem' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', alignItems: 'center' }}>
                <div>
                  <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#374151' }}>
                    🎨 {isEn ? 'Brand Key Color' : '브랜드 대표 테마 색상'}
                  </label>
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <input type="color" value={brandForm.color} onChange={e => setBrandForm({ ...brandForm, color: e.target.value })} style={{ width: '48px', height: '44px', border: 'none', borderRadius: '4px', cursor: 'pointer' }} />
                    <input type="text" value={brandForm.color} onChange={e => setBrandForm({ ...brandForm, color: e.target.value })} style={{ width: '120px', padding: '10px', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '0.95rem' }} />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#374151' }}>
                    🖼️ {isEn ? 'Brand Logo File Attach' : '브랜드 로고 이미지 첨부'}
                  </label>
                  <input type="file" accept="image/*" onChange={handleLogoUpload} style={{ width: '100%', padding: '8px', border: '1px solid #D1D5DB', borderRadius: '6px' }} />
                </div>
              </div>

              {brandForm.logo && (
                <div style={{ padding: '16px', background: '#FAFAFA', borderRadius: '8px', border: '1px dashed #D1D5DB', textAlign: 'center' }}>
                  <span style={{ display: 'block', fontSize: '0.85rem', color: '#6B7280', marginBottom: '8px' }}>로고 이미지 미리보기</span>
                  <img src={brandForm.logo} alt="Brand Logo Preview" style={{ maxHeight: '80px', maxWidth: '200px', objectFit: 'contain' }} />
                </div>
              )}

              <button type="submit" style={{ marginTop: '12px', padding: '16px', backgroundColor: '#0066B3', color: '#FFFFFF', fontSize: '1.1rem', fontWeight: '700', border: 'none', borderRadius: '8px', cursor: 'pointer', boxShadow: '0 4px 10px rgba(0, 102, 179, 0.2)' }}>
                ➕ {isEn ? 'Register Brand' : '신규 브랜드 등록 완료'}
              </button>
            </form>
          )}

          {/* BRAND LIST */}
          {activeTab === 'brand' && (
            <div style={{ marginTop: '32px' }}>
              <h3 style={{ fontSize: '1.1rem', color: '#0A2540', marginBottom: '16px' }}>
                📋 {isEn ? `Registered Brands (${brands.length})` : `등록된 브랜드 목록 (${brands.length}개)`}
              </h3>
              <div style={{ display: 'grid', gap: '10px' }}>
                {brands.map(b => (
                  <div key={b.id} style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '12px 16px', background: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '8px' }}>
                    <div style={{ width: '44px', height: '44px', borderRadius: '6px', flexShrink: 0, background: b.hasLogo && b.logo ? `url(${b.logo}) center/contain no-repeat` : b.color, border: '1px solid #E5E7EB' }} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontWeight: '700', color: '#111827', display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                        {b.nameKo} <span style={{ color: '#9CA3AF', fontWeight: '400' }}>({b.nameEn})</span>
                        <span style={{ fontSize: '0.7rem', fontWeight: 700, padding: '2px 8px', borderRadius: '10px', background: b.type === 'imported' ? '#FEF3C7' : '#DBEAFE', color: b.type === 'imported' ? '#92400E' : '#1E40AF' }}>
                          {b.type === 'imported' ? (isEn ? 'IMPORTED' : '수입브랜드') : (isEn ? 'OWN' : '자사브랜드')}
                        </span>
                      </div>
                      <div style={{ fontSize: '0.82rem', color: '#6B7280' }}>{b.tagline}</div>
                    </div>
                    <button onClick={() => handleOpenEditBrand(b)} style={{ padding: '8px 14px', fontSize: '0.85rem', fontWeight: '600', border: '1px solid #93C5FD', borderRadius: '6px', cursor: 'pointer', backgroundColor: '#EFF6FF', color: '#0066B3', flexShrink: 0 }}>
                      ✏️ {isEn ? 'Edit' : '수정'}
                    </button>
                    <button onClick={() => handleDeleteBrand(b)} style={{ padding: '8px 14px', fontSize: '0.85rem', fontWeight: '600', border: '1px solid #FCA5A5', borderRadius: '6px', cursor: 'pointer', backgroundColor: '#FEF2F2', color: '#DC2626', flexShrink: 0 }}>
                      🗑️ {isEn ? 'Delete' : '삭제'}
                    </button>
                  </div>
                ))}
                {brands.length === 0 && (
                  <p style={{ color: '#9CA3AF', textAlign: 'center', padding: '20px' }}>
                    {isEn ? 'No brands registered.' : '등록된 브랜드가 없습니다.'}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: ADD PRODUCT */}
          {activeTab === 'product' && (
            <form onSubmit={handleProductSubmit} style={{ display: 'grid', gap: '24px', background: '#FFFFFF', padding: '36px', borderRadius: '12px', border: '1px solid #E5E7EB', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
              <h2 style={{ fontSize: '1.4rem', color: '#0A2540', marginBottom: '8px' }}>
                📦 {isEn ? 'Product Registration' : '신제품 정보 입력'}
              </h2>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div>
                  <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#374151' }}>
                    * {isEn ? 'Select Brand' : '소속 브랜드 선택'}
                  </label>
                  <select required value={productForm.brandId} onChange={e => setProductForm({ ...productForm, brandId: e.target.value })} style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '1rem', backgroundColor: '#FFFFFF' }}>
                    <option value="">{isEn ? '-- Select Brand --' : '-- 브랜드 선택 --'}</option>
                    {brands.map(b => (
                      <option key={b.id} value={b.id}>{b.nameKo} ({b.nameEn})</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#374151' }}>
                    * {isEn ? 'Product Category' : '제품 카테고리'}
                  </label>
                  <select value={productForm.category} onChange={e => setProductForm({ ...productForm, category: e.target.value })} style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '1rem', backgroundColor: '#FFFFFF' }}>
                    <option value="사료">사료 (Feed / Food)</option>
                    <option value="간식">간식 (Treats / Snacks)</option>
                    <option value="모래">모래 (Cat Litter)</option>
                    <option value="용품">용품 (Supplies / Care)</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div>
                  <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#374151' }}>
                    * {isEn ? 'Product Name (Korean)' : '제품명 (한글)'}
                  </label>
                  <input type="text" required placeholder="예: 데이스포 프레시 츄르 연어" value={productForm.nameKo} onChange={e => setProductForm({ ...productForm, nameKo: e.target.value })} style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '1rem' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#374151' }}>
                    {isEn ? 'Product Name (English)' : '제품명 (영문)'}
                  </label>
                  <input type="text" placeholder="예: Dayspo Fresh Churu Salmon" value={productForm.nameEn} onChange={e => setProductForm({ ...productForm, nameEn: e.target.value })} style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '1rem' }} />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#374151' }}>
                    {isEn ? 'Target Pet' : '반려동물 구분'}
                  </label>
                  <select value={productForm.petType} onChange={e => setProductForm({ ...productForm, petType: e.target.value })} style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '0.95rem' }}>
                    <option value="dog">강아지 (Dog)</option>
                    <option value="cat">고양이 (Cat)</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#374151' }}>
                    {isEn ? 'Specification / Weight' : '제품 규격 / 용량'}
                  </label>
                  <input type="text" placeholder="예: 1.2kg (200g * 6)" value={productForm.spec} onChange={e => setProductForm({ ...productForm, spec: e.target.value })} style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '0.95rem' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#374151' }}>
                    {isEn ? 'Barcode / Item Code' : '상품 바코드 / 코드'}
                  </label>
                  <input type="text" placeholder="예: 8809565905407" value={productForm.code} onChange={e => setProductForm({ ...productForm, code: e.target.value })} style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '0.95rem' }} />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#374151' }}>
                  🖼️ {isEn ? 'Product Main Representative Image' : '제품 대표 이미지 첨부'}
                </label>
                <input type="file" accept="image/*" onChange={handleProductImageUpload} style={{ width: '100%', padding: '8px', border: '1px solid #D1D5DB', borderRadius: '6px' }} />
              </div>

              {productForm.image && (
                <div style={{ padding: '16px', background: '#FAFAFA', borderRadius: '8px', border: '1px dashed #D1D5DB', textAlign: 'center' }}>
                  <span style={{ display: 'block', fontSize: '0.85rem', color: '#6B7280', marginBottom: '8px' }}>제품 이미지 미리보기</span>
                  <img src={productForm.image} alt="Product Preview" style={{ maxHeight: '140px', maxWidth: '200px', objectFit: 'contain' }} />
                </div>
              )}

              <div>
                <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#374151' }}>
                  🖼️ {isEn ? 'Detail Page Images (JPG, multiple allowed)' : '상세정보 페이지 이미지 첨부 (JPG, 여러 장 가능)'}
                </label>
                <input type="file" accept="image/jpeg,image/jpg,image/png" multiple onChange={e => handleInfoImagesUpload(e, setProductForm)} style={{ width: '100%', padding: '8px', border: '1px solid #D1D5DB', borderRadius: '6px' }} />
              </div>

              {productForm.infoImages.length > 0 && (
                <div style={{ display: 'grid', gap: '10px' }}>
                  {productForm.infoImages.map((src, idx) => (
                    <div key={idx} style={{ position: 'relative', border: '1px solid #EAEAEA', borderRadius: '8px', padding: '8px' }}>
                      <img src={src} alt={`상세이미지 ${idx + 1}`} style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '6px' }} />
                      <button type="button" onClick={() => handleRemoveInfoImage(idx, setProductForm)} style={{ position: 'absolute', top: '14px', right: '14px', background: '#DC2626', color: '#FFFFFF', border: 'none', borderRadius: '50%', width: '28px', height: '28px', cursor: 'pointer', fontWeight: '700' }}>
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <div>
                <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#374151' }}>
                  🔗 {isEn ? 'Purchase Link (URL)' : '바로 구매하기 링크 (URL)'}
                </label>
                <input type="url" placeholder="https://..." value={productForm.purchaseUrl} onChange={e => setProductForm({ ...productForm, purchaseUrl: e.target.value })} style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '0.95rem' }} />
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#374151' }}>
                  {isEn ? 'Product Key Features (One per line)' : '제품 주요 특징 (줄바꿈으로 구분)'}
                </label>
                <textarea rows={4} placeholder="예:&#10;· 생후 2개월 이상 전연령 반려견 사료&#10;· 가수분해 오리 원료 사용&#10;· 관절 건강에 도움을 주는 초유 첨가" value={productForm.features} onChange={e => setProductForm({ ...productForm, features: e.target.value })} style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '0.95rem' }} />
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#374151' }}>
                  {isEn ? 'Ingredients & Details' : '원료 및 원산지/유통기한 정보'}
                </label>
                <textarea rows={3} placeholder="사용된 상세 원료와 성분 정보를 작성해 주세요." value={productForm.ingredients} onChange={e => setProductForm({ ...productForm, ingredients: e.target.value })} style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '0.95rem' }} />
              </div>

              {CATEGORIES_WITH_NUTRITION.includes(productForm.category) && (
                <div>
                  <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#374151' }}>
                    {isEn ? 'Guaranteed Analysis (Nutrition)' : '등록 성분량'}
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '12px' }}>
                    <input type="text" placeholder="예: 24.0% (Min)" value={productForm.protein} onChange={e => setProductForm({ ...productForm, protein: e.target.value })} style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '0.95rem' }} />
                    <input type="text" placeholder="예: 10.0% (Min)" value={productForm.fat} onChange={e => setProductForm({ ...productForm, fat: e.target.value })} style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '0.95rem' }} />
                    <input type="text" placeholder="예: 5.0% (Max)" value={productForm.fiber} onChange={e => setProductForm({ ...productForm, fiber: e.target.value })} style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '0.95rem' }} />
                    <input type="text" placeholder="예: 12.0% (Max)" value={productForm.moisture} onChange={e => setProductForm({ ...productForm, moisture: e.target.value })} style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '0.95rem' }} />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '12px', marginTop: '4px', fontSize: '0.75rem', color: '#6B7280' }}>
                    <span>{isEn ? 'Crude Protein' : '조단백'}</span>
                    <span>{isEn ? 'Crude Fat' : '조지방'}</span>
                    <span>{isEn ? 'Crude Fiber' : '조섬유'}</span>
                    <span>{isEn ? 'Moisture' : '수분'}</span>
                  </div>
                </div>
              )}

              <button type="submit" style={{ marginTop: '12px', padding: '16px', backgroundColor: '#0066B3', color: '#FFFFFF', fontSize: '1.1rem', fontWeight: '700', border: 'none', borderRadius: '8px', cursor: 'pointer', boxShadow: '0 4px 10px rgba(0, 102, 179, 0.2)' }}>
                📦 {isEn ? 'Register Product' : '신규 제품 등록 완료'}
              </button>
            </form>
          )}

          {/* PRODUCT LIST */}
          {activeTab === 'product' && (
            <div style={{ marginTop: '32px' }}>
              <h3 style={{ fontSize: '1.1rem', color: '#0A2540', marginBottom: '16px' }}>
                📋 {isEn ? `Registered Products (${products.length})` : `등록된 제품 목록 (${products.length}개)`}
              </h3>

              <div style={{ display: 'flex', gap: '12px', marginBottom: '16px', flexWrap: 'wrap' }}>
                <select value={productFilterBrand} onChange={e => setProductFilterBrand(e.target.value)} style={{ padding: '10px', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '0.9rem' }}>
                  <option value="">{isEn ? 'All Brands' : '전체 브랜드'}</option>
                  {brands.map(b => (
                    <option key={b.id} value={b.id}>{b.nameKo}</option>
                  ))}
                </select>
                <input type="text" placeholder={isEn ? 'Search product name...' : '제품명 검색...'} value={productSearch} onChange={e => setProductSearch(e.target.value)} style={{ flex: 1, minWidth: '180px', padding: '10px', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '0.9rem' }} />
              </div>

              <div style={{ display: 'grid', gap: '8px', maxHeight: '520px', overflowY: 'auto', paddingRight: '4px' }}>
                {products
                  .filter(p => !productFilterBrand || p.brandId === productFilterBrand)
                  .filter(p => !productSearch || p.nameKo.includes(productSearch) || (p.nameEn || '').toLowerCase().includes(productSearch.toLowerCase()))
                  .map(p => {
                    const brand = brands.find(b => b.id === p.brandId);
                    return (
                      <div key={p.id} style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '10px 16px', background: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '8px' }}>
                        <div style={{ width: '40px', height: '40px', borderRadius: '6px', flexShrink: 0, background: p.image ? `url(${p.image}) center/cover no-repeat` : '#F3F4F6', border: '1px solid #E5E7EB' }} />
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontWeight: '600', color: '#111827', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {p.nameKo}
                          </div>
                          <div style={{ fontSize: '0.78rem', color: '#6B7280' }}>
                            {brand ? brand.nameKo : (isEn ? 'Unlinked brand' : '브랜드 없음')} · {p.category} {p.code ? `· ${p.code}` : ''}
                          </div>
                        </div>
                        <button onClick={() => handleOpenEdit(p)} style={{ padding: '7px 12px', fontSize: '0.82rem', fontWeight: '600', border: '1px solid #93C5FD', borderRadius: '6px', cursor: 'pointer', backgroundColor: '#EFF6FF', color: '#0066B3', flexShrink: 0 }}>
                          ✏️ {isEn ? 'Edit' : '수정'}
                        </button>
                        <button onClick={() => handleDeleteProduct(p)} style={{ padding: '7px 12px', fontSize: '0.82rem', fontWeight: '600', border: '1px solid #FCA5A5', borderRadius: '6px', cursor: 'pointer', backgroundColor: '#FEF2F2', color: '#DC2626', flexShrink: 0 }}>
                          🗑️ {isEn ? 'Delete' : '삭제'}
                        </button>
                      </div>
                    );
                  })}
                {products.length === 0 && (
                  <p style={{ color: '#9CA3AF', textAlign: 'center', padding: '20px' }}>
                    {isEn ? 'No products registered.' : '등록된 제품이 없습니다.'}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* TAB 3: SITE SETTINGS */}
          {activeTab === 'settings' && (
            <form onSubmit={handleSaveContactEmail} style={{ background: '#FFFFFF', padding: '36px', borderRadius: '12px', border: '1px solid #E5E7EB', boxShadow: '0 4px 12px rgba(0,0,0,0.03)', display: 'grid', gap: '16px' }}>
              <h2 style={{ fontSize: '1.4rem', color: '#0A2540', marginBottom: '4px' }}>
                📧 {isEn ? 'Inquiry Recipient Email' : '문의 수신 이메일 주소'}
              </h2>
              <p style={{ margin: 0, fontSize: '0.85rem', color: '#6B7280' }}>
                {isEn
                  ? 'This site has no backend server, so the Contact form cannot send email by itself. Submitting the inquiry form opens the visitor\'s own email app with this address pre-filled — they must press Send there to actually deliver it.'
                  : '이 사이트는 서버가 없는 정적 사이트라 문의 폼이 스스로 메일을 보낼 수는 없습니다. 문의 폼을 제출하면 방문자의 메일 앱이 이 주소를 수신자로 하여 자동으로 열리고, 방문자가 그 메일 앱에서 "보내기"를 눌러야 실제로 전달됩니다.'}
              </p>
              <div>
                <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#374151' }}>
                  {isEn ? 'Recipient Email Address' : '수신 이메일 주소'}
                </label>
                <input type="email" required value={settingsEmail} onChange={e => setSettingsEmail(e.target.value)} style={{ width: '100%', maxWidth: '400px', padding: '12px', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '1rem' }} />
              </div>
              <button type="submit" style={{ justifySelf: 'start', padding: '12px 24px', backgroundColor: '#0066B3', color: '#FFFFFF', fontSize: '1rem', fontWeight: '700', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
                💾 {isEn ? 'Save' : '저장하기'}
              </button>
            </form>
          )}

          {activeTab === 'settings' && (
            <div style={{ marginTop: '24px', background: '#FFFFFF', padding: '36px', borderRadius: '12px', border: '1px solid #E5E7EB', boxShadow: '0 4px 12px rgba(0,0,0,0.03)', display: 'grid', gap: '16px' }}>
              <h2 style={{ fontSize: '1.4rem', color: '#0A2540', marginBottom: '4px' }}>
                🖼️ {isEn ? 'Home Hero Image' : '메인페이지 히어로 이미지'}
              </h2>
              <p style={{ margin: 0, fontSize: '0.85rem', color: '#6B7280' }}>
                {isEn
                  ? 'The full-screen background photo at the very top of the Home page.'
                  : '홈페이지 최상단 시네마틱 인트로 섹션의 배경 사진입니다.'}
              </p>
              <img src={siteSettings.heroImage} alt="히어로 이미지 미리보기" style={{ width: '100%', maxWidth: '400px', aspectRatio: '2.3 / 1', objectFit: 'cover', borderRadius: '8px', border: '1px solid #E5E7EB' }} />
              <div>
                <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#374151' }}>
                  {isEn ? 'Replace Image' : '이미지 교체'}
                </label>
                <input type="file" accept="image/*" onChange={handleHeroImageUpload} style={{ width: '100%', maxWidth: '400px', padding: '8px', border: '1px solid #D1D5DB', borderRadius: '6px' }} />
              </div>
            </div>
          )}

        </div>
      </section>

      {/* 브랜드 수정 팝업 */}
      {editingBrandId && (
        <div onClick={handleCloseEditBrand} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}>
          <form onSubmit={handleSaveBrandEdit} onClick={e => e.stopPropagation()} style={{ background: '#FFFFFF', borderRadius: '12px', padding: '32px', maxWidth: '600px', width: '100%', maxHeight: '85vh', overflowY: 'auto', display: 'grid', gap: '20px' }}>
            <h2 style={{ fontSize: '1.25rem', color: '#0A2540', margin: 0 }}>
              ✏️ {isEn ? 'Edit Brand' : '브랜드 정보 수정'}
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#374151' }}>
                  * {isEn ? 'Brand Name (Korean)' : '브랜드명 (한글)'}
                </label>
                <input type="text" required value={editBrandForm.nameKo} onChange={e => setEditBrandForm({ ...editBrandForm, nameKo: e.target.value })} style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '1rem' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#374151' }}>
                  {isEn ? 'Brand Name (English)' : '브랜드명 (영문)'}
                </label>
                <input type="text" value={editBrandForm.nameEn} onChange={e => setEditBrandForm({ ...editBrandForm, nameEn: e.target.value })} style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '1rem' }} />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#374151' }}>
                * {isEn ? 'Brand Type — decides which menu/page this brand appears on' : '브랜드 유형 (노출될 메뉴/페이지 결정)'}
              </label>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                <label style={{ flex: 1, minWidth: '220px', display: 'flex', alignItems: 'center', gap: '8px', padding: '12px', borderRadius: '6px', border: `2px solid ${editBrandForm.type === 'own' ? '#0066B3' : '#D1D5DB'}`, background: editBrandForm.type === 'own' ? '#EFF6FF' : '#FFFFFF', cursor: 'pointer', fontWeight: 600 }}>
                  <input type="radio" name="editBrandType" checked={editBrandForm.type === 'own'} onChange={() => setEditBrandForm({ ...editBrandForm, type: 'own' })} />
                  {isEn ? 'Own Brand → "Brands" menu' : '자사 브랜드 → "브랜드" 메뉴에 노출'}
                </label>
                <label style={{ flex: 1, minWidth: '220px', display: 'flex', alignItems: 'center', gap: '8px', padding: '12px', borderRadius: '6px', border: `2px solid ${editBrandForm.type === 'imported' ? '#0066B3' : '#D1D5DB'}`, background: editBrandForm.type === 'imported' ? '#EFF6FF' : '#FFFFFF', cursor: 'pointer', fontWeight: 600 }}>
                  <input type="radio" name="editBrandType" checked={editBrandForm.type === 'imported'} onChange={() => setEditBrandForm({ ...editBrandForm, type: 'imported' })} />
                  {isEn ? 'Imported Brand → "Imported Brands" menu' : '수입 브랜드 → "수입브랜드" 메뉴에 노출'}
                </label>
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#374151' }}>
                {isEn ? 'Brand Tagline / Slogan' : '브랜드 슬로건 (Tagline)'}
              </label>
              <input type="text" value={editBrandForm.tagline} onChange={e => setEditBrandForm({ ...editBrandForm, tagline: e.target.value })} style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '1rem' }} />
            </div>

            <div>
              <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#374151' }}>
                {isEn ? 'Tagline (English)' : '브랜드 슬로건 (영문, 비워두면 자동 번역)'}
              </label>
              <input type="text" value={editBrandForm.taglineEn} onChange={e => setEditBrandForm({ ...editBrandForm, taglineEn: e.target.value })} style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '1rem' }} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#374151' }}>
                  {isEn ? 'Description (Korean)' : '브랜드 설명 (한글)'}
                </label>
                <textarea rows={3} value={editBrandForm.descriptionKo} onChange={e => setEditBrandForm({ ...editBrandForm, descriptionKo: e.target.value })} style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '0.95rem' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#374151' }}>
                  {isEn ? 'Description (English)' : '브랜드 설명 (영문)'}
                </label>
                <textarea rows={3} value={editBrandForm.descriptionEn} onChange={e => setEditBrandForm({ ...editBrandForm, descriptionEn: e.target.value })} style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '0.95rem' }} />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', alignItems: 'center' }}>
              <div>
                <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#374151' }}>
                  🎨 {isEn ? 'Brand Key Color' : '브랜드 대표 테마 색상'}
                </label>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <input type="color" value={editBrandForm.color} onChange={e => setEditBrandForm({ ...editBrandForm, color: e.target.value })} style={{ width: '48px', height: '44px', border: 'none', borderRadius: '4px', cursor: 'pointer' }} />
                  <input type="text" value={editBrandForm.color} onChange={e => setEditBrandForm({ ...editBrandForm, color: e.target.value })} style={{ width: '120px', padding: '10px', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '0.95rem' }} />
                </div>
              </div>
              <div>
                <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#374151' }}>
                  🖼️ {isEn ? 'Brand Logo File Attach' : '브랜드 로고 이미지 첨부'}
                </label>
                <input type="file" accept="image/*" onChange={handleEditBrandLogoUpload} style={{ width: '100%', padding: '8px', border: '1px solid #D1D5DB', borderRadius: '6px' }} />
              </div>
            </div>

            {editBrandForm.logo && (
              <div style={{ padding: '16px', background: '#FAFAFA', borderRadius: '8px', border: '1px dashed #D1D5DB', textAlign: 'center' }}>
                <span style={{ display: 'block', fontSize: '0.85rem', color: '#6B7280', marginBottom: '8px' }}>로고 이미지 미리보기</span>
                <img src={editBrandForm.logo} alt="Brand Logo Preview" style={{ maxHeight: '80px', maxWidth: '200px', objectFit: 'contain' }} />
              </div>
            )}

            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '8px' }}>
              <button type="button" onClick={handleCloseEditBrand} style={{ padding: '12px 20px', fontWeight: '600', border: '1px solid #D1D5DB', borderRadius: '8px', cursor: 'pointer', backgroundColor: '#F9FAFB', color: '#374151' }}>
                {isEn ? 'Cancel' : '취소'}
              </button>
              <button type="submit" style={{ padding: '12px 24px', fontWeight: '700', border: 'none', borderRadius: '8px', cursor: 'pointer', backgroundColor: '#0066B3', color: '#FFFFFF' }}>
                💾 {isEn ? 'Save' : '저장하기'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* 제품 수정 팝업 */}
      {editingProductId && (
        <div onClick={handleCloseEdit} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}>
          <form onSubmit={handleSaveProductEdit} onClick={e => e.stopPropagation()} style={{ background: '#FFFFFF', borderRadius: '12px', padding: '32px', maxWidth: '640px', width: '100%', maxHeight: '85vh', overflowY: 'auto', display: 'grid', gap: '20px' }}>
            <h2 style={{ fontSize: '1.25rem', color: '#0A2540', margin: 0 }}>
              ✏️ {isEn ? 'Edit Product' : '제품 정보 전체 수정'}
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#374151' }}>
                  * {isEn ? 'Select Brand' : '소속 브랜드 선택'}
                </label>
                <select required value={editForm.brandId} onChange={e => setEditForm({ ...editForm, brandId: e.target.value })} style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '1rem', backgroundColor: '#FFFFFF' }}>
                  <option value="">{isEn ? '-- Select Brand --' : '-- 브랜드 선택 --'}</option>
                  {brands.map(b => (
                    <option key={b.id} value={b.id}>{b.nameKo} ({b.nameEn})</option>
                  ))}
                </select>
              </div>
              <div>
                <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#374151' }}>
                  * {isEn ? 'Product Category' : '제품 카테고리'}
                </label>
                <select value={editForm.category} onChange={e => setEditForm({ ...editForm, category: e.target.value })} style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '1rem', backgroundColor: '#FFFFFF' }}>
                  <option value="사료">사료 (Feed / Food)</option>
                  <option value="간식">간식 (Treats / Snacks)</option>
                  <option value="모래">모래 (Cat Litter)</option>
                  <option value="용품">용품 (Supplies / Care)</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#374151' }}>
                  * {isEn ? 'Product Name (Korean)' : '제품명 (한글)'}
                </label>
                <input type="text" required value={editForm.nameKo} onChange={e => setEditForm({ ...editForm, nameKo: e.target.value })} style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '1rem' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#374151' }}>
                  {isEn ? 'Product Name (English)' : '제품명 (영문)'}
                </label>
                <input type="text" value={editForm.nameEn} onChange={e => setEditForm({ ...editForm, nameEn: e.target.value })} style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '1rem' }} />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#374151' }}>
                  {isEn ? 'Target Pet' : '반려동물 구분'}
                </label>
                <select value={editForm.petType} onChange={e => setEditForm({ ...editForm, petType: e.target.value })} style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '0.95rem' }}>
                  <option value="dog">강아지 (Dog)</option>
                  <option value="cat">고양이 (Cat)</option>
                </select>
              </div>
              <div>
                <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#374151' }}>
                  {isEn ? 'Specification / Weight' : '제품 규격 / 용량'}
                </label>
                <input type="text" value={editForm.spec} onChange={e => setEditForm({ ...editForm, spec: e.target.value })} style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '0.95rem' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#374151' }}>
                  {isEn ? 'Barcode / Item Code' : '상품 바코드 / 코드'}
                </label>
                <input type="text" value={editForm.code} onChange={e => setEditForm({ ...editForm, code: e.target.value })} style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '0.95rem' }} />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#374151' }}>
                  {isEn ? 'Shelf Life' : '유통기한'}
                </label>
                <input type="text" value={editForm.shelfLife} onChange={e => setEditForm({ ...editForm, shelfLife: e.target.value })} style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '0.95rem' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#374151' }}>
                  {isEn ? 'Country of Origin' : '제조국 / 원산지'}
                </label>
                <input type="text" value={editForm.origin} onChange={e => setEditForm({ ...editForm, origin: e.target.value })} style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '0.95rem' }} />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#374151' }}>
                🖼️ {isEn ? 'Product Main Representative Image' : '제품 대표 이미지 첨부'}
              </label>
              <input type="file" accept="image/*" onChange={handleEditImageUpload} style={{ width: '100%', padding: '8px', border: '1px solid #D1D5DB', borderRadius: '6px' }} />
            </div>

            {editForm.image && (
              <div style={{ padding: '16px', background: '#FAFAFA', borderRadius: '8px', border: '1px dashed #D1D5DB', textAlign: 'center' }}>
                <span style={{ display: 'block', fontSize: '0.85rem', color: '#6B7280', marginBottom: '8px' }}>제품 이미지 미리보기</span>
                <img src={editForm.image} alt="Product Preview" style={{ maxHeight: '140px', maxWidth: '200px', objectFit: 'contain' }} />
              </div>
            )}

            <div>
              <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#374151' }}>
                🖼️ {isEn ? 'Detail Page Images (JPG, multiple allowed)' : '상세정보 페이지 이미지 첨부 (JPG, 여러 장 가능)'}
              </label>
              <input type="file" accept="image/jpeg,image/jpg,image/png" multiple onChange={e => handleInfoImagesUpload(e, setEditForm)} style={{ width: '100%', padding: '8px', border: '1px solid #D1D5DB', borderRadius: '6px' }} />
            </div>

            {editForm.infoImages.length > 0 && (
              <div style={{ display: 'grid', gap: '10px' }}>
                {editForm.infoImages.map((src, idx) => (
                  <div key={idx} style={{ position: 'relative', border: '1px solid #EAEAEA', borderRadius: '8px', padding: '8px' }}>
                    <img src={src} alt={`상세이미지 ${idx + 1}`} style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '6px' }} />
                    <button type="button" onClick={() => handleRemoveInfoImage(idx, setEditForm)} style={{ position: 'absolute', top: '14px', right: '14px', background: '#DC2626', color: '#FFFFFF', border: 'none', borderRadius: '50%', width: '28px', height: '28px', cursor: 'pointer', fontWeight: '700' }}>
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div>
              <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#374151' }}>
                🔗 {isEn ? 'Purchase Link (URL)' : '바로 구매하기 링크 (URL)'}
              </label>
              <input type="url" placeholder="https://..." value={editForm.purchaseUrl} onChange={e => setEditForm({ ...editForm, purchaseUrl: e.target.value })} style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '0.95rem' }} />
            </div>

            <div>
              <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#374151' }}>
                {isEn ? 'Product Key Features (One per line)' : '제품 주요 특징 (줄바꿈으로 구분)'}
              </label>
              <textarea rows={4} value={editForm.features} onChange={e => setEditForm({ ...editForm, features: e.target.value })} style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '0.95rem' }} />
            </div>

            <div>
              <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#374151' }}>
                {isEn ? 'Ingredients & Details' : '원료 및 원산지/유통기한 정보'}
              </label>
              <textarea rows={3} value={editForm.ingredients} onChange={e => setEditForm({ ...editForm, ingredients: e.target.value })} style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '0.95rem' }} />
            </div>

            {CATEGORIES_WITH_NUTRITION.includes(editForm.category) && (
              <div>
                <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#374151' }}>
                  {isEn ? 'Guaranteed Analysis (Nutrition)' : '등록 성분량'}
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '12px' }}>
                  <input type="text" placeholder="예: 24.0% (Min)" value={editForm.protein} onChange={e => setEditForm({ ...editForm, protein: e.target.value })} style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '0.95rem' }} />
                  <input type="text" placeholder="예: 10.0% (Min)" value={editForm.fat} onChange={e => setEditForm({ ...editForm, fat: e.target.value })} style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '0.95rem' }} />
                  <input type="text" placeholder="예: 5.0% (Max)" value={editForm.fiber} onChange={e => setEditForm({ ...editForm, fiber: e.target.value })} style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '0.95rem' }} />
                  <input type="text" placeholder="예: 12.0% (Max)" value={editForm.moisture} onChange={e => setEditForm({ ...editForm, moisture: e.target.value })} style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '0.95rem' }} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '12px', marginTop: '4px', fontSize: '0.75rem', color: '#6B7280' }}>
                  <span>{isEn ? 'Crude Protein' : '조단백'}</span>
                  <span>{isEn ? 'Crude Fat' : '조지방'}</span>
                  <span>{isEn ? 'Crude Fiber' : '조섬유'}</span>
                  <span>{isEn ? 'Moisture' : '수분'}</span>
                </div>
              </div>
            )}

            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '8px' }}>
              <button type="button" onClick={handleCloseEdit} style={{ padding: '12px 20px', fontWeight: '600', border: '1px solid #D1D5DB', borderRadius: '8px', cursor: 'pointer', backgroundColor: '#F9FAFB', color: '#374151' }}>
                {isEn ? 'Cancel' : '취소'}
              </button>
              <button type="submit" style={{ padding: '12px 24px', fontWeight: '700', border: 'none', borderRadius: '8px', cursor: 'pointer', backgroundColor: '#0066B3', color: '#FFFFFF' }}>
                💾 {isEn ? 'Save' : '저장하기'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
