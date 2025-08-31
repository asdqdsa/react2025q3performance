import { cn } from '@/shared/lib/cn';
import { Search } from './Search';
import { SortByName } from './SortByName';
import { YearSelect } from './YearSelect';

export function Toolbar({ className }: { className?: string }) {
  return (
    <div className={cn('flex flex-grow items-stretch gap-4 p-2', className)}>
      <Search />
      <YearSelect />
      <SortByName />
    </div>
  );
}
