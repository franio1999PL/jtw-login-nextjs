import Link from 'next/link';
import { LoginForm } from './LoginForm';

export default function LoginPage() {
  return (
    <div className="max-w-7xl mx-auto p-8 flex flex-col items-center gap-8">
      <h1 className="p-4 text-center text-4xl my-10">Zaloguj sie</h1>
      <LoginForm />
      <p>
        Nie masz konta?{' '}
        <Link href="/signup" className="hover:underline">
          Zarejestruj sie
        </Link>
      </p>
    </div>
  );
}
