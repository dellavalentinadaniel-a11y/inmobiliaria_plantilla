import React from 'react';
import { Send, Bell, ShieldCheck } from 'lucide-react';

export const Newsletter: React.FC = () => {
  return (
    <section className="py-24 bg-gray-900 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 rounded-full blur-[120px] -mr-32 -mt-32"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] -ml-32 -mb-32"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto bg-white/5 border border-white/10 rounded-[4rem] p-12 md:p-20 text-center backdrop-blur-xl">
          <div className="w-20 h-20 bg-red-600 rounded-[2rem] flex items-center justify-center mx-auto mb-10 shadow-2xl shadow-red-600/40 transform -rotate-6">
            <Bell className="w-10 h-10 text-white animate-pulse" />
          </div>
          
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight leading-tight">
            No te pierdas las <span className="text-red-500">oportunidades</span> de la semana
          </h2>
          <p className="text-gray-400 text-lg mb-12 max-w-2xl mx-auto">
            Suscribite y recibí en tu e-mail las propiedades que aún no se publicaron en portales comerciales. Acceso exclusivo garantizado.
          </p>
          
          <form className="max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
            <div className="flex flex-col sm:flex-row gap-4">
              <input 
                type="email" 
                placeholder="Tu e-mail profesional..." 
                className="flex-grow bg-white/5 border border-white/10 rounded-2xl py-5 px-8 text-white font-bold placeholder:text-gray-500 focus:bg-white/10 focus:ring-2 focus:ring-red-500/50 outline-none transition-all"
              />
              <button className="bg-red-600 text-white font-black py-5 px-10 rounded-2xl shadow-xl shadow-red-900/40 hover:bg-red-700 hover:-translate-y-1 transition-all uppercase tracking-widest text-sm flex items-center justify-center space-x-3">
                <span>Suscribirme</span>
                <Send className="w-4 h-4" />
              </button>
            </div>
            <div className="mt-8 flex items-center justify-center space-x-2 text-gray-500 text-[10px] font-bold uppercase tracking-widest">
              <ShieldCheck className="w-4 h-4" />
              <span>Privacidad 100% protegida. Sin SPAM.</span>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
