/**
 * RunComfy API 集成测试脚本
 * 
 * 使用方法：
 * 1. 确保 .env.local 中配置了正确的 RUNCOMFY_API_TOKEN
 * 2. 运行: node --loader ts-node/esm scripts/test-api-integration.ts
 *    或者: npx tsx scripts/test-api-integration.ts
 * 
 * 或者直接传入环境变量：
 *    RUNCOMFY_API_TOKEN=your_token node --loader ts-node/esm scripts/test-api-integration.ts
 */

import * as fs from 'fs';
import * as path from 'path';

// 尝试从 .env.local 读取环境变量
try {
  const envPath = path.resolve(process.cwd(), '.env.local');
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf-8');
    envContent.split('\n').forEach(line => {
      const match = line.match(/^([^=]+)=(.*)$/);
      if (match) {
        const key = match[1].trim();
        const value = match[2].trim();
        if (!process.env[key]) {
          process.env[key] = value;
        }
      }
    });
  }
} catch (error) {
  console.warn('⚠️  Could not read .env.local file');
}

const API_TOKEN = process.env.RUNCOMFY_API_TOKEN;
const API_BASE_URL = process.env.RUNCOMFY_API_URL || 'https://model-api.runcomfy.net';

if (!API_TOKEN) {
  console.error('❌ RUNCOMFY_API_TOKEN not found');
  console.error('   Please set it in .env.local or pass it as environment variable');
  process.exit(1);
}

console.log('🔧 Configuration:');
console.log(`   API Base URL: ${API_BASE_URL}`);
console.log(`   API Token: ${API_TOKEN.substring(0, 10)}...`);
console.log('');

/**
 * 测试提交图片生成请求
 */
async function testSubmitRequest() {
  console.log('📤 Testing: Submit Image Generation Request');
  console.log('━'.repeat(50));

  const modelId = 'blackforestlabs/flux-1-kontext/pro/edit';
  const testImageUrl = 'https://playgrounds-storage-public.runcomfy.net/tools/7063/media-files/usecase1-1-input.webp';
  
  try {
    const response = await fetch(`${API_BASE_URL}/v1/models/${modelId}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: 'She is now holding an orange umbrella and smiling',
        image_url: testImageUrl,
        seed: 81030369,
        aspect_ratio: '16:9',
      }),
    });

    console.log(`   Status: ${response.status} ${response.statusText}`);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`   ❌ Error: ${errorText}`);
      return null;
    }

    const data = await response.json();
    console.log('   ✅ Success!');
    console.log(`   Request ID: ${data.request_id}`);
    console.log(`   Status URL: ${data.status_url}`);
    console.log('');
    
    return data.request_id;
  } catch (error) {
    console.error('   ❌ Exception:', error);
    return null;
  }
}

/**
 * 测试检查请求状态
 */
async function testCheckStatus(requestId: string) {
  console.log('🔍 Testing: Check Request Status');
  console.log('━'.repeat(50));
  
  try {
    const response = await fetch(`${API_BASE_URL}/v1/requests/${requestId}/status`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${API_TOKEN}`,
      },
    });

    console.log(`   Status: ${response.status} ${response.statusText}`);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`   ❌ Error: ${errorText}`);
      return null;
    }

    const data = await response.json();
    console.log('   ✅ Success!');
    console.log(`   Request Status: ${data.status}`);
    if (data.queue_position !== undefined) {
      console.log(`   Queue Position: ${data.queue_position}`);
    }
    console.log('');
    
    return data;
  } catch (error) {
    console.error('   ❌ Exception:', error);
    return null;
  }
}

/**
 * 测试获取请求结果
 */
async function testGetResult(requestId: string) {
  console.log('📦 Testing: Get Request Result');
  console.log('━'.repeat(50));
  
  try {
    const response = await fetch(`${API_BASE_URL}/v1/requests/${requestId}/result`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${API_TOKEN}`,
      },
    });

    console.log(`   Status: ${response.status} ${response.statusText}`);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`   ❌ Error: ${errorText}`);
      return null;
    }

    const data = await response.json();
    console.log('   ✅ Success!');
    console.log(`   Result Status: ${data.status}`);
    if (data.output) {
      console.log(`   Output:`, JSON.stringify(data.output, null, 2));
    }
    console.log('');
    
    return data;
  } catch (error) {
    console.error('   ❌ Exception:', error);
    return null;
  }
}

/**
 * 主测试流程
 */
async function main() {
  console.log('🚀 RunComfy API Integration Test');
  console.log('═'.repeat(50));
  console.log('');

  // 步骤 1: 提交请求
  const requestId = await testSubmitRequest();
  if (!requestId) {
    console.error('❌ Failed to submit request. Aborting test.');
    process.exit(1);
  }

  // 等待一下
  await new Promise(resolve => setTimeout(resolve, 2000));

  // 步骤 2: 检查状态
  const status = await testCheckStatus(requestId);
  if (!status) {
    console.error('❌ Failed to check status. Aborting test.');
    process.exit(1);
  }

  // 步骤 3: 如果完成，获取结果
  if (status.status === 'completed') {
    await testGetResult(requestId);
  } else {
    console.log(`ℹ️  Request is still ${status.status}. You can check the result later using:`);
    console.log(`   curl -H "Authorization: Bearer ${API_TOKEN}" ${API_BASE_URL}/v1/requests/${requestId}/result`);
  }

  console.log('');
  console.log('✨ Test completed!');
}

// 运行测试
main().catch(console.error);
