'use client';

import { useTranslations } from 'next-intl';

export default function Footer() {
  const t = useTranslations('footer');
  const tCommon = useTranslations('common');

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-16 px-4 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal-600/10 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-4xl">🐾</span>
              <h3 className="font-display text-3xl font-extrabold bg-gradient-to-r from-orange-400 to-teal-400 bg-clip-text text-transparent">
                AI Pet Live
              </h3>
            </div>
            <p className="text-gray-300 leading-relaxed mb-6 max-w-md">
              {t('description')}
            </p>
            
            {/* Social */}
            <div className="flex gap-4">
              {['🐦', '📷', '📘', '🎵'].map((icon, i) => (
                <a 
                  key={i}
                  href="#" 
                  className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center text-2xl transform hover:scale-110 transition-all duration-200"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-heading text-lg font-bold mb-4 text-orange-400">{t('quickLinks')}</h4>
            <ul className="space-y-3">
              {[
                { label: t('links.features'), href: '#features' },
                { label: t('links.gallery'), href: '#gallery' },
                { label: t('links.pricing'), href: '#pricing' },
                { label: t('links.help'), href: '#faq' },
              ].map((link, i) => (
                <li key={i}>
                  <a 
                    href={link.href} 
                    className="text-gray-300 hover:text-white hover:translate-x-1 inline-block transition-all duration-200"
                  >
                    → {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-heading text-lg font-bold mb-4 text-teal-400">{t('legal')}</h4>
            <ul className="space-y-3">
              {[
                { label: t('legalLinks.privacy'), href: '#' },
                { label: t('legalLinks.terms'), href: '#' },
                { label: t('legalLinks.cookies'), href: '#' },
                { label: t('legalLinks.contact'), href: '#' },
              ].map((link, i) => (
                <li key={i}>
                  <a 
                    href={link.href} 
                    className="text-gray-300 hover:text-white hover:translate-x-1 inline-block transition-all duration-200"
                  >
                    → {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

  {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent mb-8"></div>

  {/* Copyright */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-gray-400 text-sm">
          <p>&copy; 2024 AI Pet Live. {t('copyright')}</p>
          <div className="flex gap-6">
            <span className="flex items-center gap-2">
              <span>🔒</span>
              <span>{tCommon('securePayment')}</span>
            </span>
            <span className="flex items-center gap-2">
              <span>⚡</span>
              <span>{tCommon('fastGeneration')}</span>
            </span>
            <span className="flex items-center gap-2">
              <span>💎</span>
              <span>{tCommon('professionalQuality')}</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
