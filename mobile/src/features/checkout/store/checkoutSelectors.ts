import { RootState } from '../../../app/store';

export const selectCart = (state: RootState) => state.checkout.cart;
export const selectPaymentMethod = (state: RootState) => state.checkout.paymentMethod;
export const selectCheckoutLoading = (state: RootState) => state.checkout.loading;
export const selectCheckoutError = (state: RootState) => state.checkout.error;