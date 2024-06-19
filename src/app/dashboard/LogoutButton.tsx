'use client';

import { useActionState } from 'react';
import { logout } from '../actions';

function Button() {
  return (
    <button
      type="submit"
      className="mt-4 bg-red-500 text-white p-2 rounded  focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent hover:bg-red-600 transition-colors"
    >
      Logout
    </button>
  );
}

const initialState = {};

export default function LogoutButton() {
  // @ts-ignore
  const [state, formAction] = useActionState(logout, initialState);
  return (
    <form action={formAction}>
      <Button />
    </form>
  );
}
