const STORAGE_PREFIX = "skinstric:";
export const UPLOADED_IMAGE_STORAGE_KEY = "skinstric:uploadedImage";

export const getStoredUploadedImage = (): string | null => {
  if (typeof window === "undefined") {
    return null;
  }

  return window.localStorage.getItem(UPLOADED_IMAGE_STORAGE_KEY);
};

export const setStoredUploadedImage = (image: string | null): void => {
  if (typeof window === "undefined") {
    return;
  }

  if (!image) {
    window.localStorage.removeItem(UPLOADED_IMAGE_STORAGE_KEY);
    return;
  }

  window.localStorage.setItem(UPLOADED_IMAGE_STORAGE_KEY, image);
};

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