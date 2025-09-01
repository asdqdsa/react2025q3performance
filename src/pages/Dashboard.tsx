import { Toolbar } from '@/features/filters';
import { useCountryList } from '@/features/model/use-country-list';
import { cn } from '@/shared/lib/cn';
import { List } from '@/widgets/List';

export function Dashboard({ className }: { className?: string }) {
  const countryList = useCountryList();

  return (
    <div className={cn('', className)}>
      <Toolbar />
      <List countries={countryList} />
    </div>
  );
}
