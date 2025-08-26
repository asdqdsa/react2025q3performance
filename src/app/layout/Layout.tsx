import { Header } from '@/features/Header';
import { Main } from '@/features/Main';

export function Layout() {
  return (
    <div className="bg-background flex h-screen flex-col items-center justify-center">
      <Header className="" />
      <Main className="flex-1 overflow-y-auto" />
    </div>
  );
}
