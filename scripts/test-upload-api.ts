#!/usr/bin/env tsx
/**
 * 测试七牛云上传 API
 */

import FormData from 'form-data';

const API_URL = 'http://localhost:3000/api/upload';

async function testUpload() {
  try {
    console.log('🧪 Testing Qiniu Upload API...\n');

    // 创建一个测试图片（1x1 红色 PNG）
    const testImageBuffer = Buffer.from(
      'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==',
      'base64'
    );

    // 构造表单数据
    const formData = new FormData();
    formData.append('file', testImageBuffer, {
      filename: 'test.png',
      contentType: 'image/png'
    });

    console.log('📤 Uploading test image...');
    const response = await fetch(API_URL, {
      method: 'POST',
      // Node 环境下使用 `form-data` 包；其类型不是标准 DOM FormData。
      // 这里是测试脚本，直接断言以满足 TypeScript（不影响实际运行）。
      body: formData as unknown as BodyInit,
      headers: formData.getHeaders() as unknown as HeadersInit
    });

    console.log('📡 Response status:', response.status);
    
    const result = await response.json();
    console.log('📋 Response body:', JSON.stringify(result, null, 2));

    if (response.ok && result.url) {
      console.log('\n✅ Upload successful!');
      console.log('🔗 Image URL:', result.url);
      console.log('\n💡 You can access the image at:', result.url);
    } else {
      console.log('\n❌ Upload failed!');
      if (result.error) {
        console.log('Error:', result.error);
        console.log('Details:', result.details);
      }
    }
  } catch (error) {
    console.error('\n❌ Test failed:', error);
  }
}

testUpload();
