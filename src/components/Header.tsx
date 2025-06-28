import React from 'react';
import { BookOpen, Users, Heart, Globe, UserCheck, Search, TrendingUp } from 'lucide-react';

interface HeaderProps {
  onNavigate: (page: string) => void;
  currentPage: string;
}

const Header: React.FC<HeaderProps> = ({ onNavigate, currentPage }) => {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div 
            className="flex items-center space-x-3 cursor-pointer"
            onClick={() => onNavigate('impact')}
          >
            <div className="bg-white/20 p-2 rounded-lg">
              <BookOpen className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">BridgeUpGNDU</h1>
              <p className="text-blue-100 text-sm">Connecting Seniors & Juniors</p>
            </div>
          </div>
          
          <nav className="hidden md:flex space-x-4">
            {[
              { key: 'impact', label: 'Impact', icon: Globe },
              { key: 'resources', label: 'Resources', icon: BookOpen },
              { key: 'leaderboard', label: 'Leaderboard', icon: Users },
              { key: 'suggestions', label: 'Tips', icon: Heart },
              { key: 'health', label: 'Health', icon: TrendingUp },
              { key: 'representatives', label: 'Reps', icon: UserCheck },
              { key: 'requests', label: 'Requests', icon: Search }
            ].map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => onNavigate(key)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                  currentPage === key 
                    ? 'bg-white/20 text-white' 
                    : 'text-blue-100 hover:text-white hover:bg-white/10'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span className="text-sm">{label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;