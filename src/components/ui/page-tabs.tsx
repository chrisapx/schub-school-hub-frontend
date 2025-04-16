
import * as React from "react";
import { cn } from "@/lib/utils";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Filter, Plus, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface PageTab {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

interface PageTabsProps {
  tabs: PageTab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  onAddTab?: () => void;
  actions?: React.ReactNode;
  filters?: {
    label: string;
    onClick: () => void;
  }[];
}

export function PageTabs({
  tabs,
  activeTab,
  onTabChange,
  onAddTab,
  actions,
  filters,
}: PageTabsProps) {
  return (
    <div className="sticky top-0 z-30 w-full border-b bg-background/80 backdrop-blur-sm">
      <div className="flex items-center justify-between px-4 py-2">
        <Tabs
          value={activeTab}
          onValueChange={onTabChange}
          className="w-full max-w-3xl mr-auto"
        >
          <TabsList className="bg-transparent h-10 w-auto p-0 mb-0 gap-1 overflow-auto scrollbar-hide">
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.id}
                value={tab.id}
                className="h-10 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4"
              >
                {tab.icon && <span className="mr-2">{tab.icon}</span>}
                {tab.label}
              </TabsTrigger>
            ))}
            {onAddTab && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onAddTab}
                className="h-10 rounded-none border-b-2 border-transparent px-2"
              >
                <Plus className="h-4 w-4 mr-1" />
                <span className="sr-only sm:not-sr-only sm:inline">Add Tab</span>
              </Button>
            )}
          </TabsList>
        </Tabs>

        <div className="flex items-center gap-2 ml-2">
          {filters && filters.length > 0 && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-8 gap-1">
                  <Filter className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:inline">Filter</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {filters.map((filter, index) => (
                  <DropdownMenuItem key={index} onClick={filter.onClick}>
                    {filter.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          {actions && (
            <div className="flex items-center gap-2">
              {actions}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
