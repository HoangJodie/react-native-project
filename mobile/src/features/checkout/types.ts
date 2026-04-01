export type PaymentMethod = 'credit_card' | 'debit_card' | 'paypal' | 'cash_on_delivery' | string;

export type OrderStatus = 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';

export interface OrderItem {
    productId: number;
    quantity: number;
    price: number;
}

export interface CreateOrderInput {
    items: OrderItem[];
    totalAmount: number;
    shippingAddress: string;
    paymentMethod: PaymentMethod;
}

export interface Order extends CreateOrderInput {
    id: number;
    userId?: number;
    status?: OrderStatus;
}
