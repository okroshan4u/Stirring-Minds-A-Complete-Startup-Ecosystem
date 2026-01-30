import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign In | StartupBenefits',
  description: 'Sign in to access your startup benefits dashboard',
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}