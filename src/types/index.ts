
export type UserRole = 'super_admin' | 'school_admin' | 'teacher' | 'student';

export interface School {
  id: string;
  name: string;
  subdomain: string;
  logo_url?: string;
  address?: string;
  phone?: string;
  email?: string;
  created_at: string;
  updated_at: string;
}

export interface Profile {
  id: string;
  first_name?: string;
  last_name?: string;
  email: string;
  role: UserRole;
  school_id?: string;
  profile_image?: string;
  created_at: string;
  updated_at: string;
}

export interface Teacher {
  id: string;
  user_id: string;
  school_id: string;
  subjects?: string[];
  phone_number?: string;
  qualification?: string;
  department?: string;
  join_date?: string;
  status?: 'active' | 'inactive' | 'on-leave';
  employee_id?: string;
  emergency_contact?: string;
  bank_account?: string;
  address?: string;
  specialization?: string[];
  created_at: string;
  updated_at: string;
  profile?: Profile;
}

export interface Student {
  id: string;
  user_id: string;
  school_id: string;
  class_id?: string;
  roll_number: string;
  guardian_name?: string;
  guardian_contact?: string;
  address?: string;
  phone_number?: string;
  date_of_birth?: string;
  gender?: 'male' | 'female' | 'other';
  blood_group?: string;
  admission_date?: string;
  attendance_percentage?: number;
  behavior_score?: number;
  status?: 'active' | 'suspended' | 'graduated';
  allergies?: string[];
  medical_conditions?: string[];
  nationality?: string;
  religion?: string;
  hobbies?: string[];
  emergency_contact?: string;
  transport_route?: string;
  created_at: string;
  updated_at: string;
  profile?: Profile;
  class?: Class;
}

export interface Class {
  id: string;
  name: string;
  school_id: string;
  teacher_id?: string;
  grade_level?: string;
  academic_year?: string;
  created_at: string;
  updated_at: string;
}

export interface Subject {
  id: string;
  school_id: string;
  name: string;
  code: string;
  teacher_id?: string;
  description?: string;
  credits?: number;
  schedule?: string;
  duration?: string;
  created_at: string;
  updated_at: string;
}

export interface SubjectClass {
  id: string;
  subject_id: string;
  class_id: string;
  created_at: string;
  updated_at: string;
}

export interface Behavior {
  id: string;
  school_id: string;
  student_id: string;
  date?: string;
  category: string;
  score: number;
  max_score: number;
  notes?: string;
  reported_by?: string;
  created_at: string;
  updated_at: string;
}

export interface Mark {
  id: string;
  school_id: string;
  student_id: string;
  subject_id: string;
  exam_type: string;
  marks_obtained: number;
  total_marks: number;
  grade?: string;
  date?: string;
  semester?: string;
  comments?: string;
  created_at: string;
  updated_at: string;
}

export interface Assignment {
  id: string;
  school_id: string;
  title: string;
  description?: string;
  subject_id: string;
  due_date: string;
  assigned_date: string;
  teacher_id: string;
  max_score?: number;
  status?: 'draft' | 'published' | 'completed';
  attachments?: string[];
  classes?: string[];
  created_at: string;
  updated_at: string;
}

export interface Invoice {
  id: string;
  school_id: string;
  student_id: string;
  invoice_number: string;
  amount: number;
  due_date: string;
  term: string;
  status?: 'pending' | 'paid' | 'overdue' | 'cancelled';
  payment_method?: string;
  payment_date?: string;
  payment_reference?: string;
  created_at: string;
  updated_at: string;
  items?: InvoiceItem[];
}

export interface InvoiceItem {
  id: string;
  invoice_id: string;
  description: string;
  amount: number;
  created_at: string;
  updated_at: string;
}
