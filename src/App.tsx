import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import BranchSelector from './components/BranchSelector';
import ResourceList from './components/ResourceList';
import Leaderboard from './components/Leaderboard';
import SuggestionBoard from './components/SuggestionBoard';
import { Resource, User, Suggestion, PlatformStats } from './types';
import { mockResources, mockUsers, mockSuggestions, mockStats } from './data/mockData';

function App() {
  const [currentPage, setCurrentPage] = useState('selector');
  const [selectedBranch, setSelectedBranch] = useState('');
  const [selectedSemester, setSelectedSemester] = useState(0);
  
  // State for mock data that will be updated
  const [resources, setResources] = useState<Resource[]>(mockResources);
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [suggestions, setSuggestions] = useState<Suggestion[]>(mockSuggestions);
  const [stats, setStats] = useState<PlatformStats>(mockStats);

  // Generate ID for new items
  const generateId = () => Date.now().toString();

  const handleContinueFromSelector = () => {
    if (selectedBranch && selectedSemester) {
      setCurrentPage('resources');
    }
  };

  const handleAddResource = (newResourceData: Omit<Resource, 'id' | 'dateAdded' | 'claimed'>) => {
    const newResource: Resource = {
      ...newResourceData,
      id: generateId(),
      dateAdded: new Date().toISOString().split('T')[0],
      claimed: false
    };
    
    setResources(prev => [newResource, ...prev]);
    
    // Update stats
    setStats(prev => ({
      ...prev,
      totalResources: prev.totalResources + 1,
      lastActivity: new Date().toISOString().split('T')[0]
    }));
  };

  const handleClaimResource = (resourceId: string) => {
    setResources(prev => 
      prev.map(resource => 
        resource.id === resourceId 
          ? { ...resource, claimed: true, claimedBy: 'Current User' }
          : resource
      )
    );
    
    // Find the claimed resource to update stats
    const claimedResource = resources.find(r => r.id === resourceId);
    if (claimedResource) {
      setStats(prev => ({
        ...prev,
        totalClaimed: prev.totalClaimed + 1,
        moneySaved: prev.moneySaved + (claimedResource.price || 0),
        environmentalImpact: prev.environmentalImpact + 1,
        lastActivity: new Date().toISOString().split('T')[0]
      }));
    }
  };

  const handleAddSuggestion = (newSuggestionData: Omit<Suggestion, 'id' | 'dateAdded' | 'likes'>) => {
    const newSuggestion: Suggestion = {
      ...newSuggestionData,
      id: generateId(),
      dateAdded: new Date().toISOString().split('T')[0],
      likes: 0
    };
    
    setSuggestions(prev => [newSuggestion, ...prev]);
  };

  const handleLikeSuggestion = (suggestionId: string) => {
    setSuggestions(prev =>
      prev.map(suggestion =>
        suggestion.id === suggestionId
          ? { ...suggestion, likes: suggestion.likes + 1 }
          : suggestion
      )
    );
  };

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
  };

  if (currentPage === 'selector') {
    return (
      <BranchSelector
        selectedBranch={selectedBranch}
        selectedSemester={selectedSemester}
        onBranchChange={setSelectedBranch}
        onSemesterChange={setSelectedSemester}
        onContinue={handleContinueFromSelector}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onNavigate={handleNavigate} currentPage={currentPage} />
      
      {currentPage === 'resources' && (
        <ResourceList
          resources={resources}
          selectedBranch={selectedBranch}
          selectedSemester={selectedSemester}
          onAddResource={handleAddResource}
          onClaimResource={handleClaimResource}
          onBranchChange={setSelectedBranch}
          onSemesterChange={setSelectedSemester}
        />
      )}
      
      {currentPage === 'leaderboard' && (
        <Leaderboard users={users} stats={stats} />
      )}
      
      {currentPage === 'suggestions' && (
        <SuggestionBoard
          suggestions={suggestions}
          onAddSuggestion={handleAddSuggestion}
          onLikeSuggestion={handleLikeSuggestion}
        />
      )}
    </div>
  );
}

export default App;