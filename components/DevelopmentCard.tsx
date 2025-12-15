import React from 'react';
import { Development, Property } from '../types';
import { Calendar, Layers, MapPin, ArrowRight } from 'lucide-react';

interface DevelopmentCardProps {
  development: Development;
  onClick: (development: Development) => void;
}

export const DevelopmentCard: React.FC<DevelopmentCardProps> = ({ development, onClick }) => {
  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Pre-sale': return 'bg-purple-600';
      case 'In Construction': return 'bg-orange-500';
      case 'Ready': return 'bg-green-600';
      default: return 'bg-blue-900';
    }
  };

  const getStatusText = (status: string) => {
    switch(status) {
      case 'Pre-sale': return 'En Pozo / Preventa';
      case 'In Construction': return 'En Construcción';
      case 'Ready': return 'Terminado';
      default: return status;
    }
  };

  return (
    <div 
      className="group bg-white rounded-lg shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 cursor-pointer flex flex-col h-full"
      onClick={() => onClick(development)}
    >
      {/* Image Container */}
      <div className="relative h-64 overflow-hidden">
        <img 
          src={development.imageUrl} 
          alt={development.title} 
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
        />
        
        <div className={`absolute top-3 left-3 text-white text-xs font-bold px-3 py-1.5 rounded uppercase tracking-wide shadow-sm ${getStatusColor(development.status)}`}>
          {getStatusText(development.status)}
        </div>

        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
          <p className="text-gray-300 text-xs uppercase font-bold mb-1">Precio desde</p>
          <p className="text-white font-bold text-2xl">
            {development.currency} {development.priceFrom.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-grow flex flex-col">
        <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-1 group-hover:text-blue-700 transition-colors">
          {development.title}
        </h3>
        
        <div className="flex items-start mb-4 text-gray-600 text-sm">
            <MapPin className="w-4 h-4 mr-1 mt-0.5 flex-shrink-0" />
            <span className="line-clamp-1">{development.location}</span>
        </div>

        {/* Development specific details */}
        <div className="space-y-3 mb-6">
            <div className="flex items-center text-sm text-gray-700 bg-gray-50 p-2 rounded">
                <Calendar className="w-4 h-4 mr-2 text-blue-900" />
                <span className="font-semibold mr-1">Entrega:</span> {development.deliveryDate}
            </div>
            <div className="flex items-center text-sm text-gray-700 bg-gray-50 p-2 rounded">
                <Layers className="w-4 h-4 mr-2 text-blue-900" />
                <span className="font-semibold mr-1">Unidades disp:</span> {development.unitsAvailable}
            </div>
        </div>

        {/* CTA */}
        <div className="mt-auto pt-4 border-t border-gray-100 flex justify-between items-center text-blue-900 font-bold text-sm">
            <span>Ver Proyecto</span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
      
      {/* Footer bar */}
      <div className="h-1 w-full bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600"></div>
    </div>
  );
};