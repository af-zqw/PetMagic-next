#!/usr/bin/env tsx
/**
 * 测试七牛云 Token 生成 - 对比官方示例
 * 参考：https://developer.qiniu.com/kodo/1208/upload-token
 */

import crypto from 'crypto';
import * as dotenv from 'dotenv';
import * as path from 'path';

// 加载环境变量
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

// 配置信息
const ACCESS_KEY = process.env.QINIU_ACCESS_KEY!;
const SECRET_KEY = process.env.QINIU_SECRET_KEY!;
const BUCKET = 'pet-ai';

console.log('🔑 环境变量检查:');
console.log('ACCESS_KEY:', ACCESS_KEY ? `${ACCESS_KEY.substring(0, 10)}...` : '❌ 未设置');
console.log('SECRET_KEY:', SECRET_KEY ? `${SECRET_KEY.substring(0, 10)}...` : '❌ 未设置');
console.log('BUCKET:', BUCKET);
console.log('');

function urlSafeBase64Encode(data: string | Buffer): string {
  const buffer = typeof data === 'string' ? Buffer.from(data, 'utf-8') : data;
  return buffer
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
}

function generateToken(fileName?: string): string {
  console.log('\n🔧 生成上传凭证...\n');
  
  // 步骤 1: 构造上传策略
  const putPolicy = {
    scope: fileName ? `${BUCKET}:${fileName}` : BUCKET,
    deadline: Math.floor(Date.now() / 1000) + 3600,
  };
  
  console.log('1️⃣ 上传策略:');
  console.log(JSON.stringify(putPolicy, null, 2));
  
  // 步骤 2: 序列化为 JSON
  const putPolicyJSON = JSON.stringify(putPolicy);
  console.log('\n2️⃣ JSON 字符串:');
  console.log(putPolicyJSON);
  console.log('长度:', putPolicyJSON.length);
  
  // 步骤 3: Base64 编码
  const encodedPutPolicy = urlSafeBase64Encode(putPolicyJSON);
  console.log('\n3️⃣ Base64 编码后:');
  console.log(encodedPutPolicy);
  console.log('长度:', encodedPutPolicy.length);
  
  // 步骤 4: HMAC-SHA1 签名
  const sign = crypto
    .createHmac('sha1', SECRET_KEY)
    .update(encodedPutPolicy)
    .digest();
  console.log('\n4️⃣ HMAC-SHA1 签名:');
  console.log('Buffer:', sign);
  console.log('Hex:', sign.toString('hex'));
  console.log('长度:', sign.length, 'bytes');
  
  // 步骤 5: 签名 Base64 编码
  const encodedSign = urlSafeBase64Encode(sign);
  console.log('\n5️⃣ 签名 Base64 编码:');
  console.log(encodedSign);
  console.log('长度:', encodedSign.length);
  
  // 步骤 6: 拼接 Token
  const uploadToken = `${ACCESS_KEY}:${encodedSign}:${encodedPutPolicy}`;
  console.log('\n6️⃣ 最终 Token:');
  console.log('AccessKey 长度:', ACCESS_KEY.length);
  console.log('完整 Token:');
  console.log(uploadToken);
  console.log('总长度:', uploadToken.length);
  
  return uploadToken;
}

// 测试不同场景
console.log('=' .repeat(60));
console.log('测试场景 1: 不指定文件名（覆盖模式）');
console.log('=' .repeat(60));
const token1 = generateToken();

console.log('\n\n');
console.log('=' .repeat(60));
console.log('测试场景 2: 指定文件名');
console.log('=' .repeat(60));
const token2 = generateToken('test.png');

console.log('\n\n');
console.log('✅ 测试完成！');
console.log('\n💡 请使用以下 Token 进行上传测试:');
console.log(token2);
