
// Types for our stored data
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

export interface Teacher {
  id: string;
  name: string;
  email: string;
  subjects: string[];
  phoneNumber: string;
  qualification: string;
  profileImage?: string;
}

export interface Subject {
  id: string;
  name: string;
  code: string;
  teacherId: string;
  description: string;
}

export interface Mark {
  id: string;
  studentId: string;
  subjectId: string;
  term: string;
  score: number;
  maxScore: number;
  date: string;
  type: string; // exam, quiz, assignment
}

export interface Behavior {
  id: string;
  studentId: string;
  date: string;
  category: string; // attendance, discipline, leadership
  score: number;
  maxScore: number;
  notes: string;
}

export interface Assignment {
  id: string;
  title: string;
  subjectId: string;
  description: string;
  dueDate: string;
  classAssigned: string;
}

// Keys for localStorage
const STORAGE_KEYS = {
  STUDENTS: 'schub_students',
  TEACHERS: 'schub_teachers',
  SUBJECTS: 'schub_subjects',
  MARKS: 'schub_marks',
  BEHAVIORS: 'schub_behaviors',
  ASSIGNMENTS: 'schub_assignments'
};

// Generic functions to get and set data
const getItem = <T>(key: string, defaultValue: T): T => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : defaultValue;
};

const setItem = <T>(key: string, value: T): void => {
  localStorage.setItem(key, JSON.stringify(value));
};

// Student CRUD operations
export const getStudents = (): Student[] => {
  return getItem<Student[]>(STORAGE_KEYS.STUDENTS, []);
};

export const addStudent = (student: Omit<Student, 'id'>): Student => {
  const students = getStudents();
  const newStudent = {
    ...student,
    id: `student-${Date.now()}`,
  };
  setItem(STORAGE_KEYS.STUDENTS, [...students, newStudent]);
  return newStudent;
};

export const updateStudent = (id: string, data: Partial<Student>): Student | null => {
  const students = getStudents();
  const index = students.findIndex(s => s.id === id);
  
  if (index === -1) return null;
  
  const updatedStudent = { ...students[index], ...data };
  students[index] = updatedStudent;
  setItem(STORAGE_KEYS.STUDENTS, students);
  return updatedStudent;
};

export const deleteStudent = (id: string): boolean => {
  const students = getStudents();
  const filteredStudents = students.filter(s => s.id !== id);
  
  if (filteredStudents.length === students.length) return false;
  
  setItem(STORAGE_KEYS.STUDENTS, filteredStudents);
  return true;
};

export const getStudentById = (id: string): Student | null => {
  const students = getStudents();
  return students.find(s => s.id === id) || null;
};

// Teacher CRUD operations
export const getTeachers = (): Teacher[] => {
  return getItem<Teacher[]>(STORAGE_KEYS.TEACHERS, []);
};

export const addTeacher = (teacher: Omit<Teacher, 'id'>): Teacher => {
  const teachers = getTeachers();
  const newTeacher = {
    ...teacher,
    id: `teacher-${Date.now()}`,
  };
  setItem(STORAGE_KEYS.TEACHERS, [...teachers, newTeacher]);
  return newTeacher;
};

export const updateTeacher = (id: string, data: Partial<Teacher>): Teacher | null => {
  const teachers = getTeachers();
  const index = teachers.findIndex(t => t.id === id);
  
  if (index === -1) return null;
  
  const updatedTeacher = { ...teachers[index], ...data };
  teachers[index] = updatedTeacher;
  setItem(STORAGE_KEYS.TEACHERS, teachers);
  return updatedTeacher;
};

export const deleteTeacher = (id: string): boolean => {
  const teachers = getTeachers();
  const filteredTeachers = teachers.filter(t => t.id !== id);
  
  if (filteredTeachers.length === teachers.length) return false;
  
  setItem(STORAGE_KEYS.TEACHERS, filteredTeachers);
  return true;
};

export const getTeacherById = (id: string): Teacher | null => {
  const teachers = getTeachers();
  return teachers.find(t => t.id === id) || null;
};

// Subject CRUD operations
export const getSubjects = (): Subject[] => {
  return getItem<Subject[]>(STORAGE_KEYS.SUBJECTS, []);
};

export const addSubject = (subject: Omit<Subject, 'id'>): Subject => {
  const subjects = getSubjects();
  const newSubject = {
    ...subject,
    id: `subject-${Date.now()}`,
  };
  setItem(STORAGE_KEYS.SUBJECTS, [...subjects, newSubject]);
  return newSubject;
};

export const updateSubject = (id: string, data: Partial<Subject>): Subject | null => {
  const subjects = getSubjects();
  const index = subjects.findIndex(s => s.id === id);
  
  if (index === -1) return null;
  
  const updatedSubject = { ...subjects[index], ...data };
  subjects[index] = updatedSubject;
  setItem(STORAGE_KEYS.SUBJECTS, subjects);
  return updatedSubject;
};

