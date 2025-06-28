import React from 'react';
import { Users, Phone, Mail, MessageCircle, Award } from 'lucide-react';
import { BranchRepresentative } from '../types';

interface BranchRepresentativesProps {
  representatives: BranchRepresentative[];
}

const BranchRepresentatives: React.FC<BranchRepresentativesProps> = ({ representatives }) => {
  const handleContact = (contactInfo: string) => {
    if (contactInfo.includes('WhatsApp') || contactInfo.includes('+91')) {
      const phoneNumber = contactInfo.match(/\+91\s?[\d-]+/)?.[0]?.replace(/\s|-/g, '');
      if (phoneNumber) {
        window.open(`https://wa.me/${phoneNumber}`, '_blank');
      }
    } else if (contactInfo.includes('@')) {
      const email = contactInfo.match(/[\w.-]+@[\w.-]+\.\w+/)?.[0];
      if (email) {
        window.open(`mailto:${email}`, '_blank');
      }
    } else if (contactInfo.includes('Telegram')) {
      const username = contactInfo.match(/@\w+/)?.[0];
      if (username) {
        window.open(`https://t.me/${username.slice(1)}`, '_blank');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="h-8 w-8 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Branch Representatives</h2>
            <p className="text-gray-600">Our dedicated volunteers helping the community thrive</p>
            <div className="mt-4 bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg border border-blue-200">
              <div className="flex items-center justify-center space-x-2 text-blue-800">
                <Award className="h-5 w-5" />
                <span className="font-medium">Thank you to our amazing branch representatives!</span>
              </div>
            </div>
          </div>
        </div>

        {/* Representatives Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {representatives.map((rep) => (
            <div key={rep.id} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6 border border-gray-100">
              <div className="text-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-3">
                  {rep.name.charAt(0)}
                </div>
                <h3 className="text-lg font-semibold text-gray-800">{rep.name}</h3>
                <p className="text-blue-600 font-medium">{rep.branch} - Semester {rep.semester}</p>
                <p className="text-sm text-gray-600 mt-1">{rep.role}</p>
              </div>

              <div className="space-y-3">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
                    <MessageCircle className="h-4 w-4" />
                    <span>Contact Information</span>
                  </div>
                  <p className="text-gray-800 text-sm">{rep.contactInfo}</p>
                </div>

                <button
                  onClick={() => handleContact(rep.contactInfo)}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                >
                  {rep.contactInfo.includes('WhatsApp') ? (
                    <Phone className="h-4 w-4" />
                  ) : (
                    <Mail className="h-4 w-4" />
                  )}
                  <span>Contact</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Appreciation Message */}
        <div className="mt-8 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 border border-green-200">
          <div className="text-center">
            <Award className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-800 mb-2">Our Dedicated Branch Representatives</h3>
            <p className="text-gray-700">
              These amazing students volunteer their time to help build and maintain our resource-sharing community. 
              They coordinate between branches, help resolve issues, and ensure everyone has access to the resources they need.
            </p>
            <p className="text-green-700 font-medium mt-3">
              Thank you for making BridgeUpGNDU a success! 🙏
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BranchRepresentatives;