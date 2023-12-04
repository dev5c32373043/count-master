import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

import { useFetch } from '@/hooks';

import ws from '@/ws';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

export function CounterHistory() {
  const [counterHistory, setCounterHistory] = useState([]);
  const { isLoading, request } = useFetch();

  useEffect(() => {
    async function loadHistory() {
      if (isLoading) return;

      const [err, data] = await request('/counter/history');
      if (err) {
        toast.error('Failed to load counter history');
        return;
      }

      setCounterHistory(data);
    }

    loadHistory();

    function onCounterClosed() {
      loadHistory();
    }

    ws.on('counter-closed', onCounterClosed);

    return () => {
      ws.off('counter-closed', onCounterClosed);
    };
  }, []);

  if (isLoading || counterHistory.length < 1) {
    return;
  }

  return (
    <div className="w-2/4 max-md:w-full mt-5">
      <h2 className="text-3xl mb-2">Counter History</h2>
      <ul
        aria-label="Counter history feed"
        role="feed"
        className="relative flex flex-col gap-12 py-12 px-8 rounded-md rounded-b-none bg-slate-200 before:absolute before:top-0 before:left-8 before:h-full before:-translate-x-1/2 before:border before:border-dashed before:border-slate-200 after:absolute after:top-6 after:left-8 after:bottom-6 after:-translate-x-1/2 after:border after:border-emerald-400"
      >
        {counterHistory.map(counterData => (
          <li className="relative pl-8" key={counterData.id}>
            <div className="flex flex-col flex-1 gap-4">
              <div className="absolute z-10 inline-flex items-center justify-center w-8 h-8 rounded-full -left-4 bg-emerald-400">
                <span role="img" aria-label="history record">
                  📖
                </span>
              </div>
              <h4 className="flex flex-col items-start text-lg font-medium leading-8 text-slate-700 md:flex-row lg:items-center">
                <span className="flex-1">
                  <span className="text-base font-normal">Recorded value is {counterData.value}</span>
                </span>
                <span className="text-sm font-normal text-slate-800"> {dayjs(counterData.updatedAt).fromNow()}</span>
              </h4>
              <p className="text-slate-800"></p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
