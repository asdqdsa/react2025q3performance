import { Header } from '@/app/widgets/Header';
import { Main } from '@/app/widgets/Main';
import { DataProvider } from '@/shared/model/context/DataProvider';
import { StateProvider } from '@/shared/model/context/StateProvider';
import { Suspense } from 'react';

export function Layout() {
  return (
    <div className="bg-background text-foreground flex h-screen flex-col items-center">
      <Header className="" />
      <Suspense fallback={<div>Loading...</div>}>
        <DataProvider>
          <StateProvider>
            <Main className="bg-background m-2 flex-1 overflow-y-auto" />
          </StateProvider>
        </DataProvider>
      </Suspense>
    </div>
  );
}
