import React from 'react';
import { Leaf, TreePine, Recycle, TrendingUp, Award, Globe } from 'lucide-react';
import { PlatformStats } from '../types';

interface ImpactPageProps {
  stats: PlatformStats;
  totalPaperSaved: number;
}

const ImpactPage: React.FC<ImpactPageProps> = ({ stats, totalPaperSaved }) => {
  const treesEquivalent = Math.floor(totalPaperSaved / 17); // Roughly 17kg of paper = 1 tree
  const carbonSaved = (totalPaperSaved * 3.3).toFixed(1); // Roughly 3.3kg CO2 per kg of paper

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-xl shadow-lg p-8 mb-8">
          <div className="text-center">
            <Globe className="h-16 w-16 mx-auto mb-4 opacity-90" />
            <h2 className="text-3xl font-bold mb-2">Environmental Impact</h2>
            <p className="text-green-100 text-lg">
              Together, we're making a difference for our planet
            </p>
          </div>
        </div>

        {/* Impact Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 text-center">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Leaf className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800">{totalPaperSaved.toFixed(1)} kg</h3>
            <p className="text-gray-600">Paper Saved</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 text-center">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <TreePine className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800">{treesEquivalent}</h3>
            <p className="text-gray-600">Trees Equivalent</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Recycle className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800">{carbonSaved} kg</h3>
            <p className="text-gray-600">CO₂ Reduced</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 text-center">
            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800">{stats.totalClaimed}</h3>
            <p className="text-gray-600">Resources Reused</p>
          </div>
        </div>

        {/* Impact Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center space-x-2">
              <Leaf className="h-5 w-5 text-green-600" />
              <span>Environmental Benefits</span>
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                <span className="text-gray-700">Water Saved</span>
                <span className="font-semibold text-green-700">{(totalPaperSaved * 20).toFixed(0)} liters</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                <span className="text-gray-700">Energy Saved</span>
                <span className="font-semibold text-blue-700">{(totalPaperSaved * 4.2).toFixed(1)} kWh</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                <span className="text-gray-700">Landfill Waste Avoided</span>
                <span className="font-semibold text-purple-700">{totalPaperSaved.toFixed(1)} kg</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center space-x-2">
              <Award className="h-5 w-5 text-yellow-600" />
              <span>Community Impact</span>
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                <span className="text-gray-700">Money Saved by Students</span>
                <span className="font-semibold text-yellow-700">₹{stats.moneySaved.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                <span className="text-gray-700">Resources Shared</span>
                <span className="font-semibold text-green-700">{stats.totalResources}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                <span className="text-gray-700">Active Sharing Rate</span>
                <span className="font-semibold text-blue-700">{((stats.totalClaimed / stats.totalResources) * 100).toFixed(1)}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Motivational Message */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-8 border border-green-200">
          <div className="text-center">
            <TreePine className="h-16 w-16 text-green-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Every Resource Shared Matters!</h3>
            <p className="text-gray-700 text-lg mb-4">
              By sharing and reusing resources, our GNDU community is actively contributing to environmental conservation. 
              Each book, manual, or tool that finds a new home prevents waste and reduces our carbon footprint.
            </p>
            <div className="bg-white p-4 rounded-lg inline-block">
              <p className="text-green-700 font-semibold">
                "The best time to plant a tree was 20 years ago. The second best time is now."
              </p>
              <p className="text-gray-600 text-sm mt-2">- Chinese Proverb</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImpactPage;