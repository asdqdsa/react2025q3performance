import { cn } from '../lib/cn';

export function UiSelect({
  className,
  children,
  ...props
}: {
  className?: string;
  children?: React.ReactNode;
} & React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select className={cn('bg-input rounded px-2 py-1', className)} {...props}>
      {children}
    </select>
  );
}

UiSelect.Option = function UISelectOptions({
  className,
  children,
  ...props
}: {
  className?: string;
  children?: React.ReactNode;
} & React.OptionHTMLAttributes<HTMLOptionElement>) {
  return (
    <option className={cn('bg-input', className)} {...props}>
      {children}
    </option>
  );
};
