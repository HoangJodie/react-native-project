import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CheckoutState {
  cart: any[]; // Define proper cart item type
  paymentMethod: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: CheckoutState = {
  cart: [],
  paymentMethod: null,
  loading: false,
  error: null,
};

const checkoutSlice = createSlice({
  name: 'checkout',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<any>) => {
      state.cart.push(action.payload);
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.cart = state.cart.filter((_, index) => index !== action.payload);
    },
    setPaymentMethod: (state, action: PayloadAction<string>) => {
      state.paymentMethod = action.payload;
    },
    clearCart: (state) => {
      state.cart = [];
      state.paymentMethod = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  setPaymentMethod,
  clearCart,
  setLoading,
  setError,
} = checkoutSlice.actions;

export const checkoutReducer = checkoutSlice.reducer;