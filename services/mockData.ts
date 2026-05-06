import { Property, Development, Agent, Office, BlogPost } from '../types';

export const MOCK_PROPERTIES: Property[] = [
  {
    id: '1',
    title: 'Moderno Apartamento en Palermo Hollywood',
    price: 250000,
    currency: 'USD',
    type: 'Apartment',
    operation: 'Sale',
    location: 'Palermo, Buenos Aires',
    coordinates: { lat: -34.586200, lng: -58.432600 },
    beds: 2,
    baths: 2,
    sqft: 85,
    imageUrl: 'https://picsum.photos/800/600?random=1',
    images: [
      'https://picsum.photos/800/600?random=1',
      'https://picsum.photos/800/600?random=101',
      'https://picsum.photos/800/600?random=102',
      'https://picsum.photos/800/600?random=103',
      'https://picsum.photos/800/600?random=104'
    ],
    description: 'Espectacular unidad con vista abierta, amenities de lujo y ubicación privilegiada cerca de los mejores restaurantes.',
    features: ['Piscina', 'Gimnasio', 'Seguridad 24hs', 'Balcón Aterrazado'],
    agent: {
      name: 'Camila Rodriguez',
      photo: 'https://picsum.photos/100/100?random=10',
      phone: '+54 11 1234 5678'
    },
    status: 'available'
  },
  {
    id: '2',
    title: 'Casa Minimalista en Barrio Cerrado',
    price: 450000,
    currency: 'USD',
    type: 'House',
    operation: 'Sale',
    location: 'Nordelta, Tigre',
    coordinates: { lat: -34.422300, lng: -58.628800 },
    beds: 4,
    baths: 3,
    sqft: 280,
    imageUrl: 'https://picsum.photos/800/600?random=2',
    images: [
      'https://picsum.photos/800/600?random=2',
      'https://picsum.photos/800/600?random=201',
      'https://picsum.photos/800/600?random=202',
      'https://picsum.photos/800/600?random=203'
    ],
    description: 'Diseño de autor, amplios ventanales, jardín parquizado con riego automático y piscina climatizada.',
    features: ['Jardín', 'Piscina', 'Cochera Doble', 'Parrilla'],
    agent: {
      name: 'Martin Perez',
      photo: 'https://picsum.photos/100/100?random=11',
      phone: '+54 11 8765 4321'
    },
    status: 'available'
  },
  {
    id: '3',
    title: 'Oficina Luminosa Centro',
    price: 1200,
    currency: 'USD',
    type: 'Condo',
    operation: 'Rent',
    location: 'Microcentro, Buenos Aires',
    coordinates: { lat: -34.603700, lng: -58.381600 },
    beds: 0,
    baths: 1,
    sqft: 45,
    imageUrl: 'https://picsum.photos/800/600?random=3',
    images: [
      'https://picsum.photos/800/600?random=3',
      'https://picsum.photos/800/600?random=301',
      'https://picsum.photos/800/600?random=302'
    ],
    description: 'Oficina lista para entrar, aire acondicionado central, piso técnico y excelente acceso a transporte.',
    features: ['Seguridad', 'Aire Acondicionado', 'Ascensor'],
    agent: {
      name: 'Sofia Martinez',
      photo: 'https://picsum.photos/100/100?random=12',
      phone: '+54 11 2222 3333'
    },
    status: 'available'
  },
  {
    id: '4',
    title: 'Duplex Renovado en Belgrano',
    price: 320000,
    currency: 'USD',
    type: 'Apartment',
    operation: 'Sale',
    location: 'Belgrano, Buenos Aires',
    coordinates: { lat: -34.561200, lng: -58.459000 },
    beds: 3,
    baths: 2,
    sqft: 120,
    imageUrl: 'https://picsum.photos/800/600?random=4',
    images: [
      'https://picsum.photos/800/600?random=4',
      'https://picsum.photos/800/600?random=401',
      'https://picsum.photos/800/600?random=402',
      'https://picsum.photos/800/600?random=403'
    ],
    description: 'Excelente duplex con terraza propia, muy luminoso y silencioso. Cocina integrada y lavadero independiente.',
    features: ['Terraza', 'Lavadero', 'Luminoso', 'Cerca de Subte'],
    agent: {
      name: 'Lucas Gomez',
      photo: 'https://picsum.photos/100/100?random=13',
      phone: '+54 11 4444 5555'
    },
    status: 'available'
  },
  {
    id: '5',
    title: 'Casona Antigua Reciclada',
    price: 550000,
    currency: 'USD',
    type: 'House',
    operation: 'Sale',
    location: 'San Telmo, Buenos Aires',
    coordinates: { lat: -34.621500, lng: -58.374000 },
    beds: 5,
    baths: 4,
    sqft: 350,
    imageUrl: 'https://picsum.photos/800/600?random=5',
    images: [
      'https://picsum.photos/800/600?random=5',
      'https://picsum.photos/800/600?random=501',
      'https://picsum.photos/800/600?random=502',
      'https://picsum.photos/800/600?random=503',
      'https://picsum.photos/800/600?random=504'
    ],
    description: 'Joya arquitectónica en el corazón de San Telmo. Pisos de pinotea, techos altos y patio central.',
    features: ['Patio', 'Histórico', 'Techos Altos', 'Sótano'],
    agent: {
      name: 'Elena Quintero',
      photo: 'https://picsum.photos/100/100?random=14',
      phone: '+54 11 6666 7777'
    },
    status: 'available'
  },
  {
    id: '6',
    title: 'Monoambiente Moderno',
    price: 500,
    currency: 'USD',
    type: 'Apartment',
    operation: 'Rent',
    location: 'Villa Crespo, Buenos Aires',
    coordinates: { lat: -34.599000, lng: -58.442000 },
    beds: 1,
    baths: 1,
    sqft: 35,
    imageUrl: 'https://picsum.photos/800/600?random=6',
    images: [
      'https://picsum.photos/800/600?random=6',
      'https://picsum.photos/800/600?random=601'
    ],
    description: 'Ideal para estudiantes o primera vivienda. Edificio con laundry y SUM.',
    features: ['SUM', 'Laundry', 'Balcón', 'Bajas Expensas'],
    agent: {
      name: 'Javier Lopez',
      photo: 'https://picsum.photos/100/100?random=15',
      phone: '+54 11 8888 9999'
    },
    status: 'available'
  }
];

