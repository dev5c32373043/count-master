import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useSetAtom } from 'jotai';
import { userAtom } from '@/state/user';
import { useFetch } from '@/hooks';

import { history } from '@/utils';

export function AuthForm({ action }) {
  const { isLoading, request } = useFetch();

  const [errorMessage, setErrMessage] = useState('');
  const setUser = useSetAtom(userAtom);

  const {
    watch,
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({ roleId: 1 });

  const onSubmit = async formData => {
    if (isLoading) return;

    const [err, resp] = await request(`/auth/${action}`, { method: 'POST', body: formData });
    if (err) {
      if (err?.data?.message) {
        setErrMessage(err.data.message);
      }

      return;
    }

    window.localStorage.setItem('__jwt', resp.token);
    setUser(resp.user);

    history.navigate('/');
  };

  useEffect(() => {
    // Reset error state when form data is changed
    const sub = watch(() => {
      if (!errorMessage) return;
      setErrMessage('');
    });

    return () => sub.unsubscribe();
  }, [watch]);

  return (
    <div className="max-w-md">
      <form className="bg-white shadow-lg rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="relative mb-4">
          <span
            className={`relative ${
              errorMessage ? 'visible' : 'invisible'
            } flex w-full justify-between px-4 py-1 text-md text-pink-500 border border-pink-500 rounded`}
          >
            {errorMessage}
          </span>
        </div>

        <div className="form-control">
          <label className="label" htmlFor="user-email">
            <span className="label-text">Email</span>
          </label>

          <input
            id="user-email"
            type="email"
            name="email"
            placeholder="Enter email"
            className="input input-bordered w-full"
            {...register('email', { required: true })}
          />

          <label className="label" htmlFor="user-email">
            <span className={`${errors.email ? 'visible' : 'invisible'} label-text-alt text-red-600`}>
              Please provide correct email, e.g user@gmail.com
            </span>
          </label>
        </div>

        <div className="form-control">
          <label className="label" htmlFor="user-password">
            <span className="label-text">Password</span>
          </label>

          <input
            id="user-password"
            type="password"
            name="password"
            placeholder="Enter password"
            className="input input-bordered w-full"
            {...register('password', {
              pattern: /^(?=.*[A-Z])(?=.*\d).{8,}$/,
              required: true
            })}
          />

          <label className="label" htmlFor="user-password">
            <span className={`${errors.password ? 'visible' : 'invisible'} label-text-alt text-red-600`}>
              Password must be 8 or more characters, at least one uppercase and one number.
            </span>
          </label>
        </div>

        {action === 'signup' && (
          <div className="form-control mb-5">
            <div className="label">
              <span className="label-text">Role</span>
            </div>
            <select
              className="select select-bordered w-full"
              {...register('roleId', { valueAsNumber: true, required: true })}
            >
              <option value="1">User</option>
              <option value="2">PRO User</option>
            </select>
          </div>
        )}

        <div className="flex items-center justify-between">
          <Link to={action === 'login' ? '/signup' : '/login'} className="btn btn-secondary">
            {action === 'login' ? 'Sign Up' : 'Login'}
          </Link>

          <button type="submit" className="btn btn-primary text-slate-50">
            Submit
            {isLoading && <span className="loading loading-spinner" />}
          </button>
        </div>
      </form>

      <p className="text-center text-gray-400 text-xs">
        &copy;{new Date().getFullYear()} CountMaster Corp. All rights reserved.
      </p>
    </div>
  );
}
