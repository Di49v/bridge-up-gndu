import React, { useState } from 'react';
import { Search, Plus, Clock, CheckCircle, User } from 'lucide-react';
import { ResourceRequest } from '../types';
import RequestResourceModal from './RequestResourceModal';
import EmptyState from './EmptyState';

interface RequestsPageProps {
  requests: ResourceRequest[];
  onAddRequest: (request: Omit<ResourceRequest, 'id' | 'dateRequested' | 'fulfilled'>) => void;
  onFulfillRequest: (requestId: string) => void;
}

const RequestsPage: React.FC<RequestsPageProps> = ({
  requests,
  onAddRequest,
  onFulfillRequest
}) => {
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [filterBranch, setFilterBranch] = useState<string>('All');

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const filteredRequests = requests.filter(request => {
    const matchesBranch = filterBranch === 'All' || request.branch === filterBranch;
    return matchesBranch;
  });

  const pendingRequests = filteredRequests.filter(r => !r.fulfilled);
  const fulfilledRequests = filteredRequests.filter(r => r.fulfilled);

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 flex items-center space-x-2">
                <Search className="h-6 w-6 text-blue-600" />
                <span>Resource Requests</span>
              </h2>
              <p className="text-gray-600 mt-1">
                Can't find what you need? Request it here and let seniors help you!
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Branch</label>
                <select
                  value={filterBranch}
                  onChange={(e) => setFilterBranch(e.target.value)}
                  className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="All">All Branches</option>
                  {['CSE', 'ECE', 'ME', 'CE', 'IT', 'EE', 'BCA', 'MCA'].map(branch => (
                    <option key={branch} value={branch}>{branch}</option>
                  ))}
                </select>
              </div>
              
              <div className="flex items-end">
                <button
                  onClick={() => setShowRequestModal(true)}
                  className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Plus className="h-4 w-4" />
                  <span>Request Resource</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Pending Requests */}
        {pendingRequests.length > 0 && (
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Pending Requests ({pendingRequests.length})
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pendingRequests.map(request => (
                <div key={request.id} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6 border border-gray-100">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-gray-800 mb-2">{request.title}</h4>
                      <p className="text-gray-600 text-sm mb-3">{request.description}</p>
                    </div>
                    
                    <div className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-medium">
                      Pending
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center text-sm text-gray-500">
                      <User className="h-4 w-4 mr-2" />
                      <span>Requested by {request.requestedBy}</span>
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="h-4 w-4 mr-2" />
                      <span>Requested on {formatDate(request.dateRequested)}</span>
                    </div>

                    <div className="bg-blue-50 p-3 rounded-lg">
                      <p className="text-sm text-blue-800">
                        <strong>{request.branch} - Semester {request.semester}</strong>
                      </p>
                    </div>

                    <button
                      onClick={() => onFulfillRequest(request.id)}
                      className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
                    >
                      I Have This Resource
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Fulfilled Requests */}
        {fulfilledRequests.length > 0 && (
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Fulfilled Requests ({fulfilledRequests.length})
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {fulfilledRequests.map(request => (
                <div key={request.id} className="bg-gray-50 rounded-xl shadow-sm p-6 border border-gray-200 opacity-75">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-gray-700 mb-2">{request.title}</h4>
                      <p className="text-gray-500 text-sm mb-3">{request.description}</p>
                    </div>
                    
                    <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
                      <CheckCircle className="h-3 w-3" />
                      <span>Fulfilled</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-gray-400">
                      <User className="h-4 w-4 mr-2" />
                      <span>Requested by {request.requestedBy}</span>
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-400">
                      <Clock className="h-4 w-4 mr-2" />
                      <span>Requested on {formatDate(request.dateRequested)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {filteredRequests.length === 0 && (
          <EmptyState 
            type="requests" 
            onAction={() => setShowRequestModal(true)}
            actionLabel="Make First Request"
          />
        )}

        {/* Request Modal */}
        {showRequestModal && (
          <RequestResourceModal
            selectedBranch="CSE"
            selectedSemester={1}
            onClose={() => setShowRequestModal(false)}
            onSubmit={onAddRequest}
          />
        )}
      </div>
    </div>
  );
};

export default RequestsPage;