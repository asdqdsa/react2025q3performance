import { cn } from '@/shared/lib/cn';
import { useThemeContext } from '@/shared/model/context/use-theme-ctx';
import { UiButton } from '@/shared/uikit/ui-button';
import { ThemeToggler } from '@/shared/uikit/ui-theme-toggle';

export function Header({ className }: { className?: string }) {
  const { theme, toggleTheme } = useThemeContext();
  return (
    <header
      className={cn(
        'border-border bg-surface text-surface-foreground flex w-full items-center justify-between border-b-2 px-4 py-2 shadow-lg',
        className
      )}
    >
      <nav>
        <ul className="flex gap-2">
          <li>
            <UiButton variant="link" className="text-surface-foreground">
              Home
            </UiButton>
          </li>
          <li>
            <UiButton variant="link" className="text-surface-foreground">
              About
            </UiButton>
          </li>
        </ul>
      </nav>
      <ThemeToggler theme={theme} onClick={toggleTheme} />
    </header>
  );
}
