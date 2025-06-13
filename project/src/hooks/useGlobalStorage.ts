import { useState, useEffect } from 'react';
import { saveContentToDatabase, loadContentFromDatabase, subscribeToContentChanges } from '../lib/supabase';

export function useGlobalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(initialValue);
  const [isLoading, setIsLoading] = useState(true);

  // Load from database on mount
  useEffect(() => {
    const loadFromDatabase = async () => {
      try {
        const databaseContent = await loadContentFromDatabase();
        if (databaseContent) {
          setStoredValue(databaseContent);
        }
      } catch (error) {
        console.error('Failed to load from database:', error);
        // Fallback to localStorage
        try {
          const item = window.localStorage.getItem(key);
          if (item) {
            setStoredValue(JSON.parse(item));
          }
        } catch (localError) {
          console.error('Failed to load from localStorage:', localError);
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadFromDatabase();
  }, [key]);

  // Subscribe to real-time changes
  useEffect(() => {
    const subscription = subscribeToContentChanges((newContent) => {
      setStoredValue(newContent);
      // Also update localStorage as backup
      try {
        window.localStorage.setItem(key, JSON.stringify(newContent));
      } catch (error) {
        console.error('Failed to update localStorage:', error);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [key]);

  const setValue = async (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      
      // Update local state immediately
      setStoredValue(valueToStore);
      
      // Save to database (global)
      const success = await saveContentToDatabase(valueToStore);
      
      if (success) {
        console.log('✅ Content saved globally - visible to all users!');
      } else {
        console.warn('⚠️ Database save failed, using localStorage backup');
      }
      
      // Always save to localStorage as backup
      try {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      } catch (error) {
        console.error('localStorage backup failed:', error);
      }
      
    } catch (error) {
      console.error('Failed to save content:', error);
    }
  };

  return [storedValue, setValue, isLoading] as const;
}