import { NextRequest, NextResponse } from 'next/server';
import { uploadImage, generateImage } from '@/lib/api/runcomfy';

export const runtime = 'nodejs';
export const maxDuration = 300; // 5 minutes timeout

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const image = formData.get('image') as File;
    const style = formData.get('style') as string;
    const prompt = formData.get('prompt') as string | null;

    if (!image) {
      return NextResponse.json(
        { success: false, error: 'No image provided' },
        { status: 400 }
      );
    }

    if (!style) {
      return NextResponse.json(
        { success: false, error: 'No style provided' },
        { status: 400 }
      );
    }

    console.log('Starting image generation...', {
      fileName: image.name,
      fileSize: image.size,
      style,
      hasPrompt: !!prompt,
    });

    // Step 1: 将图片转换为可访问的 URL
    console.log('Processing image...');
    const imageUrl = await uploadImage(image);
    console.log('Image uploaded successfully to:', imageUrl);

    // Step 2: 提交生成请求
    console.log('Submitting generation request with style:', style);
    const runId = await generateImage(imageUrl, style, prompt || undefined);
    console.log('Generation request submitted successfully:', {
      runId,
      imageUrl,
      style,
      prompt: prompt || 'none',
    });

    return NextResponse.json({
      success: true,
      runId,
      message: 'Generation request submitted successfully',
    });
  } catch (error) {
    console.error('Image generation error:', error);

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      },
      { status: 500 }
    );
  }
}
