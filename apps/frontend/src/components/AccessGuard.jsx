import { useAtomValue } from 'jotai';
import { userAtom } from '@/state/user';

export const AccessGuard = ({ attr, children }) => {
  const user = useAtomValue(userAtom);
  const { permissions = [] } = user;

  return permissions.includes(attr) ? children : null;
};
