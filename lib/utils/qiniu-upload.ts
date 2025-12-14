/**
 * 七牛云对象存储上传工具
 * 文档：https://developer.qiniu.com/kodo/3939/overview-of-the-api
 * 使用 HTTP API 直接上传
 */

import crypto from 'crypto';

// 动态获取环境变量（确保在运行时获取）
const getEnv = () => ({
  ACCESS_KEY: process.env.QINIU_ACCESS_KEY || '',
  SECRET_KEY: process.env.QINIU_SECRET_KEY || '',
  BUCKET: process.env.QINIU_BUCKET || '',
  DOMAIN: process.env.QINIU_DOMAIN || '',
  REGION: process.env.QINIU_REGION || 'z2',
});

// 区域对应的上传域名
const UPLOAD_DOMAINS: Record<string, string> = {
  z0: 'https://upload.qiniup.com', // 华东-浙江
  z1: 'https://upload-z1.qiniup.com', // 华北-河北
  z2: 'https://upload-z2.qiniup.com', // 华南-广东
  na0: 'https://upload-na0.qiniup.com', // 北美
  as0: 'https://upload-as0.qiniup.com', // 东南亚
};

/**
 * 生成七牛云上传 Token
 * 参考：https://developer.qiniu.com/kodo/1208/upload-token
 * 
 * @param fileName - 文件名（可选，不指定则使用七牛云生成的随机名）
 * @returns 上传凭证
 */
export function generateUploadToken(fileName?: string): string {
  const { ACCESS_KEY, SECRET_KEY, BUCKET, DOMAIN, REGION } = getEnv();
  
  console.log('Qiniu config:', {
    hasAccessKey: !!ACCESS_KEY,
    hasSecretKey: !!SECRET_KEY,
    accessKeyLength: ACCESS_KEY?.length,
    secretKeyLength: SECRET_KEY?.length,
    accessKeyPreview: ACCESS_KEY?.substring(0, 10),
    secretKeyPreview: SECRET_KEY?.substring(0, 10),
    bucket: BUCKET,
    domain: DOMAIN,
    region: REGION
  });
  
  if (!ACCESS_KEY || !SECRET_KEY || !BUCKET) {
    throw new Error(`Qiniu credentials not configured: AK=${!!ACCESS_KEY}, SK=${!!SECRET_KEY}, Bucket=${BUCKET}`);
  }

  // 步骤 1: 构造上传策略
  const putPolicy = {
    scope: fileName ? `${BUCKET}:${fileName}` : BUCKET,
    deadline: Math.floor(Date.now() / 1000) + 3600, // 1小时有效期（秒）
  };

  // 步骤 2: 将上传策略序列化为 JSON
  const putPolicyJSON = JSON.stringify(putPolicy);
  console.log('Put policy JSON:', putPolicyJSON);

  // 步骤 3: 对 JSON 进行标准 Base64 编码（用于签名）
  const encodedPutPolicy = Buffer.from(putPolicyJSON, 'utf-8').toString('base64');
  console.log('Encoded policy:', encodedPutPolicy);

  // 步骤 4: 用 SecretKey 对标准 Base64 编码的策略进行 HMAC-SHA1 签名
  const sign = crypto
    .createHmac('sha1', SECRET_KEY)
    .update(encodedPutPolicy)
    .digest('base64');
  console.log('Signature:', sign);

  // 步骤 5: 拼接 AccessKey、签名、编码后的上传策略
  const uploadToken = `${ACCESS_KEY}:${sign}:${encodedPutPolicy}`;
  console.log('Upload token:', uploadToken);
  console.log('Token length:', uploadToken.length);

  return uploadToken;
}

/**
 * URL 安全的 Base64 编码
 */
function urlSafeBase64Encode(data: string | Buffer): string {
  const buffer = typeof data === 'string' ? Buffer.from(data, 'utf-8') : data;
  return buffer
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
}

/**
 * 上传文件到七牛云（使用官方 SDK）
 * 
 * @param file - 文件对象
 * @param fileName - 自定义文件名（可选）
 * @returns 上传后的 URL
 */
