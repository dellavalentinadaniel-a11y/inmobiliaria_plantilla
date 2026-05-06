import React, { useState, useEffect } from 'react';
import { LayoutDashboard, Home, MessageSquare, Briefcase, Settings, BarChart3, PlusCircle } from 'lucide-react';
import { addProperty, getProperties, updateProperty } from '../services/dataService';
import { Property } from '../types';

export const AgentDashboard: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
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
      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onloadend = () => {
          newImages.push(reader.result as string);
          if (newImages.length === files.length) {
            setGalleryImages(prev => [...prev, ...newImages]);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleCreateProperty = async () => {
    const propertyToCreate: Omit<Property, 'id'> = {
      ...newProperty,
      currency: 'USD',
      coordinates: { lat: 0, lng: 0 },
      imageUrl: coverImage || 'https://picsum.photos/800/600?random=100',
      images: galleryImages,
      features: [...selectedFeatures, ...customFeaturesList],
      agent: { name: 'Agente Actual', phone: '12345678', photo: '' }
    };
    await addProperty(propertyToCreate);
    alert('Propiedad creada exitosamente!');
    setShowForm(false);
    // Reset form
    setNewProperty({ title: '', price: 0, type: 'Apartment', operation: 'Sale', location: '', description: '', beds: 0, baths: 0, sqft: 0 });
    setSelectedFeatures([]);
    setCustomFeaturesList([]);
    setCustomFeature('');
    setCoverImage(null);
    setGalleryImages([]);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8 animate-fade-in">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Panel de Control del Agente</h1>
          <p className="text-gray-600">Bienvenido de nuevo, Agente.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { title: 'Disponibles', value: stats.available.toString(), icon: Home, color: 'text-blue-600' },
            { title: 'Vendidas', value: stats.sold.toString(), icon: Briefcase, color: 'text-purple-600' },
            { title: 'Alquiladas', value: stats.rented.toString(), icon: MessageSquare, color: 'text-green-600' },
            { title: 'Total', value: activeProperties.length.toString(), icon: LayoutDashboard, color: 'text-orange-600' }
          ].map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 font-medium">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <stat.icon className={`w-8 h-8 ${stat.color} opacity-80`} />
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center justify-between">
              <span className="flex items-center">
                <PlusCircle className="w-5 h-5 mr-2 text-blue-900" />
                Añadir Nueva Propiedad
              </span>
              <button 
                onClick={() => setShowForm(!showForm)}
                className="text-sm text-blue-900 font-bold hover:underline"
              >
                {showForm ? 'Cancelar' : 'Añadir'}
              </button>
            </h3>
            
            {showForm && (
              <div className="space-y-4 pt-4 border-t">
                <input type="text" placeholder="Título" onChange={e => setNewProperty({...newProperty, title: e.target.value})} className="w-full p-2 border rounded" />
                <input type="number" placeholder="Precio (USD)" onChange={e => setNewProperty({...newProperty, price: Number(e.target.value)})} className="w-full p-2 border rounded" />
                <select onChange={e => setNewProperty({...newProperty, operation: e.target.value as 'Sale' | 'Rent'})} className="w-full p-2 border rounded">
                  <option value="Sale">Venta</option>
                  <option value="Rent">Alquiler</option>
                </select>
                <input type="text" placeholder="Ubicación" onChange={e => setNewProperty({...newProperty, location: e.target.value})} className="w-full p-2 border rounded" />
                
                <div className="pt-2">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Imagen de portada:</label>
                  <input type="file" accept="image/*" onChange={handleCoverImageChange} className="w-full p-2 border rounded" />
                  {coverImage && (
                    <img src={coverImage} alt="Preview" className="mt-2 h-32 object-cover rounded" />
                  )}
                </div>

                <div className="pt-2">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Imágenes de galería:</label>
                  <input type="file" accept="image/*" multiple onChange={handleGalleryImagesChange} className="w-full p-2 border rounded" />
                  <div className="flex flex-wrap mt-2 gap-2">
                    {galleryImages.map((img, i) => (
                      <img key={i} src={img} alt={`Preview ${i}`} className="h-20 w-20 object-cover rounded" />
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                    <input type="number" placeholder="Dormitorios" onChange={e => setNewProperty({...newProperty, beds: Number(e.target.value)})} className="p-2 border rounded" />
                    <input type="number" placeholder="Baños" onChange={e => setNewProperty({...newProperty, baths: Number(e.target.value)})} className="p-2 border rounded" />
                    <input type="number" placeholder="Metros (m²)" onChange={e => setNewProperty({...newProperty, sqft: Number(e.target.value)})} className="p-2 border rounded" />
                </div>
                
                <div className="pt-2">
                   <p className="text-sm font-bold text-gray-700 mb-2">Características:</p>
                   <div className="grid grid-cols-2 gap-2 text-sm">
                     {predefinedFeatures.map(f => (
                       <label key={f} className="flex items-center">
                         <input type="checkbox" checked={selectedFeatures.includes(f)} onChange={e => {
                           if (e.target.checked) setSelectedFeatures([...selectedFeatures, f]);
                           else setSelectedFeatures(selectedFeatures.filter(sf => sf !== f));
                         }} className="mr-2" />
                         {f}
                       </label>
                     ))}
                   </div>
                </div>

                <div className="pt-2 flex gap-2">
                  <input type="text" placeholder="Otra característica..." value={customFeature} onChange={e => setCustomFeature(e.target.value)} className="flex-grow p-2 border rounded text-sm" />
                  <button onClick={() => {
                     if (customFeature) {
                       setCustomFeaturesList([...customFeaturesList, customFeature]);
                       setCustomFeature('');
                     }
                  }} className="bg-gray-200 p-2 rounded text-blue-900 font-bold text-sm">+</button>
                </div>
                {customFeaturesList.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {customFeaturesList.map((f, i) => (
                      <span key={i} className="bg-blue-100 text-blue-900 text-xs px-2 py-1 rounded flex items-center">
                        {f} <button onClick={() => setCustomFeaturesList(customFeaturesList.filter((_, idx) => idx !== i))} className="ml-2 font-bold">x</button>
                      </span>
                    ))}
                  </div>
                )}
                
                <textarea placeholder="Descripción" onChange={e => setNewProperty({...newProperty, description: e.target.value})} className="w-full p-2 border rounded"></textarea>
                <button onClick={handleCreateProperty} className="w-full bg-blue-900 text-white p-2 rounded font-bold">Publicar Propiedad</button>
              </div>
            )}
            {!showForm && <p className="text-gray-600 text-sm">Gestioná tus listados actuales y agregá nuevas oportunidades.</p>}
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center">
              <BarChart3 className="w-5 h-5 mr-2 text-blue-900" />
              Mis Propiedades
            </h3>
            <div className="space-y-3">
              {activeProperties.map(p => (
                <div key={p.id} className="flex items-center justify-between border-b pb-2">
                  <span className="text-sm text-gray-700 truncate mr-2" title={p.title}>{p.title}</span>
                  <select 
                    value={p.status}
                    onChange={(e) => handleUpdateStatus(p, e.target.value as any)}
                    className="text-xs p-1 border rounded"
                  >
                    <option value="available">Disponible</option>
                    <option value="sold">Vendida</option>
                    <option value="rented">Alquilada</option>
                  </select>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center">
              <Settings className="w-5 h-5 mr-2 text-blue-900" />
              Configuración de Perfil
            </h3>
            <div className="space-y-4">
              <button className="text-blue-900 font-bold hover:underline">Editar Información de Contacto</button>
              <button className="text-blue-900 font-bold hover:underline">Gestionar Propiedades</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
