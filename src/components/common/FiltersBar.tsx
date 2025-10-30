import React from 'react';
import { Filter, X, Search, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface FilterOption {
  value: string;
  label: string;
}

interface QuickSwitchTab {
  id: string;
  label: string;
  count?: number;
}

interface FiltersBarProps {
  // Search
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  searchPlaceholder?: string;

  // Status filter
  statusFilter?: string;
  onStatusChange?: (status: string) => void;
  statusOptions?: FilterOption[];

  // Sort
  sortBy?: string;
  onSortChange?: (sort: string) => void;
  sortOptions?: FilterOption[];

  // Additional filters (custom)
  additionalFilters?: React.ReactNode;

  // Quick switch tabs (e.g., Orders/Devices)
  quickSwitchTabs?: QuickSwitchTab[];
  activeTab?: string;
  onTabChange?: (tabId: string) => void;

  // Results count
  resultsCount?: number;
  resultsLabel?: string;

  // Clear all
  onClearAll?: () => void;
  hasActiveFilters?: boolean;

  className?: string;
}

export const FiltersBar: React.FC<FiltersBarProps> = ({
  searchQuery = '',
  onSearchChange,
  searchPlaceholder = 'Пошук...',
  statusFilter,
  onStatusChange,
  statusOptions = [],
  sortBy,
  onSortChange,
  sortOptions = [],
  additionalFilters,
  quickSwitchTabs,
  activeTab,
  onTabChange,
  resultsCount = 0,
  resultsLabel = 'Знайдено',
  onClearAll,
  hasActiveFilters = false,
  className = '',
}) => {
  const showQuickSwitch = quickSwitchTabs && quickSwitchTabs.length > 0;

  return (
    <div className={`bg-white rounded-xl shadow-sm border border-gray-100 p-3 sm:p-4 space-y-4 ${className}`}>
      {/* Quick Switch Tabs */}
      {showQuickSwitch && (
        <div className="flex gap-2 border-b border-gray-200 pb-3 -mx-3 sm:-mx-4 px-3 sm:px-4">
          {quickSwitchTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange?.(tab.id)}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                  activeTab === tab.id ? 'bg-white/20' : 'bg-gray-200'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>
      )}

      {/* Main Filters Row */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center">
        {/* Search */}
        {onSearchChange && (
          <div className="relative flex-1 sm:flex-none sm:min-w-[200px]">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder={searchPlaceholder}
              className="w-full pl-10 pr-4 py-2.5 sm:py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base sm:text-sm min-h-[44px] sm:min-h-[36px]"
            />
          </div>
        )}

        {/* Status Filter */}
        {onStatusChange && statusOptions.length > 0 && (
          <div className="flex items-center gap-2 flex-1 sm:flex-none sm:min-w-[150px]">
            <Filter className="w-4 h-4 text-gray-500 shrink-0" />
            <select
              value={statusFilter || 'all'}
              onChange={(e) => onStatusChange(e.target.value)}
              className="flex-1 px-3 py-2.5 sm:py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base sm:text-sm min-h-[44px] sm:min-h-[36px]"
            >
              {statusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Sort */}
        {onSortChange && sortOptions.length > 0 && (
          <div className="flex items-center gap-2 flex-1 sm:flex-none sm:min-w-[150px]">
            <ChevronDown className="w-4 h-4 text-gray-500 shrink-0" />
            <select
              value={sortBy || sortOptions[0]?.value || ''}
              onChange={(e) => onSortChange(e.target.value)}
              className="flex-1 px-3 py-2.5 sm:py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base sm:text-sm min-h-[44px] sm:min-h-[36px]"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Additional Filters */}
        {additionalFilters}

        {/* Clear Button */}
        {hasActiveFilters && onClearAll && (
          <button
            onClick={onClearAll}
            className="flex items-center gap-2 px-4 py-2.5 sm:py-2 text-sm text-gray-600 hover:text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors whitespace-nowrap"
          >
            <X className="w-4 h-4" />
            <span className="hidden sm:inline">Очистити</span>
          </button>
        )}

        {/* Results Count */}
        <div className="w-full sm:w-auto sm:ml-auto text-center sm:text-left">
          <p className="text-sm sm:text-xs text-gray-600">
            {resultsLabel}: <span className="font-bold text-blue-600">{resultsCount}</span>
          </p>
        </div>
      </div>
    </div>
  );
};



