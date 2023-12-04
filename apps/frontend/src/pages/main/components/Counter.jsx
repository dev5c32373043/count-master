import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

import { Countdown } from './Countdown';
import { AccessGuard } from '@/components';
import { useFetch } from '@/hooks';
import ws from '@/ws';

export function Counter() {
  const [value, setValue] = useState(0);
  const [targetDate, setTargetDate] = useState(0);
  const { isLoading, request } = useFetch();

  async function updateCounter(op) {
    if (isLoading) return;

    const [err, counter] = await request(`/counter/${op}`, { method: 'PUT' });
    if (err) {
      toast.error('Failed to update counter. Please try again');
      return;
    }

    setValue(counter.value);

    const timeLeft = new Date(targetDate).getTime() - Date.now();
    if (timeLeft <= 0) {
      setTargetDate(new Date(counter.createdAt).getTime() + 60000);
    }
  }

  async function incrementValue() {
    await updateCounter('increment');
  }

  async function decrementValue() {
    if (value < 1) return;
    await updateCounter('decrement');
  }

  useEffect(() => {
    async function loadCounter() {
      if (isLoading) return;

      const [err, counter] = await request('/counter/current');
      if (err) {
        toast.error('Failed to load counter. Please try again');
        return;
      }

      setValue(counter.value);

      if (!counter.createdAt) return;
      setTargetDate(new Date(counter.createdAt).getTime() + 60000);
    }

    loadCounter();

    function onCounterClosed() {
      toast.success('Game over. Counter closed', { duration: 3000 });
      setValue(0);
    }

    ws.on('counter-closed', onCounterClosed);

    return () => {
      ws.off('counter-closed', onCounterClosed);
    };
  }, []);

  return (
    <>
      <Countdown targetDate={targetDate} />

      <div className="flex flex-col items-center rounded-box bg-slate-200 p-10 w-56">
        <div className="text-center bg-white rounded-box mb-10 p-10 w-full shadow">
          <span className="text-4xl font-bold text-emerald-400">{value}</span>
        </div>

        <div className="flex gap-5">
          <AccessGuard attr="counter:decr">
            <button className="btn btn-square btn-outline" onClick={decrementValue} disabled={isLoading}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M2 8a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11A.5.5 0 0 1 2 8Z" />{' '}
              </svg>
            </button>
          </AccessGuard>

          <AccessGuard attr="counter:incr">
            <button className="btn btn-square btn-outline" onClick={incrementValue} disabled={isLoading}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                <path
                  fillRule="evenodd"
                  d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"
                />{' '}
              </svg>
            </button>
          </AccessGuard>
        </div>
      </div>
    </>
  );
}
