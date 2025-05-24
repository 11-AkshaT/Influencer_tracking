import React from 'react';
import { StatusFilter } from '../types';

interface TableFiltersProps {
  statusFilter: StatusFilter;
  setStatusFilter: (filter: StatusFilter) => void;
  campaignTotalViews: number;
}

const TableFilters: React.FC<TableFiltersProps> = ({ 
  statusFilter, 
  setStatusFilter,
  campaignTotalViews
}) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
      <div className="bg-white rounded-lg shadow px-4 py-3 flex flex-col">
        <h2 className="text-sm font-medium text-gray-500">Campaign Total Views</h2>
        <p className="text-2xl font-bold text-purple-700">{campaignTotalViews.toLocaleString()}</p>
      </div>
      
      <div className="flex flex-wrap gap-2">
        <button 
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
            statusFilter === 'All' 
              ? 'bg-purple-600 text-white' 
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
          onClick={() => setStatusFilter('All')}
        >
          All
        </button>
        <button 
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
            statusFilter === 'Posted' 
              ? 'bg-green-600 text-white' 
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
          onClick={() => setStatusFilter('Posted')}
        >
          Posted
        </button>
        <button 
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
            statusFilter === 'Script Needed' 
              ? 'bg-amber-600 text-white' 
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
          onClick={() => setStatusFilter('Script Needed')}
        >
          Script Needed
        </button>
        <button 
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
            statusFilter === 'Approval Needed' 
              ? 'bg-purple-600 text-white' 
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
          onClick={() => setStatusFilter('Approval Needed')}
        >
          Approval Needed
        </button>
      </div>
    </div>
  );
};

export default TableFilters;