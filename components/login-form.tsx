/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { Label } from '@radix-ui/react-label';
import { ChevronLeftIcon, Loader2Icon, Wand2Icon } from 'lucide-react';
import Link from 'next/link';
import { useActionState, useState } from 'react';
import { toast } from 'sonner';
import { cn } from '../lib/utils';
import { Button } from './ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card';
import { Input } from './ui/input';

interface ILoginFormProps {
  loginAction: (formData: FormData) => Promise<void | { error: string }>;
  googleSignInAction: () => Promise<void>;
  magicLinkAction: (formData: FormData) => Promise<void>;
}

export function LoginForm({
  loginAction,
  googleSignInAction,
  magicLinkAction,
}: ILoginFormProps) {
  const [isMagicLink, setIsMagicLink] = useState(false);

  const [, dispatchAction, isPending] = useActionState(
    async (_previousData: any, formData: FormData) => {
      const response = isMagicLink
        ? await magicLinkAction(formData)
        : await loginAction(formData);

      if (response?.error) {
        toast.error(response.error);
      }
    },
    null
  );

  return (
    <div className={cn('flex flex-col gap-6')}>
      <Card>
        <CardHeader>
          <CardTitle className='text-2xl'>Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={dispatchAction} noValidate>
            <div className='flex flex-col gap-6'>
              <div className='grid gap-2'>
                <Label htmlFor='email'>Email</Label>
                <Input
                  id='email'
                  name='email'
                  type='email'
                  placeholder='m@example.com'
                  required
                />
              </div>

              {!isMagicLink && (
                <div className='grid gap-2'>
                  <div className='flex items-center'>
                    <Label htmlFor='password'>Password</Label>
                    <a
                      href='#'
                      className='ml-auto inline-block text-sm underline-offset-4 hover:underline'
                    >
                      Forgot your password?
                    </a>
                  </div>
                  <Input
                    id='password'
                    name='password'
                    placeholder='********'
                    type='password'
                    required
                  />
                </div>
              )}

              <Button type='submit' className='w-full' disabled={isPending}>
                {isPending && <Loader2Icon className='animate-spin' />}
                {isMagicLink ? 'Send Magic Link' : 'Login'}
              </Button>

              {!isMagicLink && (
                <Button
                  variant='outline'
                  className='w-full'
                  type='button'
                  disabled={isPending}
                  onClick={googleSignInAction}
                >
                  Login with Google
                </Button>
              )}

              <Button
                variant='outline'
                className='w-full'
                type='button'
                disabled={isPending}
                onClick={() => setIsMagicLink((prev) => !prev)}
              >
                {isMagicLink ? <ChevronLeftIcon /> : <Wand2Icon />}
                {isMagicLink ? 'Back' : 'Login with Magic Link'}
              </Button>
            </div>
            <div className='mt-4 text-center text-sm'>
              Don&apos;t have an account?{' '}
              <Link href='/register' className='underline underline-offset-4'>
                Sign up
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
