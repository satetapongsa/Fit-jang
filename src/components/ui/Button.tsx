import { type ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '../../utils/cn';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'accent' | 'outline' | 'ghost' | 'glass';
    size?: 'sm' | 'md' | 'lg' | 'icon';
    isLoading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'primary', size = 'md', isLoading, children, ...props }, ref) => {
        return (
            <button
                ref={ref}
                className={cn(
                    'inline-flex items-center justify-center rounded-xl font-medium transition-all duration-300 active:scale-95 focus:outline-none disabled:opacity-50 disabled:pointer-events-none',
                    {
                        // Variants
                        'bg-primary text-primary-foreground hover:brightness-110 shadow-[0_0_15px_rgba(14,165,233,0.3)] hover:shadow-[0_0_25px_rgba(14,165,233,0.5)]': variant === 'primary',
                        'bg-secondary text-secondary-foreground hover:brightness-110 shadow-[0_0_15px_rgba(139,92,246,0.3)]': variant === 'secondary',
                        'bg-accent text-accent-foreground hover:brightness-110 shadow-[0_0_15px_rgba(244,63,94,0.3)]': variant === 'accent',
                        'border border-border bg-transparent hover:bg-white/5 text-text': variant === 'outline',
                        'hover:bg-white/5 text-text': variant === 'ghost',
                        'glass hover:bg-white/10 text-text border-white/10': variant === 'glass',

                        // Sizes
                        'h-9 px-4 text-xs': size === 'sm',
                        'h-12 px-6 text-sm': size === 'md',
                        'h-14 px-8 text-base': size === 'lg',
                        'h-10 w-10 p-0': size === 'icon',
                    },
                    className
                )}
                disabled={isLoading}
                {...props}
            >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {children}
            </button>
        );
    }
);

Button.displayName = 'Button';

export { Button };
