import { AuthForm } from '@/components';

export function SignUpPage() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-gray-800">
      <h2 className="my-8 text-4xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
        <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Sign Up</span>
      </h2>
      <AuthForm action="signup" />
    </main>
  );
}
