
export interface Blend {
  id: number;
  name: string;
  segment: string;
  heroClaim: string;
  composition: string;
  targetDemographic: string;
  priceString: string; // The raw string from CSV
  price: number; // Extracted numeric price
  protein: number;
  fiber: number;
  iron: number;
  calcium: number;
  fat: number;
  carbs: number;
  gi: number;
  gl: number;
  calories: number;
  certifications: string;
  kneadingInstructions: string;
  rollingInstructions: string;
  cookingInstructions: string;
  storageInstructions: string;
  pairsWithVeg: string;
  pairsWithProtein: string;
  mealIdeaTitle: string;
  mealIngredients: string;
  mealBenefits: string;
  processingTechniques: string;
  bioavailabilityNotes: string;
  sensoryExpectations: string;
  rotiQualityScore: number;
  image: string;
  stock?: number; // Inventory tracking
}

export interface CartItem extends Blend {
  quantity: number;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  total: number;
  status: 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  shippingAddress: string;
  customerName?: string;
  customerEmail?: string;
}

export interface User {
  name: string;
  email: string;
  role?: 'admin' | 'customer';
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  zip?: string;
  orders: Order[];
}

export interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Blend) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
}

export interface DataContextType {
  products: Blend[];
  orders: Order[];
  users: User[];
  addProduct: (product: Blend) => void;
  updateProduct: (product: Blend) => void;
  deleteProduct: (id: number) => void;
  placeOrder: (order: Order) => void;
  updateOrderStatus: (id: string, status: Order['status']) => void;
  registerUser: (user: User) => void;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<{ error: any }>;
  signup: (email: string, password: string, name: string) => Promise<{ error: any }>;
  logout: () => Promise<void>;
  addOrder: (order: Order) => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
  isAuthenticated: boolean;
  loading: boolean;
}
