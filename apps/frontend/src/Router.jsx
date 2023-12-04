import { Route, Routes } from 'react-router-dom';

import { MainPage, LoginPage, SignUpPage } from './pages';

import { ProtectedSpace } from './ProtectedSpace';

export default function Router({ isAuthorized }) {
  return (
    <Routes>
      <Route element={<ProtectedSpace isAuthorized={isAuthorized} />}>
        <Route path="/" Component={MainPage} />
      </Route>

      <Route element={<ProtectedSpace isAuthorized={!isAuthorized} redirectPath="/" />}>
        <Route path="/login" Component={LoginPage} />
        <Route path="/signup" Component={SignUpPage} />
      </Route>
    </Routes>
  );
}
