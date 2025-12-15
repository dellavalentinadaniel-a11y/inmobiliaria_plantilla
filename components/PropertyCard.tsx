import React, { useState, useEffect } from 'react';
import { Property } from '../types';
import { Bed, Bath, Move, Heart } from 'lucide-react';

interface PropertyCardProps {
  property: Property;
  onClick: (property: Property) => void;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ property, onClick }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    // Check localStorage for favorite status on mount
    try {
      const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
      if (Array.isArray(favorites)) {
        setIsFavorite(favorites.includes(property.id));
      }
    } catch (e) {
      console.error('Error parsing favorites from localStorage', e);
    }
  }, [property.id]);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering the card's onClick
    
    try {
      const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
      let newFavorites: string[] = Array.isArray(favorites) ? favorites : [];

      if (newFavorites.includes(property.id)) {
        newFavorites = newFavorites.filter(id => id !== property.id);
        setIsFavorite(false);
      } else {
        newFavorites.push(property.id);
        setIsFavorite(true);
      }

      localStorage.setItem('favorites', JSON.stringify(newFavorites));
    } catch (e) {
      console.error('Error updating favorites in localStorage', e);
    }
  };

  return (
    <div 
      className="group bg-white rounded-lg shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 cursor-pointer flex flex-col h-full"
      onClick={() => onClick(property)}
    >
      {/* Image Container */}
      <div className="relative h-64 overflow-hidden">
        <img 
          src={property.imageUrl} 
          alt={property.title} 
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3 bg-blue-900 text-white text-xs font-bold px-2 py-1 rounded uppercase tracking-wide">
          {property.operation === 'Sale' ? 'Venta' : 'Alquiler'}
        </div>
        
        {/* Favorite Button */}
        <button 
          onClick={toggleFavorite}
          className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-200 shadow-sm z-10 ${
            isFavorite 
              ? 'bg-white text-red-600 transform scale-110' 
              : 'bg-white/80 text-gray-500 hover:bg-white hover:text-red-500'
          }`}
          title={isFavorite ? "Quitar de favoritos" : "Agregar a favoritos"}
        >
          <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
        </button>

        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <p className="text-white font-bold text-2xl">
            {property.currency} {property.price.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-grow flex flex-col">
        <h3 className="text-lg font-bold text-gray-800 mb-1 line-clamp-1 group-hover:text-blue-700 transition-colors">
          {property.title}
        </h3>
        <p className="text-gray-500 text-sm mb-4">{property.location}</p>

        {/* Features Grid */}
        <div className="grid grid-cols-3 gap-2 py-4 border-t border-b border-gray-100 mb-4">
          <div className="flex flex-col items-center justify-center text-gray-600">
            <Bed className="w-5 h-5 mb-1 text-blue-900" />
            <span className="text-sm font-medium">{property.beds} <span className="text-xs font-normal">Dorm.</span></span>
          </div>
          <div className="flex flex-col items-center justify-center text-gray-600 border-l border-r border-gray-100">
            <Bath className="w-5 h-5 mb-1 text-blue-900" />
            <span className="text-sm font-medium">{property.baths} <span className="text-xs font-normal">Baños</span></span>
          </div>
          <div className="flex flex-col items-center justify-center text-gray-600">
            <Move className="w-5 h-5 mb-1 text-blue-900" />
            <span className="text-sm font-medium">{property.sqft} <span className="text-xs font-normal">m²</span></span>
          </div>
        </div>

        {/* Agent Info */}
        <div className="flex items-center mt-auto">
          <img 
            src={property.agent.photo} 
            alt={property.agent.name} 
            className="w-10 h-10 rounded-full border-2 border-white shadow-sm mr-3"
          />
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wider">Agente</p>
            <p className="text-sm font-semibold text-gray-800">{property.agent.name}</p>
          </div>
        </div>
      </div>
      
      {/* Footer bar for Remax style */}
      <div className="h-1 w-full bg-gradient-to-r from-blue-900 via-red-600 to-blue-900"></div>
    </div>
  );
};
