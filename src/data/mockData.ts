import { Resource, User, Suggestion, PlatformStats, ResourceRequest, BranchRepresentative } from '../types';

export const branches = ['CSE', 'ECE', 'ME', 'CE', 'IT', 'EE', 'BCA', 'MCA'];
export const semesters = [1, 2, 3, 4, 5, 6, 7, 8];

export const mockUsers: User[] = [
  { id: '1', name: 'Arjun Singh', branch: 'CSE', semester: 6, resourcesShared: 12, resourcesClaimed: 3, totalValue: 2500, points: 180 },
  { id: '2', name: 'Priya Sharma', branch: 'ECE', semester: 7, resourcesShared: 8, resourcesClaimed: 5, totalValue: 1800, points: 120 },
  { id: '3', name: 'Rohit Kumar', branch: 'ME', semester: 5, resourcesShared: 15, resourcesClaimed: 2, totalValue: 3200, points: 225 },
  { id: '4', name: 'Simran Kaur', branch: 'CSE', semester: 8, resourcesShared: 6, resourcesClaimed: 7, totalValue: 1200, points: 90 },
  { id: '5', name: 'Mandeep Singh', branch: 'CE', semester: 4, resourcesShared: 10, resourcesClaimed: 4, totalValue: 2100, points: 150 },
  { id: '6', name: 'Navdeep Singh', branch: 'CSE', semester: 3, resourcesShared: 4, resourcesClaimed: 8, totalValue: 800, points: 60 },
  { id: '7', name: 'Jasleen Kaur', branch: 'ECE', semester: 5, resourcesShared: 7, resourcesClaimed: 3, totalValue: 1500, points: 105 },
  { id: '8', name: 'Harpreet Singh', branch: 'ME', semester: 6, resourcesShared: 9, resourcesClaimed: 5, totalValue: 1900, points: 135 },
];

export const mockBranchReps: BranchRepresentative[] = [
  { id: '1', name: 'Arjun Singh', branch: 'CSE', semester: 6, contactInfo: 'WhatsApp: +91 98765-43210', role: 'Senior Representative' },
  { id: '2', name: 'Priya Sharma', branch: 'ECE', semester: 7, contactInfo: 'Email: priya.ece@gndu.ac.in', role: 'Branch Coordinator' },
  { id: '3', name: 'Rohit Kumar', branch: 'ME', semester: 5, contactInfo: 'WhatsApp: +91 87654-32109', role: 'Resource Manager' },
  { id: '4', name: 'Mandeep Singh', branch: 'CE', semester: 4, contactInfo: 'Telegram: @mandeep_ce', role: 'Community Volunteer' },
  { id: '5', name: 'Jasleen Kaur', branch: 'IT', semester: 6, contactInfo: 'WhatsApp: +91 76543-21087', role: 'Student Helper' },
  { id: '6', name: 'Harpreet Singh', branch: 'EE', semester: 5, contactInfo: 'Email: harpreet.ee@gndu.ac.in', role: 'Branch Representative' },
];

export const mockResourceRequests: ResourceRequest[] = [
  {
    id: '1',
    title: 'Thermodynamics Textbook',
    description: 'Need a good thermodynamics book for ME 3rd semester. Preferably by R.K. Rajput.',
    branch: 'ME',
    semester: 3,
    requestedBy: 'Navdeep Singh',
    dateRequested: '2024-01-16',
    fulfilled: false
  },
  {
    id: '2',
    title: 'Circuit Analysis Lab Manual',
    description: 'Looking for circuit analysis lab manual for ECE 2nd semester practical work.',
    branch: 'ECE',
    semester: 2,
    requestedBy: 'Jasleen Kaur',
    dateRequested: '2024-01-15',
    fulfilled: false
  },
  {
    id: '3',
    title: 'Programming in C Notes',
    description: 'Need comprehensive C programming notes with examples and exercises.',
    branch: 'CSE',
    semester: 1,
    requestedBy: 'Harpreet Singh',
    dateRequested: '2024-01-14',
    fulfilled: true
  }
];

