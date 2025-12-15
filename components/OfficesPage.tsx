import React from 'react';
import { MOCK_OFFICES } from '../services/mockData';
import { MapPin, Phone, Mail, Clock, ArrowRight } from 'lucide-react';

export const OfficesPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 animate-fade-in">
      {/* Header */}
      <div className="bg-gray-900 text-white py-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-900/20"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">Nuestras Oficinas</h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Estamos cerca tuyo. Encontrá la oficina más cercana y vení a conocer a nuestro equipo.
          </p>
        </div>
      </div>

      {/* Offices List */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {MOCK_OFFICES.map(office => (
            <div key={office.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col md:flex-row hover:shadow-lg transition-shadow duration-300">
              <div className="md:w-2/5 h-48 md:h-auto relative">
                <img 
                  src={office.imageUrl} 
                  alt={office.name} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-0 left-0 bg-blue-900 text-white text-xs font-bold px-3 py-1 rounded-br-lg">
                  {office.location.split(',')[0]}
                </div>
              </div>
              
              <div className="p-6 md:w-3/5 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{office.name}</h3>
                  
                  <div className="space-y-3 mt-4">
                    <div className="flex items-start text-gray-600 text-sm">
                      <MapPin className="w-5 h-5 mr-3 text-blue-900 flex-shrink-0" />
                      <span>{office.address}</span>
                    </div>
                    <div className="flex items-center text-gray-600 text-sm">
                      <Phone className="w-5 h-5 mr-3 text-blue-900 flex-shrink-0" />
                      <span>{office.phone}</span>
                    </div>
                    <div className="flex items-center text-gray-600 text-sm">
                      <Mail className="w-5 h-5 mr-3 text-blue-900 flex-shrink-0" />
                      <span>{office.email}</span>
                    </div>
                     <div className="flex items-center text-gray-600 text-sm">
                      <Clock className="w-5 h-5 mr-3 text-blue-900 flex-shrink-0" />
                      <span>Lun - Vie: 9:00 - 18:00 hs</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-100 flex justify-end">
                  <button className="text-blue-900 font-bold text-sm flex items-center hover:underline">
                    Ver en mapa <ArrowRight className="w-4 h-4 ml-1" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Map Placeholder */}
      <div className="bg-gray-200 h-96 w-full relative flex items-center justify-center text-gray-500">
          <div className="text-center p-4">
            <MapPin className="w-12 h-12 mx-auto mb-2 text-gray-400" />
            <p className="font-medium">Mapa de sucursales</p>
            <p className="text-sm">Visualización global próximamente</p>
          </div>
      </div>
    </div>
  );
};