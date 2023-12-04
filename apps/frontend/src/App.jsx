import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { useAtom } from 'jotai';

import Router from './Router';
import { Loader, ErrorBoundary } from './components';
import { userAtom } from './state/user';
import { useFetch } from './hooks';
import { history } from './utils';

export default function App() {
  // Init custom history object to allow navigation outside of components
  history.navigate = useNavigate();
  history.location = useLocation();

  const [user, setUser] = useAtom(userAtom);

  const { isLoading, request } = useFetch();

  useEffect(() => {
    async function loadUser() {
      if (window.localStorage.getItem('__jwt') == null) return;

      const [err, user] = await request('/users/me');
      if (err) {
        toast.error('Failed to load profile. Please re-login');
        history.navigate('/login');
        return;
      }

      setUser(user);
    }

    loadUser();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <ErrorBoundary>
      <Router isAuthorized={user.id ?? user.hasToken} />
      <Toaster />
    </ErrorBoundary>
  );
}
