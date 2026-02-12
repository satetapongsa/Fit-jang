import { type HTMLAttributes, forwardRef } from 'react';
import { cn } from '../../utils/cn';

const Card = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
        <div
            ref={ref}
            className={cn(
                'rounded-2xl border border-white/10 bg-surface/50 backdrop-blur-md p-6 shadow-lg',
                className
            )}
            {...props}
        />
    )
);
Card.displayName = 'Card';

export { Card };
