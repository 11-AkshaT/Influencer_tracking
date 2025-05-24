import React from 'react';
import { PlatformType } from '../types';

interface PlatformBadgeProps {
  platform: PlatformType;
}

const PlatformBadge: React.FC<PlatformBadgeProps> = ({ platform }) => {
  let colorClasses = '';
  let label = platform;
  
  switch (platform) {
    case 'Instagram':
      colorClasses = 'bg-gradient-to-r from-purple-500 to-pink-500 text-white';
      break;
    case 'TikTok':
      colorClasses = 'bg-black text-white';
      break;
    case 'Both':
      colorClasses = 'bg-gradient-to-r from-black via-gray-800 to-pink-500 text-white';
      label = 'Insta + TikTok';
      break;
  }

  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium ${colorClasses}`}>
      {label}
    </span>
  );
};

export default PlatformBadge;