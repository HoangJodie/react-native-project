import SQLite, { SQLiteDatabase } from 'react-native-sqlite-storage';

SQLite.enablePromise(true);

const DB_NAME = 'app.db';
const DB_LOCATION = 'default';
const PROFILE_TABLE = 'user_profile';

export type UserProfileRecord = {
    id: number;
    username: string;
    email?: string | null;
    age?: number | null;
    firstName?: string | null;
    lastName?: string | null;
    avatar?: string | null;
    phone?: string | null;
    address?: string | null;
    updatedAt?: string | null;
    pendingSync: boolean;
};

let dbInstance: SQLiteDatabase | null = null;

const mapRowToProfile = (row: Record<string, unknown>): UserProfileRecord => {
    const getString = (key: string): string | null => {
        const value = row[key];
        return typeof value === 'string' ? value : value == null ? null : String(value);
    };
    const getNumber = (key: string): number | null => {
        const value = row[key];
        if (typeof value === 'number') {
            return value;
        }
        if (typeof value === 'string' && value !== '') {
            const parsed = Number(value);
            return Number.isNaN(parsed) ? null : parsed;
        }
        return null;
    };
    const getBooleanFromNumber = (key: string): boolean => {
        const value = row[key];
        if (typeof value === 'number') {
            return value === 1;
        }
        if (typeof value === 'string') {
            return value === '1';
        }
        return false;
    };

    return {
        id: Number(row.id),
        username: getString('username') ?? '',
        email: getString('email'),
        age: getNumber('age'),
        firstName: getString('firstName'),
        lastName: getString('lastName'),
        avatar: getString('avatar'),
        phone: getString('phone'),
        address: getString('address'),
        updatedAt: getString('updated_at'),
        pendingSync: getBooleanFromNumber('pending_sync'),
    };
};

const ensureTable = async (db: SQLiteDatabase) => {
    await db.executeSql(
        `CREATE TABLE IF NOT EXISTS ${PROFILE_TABLE} (
            id INTEGER PRIMARY KEY NOT NULL,
            username TEXT NOT NULL,
            email TEXT,
            age INTEGER,
            firstName TEXT,
            lastName TEXT,
            avatar TEXT,
            phone TEXT,
            address TEXT,
            updated_at TEXT,
            pending_sync INTEGER DEFAULT 0
        );`
    );
};

const ensureMigrations = async (db: SQLiteDatabase) => {
    const [tableInfo] = await db.executeSql(`PRAGMA table_info(${PROFILE_TABLE});`);
    let hasAgeColumn = false;
    for (let i = 0; i < tableInfo.rows.length; i += 1) {
        if (tableInfo.rows.item(i).name === 'age') {
            hasAgeColumn = true;
            break;
        }
    }
    if (!hasAgeColumn) {
        await db.executeSql(`ALTER TABLE ${PROFILE_TABLE} ADD COLUMN age INTEGER`);
    }
};

const getDatabase = async (): Promise<SQLiteDatabase> => {
    if (dbInstance) {
        return dbInstance;
    }
    dbInstance = await SQLite.openDatabase({ name: DB_NAME, location: DB_LOCATION });
    await ensureTable(dbInstance);
    await ensureMigrations(dbInstance);
    return dbInstance;
};

export const initDatabase = async (): Promise<SQLiteDatabase> => {
    return getDatabase();
};

export const saveUserProfile = async (profile: Omit<UserProfileRecord, 'pendingSync'>, pending = false): Promise<void> => {
    const db = await getDatabase();
    const updatedAt = profile.updatedAt ?? new Date().toISOString();
    await db.executeSql(
        `INSERT OR REPLACE INTO ${PROFILE_TABLE}
        (id, username, email, age, firstName, lastName, avatar, phone, address, updated_at, pending_sync)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
            profile.id,
            profile.username,
            profile.email ?? null,
            profile.age ?? null,
            profile.firstName ?? null,
            profile.lastName ?? null,
            profile.avatar ?? null,
            profile.phone ?? null,
            profile.address ?? null,
            updatedAt,
            pending ? 1 : 0,
        ]
    );
};

export const getUserProfile = async (): Promise<UserProfileRecord | null> => {
    const db = await getDatabase();
    const [result] = await db.executeSql(`SELECT * FROM ${PROFILE_TABLE} LIMIT 1`);
    if (!result.rows.length) {
        return null;
    }
    return mapRowToProfile(result.rows.item(0));
};

export const getPendingProfiles = async (): Promise<UserProfileRecord[]> => {
    const db = await getDatabase();
    const [result] = await db.executeSql(`SELECT * FROM ${PROFILE_TABLE} WHERE pending_sync = 1`);
    const profiles: UserProfileRecord[] = [];
    for (let i = 0; i < result.rows.length; i += 1) {
        profiles.push(mapRowToProfile(result.rows.item(i)));
    }
    return profiles;
};

export const markAsSynced = async (userId: number, updatedAt?: string): Promise<void> => {
    const db = await getDatabase();
    await db.executeSql(
        `UPDATE ${PROFILE_TABLE} SET pending_sync = 0, updated_at = ? WHERE id = ?`,
        [updatedAt ?? new Date().toISOString(), userId]
    );
};

export const clearUserProfile = async (): Promise<void> => {
    const db = await getDatabase();
    await db.executeSql(`DELETE FROM ${PROFILE_TABLE}`);
};
