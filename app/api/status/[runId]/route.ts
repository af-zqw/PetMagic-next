import { NextRequest, NextResponse } from 'next/server';
import { checkStatus, getResult } from '@/lib/api/runcomfy';

export const runtime = 'nodejs';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ runId: string }> }
) {
  try {
    const { runId: requestId } = await params;

    if (!requestId) {
      return NextResponse.json(
        { success: false, error: 'No request ID provided' },
        { status: 400 }
      );
    }

    console.log('Checking status for request ID:', requestId);
    const status = await checkStatus(requestId);
    console.log('Status:', status);

    // 如果已完成，获取完整结果
    if (status.status === 'completed') {
      console.log('Request completed, fetching result...');
      const result = await getResult(requestId);
      console.log('Result:', JSON.stringify(result, null, 2));

      // 规范化输出格式，确保前端能正确解析
      const outputs = result.output || {};
      const normalizedOutputs = {
        images: outputs.images || (outputs.image ? [outputs.image] : []),
        videos: outputs.videos || (outputs.video ? [outputs.video] : []),
      };

      console.log('Normalized outputs:', JSON.stringify(normalizedOutputs, null, 2));

      return NextResponse.json({
        success: true,
        status: 'completed',
        outputs: normalizedOutputs,
        request_id: result.request_id,
      });
    }

    return NextResponse.json({
      success: true,
      ...status,
    });
  } catch (error) {
    console.error('Status check error:', error);

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      },
      { status: 500 }
    );
  }
}
