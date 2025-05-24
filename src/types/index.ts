export interface VideoPost {
  id: string;
  url: string;
  postedDate: string;
  viewsCount: number;
}

export interface Influencer {
  id: string;
  username: string;
  profileUrl: string;
  platform: 'Instagram' | 'TikTok' | 'Both';
  viewsMedian: number;
  totalViews: number; // Calculated: viewsMedian * 5
  currentViews: number;
  videoPosts: VideoPost[];
  status: 'Posted' | 'Script Needed' | 'Approval Needed';
  isPaid: boolean;
}

export type SortField = 
  | 'username' 
  | 'viewsMedian' 
  | 'totalViews' 
  | 'currentViews' 
  | 'status'
  | 'isPaid';

export type SortDirection = 'asc' | 'desc';

export interface SortConfig {
  field: SortField;
  direction: SortDirection;
}

export type StatusFilter = 'All' | 'Posted' | 'Script Needed' | 'Approval Needed';

export type PlatformType = 'Instagram' | 'TikTok' | 'Both';