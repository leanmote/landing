import { Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar/Navbar.jsx';
import Footer from './components/layout/Footer/Footer.jsx';
import LandingPage from './pages/LandingPage/LandingPage.jsx';
import PricingPage from './pages/PricingPage/PricingPage.jsx';
import CaseStudiesPage from './pages/CaseStudiesPage/CaseStudiesPage.jsx';
import WhoIsThisForPage from './pages/WhoIsThisForPage/WhoIsThisForPage.jsx';
import ProductPage from './pages/ProductPage/ProductPage.jsx';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/case-studies" element={<CaseStudiesPage />} />
        <Route path="/who-is-it-for" element={<WhoIsThisForPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
