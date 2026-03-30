import { paramsSerializer } from '../../utils/paramsSerializer';

const mockRequestInterceptor: { handler?: (config: any) => any } = {};
const mockResponseInterceptor: { success?: (resp: any) => any; error?: (err: any) => any } = {};
let mockCreatedConfig: any;

jest.mock('axios', () => {
    const instance = {
        interceptors: {
            request: { use: (fn: any) => (mockRequestInterceptor.handler = fn) },
            response: {
                use: (success: any, error: any) => {
                    mockResponseInterceptor.success = success;
                    mockResponseInterceptor.error = error;
                },
            },
        },
    };
    const mockCreateFn = jest.fn((config) => {
        mockCreatedConfig = config;
        return instance;
    });
    const mockAxios: any = (...args: any[]) => mockCreateFn(...args);
    mockAxios.create = mockCreateFn;
    return {
        __esModule: true,
        default: mockAxios,
        create: mockCreateFn,
    };
});

const apiClient = require('../apiClient').default;

jest.mock('react-native-config', () => ({
    API_URL: 'https://api.test',
}));

const mockResetGenericPassword = jest.fn();
let mockCredentials: { password: string } | null = { password: 'secret' };
jest.mock('react-native-keychain', () => ({
    getGenericPassword: jest.fn(() => mockCredentials),
    resetGenericPassword: (...args: any[]) => mockResetGenericPassword(...args),
}));

describe('apiClient', () => {
    afterEach(() => {
        jest.clearAllMocks();
        mockCredentials = { password: 'secret' };
    });

    it('creates axios instance with defaults', () => {
        // apiClient is imported, so axios.create already executed.
        expect(mockCreatedConfig).toEqual(
            expect.objectContaining({
                baseURL: 'https://api.test',
                timeout: 5000,
                headers: expect.objectContaining({ 'Content-Type': 'application/json', Accept: 'application/json' }),
                paramsSerializer,
            })
        );
    });

    it('adds Authorization header when token exists', async () => {
        const config = { headers: {} };
        const result = await mockRequestInterceptor.handler?.(config);
        expect(result?.headers.Authorization).toBe('Bearer secret');
    });

    it('leaves headers untouched when no token', async () => {
        mockCredentials = null;
        const config = { headers: {} };
        const result = await mockRequestInterceptor.handler?.(config);
        expect(result?.headers.Authorization).toBeUndefined();
    });

    it('unwraps response data', () => {
        const payload = { data: { data: { ok: true } } };
        const unwrapped = mockResponseInterceptor.success?.(payload);
        expect(unwrapped).toEqual({ ok: true });
    });

    it('resets keychain on 401 and rejects', async () => {
        const error = { response: { status: 401 } };
        await expect(mockResponseInterceptor.error?.(error)).rejects.toBe(error);
        expect(mockResetGenericPassword).toHaveBeenCalled();
    });
});
