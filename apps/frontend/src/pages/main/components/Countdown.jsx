import { useState, useEffect } from 'react';

export function Countdown({ onConclude, targetDate }) {
  const [totalSeconds, setTotalSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      const diff = new Date(targetDate).getTime() - now;

      if (diff <= 0) {
        clearInterval(interval);
        if (typeof onConclude === 'function') {
          onConclude();
        }

        return;
      }

      const totalSecs = Math.floor(diff / 1000);
      setTotalSeconds(totalSecs);
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  const seconds = totalSeconds % 60;

  return (
    <span className={`countdown font-mono text-5xl ${seconds > 0 ? 'visible' : 'invisible'}`}>
      <span style={{ '--value': seconds }}></span>
    </span>
  );
}
