import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut
} from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { ImageSourcePropType } from 'react-native';
import { auth, db } from '../config/firebaseConfig';

// Mapa de avatares para convertir string -> require
const AVATAR_MAP: { [key: string]: ImageSourcePropType } = {
  'avatar_1': require('../assets/images/avatar_1.png'),
  'avatar_2': require('../assets/images/avatar_2.png'),
  'avatar_3': require('../assets/images/avatar_3.png'),
  'avatar_4': require('../assets/images/avatar_4.png'),
  'avatar_5': require('../assets/images/avatar_5.png'),
  'avatar_6': require('../assets/images/avatar_6.png'),
  'avatar_7': require('../assets/images/avatar_7.png'),
  'avatar_8': require('../assets/images/avatar_8.png'),
  'avatar_9': require('../assets/images/avatar_9.png'),
};

type UserData = {
  uid: string;
  email: string | null;
  name: string;
  avatar: ImageSourcePropType;
  avatarId: string; // Guardamos también el ID para referencias
};

type UserContextType = {
  user: UserData | null;
  loading: boolean;
  login: (email: string, pass: string) => Promise<void>;
  register: (email: string, pass: string, name: string, avatarId: string) => Promise<void>;
  logout: () => Promise<void>;
  updateUserAvatar: (avatarId: string) => Promise<void>;
};

const UserContext = createContext<UserContextType>({} as UserContextType);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  // Escuchar cambios de sesión
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        try {
          const docRef = doc(db, "users", currentUser.uid);
          const docSnap = await getDoc(docRef);
          
          if (docSnap.exists()) {
            const data = docSnap.data();
            const avatarId = data.avatar || 'avatar_4';
            setUser({ 
              uid: currentUser.uid, 
              email: currentUser.email, 
              name: data.name || 'Usuario',
              avatarId: avatarId,
              avatar: AVATAR_MAP[avatarId] || AVATAR_MAP['avatar_4']
            });
          } else {
            // Usuario autenticado pero sin datos en Firestore (raro, pero posible)
            setUser({ 
              uid: currentUser.uid, 
              email: currentUser.email, 
              name: 'Usuario', 
              avatarId: 'avatar_4',
              avatar: AVATAR_MAP['avatar_4'] 
            });
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const login = async (email: string, pass: string) => {
    await signInWithEmailAndPassword(auth, email, pass);
  };

  const register = async (email: string, pass: string, name: string, avatarId: string) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
    const newUser = userCredential.user;

    await setDoc(doc(db, "users", newUser.uid), {
      name: name,
      avatar: avatarId,
      createdAt: new Date()
    });
  };

  const logout = async () => {
    await signOut(auth);
  };

  const updateUserAvatar = async (avatarId: string) => {
    if (!user) return;
    
    // Actualizar en Firestore
    const docRef = doc(db, "users", user.uid);
    await updateDoc(docRef, {
      avatar: avatarId
    });

    // Actualizar estado local
    setUser(prev => prev ? {
      ...prev,
      avatarId: avatarId,
      avatar: AVATAR_MAP[avatarId] || AVATAR_MAP['avatar_4']
    } : null);
  };

  return (
    <UserContext.Provider value={{ user, loading, login, register, logout, updateUserAvatar }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);


