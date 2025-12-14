/**
 * 测试阿里云 OSS 上传功能
 */

// 导入阿里云 OSS 上传模块
async function testOSSUpload() {
  try {
    console.log('开始测试阿里云 OSS 上传...\n');
    
    // 加载环境变量
    const dotenv = await import('dotenv');
    dotenv.config({ path: '.env.local' });
    
    console.log('环境变量:');
    console.log('- OSS_REGION:', process.env.OSS_REGION);
    console.log('- OSS_BUCKET:', process.env.OSS_BUCKET);
    console.log('- OSS_ENDPOINT:', process.env.OSS_ENDPOINT);
    console.log('- OSS_ACCESS_KEY_ID:', process.env.OSS_ACCESS_KEY_ID ? '已配置' : '未配置');
    console.log('- OSS_ACCESS_KEY_SECRET:', process.env.OSS_ACCESS_KEY_SECRET ? '已配置' : '未配置');
    console.log('');
    
    // 导入上传函数
    const { uploadToOSS } = await import('../lib/utils/oss-upload.js');
    
    // 创建一个测试图片 Blob
    const testImageData = Buffer.from(
      'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
      'base64'
    );
    const blob = new Blob([testImageData], { type: 'image/png' });
    
    console.log('创建测试图片 Blob:');
    console.log('- 大小:', blob.size, 'bytes');
    console.log('- 类型:', blob.type);
    console.log('');
    
    // 上传到阿里云 OSS
    console.log('开始上传...');
    const url = await uploadToOSS(blob);
    
    console.log('\n✅ 上传成功!');
    console.log('图片 URL:', url);
    console.log('\n测试完成!');
    
  } catch (error) {
    console.error('\n❌ 测试失败:', error);
    process.exit(1);
  }
}

// 运行测试
testOSSUpload();
