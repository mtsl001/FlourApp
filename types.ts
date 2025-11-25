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
}

export interface CartItem extends Blend {
  quantity: number;
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