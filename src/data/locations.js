/**
 * Indian states and sample cities for location selector.
 * Can be expanded with full city lists per state.
 */

export const STATES = [
  'Lovely Professional University (LPU)',
  'Delhi University (DU)',
  'IIT Bombay',
  'VIT Vellore',
  'BITS Pilani',
  'Chandigarh University (CU)',
  'SRM University',
  'JNU New Delhi',
  'Manipal University',
  'Amity University',
  'Other University',
];

export const CITIES_BY_STATE = {
  'Lovely Professional University (LPU)': [
    'BH-1 (Boys Hostel)',
    'BH-2 (Boys Hostel)',
    'BH-3 (Boys Hostel)',
    'GH-1 (Girls Hostel)',
    'GH-2 (Girls Hostel)',
    'Uni Mall',
    'Main Gate',
    'Law Gate',
  ],
  'Delhi University (DU)': [
    'North Campus',
    'South Campus',
    'Hudson Lane',
    'Kamla Nagar',
    'Satya Niketan',
  ],
  'IIT Bombay': [
    'Hostel 1-5',
    'Hostel 6-10',
    'Hostel 11-15',
    'Powai Lake Area',
    'Main Building',
  ],
  'VIT Vellore': [
    'Men\'s Hostel (MH)',
    'Women\'s Hostel (WH)',
    'SJT Building',
    'TT Building',
    'All-India Gate',
  ],
  'BITS Pilani': [
    'Shankar Bhawan',
    'Vyas Bhawan',
    'Meera Bhawan',
    'Connaught Place',
    'Student Activity Centre (SAC)',
  ],
  'Chandigarh University (CU)': [
    'NC Block',
    'South Campus',
    'North Campus',
    'Hostel Area',
    'Main Gate',
  ],
  'SRM University': [
    'Main Campus',
    'Tech Park',
    'University Building',
    'Potheri Area',
    'Hostel Zone',
  ],
  'JNU New Delhi': [
    'Mahanadi',
    'Chandrabhaga',
    'Lohit',
    'Tapti',
    'Godavari',
  ],
  'Manipal University': [
    'MIT Campus',
    'KMC Campus',
    'Student Plaza',
    'Tiger Circle',
    'Hostel Blocks',
  ],
  'Amity University': [
    'H-Block',
    'J-Block',
    'Hostel Area',
    'Gate 1',
    'Gate 4',
  ],
  'Other University': ['Main Campus', 'Hostels', 'Library', 'Outside Campus'],
};

export const getCitiesForState = (state) =>
  (state && CITIES_BY_STATE[state]) || [];
