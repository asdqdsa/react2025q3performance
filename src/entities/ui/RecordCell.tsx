import { cn } from '@/shared/lib/cn';
import { memo, useEffect, useRef, useState } from 'react';

export const RecordCell = memo(function RecordCell({
  value,
  className,
}: {
  value: string | number;
  className?: string;
}) {
  const prev = useRef(value);
  const [flash, setFlash] = useState<boolean>(false);

  useEffect(() => {
    if (Object.is(prev.current, value)) return;

    prev.current = value;
    setFlash(false);

    const raf = requestAnimationFrame(() => setFlash(true));
    const t = setTimeout(() => setFlash(false), 600);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(t);
    };
  }, [value]);

  return (
    <div
      className={cn(flash && 'flash-bg', 'min-w-[120px] rounded-sm', className)}
    >
      {value}
    </div>
  );
});
