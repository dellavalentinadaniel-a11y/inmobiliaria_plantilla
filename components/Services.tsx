import React, { useState, useRef, useEffect } from 'react';
import { Home, Building2, ClipboardCheck, ShieldCheck, Users, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const Services: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsToShow, setItemsToShow] = useState(3);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) setItemsToShow(1);
      else if (window.innerWidth < 1024) setItemsToShow(2);
      else setItemsToShow(3);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const services = [
    {
      title: 'Alquiler y Venta',
      description: 'Te acompañamos en todo el proceso de búsqueda y negociación para encontrar tu propiedad ideal.',
      icon: Home,
      imageUrl: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=600',
      color: 'text-blue-400'
    },
    {
      title: 'Administración',
      description: 'Gestión integral de alquileres, cobros y mantenimiento para que no tengas que preocuparte por nada.',
      icon: Building2,
      imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=600',
      color: 'text-green-400'
    },
    {
      title: 'Tasaciones',
      description: 'Determinamos el valor real de mercado de tu propiedad con profesionalismo y objetividad.',
      icon: ClipboardCheck,
      imageUrl: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=600',
      color: 'text-purple-400'
    },
    {
      title: 'Seguros',
      description: 'Ofrecemos coberturas integrales para proteger tu hogar o inversión inmobiliaria.',
      icon: ShieldCheck,
      imageUrl: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=600',
      color: 'text-red-400'
    },
    {
      title: 'Asesoramiento',
      description: 'Hablá con nuestros expertos y encontrá la solución legal y técnica que necesitás.',
      icon: Users,
      imageUrl: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=600',
      color: 'text-indigo-400'
    }
  ];

  const next = () => {
    if (currentIndex < services.length - itemsToShow) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const prev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    } else {
      setCurrentIndex(services.length - itemsToShow);
    }
  };

  return (
    <div className="bg-gray-50">
      <section className="py-24 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight"
            >
              Nuestros Servicios
            </motion.h2>
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: 80 }}
              viewport={{ once: true }}
              className="h-1.5 bg-red-600 mx-auto rounded-full mb-8"
            />
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed"
            >
              Ofrecemos soluciones integrales en el mercado inmobiliario, brindando seguridad y confianza en cada operación con excelencia y profesionalismo.
            </motion.p>
          </div>

          <div className="relative group">
            <div className="flex items-center justify-between absolute top-1/2 -translate-y-1/2 w-full left-0 z-10 px-2 pointer-events-none">
              <button 
                onClick={prev}
                className="w-12 h-12 rounded-full bg-white/90 shadow-xl flex items-center justify-center text-gray-800 hover:bg-white hover:scale-110 transition-all pointer-events-auto -ml-6 border border-gray-100"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button 
                onClick={next}
                className="w-12 h-12 rounded-full bg-white/90 shadow-xl flex items-center justify-center text-gray-800 hover:bg-white hover:scale-110 transition-all pointer-events-auto -mr-6 border border-gray-100"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            <div className="overflow-hidden px-4 py-8">
              <motion.div 
                className="flex gap-8"
                animate={{ x: `-${currentIndex * (100 / itemsToShow)}%` }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                {services.map((service, index) => (
                  <motion.div 
                    key={index} 
                    className="flex-shrink-0 relative h-[450px] rounded-3xl overflow-hidden shadow-2xl group/card"
                    style={{ width: `calc(${100 / itemsToShow}% - ${(8 * (itemsToShow - 1)) / itemsToShow}px)` }}
                    whileHover={{ y: -10 }}
                  >
                    {/* Background Image */}
                    <div className="absolute inset-0">
                      <img 
                        src={service.imageUrl} 
                        alt={service.title} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-110 shadow-inner"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10 transition-opacity duration-300 group-hover/card:opacity-80" />
                    </div>

                    {/* Content */}
                    <div className="absolute inset-0 p-10 flex flex-col justify-end text-white backdrop-blur-[2px] group-hover/card:backdrop-blur-none transition-all duration-300">
                      <div className={`w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center mb-6 border border-white/20 transition-transform duration-500 group-hover/card:scale-110 group-hover/card:bg-white group-hover/card:border-white shadow-lg`}>
                        <service.icon className={`w-8 h-8 ${service.color} group-hover/card:text-gray-900 transition-colors duration-300`} />
                      </div>
                      <h3 className="text-2xl font-bold mb-4 tracking-tight group-hover/card:text-white transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-gray-300 leading-relaxed group-hover/card:text-white transition-colors duration-300 line-clamp-3">
                        {service.description}
                      </p>
                      
                      <div className="mt-8 h-1 w-0 bg-red-600 transition-all duration-500 group-hover/card:w-full rounded-full" />
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
            
            {/* Pagination Dots */}
            <div className="flex justify-center mt-12 space-x-3">
              {Array.from({ length: services.length - itemsToShow + 1 }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    currentIndex === i ? 'w-12 bg-red-600' : 'w-2.5 bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
