const STORAGE_PREFIX = "skinstric:";

export const clearSkinstricFlowData = (): void => {
  if (typeof window === "undefined") {
    return;
  }

  const keysToRemove: string[] = [];

  for (let index = 0; index < window.localStorage.length; index += 1) {
    const storageKey = window.localStorage.key(index);

    if (storageKey?.startsWith(STORAGE_PREFIX)) {
      keysToRemove.push(storageKey);
    }
  }

  keysToRemove.forEach((storageKey) => {
    window.localStorage.removeItem(storageKey);
  });
};