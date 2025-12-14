'use client';

import { useParams } from 'next/navigation';
import { useRouter, usePathname } from '@/i18n/routing';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import useAppStore from '@/lib/store/useAppStore';

export default function LanguageSwitcher() {
  const params = useParams();
  const router = useRouter();
  const pathname = usePathname();
  const setLanguage = useAppStore((state) => state.setLanguage);

  const currentLocale = params.locale as string;

  const handleLanguageChange = (locale: string) => {
    setLanguage(locale as 'en' | 'zh');
    router.replace(pathname, { locale });
  };

  return (
    <Select value={currentLocale} onValueChange={handleLanguageChange}>
      <SelectTrigger className="w-[100px] h-9">
        <SelectValue placeholder="Language">
          {currentLocale === 'en' ? 'English' : '中文'}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="en">English</SelectItem>
        <SelectItem value="zh">中文</SelectItem>
      </SelectContent>
    </Select>
  );
}
