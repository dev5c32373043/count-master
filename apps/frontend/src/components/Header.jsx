import { useSetAtom } from 'jotai';
import { userAtom } from '@/state/user';
import { history } from '@/utils';

export function Header() {
  const setUser = useSetAtom(userAtom);

  function basicLogout() {
    window.localStorage.removeItem('__jwt');
    setUser({ hasToken: false });
    history.navigate('/login');
  }

  return (
    <header className="relative w-full mb-5">
      <div className="navbar bg-emerald-400">
        <div className="navbar-start">
          <div className="flex justify-center items-center text-xl gap-3">
            <img src="/logo.svg" width="38" height="38" alt="Logo" />
            <span className="text-slate-100">CountMaster: Counting for No Particular Reason!</span>
          </div>
        </div>
        <div className="navbar-center hidden lg:flex" />
        <div className="navbar-end">
          <button className="btn" onClick={basicLogout}>
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}
