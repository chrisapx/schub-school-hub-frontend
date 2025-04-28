
import { v4 as uuidv4 } from 'uuid';
import type { Mark } from '@/types';
import { getLocalStorageItems, saveLocalStorageItems } from '../utils/localStorage';

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
