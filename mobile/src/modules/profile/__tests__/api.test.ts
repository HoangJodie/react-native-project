import { getProfile, updateProfile } from '../api';
import apiClient from '../../../shared/lib/apiClient';

jest.mock('../../../shared/lib/apiClient', () => ({
    get: jest.fn(),
    patch: jest.fn(),
}));

describe('profile api', () => {
    it('getProfile uses /user', async () => {
        (apiClient.get as jest.Mock).mockResolvedValue({});
        await getProfile();
        expect(apiClient.get).toHaveBeenCalledWith('/user');
    });

    it('updateProfile uses patch', async () => {
        (apiClient.patch as jest.Mock).mockResolvedValue({});
        await updateProfile({ firstName: 'A' });
        expect(apiClient.patch).toHaveBeenCalledWith('/user', { firstName: 'A' });
    });
});
