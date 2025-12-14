'use client';

import { useTranslations } from 'next-intl';
import { Badge } from '@/components/ui/badge';
import useAppStore from '@/lib/store/useAppStore';

export default function CreditDisplay() {
  const t = useTranslations('common');
  const credits = useAppStore((state) => state.credits);

  return (
    <Badge variant="secondary" className="text-sm px-3 py-1">
      <span className="mr-1">💰</span>
      {t('credits')}: {credits}
    </Badge>
  );
}
