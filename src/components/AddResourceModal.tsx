import React, { useState, useEffect } from 'react';
import { X, Gift, DollarSign, Star, Leaf } from 'lucide-react';
import { Resource, RESOURCE_POINTS } from '../types';

interface AddResourceModalProps {
  selectedBranch: string;
  selectedSemester: number;
  onClose: () => void;
  onSubmit: (resource: Omit<Resource, 'id' | 'dateAdded' | 'claimed'>) => void;
}

const AddResourceModal: React.FC<AddResourceModalProps> = ({
  selectedBranch,
  selectedSemester,
  onClose,
  onSubmit
}) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    branch: selectedBranch,
    semester: selectedSemester,
    type: 'donate' as 'donate' | 'sell',
    price: '',
    offeredBy: 'Current User', // In real app, this would come from auth
    motivationalMessage: '',
    handoverInstructions: '',
    contactInfo: '',
    pages: ''
  });

  const [calculatedImpact, setCalculatedImpact] = useState(0);
  const [points, setPoints] = useState(0);

  useEffect(() => {
    // Calculate environmental impact
    if (formData.pages && formData.title.toLowerCase().includes('book') || formData.title.toLowerCase().includes('manual') || formData.title.toLowerCase().includes('notes')) {
      const paperSaved = Number(formData.pages) / 1000; // 1kg ≈ 1000 pages
      setCalculatedImpact(paperSaved);
    } else {
      setCalculatedImpact(0);
    }

    // Calculate points
    const resourcePoints = RESOURCE_POINTS[formData.title] || RESOURCE_POINTS.default;
    setPoints(resourcePoints);
  }, [formData.pages, formData.title]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const resource: Omit<Resource, 'id' | 'dateAdded' | 'claimed'> = {
      title: formData.title,
      description: formData.description,
      branch: formData.branch,
      semester: formData.semester,
      type: formData.type,
      price: formData.type === 'sell' ? Number(formData.price) : undefined,
      offeredBy: formData.offeredBy,
      motivationalMessage: formData.motivationalMessage,
      handoverInstructions: formData.handoverInstructions,
      contactInfo: formData.contactInfo,
      pages: formData.pages ? Number(formData.pages) : undefined,
      points: points
    };
    
    onSubmit(resource);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">Add New Resource</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Resource Title *
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              placeholder="e.g., Mini Drafter, Data Structures Textbook, PYQS"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              required
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              placeholder="Describe the condition, contents, and any special notes..."
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Branch</label>
              <select
                value={formData.branch}
                onChange={(e) => setFormData({...formData, branch: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                {['CSE', 'ECE', 'ME', 'CE', 'IT', 'EE', 'BCA', 'MCA'].map(branch => (
                  <option key={branch} value={branch}>{branch}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Semester</label>
              <select
                value={formData.semester}
                onChange={(e) => setFormData({...formData, semester: Number(e.target.value)})}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8].map(sem => (
                  <option key={sem} value={sem}>Semester {sem}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Sharing Type</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setFormData({...formData, type: 'donate', price: ''})}
                className={`p-4 rounded-lg border-2 transition-all ${
                  formData.type === 'donate' 
                    ? 'border-green-500 bg-green-50 text-green-700' 
                    : 'border-gray-200 hover:border-green-300'
                }`}
              >
                <Gift className="h-6 w-6 mx-auto mb-2" />
                <div className="font-medium">Donate</div>
                <div className="text-sm text-gray-600">Share for free</div>
                <div className="flex items-center justify-center mt-2 text-xs text-green-600">
                  <Star className="h-3 w-3 mr-1" />
                  <span>{points} points when claimed</span>
                </div>
              </button>
              <button
                type="button"
                onClick={() => setFormData({...formData, type: 'sell'})}
                className={`p-4 rounded-lg border-2 transition-all ${
                  formData.type === 'sell' 
                    ? 'border-blue-500 bg-blue-50 text-blue-700' 
                    : 'border-gray-200 hover:border-blue-300'
                }`}
              >
                <DollarSign className="h-6 w-6 mx-auto mb-2" />
                <div className="font-medium">Sell</div>
                <div className="text-sm text-gray-600">Set a price</div>
                <div className="flex items-center justify-center mt-2 text-xs text-blue-600">
                  <Star className="h-3 w-3 mr-1" />
                  <span>{points} points when claimed</span>
                </div>
              </button>
            </div>
          </div>

          {formData.type === 'sell' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price (₹) *
              </label>
              <input
                type="number"
                required
                min="1"
                value={formData.price}
                onChange={(e) => setFormData({...formData, price: e.target.value})}
                placeholder="Enter amount"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          )}

          {/* Impact Calculator */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Number of Pages (for books/manuals)
            </label>
            <input
              type="number"
              value={formData.pages}
              onChange={(e) => setFormData({...formData, pages: e.target.value})}
              placeholder="e.g., 500"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            {calculatedImpact > 0 && (
              <div className="mt-2 p-3 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center space-x-2 text-green-700">
                  <Leaf className="h-4 w-4" />
                  <span className="text-sm font-medium">
                    Environmental Impact: ~{calculatedImpact.toFixed(2)} kg of paper saved!
                  </span>
                </div>
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Handover Instructions *
            </label>
            <textarea
              required
              rows={2}
              value={formData.handoverInstructions}
              onChange={(e) => setFormData({...formData, handoverInstructions: e.target.value})}
              placeholder="Where and when can juniors collect this? e.g., CSE department, hostel room, library..."
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Contact Information *
            </label>
            <input
              type="text"
              required
              value={formData.contactInfo}
              onChange={(e) => setFormData({...formData, contactInfo: e.target.value})}
              placeholder="WhatsApp: +91 98765-43210 or Email: your.email@gndu.ac.in"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Motivational Message
            </label>
            <textarea
              rows={2}
              value={formData.motivationalMessage}
              onChange={(e) => setFormData({...formData, motivationalMessage: e.target.value})}
              placeholder="Share some encouraging words or tips for your juniors..."
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Add Resource
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddResourceModal;