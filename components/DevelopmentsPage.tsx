import React, { useState, useEffect, useRef } from 'react';
import { DevelopmentCard } from './DevelopmentCard';
import { MOCK_DEVELOPMENTS } from '../services/mockData';
import { Development, Property } from '../types';
import { Search, MapPin, Filter, X, ChevronDown, ChevronUp, Map as MapIcon, List as ListIcon, HardHat } from 'lucide-react';

interface DevelopmentsPageProps {
  onDevelopmentClick: (development: Development) => void;
}

export const DevelopmentsPage: React.FC<DevelopmentsPageProps> = ({ onDevelopmentClick }) => {
  const [developments, setDevelopments] = useState<Development[]>(MOCK_DEVELOPMENTS);

  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const mapRef = useRef<any>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  // Filter states
  const [location, setLocation] = useState('');
  const [status, setStatus] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleFilter = () => {
    let result = MOCK_DEVELOPMENTS;

    if (location.trim()) {
      const loc = location.toLowerCase();
      result = result.filter(d => 
        d.location.toLowerCase().includes(loc) || 
        d.title.toLowerCase().includes(loc)
      );
    }

    if (status) {
      result = result.filter(d => d.status === status);
    }

    if (maxPrice) {
      const price = parseInt(maxPrice);
      if (!isNaN(price)) {
        result = result.filter(d => d.priceFrom <= price);
      }
    }

    setDevelopments(result);
  };

  const clearFilters = () => {
    setLocation('');
    setStatus('');
    setMaxPrice('');
    setDevelopments(MOCK_DEVELOPMENTS);
  };

  // Initialize Map
  useEffect(() => {
    if (viewMode === 'map' && mapContainerRef.current) {
      const L = (window as any).L;
      if (!L) return;

      if (mapRef.current) {
        mapRef.current.remove();
      }

      const map = L.map(mapContainerRef.current).setView([-34.6037, -58.3816], 11);
      
      L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 20
      }).addTo(map);

      const markers = L.featureGroup();
      
      developments.forEach((dev) => {
        const popupContent = `
          <div class="cursor-pointer" onclick="window.dispatchEvent(new CustomEvent('dev-click', { detail: '${dev.id}' }))">
            <div class="w-full h-32 relative">
              <img src="${dev.imageUrl}" class="w-full h-full object-cover rounded-t-lg" />
              <div class="absolute bottom-0 w-full bg-gradient-to-t from-black/70 to-transparent p-2">
                 <p class="text-white font-bold text-sm">${dev.currency} ${dev.priceFrom.toLocaleString()}</p>
              </div>
            </div>
            <div class="p-3 bg-white rounded-b-lg shadow-sm">
              <h3 class="font-bold text-gray-800 text-sm mb-1 truncate">${dev.title}</h3>
              <p class="text-gray-500 text-xs">${dev.deliveryDate}</p>
            </div>
          </div>
        `;

        const marker = L.marker([dev.coordinates.lat, dev.coordinates.lng])
          .bindPopup(popupContent, {
            maxWidth: 240,
            className: 'custom-popup'
          });
        
        marker.addTo(markers);
      });

      if (developments.length > 0) {
        markers.addTo(map);
        map.fitBounds(markers.getBounds(), { padding: [50, 50] });
      }

      mapRef.current = map;
    }

    const handlePopupClick = (e: any) => {
      const devId = e.detail;
      const dev = developments.find(d => d.id === devId);
      if (dev) onDevelopmentClick(dev);
    };
    
    window.addEventListener('dev-click', handlePopupClick);

    return () => {
      window.removeEventListener('dev-click', handlePopupClick);
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [viewMode, developments, onDevelopmentClick]);

  const hasActiveFilters = location || status || maxPrice;

  return (
    <div className="min-h-screen bg-gray-50 animate-fade-in flex flex-col">
      {/* Page Header */}
      <div className="bg-gray-900 text-white py-8 md:py-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900 to-blue-900 opacity-90"></div>
        <div className="absolute inset-0" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cubes.png")', opacity: 0.1 }}></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex items-center gap-3 mb-2">
             <HardHat className="w-8 h-8 text-yellow-400" />
             <h1 className="text-2xl md:text-4xl font-bold">Emprendimientos</h1>
          </div>
          <p className="text-gray-300 text-sm md:text-lg max-w-2xl">
            Descubrí los mejores proyectos en pozo, construcción y a estrenar. Inversiones con futuro.
          </p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="container mx-auto px-4 -mt-6 md:-mt-8 mb-8 z-20 relative">
        <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 border border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            
            <div className="w-full">
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Ubicación</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input 
                  type="text" 
                  placeholder="Barrio o Ciudad" 
                  className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-900 focus:outline-none text-sm"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
            </div>

            <div className="w-full">
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Estado de Obra</label>
              <select 
                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-900 focus:outline-none text-sm text-gray-700"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="">Todos</option>
                <option value="Pre-sale">En Pozo / Preventa</option>
                <option value="In Construction">En Construcción</option>
                <option value="Ready">Terminado / A Estrenar</option>
              </select>
            </div>

            <div className="w-full">
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Precio Desde (USD)</label>
              <input 
                type="number" 
                placeholder="Ej: 100000" 
                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-900 focus:outline-none text-sm"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
              />
            </div>

            <div className="flex gap-2">
              <button 
                onClick={handleFilter}
                className="flex-1 bg-blue-900 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-lg transition-colors flex items-center justify-center text-sm shadow-md"
              >
                <Filter className="w-4 h-4 mr-2" />
                Filtrar
              </button>
              
              {hasActiveFilters && (
                <button 
                  onClick={clearFilters}
                  className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-lg transition-colors"
                  title="Limpiar filtros"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="container mx-auto px-4 flex-grow flex flex-col">
        {/* Toggle View & Count */}
        <div className="mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <h2 className="text-xl font-bold text-gray-800">
            {developments.length} {developments.length === 1 ? 'Proyecto encontrado' : 'Proyectos encontrados'}
          </h2>
          
          <div className="flex bg-white p-1 rounded-lg border border-gray-200 shadow-sm">
            <button 
              onClick={() => setViewMode('list')}
              className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-all ${viewMode === 'list' ? 'bg-blue-900 text-white shadow-sm' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              <ListIcon className="w-4 h-4 mr-2" />
              Lista
            </button>
            <button 
              onClick={() => setViewMode('map')}
              className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-all ${viewMode === 'map' ? 'bg-blue-900 text-white shadow-sm' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              <MapIcon className="w-4 h-4 mr-2" />
              Mapa
            </button>
          </div>
        </div>

        {/* View Content */}
        <div className="flex-grow relative min-h-[500px]">
          {viewMode === 'list' ? (
            developments.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-16">
                {developments.map(dev => (
                  <DevelopmentCard 
                    key={dev.id} 
                    development={dev} 
                    onClick={onDevelopmentClick} 
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white rounded-xl border border-gray-100 shadow-sm">
                <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Sin resultados</h3>
                <p className="text-gray-500">No encontramos proyectos con esos filtros.</p>
                <button onClick={clearFilters} className="mt-4 text-blue-900 font-bold hover:underline">
                  Limpiar filtros
                </button>
              </div>
            )
          ) : (
            <div className="w-full h-[600px] rounded-xl overflow-hidden shadow-lg border border-gray-200 relative">
               <div ref={mapContainerRef} className="w-full h-full z-10" />
               {developments.length === 0 && (
                 <div className="absolute inset-0 z-20 bg-white/80 flex items-center justify-center">
                    <div className="text-center">
                      <Search className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-600 font-medium">No hay proyectos para mostrar en el mapa</p>
                    </div>
                 </div>
               )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};