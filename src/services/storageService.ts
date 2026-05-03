// In-memory fallback — replace with AsyncStorage after installing:
//   npm install @react-native-async-storage/async-storage
//   cd ios && pod install
//
// Then swap the implementation:
//   import AsyncStorage from '@react-native-async-storage/async-storage';
//   export const storageService = {
//     getItem: (key: string) => AsyncStorage.getItem(key),
//     setItem: (key: string, value: string) => AsyncStorage.setItem(key, value),
//     removeItem: (key: string) => AsyncStorage.removeItem(key),
//     clear: () => AsyncStorage.clear(),
//     getAllKeys: () => AsyncStorage.getAllKeys(),
//   };

const store = new Map<string, string>();

export const storageService = {
  getItem: async (key: string): Promise<string | null> =>
    store.get(key) ?? null,

  setItem: async (key: string, value: string): Promise<void> => {
    store.set(key, value);
  },

  removeItem: async (key: string): Promise<void> => {
    store.delete(key);
  },

  clear: async (): Promise<void> => {
    store.clear();
  },

  getAllKeys: async (): Promise<readonly string[]> =>
    Array.from(store.keys()),
};
