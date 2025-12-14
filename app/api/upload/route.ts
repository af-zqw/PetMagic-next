import { NextRequest, NextResponse } from 'next/server';
import { uploadToOSS } from '@/lib/utils/oss-upload';

export const runtime = 'nodejs';
export const maxDuration = 60; // 1 minute timeout

/**
 * 上传文件到阿里云 OSS
 * POST /api/upload
 */
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { success: false, error: 'No file provided' },
        { status: 400 }
      );
    }

    // 验证文件类型
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { success: false, error: 'Invalid file type. Only images are allowed.' },
        { status: 400 }
      );
    }

    // 验证文件大小（最大 10MB）
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { success: false, error: 'File too large. Maximum size is 10MB.' },
        { status: 400 }
      );
    }

    console.log('Uploading file to OSS:', {
      fileName: file.name,
      fileSize: file.size,
      fileType: file.type,
    });

    // 上传到阿里云 OSS
    const url = await uploadToOSS(file);

    console.log('File uploaded successfully:', url);

    return NextResponse.json({
      success: true,
      url,
      message: 'File uploaded successfully',
    });
  } catch (error) {
    console.error('Upload error:', error);

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Upload failed',
      },
      { status: 500 }
    );
  }
}