export const mockResources: Resource[] = [
  // CSE Resources
  {
    id: '1',
    title: 'Mini Drafter',
    description: 'Good condition mini drafter with all accessories. Perfect for engineering graphics.',
    branch: 'CSE',
    semester: 1,
    type: 'sell',
    price: 200,
    offeredBy: 'Arjun Singh',
    dateAdded: '2024-01-15',
    claimed: true,
    claimedBy: 'Rahul Sharma',
    motivationalMessage: 'Engineering graphics is the foundation! Practice daily and you\'ll master it.',
    handoverInstructions: 'Available for pickup from CSE department or hostel room 204',
    contactInfo: 'WhatsApp: +91 98765-43210',
    points: 5
  },
  {
    id: '2',
    title: 'Mini Drafter',
    description: 'Barely used mini drafter set. Includes compass, protractor, and drawing sheets.',
    branch: 'CSE',
    semester: 1,
    type: 'donate',
    offeredBy: 'Simran Kaur',
    dateAdded: '2024-01-14',
    claimed: false,
    motivationalMessage: 'Sharing is caring! Hope this helps you in your graphics journey.',
    handoverInstructions: 'Can meet at library or CSE lab during evening hours',
    contactInfo: 'Telegram: @simran_cse',
    points: 5
  },
  {
    id: '3',
    title: 'Sheet Holder',
    description: 'A4 size sheet holder in excellent condition.',
    branch: 'CSE',
    semester: 1,
    type: 'sell',
    price: 50,
    offeredBy: 'Rohit Kumar',
    dateAdded: '2024-01-13',
    claimed: true,
    claimedBy: 'Preet Singh',
    motivationalMessage: 'Small tools, big impact! Keep your sheets organized.',
    handoverInstructions: 'Available at mechanical workshop or canteen during lunch',
    contactInfo: 'Phone: +91 87654-32109',
    points: 3
  },
  {
    id: '4',
    title: 'Higher Engineering Mathematics',
    description: 'B.S. Grewal textbook with solved examples. Some highlighting but very readable.',
    branch: 'CSE',
    semester: 1,
    type: 'sell',
    price: 300,
    offeredBy: 'Priya Sharma',
    dateAdded: '2024-01-12',
    claimed: true,
    claimedBy: 'Amit Kumar',
    motivationalMessage: 'Math is the language of engineering. Master it and everything becomes easier!',
    handoverInstructions: 'Can deliver to your hostel or meet at ECE department',
    contactInfo: 'WhatsApp: +91 76543-21098',
    pages: 800,
    points: 10
  },
  {
    id: '5',
    title: 'PYQS - Previous Year Question Papers',
    description: 'Complete collection of previous year papers for all subjects. Digital format.',
    branch: 'CSE',
    semester: 1,
    type: 'donate',
    offeredBy: 'Mandeep Singh',
    dateAdded: '2024-01-11',
    claimed: true,
    claimedBy: 'Neha Gupta',
    motivationalMessage: 'PYQS are gold! Practice them and ace your exams.',
    handoverInstructions: 'Will share Google Drive link via email or WhatsApp',
    contactInfo: 'Email: mandeep.ce@gndu.ac.in',
    pages: 200,
    points: 15
  },
  // More semester resources
  {
    id: '6',
    title: 'Data Structures & Algorithms Textbook',
    description: 'Complete textbook with solved examples and practice problems. Excellent condition.',
    branch: 'CSE',
    semester: 3,
    type: 'donate',
    offeredBy: 'Arjun Singh',
    dateAdded: '2024-01-10',
    claimed: true,
    claimedBy: 'Vikash Yadav',
    motivationalMessage: 'This book helped me ace my DSA exam! Hope it helps you too. Keep coding! 💻',
    handoverInstructions: 'Available for pickup from CSE department or hostel',
    contactInfo: 'WhatsApp: +91 98765-43210',
    pages: 600,
    points: 10
  },
  {
    id: '7',
    title: 'PYQS - Previous Year Question Papers',
    description: 'Comprehensive collection of previous year papers for 3rd semester CSE.',
    branch: 'CSE',
    semester: 3,
    type: 'donate',
    offeredBy: 'Simran Kaur',
    dateAdded: '2024-01-09',
    claimed: false,
    motivationalMessage: 'These papers helped me understand exam patterns. Use them wisely!',
    handoverInstructions: 'Digital copies available via Google Drive link',
    contactInfo: 'Telegram: @simran_cse',
    pages: 150,
    points: 15
  },
  // ECE Resources
  {
    id: '8',
    title: 'Mini Drafter',
    description: 'Standard mini drafter for engineering graphics. Good condition.',
    branch: 'ECE',
    semester: 1,
    type: 'sell',
    price: 180,
    offeredBy: 'Priya Sharma',
    dateAdded: '2024-01-08',
    claimed: false,
    motivationalMessage: 'Graphics skills will help you in circuit design too!',
    handoverInstructions: 'Available at ECE lab or girls hostel common room',
    contactInfo: 'WhatsApp: +91 76543-21098',
    points: 5
  },
  {
    id: '9',
    title: 'PYQS - Previous Year Question Papers',
    description: 'Complete PYQS collection for ECE 1st semester.',
    branch: 'ECE',
    semester: 1,
    type: 'donate',
    offeredBy: 'Priya Sharma',
    dateAdded: '2024-01-07',
    claimed: true,
    claimedBy: 'Ravi Patel',
    motivationalMessage: 'Start your ECE journey with confidence using these papers!',
    handoverInstructions: 'Digital format - will share via email or cloud link',
    contactInfo: 'Email: priya.ece@gndu.ac.in',
    pages: 180,
    points: 15
  },
  {
    id: '10',
    title: 'Digital Electronics Lab Manual',
    description: 'Lab manual with all experiments and circuit diagrams. Perfect for practical sessions.',
    branch: 'ECE',
    semester: 4,
    type: 'sell',
    price: 150,
    offeredBy: 'Priya Sharma',
    dateAdded: '2024-01-06',
    claimed: true,
    claimedBy: 'Sanjay Kumar',
    motivationalMessage: 'Digital electronics is the foundation of everything! Master it and you\'ll excel in VLSI.',
    handoverInstructions: 'Can meet at ECE lab during practical hours',
    contactInfo: 'WhatsApp: +91 76543-21098',
    pages: 120,
    points: 8
  },
  // ME Resources
  {
    id: '11',
    title: 'Mini Drafter',
    description: 'Professional grade mini drafter. Slightly used but in great condition.',
    branch: 'ME',
    semester: 1,
    type: 'sell',
    price: 250,
    offeredBy: 'Rohit Kumar',
    dateAdded: '2024-01-05',
    claimed: false,
    motivationalMessage: 'Precision in drawing leads to precision in engineering!',
    handoverInstructions: 'Available at mechanical workshop or boys hostel',
    contactInfo: 'Phone: +91 87654-32109',
    points: 5
  },
  {
    id: '12',
    title: 'PYQS - Previous Year Question Papers',
    description: 'Mechanical Engineering 1st semester previous year papers.',
    branch: 'ME',
    semester: 1,
    type: 'donate',
    offeredBy: 'Rohit Kumar',
    dateAdded: '2024-01-04',
    claimed: false,
    motivationalMessage: 'These papers will give you insight into exam patterns. Study smart!',
    handoverInstructions: 'Physical copies available at ME department notice board',
    contactInfo: 'WhatsApp: +91 87654-32109',
    pages: 160,
    points: 15
  },
  // Additional claimed resources with pages for realistic impact
  {
    id: '13',
    title: 'Engineering Physics Textbook',
    description: 'Complete physics textbook for 1st semester with solved examples.',
    branch: 'CSE',
    semester: 1,
    type: 'donate',
    offeredBy: 'Rajesh Singh',
    dateAdded: '2024-01-03',
    claimed: true,
    claimedBy: 'Ankit Sharma',
    motivationalMessage: 'Physics concepts will help you in electronics and programming!',
    handoverInstructions: 'Available at library or CSE department',
    contactInfo: 'WhatsApp: +91 98765-11111',
    pages: 450,
    points: 10
  },
  {
    id: '14',
    title: 'Engineering Chemistry Lab Manual',
    description: 'Lab manual with all experiments and procedures.',
    branch: 'ECE',
    semester: 1,
    type: 'sell',
    price: 100,
    offeredBy: 'Kavita Sharma',
    dateAdded: '2024-01-02',
    claimed: true,
    claimedBy: 'Deepak Kumar',
    motivationalMessage: 'Chemistry lab skills are essential for material science!',
    handoverInstructions: 'Available at chemistry lab or girls hostel',
    contactInfo: 'WhatsApp: +91 98765-22222',
    pages: 80,
    points: 8
  },
  {
    id: '15',
    title: 'Engineering Mechanics Textbook',
    description: 'Comprehensive mechanics book with problem solutions.',
    branch: 'ME',
    semester: 2,
    type: 'donate',
    offeredBy: 'Suresh Kumar',
    dateAdded: '2024-01-01',
    claimed: true,
    claimedBy: 'Mohit Singh',
    motivationalMessage: 'Mechanics is the foundation of all mechanical engineering!',
    handoverInstructions: 'Available at mechanical department',
    contactInfo: 'WhatsApp: +91 98765-33333',
    pages: 650,
    points: 10
  },
  {
    id: '16',
    title: 'Computer Programming Notes',
    description: 'Handwritten notes with C programming examples and exercises.',
    branch: 'CSE',
    semester: 2,
    type: 'donate',
    offeredBy: 'Pooja Gupta',
    dateAdded: '2023-12-30',
    claimed: true,
    claimedBy: 'Rohit Verma',
    motivationalMessage: 'Programming is an art! Practice makes perfect.',
    handoverInstructions: 'Available at CSE lab or library',
    contactInfo: 'WhatsApp: +91 98765-44444',
    pages: 120,
    points: 8
  }
];

