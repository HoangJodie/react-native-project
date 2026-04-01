import { profileService } from '../api';
import apiClient from '../../../shared/lib/apiClient';

jest.mock('../../../shared/lib/apiClient', () => ({
    get: jest.fn(),
    patch: jest.fn(),
}));

// Mock the api module to use the mocked apiClient
jest.mock('../api', () => {
    const apiClient = require('../../../shared/lib/apiClient');
    return {
        profileService: {
            getProfile: () => apiClient.get('/user'),
            updateProfile: (data: any) => apiClient.patch('/user', data),
        },
    };
});

describe('profile api', () => {
    it('getProfile uses /user', async () => {
        (apiClient.get as jest.Mock).mockResolvedValue({});
        await profileService.getProfile();
        expect(apiClient.get).toHaveBeenCalledWith('/user');
    });

    it('updateProfile uses patch', async () => {
        (apiClient.patch as jest.Mock).mockResolvedValue({});
        await profileService.updateProfile({ firstName: 'A' });
        expect(apiClient.patch).toHaveBeenCalledWith('/user', { firstName: 'A' });
    });
});