export const MOCK_DEVELOPMENTS: Development[] = [
  {
    id: 'dev-1',
    title: 'Torre Madero Harbor',
    priceFrom: 350000,
    currency: 'USD',
    location: 'Puerto Madero, Buenos Aires',
    coordinates: { lat: -34.6145, lng: -58.3620 },
    status: 'In Construction',
    deliveryDate: 'Diciembre 2025',
    unitsAvailable: 15,
    imageUrl: 'https://picsum.photos/800/600?random=20',
    images: ['https://picsum.photos/800/600?random=20'],
    description: 'La torre más exclusiva del dique 1.',
    features: ['Spa', 'Helipuerto', 'Cava de Vinos', 'Concierge']
  },
  {
    id: 'dev-2',
    title: 'Barrio Náutico El Encuentro',
    priceFrom: 180000,
    currency: 'USD',
    location: 'Tigre, Buenos Aires',
    coordinates: { lat: -34.4089, lng: -58.6498 },
    status: 'Pre-sale',
    deliveryDate: 'Marzo 2026',
    unitsAvailable: 40,
    imageUrl: 'https://picsum.photos/800/600?random=30',
    images: ['https://picsum.photos/800/600?random=30'],
    description: 'Lotes con salida al río en preventa exclusiva.',
    features: ['Laguna', 'Seguridad Triple', 'Club House', 'Tenis']
  },
  {
    id: 'dev-3',
    title: 'Edificio Link Nuñez',
    priceFrom: 120000,
    currency: 'USD',
    location: 'Nuñez, Buenos Aires',
    coordinates: { lat: -34.5458, lng: -58.4639 },
    status: 'Ready',
    deliveryDate: 'Entrega Inmediata',
    unitsAvailable: 5,
    imageUrl: 'https://picsum.photos/800/600?random=40',
    images: ['https://picsum.photos/800/600?random=40'],
    description: 'Unidades apto profesional a metros de Av. Libertador.',
    features: ['Rooftop', 'Coworking', 'Bike Parking', 'Smart Building']
  }
];

