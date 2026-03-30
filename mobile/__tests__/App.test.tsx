/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../App';
import { jest } from '@jest/globals';

jest.mock('react-native-config', () => ({ API_URL: 'http://localhost' }));
jest.mock('react-native-keychain');
jest.mock('react-native-sqlite-storage');

it('exports App component', () => {
  expect(App).toBeTruthy();
});
