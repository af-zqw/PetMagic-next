'use client';

import { useEffect, useState } from 'react';
import { useRouter } from '@/i18n/routing';
import useAppStore from '@/lib/store/useAppStore';
import ProtectedHeader from '@/components/layout/ProtectedHeader';
import TabNavigation from '@/components/create/TabNavigation';

export default function CreateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const isAuthenticated = useAppStore((state) => state.isAuthenticated);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    // Wait for store to hydrate from localStorage
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    // Only check authentication after hydration
    if (isHydrated && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, isHydrated, router]);

  // Show nothing until hydration is complete
  if (!isHydrated) {
    return null;
  }

  // If not authenticated after hydration, show nothing (redirect in progress)
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-teal-50">
      <ProtectedHeader />
      <div className="container mx-auto px-4 py-8">
        <TabNavigation />
        <div className="mt-8">{children}</div>
      </div>
    </div>
  );
}
