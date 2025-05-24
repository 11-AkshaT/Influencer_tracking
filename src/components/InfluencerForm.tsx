import React, { useState, useEffect } from 'react';
import { Influencer, VideoPost, PlatformType } from '../types';
import { v4 as uuidv4 } from 'uuid';
import VideoPostsSection from './VideoPostsSection';

interface InfluencerFormProps {
  onSubmit: (influencer: Omit<Influencer, 'id' | 'totalViews'>) => void;
  initialData?: Influencer;
  onCancel: () => void;
  saving: boolean;
}

const InfluencerForm: React.FC<InfluencerFormProps> = ({ 
  onSubmit, 
  initialData, 
  onCancel,
  saving
}) => {
  const [username, setUsername] = useState('');
  const [profileUrl, setProfileUrl] = useState('');
  const [platform, setPlatform] = useState<PlatformType>('Instagram');
  const [viewsMedian, setViewsMedian] = useState<number>(0);
  const [totalViews, setTotalViews] = useState<number>(0);
  const [currentViews, setCurrentViews] = useState<number>(0);
  const [status, setStatus] = useState<'Posted' | 'Script Needed' | 'Approval Needed'>('Script Needed');
  const [isPaid, setIsPaid] = useState(false);
  const [videoPosts, setVideoPosts] = useState<VideoPost[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (initialData) {
      setUsername(initialData.username);
      setProfileUrl(initialData.profileUrl);
      setPlatform(initialData.platform);
      setViewsMedian(initialData.viewsMedian);
      setTotalViews(initialData.totalViews);
      setCurrentViews(initialData.currentViews);
      setStatus(initialData.status);
      setIsPaid(initialData.isPaid);
      setVideoPosts(initialData.videoPosts);
    } else {
      // Initialize with 4 empty video posts
      setVideoPosts([
        { id: uuidv4(), url: '', postedDate: '', viewsCount: 0 },
        { id: uuidv4(), url: '', postedDate: '', viewsCount: 0 },
        { id: uuidv4(), url: '', postedDate: '', viewsCount: 0 },
        { id: uuidv4(), url: '', postedDate: '', viewsCount: 0 }
      ]);
    }
  }, [initialData]);

  // Update total views when views median changes
  useEffect(() => {
    setTotalViews(viewsMedian * 5);
  }, [viewsMedian]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!username.trim()) {
      newErrors.username = 'Username is required';
    }

    if (!profileUrl.trim()) {
      newErrors.profileUrl = 'Profile URL is required';
    } else if (!/^https?:\/\/.+/.test(profileUrl)) {
      newErrors.profileUrl = 'Please enter a valid URL starting with http:// or https://';
    }

    if (!viewsMedian || viewsMedian <= 0) {
      newErrors.viewsMedian = 'Views median must be greater than 0';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const influencerData = {
      username,
      profileUrl,
      platform,
      viewsMedian,
      currentViews,
      videoPosts,
      status,
      isPaid
    };

    onSubmit(influencerData);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold mb-6">{initialData ? 'Edit Influencer' : 'Add New Influencer'}</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Username */}
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
              Username <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={`w-full px-4 py-2 border rounded-md text-sm ${
                errors.username ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="e.g., influencer_name"
            />
            {errors.username && <p className="mt-1 text-sm text-red-500">{errors.username}</p>}
          </div>

          {/* Profile URL */}
          <div>
            <label htmlFor="profileUrl" className="block text-sm font-medium text-gray-700 mb-1">
              Profile URL <span className="text-red-500">*</span>
            </label>
            <input
              type="url"
              id="profileUrl"
              value={profileUrl}
              onChange={(e) => setProfileUrl(e.target.value)}
              className={`w-full px-4 py-2 border rounded-md text-sm ${
                errors.profileUrl ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="https://www.instagram.com/username"
            />
            {errors.profileUrl && <p className="mt-1 text-sm text-red-500">{errors.profileUrl}</p>}
          </div>

          {/* Platform */}
          <div>
            <label htmlFor="platform" className="block text-sm font-medium text-gray-700 mb-1">
              Platform <span className="text-red-500">*</span>
            </label>
            <select
              id="platform"
              value={platform}
              onChange={(e) => setPlatform(e.target.value as PlatformType)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm"
            >
              <option value="Instagram">Instagram</option>
              <option value="TikTok">TikTok</option>
              <option value="Both">Both (Instagram + TikTok)</option>
            </select>
          </div>

          {/* Views Median */}
          <div>
            <label htmlFor="viewsMedian" className="block text-sm font-medium text-gray-700 mb-1">
              Views Median <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              id="viewsMedian"
              value={viewsMedian || ''}
              onChange={(e) => setViewsMedian(parseInt(e.target.value) || 0)}
              className={`w-full px-4 py-2 border rounded-md text-sm ${
                errors.viewsMedian ? 'border-red-500' : 'border-gray-300'
              }`}
              min="0"
            />
            {errors.viewsMedian && <p className="mt-1 text-sm text-red-500">{errors.viewsMedian}</p>}
          </div>

          {/* Total Views (calculated) */}
          <div>
            <label htmlFor="totalViews" className="block text-sm font-medium text-gray-700 mb-1">
              Total Views (calculated)
            </label>
            <input
              type="number"
              id="totalViews"
              value={totalViews}
              readOnly
              className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm bg-gray-50"
            />
          </div>

          {/* Current Views */}
          <div>
            <label htmlFor="currentViews" className="block text-sm font-medium text-gray-700 mb-1">
              Current Views
            </label>
            <input
              type="number"
              id="currentViews"
              value={currentViews || ''}
              onChange={(e) => setCurrentViews(parseInt(e.target.value) || 0)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm"
              min="0"
            />
          </div>

          {/* Status */}
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
              Current Status
            </label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value as 'Posted' | 'Script Needed' | 'Approval Needed')}
              className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm"
            >
              <option value="Posted">Posted</option>
              <option value="Script Needed">Script Needed</option>
              <option value="Approval Needed">Approval Needed</option>
            </select>
          </div>

          {/* Payment Status */}
          <div className="flex items-center">
            <label htmlFor="isPaid" className="flex items-center cursor-pointer">
              <div className="relative">
                <input
                  type="checkbox"
                  id="isPaid"
                  checked={isPaid}
                  onChange={(e) => setIsPaid(e.target.checked)}
                  className="sr-only"
                />
                <div className="w-10 h-5 bg-gray-200 rounded-full shadow-inner"></div>
                <div className={`absolute w-5 h-5 rounded-full transition ${isPaid ? 'bg-green-500 transform translate-x-5' : 'bg-white'} shadow-md top-0 left-0`}></div>
              </div>
              <span className="ml-3 text-sm font-medium text-gray-700">
                {isPaid ? 'Paid' : 'Unpaid'}
              </span>
            </label>
          </div>
        </div>

        {/* Video Posts Section */}
        <VideoPostsSection 
          videoPosts={videoPosts} 
          onUpdate={setVideoPosts} 
        />

        {/* Form Actions */}
        <div className="mt-8 flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className={`px-4 py-2 rounded-md text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 ${
              saving ? 'opacity-75 cursor-not-allowed' : ''
            }`}
          >
            {saving ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Saving...
              </span>
            ) : initialData ? 'Update Influencer' : 'Add Influencer'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default InfluencerForm;