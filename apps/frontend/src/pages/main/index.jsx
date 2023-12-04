import { Header, AccessGuard } from '@/components';
import { Counter } from './components/Counter';
import { CounterHistory } from './components/CounterHistory';

export function MainPage() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-gray-800 text-neutral-content">
      <Header />

      <AccessGuard attr="counter:read">
        <Counter />
      </AccessGuard>

      <AccessGuard attr="counter:history">
        <CounterHistory />
      </AccessGuard>
    </main>
  );
}
