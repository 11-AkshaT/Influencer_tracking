import React from 'react';
import { VideoPost } from '../types';

interface VideoPostsSectionProps {
  videoPosts: VideoPost[];
  onUpdate: (updatedPosts: VideoPost[]) => void;
  readOnly?: boolean;
}

const VideoPostsSection: React.FC<VideoPostsSectionProps> = ({ 
  videoPosts, 
  onUpdate,
  readOnly = false
}) => {
  const handleUrlChange = (index: number, value: string) => {
    const updatedPosts = [...videoPosts];
    updatedPosts[index] = { ...updatedPosts[index], url: value };
    onUpdate(updatedPosts);
  };

  const handleDateChange = (index: number, value: string) => {
    const updatedPosts = [...videoPosts];
    updatedPosts[index] = { ...updatedPosts[index], postedDate: value };
    onUpdate(updatedPosts);
  };

  const handleViewsChange = (index: number, value: string) => {
    const updatedPosts = [...videoPosts];
    updatedPosts[index] = { 
      ...updatedPosts[index], 
      viewsCount: value === '' ? 0 : parseInt(value, 10) 
    };
    onUpdate(updatedPosts);
  };

  return (
    <div className="space-y-4 mt-4">
      <h3 className="text-sm font-medium text-gray-500">Video Posts</h3>
      
      <div className="grid grid-cols-1 gap-4">
        {videoPosts.map((post, index) => (
          <div key={post.id || index} className="bg-gray-50 p-3 rounded-md">
            <div className="text-xs font-medium text-gray-500 mb-2">Video #{index + 1}</div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <label htmlFor={`url-${index}`} className="block text-xs font-medium text-gray-700 mb-1">
                  Video URL
                </label>
                <input
                  type="url"
                  id={`url-${index}`}
                  value={post.url}
                  onChange={(e) => handleUrlChange(index, e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  placeholder="https://"
                  disabled={readOnly}
                />
              </div>
              
              <div>
                <label htmlFor={`date-${index}`} className="block text-xs font-medium text-gray-700 mb-1">
                  Posted Date
                </label>
                <input
                  type="date"
                  id={`date-${index}`}
                  value={post.postedDate}
                  onChange={(e) => handleDateChange(index, e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  disabled={readOnly}
                />
              </div>
              
              <div>
                <label htmlFor={`views-${index}`} className="block text-xs font-medium text-gray-700 mb-1">
                  Views Count
                </label>
                <input
                  type="number"
                  id={`views-${index}`}
                  value={post.viewsCount || ''}
                  onChange={(e) => handleViewsChange(index, e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  min="0"
                  disabled={readOnly}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoPostsSection;