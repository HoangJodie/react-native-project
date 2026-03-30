export const setGenericPassword = jest.fn(async () => true);
export const getGenericPassword = jest.fn(async () => ({ username: 'accessToken', password: 'token' }));
export const resetGenericPassword = jest.fn(async () => true);
