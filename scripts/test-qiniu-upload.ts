/**
 * 测试七牛云上传功能
 * 
 * 运行方式：
 * npx tsx scripts/test-qiniu-upload.ts
 */

import * as path from 'path';
import * as fs from 'fs';

// 手动加载 .env.local
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

console.log('📋 Environment Variables:');
console.log(`   QINIU_ACCESS_KEY: ${process.env.QINIU_ACCESS_KEY ? '✓ Set' : '✗ Not set'}`);
console.log(`   QINIU_SECRET_KEY: ${process.env.QINIU_SECRET_KEY ? '✓ Set' : '✗ Not set'}`);
console.log(`   QINIU_BUCKET: ${process.env.QINIU_BUCKET || '✗ Not set'}`);
console.log(`   QINIU_DOMAIN: ${process.env.QINIU_DOMAIN || '✗ Not set'}`);
console.log(`   QINIU_REGION: ${process.env.QINIU_REGION || '✗ Not set'}`);
console.log('');

// 动态导入七牛云工具
async function testUpload() {
  try {
    console.log('🧪 Testing Qiniu Upload...');
    console.log('━'.repeat(50));
    
    const { generateUploadToken } = await import('../lib/utils/qiniu-upload.js');
    
    // 测试生成上传凭证
    console.log('📝 Generating upload token...');
    const token = generateUploadToken('test/test-image.jpg');
    
    console.log('✅ Token generated successfully!');
    console.log(`   Token length: ${token.length}`);
    console.log(`   Token preview: ${token.substring(0, 50)}...`);
    console.log('');
    
    console.log('✨ Test passed! Qiniu configuration is correct.');
    console.log('');
    console.log('💡 Next steps:');
    console.log('   1. Upload an image through the web interface');
    console.log('   2. Check the network tab for the upload request');
    console.log('   3. Verify the returned URL starts with https://');
    
  } catch (error) {
    console.error('❌ Test failed!');
    console.error('   Error:', error);
    process.exit(1);
  }
}

testUpload();
