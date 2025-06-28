import React from 'react';
import { BookOpen, Users, MessageSquare, Search } from 'lucide-react';

interface EmptyStateProps {
  type: 'resources' | 'suggestions' | 'leaderboard' | 'requests';
  onAction?: () => void;
  actionLabel?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ type, onAction, actionLabel }) => {
  const getEmptyStateContent = () => {
    switch (type) {
      case 'resources':
        return {
          icon: <BookOpen className="h-16 w-16 text-gray-400" />,
          title: "No Resources Yet",
          description: "Nothing here yet—be the first to contribute!",
          actionText: actionLabel || "Add First Resource"
        };
      case 'suggestions':
        return {
          icon: <MessageSquare className="h-16 w-16 text-gray-400" />,
          title: "No Tips Yet",
          description: "Nothing here yet—be the first to share wisdom!",
          actionText: actionLabel || "Share First Tip"
        };
      case 'leaderboard':
        return {
          icon: <Users className="h-16 w-16 text-gray-400" />,
          title: "No Activity Yet",
          description: "Nothing here yet—be the first to contribute!",
          actionText: actionLabel || "Start Contributing"
        };
      case 'requests':
        return {
          icon: <Search className="h-16 w-16 text-gray-400" />,
          title: "No Requests Yet",
          description: "Nothing here yet—be the first to request a resource!",
          actionText: actionLabel || "Make First Request"
        };
      default:
        return {
          icon: <BookOpen className="h-16 w-16 text-gray-400" />,
          title: "Nothing Here Yet",
          description: "Be the first to contribute!",
          actionText: "Get Started"
        };
    }
  };

  const content = getEmptyStateContent();

  return (
    <div className="bg-white rounded-xl shadow-sm p-12 text-center">
      <div className="mb-6">
        {content.icon}
      </div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{content.title}</h3>
      <p className="text-gray-600 mb-6">{content.description}</p>
      {onAction && (
        <button
          onClick={onAction}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          {content.actionText}
        </button>
      )}
    </div>
  );
};

export default EmptyState;