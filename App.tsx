import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import About from './pages/About';
import Quiz from './pages/Quiz';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import FAQ from './pages/FAQ';
import CompareFloatingBar from './components/CompareFloatingBar';
import CompareModal from './components/CompareModal';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { CompareProvider } from './context/CompareContext';

// Simple ScrollToTop component handled via wrapper since react-router-dom v6 ScrollRestoration works best with data router but we are using HashRouter here in a simple way
const ScrollToTop = () => {
  const { pathname } = React.useMemo(() => window.location, []);
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

const App: React.FC = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <CompareProvider>
          <HashRouter>
            <ScrollToTop />
            <div className="flex flex-col min-h-screen font-sans">
              <Navbar />
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/shop" element={<Shop />} />
                  <Route path="/product/:id" element={<ProductDetail />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/quiz" element={<Quiz />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/faq" element={<FAQ />} />
                </Routes>
              </main>
              <Footer />
              <CompareFloatingBar />
              <CompareModal />
            </div>
          </HashRouter>
        </CompareProvider>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;