import { loginSchema } from '@/schemas/loginSchema';
import { compare } from 'bcryptjs';

import { PrismaAdapter } from '@auth/prisma-adapter';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import Google from 'next-auth/providers/google';

import Resend from 'next-auth/providers/resend';
import db from './db';

export const { auth, signIn, signOut, handlers } = NextAuth({
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60, // 1d,
  },
  adapter: PrismaAdapter(db),
  providers: [
    Resend({
      from: 'Kauan <onboarding@resend.dev>',
    }),
    Google({
      allowDangerousEmailAccountLinking: true,
    }),
    Credentials({
      authorize: async (credentials) => {
        // recebe oque o usuário digita no form e aqui implementamos a lógica para onde quiser

        // a regra é retornar null quando nao encontrar usuario ou der erro e quando localiza retorna um objeto com o usuario
        const { success, data } = loginSchema.safeParse(credentials);

        if (!success) {
          return null;
        }

        const { email, password } = data;

        const user = await db.user.findUnique({
          where: {
            email,
          },
        });

        if (!user || !user.password) {
          return null;
        }

        const isPasswordValid = await compare(password, user.password);

        if (!isPasswordValid) {
          return null;
        }

        return user;
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user?.role) {
        token.role = user.role;
      }

      return token;
    },

    session({ session, token }) {
      if (token.sub) {
        session.user.id = token.sub;
      }

      if (token.role) {
        session.user.role = token.role;
      }

      return session;
    },
  },
});
