'use client';

import { Button } from '@/components/ui/button';
import { signIn, useSession } from 'next-auth/react';
import { signOutAction } from '../_actions/signOutAction';

export function AppBar() {
  const session = useSession();

  return (
    <header className='h-20 flex justify-between items-center px-6 border-b'>
      <span>Olá, {session?.data?.user?.name}</span>

      <div className='space-x-4'>
        <Button size='sm' variant='outline' onClick={() => signIn('google')}>
          Conectar conta Google
        </Button>

        <Button size='sm' onClick={signOutAction}>
          Sair
        </Button>
      </div>
    </header>
  );
}
