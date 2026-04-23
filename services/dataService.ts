import { collection, getDocs, query, where, limit, doc, getDoc } from 'firebase/firestore';
import { db } from './firebase';
import { MOCK_PROPERTIES, MOCK_DEVELOPMENTS, MOCK_AGENTS, MOCK_OFFICES, MOCK_BLOG_POSTS } from './mockData';
import { Property, Development, Agent, Office, BlogPost } from '../types';

// Toggle this to use real Firestore data
const USE_FIRESTORE = false;

export const getProperties = async (): Promise<Property[]> => {
  if (!USE_FIRESTORE || !db) return MOCK_PROPERTIES;
  
  try {
    const querySnapshot = await getDocs(collection(db, 'properties'));
    if (querySnapshot.empty) return MOCK_PROPERTIES;
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Property));
  } catch (error) {
    console.error('Error fetching properties:', error);
    return MOCK_PROPERTIES;
  }
};

export const getDevelopments = async (): Promise<Development[]> => {
  if (!USE_FIRESTORE || !db) return MOCK_DEVELOPMENTS;
  
  try {
    const querySnapshot = await getDocs(collection(db, 'developments'));
    if (querySnapshot.empty) return MOCK_DEVELOPMENTS;
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Development));
  } catch (error) {
    console.error('Error fetching developments:', error);
    return MOCK_DEVELOPMENTS;
  }
};

export const getAgents = async (): Promise<Agent[]> => {
  if (!USE_FIRESTORE || !db) return MOCK_AGENTS;
  
  try {
    const querySnapshot = await getDocs(collection(db, 'agents'));
    if (querySnapshot.empty) return MOCK_AGENTS;
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Agent));
  } catch (error) {
    console.error('Error fetching agents:', error);
    return MOCK_AGENTS;
  }
};

export const getBlogPosts = async (): Promise<BlogPost[]> => {
  if (!USE_FIRESTORE || !db) return MOCK_BLOG_POSTS;
  
  try {
    const querySnapshot = await getDocs(collection(db, 'blogPosts'));
    if (querySnapshot.empty) return MOCK_BLOG_POSTS;
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as BlogPost));
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return MOCK_BLOG_POSTS;
  }
};

export const getOffices = async (): Promise<Office[]> => {
  if (!USE_FIRESTORE || !db) return MOCK_OFFICES;
  return MOCK_OFFICES; // Offices might remain static or moved to DB later
};
