export const add = (key: string, value: string): boolean => {
  localStorage.setItem(key, value);
  return true;
};

export const get = (key: string): string | null => {
  return localStorage.getItem(key);
};

export const remove = (key: string): boolean => {
  localStorage.removeItem(key);
  return true;
};

export const removeAll = (): void => {
  localStorage.clear();
};
