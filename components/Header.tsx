import React, { useState } from 'react';
import { Menu, X, User, Heart, Search } from 'lucide-react';

interface HeaderProps {
  onNavigateHome: () => void;
  onNavigateLogin: () => void;
  onNavigateBuy: () => void;
  onNavigateRent: () => void;
  onNavigateAbout: () => void;
  onNavigateAgents: () => void;
  onNavigateBlog: () => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  onNavigateHome, 
  onNavigateLogin, 
  onNavigateBuy, 
  onNavigateRent, 
  onNavigateAbout,
  onNavigateAgents,
  onNavigateBlog
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm font-sans">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center cursor-pointer" onClick={onNavigateHome}>
            <div className="text-3xl font-extrabold tracking-tighter text-blue-900 flex items-center">
              <span className="text-red-600 mr-1">///</span>
              InmoFuture
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-6 items-center text-gray-600 font-medium text-xs lg:text-sm">
            <a 
              href="#" 
              onClick={(e) => { e.preventDefault(); onNavigateBuy(); }} 
              className="hover:text-blue-700 transition-colors"
            >
              COMPRAR
            </a>
            <a 
              href="#" 
              onClick={(e) => { e.preventDefault(); onNavigateRent(); }} 
              className="hover:text-blue-700 transition-colors"
            >
              ALQUILAR
            </a>
            <a 
              href="#" 
              onClick={(e) => { e.preventDefault(); onNavigateAbout(); }} 
              className="hover:text-blue-700 transition-colors"
            >
              NOSOTROS
            </a>
            <a 
              href="#" 
              onClick={(e) => { e.preventDefault(); onNavigateAgents(); }}
              className="hover:text-blue-700 transition-colors"
            >
              AGENTES
            </a>
            <a 
              href="#" 
              onClick={(e) => { e.preventDefault(); onNavigateBlog(); }}
              className="hover:text-blue-700 transition-colors"
            >
              BLOG
            </a>
          </nav>

          {/* Right Icons */}
          <div className="hidden md:flex items-center space-x-6">
            <button className="flex items-center text-gray-600 hover:text-blue-700">
              <Heart className="w-5 h-5 mr-1" />
              <span className="text-sm">Favoritos</span>
            </button>
            <button 
              onClick={onNavigateLogin}
              className="flex items-center text-gray-600 hover:text-blue-700"
            >
              <User className="w-5 h-5 mr-1" />
              <span className="text-sm">Ingresar</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-700 focus:outline-none">
              {isMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 py-4 px-4 shadow-lg absolute w-full">
          <nav className="flex flex-col space-y-4 text-gray-700 font-medium">
            <a 
              href="#" 
              onClick={() => { onNavigateBuy(); setIsMenuOpen(false); }} 
              className="block hover:text-blue-700"
            >
              Comprar
            </a>
            <a 
              href="#" 
              onClick={() => { onNavigateRent(); setIsMenuOpen(false); }} 
              className="block hover:text-blue-700"
            >
              Alquilar
            </a>
            <a 
               href="#" 
               onClick={() => { onNavigateAbout(); setIsMenuOpen(false); }} 
               className="block hover:text-blue-700"
            >
               Nosotros
            </a>
            <a 
               href="#" 
               onClick={() => { onNavigateAgents(); setIsMenuOpen(false); }} 
               className="block hover:text-blue-700"
            >
               Agentes
            </a>
             <a 
               href="#" 
               onClick={() => { onNavigateBlog(); setIsMenuOpen(false); }} 
               className="block hover:text-blue-700"
            >
               Blog
            </a>
            <hr className="border-gray-200" />
            <a href="#" className="flex items-center hover:text-blue-700"><Heart className="w-4 h-4 mr-2"/> Favoritos</a>
            <a 
              href="#" 
              onClick={() => { onNavigateLogin(); setIsMenuOpen(false); }}
              className="flex items-center hover:text-blue-700"
            >
              <User className="w-4 h-4 mr-2"/> Ingresar
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};