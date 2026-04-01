module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^~/features/(.*)$': '<rootDir>/src/features/$1',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|@react-navigation|@react-native-community|@react-native-async-storage|react-redux|@reduxjs/toolkit|@tanstack/react-query|@tanstack/query-core|immer|react-native-vector-icons|react-native-config)/)',
  ],
};
