import React, { useState, useEffect } from 'react';
import { getUserProfile, updateUserProfile } from '../services/api';

const UserProfile = ({ userId = 1 }) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({ address: '' });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getUserProfile(userId);
        setProfile(data);
        setFormData({ address: data.address });
      } catch (error) { console.error(error); } finally { setLoading(false); }
    };
    fetchProfile();
  }, [userId]);

  const handleSave = async () => {
    setSaving(true);
    try {
      const updatedUser = await updateUserProfile(userId, { address: formData.address });
      setProfile(updatedUser);
      alert("🚀 ¡DIRECCIÓN ACTUALIZADA NIVEL DIOS!");
    } catch (error) { console.error(error); } finally { setSaving(false); }
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-[50vh]">
      <div className="text-6xl animate-bounce">🕶️</div>
      <p className="mt-4 font-black text-2xl uppercase italic text-[#2D3436]">Identificando al sujeto...</p>
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto">
      <div className="cartoon-card bg-white p-10 relative overflow-hidden">
        {/* Decoración fondo - Círculos burbuja */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-pink-200 rounded-full opacity-50"></div>
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-yellow-200 rounded-full opacity-50"></div>

        <div className="relative z-10">
          <div className="flex items-center gap-6 mb-10">
            <div className="w-24 h-24 bg-orange-400 border-[4px] border-[#2D3436] rounded-[2rem] flex items-center justify-center text-5xl shadow-[6px_6px_0px_0px_rgba(45,52,54,1)]">
              😎
            </div>
            <div>
              <h2 className="text-4xl font-black text-[#2D3436] leading-none uppercase italic tracking-tighter">
                ¡Hola, <span className="text-blue-600 underline decoration-yellow-400 decoration-8">{profile.username}</span>!
              </h2>
              <p className="text-pink-500 font-black mt-2 uppercase tracking-tight bg-pink-50 px-3 py-1 inline-block border-[2px] border-pink-500 rounded-lg">
                {profile.role} Legendario
              </p>
            </div>
          </div>

          <div className="space-y-8">
            <div className="cartoon-card p-6 bg-gray-50 border-dashed border-[#2D3436]/30">
              <label className="block text-xs font-black text-gray-400 uppercase mb-1">Tu Identidad Digital</label>
              <p className="text-xl font-bold text-[#2D3436]">{profile.email}</p>
            </div>

            <div className="space-y-3">
              <label className="block text-lg font-black text-[#2D3436] uppercase ml-2 flex items-center gap-2">
                📍 ¿Dónde enviamos tus tesoros?
              </label>
              <input 
                type="text" 
                value={formData.address}
                onChange={(e) => setFormData({ address: e.target.value })}
                className="cartoon-input w-full text-lg font-bold placeholder:text-gray-300 bg-white"
                placeholder="Escribe tu dirección secreta..."
              />
            </div>

            <button 
              onClick={handleSave}
              disabled={saving}
              className={`cartoon-btn w-full py-5 text-2xl uppercase tracking-widest font-black transition-all ${
                saving ? 'bg-gray-400 cursor-not-allowed opacity-50' : 'bg-yellow-400 hover:bg-yellow-500 active:bg-yellow-600'
              }`}
            >
              {saving ? '⚡ PROCESANDO...' : '💾 GUARDAR CAMBIOS'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
