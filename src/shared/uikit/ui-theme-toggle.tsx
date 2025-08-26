import { cn } from '../lib/cn';
import SunIcon from '../assets/theme_sun.svg?react';
import SaturnIcon from '../assets/theme_saturn.svg?react';
import { UiButton } from './ui-button';

export function ThemeToggler({
  className,
  theme,
  onClick,
}: {
  className?: string;
  theme?: 'light' | 'dark';
  onClick?: () => void;
}) {
  return (
    <div>
      <UiButton variant="link" className={cn('', className)} onClick={onClick}>
        {theme === 'light' ? (
          <SunIcon className="text-surface-foreground size-6" />
        ) : (
          <SaturnIcon className="text-surface-foreground size-6" />
        )}
      </UiButton>
    </div>
  );
}
