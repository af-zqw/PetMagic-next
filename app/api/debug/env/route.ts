import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

/**
 * 诊断端点 - 检查环境变量
 * GET /api/debug/env
 */
export async function GET() {
  const env = {
    hasAccessKey: !!process.env.QINIU_ACCESS_KEY,
    hasSecretKey: !!process.env.QINIU_SECRET_KEY,
    hasBucket: !!process.env.QINIU_BUCKET,
    hasDomain: !!process.env.QINIU_DOMAIN,
    hasRegion: !!process.env.QINIU_REGION,
    accessKeyLength: process.env.QINIU_ACCESS_KEY?.length,
    secretKeyLength: process.env.QINIU_SECRET_KEY?.length,
    accessKeyPreview: process.env.QINIU_ACCESS_KEY?.substring(0, 10),
    secretKeyPreview: process.env.QINIU_SECRET_KEY?.substring(0, 10),
    bucket: process.env.QINIU_BUCKET,
    domain: process.env.QINIU_DOMAIN,
    region: process.env.QINIU_REGION,
  };

  return NextResponse.json(env);
}
