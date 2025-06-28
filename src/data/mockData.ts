import { Resource, User, Suggestion, PlatformStats } from '../types';

export const branches = ['CSE', 'ECE', 'ME', 'CE', 'IT', 'EE', 'BCA', 'MCA'];
export const semesters = [1, 2, 3, 4, 5, 6, 7, 8];

export const mockUsers: User[] = [
  { id: '1', name: 'Arjun Singh', branch: 'CSE', semester: 6, resourcesShared: 12, resourcesClaimed: 3, totalValue: 2500 },
  { id: '2', name: 'Priya Sharma', branch: 'ECE', semester: 7, resourcesShared: 8, resourcesClaimed: 5, totalValue: 1800 },
  { id: '3', name: 'Rohit Kumar', branch: 'ME', semester: 5, resourcesShared: 15, resourcesClaimed: 2, totalValue: 3200 },
  { id: '4', name: 'Simran Kaur', branch: 'CSE', semester: 8, resourcesShared: 6, resourcesClaimed: 7, totalValue: 1200 },
  { id: '5', name: 'Mandeep Singh', branch: 'CE', semester: 4, resourcesShared: 10, resourcesClaimed: 4, totalValue: 2100 },
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
    claimed: false,
    motivationalMessage: 'Engineering graphics is the foundation! Practice daily and you\'ll master it.',
    handoverInstructions: 'Available for pickup from CSE department or hostel room 204',
    contactInfo: 'WhatsApp: +91 98765-43210'
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
    contactInfo: 'Telegram: @simran_cse'
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
    claimed: false,
    motivationalMessage: 'Small tools, big impact! Keep your sheets organized.',
    handoverInstructions: 'Available at mechanical workshop or canteen during lunch',
    contactInfo: 'Phone: +91 87654-32109'
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
    claimed: false,
    motivationalMessage: 'Math is the language of engineering. Master it and everything becomes easier!',
    handoverInstructions: 'Can deliver to your hostel or meet at ECE department',
    contactInfo: 'WhatsApp: +91 76543-21098'
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
    claimed: false,
    motivationalMessage: 'PYQS are gold! Practice them and ace your exams.',
    handoverInstructions: 'Will share Google Drive link via email or WhatsApp',
    contactInfo: 'Email: mandeep.ce@gndu.ac.in'
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
    claimed: false,
    motivationalMessage: 'This book helped me ace my DSA exam! Hope it helps you too. Keep coding! 💻',
    handoverInstructions: 'Available for pickup from CSE department or hostel',
    contactInfo: 'WhatsApp: +91 98765-43210'
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
    contactInfo: 'Telegram: @simran_cse'
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
    contactInfo: 'WhatsApp: +91 76543-21098'
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
    claimed: false,
    motivationalMessage: 'Start your ECE journey with confidence using these papers!',
    handoverInstructions: 'Digital format - will share via email or cloud link',
    contactInfo: 'Email: priya.ece@gndu.ac.in'
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
    claimed: false,
    motivationalMessage: 'Digital electronics is the foundation of everything! Master it and you\'ll excel in VLSI.',
    handoverInstructions: 'Can meet at ECE lab during practical hours',
    contactInfo: 'WhatsApp: +91 76543-21098'
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
    contactInfo: 'Phone: +91 87654-32109'
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
    contactInfo: 'WhatsApp: +91 87654-32109'
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
  lastActivity: '2024-01-15'
};