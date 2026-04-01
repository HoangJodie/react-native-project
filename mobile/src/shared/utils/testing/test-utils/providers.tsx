import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

type ReducerMap = Parameters<typeof configureStore>[0]['reducer'];

export const createHookWrapper = (reducer: ReducerMap, preloadedState?: unknown) => {
    const queryClient = new QueryClient({
        defaultOptions: { queries: { retry: false } },
    });

    const store = configureStore({
        reducer,
        preloadedState,
    });

    const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
        </Provider>
    );

    return { Wrapper, store, queryClient };
};
