#!/usr/bin/env tsx
/**
 * 使用七牛云官方 SDK 生成 Token 进行对比
 */

import * as dotenv from 'dotenv';
import * as path from 'path';

// 加载环境变量
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const qiniu = require('qiniu');

const ACCESS_KEY = process.env.QINIU_ACCESS_KEY!;
const SECRET_KEY = process.env.QINIU_SECRET_KEY!;
const BUCKET = 'pet-ai';

console.log('使用官方 SDK 生成 Token:\n');

const mac = new qiniu.auth.digest.Mac(ACCESS_KEY, SECRET_KEY);
const options = {
  scope: `${BUCKET}:test.png`,
  expires: 3600
};

const putPolicy = new qiniu.rs.PutPolicy(options);
const uploadToken = putPolicy.uploadToken(mac);

console.log('Token:', uploadToken);
console.log('长度:', uploadToken.length);
