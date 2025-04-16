
// Mock Student Data
export interface Student {
  id: string;
  name: string;
  email: string;
  class: string;
  rollNumber: string;
  guardianName: string;
  guardianContact: string;
  profileImage?: string;
  attendancePercentage: number;
  behaviorScore: number;
}

export const students: Student[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    class: '10A',
    rollNumber: '10A-001',
    guardianName: 'Mary Doe',
    guardianContact: '+1234567890',
    profileImage: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=250&h=250&auto=format&fit=crop',
    attendancePercentage: 92,
    behaviorScore: 4.5,
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah.j@example.com',
    class: '10A',
    rollNumber: '10A-002',
    guardianName: 'Robert Johnson',
    guardianContact: '+1234567891',
    profileImage: 'https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=250&h=250&auto=format&fit=crop',
    attendancePercentage: 96,
    behaviorScore: 4.8,
  },
  {
    id: '3',
    name: 'Michael Brown',
    email: 'michael.b@example.com',
    class: '10B',
    rollNumber: '10B-001',
    guardianName: 'James Brown',
    guardianContact: '+1234567892',
    profileImage: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=250&h=250&auto=format&fit=crop',
    attendancePercentage: 85,
    behaviorScore: 3.7,
  },
  {
    id: '4',
    name: 'Emma Wilson',
    email: 'emma.w@example.com',
    class: '10B',
    rollNumber: '10B-002',
    guardianName: 'Thomas Wilson',
    guardianContact: '+1234567893',
    profileImage: 'https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=250&h=250&auto=format&fit=crop',
    attendancePercentage: 90,
    behaviorScore: 4.2,
  },
  {
    id: '5',
    name: 'David Lee',
    email: 'david.l@example.com',
    class: '10C',
    rollNumber: '10C-001',
    guardianName: 'Jennifer Lee',
    guardianContact: '+1234567894',
    profileImage: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=250&h=250&auto=format&fit=crop',
    attendancePercentage: 88,
    behaviorScore: 4.0,
  },
];

// Mock Subject Data
export interface Subject {
  id: string;
  name: string;
  code: string;
  description: string;
  teacher: string;
  credits: number;
}

export const subjects: Subject[] = [
  {
    id: '1',
    name: 'Mathematics',
    code: 'MATH101',
    description: 'Algebra, Geometry, and Calculus fundamentals',
    teacher: 'Prof. Alan Turing',
    credits: 4,
  },
  {
    id: '2',
    name: 'Science',
    code: 'SCI102',
    description: 'Physics, Chemistry, and Biology concepts',
    teacher: 'Dr. Marie Curie',
    credits: 4,
  },
  {
    id: '3',
    name: 'English',
    code: 'ENG103',
    description: 'Literature, Grammar, and Composition',
    teacher: 'Mrs. Virginia Woolf',
    credits: 3,
  },
  {
    id: '4',
    name: 'History',
    code: 'HIS104',
    description: 'World History and Civil Rights',
    teacher: 'Mr. Howard Zinn',
    credits: 3,
  },
  {
    id: '5',
    name: 'Computer Science',
    code: 'CS105',
    description: 'Programming, Algorithms, and Data Structures',
    teacher: 'Dr. Grace Hopper',
    credits: 4,
  },
];

// Mock Assignment Data
export interface Assignment {
  id: string;
  title: string;
  subject: string;
  description: string;
  dueDate: string;
  status: 'pending' | 'submitted' | 'graded' | 'overdue';
  score?: number;
  maxScore: number;
  feedback?: string;
}

export const assignments: Assignment[] = [
  {
    id: '1',
    title: 'Algebraic Equations',
    subject: 'Mathematics',
    description: 'Solve the algebraic equations provided in the worksheet',
    dueDate: '2025-04-20',
    status: 'pending',
    maxScore: 100,
  },
  {
    id: '2',
    title: 'Chemical Reactions Lab',
    subject: 'Science',
    description: 'Complete the laboratory report on observed chemical reactions',
    dueDate: '2025-04-15',
    status: 'submitted',
    maxScore: 50,
  },
  {
    id: '3',
    title: 'Essay on Shakespeare',
    subject: 'English',
    description: 'Write a 500-word essay analyzing a Shakespeare play of your choice',
    dueDate: '2025-04-10',
    status: 'graded',
    score: 85,
    maxScore: 100,
    feedback: 'Excellent analysis but could improve citation format.',
  },
  {
    id: '4',
    title: 'World War II Research',
    subject: 'History',
    description: 'Research and document the major events of World War II',
    dueDate: '2025-04-05',
    status: 'overdue',
    maxScore: 100,
  },
  {
    id: '5',
    title: 'Python Programming',
    subject: 'Computer Science',
    description: 'Create a Python program that solves the given problem set',
    dueDate: '2025-04-25',
    status: 'pending',
    maxScore: 50,
  },
];

