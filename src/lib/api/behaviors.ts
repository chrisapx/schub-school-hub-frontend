
import { v4 as uuidv4 } from 'uuid';
import type { Behavior } from '@/types';
import { getLocalStorageItems, saveLocalStorageItems } from '../utils/localStorage';

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
