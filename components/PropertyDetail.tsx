import React, { useState } from 'react';
import { Property } from '../types';
import { ArrowLeft, MapPin, Bed, Bath, Move, Share2, Printer, CheckCircle, Phone, MessageCircle, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

interface PropertyDetailProps {
  property: Property;
  onBack: () => void;
}

export const PropertyDetail: React.FC<PropertyDetailProps> = ({ property, onBack }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Use property.images if available, otherwise fallback to imageUrl inside an array
  const galleryImages = property.images && property.images.length > 0 
    ? property.images 
    : [property.imageUrl];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1));
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1));
  };

  const selectImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  return (
    <div className="animate-fade-in pb-20">
      {/* Breadcrumb / Back */}
      <div className="bg-gray-100 py-4">
        <div className="container mx-auto px-4">
          <button onClick={onBack} className="flex items-center text-gray-600 hover:text-blue-900 font-medium transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver a la búsqueda
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 mt-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Left Column: Images & Details */}
          <div className="lg:w-2/3">
            
            {/* Gallery Component */}
            <div className="mb-8 select-none">
              {/* Main Image Stage */}
              <div className="relative rounded-xl overflow-hidden shadow-lg h-[400px] md:h-[500px] bg-gray-200 group">
                <img 
                  src={galleryImages[currentImageIndex]} 
                  alt={`${property.title} - View ${currentImageIndex + 1}`} 
                  className="w-full h-full object-cover transition-opacity duration-300"
                />
                
                <div className="absolute top-4 left-4 bg-red-600 text-white font-bold py-1 px-3 rounded text-sm uppercase z-10">
                  {property.operation === 'Sale' ? 'En Venta' : 'En Alquiler'}
                </div>

                {/* Navigation Arrows */}
                {galleryImages.length > 1 && (
                  <>
                    <button 
                      onClick={(e) => { e.stopPropagation(); prevImage(); }}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 transform hover:scale-110"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    
                    <button 
                      onClick={(e) => { e.stopPropagation(); nextImage(); }}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 transform hover:scale-110"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  </>
                )}

                {/* Image Counter */}
                <div className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm">
                  {currentImageIndex + 1} / {galleryImages.length}
                </div>
              </div>

              {/* Thumbnails */}
              {galleryImages.length > 1 && (
                <div className="flex gap-3 mt-4 overflow-x-auto pb-2 scrollbar-hide">
                  {galleryImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => selectImage(idx)}
                      className={`relative flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                        currentImageIndex === idx 
                          ? 'border-blue-900 ring-2 ring-blue-900/30' 
                          : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="mb-6">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{property.title}</h1>
              <div className="flex items-center text-gray-600 text-lg">
                <MapPin className="w-5 h-5 mr-2 text-red-600" />
                {property.location}
              </div>
            </div>

            <div className="flex flex-wrap gap-6 py-6 border-t border-b border-gray-200 mb-8">
              <div className="flex items-center text-gray-700">
                <Bed className="w-6 h-6 mr-2 text-blue-900" />
                <span className="font-semibold text-xl">{property.beds}</span>
                <span className="ml-1 text-gray-500">Dormitorios</span>
              </div>
              <div className="flex items-center text-gray-700">
                <Bath className="w-6 h-6 mr-2 text-blue-900" />
                <span className="font-semibold text-xl">{property.baths}</span>
                <span className="ml-1 text-gray-500">Baños</span>
              </div>
              <div className="flex items-center text-gray-700">
                <Move className="w-6 h-6 mr-2 text-blue-900" />
                <span className="font-semibold text-xl">{property.sqft}</span>
                <span className="ml-1 text-gray-500">m² Totales</span>
              </div>
            </div>

            <div className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Descripción</h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line text-lg">
                {property.description}
                <br /><br />
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>

            <div className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Características</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {property.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center text-gray-700 bg-gray-50 p-3 rounded-lg">
                    <CheckCircle className="w-5 h-5 mr-2 text-green-500" />
                    {feature}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Price & Agent */}
          <div className="lg:w-1/3">
            <div className="sticky top-24 space-y-6">
              {/* Price Card */}
              <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                <div className="mb-4">
                  <span className="text-gray-500 text-sm uppercase tracking-wide font-semibold">Precio de lista</span>
                  <div className="text-4xl font-bold text-blue-900 mt-1">
                    {property.currency} {property.price.toLocaleString()}
                  </div>
                </div>
                <div className="flex gap-3 mb-4">
                  <button className="flex-1 border border-gray-300 rounded-lg py-2 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors">
                    <Share2 className="w-4 h-4 mr-2" /> Compartir
                  </button>
                  <button className="flex-1 border border-gray-300 rounded-lg py-2 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors">
                    <Printer className="w-4 h-4 mr-2" /> Imprimir
                  </button>
                </div>
              </div>

              {/* Agent Card */}
              <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 overflow-hidden relative">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-900 to-red-600"></div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">Contactar al Agente</h3>
                <div className="flex items-center mb-6">
                  <img src={property.agent.photo} alt={property.agent.name} className="w-16 h-16 rounded-full border-2 border-gray-200 mr-4" />
                  <div>
                    <h4 className="font-bold text-lg text-gray-800">{property.agent.name}</h4>
                    <p className="text-sm text-gray-500">Agente Inmobiliario</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <button className="w-full bg-blue-900 hover:bg-blue-800 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center transition-colors">
                    <Phone className="w-5 h-5 mr-2" />
                    {property.agent.phone}
                  </button>
                  <button className="w-full bg-green-600 hover:bg-green-500 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center transition-colors">
                    <MessageCircle className="w-5 h-5 mr-2" />
                    WhatsApp
                  </button>
                  <button className="w-full border-2 border-blue-900 text-blue-900 font-bold py-3 px-4 rounded-lg flex items-center justify-center hover:bg-blue-50 transition-colors">
                    Enviar Mensaje
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};