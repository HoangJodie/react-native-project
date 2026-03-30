import {
    saveUserProfile,
    getUserProfile,
    getPendingProfiles,
    markAsSynced,
    clearUserProfile,
} from '../database';
import SQLite from 'react-native-sqlite-storage';

jest.mock('react-native-sqlite-storage', () => {
    const db = {
        executeSql: jest.fn(),
    };
    const openDatabase = jest.fn(async () => db);
    return { enablePromise: jest.fn(), openDatabase, __db: db };
});

describe('database helpers', () => {
    const sqlite = SQLite as any;
    const exec = sqlite.__db.executeSql as jest.Mock;

    beforeEach(() => {
        exec.mockReset();
        exec.mockImplementation(() =>
            Promise.resolve([{ rows: { length: 0, item: () => ({}) } }])
        );
    });

    it('saves user profile with pending flag', async () => {
        exec.mockResolvedValue([{ rows: { length: 0, item: () => ({}) } }]);
        await saveUserProfile({ id: 1, username: 'u' }, true);
        expect(exec).toHaveBeenCalledWith(
            expect.stringContaining('INSERT OR REPLACE INTO'),
            expect.arrayContaining([1, 'u', null, null, null, null, null, null, null, expect.any(String), 1])
        );
    });

    it('gets pending profiles', async () => {
        const rows = { length: 1, item: () => ({ id: 1, username: 'u', pending_sync: 1 }) };
        exec.mockResolvedValueOnce([{ rows }]);
        const result = await getPendingProfiles();
        expect(result[0].pendingSync).toBe(true);
    });

    it('markAsSynced updates record', async () => {
        await markAsSynced(1, 'date');
        expect(exec).toHaveBeenCalledWith(
            expect.stringContaining('UPDATE'),
            expect.arrayContaining(['date', 1])
        );
    });

    it('clearUserProfile deletes records', async () => {
        await clearUserProfile();
        expect(exec).toHaveBeenCalledWith(expect.stringContaining('DELETE'));
    });

    it('getUserProfile returns null when no rows', async () => {
        const rows = { length: 0, item: () => ({}) };
        exec.mockResolvedValueOnce([{ rows }]);
        const res = await getUserProfile();
        expect(res).toBeNull();
    });
});
