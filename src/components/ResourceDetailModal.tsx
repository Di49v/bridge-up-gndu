import React from 'react';
import { X, Gift, DollarSign, Clock, User, MapPin, MessageCircle, Phone } from 'lucide-react';
import { Resource } from '../types';

interface ResourceDetailModalProps {
  resources: Resource[];
  title: string;
  onClose: () => void;
  onClaim: (resourceId: string) => void;
}

const ResourceDetailModal: React.FC<ResourceDetailModalProps> = ({
  resources,
  title,
  onClose,
  onClaim
}) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const handleContact = (contactInfo: string) => {
    if (contactInfo.includes('WhatsApp') || contactInfo.includes('+91')) {
      const phoneNumber = contactInfo.match(/\+91\s?[\d-]+/)?.[0]?.replace(/\s|-/g, '');
      if (phoneNumber) {
        window.open(`https://wa.me/${phoneNumber}`, '_blank');
      }
    } else if (contactInfo.includes('@')) {
      const email = contactInfo.match(/[\w.-]+@[\w.-]+\.\w+/)?.[0];
      if (email) {
        window.open(`mailto:${email}`, '_blank');
      }
    } else if (contactInfo.includes('Telegram')) {
      const username = contactInfo.match(/@\w+/)?.[0];
      if (username) {
        window.open(`https://t.me/${username.slice(1)}`, '_blank');
      }
    }
  };

  const availableResources = resources.filter(r => !r.claimed);
  const claimedResources = resources.filter(r => r.claimed);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6">
          {availableResources.length > 0 && (
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Available ({availableResources.length})
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {availableResources.map(resource => (
                  <div key={resource.id} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium mb-3 ${
                          resource.type === 'donate' 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-blue-100 text-blue-700'
                        }`}>
                          {resource.type === 'donate' ? <Gift className="h-3 w-3" /> : <DollarSign className="h-3 w-3" />}
                          <span>{resource.type === 'donate' ? 'Free' : `₹${resource.price}`}</span>
                        </div>
                        <p className="text-gray-700 text-sm mb-3">{resource.description}</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center text-sm text-gray-600">
                        <User className="h-4 w-4 mr-2" />
                        <span>{resource.offeredBy}</span>
                      </div>
                      
                      <div className="flex items-center text-sm text-gray-600">
                        <Clock className="h-4 w-4 mr-2" />
                        <span>Added on {formatDate(resource.dateAdded)}</span>
                      </div>

                      <div className="flex items-start text-sm text-gray-600">
                        <MapPin className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                        <span>{resource.handoverInstructions}</span>
                      </div>

                      {resource.motivationalMessage && (
                        <div className="bg-blue-50 p-3 rounded-lg border-l-4 border-blue-400">
                          <p className="text-sm text-gray-700 italic">"{resource.motivationalMessage}"</p>
                        </div>
                      )}

                      <div className="flex space-x-2 pt-2">
                        <button
                          onClick={() => handleContact(resource.contactInfo)}
                          className="flex-1 flex items-center justify-center space-x-2 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
                        >
                          <MessageCircle className="h-4 w-4" />
                          <span>Contact</span>
                        </button>
                        <button
                          onClick={() => onClaim(resource.id)}
                          className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          Claim
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {claimedResources.length > 0 && (
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Recently Claimed ({claimedResources.length})
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {claimedResources.map(resource => (
                  <div key={resource.id} className="bg-gray-100 rounded-lg p-6 border border-gray-300 opacity-75">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium mb-3 bg-gray-200 text-gray-600">
                          <span>Claimed</span>
                        </div>
                        <p className="text-gray-600 text-sm mb-3">{resource.description}</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center text-sm text-gray-500">
                        <User className="h-4 w-4 mr-2" />
                        <span>Was offered by {resource.offeredBy}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <span>Claimed by {resource.claimedBy}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {availableResources.length === 0 && claimedResources.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No resources available for this item yet.</p>
              <p className="text-gray-400 text-sm mt-2">Be the first to share this resource!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResourceDetailModal;