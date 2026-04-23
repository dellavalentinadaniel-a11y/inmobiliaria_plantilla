import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from './firebase';
import { MOCK_PROPERTIES, MOCK_DEVELOPMENTS, MOCK_AGENTS, MOCK_BLOG_POSTS } from './mockData';

export const seedDatabase = async () => {
  if (!db) {
    console.error("Firebase not initialized. Cannot seed database.");
    return { success: false, message: "Firebase not initialized" };
  }

  try {
    console.log("Starting database seed...");

    // Helper to seed a collection
    const seedCollection = async (collectionName: string, data: any[]) => {
      const colRef = collection(db, collectionName);
      
      // Optional: Clear existing data first? 
      // For safety, we'll just add.
      
      const promises = data.map(item => {
        // Remove ID if it's meant to be auto-generated, or keep if manual
        // In our case, we'll keep the IDs for consistency or let Firebase generate
        const { id, ...itemData } = item;
        return addDoc(colRef, itemData);
      });

      await Promise.all(promises);
      console.log(`Seeded ${data.length} items into ${collectionName}`);
    };

    await seedCollection('properties', MOCK_PROPERTIES);
    await seedCollection('developments', MOCK_DEVELOPMENTS);
    await seedCollection('agents', MOCK_AGENTS);
    await seedCollection('blogPosts', MOCK_BLOG_POSTS);

    console.log("Database seeded successfully!");
    return { success: true, message: "Base de datos poblada con éxito" };
  } catch (error) {
    console.error("Error seeding database:", error);
    return { success: false, message: "Error al poblar la base de datos: " + (error as Error).message };
  }
};
