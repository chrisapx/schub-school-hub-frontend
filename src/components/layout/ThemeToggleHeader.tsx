
import React from 'react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ui/theme-toggle';

const ThemeToggleHeader: React.FC = () => {
  return (
    <div className="absolute right-16 top-4 z-50">
      <ThemeToggle />
    </div>
  );
};

export default ThemeToggleHeader;
