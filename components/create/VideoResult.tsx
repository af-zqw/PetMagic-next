'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { GeneratedVideo } from '@/types/generation';

interface VideoResultProps {
  video: GeneratedVideo;
}

export default function VideoResult({ video }: VideoResultProps) {
  const t = useTranslations('create.results');
  const [isOpen, setIsOpen] = useState(false);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = video.url;
    link.download = `petmagic-${video.id}.mp4`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <div
        className="group relative aspect-square rounded-lg overflow-hidden border bg-gray-100 cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        {video.thumbnailUrl ? (
          <img
            src={video.thumbnailUrl}
            alt={`Generated ${video.style} video`}
            className="w-full h-full object-cover"
          />
        ) : (
          <video
            src={video.url}
            className="w-full h-full object-cover"
            muted
            loop
            playsInline
          />
        )}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <div className="text-white text-4xl">▶️</div>
        </div>
        <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
          {video.duration}s
        </div>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-3xl">
          <div className="relative aspect-square w-full bg-black">
            <video
              src={video.url}
              controls
              autoPlay
              loop
              className="w-full h-full"
            />
          </div>
          <Button onClick={handleDownload} className="w-full">
            {t('download')}
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}
