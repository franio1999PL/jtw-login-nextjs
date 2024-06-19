import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import 'server-only';

const key = new TextEncoder().encode(process.env.SESSION_SECRET!);

const cookie = {
  name: 'session',
  options: {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
  },
  duration: 24 * 60 * 60 * 1000,
};

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1day')
    .sign(key);
}

export async function decrypt(session: any) {
  try {
    const { payload } = await jwtVerify(session, key, {
      algorithms: ['HS256'],
    });
    return payload;
  } catch (error) {
    return null;
  }
}

export async function createSession(userId: string) {
  const expires = new Date(Date.now() + cookie.duration);
  const session = await encrypt({ userId, expires });

  cookies().set(cookie.name, session, {
    ...cookie.options,
    expires,
    sameSite: 'lax', // Możesz zmienić na 'strict', 'lax' lub 'none' w zależności od wymagań
  });

  redirect('/dashboard');
}

export async function refreshSession() {
  const cookieSession = cookies().get(cookie.name)?.value;
  const session = await decrypt(cookieSession);
  if (!session?.userId) {
    redirect('/login');
  }

  return { userId: session.userId };
}

export async function deleteSession() {
  cookies().delete(cookie.name);
  redirect('/login');
}
