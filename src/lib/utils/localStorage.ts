
// Utility to get items from localStorage with a fallback to empty array
export const getLocalStorageItems = <T>(key: string): T[] => {
  try {
    const items = localStorage.getItem(key);
    return items ? JSON.parse(items) : [];
  } catch (error) {
    console.error(`Error retrieving ${key} from localStorage:`, error);
    return [];
  }
};

// Utility to save items to localStorage
export const saveLocalStorageItems = <T>(key: string, items: T[]): void => {
  try {
    localStorage.setItem(key, JSON.stringify(items));
  } catch (error) {
    console.error(`Error saving ${key} to localStorage:`, error);
  }
};
