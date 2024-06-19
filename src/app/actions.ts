'use server';
import { SignupFormSchema } from '@/app/_lib/definitions';
import bcrypt from 'bcrypt';
import prisma from './_lib/db';
import { createSession, deleteSession } from './_lib/session';

type PrevStateType = {
  name?: string;
  email?: string;
  password?: string;
  errors?: { [key: string]: string };
};

export async function signup(prevState: PrevStateType, formData: FormData) {
  const validationResult = SignupFormSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (!validationResult.success) {
    console.log(validationResult.error.flatten().fieldErrors);
    return {
      errors: validationResult.error.flatten().fieldErrors,
    };
  }

  const { name, email, password } = validationResult.data;

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  await createSession(user.id);
}

export async function login(prevState: PrevStateType, formData: FormData) {
  const email = formData.get('email');
  const password = formData.get('password');

  const user = await prisma.user.findUnique({
    where: {
      email: email as string,
    },
  });

  if (!user) {
    return {
      errors: {
        email: 'User not found',
      },
    };
  }

  const isValid = await bcrypt.compare(password as string, user.password);

  if (!isValid) {
    return {
      errors: {
        password: 'Invalid password',
      },
    };
  }

  await createSession(user.id);
}

export async function logout() {
  await deleteSession();
}
