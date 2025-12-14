#!/usr/bin/env tsx
/**
 * 对比官方 SDK 和我们的实现
 */

import * as dotenv from 'dotenv';
import * as path from 'path';
import crypto from 'crypto';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const qiniu = require('qiniu');

const ACCESS_KEY = process.env.QINIU_ACCESS_KEY!;
const SECRET_KEY = process.env.QINIU_SECRET_KEY!;
const BUCKET = 'pet-ai';

console.log('=' .repeat(60));
console.log('对比测试: 官方 SDK vs 我们的实现');
console.log('=' .repeat(60));

// 使用相同的 deadline
const deadline = Math.floor(Date.now() / 1000) + 3600;

console.log('\n固定 deadline:', deadline);

// 官方 SDK
console.log('\n📦 官方 SDK:');
const mac = new qiniu.auth.digest.Mac(ACCESS_KEY, SECRET_KEY);
const options = {
  scope: `${BUCKET}:test.png`,
  deadline: deadline
};
const putPolicy = new qiniu.rs.PutPolicy(options);
const officialToken = putPolicy.uploadToken(mac);
console.log('Token:', officialToken);

// 我们的实现
console.log('\n🔧 我们的实现:');
const ourPolicy = {
  scope: `${BUCKET}:test.png`,
  deadline: deadline
};
const policyJSON = JSON.stringify(ourPolicy);
console.log('Policy JSON:', policyJSON);

// 使用标准 Base64 编码（不是 URL safe）
const encodedPolicy = Buffer.from(policyJSON, 'utf-8').toString('base64');
console.log('Encoded policy:', encodedPolicy);

// 对标准 Base64 编码的 policy 进行签名
const sign = crypto
  .createHmac('sha1', SECRET_KEY)
  .update(encodedPolicy)
  .digest('base64');
console.log('Sign:', sign);

const ourToken = `${ACCESS_KEY}:${sign}:${encodedPolicy}`;
console.log('Token:', ourToken);

console.log('\n对比:');
console.log('官方 Token 长度:', officialToken.length);
console.log('我们 Token 长度:', ourToken.length);
console.log('相同?', officialToken === ourToken);

// 分解官方 Token
const [ak, sign_official, policy_official] = officialToken.split(':');
console.log('\n官方 Token 分解:');
console.log('AK:', ak);
console.log('Sign:', sign_official);
console.log('Policy:', policy_official);

console.log('\n我们 Token 分解:');
console.log('AK:', ACCESS_KEY);
console.log('Sign:', sign);
console.log('Policy:', encodedPolicy);

// 解码 policy 对比
console.log('\n解码 Policy 对比:');
const decodedOfficialPolicy = Buffer.from(
  policy_official.replace(/-/g, '+').replace(/_/g, '/'),
  'base64'
).toString('utf-8');
console.log('官方:', decodedOfficialPolicy);

const decodedOurPolicy = Buffer.from(
  encodedPolicy.replace(/-/g, '+').replace(/_/g, '/'),
  'base64'
).toString('utf-8');
console.log('我们:', decodedOurPolicy);