// Mock Assessment Data
export interface Assessment {
  id: string;
  subject: string;
  type: 'Exam' | 'Quiz' | 'Project' | 'Assignment';
  date: string;
  score: number;
  maxScore: number;
  term: string;
  remarks?: string;
}

export const assessments: Assessment[] = [
  {
    id: '1',
    subject: 'Mathematics',
    type: 'Exam',
    date: '2025-03-15',
    score: 88,
    maxScore: 100,
    term: 'Term 1',
    remarks: 'Good understanding of concepts',
  },
  {
    id: '2',
    subject: 'Science',
    type: 'Quiz',
    date: '2025-03-20',
    score: 45,
    maxScore: 50,
    term: 'Term 1',
    remarks: 'Excellent work',
  },
  {
    id: '3',
    subject: 'English',
    type: 'Project',
    date: '2025-03-10',
    score: 92,
    maxScore: 100,
    term: 'Term 1',
    remarks: 'Creative and well-structured',
  },
  {
    id: '4',
    subject: 'History',
    type: 'Assignment',
    date: '2025-03-05',
    score: 35,
    maxScore: 50,
    term: 'Term 1',
    remarks: 'Good research but needs better organization',
  },
  {
    id: '5',
    subject: 'Computer Science',
    type: 'Project',
    date: '2025-03-25',
    score: 48,
    maxScore: 50,
    term: 'Term 1',
    remarks: 'Exceptional coding skills',
  },
];

// Mock Behavior Log
export interface BehaviorLog {
  id: string;
  date: string;
  category: 'Attendance' | 'Punctuality' | 'Discipline' | 'Leadership';
  description: string;
  impact: 'positive' | 'negative';
  points: number;
  recordedBy: string;
}

export const behaviorLogs: BehaviorLog[] = [
  {
    id: '1',
    date: '2025-04-05',
    category: 'Attendance',
    description: 'Absent without prior notice',
    impact: 'negative',
    points: -2,
    recordedBy: 'Mrs. Virginia Woolf',
  },
  {
    id: '2',
    date: '2025-04-10',
    category: 'Leadership',
    description: 'Led the class project effectively',
    impact: 'positive',
    points: 5,
    recordedBy: 'Dr. Grace Hopper',
  },
  {
    id: '3',
    date: '2025-04-12',
    category: 'Punctuality',
    description: 'Late to class by 15 minutes',
    impact: 'negative',
    points: -1,
    recordedBy: 'Prof. Alan Turing',
  },
  {
    id: '4',
    date: '2025-04-15',
    category: 'Discipline',
    description: 'Helped maintain order during school event',
    impact: 'positive',
    points: 3,
    recordedBy: 'Mr. Howard Zinn',
  },
  {
    id: '5',
    date: '2025-04-18',
    category: 'Leadership',
    description: 'Volunteered for community service',
    impact: 'positive',
    points: 4,
    recordedBy: 'Dr. Marie Curie',
  },
];

// Mock Teacher Data
export interface Teacher {
  id: string;
  name: string;
  email: string;
  subject: string;
  qualifications: string;
  joinDate: string;
  profileImage?: string;
}

export const teachers: Teacher[] = [
  {
    id: '1',
    name: 'Prof. Alan Turing',
    email: 'alan.turing@example.com',
    subject: 'Mathematics',
    qualifications: 'Ph.D. in Mathematics',
    joinDate: '2020-01-15',
    profileImage: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=250&h=250&auto=format&fit=crop',
  },
  {
    id: '2',
    name: 'Dr. Marie Curie',
    email: 'marie.curie@example.com',
    subject: 'Science',
    qualifications: 'Ph.D. in Physics and Chemistry',
    joinDate: '2019-08-20',
    profileImage: 'https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=250&h=250&auto=format&fit=crop',
  },
  {
    id: '3',
    name: 'Mrs. Virginia Woolf',
    email: 'virginia.woolf@example.com',
    subject: 'English',
    qualifications: 'M.A. in English Literature',
    joinDate: '2021-03-10',
    profileImage: 'https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=250&h=250&auto=format&fit=crop',
  },
  {
    id: '4',
    name: 'Mr. Howard Zinn',
    email: 'howard.zinn@example.com',
    subject: 'History',
    qualifications: 'Ph.D. in History',
    joinDate: '2018-05-05',
    profileImage: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=250&h=250&auto=format&fit=crop',
  },
  {
    id: '5',
    name: 'Dr. Grace Hopper',
    email: 'grace.hopper@example.com',
    subject: 'Computer Science',
    qualifications: 'Ph.D. in Computer Science',
    joinDate: '2020-09-15',
    profileImage: 'https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=250&h=250&auto=format&fit=crop',
  },
];

