import { Dashboard } from '@/features/Dashboard';
import { cn } from '@/shared/lib/cn';
// import { Suspense } from 'react';

export function Main({ className }: { className?: string }) {
  return (
    <main className={cn('', className)}>
      {/*<Suspense fallback={<div>Loading...</div>}>*/}
      <Dashboard />
      {/*</Suspense>*/}
    </main>
  );
}
