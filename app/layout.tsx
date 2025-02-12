import { Toaster } from '@/components/ui/sonner';
import { auth } from '@/lib/auth';
import type { Metadata } from 'next';
import { SessionProvider } from 'next-auth/react';
import './globals.css';

export const metadata: Metadata = {
  title: 'Live #056 - Authjs',
  description: 'Authentication with Authjs',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang='pt-BR' suppressHydrationWarning>
      <body suppressHydrationWarning className='antialiased'>
        {/* Passa o session aqui por conta de ja vir do server side */}
        {/* Sendo assim não precisamos fazer o get em api/auth/session */}
        <SessionProvider session={session}>{children}</SessionProvider>

        <Toaster /> 
      </body>
    </html>
  );
}
