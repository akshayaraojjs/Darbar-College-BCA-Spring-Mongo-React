import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import { CartProvider } from './context/CartContext';

function App() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <CartProvider>
      <Router>
        <div className="bg-light min-vh-100 d-flex flex-column">
          <Navbar onSearch={setSearchTerm} />

          <main className="flex-grow-1">
            <Routes>
              <Route path="/" element={<Home searchTerm={searchTerm} />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
            </Routes>
          </main>

          <footer className="bg-dark text-white py-5 mt-5">
            <div className="container">
              <div className="row g-4 align-items-center">
                <div className="col-md-6 text-center text-md-start">
                  <h3 className="fw-bold mb-0">React<span className="text-primary">Store</span></h3>
                  <p className="opacity-50 small mt-2">© 2026 A premium ecommerce demonstration.</p>
                </div>
                <div className="col-md-6 text-center text-md-end">
                  <div className="d-flex justify-content-center justify-content-md-end gap-3">
                    <a href="#" className="text-white opacity-75 fs-4"><i className="bi bi-facebook"></i></a>
                    <a href="#" className="text-white opacity-75 fs-4"><i className="bi bi-twitter-x"></i></a>
                    <a href="#" className="text-white opacity-75 fs-4"><i className="bi bi-instagram"></i></a>
                  </div>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
