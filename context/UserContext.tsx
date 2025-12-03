import React, { createContext, ReactNode, useContext, useState } from 'react';
import { ImageSourcePropType } from 'react-native';

interface UserContextType {
  name: string;
  setName: (name: string) => void;
  avatar: ImageSourcePropType;
  setAvatar: (avatar: ImageSourcePropType) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [name, setName] = useState<string>('Usuario');
  const [avatar, setAvatar] = useState<ImageSourcePropType>(require('../assets/images/avatar_4.png'));

  return (
    <UserContext.Provider value={{ name, setName, avatar, setAvatar }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
