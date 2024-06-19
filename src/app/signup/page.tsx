import Link from 'next/link';
import { SignUpForm } from './form';

export default function SignupPage() {
  return (
    <div className="max-w-7xl mx-auto p-8 flex flex-col items-center gap-8">
      <h1 className="p-4 text-center text-4xl my-10">Zarejestruj sie</h1>
      <SignUpForm />
      <p>
        Masz juz konto?{' '}
        <Link href="/login" className="hover:underline">
          Zaloguj sie
        </Link>
      </p>
    </div>
  );
}
