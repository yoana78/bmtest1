import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import ScrollProgress from './components/ScrollProgress'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'
import About from './pages/About'
import Brands from './pages/Brands'
import ImportedBrands from './pages/ImportedBrands'
import BrandDetail from './pages/BrandDetail'
import Catalog from './pages/Catalog'
import ProductDetail from './pages/ProductDetail'
import Trust from './pages/Trust'
import Contact from './pages/Contact'
import Admin from './pages/Admin'

function App() {
  return (
    <>
      <ScrollToTop />
      <ScrollProgress />
      <Header />
      <div className="app-shell">
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/brands" element={<Brands />} />
            <Route path="/brands/:brandId" element={<BrandDetail />} />
            <Route path="/imported-brands" element={<ImportedBrands />} />
            <Route path="/imported-brands/:brandId" element={<BrandDetail />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/catalog/:productId" element={<ProductDetail />} />
            <Route path="/trust" element={<Trust />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </>
  )
}

export default App
