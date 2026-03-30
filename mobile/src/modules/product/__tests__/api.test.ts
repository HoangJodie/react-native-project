import { productService } from '../api';
import apiClient from '../../../shared/lib/apiClient';

jest.mock('../../../shared/lib/apiClient', () => ({
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
}));

describe('productService', () => {
    it('list calls get with params', async () => {
        (apiClient.get as jest.Mock).mockResolvedValue([]);
        await productService.list({ name: 'a', priceUnit: 'dollar' });
        expect(apiClient.get).toHaveBeenCalledWith('/product', { params: { name: 'a', priceUnit: 'dollar' } });
    });

    it('get calls correct url', async () => {
        (apiClient.get as jest.Mock).mockResolvedValue({});
        await productService.get(1);
        expect(apiClient.get).toHaveBeenCalledWith('/product/1');
    });
});
