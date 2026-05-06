import React, { useState } from 'react';
import ProductList from './components/ProductList';
import OrderHistory from './components/OrderHistory';
import UserProfile from './components/UserProfile';
import AdminDashboard from './components/AdminDashboard';

function App() {
  const [view, setView] = useState('catalog');
  const [cart, setCart] = useState([]);
  const [currentUserId, setCurrentUserId] = useState(1);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  return (
    <div className="min-h-screen bg-[#FFDEE9] bg-gradient-to-br from-[#FFDEE9] to-[#B5FFFC]">
      <header className="p-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo Animado */}
          <div 
            className="cartoon-card bg-yellow-400 px-6 py-2 flex items-center gap-3 cursor-pointer floating"
            onClick={() => setView('catalog')}
          >
            <span className="text-4xl">☁️</span>
            <h1 className="text-3xl font-black text-[#2D3436] italic tracking-tighter">
              CLOUD<span className="text-white">STORE</span>
            </h1>
          </div>

          {/* Nav Estilo Burbuja */}
          <nav className="flex flex-wrap justify-center gap-4 bg-white/50 p-3 rounded-[2rem] border-[3px] border-[#2D3436] items-center">
            {[
              { id: 'catalog', label: 'Tienda', icon: '🛍️', color: 'bg-blue-400' },
              { id: 'orders', label: 'Pedidos', icon: '📦', color: 'bg-green-400' },
              { id: 'profile', label: 'Mi Perfil', icon: '👤', color: 'bg-orange-400' },
              { id: 'admin', label: 'Stats', icon: '📊', color: 'bg-purple-400' }
            ].map((item) => (
              <button 
                key={item.id}
                onClick={() => setView(item.id)}
                className={`cartoon-btn flex items-center gap-2 text-sm ${
                  view === item.id ? `${item.color} text-white scale-110` : 'bg-white text-[#2D3436] hover:bg-gray-100'
                }`}
              >
                <span>{item.icon}</span> {item.label}
              </button>
            ))}
            
            {/* SELECTOR DE USUARIO DINÁMICO */}
            <div className="flex items-center gap-2 bg-yellow-100 px-4 py-2 rounded-[1rem] border-[2px] border-black shadow-sm">
              <span className="font-black text-[#2D3436] text-sm uppercase">👤 ID:</span>
              <input 
                type="number" 
                value={currentUserId}
                onChange={(e) => setCurrentUserId(Number(e.target.value) || 1)}
                min="1"
                className="w-16 p-1 text-center rounded border-2 border-gray-400 font-bold outline-none focus:border-blue-500 bg-white"
              />
            </div>

            {/* BOTÓN DE CARRITO MÁGICO */}
            {cart.length > 0 && (
              <button 
                onClick={async () => {
                  const { createOrder } = await import('./services/api');
                  
                  // Agrupar items repetidos
                  const itemMap = {};
                  cart.forEach(p => {
                    if (!itemMap[p._id]) itemMap[p._id] = { productId: parseInt(p._id), quantity: 0, unitPrice: p.price };
                    itemMap[p._id].quantity += 1;
                  });
                  
                  await createOrder({
                    userId: currentUserId,
                    items: Object.values(itemMap)
                  });
                  
                  setCart([]);
                  setView('orders');
                  window.location.reload();
                }}
                className="cartoon-btn flex items-center gap-2 text-sm bg-yellow-400 text-[#2D3436] font-black hover:bg-yellow-300 animate-pulse border-[2px] border-black"
              >
                <span>🛒</span> Pagar ({cart.length})
              </button>
            )}
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6">
        <div className="transition-all duration-500 transform">
          {view === 'catalog' && <ProductList addToCart={addToCart} />}
          {view === 'orders' && <OrderHistory userId={currentUserId} />}
          {view === 'profile' && <UserProfile userId={currentUserId} />}
          {view === 'admin' && <AdminDashboard />}
        </div>
      </main>
      
      <footer className="text-center py-10 font-bold text-[#2D3436]/50">
        🚀 Hecho con ❤️ para Cloud Computing 2026
      </footer>
    </div>
  );
}

export default App;
