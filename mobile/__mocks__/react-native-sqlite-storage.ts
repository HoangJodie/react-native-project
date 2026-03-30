const executeSql = jest.fn(async () => [{ rows: { length: 0, item: () => ({}) } }]);

const openDatabase = jest.fn(async () => ({
    executeSql,
    close: jest.fn(async () => true),
}));

const SQLite = {
    enablePromise: jest.fn(),
    openDatabase,
};

export default SQLite;
export { openDatabase, executeSql };
