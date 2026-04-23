import React, { useState, useEffect } from 'react';
import { getBlogPosts } from '../services/dataService';
import { BlogPost } from '../types';
import { Calendar, User, ArrowRight, Tag } from 'lucide-react';

export const BlogPage: React.FC = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getBlogPosts();
        setBlogPosts(data);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 animate-fade-in">
      {/* Hero Section */}
      <div className="bg-white border-b border-gray-200 py-16">
        <div className="container mx-auto px-4 text-center">
          <span className="text-blue-900 font-bold tracking-wider uppercase text-sm mb-2 block">InmoFuture Blog</span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6">Noticias y Consejos Inmobiliarios</h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Mantenete informado sobre las últimas tendencias del mercado, consejos de inversión y guías para tu hogar.
          </p>
        </div>
      </div>

      {/* Featured Post (First one) */}
      <div className="container mx-auto px-4 py-12">
        {blogPosts.length > 0 && (
          <div className="mb-16 relative rounded-2xl overflow-hidden shadow-xl group cursor-pointer">
            <div className="h-[400px] md:h-[500px] relative">
              <img 
                src={blogPosts[0].imageUrl} 
                alt={blogPosts[0].title} 
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
              
              <div className="absolute bottom-0 left-0 p-6 md:p-10 w-full md:w-2/3 text-white">
                <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase mb-4 inline-block">
                  {blogPosts[0].category}
                </span>
                <h2 className="text-2xl md:text-4xl font-bold mb-4 leading-tight group-hover:text-blue-200 transition-colors">
                  {blogPosts[0].title}
                </h2>
                <p className="text-gray-300 text-lg mb-6 line-clamp-2">
                  {blogPosts[0].excerpt}
                </p>
                <div className="flex items-center text-sm text-gray-400 gap-6">
                  <div className="flex items-center">
                    <User className="w-4 h-4 mr-2" />
                    {blogPosts[0].author}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    {blogPosts[0].date}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Latest Posts Grid */}
        <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
          <span className="w-2 h-8 bg-blue-900 mr-3 rounded-full"></span>
          Últimos Artículos
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.slice(1).map(post => (
            <article key={post.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col hover:shadow-xl transition-all duration-300 group cursor-pointer">
              <div className="h-48 overflow-hidden relative">
                <img 
                  src={post.imageUrl} 
                  alt={post.title} 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                   <span className="bg-white/90 backdrop-blur-sm text-blue-900 text-xs font-bold px-3 py-1 rounded-full uppercase shadow-sm">
                    {post.category}
                  </span>
                </div>
              </div>
              
              <div className="p-6 flex-grow flex flex-col">
                <div className="flex items-center text-gray-400 text-xs mb-3 gap-4">
                  <span className="flex items-center"><Calendar className="w-3 h-3 mr-1" /> {post.date}</span>
                  <span className="flex items-center"><User className="w-3 h-3 mr-1" /> {post.author}</span>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-700 transition-colors line-clamp-2">
                  {post.title}
                </h3>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">
                  {post.excerpt}
                </p>
                
                <div className="mt-auto pt-4 border-t border-gray-50">
                  <button className="text-blue-900 font-bold text-sm flex items-center hover:translate-x-1 transition-transform">
                    Leer más <ArrowRight className="w-4 h-4 ml-2" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};