
import { v4 as uuidv4 } from 'uuid';
import type { Assignment } from '@/types';
import { getLocalStorageItems, saveLocalStorageItems } from '../utils/localStorage';

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
