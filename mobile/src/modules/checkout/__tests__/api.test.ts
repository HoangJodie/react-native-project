import { orderService } from '../api';
import apiClient from '../../../shared/lib/apiClient';

jest.mock('../../../shared/lib/apiClient');

const mockApiClient = apiClient as jest.Mocked<typeof apiClient>;

describe('orderService', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('getPaymentMethods', () => {
        it('should call apiClient.get with correct endpoint', async () => {
            const mockPaymentMethods = ['credit_card', 'paypal'];
            mockApiClient.get.mockResolvedValue(mockPaymentMethods);

            const result = await orderService.getPaymentMethods();

            expect(mockApiClient.get).toHaveBeenCalledWith('/order/payment-methods');
            expect(result).toEqual(mockPaymentMethods);
        });

        it('should handle api errors', async () => {
            const error = new Error('API Error');
            mockApiClient.get.mockRejectedValue(error);

            await expect(orderService.getPaymentMethods()).rejects.toThrow('API Error');
        });
    });

    describe('createOrder', () => {
        it('should call apiClient.post with correct endpoint and payload', async () => {
            const mockOrder = { id: 1, items: [], totalAmount: 100 };
            const payload = {
                items: [{ productId: 1, quantity: 1, price: 100 }],
                totalAmount: 100,
                shippingAddress: '123 Main St',
                paymentMethod: 'credit_card' as const,
            };
            mockApiClient.post.mockResolvedValue(mockOrder);

            const result = await orderService.createOrder(payload);

            expect(mockApiClient.post).toHaveBeenCalledWith('/order', payload);
            expect(result).toEqual(mockOrder);
        });

        it('should handle api errors', async () => {
            const error = new Error('API Error');
            const payload = {
                items: [],
                totalAmount: 0,
                shippingAddress: '',
                paymentMethod: 'cash' as const,
            };
            mockApiClient.post.mockRejectedValue(error);

            await expect(orderService.createOrder(payload)).rejects.toThrow('API Error');
        });
    });
});