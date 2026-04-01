import apiClient from '../../shared/lib/apiClient';
import type { CreateOrderInput, Order, PaymentMethod } from './types';

export const orderService = {
    async getPaymentMethods(): Promise<PaymentMethod[]> {
        const response = (await apiClient.get<PaymentMethod[]>('/order/payment-methods')) as unknown as PaymentMethod[];
        return response;
    },
    async createOrder(payload: CreateOrderInput): Promise<Order> {
        const response = (await apiClient.post<Order>('/order', payload)) as unknown as Order;
        return response;
    },
};

export default orderService;
