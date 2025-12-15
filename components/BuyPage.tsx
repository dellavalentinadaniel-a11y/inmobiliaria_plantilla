import React, { useState, useEffect, useRef } from 'react';
import { PropertyCard } from './PropertyCard';
import { MOCK_PROPERTIES } from '../services/mockData';
import { Property } from '../types';
import { Search, MapPin, Filter, X, ChevronDown, ChevronUp, Bed, Bath, Move, Map as MapIcon, List as ListIcon } from 'lucide-react';
import ReactDOMServer from 'react-dom/server';

interface BuyPageProps {
  onPropertyClick: (property: Property) => void;
}

export const BuyPage: React.FC<BuyPageProps> = ({ onPropertyClick }) => {
  // Initialize with all Sale properties
  const [properties, setProperties] = useState<Property[]>(
    MOCK_PROPERTIES.filter(p => p.operation === 'Sale')
  );

  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const mapRef = useRef<any>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  // Filter states
  const [location, setLocation] = useState('');
  const [type, setType] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  
  // Advanced filters
  const [beds, setBeds] = useState('');
  const [baths, setBaths] = useState('');
  const [minSqft, setMinSqft] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleFilter = () => {
    let result = MOCK_PROPERTIES.filter(p => p.operation === 'Sale');

    // Basic Filters
    if (location.trim()) {
      const loc = location.toLowerCase();
      result = result.filter(p => 
        p.location.toLowerCase().includes(loc) || 
        p.title.toLowerCase().includes(loc)
      );
    }

    if (type) {
      result = result.filter(p => p.type === type);
    }

    if (maxPrice) {
      const price = parseInt(maxPrice);
      if (!isNaN(price)) {
        result = result.filter(p => p.price <= price);
      }
    }

    // Advanced Filters
    if (beds) {
      const minBeds = parseInt(beds);
      if (!isNaN(minBeds)) {
        result = result.filter(p => p.beds >= minBeds);
      }
    }

    if (baths) {
      const minBaths = parseInt(baths);
      if (!isNaN(minBaths)) {
        result = result.filter(p => p.baths >= minBaths);
      }
    }

    if (minSqft) {
      const sqft = parseInt(minSqft);
      if (!isNaN(sqft)) {
        result = result.filter(p => p.sqft >= sqft);
      }
    }

    setProperties(result);
  };

  const clearFilters = () => {
    setLocation('');
    setType('');
    setMaxPrice('');
    setBeds('');
    setBaths('');
    setMinSqft('');
    setProperties(MOCK_PROPERTIES.filter(p => p.operation === 'Sale'));
  };

  // Initialize Map
  useEffect(() => {
    if (viewMode === 'map' && mapContainerRef.current) {
      const L = (window as any).L;
      if (!L) return;

      // Clean up existing map
      if (mapRef.current) {
        mapRef.current.remove();
      }

      // Default to Buenos Aires
      const map = L.map(mapContainerRef.current).setView([-34.6037, -58.3816], 12);
      
      L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 20
      }).addTo(map);

      // Add markers
      const markers = L.featureGroup();
      
      properties.forEach((property) => {
        // Create custom popup content string
        // We use a simplified version of the card for the popup
        const popupContent = `
          <div class="cursor-pointer" onclick="window.dispatchEvent(new CustomEvent('property-click', { detail: '${property.id}' }))">
            <div class="w-full h-32 relative">
              <img src="${property.imageUrl}" class="w-full h-full object-cover rounded-t-lg" />
              <div class="absolute top-2 left-2 bg-blue-900 text-white text-[10px] font-bold px-1.5 py-0.5 rounded uppercase">
                ${property.operation === 'Sale' ? 'Venta' : 'Alquiler'}
              </div>
            </div>
            <div class="p-3 bg-white rounded-b-lg shadow-sm">
              <h3 class="font-bold text-gray-800 text-sm mb-1 truncate">${property.title}</h3>
              <p class="text-blue-900 font-bold text-base mb-1">${property.currency} ${property.price.toLocaleString()}</p>
              <div class="flex items-center text-gray-500 text-xs gap-2">
                <span class="flex items-center"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="mr-1"><path d="M2 4v16"/><path d="M2 8h18a2 2 0 0 1 2 2v10"/><path d="M2 17h20"/><path d="M6 8v9"/></svg> ${property.beds}</span>
                <span class="flex items-center"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="mr-1"><path d="M9 21h6"/><path d="M10 4h4"/><path d="M5 21V7a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v14"/><path d="M10 10h4v4h-4z"/></svg> ${property.baths}</span>
              </div>
            </div>
          </div>
        `;

        const marker = L.marker([property.coordinates.lat, property.coordinates.lng])
          .bindPopup(popupContent, {
            maxWidth: 280,
            className: 'custom-popup'
          });
        
        marker.addTo(markers);
      });

      markers.addTo(map);
      
      if (properties.length > 0) {
        map.fitBounds(markers.getBounds(), { padding: [50, 50] });
      }

      mapRef.current = map;
    }

    // Listener for custom event from popup
    const handlePopupClick = (e: any) => {
      const propId = e.detail;
      const prop = properties.find(p => p.id === propId);
      if (prop) onPropertyClick(prop);
    };
    
    window.addEventListener('property-click', handlePopupClick);

    return () => {
      window.removeEventListener('property-click', handlePopupClick);
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [viewMode, properties, onPropertyClick]);

  const hasActiveFilters = location || type || maxPrice || beds || baths || minSqft;

  return (
    <div className="min-h-screen bg-gray-50 animate-fade-in flex flex-col">
      {/* Page Header */}
      <div className="bg-blue-900 text-white py-8 md:py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl md:text-4xl font-bold mb-2 md:mb-4">Propiedades en Venta</h1>
          <p className="text-blue-200 text-sm md:text-lg max-w-2xl">
            Explorá nuestra selección exclusiva de casas, departamentos y terrenos.
          </p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="container mx-auto px-4 -mt-6 md:-mt-8 mb-8 z-20 relative">
        <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 border border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end mb-4">
            {/* Location */}
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

            {/* Type */}
            <div className="w-full">
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Tipo</label>
              <select 
                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-900 focus:outline-none text-sm text-gray-700"
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option value="">Todos</option>
                <option value="House">Casa</option>
                <option value="Apartment">Departamento</option>
                <option value="Condo">Oficina</option>
                <option value="Land">Terreno</option>
              </select>
            </div>

            {/* Price */}
            <div className="w-full">
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Precio Máximo (USD)</label>
              <input 
                type="number" 
                placeholder="Ej: 200000" 
                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-900 focus:outline-none text-sm"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
              />
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <button 
                onClick={handleFilter}
                className="flex-1 bg-blue-900 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-lg transition-colors flex items-center justify-center text-sm shadow-md"
              >
                <Filter className="w-4 h-4 mr-2" />
                Filtrar
              </button>
              
              <button 
                onClick={() => setShowAdvanced(!showAdvanced)}
                className={`px-3 py-2 rounded-lg border transition-colors flex items-center justify-center ${showAdvanced ? 'bg-blue-50 border-blue-200 text-blue-900' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                title="Filtros avanzados"
              >
                {showAdvanced ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
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

          {/* Advanced Filters Section */}
          {showAdvanced && (
            <div className="pt-4 mt-4 border-t border-gray-100 grid grid-cols-1 md:grid-cols-3 gap-4 animate-fade-in">
              <div className="w-full">
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1 flex items-center">
                  <Bed className="w-3 h-3 mr-1" /> Habitaciones (Mín)
                </label>
                <select 
                  className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-900 focus:outline-none text-sm text-gray-700"
                  value={beds}
                  onChange={(e) => setBeds(e.target.value)}
                >
                  <option value="">Cualquiera</option>
                  <option value="1">1+</option>
                  <option value="2">2+</option>
                  <option value="3">3+</option>
                  <option value="4">4+</option>
                </select>
              </div>

              <div className="w-full">
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1 flex items-center">
                  <Bath className="w-3 h-3 mr-1" /> Baños (Mín)
                </label>
                <select 
                  className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-900 focus:outline-none text-sm text-gray-700"
                  value={baths}
                  onChange={(e) => setBaths(e.target.value)}
                >
                  <option value="">Cualquiera</option>
                  <option value="1">1+</option>
                  <option value="2">2+</option>
                  <option value="3">3+</option>
                </select>
              </div>

              <div className="w-full">
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1 flex items-center">
                  <Move className="w-3 h-3 mr-1" /> Metros Cuadrados (Mín)
                </label>
                <input 
                  type="number" 
                  placeholder="Ej: 60" 
                  className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-900 focus:outline-none text-sm"
                  value={minSqft}
                  onChange={(e) => setMinSqft(e.target.value)}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Content Area */}
      <div className="container mx-auto px-4 flex-grow flex flex-col">
        {/* Toggle View & Count */}
        <div className="mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <h2 className="text-xl font-bold text-gray-800">
            {properties.length} {properties.length === 1 ? 'Propiedad encontrada' : 'Propiedades encontradas'}
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
            properties.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-16">
                {properties.map(property => (
                  <PropertyCard 
                    key={property.id} 
                    property={property} 
                    onClick={onPropertyClick} 
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white rounded-xl border border-gray-100 shadow-sm">
                <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Sin resultados</h3>
                <p className="text-gray-500">No encontramos propiedades con esos filtros.</p>
                <button onClick={clearFilters} className="mt-4 text-blue-900 font-bold hover:underline">
                  Limpiar filtros
                </button>
              </div>
            )
          ) : (
            <div className="w-full h-[600px] rounded-xl overflow-hidden shadow-lg border border-gray-200 relative">
               <div ref={mapContainerRef} className="w-full h-full z-10" />
               {properties.length === 0 && (
                 <div className="absolute inset-0 z-20 bg-white/80 flex items-center justify-center">
                    <div className="text-center">
                      <Search className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-600 font-medium">No hay propiedades para mostrar en el mapa</p>
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