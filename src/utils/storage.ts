import { Influencer } from '../types';

const STORAGE_KEY = 'influencer-tracking-data';

// Sample data for initial load
const sampleData: Influencer[] = [
  {
    id: '1',
    username: 'cherrylex.x',
    profileUrl: 'https://www.tiktok.com/cherrylex',
    platform: 'Both',
    viewsMedian: 24700,
    totalViews: 123500,
    currentViews: 12029,
    status: 'Approval Needed',
    isPaid: false,
    videoPosts: [
      { id: '1-1', url: 'https://www.tiktok.com/video1', postedDate: '2025-04-20', viewsCount: 3791 },
      { id: '1-2', url: 'https://www.tiktok.com/video2', postedDate: '2025-04-27', viewsCount: 8238 },
      { id: '1-3', url: '', postedDate: '', viewsCount: 0 },
      { id: '1-4', url: '', postedDate: '', viewsCount: 0 }
    ]
  },
  {
    id: '2',
    username: 'joyfovette',
    profileUrl: 'https://www.instagram.com/joyfovette',
    platform: 'Instagram',
    viewsMedian: 66200,
    totalViews: 331000,
    currentViews: 78900,
    status: 'Script Needed',
    isPaid: false,
    videoPosts: [
      { id: '2-1', url: 'https://www.instagram.com/video1', postedDate: '2025-04-31', viewsCount: 13800 },
      { id: '2-2', url: 'https://www.instagram.com/video2', postedDate: '2025-05-09', viewsCount: 14100 },
      { id: '2-3', url: 'https://www.instagram.com/video3', postedDate: '2025-05-19', viewsCount: 51000 },
      { id: '2-4', url: '', postedDate: '', viewsCount: 0 }
    ]
  },
  {
    id: '3',
    username: 'what_riya_reads',
    profileUrl: 'https://www.instagram.com/what_riya_reads',
    platform: 'Both',
    viewsMedian: 20900,
    totalViews: 104500,
    currentViews: 47200,
    status: 'Script Needed',
    isPaid: false,
    videoPosts: [
      { id: '3-1', url: 'https://www.instagram.com/video1', postedDate: '2025-04-04', viewsCount: 11700 },
      { id: '3-2', url: 'https://www.instagram.com/video2', postedDate: '2025-05-09', viewsCount: 10900 },
      { id: '3-3', url: 'https://www.instagram.com/video3', postedDate: '2025-05-15', viewsCount: 24600 },
      { id: '3-4', url: '', postedDate: '', viewsCount: 0 }
    ]
  },
  {
    id: '4',
    username: 'lani.bbyi',
    profileUrl: 'https://www.tiktok.com/lani.bbyi',
    platform: 'TikTok',
    viewsMedian: 10400,
    totalViews: 52000,
    currentViews: 2648,
    status: 'Script Needed',
    isPaid: false,
    videoPosts: [
      { id: '4-1', url: 'https://www.tiktok.com/video1', postedDate: '2025-05-05', viewsCount: 924 },
      { id: '4-2', url: 'https://www.tiktok.com/video2', postedDate: '2025-05-16', viewsCount: 1724 },
      { id: '4-3', url: '', postedDate: '', viewsCount: 0 },
      { id: '4-4', url: '', postedDate: '', viewsCount: 0 }
    ]
  }
];

export const getInfluencers = (): Influencer[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      // Initialize with sample data
      localStorage.setItem(STORAGE_KEY, JSON.stringify(sampleData));
      return sampleData;
    }
    return JSON.parse(data);
  } catch (error) {
    console.error('Error retrieving data from localStorage:', error);
    return [];
  }
};

export const saveInfluencers = (influencers: Influencer[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(influencers));
  } catch (error) {
    console.error('Error saving data to localStorage:', error);
  }
};

// Simulate async operations
export const fetchInfluencers = (): Promise<Influencer[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(getInfluencers());
    }, 800); // Simulate network delay
  });
};

export const saveInfluencersAsync = (influencers: Influencer[]): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      saveInfluencers(influencers);
      resolve();
    }, 600); // Simulate network delay
  });
};