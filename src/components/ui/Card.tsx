import { type HTMLAttributes, forwardRef } from 'react';
import { cn } from '../../utils/cn';

const Card = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
        <div
            ref={ref}
            className={cn(
                'rounded-xl border border-border bg-surface p-6 shadow-sm',
                className
            )}
            {...props}
        />
    )
);
Card.displayName = 'Card';

export { Card };
