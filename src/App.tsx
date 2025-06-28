import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ResourceList from './components/ResourceList';
import Leaderboard from './components/Leaderboard';
import SuggestionBoard from './components/SuggestionBoard';
import BranchRepresentatives from './components/BranchRepresentatives';
import ImpactPage from './components/ImpactPage';
import RequestsPage from './components/RequestsPage';
import CommunityHealthPage from './components/CommunityHealthPage';
import Footer from './components/Footer';
import { Resource, User, Suggestion, PlatformStats, ResourceRequest } from './types';
import { mockResources, mockUsers, mockSuggestions, mockStats, mockResourceRequests, mockBranchReps } from './data/mockData';

function App() {
  const [currentPage, setCurrentPage] = useState('impact'); // Changed default to impact
  
  // State for mock data that will be updated
  const [resources, setResources] = useState<Resource[]>(mockResources);
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [suggestions, setSuggestions] = useState<Suggestion[]>(mockSuggestions);
  const [stats, setStats] = useState<PlatformStats>(mockStats);
  const [requests, setRequests] = useState<ResourceRequest[]>(mockResourceRequests);

  // Calculate total paper saved for impact page - only from claimed resources with pages
  const totalPaperSaved = resources
    .filter(r => r.claimed && r.pages)
    .reduce((total, r) => total + (r.pages! / 1000), 0);

  // Update community health based on activity
  useEffect(() => {
    const now = new Date();
    const lastActivity = new Date(stats.lastActivity);
    const daysSinceActivity = Math.floor((now.getTime() - lastActivity.getTime()) / (1000 * 60 * 60 * 24));
    
    let healthDecay = Math.max(0, daysSinceActivity * 5); // 5% decay per day
    let newHealth = Math.max(20, stats.communityHealth - healthDecay);
    
    // Boost health based on recent activity
    const recentResources = resources.filter(r => {
      const resourceDate = new Date(r.dateAdded);
      return (now.getTime() - resourceDate.getTime()) < (7 * 24 * 60 * 60 * 1000); // Last 7 days
    });
    
    if (recentResources.length > 0) {
      newHealth = Math.min(100, newHealth + (recentResources.length * 2));
    }
    
    setStats(prev => ({ ...prev, communityHealth: Math.round(newHealth) }));
  }, [resources, stats.lastActivity, stats.communityHealth]);

  // Generate ID for new items
  const generateId = () => Date.now().toString();

  const handleAddResource = (newResourceData: Omit<Resource, 'id' | 'dateAdded' | 'claimed'>) => {
    const newResource: Resource = {
      ...newResourceData,
      id: generateId(),
      dateAdded: new Date().toISOString().split('T')[0],
      claimed: false
    };
    
    setResources(prev => [newResource, ...prev]);
    
    // Update stats and community health
    setStats(prev => ({
      ...prev,
      totalResources: prev.totalResources + 1,
      lastActivity: new Date().toISOString().split('T')[0],
      communityHealth: Math.min(100, prev.communityHealth + 5)
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
      const paperSaved = claimedResource.pages ? claimedResource.pages / 1000 : 0;
      
      setStats(prev => ({
        ...prev,
        totalClaimed: prev.totalClaimed + 1,
        moneySaved: prev.moneySaved + (claimedResource.price || 0),
        environmentalImpact: prev.environmentalImpact + paperSaved,
        lastActivity: new Date().toISOString().split('T')[0],
        communityHealth: Math.min(100, prev.communityHealth + 3)
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
    
    // Boost community health for engagement
    setStats(prev => ({
      ...prev,
      communityHealth: Math.min(100, prev.communityHealth + 2)
    }));
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

  const handleAddRequest = (newRequestData: Omit<ResourceRequest, 'id' | 'dateRequested' | 'fulfilled'>) => {
    const newRequest: ResourceRequest = {
      ...newRequestData,
      id: generateId(),
      dateRequested: new Date().toISOString().split('T')[0],
      fulfilled: false
    };
    
    setRequests(prev => [newRequest, ...prev]);
  };

  const handleFulfillRequest = (requestId: string) => {
    setRequests(prev =>
      prev.map(request =>
        request.id === requestId
          ? { ...request, fulfilled: true }
          : request
      )
    );
    
    // Boost community health for helping others
    setStats(prev => ({
      ...prev,
      communityHealth: Math.min(100, prev.communityHealth + 5)
    }));
  };

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onNavigate={handleNavigate} currentPage={currentPage} />
      
      {currentPage === 'impact' && (
        <ImpactPage stats={stats} totalPaperSaved={totalPaperSaved} />
      )}
      
      {currentPage === 'resources' && (
        <ResourceList
          resources={resources}
          onAddResource={handleAddResource}
          onClaimResource={handleClaimResource}
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

      {currentPage === 'health' && (
        <CommunityHealthPage stats={stats} onNavigate={handleNavigate} />
      )}

      {currentPage === 'representatives' && (
        <BranchRepresentatives representatives={mockBranchReps} />
      )}

      {currentPage === 'requests' && (
        <RequestsPage
          requests={requests}
          onAddRequest={handleAddRequest}
          onFulfillRequest={handleFulfillRequest}
        />
      )}
      
      <Footer />
    </div>
  );
}

export default App;