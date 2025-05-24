import React, { useState } from 'react';
import { Influencer, SortConfig } from '../types';
import StatusBadge from './StatusBadge';
import PlatformBadge from './PlatformBadge';
import { Edit, Trash2, Check, ExternalLink } from 'lucide-react';

interface InfluencerTableProps {
  influencers: Influencer[];
  onEdit: (influencer: Influencer) => void;
  onDelete: (id: string) => void;
  onTogglePaid: (id: string) => void;
  onSort: (field: SortConfig['field']) => void;
  sortConfig: SortConfig;
  loading: boolean;
}

const InfluencerTable: React.FC<InfluencerTableProps> = ({
  influencers,
  onEdit,
  onDelete,
  onTogglePaid,
  onSort,
  sortConfig,
  loading
}) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const getSortIcon = (field: SortConfig['field']) => {
    if (sortConfig.field !== field) {
      return null;
    }
    return sortConfig.direction === 'asc' 
      ? <span className="ml-1">↑</span> 
      : <span className="ml-1">↓</span>;
  };

  const renderSortableHeader = (label: string, field: SortConfig['field']) => (
    <th
      className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-50"
      onClick={() => onSort(field)}
    >
      <div className="flex items-center">
        {label}
        {getSortIcon(field)}
      </div>
    </th>
  );

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const formatNumber = (num: number) => {
    return num.toLocaleString();
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="animate-pulse p-8 flex justify-center items-center">
          <div className="flex flex-col items-center">
            <svg className="animate-spin h-10 w-10 text-purple-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p className="mt-4 text-sm text-gray-500">Loading influencer data...</p>
          </div>
        </div>
      </div>
    );
  }

  if (influencers.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-8 text-center">
          <p className="text-gray-500">No influencers found. Add your first influencer to get started!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {renderSortableHeader('Username', 'username')}
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Platform
              </th>
              {renderSortableHeader('Views Median', 'viewsMedian')}
              {renderSortableHeader('Total Views', 'totalViews')}
              {renderSortableHeader('Current Views', 'currentViews')}
              {renderSortableHeader('Status', 'status')}
              {renderSortableHeader('Paid', 'isPaid')}
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {influencers.map((influencer) => (
              <React.Fragment key={influencer.id}>
                <tr className="hover:bg-gray-50 transition-colors duration-150 cursor-pointer" onClick={() => toggleExpand(influencer.id)}>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{influencer.username}</div>
                        <div className="text-sm text-gray-500 truncate max-w-[200px]">
                          <a href={influencer.profileUrl} target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-purple-600" onClick={(e) => e.stopPropagation()}>
                            <span className="truncate">{influencer.profileUrl}</span>
                            <ExternalLink className="ml-1" size={14} />
                          </a>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <PlatformBadge platform={influencer.platform} />
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{formatNumber(influencer.viewsMedian)}</div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{formatNumber(influencer.totalViews)}</div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{formatNumber(influencer.currentViews)}</div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <StatusBadge status={influencer.status} />
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onTogglePaid(influencer.id);
                      }}
                      className={`inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded ${
                        influencer.isPaid
                          ? 'bg-green-100 text-green-800 hover:bg-green-200'
                          : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                      } transition-colors duration-150`}
                    >
                      {influencer.isPaid && <Check size={14} className="mr-1" />}
                      {influencer.isPaid ? 'Paid' : 'Mark as Paid'}
                    </button>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onEdit(influencer);
                      }}
                      className="text-indigo-600 hover:text-indigo-900 mr-3"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (window.confirm('Are you sure you want to delete this influencer?')) {
                          onDelete(influencer.id);
                        }
                      }}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
                {expandedId === influencer.id && (
                  <tr>
                    <td colSpan={8} className="px-4 py-4 bg-gray-50">
                      <div className="p-4">
                        <h3 className="text-sm font-medium text-gray-900 mb-3">Video Posts</h3>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                          {influencer.videoPosts.map((post, index) => (
                            <div key={post.id} className="bg-white p-3 rounded-md shadow-sm">
                              <div className="text-xs font-medium text-gray-500 mb-2">Video #{index + 1}</div>
                              {post.url ? (
                                <>
                                  <a
                                    href={post.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm text-purple-600 hover:text-purple-800 flex items-center mb-2"
                                  >
                                    <span className="truncate">View Post</span>
                                    <ExternalLink className="ml-1 flex-shrink-0" size={14} />
                                  </a>
                                  <div className="text-xs text-gray-500">
                                    Posted: {post.postedDate ? new Date(post.postedDate).toLocaleDateString() : 'Not set'}
                                  </div>
                                  <div className="text-sm font-medium mt-1">
                                    {post.viewsCount.toLocaleString()} views
                                  </div>
                                </>
                              ) : (
                                <div className="text-sm text-gray-400 italic">Not posted yet</div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InfluencerTable;