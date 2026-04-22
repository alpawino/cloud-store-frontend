import React, { useState } from 'react';
import ProductList from './components/ProductList';
import OrderHistory from './components/OrderHistory';
import UserProfile from './components/UserProfile';
import AdminDashboard from './components/AdminDashboard';

function App() {
  const [view, setView] = useState('catalog');

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
          <nav className="flex flex-wrap justify-center gap-4 bg-white/50 p-3 rounded-[2rem] border-[3px] border-[#2D3436]">
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
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6">
        <div className="transition-all duration-500 transform">
          {view === 'catalog' && <ProductList />}
          {view === 'orders' && <OrderHistory />}
          {view === 'profile' && <UserProfile />}
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
