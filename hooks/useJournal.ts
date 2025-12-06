import {
    addDoc,
    collection,
    onSnapshot,
    orderBy,
    query,
    serverTimestamp,
    Timestamp
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../config/firebaseConfig';
import { useUser } from '../context/UserContext';

export interface JournalEntry {
  id: string;
  date: string;
  text: string;
  mood: string;
  createdAt?: any;
}

export function useJournal() {
  const { user } = useUser();
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.uid) {
      setEntries([]);
      setLoading(false);
      return;
    }

    // Referencia a la colección de entradas del usuario
    const entriesRef = collection(db, 'users', user.uid, 'journal_entries');
    
    // Query ordenado por fecha de creación descendente
    const q = query(entriesRef, orderBy('createdAt', 'desc'));

    // Suscripción a cambios en tiempo real
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const loadedEntries: JournalEntry[] = snapshot.docs.map(doc => {
        const data = doc.data();
        
        // Formatear fecha desde el Timestamp de Firestore
        let formattedDate = '';
        if (data.createdAt) {
            const dateObj = (data.createdAt as Timestamp).toDate();
            const day = dateObj.getDate();
            const month = dateObj.toLocaleString('es-ES', { month: 'long' });
            const year = dateObj.getFullYear();
            const monthCapitalized = month.charAt(0).toUpperCase() + month.slice(1);
            formattedDate = `${day} de ${monthCapitalized}, ${year}`;
        } else {
            formattedDate = 'Reciente';
        }

        return {
          id: doc.id,
          text: data.text,
          mood: data.mood,
          date: formattedDate,
          createdAt: data.createdAt
        };
      });
      
      setEntries(loadedEntries);
      setLoading(false);
    }, (error) => {
      console.error("Error escuchando diario:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user?.uid]);

  const addEntry = async (text: string, mood: string) => {
    if (!user?.uid) return;

    try {
      await addDoc(collection(db, 'users', user.uid, 'journal_entries'), {
        text,
        mood,
        createdAt: serverTimestamp()
      });
    } catch (error) {
      console.error("Error al guardar entrada:", error);
      throw error;
    }
  };

  return { entries, loading, addEntry };
}
