export const add = (key: string, value: string): boolean => {
  localStorage.setItem(key, value);
  return true;
};

export const get = (key: string): string => {
  const storedObject = localStorage.getItem(key);

  if (!storedObject) {
    throw new Error('could not find stored object with key "' + key + '"');
  }

  return storedObject;
};

export const remove = (key: string): boolean => {
  localStorage.removeItem(key);
  return true;
};

export const removeAll = (): void => {
  localStorage.clear();
};