export const deleteSubject = (id: string): boolean => {
  const subjects = getSubjects();
  const filteredSubjects = subjects.filter(s => s.id !== id);
  
  if (filteredSubjects.length === subjects.length) return false;
  
  setItem(STORAGE_KEYS.SUBJECTS, filteredSubjects);
  return true;
};

// Marks CRUD operations
export const getMarks = (): Mark[] => {
  return getItem<Mark[]>(STORAGE_KEYS.MARKS, []);
};

export const getStudentMarks = (studentId: string): Mark[] => {
  const marks = getMarks();
  return marks.filter(m => m.studentId === studentId);
};

export const addMark = (mark: Omit<Mark, 'id'>): Mark => {
  const marks = getMarks();
  const newMark = {
    ...mark,
    id: `mark-${Date.now()}`,
  };
  setItem(STORAGE_KEYS.MARKS, [...marks, newMark]);
  return newMark;
};

export const updateMark = (id: string, data: Partial<Mark>): Mark | null => {
  const marks = getMarks();
  const index = marks.findIndex(m => m.id === id);
  
  if (index === -1) return null;
  
  const updatedMark = { ...marks[index], ...data };
  marks[index] = updatedMark;
  setItem(STORAGE_KEYS.MARKS, marks);
  return updatedMark;
};

export const deleteMark = (id: string): boolean => {
  const marks = getMarks();
  const filteredMarks = marks.filter(m => m.id !== id);
  
  if (filteredMarks.length === marks.length) return false;
  
  setItem(STORAGE_KEYS.MARKS, filteredMarks);
  return true;
};

// Behavior CRUD operations
export const getBehaviors = (): Behavior[] => {
  return getItem<Behavior[]>(STORAGE_KEYS.BEHAVIORS, []);
};

export const getStudentBehaviors = (studentId: string): Behavior[] => {
  const behaviors = getBehaviors();
  return behaviors.filter(b => b.studentId === studentId);
};

export const addBehavior = (behavior: Omit<Behavior, 'id'>): Behavior => {
  const behaviors = getBehaviors();
  const newBehavior = {
    ...behavior,
    id: `behavior-${Date.now()}`,
  };
  setItem(STORAGE_KEYS.BEHAVIORS, [...behaviors, newBehavior]);
  return newBehavior;
};

export const updateBehavior = (id: string, data: Partial<Behavior>): Behavior | null => {
  const behaviors = getBehaviors();
  const index = behaviors.findIndex(b => b.id === id);
  
  if (index === -1) return null;
  
  const updatedBehavior = { ...behaviors[index], ...data };
  behaviors[index] = updatedBehavior;
  setItem(STORAGE_KEYS.BEHAVIORS, behaviors);
  return updatedBehavior;
};

export const deleteBehavior = (id: string): boolean => {
  const behaviors = getBehaviors();
  const filteredBehaviors = behaviors.filter(b => b.id !== id);
  
  if (filteredBehaviors.length === behaviors.length) return false;
  
  setItem(STORAGE_KEYS.BEHAVIORS, filteredBehaviors);
  return true;
};

// Assignment CRUD operations
export const getAssignments = (): Assignment[] => {
  return getItem<Assignment[]>(STORAGE_KEYS.ASSIGNMENTS, []);
};

export const addAssignment = (assignment: Omit<Assignment, 'id'>): Assignment => {
  const assignments = getAssignments();
  const newAssignment = {
    ...assignment,
    id: `assignment-${Date.now()}`,
  };
  setItem(STORAGE_KEYS.ASSIGNMENTS, [...assignments, newAssignment]);
  return newAssignment;
};

export const updateAssignment = (id: string, data: Partial<Assignment>): Assignment | null => {
  const assignments = getAssignments();
  const index = assignments.findIndex(a => a.id === id);
  
  if (index === -1) return null;
  
  const updatedAssignment = { ...assignments[index], ...data };
  assignments[index] = updatedAssignment;
  setItem(STORAGE_KEYS.ASSIGNMENTS, assignments);
  return updatedAssignment;
};

export const deleteAssignment = (id: string): boolean => {
  const assignments = getAssignments();
  const filteredAssignments = assignments.filter(a => a.id !== id);
  
  if (filteredAssignments.length === assignments.length) return false;
  
  setItem(STORAGE_KEYS.ASSIGNMENTS, filteredAssignments);
  return true;
};

