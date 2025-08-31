import { Dashboard } from '@/features/Dashboard';
import { cn } from '@/shared/lib/cn';

export function Main({ className }: { className?: string }) {
  return (
    <main className={cn('', className)}>
      <Dashboard />
    </main>
  );
}
