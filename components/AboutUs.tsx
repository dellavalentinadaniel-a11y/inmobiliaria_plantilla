import React from 'react';
import { Building2, Users, Target, Award } from 'lucide-react';

export const AboutUs: React.FC = () => {
  return (
    <div className="min-h-screen bg-white animate-fade-in py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-blue-900 font-bold tracking-wider uppercase text-sm mb-4 block">Quiénes Somos</span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">InmoFuture: Innovación Inmobiliaria</h1>
          <p className="text-gray-600 text-lg">
            Combinamos años de experiencia en el mercado con lo último en tecnología para que encontrar tu próximo hogar sea una experiencia simple, transparente y efectiva.
          </p>
        </div>

        {/* Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {[
            { icon: Building2, title: 'Experiencia', body: 'Más de 15 años liderando el sector inmobiliario en Buenos Aires.' },
            { icon: Target, title: 'Transparencia', body: 'Creemos que las mejores decisiones se toman con información clara.' },
            { icon: Users, title: 'Enfoque Humano', body: 'No solo vendemos propiedades, acompañamos personas en sus proyectos de vida.' }
          ].map((item: any, idx: number) => (
            <div key={idx} className="p-8 bg-gray-50 rounded-xl hover:shadow-lg transition-shadow">
              <item.icon className="w-12 h-12 text-blue-900 mb-6" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
              <p className="text-gray-600">{item.body}</p>
            </div>
          ))}
        </div>

        {/* Mission */}
        <div className="bg-gray-900 text-white rounded-2xl p-12 flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
                <h2 className="text-3xl font-bold mb-6">Nuestra Misión</h2>
                <p className="text-gray-300 text-lg mb-6 leading-relaxed">
                    Transformar la forma en que las personas interactúan con el mercado inmobiliario utilizando herramientas digitales modernas y un asesoramiento empático y personalizado.
                </p>
                <div className="flex items-center gap-3 text-yellow-400 font-bold">
                    <Award className="w-6 h-6" />
                    +500 familias confiaron en nosotros
                </div>
            </div>
            <div className="md:w-1/2">
                <img src="https://picsum.photos/600/400?random=100" alt="Team" className="rounded-xl shadow-2xl" />
            </div>
        </div>
      </div>
    </div>
  );
};
