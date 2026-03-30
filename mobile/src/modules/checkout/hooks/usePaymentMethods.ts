import { useQuery } from '@tanstack/react-query';
import { orderService } from '../api';
import type { PaymentMethod } from '../types';

export const usePaymentMethods = () => {
    return useQuery<PaymentMethod[]>({
        queryKey: ['payment-methods'],
        queryFn: () => orderService.getPaymentMethods(),
        staleTime: 10 * 60 * 1000,
        retry: 1,
    });
};

export default usePaymentMethods;
