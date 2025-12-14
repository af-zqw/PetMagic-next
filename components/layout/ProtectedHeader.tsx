'use client';

import { Link, useRouter } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import useAppStore from '@/lib/store/useAppStore';
import CreditDisplay from '@/components/common/CreditDisplay';
import LanguageSwitcher from '@/components/common/LanguageSwitcher';

export default function ProtectedHeader() {
  const t = useTranslations('common');
  const router = useRouter();
  const logout = useAppStore((state) => state.logout);

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2 cursor-pointer">
            <h1 className="text-2xl font-bold text-gray-900">
              🐾 AI Pet Live
            </h1>
          </Link>

          <div className="flex items-center space-x-4">
            <CreditDisplay />
            <LanguageSwitcher />
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
            >
              {t('logout')}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
