import React, { useState } from 'react';
import { MOCK_AGENTS } from '../services/mockData';
import { Search, MapPin, Mail, Phone, User } from 'lucide-react';

export const AgentsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredAgents = MOCK_AGENTS.filter(agent => 
    agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    agent.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 animate-fade-in">
      {/* Header */}
      <div className="bg-blue-900 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">Nuestros Agentes</h1>
          <p className="text-blue-200 text-lg max-w-2xl mx-auto">
            Conectá con los mejores profesionales del mercado para guiarte en tu próxima operación inmobiliaria.
          </p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="container mx-auto px-4 -mt-8 mb-12 relative z-10">
        <div className="bg-white rounded-xl shadow-lg p-4 max-w-3xl mx-auto flex items-center border border-gray-100">
          <Search className="text-gray-400 w-6 h-6 ml-2" />
          <input 
            type="text" 
            placeholder="Buscar por nombre o zona..." 
            className="w-full px-4 py-2 focus:outline-none text-gray-700 text-lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Agents Grid */}
      <div className="container mx-auto px-4 pb-20">
        {filteredAgents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredAgents.map(agent => (
              <div key={agent.id} className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden group">
                <div className="relative h-32 bg-gradient-to-r from-blue-900 to-blue-700">
                  <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
                    <img 
                      src={agent.photo} 
                      alt={agent.name} 
                      className="w-24 h-24 rounded-full border-4 border-white object-cover shadow-md"
                    />
                  </div>
                </div>
                
                <div className="pt-14 pb-6 px-6 text-center">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{agent.name}</h3>
                  <p className="text-blue-900 font-medium text-sm mb-4">{agent.role}</p>
                  
                  <div className="flex justify-center items-center text-gray-500 text-sm mb-6">
                    <MapPin className="w-4 h-4 mr-1" />
                    {agent.location}
                  </div>

                  <div className="flex justify-center gap-3 mb-6">
                    <a href={`mailto:${agent.email}`} className="p-2 bg-gray-100 rounded-full text-gray-600 hover:bg-blue-100 hover:text-blue-900 transition-colors" title="Email">
                      <Mail className="w-5 h-5" />
                    </a>
                    <a href={`tel:${agent.phone}`} className="p-2 bg-gray-100 rounded-full text-gray-600 hover:bg-green-100 hover:text-green-700 transition-colors" title="Llamar">
                      <Phone className="w-5 h-5" />
                    </a>
                    <a href="#" className="p-2 bg-gray-100 rounded-full text-gray-600 hover:bg-purple-100 hover:text-purple-900 transition-colors" title="Perfil">
                      <User className="w-5 h-5" />
                    </a>
                  </div>

                  <div className="border-t border-gray-100 pt-4 flex justify-between items-center text-sm">
                    <span className="text-gray-500">Propiedades</span>
                    <span className="font-bold text-gray-900">{agent.listingsCount} Activas</span>
                  </div>
                  
                  <button className="w-full mt-4 bg-white border border-blue-900 text-blue-900 font-bold py-2 rounded-lg hover:bg-blue-50 transition-colors">
                    Ver Propiedades
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <h3 className="text-xl font-bold text-gray-900 mb-2">No se encontraron agentes</h3>
            <p className="text-gray-500">Intenta buscar con otro nombre o ubicación.</p>
          </div>
        )}
      </div>
    </div>
  );
};