export async function uploadToQiniu(
  file: File | Blob,
  fileName?: string
): Promise<string> {
  return new Promise(async (resolve, reject) => {
    try {
      const { DOMAIN, REGION } = getEnv();
      
      // 生成唯一文件名（如果未指定）
      const finalFileName =
        fileName ||
        `uploads/${Date.now()}-${Math.random().toString(36).substring(2, 15)}.${getFileExtension(
          file
        )}`;

      console.log('Upload file name:', finalFileName);

      // 生成上传凭证
      const uploadToken = generateUploadToken(finalFileName);
      console.log('Upload token generated for file:', finalFileName);

      // 将 File/Blob 转换为 Buffer
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      // 使用 HTTP API 上传
      const uploadUrl = UPLOAD_DOMAINS[REGION as keyof typeof UPLOAD_DOMAINS];
      console.log('Uploading to:', uploadUrl);

      // 构造表单数据
      const formData = new FormData();
      formData.append('token', uploadToken);
      formData.append('key', finalFileName);
      formData.append('file', new Blob([buffer]));

      console.log('FormData prepared with key:', finalFileName);

      // 发送上传请求
      const response = await fetch(uploadUrl, {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (response.ok && result.key) {
        const fileUrl = `https://${DOMAIN}/${result.key}`;
        console.log('Qiniu upload success:', fileUrl);
        resolve(fileUrl);
      } else {
        console.error('Qiniu upload failed:', response.status, result);
        reject(new Error(`Upload failed with status ${response.status}: ${JSON.stringify(result)}`));
      }
    } catch (error) {
      console.error('Upload preparation error:', error);
      reject(error);
    }
  });
}

/**
 * 获取文件扩展名
 */
function getFileExtension(file: File | Blob): string {
  if (file instanceof File && file.name) {
    const parts = file.name.split('.');
    return parts.length > 1 ? parts[parts.length - 1] : 'jpg';
  }

  // 根据 MIME 类型推断扩展名
  const mimeType = file.type || 'image/jpeg';
  const mimeMap: Record<string, string> = {
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/gif': 'gif',
    'image/webp': 'webp',
  };

  return mimeMap[mimeType] || 'jpg';
}

/**
 * 删除七牛云文件（使用 HTTP API）
 * 参考：https://developer.qiniu.com/kodo/1257/delete
 * 
 * @param fileName - 文件名
 */
export async function deleteFromQiniu(fileName: string): Promise<void> {
  const { ACCESS_KEY, SECRET_KEY, BUCKET, REGION } = getEnv();
  
  if (!ACCESS_KEY || !SECRET_KEY || !BUCKET || !REGION) {
    throw new Error('Qiniu credentials not configured');
  }

  // 构造删除操作
  const entry = urlSafeBase64Encode(`${BUCKET}:${fileName}`);
  const path = `/delete/${entry}`;
  
  // 构造管理凭证
  const managementToken = generateManagementToken(path);
  
  // 获取 API 域名（使用对应区域的 API 域名）
  const apiDomain = 'https://rs-z2.qiniuapi.com'; // 华南区域
  
  const response = await fetch(`${apiDomain}${path}`, {
    method: 'POST',
    headers: {
      'Authorization': `QBox ${managementToken}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });

  if (response.ok) {
    console.log('Qiniu delete success');
  } else {
    const result = await response.text();
    console.error('Qiniu delete failed:', response.status, result);
    throw new Error(`Delete failed with status ${response.status}: ${result}`);
  }
}

/**
 * 生成管理凭证
 * 参考：https://developer.qiniu.com/kodo/1201/access-token
 */
function generateManagementToken(path: string): string {
  const { ACCESS_KEY, SECRET_KEY } = getEnv();
  const signingStr = `${path}\n`;
  const sign = crypto
    .createHmac('sha1', SECRET_KEY)
    .update(signingStr)
    .digest();
  const encodedSign = urlSafeBase64Encode(sign);
  return `${ACCESS_KEY}:${encodedSign}`;
}
