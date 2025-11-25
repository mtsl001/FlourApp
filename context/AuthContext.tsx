import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, Order } from '../types';
import { useData } from './DataContext';

interface AuthContextType {
  user: User | null;
  login: (email: string, password?: string, name?: string) => boolean;
  logout: () => void;
  addOrder: (order: Order) => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { placeOrder, users, registerUser } = useData();
  
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

  // Login function now strictly accepts email, password, and optionally name
  const login = (email: string, password?: string, name: string = 'Valued Customer'): boolean => {
    // Admin Login Check - STRICT check on email AND password
    if (email === 'admin@ancientharvest.co' && password === 'admin') {
      setUser({
        name: 'Admin',
        email: email,
        role: 'admin',
        orders: []
      });
      return true;
    }

    // Regular User Logic
    const existingUser = users.find(u => u.email === email);
    
    // Simulate loading history from local storage for this email if not found in context (legacy support)
    const existingHistory = localStorage.getItem(`ancientharvest_orders_${email}`);
    const localOrders = existingHistory ? JSON.parse(existingHistory) : [];

    // If user exists, use their name, otherwise use the provided name (or default)
    const userName = existingUser ? existingUser.name : name;

    const currentUser: User = existingUser || {
      name: userName,
      email,
      role: 'customer',
      orders: localOrders
    };

    if (!existingUser) {
      registerUser(currentUser);
    }

    setUser(currentUser);
    return true;
  };

  const logout = () => {
    setUser(null);
  };

  const addOrder = (order: Order) => {
    if (!user) return;
    
    const updatedOrders = [order, ...user.orders];
    const updatedUser = { ...user, orders: updatedOrders };
    
    setUser(updatedUser);
    localStorage.setItem(`ancientharvest_orders_${user.email}`, JSON.stringify(updatedOrders));
    
    // Also push to global DB
    placeOrder({ ...order, customerEmail: user.email, customerName: user.name });
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