import React from 'react';

interface StatusBadgeProps {
  status: 'Posted' | 'Script Needed' | 'Approval Needed';
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  let colorClasses = '';
  
  switch (status) {
    case 'Posted':
      colorClasses = 'bg-green-100 text-green-800 border-green-200';
      break;
    case 'Script Needed':
      colorClasses = 'bg-amber-100 text-amber-800 border-amber-200';
      break;
    case 'Approval Needed':
      colorClasses = 'bg-purple-100 text-purple-800 border-purple-200';
      break;
  }

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${colorClasses}`}>
      {status}
    </span>
  );
};

export default StatusBadge;