import { DataProvider } from '@/shared/model/context/DataProvider';
import { StateProvider } from '@/shared/model/context/StateProvider';
import { ThemeProvider } from '@/shared/model/context/ThemeProvider';
import { Suspense } from 'react';
import { Layout } from './layout/Layout';

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ThemeProvider>
        <DataProvider>
          <StateProvider>
            <Layout />
          </StateProvider>
        </DataProvider>
      </ThemeProvider>
    </Suspense>
  );
}

export default App;
