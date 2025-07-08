import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  id: string;
  product_id: string;
  name: string;
  price: number;
  image_url: string;
  quantity: number;
  stock: number;
}

export interface User {
  id: string;
  email: string;
  full_name: string | null;
  role: 'user' | 'admin';
}

interface Store {
  // Auth
  user: User | null;
  setUser: (user: User | null) => void;
  
  // Cart
  cartItems: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  
  // Favorites
  favorites: string[];
  addToFavorites: (productId: string) => void;
  removeFromFavorites: (productId: string) => void;
  isFavorite: (productId: string) => boolean;
}

export const useStore = create<Store>()(
  persist(
    (set, get) => ({
      // Auth
      user: null,
      setUser: (user) => set({ user }),
      
      // Cart
      cartItems: [],
      addToCart: (item) => {
        const cartItems = get().cartItems;
        const existingItem = cartItems.find(cartItem => cartItem.product_id === item.product_id);
        
        if (existingItem) {
          set({
            cartItems: cartItems.map(cartItem =>
              cartItem.product_id === item.product_id
                ? { ...cartItem, quantity: Math.min(cartItem.quantity + 1, cartItem.stock) }
                : cartItem
            )
          });
        } else {
          set({
            cartItems: [...cartItems, { ...item, quantity: 1 }]
          });
        }
      },
      removeFromCart: (productId) => {
        set({
          cartItems: get().cartItems.filter(item => item.product_id !== productId)
        });
      },
      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(productId);
          return;
        }
        
        set({
          cartItems: get().cartItems.map(item =>
            item.product_id === productId
              ? { ...item, quantity: Math.min(quantity, item.stock) }
              : item
          )
        });
      },
      clearCart: () => set({ cartItems: [] }),
      getTotalItems: () => get().cartItems.reduce((total, item) => total + item.quantity, 0),
      getTotalPrice: () => get().cartItems.reduce((total, item) => total + (item.price * item.quantity), 0),
      
      // Favorites
      favorites: [],
      addToFavorites: (productId) => {
        const favorites = get().favorites;
        if (!favorites.includes(productId)) {
          set({ favorites: [...favorites, productId] });
        }
      },
      removeFromFavorites: (productId) => {
        set({
          favorites: get().favorites.filter(id => id !== productId)
        });
      },
      isFavorite: (productId) => get().favorites.includes(productId),
    }),
    {
      name: 'luxemarket-store',
      partialize: (state) => ({
        cartItems: state.cartItems,
        favorites: state.favorites,
      }),
    }
  )
);