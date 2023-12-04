import { useState } from 'react';

export function useLoading() {
  const [isLoading, setLoading] = useState(false);

  const startLoading = () => {
    setLoading(true);
  };

  const finishLoading = () => {
    setLoading(false);
  };

  return {
    isLoading,
    startLoading,
    finishLoading
  };
}

export default useLoading;
