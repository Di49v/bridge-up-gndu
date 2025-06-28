import React, { useState } from 'react';
import { Trophy, Star, Heart, TrendingUp, Gift, ShoppingBag, Crown, Award, Target } from 'lucide-react';
import { User, PlatformStats } from '../types';
import EmptyState from './EmptyState';

interface LeaderboardProps {
  users: User[];
  stats: PlatformStats;
}

const Leaderboard: React.FC<LeaderboardProps> = ({ users, stats }) => {
  const [selectedBranch, setSelectedBranch] = useState<string>('All');
  const branches = ['All', 'CSE', 'ECE', 'ME', 'CE', 'IT', 'EE', 'BCA', 'MCA'];

  const filteredUsers = selectedBranch === 'All' 
    ? users 
    : users.filter(user => user.branch === selectedBranch);

  const topDonors = [...filteredUsers].sort((a, b) => b.resourcesShared - a.resourcesShared).slice(0, 5);
  const topClaimers = [...filteredUsers].sort((a, b) => b.resourcesClaimed - a.resourcesClaimed).slice(0, 5);
  const topByPoints = [...filteredUsers].sort((a, b) => b.points - a.points).slice(0, 5);

  const getRankIcon = (index: number) => {
    switch (index) {
      case 0: return <Crown className="h-5 w-5 text-yellow-500" />;
      case 1: return <Trophy className="h-5 w-5 text-gray-400" />;
      case 2: return <Award className="h-5 w-5 text-orange-500" />;
      default: return <Star className="h-4 w-4 text-blue-500" />;
    }
  };

  const getRankColor = (index: number) => {
    switch (index) {
      case 0: return 'from-yellow-50 to-yellow-100 border-yellow-200';
      case 1: return 'from-gray-50 to-gray-100 border-gray-200';
      case 2: return 'from-orange-50 to-orange-100 border-orange-200';
      default: return 'from-blue-50 to-blue-100 border-blue-200';
    }
  };

  // Check platform health
  const isHealthy = stats.totalClaimed > 10 && new Date(stats.lastActivity) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

  if (filteredUsers.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-6">
        <div className="container mx-auto px-4">
          <EmptyState type="leaderboard" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="container mx-auto px-4">
        {/* Platform Health Warning */}
        {!isHealthy && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-6">
            <div className="flex items-center space-x-3">
              <TrendingUp className="h-6 w-6 text-red-600" />
              <div>
                <h3 className="text-lg font-semibold text-red-800">Platform Health Declining!</h3>
                <p className="text-red-700">
                  Activity has been low recently. Revive the community by sharing or claiming resources!
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Branch Filter */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h2 className="text-2xl font-bold text-gray-800">Leaderboard</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Branch</label>
              <select
                value={selectedBranch}
                onChange={(e) => setSelectedBranch(e.target.value)}
                className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                {branches.map(branch => (
                  <option key={branch} value={branch}>{branch}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Platform Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">Total Resources</p>
                <p className="text-2xl font-bold">{stats.totalResources}</p>
              </div>
              <Gift className="h-8 w-8 text-blue-200" />
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm">Resources Reused</p>
                <p className="text-2xl font-bold">{stats.totalClaimed}</p>
              </div>
              <ShoppingBag className="h-8 w-8 text-green-200" />
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm">Money Saved</p>
                <p className="text-2xl font-bold">₹{stats.moneySaved.toLocaleString()}</p>
              </div>
              <Star className="h-8 w-8 text-purple-200" />
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-emerald-100 text-sm">Waste Reduced</p>
                <p className="text-2xl font-bold">{stats.environmentalImpact}kg</p>
              </div>
              <Heart className="h-8 w-8 text-emerald-200" />
            </div>
          </div>
        </div>

        {/* Leaderboards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Top Contributors */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-2 flex items-center space-x-2">
              <Gift className="h-5 w-5 text-green-600" />
              <span>Most Active</span>
            </h3>
            <p className="text-sm text-gray-600 mb-6">Top resource contributors</p>
            {topDonors.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">No contributors yet</p>
              </div>
            ) : (
              <div className="space-y-4">
                {topDonors.slice(0, 3).map((user, index) => (
                  <div key={user.id} className="relative">
                    {index === 0 && (
                      <div className="absolute -top-2 -right-2 bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full font-medium">
                        Hall of Fame
                      </div>
                    )}
                    <div className={`flex items-center space-x-3 p-3 rounded-lg bg-gradient-to-r border ${getRankColor(index)}`}>
                      <div className="flex-shrink-0">
                        {getRankIcon(index)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-800 truncate">{user.name}</p>
                        <p className="text-sm text-gray-600">{user.branch} - Sem {user.semester}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-gray-800">{user.resourcesShared}</p>
                        <p className="text-xs text-gray-600">resources</p>
                      </div>
                    </div>
                  </div>
                ))}
                {topDonors.slice(3).map((user, index) => (
                  <div
                    key={user.id}
                    className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50 border border-gray-200"
                  >
                    <div className="flex-shrink-0">
                      <Star className="h-4 w-4 text-gray-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-800 truncate">{user.name}</p>
                      <p className="text-sm text-gray-600">{user.branch} - Sem {user.semester}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-800">{user.resourcesShared}</p>
                      <p className="text-xs text-gray-600">resources</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Top Claimers */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-2 flex items-center space-x-2">
              <ShoppingBag className="h-5 w-5 text-blue-600" />
              <span>Highest Impact</span>
            </h3>
            <p className="text-sm text-gray-600 mb-6">Most resource claims</p>
            {topClaimers.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">No activity yet</p>
              </div>
            ) : (
              <div className="space-y-4">
                {topClaimers.slice(0, 3).map((user, index) => (
                  <div key={user.id} className="relative">
                    {index === 0 && (
                      <div className="absolute -top-2 -right-2 bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-medium">
                        Hall of Fame
                      </div>
                    )}
                    <div className={`flex items-center space-x-3 p-3 rounded-lg bg-gradient-to-r border ${getRankColor(index)}`}>
                      <div className="flex-shrink-0">
                        {getRankIcon(index)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-800 truncate">{user.name}</p>
                        <p className="text-sm text-gray-600">{user.branch} - Sem {user.semester}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-gray-800">{user.resourcesClaimed}</p>
                        <p className="text-xs text-gray-600">claimed</p>
                      </div>
                    </div>
                  </div>
                ))}
                {topClaimers.slice(3).map((user, index) => (
                  <div
                    key={user.id}
                    className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50 border border-gray-200"
                  >
                    <div className="flex-shrink-0">
                      <Star className="h-4 w-4 text-gray-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-800 truncate">{user.name}</p>
                      <p className="text-sm text-gray-600">{user.branch} - Sem {user.semester}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-800">{user.resourcesClaimed}</p>
                      <p className="text-xs text-gray-600">claimed</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Top by Points */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-2 flex items-center space-x-2">
              <Target className="h-5 w-5 text-purple-600" />
              <span>Hall of Fame</span>
            </h3>
            <p className="text-sm text-gray-600 mb-6">Highest point earners</p>
            {topByPoints.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">No points earned yet</p>
              </div>
            ) : (
              <div className="space-y-4">
                {topByPoints.slice(0, 3).map((user, index) => (
                  <div key={user.id} className="relative">
                    {index === 0 && (
                      <div className="absolute -top-2 -right-2 bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full font-medium">
                        Hall of Fame
                      </div>
                    )}
                    <div className={`flex items-center space-x-3 p-3 rounded-lg bg-gradient-to-r border ${getRankColor(index)}`}>
                      <div className="flex-shrink-0">
                        {getRankIcon(index)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-800 truncate">{user.name}</p>
                        <p className="text-sm text-gray-600">{user.branch} - Sem {user.semester}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-gray-800">{user.points}</p>
                        <p className="text-xs text-gray-600">points</p>
                      </div>
                    </div>
                  </div>
                ))}
                {topByPoints.slice(3).map((user, index) => (
                  <div
                    key={user.id}
                    className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50 border border-gray-200"
                  >
                    <div className="flex-shrink-0">
                      <Star className="h-4 w-4 text-gray-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-800 truncate">{user.name}</p>
                      <p className="text-sm text-gray-600">{user.branch} - Sem {user.semester}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-800">{user.points}</p>
                      <p className="text-xs text-gray-600">points</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;