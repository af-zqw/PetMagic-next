'use client';

import { useTranslations } from 'next-intl';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import useAppStore from '@/lib/store/useAppStore';
import { VIDEO_ACTION_TAGS } from '@/lib/constants/prompts';

export default function ActionPromptInput() {
  const t = useTranslations('create.action');
  const prompt = useAppStore((state) => state.prompt);
  const setPrompt = useAppStore((state) => state.setPrompt);

  const handleTagClick = (tagValue: string) => {
    const currentPrompt = prompt.trim();
    const newPrompt = currentPrompt
      ? `${currentPrompt}, ${tagValue}`
      : tagValue;
    setPrompt(newPrompt);
  };

  return (
    <div className="space-y-3">
      <h3 className="font-semibold text-lg">{t('title')}</h3>
      <Textarea
        placeholder="e.g., wagging tail, running fast..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        className="w-full h-[400px] resize-none"
      />
      <div className="flex flex-wrap gap-2">
        {VIDEO_ACTION_TAGS.map((tag) => (
          <Badge
            key={tag.value}
            variant="outline"
            className="cursor-pointer hover:bg-primary hover:text-white transition-colors"
            onClick={() => handleTagClick(tag.value)}
          >
            {t(`tags.${tag.label.toLowerCase().replace(/ /g, '')}`)}
          </Badge>
        ))}
      </div>
    </div>
  );
}
