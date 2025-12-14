#!/usr/bin/env node
/**
 * 直接测试七牛云上传函数
 */

const fs = require('fs');
const path = require('path');

// 加载环境变量
require('dotenv').config({ path: path.resolve(__dirname, '../.env.local') });

async function testUpload() {
  console.log('🧪 Testing Qiniu Upload Function\n');
  
  // 动态导入 ES 模块
  const { uploadToQiniu, generateUploadToken } = await import('../lib/utils/qiniu-upload.ts');
  
  console.log('1️⃣ 测试 Token 生成...\n');
  try {
    const testFileName = `test-${Date.now()}.png`;
    const token = generateUploadToken(testFileName);
    console.log('✅ Token 生成成功\n');
  } catch (error) {
    console.error('❌ Token 生成失败:', error.message);
    process.exit(1);
  }
  
  console.log('2️⃣ 测试文件上传...\n');
  try {
    // 读取测试图片
    const imageBuffer = fs.readFileSync('/tmp/test.png');
    const blob = new Blob([imageBuffer], { type: 'image/png' });
    
    console.log('开始上传...');
    const url = await uploadToQiniu(blob);
    
    console.log('\n✅ 上传成功!');
    console.log('📷 图片 URL:', url);
    console.log('\n💡 可以在浏览器中打开查看:', url);
  } catch (error) {
    console.error('\n❌ 上传失败:', error.message);
    process.exit(1);
  }
}

testUpload();
