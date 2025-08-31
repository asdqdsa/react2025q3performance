import { cn } from '@/shared/lib/cn';
import { useThemeContext } from '@/shared/model/context/use-theme-ctx';
import { UiButton } from '@/shared/uikit/ui-button';
import { ThemeToggler } from '@/shared/uikit/ui-theme-toggle';

export function Header({ className }: { className?: string }) {
  const { theme, toggleTheme } = useThemeContext();
  return (
    <header
      className={cn(
        'text-surface-foreground bg-background-secondary border-border/40 flex w-full items-center justify-between border-b-2 px-4 py-2 shadow-sm',
        className
      )}
    >
      <div
        className={cn(
          'mx-auto flex w-full max-w-7xl justify-between',
          className
        )}
      >
        <nav>
          <ul className="flex gap-2">
            <li>
              <UiButton
                variant="link"
                className="text-surface-foreground text-xl font-semibold"
              >
                Performance
              </UiButton>
            </li>
          </ul>
        </nav>
        <ThemeToggler theme={theme} onClick={toggleTheme} />
      </div>
    </header>
  );
}
