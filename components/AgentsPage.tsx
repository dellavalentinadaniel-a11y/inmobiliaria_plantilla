import React, { useState, useEffect } from 'react';
import { getAgents } from '../services/dataService';
import { Agent } from '../types';
import { Search, MapPin, Mail, Phone, User, Briefcase, Building2, ChevronRight, Award, MessageCircle, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const AgentsPage: React.FC = () => {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const data = await getAgents();
        setAgents(data);
      } finally {
        setLoading(false);
      }
    };
    fetchAgents();
  }, []);

  const filteredAgents = agents.filter(agent => 
    agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    agent.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    agent.position?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Presentation Text */}
      <section className="relative pt-20 pb-32 overflow-hidden bg-gray-900">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500 via-transparent to-transparent"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center text-white"
          >
            <span className="inline-block px-4 py-1.5 mb-6 text-xs font-black uppercase tracking-[0.2em] bg-red-600 rounded-full">
              Nuestro Equipo
            </span>
            <h1 className="text-4xl md:text-6xl font-black mb-8 leading-tight tracking-tighter">
              Profesionales que transforman tu <span className="text-red-500 italic">futuro</span>
            </h1>
            <p className="text-gray-400 text-lg md:text-xl leading-relaxed mb-10">
              Contamos con un equipo interdisciplinario de expertos apasionados por el sector inmobiliario. 
              Nuestros brokers combinan años de experiencia, tecnología de vanguardia y una red global 
              para asegurar que cada transacción sea exitosa, transparente y personalizada.
            </p>
            
            <div className="flex flex-wrap justify-center gap-8 text-sm font-bold text-gray-300">
              <div className="flex items-center space-x-2">
                <Award className="w-5 h-5 text-red-500" />
                <span>Asesoramiento Premium</span>
              </div>
              <div className="flex items-center space-x-2">
                <Briefcase className="w-5 h-5 text-red-500" />
                <span>Expertos Certificados</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-red-500" />
                <span>Alcance Nacional</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Search & Filter */}
      <div className="container mx-auto px-4 -mt-10 relative z-20">
        <div className="bg-white rounded-[2rem] shadow-2xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-4 border border-gray-100 max-w-5xl mx-auto">
          <div className="relative flex-grow w-full">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="¿Con quién querés hablar hoy? Buscá por nombre, zona o cargo..." 
              className="w-full pl-14 pr-6 py-5 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-red-100 transition-all text-gray-900 font-medium outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="px-6 py-2 bg-gray-50 rounded-2xl text-xs font-black text-gray-400 uppercase tracking-widest hidden md:block">
            {filteredAgents.length} Agentes Activos
          </div>
        </div>
      </div>

      {/* Agents Listing */}
      <div className="container mx-auto px-4 py-20 pb-32">
        <AnimatePresence mode="popLayout">
          {filteredAgents.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              {filteredAgents.map((agent, idx) => (
                <motion.div 
                  key={agent.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="bg-gray-200/80 rounded-[3rem] border border-gray-300 p-8 flex flex-col md:flex-row gap-8 hover:bg-white hover:shadow-2xl transition-all duration-500 group"
                >
                  {/* Photo Profile */}
                  <div className="md:w-1/3 flex-shrink-0">
                    <div className="relative w-full aspect-square rounded-[2rem] overflow-hidden bg-gray-100">
                      <img 
                        src={agent.photo} 
                        alt={agent.name} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute top-4 left-4">
                        <div className="bg-white/90 backdrop-blur px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-red-600 shadow-sm">
                           {agent.role}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-grow flex flex-col">
                    <div className="mb-4">
                      <span className="text-[10px] font-black text-red-500 uppercase tracking-[0.2em] mb-1 block">
                        {agent.position || 'Agente Inmobiliario'}
                      </span>
                      <h3 className="text-2xl font-black text-gray-900 mb-1 group-hover:text-red-600 transition-colors">{agent.name}</h3>
                      <div className="flex items-center text-gray-500 text-sm font-semibold">
                        <Building2 className="w-4 h-4 mr-2 text-gray-300" />
                        {agent.office || 'Agencia Central'}
                      </div>
                    </div>

                    <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-3">
                      {agent.description || 'Profesional dedicado con amplia trayectoria en el sector, brindando soluciones integrales y personalizadas para cada cliente.'}
                    </p>

                    <div className="grid grid-cols-2 gap-4 mb-8">
                      <div className="flex items-center space-x-3 text-sm font-bold text-gray-700">
                        <div className="p-2 bg-gray-50 rounded-xl">
                          <MapPin className="w-4 h-4 text-red-600" />
                        </div>
                        <span>{agent.location}</span>
                      </div>
                      <div className="flex items-center space-x-3 text-sm font-bold text-gray-700">
                        <div className="p-2 bg-gray-50 rounded-xl">
                          <User className="w-4 h-4 text-red-600" />
                        </div>
                        <span>{agent.listingsCount} Listados</span>
                      </div>
                    </div>

                    <div className="mt-auto flex items-center justify-between pt-6 border-t border-gray-300">
                      <div className="flex items-center space-x-4">
                        <a href={`tel:${agent.phone}`} className="w-10 h-10 bg-white text-gray-700 rounded-full flex items-center justify-center border border-gray-200 hover:bg-red-50 hover:text-red-600 transition-all shadow-sm" title="Llamar">
                          <Phone className="w-4 h-4" />
                        </a>
                        <a href={agent.website ? (agent.website.startsWith('http') ? agent.website : `https://${agent.website}`) : '#'} target="_blank" rel="noreferrer" className="w-10 h-10 bg-white text-blue-600 rounded-full flex items-center justify-center border border-gray-200 hover:bg-blue-50 transition-all shadow-sm" title="Visitar Web">
                          <Globe className="w-4 h-4" />
                        </a>
                        <a href={`mailto:${agent.email}`} className="w-10 h-10 bg-gray-900 text-white rounded-full flex items-center justify-center border-2 border-white hover:bg-red-600 transition-all shadow-sm" title="Enviar Email">
                          <Mail className="w-4 h-4" />
                        </a>
                        <a 
                          href={`https://wa.me/${agent.whatsapp || '5492995504783'}`} 
                          target="_blank" 
                          rel="noreferrer"
                          className="w-10 h-10 bg-[#25D366] text-white rounded-full flex items-center justify-center border border-gray-200 hover:bg-[#128C7E] transition-all shadow-sm" 
                          title="WhatsApp"
                        >
                          <MessageCircle className="w-4 h-4" />
                        </a>
                      </div>
                      
                      <button className="flex items-center space-x-2 px-6 py-3 bg-gray-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-red-600 hover:-translate-y-1 transition-all shadow-xl shadow-gray-200">
                        <ChevronRight className="w-4 h-4" />
                        <span>Ver Más</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20 bg-gray-50 rounded-[3rem] border-2 border-dashed border-gray-200"
            >
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-10 h-10 text-gray-300" />
              </div>
              <h3 className="text-2xl font-black text-gray-900 mb-2">Sin coincidencias</h3>
              <p className="text-gray-500">Probá buscando con otro nombre o zona.</p>
              <button 
                onClick={() => setSearchTerm('')}
                className="mt-6 text-red-600 font-bold hover:underline"
              >
                Limpiar búsqueda
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* CTA Section */}
      <section className="bg-gray-50 py-24">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl md:text-5xl font-black mb-8 tracking-tighter">¿Querés unirte a nuestro <span className="text-red-600 italic">equipo</span>?</h2>
          <p className="text-gray-600 text-lg mb-10">
            Buscamos profesionales talentosos que compartan nuestra visión de excelencia y servicio al cliente. 
            Si te apasionan los bienes raíces y la innovación, queremos conocerte.
          </p>
          <button 
            onClick={() => window.open('https://wa.me/5492995504783', '_blank')}
            className="inline-flex items-center space-x-3 px-10 py-5 bg-gray-900 text-white rounded-[2rem] font-black uppercase tracking-widest hover:bg-black transition-all shadow-2xl"
          >
            <User className="w-5 h-5 text-red-500" />
            <span>Postulate Ahora</span>
          </button>
        </div>
      </section>
    </div>
  );
};