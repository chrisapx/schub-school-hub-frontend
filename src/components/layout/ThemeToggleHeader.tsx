
import React from 'react';
import { ThemeToggle } from '@/components/ui/theme-toggle';

const ThemeToggleHeader: React.FC = () => {
  return (
    <div className="absolute right-6 top-4 z-30">
      <ThemeToggle />
    </div>
  );
};

export default ThemeToggleHeader;
