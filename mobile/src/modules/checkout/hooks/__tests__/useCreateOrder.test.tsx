import { renderHook, waitFor } from '@testing-library/react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useCreateOrder } from '../useCreateOrder';
import { orderService } from '../../api';

jest.mock('../../api');

const mockOrderService = orderService as jest.Mocked<typeof orderService>;

const createWrapper = () => {
    const queryClient = new QueryClient({
        defaultOptions: {
            mutations: { retry: false },
        },
    });
    return ({ children }: { children: React.ReactNode }) => (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
};

describe('useCreateOrder', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should create order successfully', async () => {
        const mockOrder = { id: 1, items: [], totalAmount: 100 };
        const payload = {
            items: [{ productId: 1, quantity: 1, price: 100 }],
            totalAmount: 100,
            shippingAddress: '123 Main St',
            paymentMethod: 'credit_card' as const,
        };
        mockOrderService.createOrder.mockResolvedValue(mockOrder);

        const { result } = renderHook(() => useCreateOrder(), { wrapper: createWrapper() });

        result.current.mutate(payload);

        await waitFor(() => {
            expect(result.current.isSuccess).toBe(true);
        });

        expect(mockOrderService.createOrder).toHaveBeenCalledWith(payload);
        expect(result.current.data).toEqual(mockOrder);
    });

    it('should handle create order error', async () => {
        const error = new Error('Create order failed');
        const payload = {
            items: [],
            totalAmount: 0,
            shippingAddress: '',
            paymentMethod: 'cash' as const,
        };
        mockOrderService.createOrder.mockRejectedValue(error);

        const { result } = renderHook(() => useCreateOrder(), { wrapper: createWrapper() });

        result.current.mutate(payload);

        await waitFor(() => {
            expect(result.current.isError).toBe(true);
        });

        expect(result.current.error).toEqual(error);
    });
});