// Initialize with sample data if not already present
export const initializeDummyData = () => {
  // Only initialize if data doesn't exist
  if (getStudents().length === 0) {
    // Sample students
    const students: Student[] = [
      {
        id: 'student-1',
        name: 'John Doe',
        email: 'john.doe@example.com',
        class: '10A',
        rollNumber: '1001',
        guardianName: 'Jane Doe',
        guardianContact: '+1234567890',
        attendancePercentage: 92,
        behaviorScore: 4.2,
        profileImage: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80'
      },
      {
        id: 'student-2',
        name: 'Sarah Smith',
        email: 'sarah.smith@example.com',
        class: '10B',
        rollNumber: '1002',
        guardianName: 'Robert Smith',
        guardianContact: '+1234567891',
        attendancePercentage: 86,
        behaviorScore: 3.8,
        profileImage: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80'
      },
      {
        id: 'student-3',
        name: 'Michael Johnson',
        email: 'michael.j@example.com',
        class: '10C',
        rollNumber: '1003',
        guardianName: 'Linda Johnson',
        guardianContact: '+1234567892',
        attendancePercentage: 78,
        behaviorScore: 3.3,
        profileImage: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80'
      }
    ];
    setItem(STORAGE_KEYS.STUDENTS, students);

    // Sample teachers
    const teachers: Teacher[] = [
      {
        id: 'teacher-1',
        name: 'Dr. Robert Wilson',
        email: 'r.wilson@example.com',
        subjects: ['Mathematics', 'Physics'],
        phoneNumber: '+1234567893',
        qualification: 'PhD in Mathematics',
        profileImage: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80'
      },
      {
        id: 'teacher-2',
        name: 'Prof. Emma Davis',
        email: 'e.davis@example.com',
        subjects: ['English Literature', 'History'],
        phoneNumber: '+1234567894',
        qualification: 'Masters in English',
        profileImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80'
      }
    ];
    setItem(STORAGE_KEYS.TEACHERS, teachers);

    // Sample subjects
    const subjects: Subject[] = [
      {
        id: 'subject-1',
        name: 'Mathematics',
        code: 'MATH101',
        teacherId: 'teacher-1',
        description: 'Fundamentals of algebra, calculus, and geometry'
      },
      {
        id: 'subject-2',
        name: 'English',
        code: 'ENG101',
        teacherId: 'teacher-2',
        description: 'Grammar, literature, and writing skills'
      },
      {
        id: 'subject-3',
        name: 'Science',
        code: 'SCI101',
        teacherId: 'teacher-1',
        description: 'Basics of physics, chemistry, and biology'
      }
    ];
    setItem(STORAGE_KEYS.SUBJECTS, subjects);

    // Sample marks
    const marks: Mark[] = [
      {
        id: 'mark-1',
        studentId: 'student-1',
        subjectId: 'subject-1',
        term: 'Term 1',
        score: 85,
        maxScore: 100,
        date: '2023-01-15',
        type: 'Exam'
      },
      {
        id: 'mark-2',
        studentId: 'student-1',
        subjectId: 'subject-2',
        term: 'Term 1',
        score: 78,
        maxScore: 100,
        date: '2023-01-22',
        type: 'Quiz'
      },
      {
        id: 'mark-3',
        studentId: 'student-2',
        subjectId: 'subject-1',
        term: 'Term 1',
        score: 92,
        maxScore: 100,
        date: '2023-01-15',
        type: 'Exam'
      }
    ];
    setItem(STORAGE_KEYS.MARKS, marks);

    // Sample behaviors
    const behaviors: Behavior[] = [
      {
        id: 'behavior-1',
        studentId: 'student-1',
        date: '2023-02-10',
        category: 'Attendance',
        score: 5,
        maxScore: 5,
        notes: 'Excellent attendance'
      },
      {
        id: 'behavior-2',
        studentId: 'student-1',
        date: '2023-02-15',
        category: 'Discipline',
        score: 4,
        maxScore: 5,
        notes: 'Good classroom behavior'
      },
      {
        id: 'behavior-3',
        studentId: 'student-2',
        date: '2023-02-12',
        category: 'Leadership',
        score: 5,
        maxScore: 5,
        notes: 'Led group project effectively'
      }
    ];
    setItem(STORAGE_KEYS.BEHAVIORS, behaviors);

    // Sample assignments
    const assignments: Assignment[] = [
      {
        id: 'assignment-1',
        title: 'Algebra Problem Set',
        subjectId: 'subject-1',
        description: 'Complete problems 1-20 in Chapter 5',
        dueDate: '2023-03-15',
        classAssigned: '10A'
      },
      {
        id: 'assignment-2',
        title: 'Essay on Shakespeare',
        subjectId: 'subject-2',
        description: 'Write a 1000-word essay on Macbeth',
        dueDate: '2023-03-20',
        classAssigned: '10B'
      }
    ];
    setItem(STORAGE_KEYS.ASSIGNMENTS, assignments);
  }
};
