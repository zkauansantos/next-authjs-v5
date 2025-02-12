import { Label } from "@radix-ui/react-label";
import { cn } from "../lib/utils";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import Link from "next/link";

interface IRegisterFormProps {
  registerAction: (formData: FormData) => void;
}

export function RegisterForm({ registerAction }: IRegisterFormProps) {
  return (
    <div className={cn('flex flex-col gap-6')}>
      <Card>
        <CardHeader>
          <CardTitle className='text-2xl'>Register</CardTitle>
          <CardDescription>
            Create your account to access the platform.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={registerAction} noValidate>
            <div className='flex flex-col gap-6'>
              <div className='grid gap-2'>
                <Label htmlFor='name'>Name</Label>
                <Input
                  id='name'
                  name='name'
                  type='text'
                  placeholder='m@example.com'
                  required
                />
              </div>

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

              <div className='grid gap-2'>
                <Label htmlFor='password'>Password</Label>
                <Input
                  id='password'
                  name='password'
                  type='password'
                  placeholder='********'
                  required
                />
              </div>

              <Button type='submit' className='w-full'>
                Create account
              </Button>
            </div>

            <div className='mt-4 text-center text-sm'>
              Already have an account?{' '}
              <Link href='/login' className='underline underline-offset-4'>
                Sign up
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
