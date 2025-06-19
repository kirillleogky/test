import { useState, useEffect } from 'react';
import axios from 'axios';
import { type TNullable } from '../types';

type FetchState<T> = {
  data: TNullable<T>;
  isLoading: boolean;
  error: TNullable<Error>;
};

const useFetchData = <T = unknown>(url: TNullable<string>): FetchState<T> => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<TNullable<Error>>(null);

  useEffect(() => {
    if (!url) {
      setData(null);
      setIsLoading(false);
      setError(null);
      return;
    }

    const controller = new AbortController();

    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get<T>(url, {
          signal: controller.signal,
        });
        setData(response.data);
        setError(null);
      } catch (err) {
        if (!axios.isCancel(err)) {
          setError(err as Error);
          setData(null);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData().catch((err) => {
      console.error('Unhandled fetch error:', err);
    });

    return () => {
      controller.abort();
    };
  }, [url]);

  return { data, isLoading, error };
};

export { useFetchData };
