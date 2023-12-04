import { atom } from 'jotai';

export const userAtom = atom({ hasToken: !!window.localStorage.getItem('__jwt') });
