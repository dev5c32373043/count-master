import { useLoading } from './useLoading';
import { request as req, to } from '@/utils';

export function useFetch() {
  const { isLoading, startLoading, finishLoading } = useLoading();

  const request = async (url, options = {}) => {
    startLoading();
    const result = await to(req(url, options));
    finishLoading();

    return result;
  };

  return {
    isLoading,
    request
  };
}

export default useFetch;
