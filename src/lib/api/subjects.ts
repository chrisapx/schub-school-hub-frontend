
import { v4 as uuidv4 } from 'uuid';
import type { Subject } from '@/types';
import { getLocalStorageItems, saveLocalStorageItems } from '../utils/localStorage';

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
