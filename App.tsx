import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { PropertyCard } from './components/PropertyCard';
import { PropertyDetail } from './components/PropertyDetail';
import { ChatWidget } from './components/ChatWidget';
import { Login } from './components/Login';
import { AgentDashboard } from './components/AgentDashboard';
import { BuyPage } from './components/BuyPage';
import { RentPage } from './components/RentPage';
import { AboutUs } from './components/AboutUs';
import { AgentsPage } from './components/AgentsPage';
import { BlogPage } from './components/BlogPage';
import { MOCK_PROPERTIES } from './services/mockData';
import { getProperties } from './services/dataService';
import { Property, FilterState, Development } from './types';
import { MapPin, ArrowRight, Instagram, Facebook, Twitter, Linkedin } from 'lucide-react';
import { initFirebase, auth } from './services/firebase';
import { onAuthStateChanged } from 'firebase/auth';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<'home' | 'property' | 'login' | 'buy' | 'rent' | 'about' | 'agents' | 'blog' | 'agent-dashboard'>('home');
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [allProperties, setAllProperties] = useState<Property[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    initFirebase();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
      if (!user) {
        // If user logged out forcefully, return to home
        setCurrentView('home'); 
      }
    });

    const fetchInitialData = async () => {
      try {
        const props = await getProperties();
        setAllProperties(props);
        setFilteredProperties(props);
      } finally {
        setLoading(false);
      }
    };
    fetchInitialData();
    
    return () => unsubscribe();
  }, []);

  const handlePropertyClick = (property: Property) => {
    setSelectedProperty(property);
    setCurrentView('property');
    window.scrollTo(0, 0);
  };

  const handleDevelopmentClick = (dev: Development) => {
    // Adapter to convert Development to Property for the Detail View
    const adaptedProperty: Property = {
      id: dev.id,
      title: dev.title,
      price: dev.priceFrom,
      currency: dev.currency,
      type: 'Apartment', 
      operation: 'Sale', 
      location: dev.location,
      coordinates: dev.coordinates,
      beds: 0,
      baths: 0,
      sqft: 0,
      imageUrl: dev.imageUrl,
      images: dev.images,
      description: dev.description + `\n\nEntrega estimada: ${dev.deliveryDate}\nUnidades disponibles: ${dev.unitsAvailable}`,
      features: dev.features,
      agent: {
        name: 'InmoFuture Proyectos',
        photo: 'https://picsum.photos/100/100?random=99',
        phone: '+54 11 9999 8888'
      }
    };
    
    setSelectedProperty(adaptedProperty);
    setCurrentView('property');
    window.scrollTo(0, 0);
  }

  const handleBackToHome = () => {
    setSelectedProperty(null);
    setCurrentView('home');
  };
  
  const handleNavigateLogin = () => {
    setCurrentView('login');
    window.scrollTo(0, 0);
  };

  const handleNavigateBuy = () => {
    setCurrentView('buy');
    window.scrollTo(0, 0);
  };

  const handleNavigateRent = () => {
    setCurrentView('rent');
    window.scrollTo(0, 0);
  };

  const handleNavigateAbout = () => {
    setCurrentView('about');
    window.scrollTo(0, 0);
  };

  const handleNavigateAgents = () => {
    setCurrentView('agents');
    window.scrollTo(0, 0);
  };

  const handleNavigateBlog = () => {
    setCurrentView('blog');
    window.scrollTo(0, 0);
  };

  const handleLoginSuccess = () => {
    setCurrentView('agent-dashboard');
    window.scrollTo(0, 0);
  };

  const handleSearch = (filters: Partial<FilterState>) => {
    let result = allProperties;

    if (filters.operation) {
      result = result.filter(p => p.operation === filters.operation);
    }
    
    if (filters.location && filters.location.trim() !== '') {
      const loc = filters.location.toLowerCase();
      result = result.filter(p => p.location.toLowerCase().includes(loc) || p.title.toLowerCase().includes(loc));
    }

    setFilteredProperties(result);
    setCurrentView('home');
    
    // Scroll to listings if searching
    const listingsElement = document.getElementById('listings');
    if (listingsElement) {
      listingsElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const resetFilters = () => {
    setFilteredProperties(allProperties);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Header 
        onNavigateHome={handleBackToHome} 
        onNavigateLogin={handleNavigateLogin} 
        onNavigateBuy={handleNavigateBuy}
        onNavigateRent={handleNavigateRent}
        onNavigateAbout={handleNavigateAbout}
        onNavigateAgents={handleNavigateAgents}
        onNavigateBlog={handleNavigateBlog}
      />

      <main className="flex-grow">
        {currentView === 'home' && (
          <>
            <Hero onSearch={handleSearch} />
            
            {/* Featured Section */}
            <div id="listings" className="container mx-auto px-4 py-16">
              <div className="flex flex-col md:flex-row justify-between items-end mb-10">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">Propiedades Destacadas</h2>
                  <p className="text-gray-500 text-lg">Las mejores oportunidades del mercado seleccionadas para vos.</p>
                </div>
                <div className="flex gap-4 mt-4 md:mt-0">
                  <button 
                    onClick={handleNavigateRent}
                    className="hidden md:flex items-center text-gray-600 font-bold hover:text-blue-900 transition-colors"
                  >
                    Ver Alquileres <ArrowRight className="w-5 h-5 ml-2" />
                  </button>
                  <button 
                    onClick={handleNavigateBuy}
                    className="hidden md:flex items-center text-blue-900 font-bold hover:text-blue-700 transition-colors"
                  >
                    Ver Ventas <ArrowRight className="w-5 h-5 ml-2" />
                  </button>
                </div>
              </div>

              {filteredProperties.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredProperties.map(property => (
                    <PropertyCard 
                      key={property.id} 
                      property={property} 
                      onClick={handlePropertyClick} 
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 bg-white rounded-xl shadow-sm border border-gray-100">
                  <MapPin className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">No encontramos propiedades</h3>
                  <p className="text-gray-500">Intenta ajustar tu búsqueda con otros términos.</p>
                  <button onClick={resetFilters} className="mt-4 text-blue-900 font-bold hover:underline">
                    Ver todo el catálogo
                  </button>
                </div>
              )}

              <div className="mt-12 text-center md:hidden flex flex-col gap-4">
                 <button 
                  onClick={handleNavigateBuy}
                  className="inline-flex justify-center items-center text-blue-900 font-bold hover:text-blue-700 transition-colors"
                >
                  Ver Ventas <ArrowRight className="w-5 h-5 ml-2" />
                </button>
                <button 
                  onClick={handleNavigateRent}
                  className="inline-flex justify-center items-center text-gray-600 font-bold hover:text-blue-900 transition-colors"
                >
                  Ver Alquileres <ArrowRight className="w-5 h-5 ml-2" />
                </button>
              </div>
            </div>

            {/* Banner Section */}
            <div className="bg-blue-900 py-16 text-white">
              <div className="container mx-auto px-4 text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">¿Querés vender tu propiedad?</h2>
                <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                  Confía en la red inmobiliaria número 1 del mundo. Tasamos tu propiedad con el mejor valor de mercado.
                </p>
                <button className="bg-white text-blue-900 font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors shadow-lg">
                  Contactar un Agente
                </button>
              </div>
            </div>
          </>
        )}

        {currentView === 'property' && selectedProperty && (
          <PropertyDetail 
            property={selectedProperty} 
            onBack={handleBackToHome} 
          />
        )}

        {currentView === 'login' && (
          <Login onLoginSuccess={handleLoginSuccess} />
        )}

        {currentView === 'agent-dashboard' && (
          <AgentDashboard />
        )}

        {currentView === 'buy' && (
          <BuyPage onPropertyClick={handlePropertyClick} />
        )}

        {currentView === 'rent' && (
          <RentPage onPropertyClick={handlePropertyClick} />
        )}

        {currentView === 'about' && (
          <AboutUs />
        )}

        {currentView === 'agents' && (
          <AgentsPage />
        )}

        {currentView === 'blog' && (
          <BlogPage />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white pt-16 pb-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="text-2xl font-extrabold tracking-tighter text-white mb-6 flex items-center">
                <span className="text-red-600 mr-1">///</span>
                InmoFuture
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Somos parte de la red inmobiliaria más grande del país. Comprometidos con brindarte el mejor servicio para encontrar tu lugar en el mundo.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold text-lg mb-6">Propiedades</h4>
              <ul className="space-y-3 text-gray-400 text-sm">
                <li><a href="#" onClick={(e) => { e.preventDefault(); handleNavigateBuy(); }} className="hover:text-white transition-colors">Casas en Venta</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); handleNavigateRent(); }} className="hover:text-white transition-colors">Departamentos en Alquiler</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); handleNavigateAbout(); }} className="hover:text-white transition-colors">Nosotros</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); handleNavigateAgents(); }} className="hover:text-white transition-colors">Agentes Destacados</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-6">La Empresa</h4>
              <ul className="space-y-3 text-gray-400 text-sm">
                <li><a href="#" onClick={(e) => { e.preventDefault(); handleNavigateAbout(); }} className="hover:text-white transition-colors">Sobre Nosotros</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); handleNavigateBlog(); }} className="hover:text-white transition-colors">Novedades</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Trabajá con nosotros</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-6">Seguinos</h4>
              <div className="flex space-x-4">
                <a href="#" className="bg-gray-800 p-2 rounded-full hover:bg-blue-600 transition-colors"><Facebook className="w-5 h-5"/></a>
                <a href="#" className="bg-gray-800 p-2 rounded-full hover:bg-pink-600 transition-colors"><Instagram className="w-5 h-5"/></a>
                <a href="#" className="bg-gray-800 p-2 rounded-full hover:bg-blue-400 transition-colors"><Twitter className="w-5 h-5"/></a>
                <a href="#" className="bg-gray-800 p-2 rounded-full hover:bg-blue-700 transition-colors"><Linkedin className="w-5 h-5"/></a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
            <p>&copy; 2024 InmoFuture Argentina. Todos los derechos reservados.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-white">Términos y Condiciones</a>
              <a href="#" className="hover:text-white">Política de Privacidad</a>
            </div>
          </div>
        </div>
      </footer>

      <ChatWidget />
    </div>
  );
};

export default App;