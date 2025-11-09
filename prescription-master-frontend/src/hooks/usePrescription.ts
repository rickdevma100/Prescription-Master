import { useEffect, useState, useCallback } from 'react';
import { fetchCurrentPrescription } from '../api/agentApi';

/**
 * Custom hook to manage prescription state
 * Automatically fetches the current prescription on mount
 * Provides methods to update and refresh prescription
 */
export function usePrescription() {
  const [prescription, setPrescription] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Refresh prescription from API
   */
  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const p = await fetchCurrentPrescription();
      setPrescription(p);
    } catch (e: unknown) {
      const errorMessage = e instanceof Error ? e.message : 'Failed to load prescription';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch prescription on mount
  useEffect(() => {
    refresh();
  }, [refresh]);

  return {
    prescription,
    setPrescription,
    loading,
    error,
    refresh
  };
}

