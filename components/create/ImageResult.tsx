'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { GeneratedImage } from '@/types/generation';

interface ImageResultProps {
  image: GeneratedImage;
}

export default function ImageResult({ image }: ImageResultProps) {
  const t = useTranslations('create.results');
  const [isOpen, setIsOpen] = useState(false);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = image.url;
    link.download = `petmagic-${image.id}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <div className="group relative aspect-square rounded-lg overflow-hidden border bg-gray-100 cursor-pointer">
        <Image
          src={image.url}
          alt={`Generated ${image.style}`}
          fill
          className="object-cover"
          onClick={() => setIsOpen(true)}
        />
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <Button
            size="sm"
            variant="secondary"
            onClick={(e) => {
              e.stopPropagation();
              handleDownload();
            }}
          >
            {t('download')}
          </Button>
        </div>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-3xl">
          <div className="relative aspect-square w-full">
            <Image
              src={image.url}
              alt={`Generated ${image.style}`}
              fill
              className="object-contain"
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
