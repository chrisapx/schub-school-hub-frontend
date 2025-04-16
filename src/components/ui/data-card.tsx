
import React from 'react';
import { cn } from '@/lib/utils';
import { MoreHorizontal } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface DataCardProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
  menuItems?: {
    label: string;
    onClick: () => void;
    icon?: React.ReactNode;
    variant?: 'default' | 'destructive';
  }[];
  variant?: 'default' | 'gradient' | 'glass' | 'border';
  loading?: boolean;
}

export function DataCard({
  title,
  subtitle,
  icon,
  children,
  footer,
  className,
  menuItems,
  variant = 'default',
  loading = false,
}: DataCardProps) {
  const cardClasses = cn(
    "rounded-lg overflow-hidden card-hover animate-fade-in",
    {
      "bg-card text-card-foreground shadow-sm border": variant === 'default',
      "gradient-blue text-white": variant === 'gradient',
      "glass-effect border border-white/20": variant === 'glass',
      "bg-background futuristic-border": variant === 'border',
    },
    className
  );

  return (
    <div className={cardClasses}>
      <div className="flex justify-between items-start p-5">
        <div className="flex items-center gap-3">
          {icon && (
            <div className={cn(
              "rounded-full p-2 flex items-center justify-center",
              {
                "bg-primary/10 text-primary": variant === 'default',
                "bg-white/20 text-white": variant === 'gradient',
                "bg-background/30 text-white": variant === 'glass',
                "bg-primary/10 text-primary": variant === 'border',
              }
            )}>
              {icon}
            </div>
          )}
          <div>
            <h3 className="font-semibold text-lg tracking-tight">{title}</h3>
            {subtitle && <p className={cn(
              "text-sm",
              {
                "text-muted-foreground": variant === 'default' || variant === 'border',
                "text-white/80": variant === 'gradient' || variant === 'glass',
              }
            )}>{subtitle}</p>}
          </div>
        </div>
        {menuItems && menuItems.length > 0 && (
          <DropdownMenu>
            <DropdownMenuTrigger className="flex h-8 w-8 items-center justify-center rounded-md border bg-transparent p-0 text-muted-foreground opacity-70 hover:opacity-100">
              <MoreHorizontal className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {menuItems.map((item, index) => (
                <DropdownMenuItem
                  key={index}
                  onClick={item.onClick}
                  className={cn({
                    "text-destructive focus:text-destructive": item.variant === 'destructive'
                  })}
                >
                  {item.icon && <span className="mr-2">{item.icon}</span>}
                  {item.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
      
      <div className={cn(
        "px-5",
        { "pb-5": !footer }
      )}>
        {loading ? (
          <div className="flex flex-col gap-3 animate-pulse">
            <div className="h-4 bg-muted rounded w-3/4"></div>
            <div className="h-4 bg-muted rounded w-1/2"></div>
            <div className="h-4 bg-muted rounded w-2/3"></div>
          </div>
        ) : (
          children
        )}
      </div>
      
      {footer && (
        <div className={cn(
          "px-5 py-3 mt-2 flex items-center",
          {
            "border-t": variant === 'default' || variant === 'border',
            "border-white/10": variant === 'gradient' || variant === 'glass',
          }
        )}>
          {footer}
        </div>
      )}
    </div>
  );
}
