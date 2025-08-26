import { Header } from '@/app/widgets/Header';
import { Main } from '@/app/widgets/Main';

export function Layout() {
  return (
    <div className="bg-background text-foreground flex h-screen flex-col items-center justify-center">
      <Header className="" />
      <Main className="bg-background m-2 flex-1 overflow-y-auto" />
    </div>
  );
}
