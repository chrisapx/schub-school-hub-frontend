
// Teacher type
interface Teacher {
  id: string;
  name: string;
  email: string;
  subjects: string[];
  profileImage?: string;
  phoneNumber?: string;
  qualification?: string;
  department?: string;
  joinDate?: string;
  status?: 'active' | 'inactive' | 'on-leave';
}

// Student type
interface Student {
  id: string;
  name: string;
  email: string;
  profileImage?: string;
  class: string;
  rollNumber: string;
  guardianName?: string;
  guardianContact?: string;
  address?: string;
  phoneNumber?: string;
  dateOfBirth?: string;
  gender?: 'male' | 'female' | 'other';
  bloodGroup?: string;
  admissionDate?: string;
  attendancePercentage?: number;
  behaviorScore?: number;
  status?: 'active' | 'suspended' | 'graduated';
}

// Subject type
interface Subject {
  id: string;
  name: string;
  code: string;
  teacher?: string;
  description?: string;
  credits?: number;
  schedule?: string;
  duration?: string;
  students?: string[];
}

// Behavior type
interface Behavior {
  id: string;
  studentId: string;
  date: string;
  category: string;
  score: number;
  maxScore: number;
  notes?: string;
  reportedBy?: string;
}

// Mark/Grade type
interface Mark {
  id: string;
  studentId: string;
  subjectId: string;
  examType: string;
  marksObtained: number;
  totalMarks: number;
  grade?: string;
  date: string;
  semester?: string;
  comments?: string;
}

// Assignment type
interface Assignment {
  id: string;
  title: string;
  description: string;
  subjectId: string;
  dueDate: string;
  assignedDate: string;
  teacherId: string;
  maxScore: number;
  status: 'draft' | 'published' | 'completed';
  attachments?: string[];
  class?: string[];
}

// Invoice type
interface Invoice {
  id: string;
  studentId: string;
  invoiceNumber: string;
  amount: number;
  dueDate: string;
  createdAt: string;
  updatedAt?: string;
  status: 'pending' | 'paid' | 'overdue' | 'cancelled';
  items: {
    description: string;
    amount: number;
  }[];
  paymentMethod?: string;
  paymentDate?: string;
  paymentReference?: string;
  term: string;
}
