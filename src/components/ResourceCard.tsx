import React from 'react';
import { Gift, DollarSign, Clock, CheckCircle, User } from 'lucide-react';
import { Resource } from '../types';

interface ResourceCardProps {
  resource: Resource;
  onClaim: (resourceId: string) => void;
}

const ResourceCard: React.FC<ResourceCardProps> = ({ resource, onClaim }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6 border border-gray-100">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">{resource.title}</h3>
          <p className="text-gray-600 text-sm mb-3">{resource.description}</p>
        </div>
        
        <div className={`flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium ${
          resource.type === 'donate' 
            ? 'bg-green-100 text-green-700' 
            : 'bg-blue-100 text-blue-700'
        }`}>
          {resource.type === 'donate' ? <Gift className="h-3 w-3" /> : <DollarSign className="h-3 w-3" />}
          <span>{resource.type === 'donate' ? 'Free' : `₹${resource.price}`}</span>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center text-sm text-gray-500">
          <User className="h-4 w-4 mr-2" />
          <span>Offered by {resource.offeredBy}</span>
        </div>
        
        <div className="flex items-center text-sm text-gray-500">
          <Clock className="h-4 w-4 mr-2" />
          <span>Added on {formatDate(resource.dateAdded)}</span>
        </div>

        {resource.motivationalMessage && (
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-3 rounded-lg border-l-4 border-blue-400">
            <p className="text-sm text-gray-700 italic">"{resource.motivationalMessage}"</p>
          </div>
        )}

        {resource.claimed ? (
          <div className="flex items-center justify-center space-x-2 bg-green-50 text-green-700 py-2 px-4 rounded-lg">
            <CheckCircle className="h-4 w-4" />
            <span className="text-sm font-medium">Claimed by {resource.claimedBy}</span>
          </div>
        ) : (
          <button
            onClick={() => onClaim(resource.id)}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-2 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-200 transform hover:scale-105"
          >
            Claim Resource
          </button>
        )}
      </div>
    </div>
  );
};

export default ResourceCard;