export const MOCK_AGENTS: Agent[] = [
  {
    id: 'a1',
    name: 'Camila Rodriguez',
    role: 'Agente Senior',
    email: 'crodriguez@inmofuture.com',
    phone: '+54 11 1234 5678',
    photo: 'https://picsum.photos/200/200?random=10',
    location: 'Palermo, CABA',
    listingsCount: 12
  },
  {
    id: 'a2',
    name: 'Martin Perez',
    role: 'Líder de Equipo',
    email: 'mperez@inmofuture.com',
    phone: '+54 11 8765 4321',
    photo: 'https://picsum.photos/200/200?random=11',
    location: 'Tigre, Buenos Aires',
    listingsCount: 24
  },
  {
    id: 'a3',
    name: 'Sofia Martinez',
    role: 'Agente Inmobiliario',
    email: 'smartinez@inmofuture.com',
    phone: '+54 11 2222 3333',
    photo: 'https://picsum.photos/200/200?random=12',
    location: 'Centro, CABA',
    listingsCount: 8
  },
  {
    id: 'a4',
    name: 'Lucas Gomez',
    role: 'Especialista Residencial',
    email: 'lgomez@inmofuture.com',
    phone: '+54 11 4444 5555',
    photo: 'https://picsum.photos/200/200?random=13',
    location: 'Belgrano, CABA',
    listingsCount: 15
  },
  {
    id: 'a5',
    name: 'Elena Quintero',
    role: 'Agente de Lujo',
    email: 'equintero@inmofuture.com',
    phone: '+54 11 6666 7777',
    photo: 'https://picsum.photos/200/200?random=14',
    location: 'San Isidro, Buenos Aires',
    listingsCount: 18
  },
  {
    id: 'a6',
    name: 'Javier Lopez',
    role: 'Agente Inmobiliario',
    email: 'jlopez@inmofuture.com',
    phone: '+54 11 8888 9999',
    photo: 'https://picsum.photos/200/200?random=15',
    location: 'Villa Crespo, CABA',
    listingsCount: 6
  }
];

export const MOCK_OFFICES: Office[] = [
  {
    id: 'off-1',
    name: 'InmoFuture Palermo',
    address: 'Av. Santa Fe 3400, Palermo',
    phone: '+54 11 4000 1000',
    email: 'palermo@inmofuture.com',
    imageUrl: 'https://picsum.photos/600/400?random=50',
    location: 'Palermo, CABA'
  },
  {
    id: 'off-2',
    name: 'InmoFuture Norte',
    address: 'Av. Libertador 14500, San Isidro',
    phone: '+54 11 4000 2000',
    email: 'norte@inmofuture.com',
    imageUrl: 'https://picsum.photos/600/400?random=51',
    location: 'San Isidro, GBA Norte'
  },
  {
    id: 'off-3',
    name: 'InmoFuture Puerto Madero',
    address: 'Juana Manso 1200, Puerto Madero',
    phone: '+54 11 4000 3000',
    email: 'madero@inmofuture.com',
    imageUrl: 'https://picsum.photos/600/400?random=52',
    location: 'Puerto Madero, CABA'
  },
  {
    id: 'off-4',
    name: 'InmoFuture Nordelta',
    address: 'Av. De los Lagos 200, Tigre',
    phone: '+54 11 4000 4000',
    email: 'nordelta@inmofuture.com',
    imageUrl: 'https://picsum.photos/600/400?random=53',
    location: 'Nordelta, Tigre'
  }
];

export const MOCK_BLOG_POSTS: BlogPost[] = [
  {
    id: 'blog-1',
    title: 'Tendencias del Mercado Inmobiliario 2024',
    excerpt: 'Analizamos cómo evolucionarán los precios y la demanda en los principales barrios de Buenos Aires durante este año.',
    content: 'Lorem ipsum...',
    author: 'Martina Silva',
    date: '15 Oct, 2024',
    imageUrl: 'https://picsum.photos/800/400?random=60',
    category: 'Mercado'
  },
  {
    id: 'blog-2',
    title: 'Guía para Comprar tu Primera Casa',
    excerpt: 'Todo lo que necesitás saber antes de dar el gran paso: trámites, gastos ocultos y consejos para negociar.',
    content: 'Lorem ipsum...',
    author: 'Juan Perez',
    date: '10 Oct, 2024',
    imageUrl: 'https://picsum.photos/800/400?random=61',
    category: 'Consejos'
  },
  {
    id: 'blog-3',
    title: 'Decoración Minimalista: Menos es Más',
    excerpt: 'Descubrí cómo transformar tus espacios utilizando la filosofía minimalista para ganar amplitud y luminosidad.',
    content: 'Lorem ipsum...',
    author: 'Lucia Mendez',
    date: '05 Oct, 2024',
    imageUrl: 'https://picsum.photos/800/400?random=62',
    category: 'Decoración'
  },
  {
    id: 'blog-4',
    title: 'Inversiones en Pozo: ¿Conviene?',
    excerpt: 'Evaluamos los riesgos y beneficios de invertir en proyectos en construcción en el contexto económico actual.',
    content: 'Lorem ipsum...',
    author: 'Carlos Ruiz',
    date: '28 Sep, 2024',
    imageUrl: 'https://picsum.photos/800/400?random=63',
    category: 'Inversión'
  }
];