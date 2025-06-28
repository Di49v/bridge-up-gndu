import React from 'react';
import { ChevronRight, Users, Gift, DollarSign } from 'lucide-react';
import { ResourceGroup } from '../types';

interface ResourceGroupCardProps {
  group: ResourceGroup;
  onClick: () => void;
}

const ResourceGroupCard: React.FC<ResourceGroupCardProps> = ({ group, onClick }) => {
  const donateCount = group.resources.filter(r => r.type === 'donate' && !r.claimed).length;
  const sellCount = group.resources.filter(r => r.type === 'sell' && !r.claimed).length;

  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6 border border-gray-100 cursor-pointer group"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
          {group.title}
        </h3>
        <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
      </div>

      <p className="text-gray-600 text-sm mb-4">{group.description}</p>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1 text-sm">
            <Users className="h-4 w-4 text-blue-600" />
            <span className="text-gray-600">{group.totalAvailable} available</span>
          </div>
          
          {donateCount > 0 && (
            <div className="flex items-center space-x-1 text-sm">
              <Gift className="h-4 w-4 text-green-600" />
              <span className="text-green-600">{donateCount} free</span>
            </div>
          )}
          
          {sellCount > 0 && (
            <div className="flex items-center space-x-1 text-sm">
              <DollarSign className="h-4 w-4 text-blue-600" />
              <span className="text-blue-600">{sellCount} for sale</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResourceGroupCard;