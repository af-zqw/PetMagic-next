import { NextRequest, NextResponse } from 'next/server';
import { uploadImage, generateVideo } from '@/lib/api/runcomfy';

export const runtime = 'nodejs';
export const maxDuration = 300;

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const image = formData.get('image') as File;
    const style = formData.get('style') as string;
    const duration = parseInt(formData.get('duration') as string, 10);
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

    if (isNaN(duration) || duration < 3 || duration > 10) {
      return NextResponse.json(
        { success: false, error: 'Invalid duration (must be 3-10 seconds)' },
        { status: 400 }
      );
    }

    console.log('Starting video generation...', {
      fileName: image.name,
      fileSize: image.size,
      style,
      duration,
      hasPrompt: !!prompt,
    });

    // Step 1: 处理图片（转换为可访问的 URL）
    console.log('Processing image...');
    const imageUrl = await uploadImage(image);
    console.log('Image uploaded successfully to:', imageUrl);

    // Step 2: 提交视频生成请求 (使用 Seedance 1.0 Pro Fast)
    console.log('Submitting video generation request to Seedance...');
    const runId = await generateVideo(imageUrl, style, duration, prompt || undefined);
    console.log('Video generation request submitted successfully:', {
      runId,
      imageUrl,
      style,
      duration,
      prompt: prompt || 'none',
    });

    return NextResponse.json({
      success: true,
      runId,
      message: 'Video generation request submitted successfully',
    });
  } catch (error) {
    console.error('Video generation error:', error);

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      },
      { status: 500 }
    );
  }
}
