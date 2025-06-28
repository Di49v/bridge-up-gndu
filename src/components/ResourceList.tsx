import React, { useState } from 'react';
import { Plus, Search, Filter, AlertTriangle } from 'lucide-react';
import { Resource, ResourceGroup } from '../types';
import ResourceGroupCard from './ResourceGroupCard';
import ResourceDetailModal from './ResourceDetailModal';
import AddResourceModal from './AddResourceModal';

interface ResourceListProps {
  resources: Resource[];
  selectedBranch: string;
  selectedSemester: number;
  onAddResource: (resource: Omit<Resource, 'id' | 'dateAdded' | 'claimed'>) => void;
  onClaimResource: (resourceId: string) => void;
  onBranchChange: (branch: string) => void;
  onSemesterChange: (semester: number) => void;
}

const ResourceList: React.FC<ResourceListProps> = ({
  resources,
  selectedBranch,
  selectedSemester,
  onAddResource,
  onClaimResource,
  onBranchChange,
  onSemesterChange
}) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilter, setShowFilter] = useState(false);
  const [selectedResourceGroup, setSelectedResourceGroup] = useState<ResourceGroup | null>(null);

  const filteredResources = resources.filter(resource => {
    const matchesBranch = resource.branch === selectedBranch;
    const matchesSemester = resource.semester === selectedSemester;
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesBranch && matchesSemester && matchesSearch;
  });

  // Group resources by title
  const groupedResources = filteredResources.reduce((groups, resource) => {
    const key = resource.title.toLowerCase();
    if (!groups[key]) {
      groups[key] = {
        title: resource.title,
        description: `Available from multiple students`,
        resources: [],
        totalAvailable: 0
      };
    }
    groups[key].resources.push(resource);
    if (!resource.claimed) {
      groups[key].totalAvailable++;
    }
    return groups;
  }, {} as Record<string, ResourceGroup>);

  const resourceGroups = Object.values(groupedResources).sort((a, b) => 
    b.totalAvailable - a.totalAvailable
  );

  const totalAvailable = resourceGroups.reduce((sum, group) => sum + group.totalAvailable, 0);

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                {selectedBranch} - Semester {selectedSemester}
              </h2>
              <p className="text-gray-600">
                {totalAvailable} resources available across {resourceGroups.length} categories
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => setShowFilter(!showFilter)}
                className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Filter className="h-4 w-4" />
                <span>Change Filter</span>
              </button>
              
              <button
                onClick={() => setShowAddModal(true)}
                className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="h-4 w-4" />
                <span>Add Resource</span>
              </button>
            </div>
          </div>

          {/* Search */}
          <div className="mt-4 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search resources..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Filter Panel */}
          {showFilter && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg border">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Branch</label>
                  <select
                    value={selectedBranch}
                    onChange={(e) => onBranchChange(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    {['CSE', 'ECE', 'ME', 'CE', 'IT', 'EE', 'BCA', 'MCA'].map(branch => (
                      <option key={branch} value={branch}>{branch}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Semester</label>
                  <select
                    value={selectedSemester}
                    onChange={(e) => onSemesterChange(Number(e.target.value))}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map(sem => (
                      <option key={sem} value={sem}>Semester {sem}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* No Resources Warning */}
        {resourceGroups.length === 0 && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mb-6">
            <div className="flex items-center space-x-3">
              <AlertTriangle className="h-6 w-6 text-yellow-600" />
              <div>
                <h3 className="text-lg font-semibold text-yellow-800">No Resources Found</h3>
                <p className="text-yellow-700">
                  Be the first to share resources for {selectedBranch} Semester {selectedSemester}!
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Resource Groups */}
        {resourceGroups.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resourceGroups.map((group, index) => (
              <ResourceGroupCard
                key={index}
                group={group}
                onClick={() => setSelectedResourceGroup(group)}
              />
            ))}
          </div>
        )}

        {/* Add Resource Modal */}
        {showAddModal && (
          <AddResourceModal
            selectedBranch={selectedBranch}
            selectedSemester={selectedSemester}
            onClose={() => setShowAddModal(false)}
            onSubmit={onAddResource}
          />
        )}

        {/* Resource Detail Modal */}
        {selectedResourceGroup && (
          <ResourceDetailModal
            resources={selectedResourceGroup.resources}
            title={selectedResourceGroup.title}
            onClose={() => setSelectedResourceGroup(null)}
            onClaim={onClaimResource}
          />
        )}
      </div>
    </div>
  );
};

export default ResourceList;