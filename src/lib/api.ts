
import { v4 as uuidv4 } from 'uuid';

// Utility to get items from localStorage with a fallback to empty array
const getLocalStorageItems = <T>(key: string): T[] => {
  try {
    const items = localStorage.getItem(key);
    return items ? JSON.parse(items) : [];
  } catch (error) {
    console.error(`Error retrieving ${key} from localStorage:`, error);
    return [];
  }
};

// Utility to save items to localStorage
const saveLocalStorageItems = <T>(key: string, items: T[]): void => {
  try {
    localStorage.setItem(key, JSON.stringify(items));
  } catch (error) {
    console.error(`Error saving ${key} to localStorage:`, error);
  }
};

// Teacher API
export const getTeachers = async () => {
  return getLocalStorageItems<Teacher>('teachers');
};

export const getTeacher = async (id: string) => {
  const teachers = await getTeachers();
  return teachers.find(teacher => teacher.id === id);
};

export const createTeacher = async (teacherData: Omit<Teacher, "id">) => {
  const teachers = await getTeachers();
  const newTeacher = { ...teacherData, id: uuidv4() };
  saveLocalStorageItems('teachers', [...teachers, newTeacher]);
  return newTeacher;
};

export const updateTeacher = async (teacher: Teacher) => {
  const teachers = await getTeachers();
  const updatedTeachers = teachers.map(t => t.id === teacher.id ? teacher : t);
  saveLocalStorageItems('teachers', updatedTeachers);
  return teacher;
};

export const deleteTeacher = async (id: string) => {
  const teachers = await getTeachers();
  const updatedTeachers = teachers.filter(t => t.id !== id);
  saveLocalStorageItems('teachers', updatedTeachers);
  return { success: true };
};

// Student API
export const getStudents = async () => {
  return getLocalStorageItems<Student>('students');
};

export const getStudent = async (id: string) => {
  const students = await getStudents();
  return students.find(student => student.id === id);
};

export const createStudent = async (studentData: Omit<Student, "id">) => {
  const students = await getStudents();
  const newStudent = { ...studentData, id: uuidv4() };
  saveLocalStorageItems('students', [...students, newStudent]);
  return newStudent;
};

export const updateStudent = async (student: Student) => {
  const students = await getStudents();
  const updatedStudents = students.map(s => s.id === student.id ? student : s);
  saveLocalStorageItems('students', updatedStudents);
  return student;
};

export const deleteStudent = async (id: string) => {
  const students = await getStudents();
  const updatedStudents = students.filter(s => s.id !== id);
  saveLocalStorageItems('students', updatedStudents);
  return { success: true };
};

// Subject API
export const getSubjects = async () => {
  return getLocalStorageItems<Subject>('subjects');
};

export const getSubject = async (id: string) => {
  const subjects = await getSubjects();
  return subjects.find(subject => subject.id === id);
};

export const createSubject = async (subjectData: Omit<Subject, "id">) => {
  const subjects = await getSubjects();
  const newSubject = { ...subjectData, id: uuidv4() };
  saveLocalStorageItems('subjects', [...subjects, newSubject]);
  return newSubject;
};

export const updateSubject = async (subject: Subject) => {
  const subjects = await getSubjects();
  const updatedSubjects = subjects.map(s => s.id === subject.id ? subject : s);
  saveLocalStorageItems('subjects', updatedSubjects);
  return subject;
};

export const deleteSubject = async (id: string) => {
  const subjects = await getSubjects();
  const updatedSubjects = subjects.filter(s => s.id !== id);
  saveLocalStorageItems('subjects', updatedSubjects);
  return { success: true };
};

// Behavior API
export const getBehaviors = async () => {
  return getLocalStorageItems<Behavior>('behaviors');
};

export const getBehavior = async (id: string) => {
  const behaviors = await getBehaviors();
  return behaviors.find(behavior => behavior.id === id);
};

export const createBehavior = async (behaviorData: Omit<Behavior, "id">) => {
  const behaviors = await getBehaviors();
  const newBehavior = { ...behaviorData, id: uuidv4() };
  saveLocalStorageItems('behaviors', [...behaviors, newBehavior]);
  return newBehavior;
};

