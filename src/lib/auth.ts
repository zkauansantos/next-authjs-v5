import db from '@/lib/db';
import { compare } from 'bcryptjs';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

NextAuth({
  providers: [
    Credentials({
      authorize: async (credentials) => {
        // recebe oque o usuário digita no form e aqui implementamos a lógica para onde quiser

        // a regra é retornar null quando nao encontrar usuario ou der erro e quando localiza retorna um objeto com o usuario
        const { success, data } = schema.safeParse(credentials);

        if (!success) {
          return null;
        }

        const { email, password } = data;

        const user = await db.user.findUnique({
          where: {
            email,
          },
        });

        if (!user) {
          return null;
        }

        const isPasswordValid = await compare(password, user.password);

        if (!isPasswordValid) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
        };
      },
    }),
  ],
});
