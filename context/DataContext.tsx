import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { DataContextType, Blend, Order, User } from '../types';
import { blends as initialBlends } from '../data/blends';

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // --- Products State ---
  const [products, setProducts] = useState<Blend[]>(() => {
    try {
      const stored = localStorage.getItem('ancientharvest_products');
      return stored ? JSON.parse(stored) : initialBlends;
    } catch {
      return initialBlends;
    }
  });

  // --- Orders State ---
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const stored = localStorage.getItem('ancientharvest_all_orders');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // --- Users State ---
  const [users, setUsers] = useState<User[]>(() => {
    try {
      const stored = localStorage.getItem('ancientharvest_users_db');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Persist changes
  useEffect(() => { localStorage.setItem('ancientharvest_products', JSON.stringify(products)); }, [products]);
  useEffect(() => { localStorage.setItem('ancientharvest_all_orders', JSON.stringify(orders)); }, [orders]);
  useEffect(() => { localStorage.setItem('ancientharvest_users_db', JSON.stringify(users)); }, [users]);

  // --- Actions ---

  const addProduct = (product: Blend) => {
    setProducts(prev => [...prev, product]);
  };

  const updateProduct = (updatedProduct: Blend) => {
    setProducts(prev => prev.map(p => p.id === updatedProduct.id ? updatedProduct : p));
  };

  const deleteProduct = (id: number) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const placeOrder = (order: Order) => {
    setOrders(prev => [order, ...prev]);
  };

  const updateOrderStatus = (id: string, status: Order['status']) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));
  };

  const registerUser = (user: User) => {
    setUsers(prev => {
      if (prev.find(u => u.email === user.email)) return prev;
      return [...prev, user];
    });
  };

  return (
    <DataContext.Provider value={{
      products,
      orders,
      users,
      addProduct,
      updateProduct,
      deleteProduct,
      placeOrder,
      updateOrderStatus,
      registerUser
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) throw new Error("useData must be used within a DataProvider");
  return context;
};
