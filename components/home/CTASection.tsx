'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Button } from '@/components/ui/button';

export default function CTASection() {
  const t = useTranslations('home.bottomCTA');
  const tCommon = useTranslations('common');

  return (
    <section className="relative py-24 px-4 overflow-hidden">
      {/* 渐变背景 */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500 via-orange-600 to-teal-500"></div>
      
      {/* 装饰性圆形 */}
      <div className="absolute top-10 left-10 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto text-center max-w-4xl relative z-10">
        {/* 图标装饰 */}
        <div className="text-7xl mb-6 animate-bounce-gentle">
          🐾
        </div>
        
        {/* 标题 */}
        <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight">
          {t('title')}
        </h2>
        
        {/* 副标题 */}
        <p className="font-heading text-xl md:text-2xl text-white/90 mb-10 max-w-2xl mx-auto">
          {t('subtitle')}
        </p>
        
        {/* CTA 按钮 */}
        <Link href="/create/image-generator">
          <Button 
            size="lg" 
            className="text-xl px-12 py-8 rounded-2xl font-bold bg-white text-orange-600 hover:bg-orange-50 shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300"
          >
            {t('button')} ✨
          </Button>
        </Link>
        
        {/* 底部信息 */}
        <div className="mt-10 flex flex-wrap gap-6 justify-center text-white/90">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🎁</span>
            <span className="font-medium">{tCommon('freeTrial')}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">⚡</span>
            <span className="font-medium">{tCommon('instantGeneration')}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">💎</span>
            <span className="font-medium">{tCommon('professionalQuality')}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
