
import React, { createContext, useContext, useState, useEffect } from 'react';

type Municipality = {
  id: string;
  name: string;
};

type User = {
  id: string;
  username: string;
  municipality: Municipality;
};

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock municipalities data
const municipalities = [
  { id: 'mun1', name: 'São Paulo' },
  { id: 'mun2', name: 'Rio de Janeiro' },
  { id: 'mun3', name: 'Belo Horizonte' },
  { id: 'mun4', name: 'Salvador' },
  { id: 'mun5', name: 'Brasília' },
];

// Mock users data - in a real app, this would be in a database
const mockUsers = [
  { id: 'user1', username: 'saopaulo', password: 'sp123', municipalityId: 'mun1' },
  { id: 'user2', username: 'rio', password: 'rj123', municipalityId: 'mun2' },
  { id: 'user3', username: 'bh', password: 'bh123', municipalityId: 'mun3' },
  { id: 'user4', username: 'salvador', password: 'sal123', municipalityId: 'mun4' },
  { id: 'user5', username: 'brasilia', password: 'bsb123', municipalityId: 'mun5' },
  { id: 'admin', username: 'admin', password: 'admin', municipalityId: 'all' }, // Admin with access to all
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  
  useEffect(() => {
    // Check for existing session on mount
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error('Failed to parse stored user:', error);
        localStorage.removeItem('user');
      }
    }
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    // Simulate API request delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const foundUser = mockUsers.find(
      u => u.username === username && u.password === password
    );
    
    if (foundUser) {
      const municipality = foundUser.municipalityId === 'all' 
        ? { id: 'all', name: 'Todos os Municípios' }
        : municipalities.find(m => m.id === foundUser.municipalityId)!;
      
      const userWithMunicipality = {
        id: foundUser.id,
        username: foundUser.username,
        municipality
      };
      
      setUser(userWithMunicipality);
      localStorage.setItem('user', JSON.stringify(userWithMunicipality));
      return true;
    }
    
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