export const updateBehavior = async (behavior: Behavior) => {
  const behaviors = await getBehaviors();
  const updatedBehaviors = behaviors.map(b => b.id === behavior.id ? behavior : b);
  saveLocalStorageItems('behaviors', updatedBehaviors);
  return behavior;
};

export const deleteBehavior = async (id: string) => {
  const behaviors = await getBehaviors();
  const updatedBehaviors = behaviors.filter(b => b.id !== id);
  saveLocalStorageItems('behaviors', updatedBehaviors);
  return { success: true };
};

// Mark/Grades API
export const getMarks = async () => {
  return getLocalStorageItems<Mark>('marks');
};

export const getMark = async (id: string) => {
  const marks = await getMarks();
  return marks.find(mark => mark.id === id);
};

export const createMark = async (markData: Omit<Mark, "id">) => {
  const marks = await getMarks();
  const newMark = { ...markData, id: uuidv4() };
  saveLocalStorageItems('marks', [...marks, newMark]);
  return newMark;
};

export const updateMark = async (mark: Mark) => {
  const marks = await getMarks();
  const updatedMarks = marks.map(m => m.id === mark.id ? mark : m);
  saveLocalStorageItems('marks', updatedMarks);
  return mark;
};

export const deleteMark = async (id: string) => {
  const marks = await getMarks();
  const updatedMarks = marks.filter(m => m.id !== id);
  saveLocalStorageItems('marks', updatedMarks);
  return { success: true };
};

// Assignment API
export const getAssignments = async () => {
  return getLocalStorageItems<Assignment>('assignments');
};

export const getAssignment = async (id: string) => {
  const assignments = await getAssignments();
  return assignments.find(assignment => assignment.id === id);
};

export const createAssignment = async (assignmentData: Omit<Assignment, "id">) => {
  const assignments = await getAssignments();
  const newAssignment = { ...assignmentData, id: uuidv4() };
  saveLocalStorageItems('assignments', [...assignments, newAssignment]);
  return newAssignment;
};

export const updateAssignment = async (assignment: Assignment) => {
  const assignments = await getAssignments();
  const updatedAssignments = assignments.map(a => a.id === assignment.id ? assignment : a);
  saveLocalStorageItems('assignments', updatedAssignments);
  return assignment;
};

export const deleteAssignment = async (id: string) => {
  const assignments = await getAssignments();
  const updatedAssignments = assignments.filter(a => a.id !== id);
  saveLocalStorageItems('assignments', updatedAssignments);
  return { success: true };
};

// Invoice API
export const getInvoices = async () => {
  return getLocalStorageItems<Invoice>('invoices');
};

export const getInvoice = async (id: string) => {
  const invoices = await getInvoices();
  return invoices.find(invoice => invoice.id === id);
};

export const createInvoice = async (invoiceData: Omit<Invoice, "id">) => {
  const invoices = await getInvoices();
  const newInvoice = { 
    ...invoiceData, 
    id: uuidv4(),
    invoiceNumber: `INV-${Math.floor(Math.random() * 10000)}`,
    createdAt: new Date().toISOString()
  };
  saveLocalStorageItems('invoices', [...invoices, newInvoice]);
  return newInvoice;
};

export const updateInvoice = async (invoice: Invoice) => {
  const invoices = await getInvoices();
  const updatedInvoices = invoices.map(i => i.id === invoice.id ? invoice : i);
  saveLocalStorageItems('invoices', updatedInvoices);
  return invoice;
};

export const deleteInvoice = async (id: string) => {
  const invoices = await getInvoices();
  const updatedInvoices = invoices.filter(i => i.id !== id);
  saveLocalStorageItems('invoices', updatedInvoices);
  return { success: true };
};

export const generatePaymentReference = async (invoiceId: string) => {
  const invoices = await getInvoices();
  const updatedInvoices = invoices.map(i => {
    if (i.id === invoiceId) {
      return {
        ...i,
        paymentReference: `REF-${Math.floor(Math.random() * 1000000)}`,
        updatedAt: new Date().toISOString()
      };
    }
    return i;
  });
  
  saveLocalStorageItems('invoices', updatedInvoices);
  const invoice = updatedInvoices.find(i => i.id === invoiceId);
  return invoice;
};