// Mock Messages
export interface Message {
  id: string;
  sender: string;
  recipient: string;
  subject: string;
  content: string;
  date: string;
  read: boolean;
}

export const messages: Message[] = [
  {
    id: '1',
    sender: 'Prof. Alan Turing',
    recipient: 'John Doe',
    subject: 'Mathematics Assignment Feedback',
    content: 'Your recent assignment showed great improvement. Keep up the good work!',
    date: '2025-04-15',
    read: true,
  },
  {
    id: '2',
    sender: 'Dr. Marie Curie',
    recipient: 'John Doe',
    subject: 'Science Lab Report',
    content: 'Please remember to submit your lab report by Friday. You can upload it through the assignments portal.',
    date: '2025-04-16',
    read: false,
  },
  {
    id: '3',
    sender: 'Mrs. Virginia Woolf',
    recipient: 'John Doe',
    subject: 'English Literature Discussion',
    content: 'I wanted to let you know that your contribution to today\'s class discussion was excellent. Your analysis of the text showed deep understanding.',
    date: '2025-04-14',
    read: true,
  },
  {
    id: '4',
    sender: 'Admin',
    recipient: 'John Doe',
    subject: 'Term Schedule Update',
    content: 'Please note that the final exams for this term have been rescheduled to start on May 15th. The detailed schedule will be posted next week.',
    date: '2025-04-13',
    read: true,
  },
  {
    id: '5',
    sender: 'Dr. Grace Hopper',
    recipient: 'John Doe',
    subject: 'Programming Project Extension',
    content: 'Due to the complexity of the current programming project, I\'ve decided to extend the deadline by one week. Your new due date is April 30th.',
    date: '2025-04-17',
    read: false,
  },
];

// Performance Analytics Data
export interface PerformanceData {
  subject: string;
  term1: number;
  term2: number;
  term3: number;
  average: number;
}

export const performanceData: PerformanceData[] = [
  {
    subject: 'Mathematics',
    term1: 88,
    term2: 92,
    term3: 90,
    average: 90,
  },
  {
    subject: 'Science',
    term1: 85,
    term2: 88,
    term3: 92,
    average: 88.3,
  },
  {
    subject: 'English',
    term1: 90,
    term2: 92,
    term3: 94,
    average: 92,
  },
  {
    subject: 'History',
    term1: 82,
    term2: 85,
    term3: 88,
    average: 85,
  },
  {
    subject: 'Computer Science',
    term1: 95,
    term2: 94,
    term3: 96,
    average: 95,
  },
];

// Dashboard Statistics
export interface DashboardStats {
  totalStudents: number;
  totalTeachers: number;
  totalSubjects: number;
  averageAttendance: number;
  averagePerformance: number;
  upcomingEvents: Array<{
    id: string;
    title: string;
    date: string;
    type: string;
  }>;
}

export const adminDashboardStats: DashboardStats = {
  totalStudents: 1250,
  totalTeachers: 45,
  totalSubjects: 12,
  averageAttendance: 92.5,
  averagePerformance: 87.8,
  upcomingEvents: [
    {
      id: '1',
      title: 'Parent-Teacher Meeting',
      date: '2025-04-25',
      type: 'Meeting',
    },
    {
      id: '2',
      title: 'Annual Sports Day',
      date: '2025-05-10',
      type: 'Event',
    },
    {
      id: '3',
      title: 'End of Term Exams',
      date: '2025-05-15',
      type: 'Examination',
    },
  ],
};

export const studentDashboardData = {
  profile: {
    name: 'John Doe',
    class: '10A',
    rollNumber: '10A-001',
    attendancePercentage: 92,
  },
  currentTerm: 'Spring 2025',
  upcomingAssignments: [
    {
      id: '1',
      title: 'Algebraic Equations',
      subject: 'Mathematics',
      dueDate: '2025-04-20',
    },
    {
      id: '5',
      title: 'Python Programming',
      subject: 'Computer Science',
      dueDate: '2025-04-25',
    },
  ],
  recentMarks: [
    {
      id: '1',
      subject: 'Mathematics',
      type: 'Quiz',
      score: 45,
      maxScore: 50,
    },
    {
      id: '2',
      subject: 'Science',
      type: 'Assignment',
      score: 38,
      maxScore: 40,
    },
    {
      id: '3',
      subject: 'English',
      type: 'Project',
      score: 92,
      maxScore: 100,
    },
  ],
  behaviorPoints: 15,
  announcements: [
    {
      id: '1',
      title: 'Parent-Teacher Meeting',
      date: '2025-04-25',
      content: 'Please inform your parents about the upcoming parent-teacher meeting.',
    },
    {
      id: '2',
      title: 'Annual Sports Day',
      date: '2025-05-10',
      content: 'Registration for various sports events now open.',
    },
  ],
};