export const mockSuggestions: Suggestion[] = [
  {
    id: '1',
    message: 'Start preparing for placements from 3rd semester. Build projects alongside studies!',
    author: 'Arjun Singh',
    branch: 'CSE',
    semester: 6,
    targetSemester: 3,
    dateAdded: '2024-01-10',
    likes: 24
  },
  {
    id: '2',
    message: 'Join technical societies and participate in competitions. It really helps in personality development.',
    author: 'Priya Sharma',
    branch: 'ECE',
    semester: 7,
    targetSemester: 2,
    dateAdded: '2024-01-09',
    likes: 18
  },
  {
    id: '3',
    message: 'Don\'t just focus on marks. Understanding concepts is more important for long-term success.',
    author: 'Rohit Kumar',
    branch: 'ME',
    semester: 5,
    targetSemester: 1,
    dateAdded: '2024-01-08',
    likes: 31
  },
  {
    id: '4',
    message: 'For 1st semester, focus on building strong fundamentals in mathematics and physics. They are crucial for all engineering branches.',
    author: 'Simran Kaur',
    branch: 'CSE',
    semester: 8,
    targetSemester: 1,
    dateAdded: '2024-01-07',
    likes: 15
  },
  {
    id: '5',
    message: 'Start learning programming early, even if you\'re not from CSE. It\'s becoming essential in all engineering fields.',
    author: 'Mandeep Singh',
    branch: 'CE',
    semester: 4,
    targetSemester: 2,
    dateAdded: '2024-01-06',
    likes: 22
  }
];

export const mockStats: PlatformStats = {
  totalResources: 156,
  totalClaimed: 89,
  moneySaved: 12450,
  environmentalImpact: 78, // in kg of waste reduced
  lastActivity: '2024-01-15',
  communityHealth: 75 // 0-100 scale
};