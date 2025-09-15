import { create } from "zustand";

export const useCart = create((set, get) => ({
  cart: [],
  cartOpen: false,

  setCart: (cart) => set({ cart }),
  setCartOpen: (openFn) =>
    set((current) => ({ cartOpen: openFn(current.cartOpen) })),

  addToCart: (product) => {
    set((current) => {
      let newCart = [...current.cart, { ...product, count: 1 }];
      localStorage.setItem("cart", JSON.stringify(newCart));
      return { cart: newCart };
    });
  },

  removeFromCart: (product) => {
    set((current) => {
      let newCart = current.cart.filter((all) => all.id !== product.id);
      localStorage.setItem("cart", JSON.stringify(newCart));
      return { cart: newCart };
    });
  },

  isInCart: (product) => {
    let cart = get().cart;
    return cart.find((item) => item.id === product.id) !== undefined;
  },

  addCartItemAmount: (product) => {
    set((current) => {
      let newCart = current.cart.map((item) => {
        if (item.id !== product.id) {
          return item;
        }

        return { ...item, count: item.count + 1 };
      });
      localStorage.setItem("cart", JSON.stringify(newCart));
      return { cart: newCart };
    });
  },

  reduceCartItemAmount: (product) => {
    if (product.count <= 1) {
      get().removeFromCart(product);
      return;
    }

    set((current) => {
      let newCart = current.cart.map((item) => {
        if (item.id !== product.id) {
          return item;
        }

        return { ...item, count: item.count - 1 };
      });
      localStorage.setItem("cart", JSON.stringify(newCart));
      return { cart: newCart };
    });
  },
}));
