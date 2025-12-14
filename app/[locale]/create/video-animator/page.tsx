import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import UploadArea from '@/components/create/UploadArea';
import StyleSelector from '@/components/create/StyleSelector';
import ActionPromptInput from '@/components/create/ActionPromptInput';
import DurationInput from '@/components/create/DurationInput';
import GenerateButton from '@/components/create/GenerateButton';
import ResultsGrid from '@/components/create/ResultsGrid';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('meta.videoAnimator');

  return {
    title: t('title'),
    description: t('description'),
  };
}

export default function VideoAnimatorPage() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 pb-24">
      {/* Config Panel - 40% */}
      <div className="lg:col-span-2">
        <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
          <UploadArea />
          <StyleSelector />
          <DurationInput />
          <ActionPromptInput />
        </div>
      </div>

      {/* Results Panel - 60% */}
      <div className="lg:col-span-3">
        <ResultsGrid type="video" />
      </div>

      {/* Fixed Generate Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg p-4 z-50">
        <div className="container mx-auto max-w-7xl">
          <GenerateButton type="video" />
        </div>
      </div>
    </div>
  );
}
