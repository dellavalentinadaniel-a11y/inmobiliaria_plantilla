import React, { useState } from 'react';
import { Search, MapPin } from 'lucide-react';
import { FilterState } from '../types';

interface HeroProps {
  onSearch: (filters: Partial<FilterState>) => void;
}

export const Hero: React.FC<HeroProps> = ({ onSearch }) => {
  const [activeTab, setActiveTab] = useState<'Sale' | 'Rent'>('Sale');
  const [location, setLocation] = useState('');

  const handleSearch = () => {
    onSearch({ operation: activeTab, location: location });
  };

  return (
    <div className="relative h-[600px] w-full bg-gray-900 flex flex-col justify-center items-center text-white overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ 
          backgroundImage: 'url("https://picsum.photos/1920/1080?grayscale")',
          opacity: 0.6
        }}
      ></div>
      <div className="absolute inset-0 z-0 bg-gradient-to-t from-black/70 to-transparent"></div>

      <div className="relative z-10 container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight drop-shadow-md">
          Encontrá la propiedad de tus sueños
        </h1>
        <p className="text-lg md:text-xl mb-10 text-gray-200 drop-shadow-sm max-w-2xl mx-auto">
          La red inmobiliaria más grande te ayuda a encontrar tu próximo hogar.
        </p>

        {/* Search Box */}
        <div className="bg-white/95 backdrop-blur-sm p-2 rounded-xl shadow-2xl max-w-4xl mx-auto text-gray-800">
          <div className="flex border-b border-gray-200 mb-4">
            <button 
              className={`flex-1 py-3 font-semibold text-lg transition-colors ${activeTab === 'Sale' ? 'text-red-600 border-b-2 border-red-600' : 'text-gray-500 hover:text-gray-800'}`}
              onClick={() => setActiveTab('Sale')}
            >
              Comprar
            </button>
            <button 
              className={`flex-1 py-3 font-semibold text-lg transition-colors ${activeTab === 'Rent' ? 'text-red-600 border-b-2 border-red-600' : 'text-gray-500 hover:text-gray-800'}`}
              onClick={() => setActiveTab('Rent')}
            >
              Alquilar
            </button>
          </div>

          <div className="flex flex-col md:flex-row gap-4 p-2">
            <div className="flex-1 relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input 
                type="text" 
                placeholder="Barrio, Ciudad o Provincia" 
                className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            
            <div className="flex-1 relative">
              <select className="w-full px-4 py-3 bg-gray-50 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none text-gray-600">
                <option value="">Tipo de Propiedad</option>
                <option value="House">Casa</option>
                <option value="Apartment">Departamento</option>
                <option value="Condo">Oficina</option>
                <option value="Land">Terreno</option>
              </select>
            </div>

            <button 
              onClick={handleSearch}
              className="bg-blue-900 hover:bg-blue-800 text-white font-bold py-3 px-8 rounded-lg transition-colors flex items-center justify-center shadow-lg"
            >
              <Search className="w-5 h-5 mr-2" />
              Buscar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
