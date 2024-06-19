'use client';
import { login } from '@/app/actions';
import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';

const initialState = {
  name: undefined,
  email: undefined,
  password: undefined,
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      className="px-4 py-2 bg-blue-500 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent hover:bg-blue-600 transition-colors"
      type="submit"
    >
      {pending ? 'Loading...' : 'Log In'}
    </button>
  );
}

export function LoginForm() {
  // @ts-ignore
  const [state, formAction] = useActionState(login, initialState);

  return (
    <form
      action={formAction}
      className="flex flex-col justify-center items-center space-y-4"
    >
      <label htmlFor="email">Email</label>
      <input
        name="email"
        type="email"
        placeholder="Email"
        className="px-4 py-2 rounded-md border text-slate-900 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
      />
      {state?.errors?.email && <p>{state?.errors.email}</p>}
      <label htmlFor="password">Password</label>
      <input
        name="password"
        type="password"
        placeholder="Password"
        className="px-4 py-2 rounded-md border text-slate-900 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
      />
      {state?.errors?.password && <p>{state?.errors.password}</p>}
      <SubmitButton />
    </form>
  );
}
