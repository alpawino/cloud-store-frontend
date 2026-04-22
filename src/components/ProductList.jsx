import React, { useState, useEffect } from 'react';
import { getProducts } from '../services/api';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-[50vh]">
      <div className="text-6xl animate-bounce">📦</div>
      <p className="mt-4 font-black text-2xl uppercase italic">¡Buscando tesoros!</p>
    </div>
  );

  return (
    <div>
      <h2 className="text-4xl font-black text-[#2D3436] mb-10 text-center uppercase tracking-widest bg-white inline-block px-8 py-4 cartoon-card -rotate-1">
        🔥 Los más buscados 🔥
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {products.map((product) => (
          <div key={product._id} className="cartoon-card overflow-hidden flex flex-col group">
            <div className="relative h-64 border-b-[3px] border-[#2D3436] bg-gray-100">
              <img 
                src={product.image_url} 
                alt={product.name} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute top-4 left-4 bg-yellow-300 border-[2px] border-[#2D3436] px-3 py-1 rounded-full text-xs font-black shadow-[2px_2px_0px_0px_rgba(45,52,54,1)]">
                {product.category}
              </div>
              {product.status !== 'available' && (
                <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center">
                  <span className="bg-red-500 text-white font-black text-2xl px-6 py-2 border-[3px] border-white -rotate-12 shadow-xl">¡VOLÓ!</span>
                </div>
              )}
            </div>
            
            <div className="p-6 flex flex-col flex-grow bg-white">
              <h3 className="text-xl font-black text-[#2D3436] leading-tight mb-2 uppercase">
                {product.name}
              </h3>
              
              <div className="flex items-center justify-between mt-auto">
                <div className="bg-green-300 border-[2px] border-[#2D3436] px-4 py-1 rounded-xl shadow-[3px_3px_0px_0px_rgba(45,52,54,1)]">
                  <span className="text-2xl font-black">${product.price}</span>
                </div>
                
                <button 
                  disabled={product.status !== 'available'}
                  className={`cartoon-btn ${
                    product.status === 'available' 
                      ? 'bg-blue-500 text-white hover:bg-blue-600' 
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  ¡LO QUIERO!
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
