import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, ArrowRight, Database } from 'lucide-react';
import { seedDatabase } from '../services/seedService';

interface LoginProps {
  onLoginSuccess: () => void;
}

export const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [seedResult, setSeedResult] = useState<{ success: boolean; message: string } | null>(null);

  const handleSeedData = async () => {
    setIsLoading(true);
    const result = await seedDatabase();
    setSeedResult(result);
    setIsLoading(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess();
    }, 1500);
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex flex-col md:flex-row animate-fade-in">
      {/* Left Side - Image / Branding */}
      <div className="hidden md:flex md:w-1/2 lg:w-3/5 bg-gray-900 relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url("https://picsum.photos/1000/1200?random=20")' }}
        ></div>
        <div className="absolute inset-0 bg-blue-900/60 mix-blend-multiply"></div>
        <div className="relative z-10 p-16 flex flex-col justify-between text-white h-full">
          <div>
            <div className="text-4xl font-extrabold tracking-tighter flex items-center mb-6">
              <span className="text-red-500 mr-2">///</span>
              InmoFuture
            </div>
            <h2 className="text-3xl font-bold leading-tight max-w-lg">
              Accedé a herramientas exclusivas para encontrar tu próximo hogar.
            </h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                <span className="text-xl">🏠</span>
              </div>
              <p className="font-medium">Guardá tus propiedades favoritas</p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                <span className="text-xl">🔔</span>
              </div>
              <p className="font-medium">Recibí alertas de nuevos ingresos</p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                <span className="text-xl">💬</span>
              </div>
              <p className="font-medium">Contacto directo con agentes top</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full md:w-1/2 lg:w-2/5 bg-white p-8 md:p-16 flex flex-col justify-center">
        <div className="max-w-md mx-auto w-full">
          <div className="text-center mb-10">
            <h3 className="text-3xl font-bold text-gray-900 mb-2">Bienvenido de nuevo</h3>
            <p className="text-gray-500">Ingresá tus credenciales para acceder a tu cuenta.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  required
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-blue-900 focus:border-blue-900 transition-colors"
                  placeholder="nombre@ejemplo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Contraseña</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-blue-900 focus:border-blue-900 transition-colors"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
              <div className="flex justify-end mt-2">
                <a href="#" className="text-sm font-medium text-blue-900 hover:text-blue-700">
                  ¿Olvidaste tu contraseña?
                </a>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center items-center bg-blue-900 hover:bg-blue-800 text-white font-bold py-3 px-4 rounded-lg transition-all transform hover:translate-y-[-1px] shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  Ingresar <ArrowRight className="ml-2 h-5 w-5" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">O continuá con</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"/>
                </svg>
                Google
              </button>
              <button className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                <svg className="h-5 w-5 mr-2 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.791-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                Facebook
              </button>
            </div>
          </div>

          <div className="mt-8 text-center text-sm text-gray-600">
            ¿No tenés una cuenta?{' '}
            <a href="#" className="font-bold text-blue-900 hover:text-blue-700">Registrate gratis</a>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-100">
            <p className="text-xs text-center text-gray-400 mb-4 uppercase font-bold tracking-widest">Configuración de Desarrollador</p>
            <button
              onClick={handleSeedData}
              disabled={isLoading}
              className="w-full flex justify-center items-center bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold py-2 px-4 rounded-lg transition-colors text-sm"
            >
              <Database className="w-4 h-4 mr-2" />
              Poblar Base de Datos con Mock Data
            </button>
            {seedResult && (
              <p className={`text-center mt-2 text-xs font-medium ${seedResult.success ? 'text-green-600' : 'text-red-500'}`}>
                {seedResult.message}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
