import { authService } from '../api';
import apiClient from '../../../shared/lib/apiClient';

jest.mock('../../../shared/lib/apiClient', () => ({
    post: jest.fn(),
    get: jest.fn(),
}));

describe('auth api', () => {
    it('login posts to /login', async () => {
        (apiClient.post as jest.Mock).mockResolvedValue({});
        await authService.login({ username: 'u', password: 'p' });
        expect(apiClient.post).toHaveBeenCalledWith('/login', { username: 'u', password: 'p' });
    });

    it('getCurrentUser fetches /user', async () => {
        (apiClient.get as jest.Mock).mockResolvedValue({});
        await authService.getCurrentUser();
        expect(apiClient.get).toHaveBeenCalledWith('/user');
    });

    it('logoutRemote posts to /logout', async () => {
        await authService.logoutRemote();
        expect(apiClient.post).toHaveBeenCalledWith('/logout');
    });
});
