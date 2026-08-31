// context/CartContext.tsx
'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { createCart, addToCart, getCart } from '@/lib/shopify';

interface CartItem {
  id: string;
  quantity: number;
  merchandise: {
    id: string;
    title: string;
    price: {
      amount: string;
      currencyCode: string;
    };
    product: {
      title: string;
      images: {
        edges: Array<{
          node: {
            url: string;
            altText: string;
          };
        }>;
      };
    };
  };
}

interface CartContextType {
  cartId: string | null;
  items: CartItem[];
  totalQuantity: number;
  totalPrice: string;
  checkoutUrl: string | null;
  addItem: (variantId: string, quantity: number) => Promise<void>;
  updateQuantity: (lineId: string, quantity: number) => Promise<void>;
  removeItem: (lineId: string) => Promise<void>;
  clearCart: () => void;
  loading: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartId, setCartId] = useState<string | null>(null);
  const [items, setItems] = useState<CartItem[]>([]);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalPrice, setTotalPrice] = useState('0.00');
  const [checkoutUrl, setCheckoutUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCartId = localStorage.getItem('aurel_cart_id');
    if (savedCartId) {
      setCartId(savedCartId);
      fetchCart(savedCartId);
    }
  }, []);

  const fetchCart = async (id: string) => {
    try {
      const cart = await getCart(id);
      if (cart) {
        setItems(cart.lines.edges.map((edge: any) => edge.node));
        setTotalQuantity(cart.totalQuantity);
        setTotalPrice(cart.cost.totalAmount.amount);
        setCheckoutUrl(cart.checkoutUrl);
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  const addItem = async (variantId: string, quantity: number) => {
    setLoading(true);
    try {
      const line = { merchandiseId: variantId, quantity };

      if (!cartId) {
        // Create new cart
        const newCart = await createCart([line]);
        if (newCart) {
          setCartId(newCart.id);
          localStorage.setItem('aurel_cart_id', newCart.id);
          setItems(newCart.lines.edges.map((edge: any) => edge.node));
          setTotalQuantity(newCart.totalQuantity);
          setTotalPrice(newCart.cost.totalAmount.amount);
          setCheckoutUrl(newCart.checkoutUrl);
        }
      } else {
        // Add to existing cart
        const updatedCart = await addToCart(cartId, [line]);
        if (updatedCart) {
          setItems(updatedCart.lines.edges.map((edge: any) => edge.node));
          setTotalQuantity(updatedCart.totalQuantity);
          setTotalPrice(updatedCart.cost.totalAmount.amount);
          setCheckoutUrl(updatedCart.checkoutUrl);
        }
      }
    } catch (error) {
      console.error('Error adding item:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (lineId: string, quantity: number) => {
    // Implementation for updating quantity
    // Similar to addItem but using cartLinesUpdate
  };

  const removeItem = async (lineId: string) => {
    // Implementation for removing item
  };

  const clearCart = () => {
    setCartId(null);
    setItems([]);
    setTotalQuantity(0);
    setTotalPrice('0.00');
    setCheckoutUrl(null);
    localStorage.removeItem('aurel_cart_id');
  };

  return (
    <CartContext.Provider
      value={{
        cartId,
        items,
        totalQuantity,
        totalPrice,
        checkoutUrl,
        addItem,
        updateQuantity,
        removeItem,
        clearCart,
        loading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
