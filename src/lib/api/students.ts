
import { v4 as uuidv4 } from 'uuid';
import type { Student } from '@/types';
import { getLocalStorageItems, saveLocalStorageItems } from '../utils/localStorage';

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
