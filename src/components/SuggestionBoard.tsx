import React, { useState } from 'react';
import { Heart, MessageSquare, Plus, Calendar, Target, Filter } from 'lucide-react';
import { Suggestion } from '../types';
import EmptyState from './EmptyState';

interface SuggestionBoardProps {
  suggestions: Suggestion[];
  onAddSuggestion: (suggestion: Omit<Suggestion, 'id' | 'dateAdded' | 'likes'>) => void;
  onLikeSuggestion: (suggestionId: string) => void;
}

const SuggestionBoard: React.FC<SuggestionBoardProps> = ({
  suggestions,
  onAddSuggestion,
  onLikeSuggestion
}) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [filterBranch, setFilterBranch] = useState<string>('All');
  const [filterSemester, setFilterSemester] = useState<number | 'All'>('All');
  const [newSuggestion, setNewSuggestion] = useState({
    message: '',
    author: 'Current User', // In real app, this would come from auth
    branch: 'CSE',
    semester: 6,
    targetSemester: 1
  });

  const branches = ['All', 'CSE', 'ECE', 'ME', 'CE', 'IT', 'EE', 'BCA', 'MCA'];
  const semesters = ['All', 1, 2, 3, 4, 5, 6, 7, 8];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddSuggestion(newSuggestion);
    setNewSuggestion({ ...newSuggestion, message: '' });
    setShowAddForm(false);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const filteredSuggestions = suggestions.filter(suggestion => {
    const matchesBranch = filterBranch === 'All' || suggestion.branch === filterBranch;
    const matchesSemester = filterSemester === 'All' || suggestion.targetSemester === filterSemester;
    return matchesBranch && matchesSemester;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 flex items-center space-x-2">
                <MessageSquare className="h-6 w-6 text-blue-600" />
                <span>Senior Tips & Guidance</span>
              </h2>
              <p className="text-gray-600 mt-1">
                Wisdom from seniors to help you succeed in your academic journey
              </p>
            </div>
            
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="h-4 w-4" />
              <span>Share Tip</span>
            </button>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Branch</label>
              <select
                value={filterBranch}
                onChange={(e) => setFilterBranch(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                {branches.map(branch => (
                  <option key={branch} value={branch}>
                    {branch === 'All' ? 'All Branches' : branch}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Target Semester</label>
              <select
                value={filterSemester}
                onChange={(e) => setFilterSemester(e.target.value === 'All' ? 'All' : Number(e.target.value))}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                {semesters.map(sem => (
                  <option key={sem} value={sem}>
                    {sem === 'All' ? 'All Semesters' : `Semester ${sem}`}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Add Suggestion Form */}
          {showAddForm && (
            <form onSubmit={handleSubmit} className="mt-6 p-4 bg-gray-50 rounded-lg border">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your advice for juniors
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={newSuggestion.message}
                    onChange={(e) => setNewSuggestion({...newSuggestion, message: e.target.value})}
                    placeholder="Share your insights, tips, or motivational message..."
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Your Branch</label>
                    <select
                      value={newSuggestion.branch}
                      onChange={(e) => setNewSuggestion({...newSuggestion, branch: e.target.value})}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      {['CSE', 'ECE', 'ME', 'CE', 'IT', 'EE', 'BCA', 'MCA'].map(branch => (
                        <option key={branch} value={branch}>{branch}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Your Semester</label>
                    <select
                      value={newSuggestion.semester}
                      onChange={(e) => setNewSuggestion({...newSuggestion, semester: Number(e.target.value)})}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      {[4, 5, 6, 7, 8].map(sem => (
                        <option key={sem} value={sem}>Semester {sem}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">For Semester</label>
                    <select
                      value={newSuggestion.targetSemester}
                      onChange={(e) => setNewSuggestion({...newSuggestion, targetSemester: Number(e.target.value)})}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8].map(sem => (
                        <option key={sem} value={sem}>Semester {sem}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Share Tip
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>

        {/* Suggestions List */}
        {filteredSuggestions.length === 0 ? (
          <EmptyState 
            type="suggestions" 
            onAction={() => setShowAddForm(true)}
            actionLabel="Share Your First Tip"
          />
        ) : (
          <div className="space-y-6">
            {filteredSuggestions.map((suggestion) => (
              <div
                key={suggestion.id}
                className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                      {suggestion.author.charAt(0)}
                    </div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="font-semibold text-gray-800">{suggestion.author}</h3>
                      <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-medium">
                        {suggestion.branch} - Sem {suggestion.semester}
                      </span>
                      <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-medium flex items-center space-x-1">
                        <Target className="h-3 w-3" />
                        <span>For Sem {suggestion.targetSemester}</span>
                      </span>
                    </div>
                    
                    <p className="text-gray-700 mb-4 leading-relaxed">{suggestion.message}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>{formatDate(suggestion.dateAdded)}</span>
                        </div>
                      </div>
                      
                      <button
                        onClick={() => onLikeSuggestion(suggestion.id)}
                        className="flex items-center space-x-2 px-3 py-1 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                      >
                        <Heart className="h-4 w-4" />
                        <span>{suggestion.likes}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SuggestionBoard;