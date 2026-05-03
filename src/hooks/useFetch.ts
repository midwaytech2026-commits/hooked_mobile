import { useCallback, useEffect, useRef, useState } from 'react';
import type { ApiError } from '../types/api.types';

interface FetchState<T> {
  data: T | null;
  isLoading: boolean;
  error: ApiError | null;
}

interface UseFetchReturn<T> extends FetchState<T> {
  refetch: () => void;
}

export function useFetch<T>(
  fetchFn: () => Promise<T>,
  // eslint-disable-next-line react-hooks/exhaustive-deps
  deps: unknown[] = [],
): UseFetchReturn<T> {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    isLoading: true,
    error: null,
  });
  const isMounted = useRef(true);

  const execute = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    try {
      const data = await fetchFn();
      if (isMounted.current) {
        setState({ data, isLoading: false, error: null });
      }
    } catch (err) {
      if (isMounted.current) {
        setState({ data: null, isLoading: false, error: err as ApiError });
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  useEffect(() => {
    isMounted.current = true;
    execute();
    return () => {
      isMounted.current = false;
    };
  }, [execute]);

  return { ...state, refetch: execute };
}
