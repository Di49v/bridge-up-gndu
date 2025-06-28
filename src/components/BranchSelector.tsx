import React from 'react';
import { ChevronRight, GraduationCap } from 'lucide-react';
import { branches, semesters } from '../data/mockData';

interface BranchSelectorProps {
  selectedBranch: string;
  selectedSemester: number;
  onBranchChange: (branch: string) => void;
  onSemesterChange: (semester: number) => void;
  onContinue: () => void;
}

const BranchSelector: React.FC<BranchSelectorProps> = ({
  selectedBranch,
  selectedSemester,
  onBranchChange,
  onSemesterChange,
  onContinue
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <GraduationCap className="h-8 w-8 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome to BridgeUpGNDU</h2>
          <p className="text-gray-600">Select your branch and semester to get started</p>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Branch</label>
            <div className="grid grid-cols-2 gap-2">
              {branches.map((branch) => (
                <button
                  key={branch}
                  onClick={() => onBranchChange(branch)}
                  className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                    selectedBranch === branch
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                  }`}
                >
                  {branch}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Semester</label>
            <div className="grid grid-cols-4 gap-2">
              {semesters.map((semester) => (
                <button
                  key={semester}
                  onClick={() => onSemesterChange(semester)}
                  className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                    selectedSemester === semester
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                  }`}
                >
                  {semester}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={onContinue}
            disabled={!selectedBranch || !selectedSemester}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center space-x-2"
          >
            <span>Continue to Resources</span>
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BranchSelector;