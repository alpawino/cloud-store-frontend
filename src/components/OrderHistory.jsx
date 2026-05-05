import React, { useState, useEffect } from 'react';
import { getFullUserHistory } from '../services/api';

const OrderHistory = ({ userId = 1 }) => {
  const [historyData, setHistoryData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const data = await getFullUserHistory(userId);
        setHistoryData(data);
      } catch (error) { console.error(error); } finally { setLoading(false); }
    };
    fetchHistory();
  }, [userId]);

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-[50vh]">
      <div className="text-6xl animate-spin">🔍</div>
      <p className="mt-4 font-black text-2xl uppercase italic">Rastreando tus tesoros...</p>
    </div>
  );

  // Compatibilidad: si la respuesta viene del MS 4 (agregador) o directamente del MS 3 (órdenes)
  const user = historyData?.user || null;
  const orders = historyData?.orders || (Array.isArray(historyData) ? historyData : []);
  const summary = historyData?.summary || null;

  return (
    <div className="max-w-4xl mx-auto space-y-10">
      <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
        <h2 className="text-4xl font-black text-[#2D3436] rotate-1 bg-green-300 inline-block px-8 py-3 cartoon-card">
          📜 Mis Botines Comprados
        </h2>
      </div>

      {/* Tarjeta de Resumen del Agregador (MS 4) */}
      {(user || summary) && (
        <div className="cartoon-card bg-gradient-to-r from-blue-500 to-purple-600 p-8 text-white">
          <p className="text-xs font-black uppercase opacity-70 mb-1">🔗 Datos agregados por el Microservicio de Historial</p>
          <div className="flex flex-wrap gap-8 items-center">
            {user && (
              <div>
                <p className="text-sm opacity-70">Cliente</p>
                <p className="text-2xl font-black">{user.name}</p>
                <p className="text-sm opacity-80">{user.email}</p>
              </div>
            )}
            {summary && (
              <>
                <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-6 py-4 border-[2px] border-white/30">
                  <p className="text-xs opacity-70">Total Pedidos</p>
                  <p className="text-3xl font-black">{summary.total_orders}</p>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-6 py-4 border-[2px] border-white/30">
                  <p className="text-xs opacity-70">Total Gastado</p>
                  <p className="text-3xl font-black">${summary.total_spent}</p>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-6 py-4 border-[2px] border-white/30">
                  <p className="text-xs opacity-70">Promedio x Orden</p>
                  <p className="text-3xl font-black">${summary.average_order}</p>
                </div>
              </>
            )}
          </div>
        </div>
      )}
      
      <div className="space-y-12">
        {orders.map((order) => (
          <div key={order.id} className="cartoon-card bg-white overflow-hidden">
            {/* Header del Ticket */}
            <div className="bg-[#2D3436] p-6 flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="text-white">
                <p className="text-xs font-bold uppercase opacity-70">Número de Orden</p>
                <p className="text-2xl font-black italic tracking-tighter">#{order.id}</p>
              </div>
              <div className="bg-yellow-400 border-[3px] border-white px-6 py-2 rounded-full -rotate-2 shadow-lg">
                <span className="text-[#2D3436] font-black uppercase text-sm">{order.status}</span>
              </div>
            </div>

            <div className="p-8">
              <div className="flex flex-wrap gap-8 mb-8 pb-8 border-b-[3px] border-dashed border-gray-200 text-[#2D3436]">
                <div>
                  <p className="text-xs font-black uppercase text-gray-400">¿Fecha del robo?</p>
                  <p className="font-bold text-lg">{new Date(order.createdAt || order.created_at).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-xs font-black uppercase text-gray-400">Inversión Total</p>
                  <p className="font-black text-3xl text-green-600">${order.total}</p>
                </div>
              </div>

              <h4 className="font-black uppercase text-sm mb-4 tracking-tighter text-blue-500 underline decoration-4 decoration-yellow-300 underline-offset-4">Contenido del paquete:</h4>
              <ul className="space-y-4">
                {(order.details || order.order_details || []).map((detail) => (
                  <li key={detail.id} className="flex justify-between items-center bg-gray-50 p-4 rounded-2xl border-[2px] border-[#2D3436] shadow-[4px_4px_0px_0px_rgba(45,52,54,0.1)] hover:bg-white transition-colors">
                    <div>
                      <p className="font-black text-[#2D3436]">ID: {String(detail.productId || detail.product_id).substring(0,8)}...</p>
                      <p className="text-sm font-bold text-gray-500 italic">{detail.quantity} x ${detail.unitPrice || detail.unit_price}</p>
                    </div>
                    <div className="text-2xl font-black text-[#2D3436]">${detail.lineTotal || detail.line_total}</div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderHistory;
