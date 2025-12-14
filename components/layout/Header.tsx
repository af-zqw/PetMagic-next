'use client';

import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import LanguageSwitcher from '@/components/common/LanguageSwitcher';
import useAppStore from '@/lib/store/useAppStore';
import CreditDisplay from '@/components/common/CreditDisplay';

export default function Header() {
  const t = useTranslations();
  const isAuthenticated = useAppStore((state) => state.isAuthenticated);

  return (
    <header className="border-b border-orange-100 bg-white/95 backdrop-blur-md sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <span className="text-3xl transform group-hover:scale-110 transition-transform duration-200">🐾</span>
            <h1 className="font-display text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-orange-600 to-teal-600 bg-clip-text text-transparent">
              AI Pet Live
            </h1>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              href="/" 
              className="font-heading font-semibold text-gray-700 hover:text-orange-600 transition-colors duration-200 relative group"
            >
              {t('nav.home')}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-500 to-teal-500 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link 
              href="/create/image-generator" 
              className="font-heading font-semibold text-gray-700 hover:text-orange-600 transition-colors duration-200 relative group"
            >
              {t('nav.imageGenerator')}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-500 to-teal-500 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link 
              href="/create/video-animator" 
              className="font-heading font-semibold text-gray-700 hover:text-orange-600 transition-colors duration-200 relative group"
            >
              {t('nav.videoAnimator')}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-500 to-teal-500 group-hover:w-full transition-all duration-300"></span>
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {isAuthenticated && <CreditDisplay />}
            <LanguageSwitcher />
            {isAuthenticated ? (
              <Link href="/create/image-generator">
                <Button 
                  size="sm" 
                  className="rounded-full font-bold bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                >
                  🎨 {t('nav.imageGenerator')}
                </Button>
              </Link>
            ) : (
              <Link href="/login">
                <Button 
                  size="sm" 
                  className="rounded-full font-bold bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                >
                  {t('common.login')}
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
