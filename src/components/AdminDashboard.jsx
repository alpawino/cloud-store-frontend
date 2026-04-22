import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { getSalesByCategory, getMonthlyRevenue } from '../services/api';

const AdminDashboard = () => {
  const [salesData, setSalesData] = useState([]);
  const [revenueData, setRevenueData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const [sales, revenue] = await Promise.all([getSalesByCategory(), getMonthlyRevenue()]);
        setSalesData(sales);
        setRevenueData(revenue);
      } catch (error) { console.error(error); } finally { setLoading(false); }
    };
    fetchAnalytics();
  }, []);

  const COLORS = ['#FF6B6B', '#4ECDC4', '#FFE66D', '#1A535C'];

  if (loading) return <div className="p-10 text-center font-black animate-pulse">📊 CALCULANDO EL ÉXITO...</div>;

  return (
    <div className="space-y-10">
      <div className="bg-white p-6 cartoon-card inline-block mb-4">
        <h2 className="text-3xl font-black italic tracking-tighter uppercase text-purple-600">
          Super Dashboard <span className="text-[#2D3436]">Analytics</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Gráfico 1 */}
        <div className="cartoon-card p-8 bg-white">
          <h3 className="text-xl font-black mb-6 uppercase border-b-4 border-yellow-400 pb-2 inline-block">
            📍 Ventas por Categoría
          </h3>
          <div className="h-[300px]">
            <ResponsiveContainer>
              <PieChart>
                <Pie data={salesData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={5} dataKey="value">
                  {salesData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} stroke="#2D3436" strokeWidth={3} />)}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: '15px', border: '3px solid #2D3436', fontWeight: 'bold' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Gráfico 2 */}
        <div className="cartoon-card p-8 bg-white">
          <h3 className="text-xl font-black mb-6 uppercase border-b-4 border-blue-400 pb-2 inline-block">
            📈 Crecimiento Galáctico
          </h3>
          <div className="h-[300px]">
            <ResponsiveContainer>
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E0E0E0" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontWeight: 'bold' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontWeight: 'bold' }} />
                <Tooltip cursor={{ fill: '#F3F4F6' }} contentStyle={{ borderRadius: '15px', border: '3px solid #2D3436', fontWeight: 'bold' }} />
                <Bar dataKey="revenue" fill="#FFDEE9" stroke="#2D3436" strokeWidth={3} radius={[10, 10, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
