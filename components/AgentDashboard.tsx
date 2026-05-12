import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Home, 
  MessageSquare, 
  Briefcase, 
  Settings, 
  BarChart3, 
  PlusCircle, 
  Search, 
  Bell, 
  LogOut, 
  MoreVertical,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle,
  ChevronRight,
  Filter,
  MapPin,
  Camera,
  Trash2,
  Edit,
  FileText,
  X,
  Mail
} from 'lucide-react';
import { addProperty, getProperties, updateProperty, deleteProperty } from '../services/dataService';
import { Property, Contract } from '../types';
import { motion, AnimatePresence } from 'motion/react';

type Tab = 'overview' | 'sales' | 'rentals' | 'messages' | 'emailMarketing' | 'settings';

export const AgentDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [showForm, setShowForm] = useState(false);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const [showContractModal, setShowContractModal] = useState(false);
  const [contractProperty, setContractProperty] = useState<Property | null>(null);
  const [contractForm, setContractForm] = useState<Contract>({
    startDate: '',
    endDate: '',
    increaseIntervalMonths: 6
  });

  const [newProperty, setNewProperty] = useState({
    title: '',
    price: 0,
    type: 'Apartment' as 'Apartment' | 'House' | 'Condo' | 'Land',
    operation: 'Sale' as 'Sale' | 'Rent',
    location: '',
    description: '',
    beds: 0,
    baths: 0,
    sqft: 0,
  });
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [customFeature, setCustomFeature] = useState('');
  const [customFeaturesList, setCustomFeaturesList] = useState<string[]>([]);

  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [activeProperties, setActiveProperties] = useState<Property[]>([]);
  const [stats, setStats] = useState({ available: 0, sold: 0, rented: 0 });

  const predefinedFeatures = ['Cochera', 'Piscina', 'Balcón', 'Seguridad 24hs', 'Gimnasio', 'SUM'];

  useEffect(() => {
    const fetchProps = async () => {
      const props = await getProperties();
      setActiveProperties(props);
      updateStats(props);
    };
    fetchProps();
  }, []);

  const updateStats = (props: Property[]) => {
    const available = props.filter(p => p.status === 'available').length;
    const sold = props.filter(p => p.status === 'sold').length;
    const rented = props.filter(p => p.status === 'rented').length;
    setStats({ available, sold, rented });
  };

  const generateTasks = (props: Property[]) => {
    const tasks: any[] = [];
    const today = new Date();

    props.forEach(p => {
      if (p.contract) {
        const endDate = new Date(p.contract.endDate);
        const startDate = new Date(p.contract.startDate);
        
        // Finalización de contrato (30 días antes)
        const diffDays = Math.ceil((endDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
        if (diffDays >= 0 && diffDays <= 30) {
          tasks.push({
            title: `Contrato finaliza en ${diffDays} días: ${p.title}`,
            time: `Vence el ${p.contract.endDate}`,
            type: 'alert',
            icon: AlertCircle,
            bg: 'bg-red-50',
            color: 'text-red-600'
          });
        }

        // Aumento de valor
        const monthsDiff = (today.getFullYear() - startDate.getFullYear()) * 12 + (today.getMonth() - startDate.getMonth());
        if (monthsDiff > 0 && monthsDiff % p.contract.increaseIntervalMonths === 0 && today.getDate() <= 5) {
          tasks.push({
            title: `Aumento de valor pendiente: ${p.title}`,
            time: `Corresponde aumento cada ${p.contract.increaseIntervalMonths} meses`,
            type: 'status',
            icon: TrendingUp,
            bg: 'bg-orange-50',
            color: 'text-orange-600'
          });
        }
      }
    });

    // Default tasks if none
    if (tasks.length === 0) {
      tasks.push({ title: 'Sin tareas urgentes de contratos', time: 'Todo al día', type: 'status', icon: CheckCircle2, bg: 'bg-green-50', color: 'text-green-600' });
    }

    return tasks;
  };

  const handleDelete = async (id: string) => {
    if (confirm('¿Estás seguro de que deseas eliminar esta propiedad?')) {
      const success = await deleteProperty(id);
      if (success) {
        const updated = activeProperties.filter(p => p.id !== id);
        setActiveProperties(updated);
        updateStats(updated);
      }
    }
  };

  const handleEdit = (property: Property) => {
    setEditingProperty(property);
    setNewProperty({
      title: property.title,
      price: property.price,
      type: property.type,
      operation: property.operation,
      location: property.location,
      description: property.description,
      beds: property.beds,
      baths: property.baths,
      sqft: property.sqft,
    });
    setCoverImage(property.imageUrl);
    setGalleryImages(property.images);
    setShowForm(true);
  };

  const handleAddContract = (property: Property) => {
    setContractProperty(property);
    if (property.contract) {
      setContractForm(property.contract);
    } else {
      setContractForm({
        startDate: new Date().toISOString().split('T')[0],
        endDate: new Date(new Date().setFullYear(new Date().getFullYear() + 2)).toISOString().split('T')[0],
        increaseIntervalMonths: 6
      });
    }
    setShowContractModal(true);
  };

  const handleSaveContract = async () => {
    if (!contractProperty) return;
    const success = await updateProperty(contractProperty.id, { contract: contractForm });
    if (success) {
      const updated = activeProperties.map(p => p.id === contractProperty.id ? { ...p, contract: contractForm } : p);
      setActiveProperties(updated);
      setShowContractModal(false);
      setContractProperty(null);
    }
  };

  const handleUpdateStatus = async (property: Property, status: 'available' | 'sold' | 'rented') => {
    const success = await updateProperty(property.id, { status });
    if (success) {
      const updatedProperties = activeProperties.map(p => p.id === property.id ? {...p, status} : p);
      setActiveProperties(updatedProperties);
      updateStats(updatedProperties);
    }
  };

  const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGalleryImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages: string[] = [];
      const filesArray = Array.from(files);
      filesArray.forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          newImages.push(reader.result as string);
          if (newImages.length === filesArray.length) {
            setGalleryImages(prev => [...prev, ...newImages]);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleCreateProperty = async () => {
    if (editingProperty) {
      const updates: Partial<Property> = {
        ...newProperty,
        imageUrl: coverImage || editingProperty.imageUrl,
        images: galleryImages,
        features: [...selectedFeatures, ...customFeaturesList],
      };
      await updateProperty(editingProperty.id, updates);
    } else {
      const propertyToCreate: Omit<Property, 'id'> = {
        ...newProperty,
        currency: 'USD',
        coordinates: { lat: 0, lng: 0 },
        imageUrl: coverImage || 'https://picsum.photos/800/600?random=100',
        images: galleryImages,
        features: [...selectedFeatures, ...customFeaturesList],
        agent: { name: 'Agente Actual', phone: '12345678', photo: 'https://picsum.photos/100/100?random=agent' },
        status: 'available'
      };
      await addProperty(propertyToCreate);
    }
    setShowForm(false);
    setEditingProperty(null);
    const props = await getProperties();
    setActiveProperties(props);
    updateStats(props);
    // Reset form
    setNewProperty({ title: '', price: 0, type: 'Apartment', operation: 'Sale', location: '', description: '', beds: 0, baths: 0, sqft: 0 });
    setSelectedFeatures([]);
    setCustomFeaturesList([]);
    setCustomFeature('');
    setCoverImage(null);
    setGalleryImages([]);
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden font-sans">
      {/* Sidebar */}
      <aside className="w-72 bg-white border-r border-gray-100 flex flex-col shadow-sm z-20">
        <div className="p-8 border-b border-gray-50 flex items-center space-x-3">
          <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-red-200">
            R
          </div>
          <span className="font-bold text-xl text-gray-900 tracking-tight">Roos Panel</span>
        </div>

        <nav className="flex-grow p-6 space-y-2 overflow-y-auto">
          {[
            { id: 'overview', label: 'Resumen', icon: LayoutDashboard },
            { id: 'sales', label: 'Propiedades en Venta', icon: Briefcase },
            { id: 'rentals', label: 'Alquileres', icon: Home },
            { id: 'messages', label: 'Centro de Mensajes', icon: MessageSquare },
            { id: 'emailMarketing', label: 'E-mail Marketing', icon: Mail },
            { id: 'settings', label: 'Configuración', icon: Settings },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as Tab)}
              className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all duration-300 group ${
                activeTab === item.id 
                  ? 'bg-red-50 text-red-600 font-bold shadow-sm' 
                  : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <div className="flex items-center space-x-4">
                <item.icon className={`w-5 h-5 transition-transform group-hover:scale-110 ${activeTab === item.id ? 'text-red-600' : 'text-gray-400'}`} />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded-full animate-pulse">
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </nav>

        <div className="p-6 border-t border-gray-50 bg-gray-50/50">
          <div className="flex items-center space-x-4 mb-6">
            <div className="relative">
              <img src="https://picsum.photos/100/100?random=agent" alt="Agent" className="w-12 h-12 rounded-2xl object-cover ring-2 ring-white shadow-md" />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
            </div>
            <div>
              <p className="text-sm font-bold text-gray-900">Agente Roos</p>
              <p className="text-xs text-gray-500 font-medium">Agente Senior</p>
            </div>
          </div>
          <button className="w-full flex items-center justify-center space-x-2 p-3 text-red-600 font-bold hover:bg-red-100 rounded-xl transition-colors">
            <LogOut className="w-4 h-4" />
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow flex flex-col h-screen overflow-hidden bg-gray-50/50">
        {/* Header */}
        <header className="bg-white border-b border-gray-100 px-10 py-6 flex items-center justify-between sticky top-0 z-10">
          <div className="relative max-w-md w-full hidden md:block">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Buscar listados, clientes, facturas..." 
              className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:ring-2 focus:ring-red-100 focus:border-red-200 transition-all text-sm outline-none"
            />
          </div>

          <div className="flex items-center space-x-6">
            <button className="relative p-2 text-gray-500 hover:bg-gray-50 rounded-xl transition-colors">
              <Bell className="w-6 h-6" />
              <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-600 border-2 border-white rounded-full"></span>
            </button>
            <div className="h-8 w-px bg-gray-100"></div>
            {!showForm && (
              <button 
                onClick={() => { setShowForm(true); setActiveTab('sales'); }}
                className="bg-red-600 text-white font-bold px-6 py-3 rounded-2xl shadow-xl shadow-red-200 hover:bg-red-700 hover:-translate-y-0.5 transition-all flex items-center space-x-2"
              >
                <PlusCircle className="w-5 h-5 font-black" />
                <span>Nueva Propiedad</span>
              </button>
            )}
          </div>
        </header>

        {/* Dynamic Content Area */}
        <div className="flex-grow overflow-y-auto p-10 custom-scrollbar">
          <AnimatePresence mode="wait">
            {showForm ? (
              <motion.div
                key="property-form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="max-w-4xl mx-auto"
              >
                <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
                  <div className="p-10 border-b border-gray-50 flex justify-between items-center bg-gray-50/30">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-red-600 text-white rounded-2xl shadow-lg shadow-red-100">
                        <PlusCircle className="w-6 h-6" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-black text-gray-900 tracking-tight">
                          {editingProperty ? 'Editar Propiedad' : 'Añadir Nueva Propiedad'}
                        </h2>
                        <p className="text-sm text-gray-500">Completá los detalles del inmueble con precisión.</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => { setShowForm(false); setEditingProperty(null); }}
                      className="px-6 py-2 bg-white border border-gray-200 text-gray-500 font-bold rounded-xl hover:bg-gray-50 hover:text-red-600 transition-all shadow-sm"
                    >
                      Cancelar
                    </button>
                  </div>

                  <div className="p-12 space-y-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 px-1">Título de la Propiedad</label>
                        <input 
                          type="text" 
                          placeholder="Ej: Penthouse Moderno en Puerto Madero" 
                          value={newProperty.title}
                          onChange={e => setNewProperty({...newProperty, title: e.target.value})}
                          className="w-full p-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:ring-2 focus:ring-red-100 focus:border-red-200 transition-all font-medium outline-none" 
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 px-1">Precio (USD)</label>
                        <input 
                          type="number" 
                          placeholder="Precio en Dólares" 
                          value={newProperty.price || ''}
                          onChange={e => setNewProperty({...newProperty, price: Number(e.target.value)})}
                          className="w-full p-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:ring-2 focus:ring-red-100 focus:border-red-200 transition-all font-medium outline-none" 
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 px-1">Tipo de Operación</label>
                        <div className="flex bg-gray-50 p-1.5 rounded-2xl">
                          {(['Sale', 'Rent'] as const).map(op => (
                            <button
                              key={op}
                              onClick={() => setNewProperty({...newProperty, operation: op})}
                              className={`flex-grow py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                                newProperty.operation === op ? 'bg-white text-red-600 shadow-md' : 'text-gray-400 hover:text-gray-600'
                              }`}
                            >
                              {op === 'Sale' ? 'Venta' : 'Alquiler'}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 px-1">Tipo de Inmueble</label>
                        <select 
                          value={newProperty.type}
                          onChange={e => setNewProperty({...newProperty, type: e.target.value as any})}
                          className="w-full p-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:ring-2 focus:ring-red-100 focus:border-red-200 transition-all font-medium outline-none appearance-none"
                        >
                          <option value="Apartment">Departamento</option>
                          <option value="House">Casa</option>
                          <option value="Condo">Oficina / PH</option>
                          <option value="Land">Terreno</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 px-1">Ubicación</label>
                      <div className="relative">
                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input 
                          type="text" 
                          placeholder="Ciudad, Barrio, Dirección..." 
                          value={newProperty.location}
                          onChange={e => setNewProperty({...newProperty, location: e.target.value})}
                          className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:ring-2 focus:ring-red-100 focus:border-red-200 transition-all font-medium outline-none" 
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 px-1">Imagen de Portada</label>
                        <div className="flex items-center space-x-4">
                          <label className="w-full">
                            <div className="p-4 bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl flex items-center justify-center cursor-pointer hover:bg-gray-100 hover:border-red-200 transition-all">
                              <Camera className="w-5 h-5 text-gray-400 mr-3" />
                              <span className="text-xs font-bold text-gray-500">Subir foto de portada</span>
                            </div>
                            <input type="file" className="hidden" accept="image/*" onChange={handleCoverImageChange} />
                          </label>
                          {coverImage && (
                            <img src={coverImage} alt="Cover" className="w-20 h-20 rounded-2xl object-cover ring-2 ring-red-50" />
                          )}
                        </div>
                      </div>
                      <div>
                        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 px-1">Galería de Imágenes</label>
                        <label className="w-full">
                          <div className="p-4 bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl flex items-center justify-center cursor-pointer hover:bg-gray-100 hover:border-red-200 transition-all">
                            <PlusCircle className="w-5 h-5 text-gray-400 mr-3" />
                            <span className="text-xs font-bold text-gray-500">Subir múltiples fotos</span>
                          </div>
                          <input type="file" className="hidden" multiple accept="image/*" onChange={handleGalleryImagesChange} />
                        </label>
                      </div>
                    </div>

                    {galleryImages.length > 0 && (
                      <div className="flex flex-wrap gap-3 p-4 bg-gray-50 rounded-3xl">
                        {galleryImages.map((img, i) => (
                          <div key={i} className="relative group">
                            <img src={img} alt={`Gallery ${i}`} className="w-16 h-16 rounded-xl object-cover shadow-sm" />
                            <button 
                              onClick={() => setGalleryImages(prev => prev.filter((_, idx) => idx !== i))}
                              className="absolute -top-2 -right-2 bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="grid grid-cols-3 gap-6">
                      <div>
                        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 px-1">Dormitorios</label>
                        <input 
                          type="number" 
                          value={newProperty.beds}
                          onChange={e => setNewProperty({...newProperty, beds: Number(e.target.value)})}
                          className="w-full p-4 bg-gray-50 border border-transparent rounded-2xl text-center font-bold outline-none focus:bg-white focus:ring-2 focus:ring-red-100" 
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 px-1">Baños</label>
                        <input 
                          type="number" 
                          value={newProperty.baths}
                          onChange={e => setNewProperty({...newProperty, baths: Number(e.target.value)})}
                          className="w-full p-4 bg-gray-50 border border-transparent rounded-2xl text-center font-bold outline-none focus:bg-white focus:ring-2 focus:ring-red-100" 
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 px-1">Metros ($m^2$)</label>
                        <input 
                          type="number" 
                          value={newProperty.sqft}
                          onChange={e => setNewProperty({...newProperty, sqft: Number(e.target.value)})}
                          className="w-full p-4 bg-gray-50 border border-transparent rounded-2xl text-center font-bold outline-none focus:bg-white focus:ring-2 focus:ring-red-100" 
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4 px-1">Características y Amenities</label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
                        {predefinedFeatures.map((feature) => (
                          <label key={feature} className="flex items-center space-x-3 cursor-pointer group">
                            <div 
                              onClick={() => {
                                if (selectedFeatures.includes(feature)) {
                                  setSelectedFeatures(selectedFeatures.filter(f => f !== feature));
                                } else {
                                  setSelectedFeatures([...selectedFeatures, feature]);
                                }
                              }}
                              className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${
                                selectedFeatures.includes(feature) ? 'bg-red-600 border-red-600' : 'border-gray-200 group-hover:border-red-200'
                              }`}
                            >
                              {selectedFeatures.includes(feature) && <CheckCircle2 className="w-4 h-4 text-white" />}
                            </div>
                            <span className={`text-sm font-medium ${selectedFeatures.includes(feature) ? 'text-gray-900' : 'text-gray-500'}`}>{feature}</span>
                          </label>
                        ))}
                      </div>

                      <div className="flex space-x-3">
                        <input 
                          type="text" 
                          placeholder="Otra característica..." 
                          value={customFeature}
                          onChange={e => setCustomFeature(e.target.value)}
                          className="flex-grow p-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:ring-2 focus:ring-red-100 font-medium outline-none"
                        />
                        <button 
                          onClick={() => {
                            if (customFeature.trim()) {
                              setCustomFeaturesList([...customFeaturesList, customFeature.trim()]);
                              setCustomFeature('');
                            }
                          }}
                          className="p-4 bg-gray-100 text-gray-500 rounded-2xl hover:bg-red-50 hover:text-red-600 transition-all shadow-sm"
                        >
                          <PlusCircle className="w-6 h-6" />
                        </button>
                      </div>

                      {customFeaturesList.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-4">
                          {customFeaturesList.map((f, i) => (
                            <span key={i} className="bg-red-50 text-red-600 px-3 py-1.5 rounded-full text-xs font-bold flex items-center">
                              {f}
                              <button 
                                onClick={() => setCustomFeaturesList(customFeaturesList.filter((_, idx) => idx !== i))}
                                className="ml-2 hover:text-red-800"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 px-1">Descripción Detallada</label>
                      <textarea 
                        rows={6}
                        placeholder="Describí las mejores características del inmueble..." 
                        value={newProperty.description}
                        onChange={e => setNewProperty({...newProperty, description: e.target.value})}
                        className="w-full p-6 bg-gray-50 border border-transparent rounded-3xl focus:bg-white focus:ring-2 focus:ring-red-100 transition-all font-medium outline-none resize-none"
                      />
                    </div>

                    <div className="pt-6 border-t border-gray-50">
                      <button 
                        onClick={handleCreateProperty} 
                        className="w-full bg-red-600 text-white font-black py-6 rounded-[2rem] shadow-2xl shadow-red-200 hover:bg-red-700 hover:-translate-y-1 transition-all uppercase tracking-widest text-lg"
                      >
                        {editingProperty ? 'Guardar Cambios' : 'Publicar Propiedad'}
                      </button>
                      <button 
                        onClick={() => { setShowForm(false); setEditingProperty(null); }}
                        className="w-full mt-4 text-gray-400 font-bold hover:text-gray-900 transition-colors"
                      >
                        Descartar
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="main-content"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {activeTab === 'overview' && (
                  <motion.div 
                    key="overview"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-10"
                  >
                {/* Stats Widgets */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {[
                    { label: 'Ingresos Mensuales', value: '$84,200', icon: TrendingUp, delta: '+12.5%', color: 'text-green-600', bg: 'bg-green-50' },
                    { label: 'Propiedades Activas', value: stats.available.toString(), icon: Home, delta: 'En stock', color: 'text-blue-600', bg: 'bg-blue-50' },
                    { label: 'Mensajes Nuevos', value: '18', icon: MessageSquare, delta: '+5 hoy', color: 'text-red-600', bg: 'bg-red-50' },
                    { label: 'Task Pendientes', value: generateTasks(activeProperties).filter(t => t.type === 'alert').length.toString(), icon: CheckCircle2, delta: 'Urgente', color: 'text-orange-600', bg: 'bg-orange-50' }
                  ].map((stat, i) => (
                    <div key={i} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 group hover:shadow-xl hover:border-red-100 transition-all duration-500">
                      <div className="flex justify-between items-start mb-6">
                        <div className={`p-4 rounded-2xl ${stat.bg} ${stat.color} transition-transform group-hover:scale-110`}>
                          <stat.icon className="w-6 h-6" />
                        </div>
                        <span className={`text-xs font-bold px-2 py-1 rounded-full ${stat.color} ${stat.bg}`}>
                          {stat.delta}
                        </span>
                      </div>
                      <p className="text-gray-500 text-sm font-medium mb-1 uppercase tracking-wider">{stat.label}</p>
                      <h4 className="text-3xl font-black text-gray-900">{stat.value}</h4>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Recent Activity */}
                  <div className="lg:col-span-2 bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
                    <div className="flex items-center justify-between mb-8">
                      <h3 className="text-xl font-bold text-gray-900">Tareas y Contratos</h3>
                      <button className="text-red-600 font-bold text-sm hover:underline">Ver todo</button>
                    </div>
                    <div className="space-y-6">
                      {generateTasks(activeProperties).map((item, i) => (
                        <div key={i} className="flex items-center p-4 hover:bg-gray-50 rounded-2xl transition-colors group cursor-pointer">
                          <div className={`p-3 rounded-xl ${item.bg} ${item.color} mr-4 group-hover:scale-110 transition-transform`}>
                            <item.icon className="w-5 h-5" />
                          </div>
                          <div className="flex-grow">
                            <p className="text-sm font-bold text-gray-900">{item.title}</p>
                            <span className="text-xs text-gray-400 flex items-center mt-1">
                              <Clock className="w-3 h-3 mr-1" /> {item.time}
                            </span>
                          </div>
                          <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-red-600 group-hover:translate-x-1 transition-all" />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Summary Pie or Chart Placeholder */}
                  <div className="bg-red-600 rounded-3xl p-8 text-white shadow-2xl shadow-red-200 relative overflow-hidden">
                    <div className="relative z-10 h-full flex flex-col">
                      <h3 className="text-xl font-bold mb-8">Tu Rendimiento</h3>
                      <div className="space-y-6 mt-auto">
                        <div>
                          <div className="flex justify-between text-sm mb-2 font-bold">
                            <span>Objetivo de Ventas</span>
                            <span>80%</span>
                          </div>
                          <div className="w-full bg-white/20 h-2 rounded-full overflow-hidden">
                            <div className="bg-white h-full w-[80%] rounded-full"></div>
                          </div>
                        </div>
                        <p className="text-sm text-red-100 font-medium">
                          ¡Estás a solo 2 cierres de alcanzar tu bono trimestral! Seguí así.
                        </p>
                        <button className="bg-white text-red-600 font-bold py-3 px-6 rounded-2xl shadow-lg w-full">
                          Ver Reporte Completo
                        </button>
                      </div>
                    </div>
                    {/* Abstract background shapes */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-red-400/20 rounded-full blur-xl -ml-10 -mb-10"></div>
                  </div>
                </div>
              </motion.div>
            )}

            {(activeTab === 'sales' || activeTab === 'rentals') && (
              <motion.div 
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div>
                    <h2 className="text-3xl font-black text-gray-900 tracking-tight">
                      {activeTab === 'sales' ? 'Propiedades en Venta' : 'Alquileres Vigentes'}
                    </h2>
                    <p className="text-gray-500 mt-1">
                      {activeTab === 'sales' 
                        ? 'Gestioná tus inmuebles disponibles para la compra.' 
                        : 'Administrá tus listados de alquiler y sus contratos.'}
                    </p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <button className="flex items-center space-x-2 bg-white border border-gray-200 p-3 px-5 rounded-2xl text-sm font-bold text-gray-700 hover:border-red-200 hover:text-red-600 transition-all">
                      <Filter className="w-4 h-4" />
                      <span>Filtros</span>
                    </button>
                    <button 
                      onClick={() => setShowForm(true)}
                      className="flex items-center space-x-2 bg-red-600 p-3 px-5 rounded-2xl text-sm font-bold text-white shadow-xl shadow-red-200/50 hover:bg-red-700 hover:-translate-y-0.5 transition-all"
                    >
                      <PlusCircle className="w-4 h-4" />
                      <span>Nueva Propiedad</span>
                    </button>
                  </div>
                </div>

                {/* Property Table / List */}
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="bg-gray-50/50 border-b border-gray-50 text-[10px] font-black text-gray-400 uppercase tracking-widest px-8">
                          <th className="py-6 px-10">Propiedad</th>
                          <th className="py-6 px-4">Tipo</th>
                          <th className="py-6 px-4">Precio</th>
                          <th className="py-6 px-4">Estado</th>
                          <th className="py-6 px-10 text-right">Acciones</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50">
                        {activeProperties
                          .filter(p => activeTab === 'sales' ? p.operation === 'Sale' : p.operation === 'Rent')
                          .map((p) => (
                          <tr key={p.id} className="hover:bg-gray-50/50 transition-colors group">
                            <td className="py-6 px-10">
                              <div className="flex items-center space-x-4">
                                <img src={p.imageUrl} alt="" className="w-16 h-16 rounded-2xl object-cover shadow-sm ring-2 ring-white" />
                                <div>
                                  <p className="text-sm font-bold text-gray-900 group-hover:text-red-600 transition-colors">{p.title}</p>
                                  <p className="text-xs text-gray-500 mt-1 flex items-center">
                                    <MapPin className="w-3 h-3 mr-1" /> {p.location}
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td className="py-6 px-4 text-sm font-medium text-gray-600">{p.type}</td>
                            <td className="py-6 px-4">
                              <p className="text-sm font-black text-gray-900">U$D {p.price.toLocaleString()}</p>
                            </td>
                            <td className="py-6 px-4">
                              <select 
                                value={p.status}
                                onChange={(e) => handleUpdateStatus(p, e.target.value as any)}
                                className={`text-[10px] font-bold px-3 py-1.5 rounded-full border-none focus:ring-2 focus:ring-red-100 outline-none uppercase tracking-wider ${
                                  p.status === 'available' ? 'bg-green-100 text-green-700' : 
                                  p.status === 'sold' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
                                }`}
                              >
                                <option value="available">Disponible</option>
                                <option value="sold">Vendida</option>
                                <option value="rented">Alquilada</option>
                              </select>
                            </td>
                            <td className="py-6 px-10 text-right">
                              <div className="flex items-center justify-end space-x-2">
                                <button 
                                  onClick={() => handleEdit(p)}
                                  className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
                                  title="Editar"
                                >
                                  <Edit className="w-4 h-4" />
                                </button>
                                <button 
                                  onClick={() => handleAddContract(p)}
                                  className={`p-2 rounded-xl transition-all ${p.contract ? 'text-green-600 bg-green-50' : 'text-gray-400 hover:text-green-600 hover:bg-green-50'}`}
                                  title={p.contract ? "Ver Contrato" : "Agregar Contrato"}
                                >
                                  <FileText className="w-4 h-4" />
                                </button>
                                <button 
                                  onClick={() => handleDelete(p.id)}
                                  className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                                  title="Eliminar"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'messages' && (
              <motion.div
                key="messages"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-4xl mx-auto h-full flex flex-col items-center justify-center text-center p-10"
              >
                <div className="w-24 h-24 bg-red-50 text-red-600 rounded-3xl flex items-center justify-center mb-8 shadow-inner">
                  <MessageSquare className="w-12 h-12" />
                </div>
                <h2 className="text-3xl font-black text-gray-900 mb-4 tracking-tight">Centro de Mensajería Avanzado</h2>
                <div className="max-w-xl bg-white border border-gray-100 rounded-[2rem] p-10 shadow-sm">
                  <p className="text-gray-600 font-medium leading-relaxed mb-8">
                    Lo sentimos, esta función no se incluye con el <span className="text-red-600 font-bold">Paquete de Desarrollo Básico</span>. La implementación de un sistema de comunicación en tiempo real requiere infraestructura adicional.
                  </p>
                  
                  <div className="space-y-4 text-left">
                    <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">¿Por qué no está disponible?</p>
                    {[
                      { title: 'Sincronización en Tiempo Real', desc: 'Requiere servicios de WebSockets (Socket.io) para mensajería instantánea sin latencia.' },
                      { title: 'Escalabilidad Masiva', desc: 'El almacenamiento de historiales de chat requiere bases de datos optimizadas para alta concurrencia.' },
                      { title: 'Sistema de Notificaciones', desc: 'Integración con Firebase Cloud Messaging para alertas push en dispositivos móviles y web.' },
                      { title: 'Seguridad y Cifrado', desc: 'Los protocolos de privacidad punta a punta exceden el alcance del desarrollo inicial configurable.' }
                    ].map((reason, i) => (
                      <div key={i} className="flex space-x-3 group">
                        <div className="p-2 bg-red-50 text-red-600 rounded-lg group-hover:scale-110 transition-transform h-fit">
                          <CheckCircle2 className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-gray-900">{reason.title}</h4>
                          <p className="text-xs text-gray-500 leading-relaxed">{reason.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <button 
                    onClick={() => window.open('https://wa.me/5492995504783', '_blank')}
                    className="w-full mt-10 bg-gray-900 text-white font-black py-4 rounded-2xl shadow-xl hover:bg-black transition-all uppercase tracking-widest text-sm"
                  >
                    Solicitar Actualización de Plan
                  </button>
                </div>
              </motion.div>
            )}

            {activeTab === 'emailMarketing' && (
              <motion.div
                key="email-marketing"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-5xl mx-auto space-y-10"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-24 h-24 bg-indigo-50 text-indigo-600 rounded-3xl flex items-center justify-center mb-8 shadow-inner">
                    <Mail className="w-12 h-12" />
                  </div>
                  <h2 className="text-3xl font-black text-gray-900 mb-4 tracking-tight">E-mail Marketing & Automatización</h2>
                  <div className="max-w-2xl bg-white border border-gray-100 rounded-[2rem] p-10 shadow-sm mb-12">
                     <p className="text-gray-600 font-medium leading-relaxed">
                      Esta herramienta avanzada de conversión no se incluye con el <span className="text-red-600 font-bold">Paquete de Desarrollo Básico</span>. 
                      La integración de plataformas de envío masivo (como SendGrid o Mailchimp) y la lógica de segmentación requieren una configuración de servidor personalizada.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm">
                    <h3 className="text-xl font-black text-gray-900 mb-6 flex items-center">
                      <TrendingUp className="w-6 h-6 mr-3 text-indigo-600" />
                      Funciones y Beneficios Generales
                    </h3>
                    <ul className="space-y-6">
                      {[
                        { t: 'Segmentación Inteligente', d: 'Agrupá a tus contactos por intereses, ubicación o presupuesto para enviarles solo lo que buscan.' },
                        { t: 'Automatización (Drip Campaigns)', d: 'Secuencias de correos automáticos que mantienen tu marca presente sin esfuerzo manual.' },
                        { t: 'Analítica en Tiempo Real', d: 'Sabé quién abrió tu correo, cuántas veces y en qué propiedad hizo clic.' },
                        { t: 'Aumento de Retorno (ROI)', d: 'Es el canal digital con mayor retorno de inversión, convirtiendo prospectos en clientes fieles.' }
                      ].map((item, i) => (
                        <li key={i} className="flex space-x-3">
                          <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full mt-2 flex-shrink-0" />
                          <div>
                            <p className="text-sm font-bold text-gray-900">{item.t}</p>
                            <p className="text-xs text-gray-500 leading-relaxed">{item.d}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-indigo-600 p-10 rounded-[2.5rem] shadow-xl text-white relative overflow-hidden">
                    <h3 className="text-xl font-black mb-6 flex items-center relative z-10">
                      <Home className="w-6 h-6 mr-3 text-indigo-200" />
                      Impacto en tu Inmobiliaria
                    </h3>
                    <div className="space-y-6 relative z-10">
                      {[
                        { t: 'Nurturing de Leads', d: 'Acompañá al cliente desde que consulta por una casa hasta el cierre definitivo.' },
                        { t: 'Alertas de Nuevos Ingresos', d: 'Notificá instantáneamente a los interesados cuando entra una propiedad que encaja con su perfil.' },
                        { t: 'Newsletter de Mercado', d: 'Posicionate como experto enviando informes mensuales de precios y tendencias de barrios.' },
                        { t: 'Fidelización Post-Venta', d: 'Mantené el contacto con quienes ya compraron para futuras operaciones o recomendaciones.' }
                      ].map((item, i) => (
                        <div key={i} className="p-4 bg-white/10 rounded-2xl border border-white/10">
                          <p className="text-sm font-bold text-white mb-1">{item.t}</p>
                          <p className="text-xs text-indigo-100 leading-relaxed">{item.d}</p>
                        </div>
                      ))}
                    </div>
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16" />
                  </div>
                </div>

                <div className="bg-gray-900 rounded-[2.5rem] p-12 text-center text-white">
                  <h4 className="text-2xl font-black mb-4 tracking-tight">¿Listo para escalar tus ventas?</h4>
                  <p className="text-gray-400 mb-8 max-w-xl mx-auto">
                    La implementación de E-mail Marketing puede aumentar tus cierres mensuales en un <span className="text-white font-bold">25%</span>. 
                    Contactanos para integrar este módulo en tu ecosistema digital.
                  </p>
                  <button 
                    onClick={() => window.open('https://wa.me/5492995504783', '_blank')}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-black py-4 px-10 rounded-2xl transition-all shadow-2xl shadow-indigo-500/20 uppercase tracking-widest text-sm"
                  >
                    Consultar Presupuesto
                  </button>
                </div>
              </motion.div>
            )}

            {activeTab === 'settings' && (
              <motion.div 
                key="settings"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-2xl mx-auto space-y-8"
              >
                <div className="text-center mb-10">
                  <div className="relative inline-block group">
                    <img src="https://picsum.photos/200/200?random=agent" alt="" className="w-32 h-32 rounded-[2rem] object-cover shadow-2xl ring-4 ring-white" />
                    <button className="absolute bottom-0 right-0 p-3 bg-red-600 rounded-2xl text-white shadow-xl hover:scale-110 transition-transform">
                      <Camera className="w-5 h-5" />
                    </button>
                  </div>
                  <h2 className="text-2xl font-black text-gray-900 mt-6 tracking-tight">Configuración de Perfil</h2>
                  <p className="text-gray-500">Actualizá tu información y preferencias personales.</p>
                </div>

                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-10 space-y-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 px-1">Nombre Completo</label>
                      <input type="text" defaultValue="Agente Roos" className="w-full p-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:ring-2 focus:ring-red-100 focus:border-red-200 transition-all font-bold outline-none" />
                    </div>
                    <div>
                      <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 px-1">Email Profesional</label>
                      <input type="email" defaultValue="agente@roos.com" className="w-full p-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:ring-2 focus:ring-red-100 focus:border-red-200 transition-all font-bold outline-none" />
                    </div>
                    <div>
                      <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 px-1">Teléfono</label>
                      <input type="text" defaultValue="+54 11 6666 7777" className="w-full p-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:ring-2 focus:ring-red-100 focus:border-red-200 transition-all font-bold outline-none" />
                    </div>
                  </div>
                  <div className="pt-6">
                    <button className="w-full bg-red-600 text-white font-black py-4 rounded-2xl shadow-xl shadow-red-200 hover:bg-red-700 hover:shadow-2xl transition-all uppercase tracking-widest">
                      Guardar Cambios
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
        </div>
      </main>

      {/* Contract Modal */}
      <AnimatePresence>
        {showContractModal && contractProperty && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowContractModal(false)}
              className="absolute inset-0 bg-gray-900/40 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg bg-white rounded-[2.5rem] shadow-2xl p-10 overflow-hidden"
            >
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-red-50 text-red-600 rounded-xl">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900">Gestión de Contrato</h4>
                    <p className="text-sm text-gray-500">{contractProperty.title}</p>
                  </div>
                </div>
                <button onClick={() => setShowContractModal(false)} className="text-gray-400 hover:text-red-600">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 px-1">Fecha de Inicio</label>
                  <input 
                    type="date" 
                    value={contractForm.startDate}
                    onChange={e => setContractForm({...contractForm, startDate: e.target.value})}
                    className="w-full p-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:ring-2 focus:ring-red-100 outline-none font-bold"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 px-1">Fecha de Finalización</label>
                  <input 
                    type="date" 
                    value={contractForm.endDate}
                    onChange={e => setContractForm({...contractForm, endDate: e.target.value})}
                    className="w-full p-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:ring-2 focus:ring-red-100 outline-none font-bold"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 px-1">Aumento cada (meses)</label>
                  <div className="grid grid-cols-4 gap-2">
                    {[3, 4, 6, 12].map(m => (
                      <button
                        key={m}
                        onClick={() => setContractForm({...contractForm, increaseIntervalMonths: m})}
                        className={`py-3 rounded-xl text-xs font-black transition-all ${
                          contractForm.increaseIntervalMonths === m ? 'bg-red-600 text-white shadow-lg' : 'bg-gray-50 text-gray-400 hover:bg-gray-100'
                        }`}
                      >
                        {m}m
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-4 flex space-x-4">
                  <button 
                    onClick={handleSaveContract}
                    className="flex-grow bg-red-600 text-white font-black py-4 rounded-2xl shadow-xl shadow-red-200 hover:bg-red-700 transition-all uppercase tracking-widest"
                  >
                    Guardar Contrato
                  </button>
                  {contractProperty.contract && (
                    <button 
                      onClick={async () => {
                        const success = await updateProperty(contractProperty.id, { contract: undefined });
                        if (success) {
                          const updated = activeProperties.map(p => p.id === contractProperty.id ? { ...p, contract: undefined } : p);
                          setActiveProperties(updated);
                          setShowContractModal(false);
                        }
                      }}
                      className="p-4 bg-gray-100 text-gray-400 hover:text-red-600 rounded-2xl transition-colors"
                      title="Eliminar Contrato"
                    >
                      <Trash2 className="w-6 h-6" />
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
