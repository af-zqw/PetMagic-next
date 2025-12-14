'use client';

import { useTranslations } from 'next-intl';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import useAppStore from '@/lib/store/useAppStore';

export default function DurationInput() {
  const t = useTranslations('create.duration');
  const { toast } = useToast();
  const videoDuration = useAppStore((state) => state.videoDuration);
  const setVideoDuration = useAppStore((state) => state.setVideoDuration);

  const handleChange = (value: string) => {
    const num = parseInt(value, 10);

    if (isNaN(num)) return;

    if (num > 10) {
      toast({
        title: t('max'),
        variant: 'destructive',
      });
      setVideoDuration(10);
    } else if (num < 3) {
      setVideoDuration(3);
    } else {
      setVideoDuration(num);
    }
  };

  return (
    <div className="space-y-2">
      <h3 className="font-semibold text-lg">{t('title')}</h3>
      <div className="flex items-center gap-2">
        <Input
          type="number"
          min={3}
          max={10}
          value={videoDuration}
          onChange={(e) => handleChange(e.target.value)}
          className="w-24"
        />
        <span className="text-sm text-gray-600">{t('unit')}</span>
      </div>
      <p className="text-xs text-gray-500">{t('hint')}</p>
    </div>
  );
}
