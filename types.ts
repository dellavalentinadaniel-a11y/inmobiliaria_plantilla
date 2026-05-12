export interface Contract {
  startDate: string;
  endDate: string;
  increaseIntervalMonths: number;
}

export interface Property {
  id: string;
  title: string;
  price: number;
  currency: 'USD' | 'ARS';
  type: 'House' | 'Apartment' | 'Condo' | 'Land';
  operation: 'Sale' | 'Rent';
  location: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  beds: number;
  baths: number;
  sqft: number;
  imageUrl: string;
  images: string[];
  description: string;
  features: string[];
  agent: {
    name: string;
    photo: string;
    phone: string;
  };
  status: 'available' | 'sold' | 'rented';
  contract?: Contract;
}

export interface Development {
  id: string;
  title: string;
  priceFrom: number;
  currency: 'USD' | 'ARS';
  location: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  status: 'Pre-sale' | 'In Construction' | 'Ready';
  deliveryDate: string;
  unitsAvailable: number;
  imageUrl: string;
  images: string[];
  description: string;
  features: string[];
}

export interface Agent {
  id: string;
  name: string;
  role: string; // This can be "Position" but keeping it for compatibility
  email: string;
  phone: string;
  whatsapp?: string;
  photo: string;
  location: string;
  listingsCount: number;
  description?: string;
  office?: string;
  position?: string;
  website?: string;
}

export interface Office {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  imageUrl: string;
  location: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  imageUrl: string;
  category: string;
}

export interface FilterState {
  operation: 'Sale' | 'Rent';
  type: string;
  minPrice: number;
  maxPrice: number;
  location: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}