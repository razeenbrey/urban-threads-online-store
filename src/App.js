import { Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Home from './pages/Home/Home';
import Products from './pages/Products/Products';
import About from './pages/About/About';
import CartOffCanvas from './components/CartView/CartOffCanvas';

import { AuthProvider } from './services/AuthContext';

function App() {
  return (
    <AuthProvider>
      <div className='app'>
          <Navbar />  {}
          <CartOffCanvas />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/about" element={<About />} />
          </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;