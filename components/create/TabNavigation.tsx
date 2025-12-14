'use client';

import { usePathname } from 'next/navigation';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function TabNavigation() {
  const pathname = usePathname();
  const t = useTranslations('create.tabs');

  const activeTab = pathname.includes('video-animator') ? 'video' : 'image';

  return (
    <Tabs value={activeTab} className="w-full">
      <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
        <Link href="/create/image-generator">
          <TabsTrigger value="image" className="w-full">
            {t('image')}
          </TabsTrigger>
        </Link>
        <Link href="/create/video-animator">
          <TabsTrigger value="video" className="w-full">
            {t('video')}
          </TabsTrigger>
        </Link>
      </TabsList>
    </Tabs>
  );
}
