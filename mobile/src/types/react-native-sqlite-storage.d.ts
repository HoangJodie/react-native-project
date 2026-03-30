declare module 'react-native-sqlite-storage' {
    import { TurboModuleRegistry } from 'react-native';
    export type SQLiteDatabase = {
        executeSql: (
            sqlStatement: string,
            args?: (string | number | null)[],
        ) => Promise<{ rows: { length: number; item: (index: number) => any } }[]>;
        close: () => Promise<void>;
    };

    export interface OpenDatabaseParams {
        name: string;
        location: string;
    }

    const SQLite: {
        enablePromise: (enable: boolean) => void;
        openDatabase: (params: OpenDatabaseParams) => Promise<SQLiteDatabase>;
    };

    export default SQLite;
}
