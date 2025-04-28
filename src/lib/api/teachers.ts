
import { v4 as uuidv4 } from 'uuid';
import type { Teacher } from '@/types';
import { getLocalStorageItems, saveLocalStorageItems } from '../utils/localStorage';

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
