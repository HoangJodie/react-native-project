import { useMutation } from '@tanstack/react-query';
import { orderService } from '../api';
import type { CreateOrderInput, Order } from '../types';

export const useCreateOrder = () => {
    return useMutation<Order, Error, CreateOrderInput>({
        mutationFn: (payload) => orderService.createOrder(payload),
    });
};

export default useCreateOrder;
