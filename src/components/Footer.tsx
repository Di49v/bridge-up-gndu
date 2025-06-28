import React from 'react';
import { Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-12">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Heart className="h-4 w-4 text-red-400" />
            <span className="text-gray-300">An initiative by</span>
            <span className="font-semibold text-white">Divleen Kaur</span>
          </div>
          <p className="text-gray-400 text-sm">
            Building bridges between seniors and juniors at GNDU
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;