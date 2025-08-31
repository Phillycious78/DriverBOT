import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Driver {
  id: string;
  name: string;
  pin: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  currentDriver: Driver | null;
  login: (pin: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

// Mock drivers data
const drivers: Driver[] = [
  { id: '1', name: 'Driver', pin: '1234' },
  { id: 'admin', name: 'Admin', pin: '0000' },
];

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentDriver, setCurrentDriver] = useState<Driver | null>(null);

  const login = (pin: string): boolean => {
    const driver = drivers.find(d => d.pin === pin);
    if (driver) {
      setCurrentDriver(driver);
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    setCurrentDriver(null);
    setIsAuthenticated(false);
  };

  const value = {
    isAuthenticated,
    currentDriver,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};