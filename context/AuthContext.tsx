
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, Order } from '../types';
import { useData } from './DataContext';
import { supabase } from '../lib/supabaseClient';
import { AuthContextType } from '../types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { placeOrder, users, registerUser } = useData();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Initialize Auth State and Listen for Changes
  useEffect(() => {
    // Check active session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        mapSessionToUser(session.user);
      } else {
        setUser(null);
        setLoading(false);
      }
    });

    // Listen for changes (sign in, sign out, etc.)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        mapSessionToUser(session.user);
      } else {
        setUser(null);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []); 

  // Helper to map Supabase User to App User
  const mapSessionToUser = async (supabaseUser: any) => {
    const email = supabaseUser.email || '';
    const metadata = supabaseUser.user_metadata || {};
    const name = metadata.name || email.split('@')[0];
    const role = email === 'admin@ancientharvest.co' ? 'admin' : 'customer';

    // Fetch Persistent Orders from Supabase DB
    let orders: Order[] = [];
    
    const { data: ordersData, error } = await supabase
      .from('orders')
      .select('*')
      .eq('user_id', supabaseUser.id)
      .order('created_at', { ascending: false });

    if (!error && ordersData) {
      orders = ordersData.map((o: any) => ({
        id: o.id,
        // Convert timestamp to display string
        date: new Date(o.created_at).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' }),
        items: o.items || [],
        total: o.total,
        status: o.status,
        shippingAddress: o.shipping_address,
        customerName: o.customer_name,
        customerEmail: o.customer_email
      }));
    } else {
      console.error('Error fetching orders:', error);
    }

    const currentUser: User = {
      name,
      email,
      role,
      phone: metadata.phone || '',
      address: metadata.address || '',
      city: metadata.city || '',
      state: metadata.state || '',
      zip: metadata.zip || '',
      orders
    };

    // Sync with global user registry for Admin Panel visibility
    // Note: In a real backend app, admin would query the DB directly.
    registerUser(currentUser);

    setUser(currentUser);
    setLoading(false);
  };

  const login = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { error };
  };

  const signup = async (email: string, password: string, name: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name: name,
        },
      },
    });
    return { error };
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  const addOrder = async (order: Order) => {
    if (!user) return;

    // 1. Insert into Supabase Table for persistence
    const { error } = await supabase.from('orders').insert({
      id: order.id,
      user_id: (await supabase.auth.getUser()).data.user?.id,
      total: order.total,
      status: order.status,
      shipping_address: order.shippingAddress,
      customer_name: order.customerName,
      customer_email: order.customerEmail,
      items: order.items
      // created_at is handled by default value in DB
    });

    if (error) {
      console.error("Error saving order:", error);
      // We might want to throw here or handle offline logic
    }
    
    // 2. Update Local State for immediate UI feedback
    const updatedOrders = [order, ...user.orders];
    const updatedUser = { ...user, orders: updatedOrders };
    setUser(updatedUser);
    
    // 3. Push to Global Data Context (for Admin Panel visibility in current session)
    placeOrder({ ...order, customerEmail: user.email, customerName: user.name });
  };

  const updateProfile = async (data: Partial<User>) => {
    if (!user) return;

    // Update Supabase Metadata
    const { error } = await supabase.auth.updateUser({
      data: {
        name: data.name ?? user.name,
        phone: data.phone ?? user.phone,
        address: data.address ?? user.address,
        city: data.city ?? user.city,
        state: data.state ?? user.state,
        zip: data.zip ?? user.zip,
      }
    });

    if (error) {
      console.error("Error updating profile:", error);
      throw error;
    }

    // Optimistic UI Update
    setUser(prev => prev ? { ...prev, ...data } : null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, addOrder, updateProfile, isAuthenticated: !!user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
