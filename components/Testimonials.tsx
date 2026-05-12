import React from 'react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';

const testimonials = [
  {
    name: 'Roberto Sánchez',
    role: 'Comprador en Palermo',
    content: 'La atención fue impecable desde el primer día. Lo que más valoré fue la transparencia absoluta en los costos y tiempos de la operación.',
    avatar: 'https://i.pravatar.cc/100?u=a1',
    stars: 5
  },
  {
    name: 'Elena Fernández',
    role: 'Propietaria - Alquiler Administrado',
    content: 'Dejar mi propiedad en manos de InmoFuture fue la mejor decisión. Se encargan de todo y cobro el alquiler puntualmente cada mes.',
    avatar: 'https://i.pravatar.cc/100?u=a2',
    stars: 5
  },
  {
    name: 'Marcos Galperin',
    role: 'Inversor Inmobiliario',
    content: 'El nivel de asesoramiento técnico y legal es superior a cualquier otra inmobiliaria del mercado. Entienden el negocio.',
    avatar: 'https://i.pravatar.cc/100?u=a3',
    stars: 5
  }
];

export const Testimonials: React.FC = () => {
  return (
    <section className="py-24 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-red-600 font-black uppercase tracking-[0.2em] text-xs mb-4 block">Confianza Real</span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight mb-4">Lo que dicen nuestros clientes</h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">Experiencias reales de personas que ya encontraron su lugar ideal con nosotros.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((t, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white p-10 rounded-[3rem] shadow-xl shadow-gray-200/50 border border-gray-100 flex flex-col items-center text-center relative"
            >
              <Quote className="absolute top-8 left-8 w-12 h-12 text-gray-50 opacity-50" />
              <div className="relative mb-6">
                <img src={t.avatar} alt={t.name} className="w-20 h-20 rounded-3xl object-cover shadow-lg" />
                <div className="absolute -bottom-2 -right-2 bg-red-600 p-2 rounded-xl text-white">
                  <Star className="w-3 h-3 fill-white" />
                </div>
              </div>
              <div className="flex space-x-1 mb-4">
                {[...Array(t.stars)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-red-500 text-red-500" />
                ))}
              </div>
              <p className="text-gray-600 italic leading-relaxed mb-6">"{t.content}"</p>
              <div>
                <h4 className="font-black text-gray-900 text-lg tracking-tight">{t.name}</h4>
                <p className="text-red-600 text-xs font-black uppercase tracking-widest mt-1">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
