import React, { useState } from 'react';
import { Sprout, Leaf, TreePine, AlertTriangle, TrendingUp, Users, BookOpen, MessageSquare } from 'lucide-react';
import { PlatformStats } from '../types';

interface CommunityHealthPageProps {
  stats: PlatformStats;
  onNavigate: (page: string) => void;
}

const CommunityHealthPage: React.FC<CommunityHealthPageProps> = ({ stats, onNavigate }) => {
  const [selectedBranch, setSelectedBranch] = useState<string>('All');
  const branches = ['All', 'CSE', 'ECE', 'ME', 'CE', 'IT', 'EE', 'BCA', 'MCA'];

  // Mock branch-wise health data (in real app, this would come from props)
  const branchHealth = {
    'CSE': 85,
    'ECE': 72,
    'ME': 68,
    'CE': 45,
    'IT': 78,
    'EE': 52,
    'BCA': 91,
    'MCA': 63
  };

  const getHealthColor = (health: number) => {
    if (health >= 70) return 'bg-green-500';
    if (health >= 40) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getHealthIcon = (health: number) => {
    if (health >= 70) return <TreePine className="h-6 w-6 text-green-600" />;
    if (health >= 40) return <Leaf className="h-6 w-6 text-yellow-600" />;
    return <Sprout className="h-6 w-6 text-red-600" />;
  };

  const getHealthMessage = (health: number) => {
    if (health >= 80) return "Community is thriving! 🌳";
    if (health >= 60) return "Community is healthy and growing! 🌿";
    if (health >= 40) return "Community needs some attention 🌱";
    if (health >= 20) return "Community is wilting! Share or claim resources to help! 🥀";
    return "Community is in critical condition! Urgent action needed! ⚠️";
  };

  const getActionSuggestions = (health: number) => {
    if (health < 40) {
      return [
        { action: "Share Resources", icon: BookOpen, page: "resources", color: "bg-blue-600 hover:bg-blue-700" },
        { action: "Share Tips", icon: MessageSquare, page: "suggestions", color: "bg-purple-600 hover:bg-purple-700" },
        { action: "View Leaderboard", icon: Users, page: "leaderboard", color: "bg-green-600 hover:bg-green-700" }
      ];
    }
    return [];
  };

  const filteredBranches = selectedBranch === 'All' 
    ? Object.entries(branchHealth)
    : [[selectedBranch, branchHealth[selectedBranch as keyof typeof branchHealth]]];

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="text-center">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Community Health Dashboard</h2>
            <p className="text-gray-600">Monitor the vitality and engagement of our GNDU community</p>
          </div>
        </div>

        {/* Overall Community Health */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              {getHealthIcon(stats.communityHealth)}
              <div>
                <h3 className="text-xl font-semibold text-gray-800">Overall Community Health</h3>
                <p className="text-sm text-gray-600">{getHealthMessage(stats.communityHealth)}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-gray-800">{stats.communityHealth}%</div>
              <div className="text-xs text-gray-500">Vitality Score</div>
            </div>
          </div>

          {/* Health Bar */}
          <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
            <div 
              className={`h-4 rounded-full transition-all duration-1000 ${getHealthColor(stats.communityHealth)}`}
              style={{ width: `${stats.communityHealth}%` }}
            />
          </div>

          {/* Health Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div className="bg-blue-50 p-3 rounded-lg text-center">
              <div className="text-lg font-bold text-blue-700">{stats.totalResources}</div>
              <div className="text-xs text-blue-600">Total Resources</div>
            </div>
            <div className="bg-green-50 p-3 rounded-lg text-center">
              <div className="text-lg font-bold text-green-700">{stats.totalClaimed}</div>
              <div className="text-xs text-green-600">Resources Claimed</div>
            </div>
            <div className="bg-purple-50 p-3 rounded-lg text-center">
              <div className="text-lg font-bold text-purple-700">
                {((stats.totalClaimed / stats.totalResources) * 100).toFixed(1)}%
              </div>
              <div className="text-xs text-purple-600">Success Rate</div>
            </div>
            <div className="bg-yellow-50 p-3 rounded-lg text-center">
              <div className="text-lg font-bold text-yellow-700">
                {Math.floor((Date.now() - new Date(stats.lastActivity).getTime()) / (1000 * 60 * 60 * 24))}
              </div>
              <div className="text-xs text-yellow-600">Days Since Activity</div>
            </div>
          </div>

          {/* Action Suggestions */}
          {getActionSuggestions(stats.communityHealth).length > 0 && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-3">
                <AlertTriangle className="h-5 w-5 text-red-600" />
                <h4 className="font-semibold text-red-800">Community Needs Your Help!</h4>
              </div>
              <p className="text-red-700 text-sm mb-3">
                The community health is declining. Take action to revive it:
              </p>
              <div className="flex flex-wrap gap-2">
                {getActionSuggestions(stats.communityHealth).map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => onNavigate(suggestion.page)}
                    className={`flex items-center space-x-2 text-white px-4 py-2 rounded-lg transition-colors text-sm ${suggestion.color}`}
                  >
                    <suggestion.icon className="h-4 w-4" />
                    <span>{suggestion.action}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Branch Filter */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-gray-800">Branch-wise Health</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Branch</label>
              <select
                value={selectedBranch}
                onChange={(e) => setSelectedBranch(e.target.value)}
                className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                {branches.map(branch => (
                  <option key={branch} value={branch}>{branch === 'All' ? 'All Branches' : branch}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Branch Health Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBranches.map(([branch, health]) => (
            <div key={branch} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  {getHealthIcon(health)}
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800">{branch}</h4>
                    <p className="text-sm text-gray-600">{getHealthMessage(health)}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-800">{health}%</div>
                  <div className="text-xs text-gray-500">Health</div>
                </div>
              </div>

              {/* Branch Health Bar */}
              <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
                <div 
                  className={`h-3 rounded-full transition-all duration-1000 ${getHealthColor(health)}`}
                  style={{ width: `${health}%` }}
                />
              </div>

              {/* Branch Stats */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-blue-50 p-2 rounded text-center">
                  <div className="text-sm font-bold text-blue-700">{Math.floor(Math.random() * 20) + 5}</div>
                  <div className="text-xs text-blue-600">Resources</div>
                </div>
                <div className="bg-green-50 p-2 rounded text-center">
                  <div className="text-sm font-bold text-green-700">{Math.floor(Math.random() * 15) + 3}</div>
                  <div className="text-xs text-green-600">Claimed</div>
                </div>
              </div>

              {/* Warning for low health branches */}
              {health < 50 && (
                <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                  <div className="flex items-center space-x-2">
                    <AlertTriangle className="h-4 w-4 text-yellow-600" />
                    <p className="text-yellow-800 text-xs">This branch needs more activity!</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Health Improvement Tips */}
        <div className="mt-8 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 border border-green-200">
          <div className="text-center">
            <TreePine className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-800 mb-2">How to Improve Community Health</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div className="bg-white p-4 rounded-lg">
                <BookOpen className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <h4 className="font-semibold text-gray-800 mb-1">Share Resources</h4>
                <p className="text-gray-600 text-sm">Add books, tools, and materials to help juniors</p>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <Users className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <h4 className="font-semibold text-gray-800 mb-1">Claim Resources</h4>
                <p className="text-gray-600 text-sm">Use resources shared by seniors</p>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <MessageSquare className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <h4 className="font-semibold text-gray-800 mb-1">Share Tips</h4>
                <p className="text-gray-600 text-sm">Guide juniors with your experience</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityHealthPage;