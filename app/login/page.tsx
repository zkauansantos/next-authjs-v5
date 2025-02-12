import { LoginForm } from '@/components/login-form';
import { signIn } from '@/lib/auth';
import { loginSchema } from '@/schemas/loginSchema';
import { magicLinkSchema } from '@/schemas/magicLinkSchema';
import { AuthError, CredentialsSignin } from 'next-auth';

export default function Login() {
  async function loginAction(formData: FormData) {
    'use server';

    const { success, data } = loginSchema.safeParse(
      Object.fromEntries(formData)
    );

    if (!success) {
      return;
    }

    const { email, password } = data;

    try {
      await signIn('credentials', {
        email,
        password,
        redirectTo: '/dash',
      });
    } catch (error) {
      if (error instanceof CredentialsSignin) {
        return {
          error: 'Invalid Credentials',
        };
      }

      if (error instanceof AuthError) {
        return {
          error: 'Something went wrong. Try again.',
        };
      }

      throw error;
    }
  }

  async function googleSignInAction(){
    'use server';

    await signIn('google');
  }

  async function magicLinkAction(formData: FormData) {
    'use server';

    const { success, data } = magicLinkSchema.safeParse(
      Object.fromEntries(formData)
    );

    if (!success) {
      return;
    }

    const { email } = data;

    await signIn('resend', {
      email,
      redirectTo: '/dash',
    });
  }

  return (
    <div className='flex min-h-svh w-full items-center justify-center p-6 md:p-10'>
      <div className='w-full max-w-sm'>
        <LoginForm
          loginAction={loginAction}
          magicLinkAction={magicLinkAction}
          googleSignInAction={googleSignInAction}
        />
      </div>
    </div>
  );
}
