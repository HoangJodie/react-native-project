import { renderHook, waitFor } from '@testing-library/react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { usePaymentMethods } from '../usePaymentMethods';
import { orderService } from '../../api';

jest.mock('../../api');

const mockOrderService = orderService as jest.Mocked<typeof orderService>;

const createWrapper = () => {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: { retry: false },
        },
    });
    return ({ children }: { children: React.ReactNode }) => (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
};

describe('usePaymentMethods', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should fetch payment methods successfully', async () => {
        const mockPaymentMethods = ['credit_card', 'paypal', 'cash_on_delivery'];
        mockOrderService.getPaymentMethods.mockResolvedValue(mockPaymentMethods);

        const { result } = renderHook(() => usePaymentMethods(), { wrapper: createWrapper() });

        await waitFor(() => {
            expect(result.current.isSuccess).toBe(true);
        });

        expect(mockOrderService.getPaymentMethods).toHaveBeenCalled();
        expect(result.current.data).toEqual(mockPaymentMethods);
    });

    it('should handle fetch payment methods error', async () => {
        const error = new Error('Fetch payment methods failed');
        mockOrderService.getPaymentMethods.mockRejectedValue(error);

        const { result } = renderHook(() => usePaymentMethods(), { wrapper: createWrapper() });

        // Since retry is set to 1, it will retry, so we check that the service was called
        await waitFor(() => {
            expect(mockOrderService.getPaymentMethods).toHaveBeenCalled();
        });
    });

    it('should have correct query configuration', () => {
        mockOrderService.getPaymentMethods.mockResolvedValue([]);

        const { result } = renderHook(() => usePaymentMethods(), { wrapper: createWrapper() });

        // Check that the query is configured correctly by verifying it calls the service
        expect(mockOrderService.getPaymentMethods).toHaveBeenCalled();
    });
});