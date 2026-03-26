import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AppNavigator from './src/app/navigation/AppNavigator';
import ReduxProvider from './src/app/providers/ReduxProvider';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ReduxProvider>
        <AppNavigator />
      </ReduxProvider>
    </QueryClientProvider>
  );
};

export default App;
