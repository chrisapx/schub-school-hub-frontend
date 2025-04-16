
import React, { ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DataCardProps {
  title: string;
  subtitle?: string;
  icon?: ReactNode;
  children?: ReactNode;
  className?: string;
  variant?: 'default' | 'border' | 'gradient';
  footer?: ReactNode;
  action?: ReactNode;
}

export function DataCard({
  title,
  subtitle,
  icon,
  children,
  className,
  variant = 'default',
  footer,
  action,
}: DataCardProps) {
  return (
    <div
      className={cn(
        'rounded-xl overflow-hidden transition-all duration-300',
        'h-full flex flex-col',
        {
          'bg-card text-card-foreground shadow-sm': variant === 'default',
          'border shadow-sm bg-card hover:shadow-md': variant === 'border',
          'bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-md': variant === 'gradient',
        },
        className
      )}
    >
      <div className="p-6">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              {icon && (
                <div
                  className={cn('rounded-full p-2', {
                    'bg-primary/10 text-primary': variant !== 'gradient',
                    'bg-primary-foreground/20 text-primary-foreground': variant === 'gradient',
                  })}
                >
                  {icon}
                </div>
              )}
              <h3 className="font-semibold leading-none tracking-tight">{title}</h3>
            </div>
            {subtitle && (
              <p
                className={cn('text-sm', {
                  'text-muted-foreground': variant !== 'gradient',
                  'text-primary-foreground/80': variant === 'gradient',
                })}
              >
                {subtitle}
              </p>
            )}
          </div>
          {action && <div>{action}</div>}
        </div>
      </div>
      {children && <div className="p-6 pt-0 flex-1">{children}</div>}
      {footer && (
        <div
          className={cn('p-4 border-t mt-auto', {
            'border-border': variant !== 'gradient',
            'border-primary-foreground/20': variant === 'gradient',
          })}
        >
          {footer}
        </div>
      )}
    </div>
  );
}
