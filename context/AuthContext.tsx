import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, Order } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, name?: string) => void;
  logout: () => void;
  addOrder: (order: Order) => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const stored = localStorage.getItem('ancientharvest_user');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('ancientharvest_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('ancientharvest_user');
    }
  }, [user]);

  const login = (email: string, name: string = 'Valued Customer') => {
    // In a real app, this would validate against a backend
    // For MVP, we simulate a successful login and restore history if available
    const existingHistory = localStorage.getItem(`ancientharvest_orders_${email}`);
    const orders = existingHistory ? JSON.parse(existingHistory) : [];
    
    setUser({
      name,
      email,
      orders
    });
  };

  const logout = () => {
    setUser(null);
  };

  const addOrder = (order: Order) => {
    if (!user) return;
    
    const updatedOrders = [order, ...user.orders];
    const updatedUser = { ...user, orders: updatedOrders };
    
    setUser(updatedUser);
    // Persist orders specifically for this email so they survive logout/login
    localStorage.setItem(`ancientharvest_orders_${user.email}`, JSON.stringify(updatedOrders));
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, addOrder, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
