/**
 * 阿里云 OSS 对象存储上传工具
 * 文档：https://help.aliyun.com/zh/oss/user-guide/multipart-upload
 */

import OSS from 'ali-oss';

// 动态获取环境变量
const getEnv = () => ({
  REGION: process.env.OSS_REGION || '',
  ACCESS_KEY_ID: process.env.OSS_ACCESS_KEY_ID || '',
  ACCESS_KEY_SECRET: process.env.OSS_ACCESS_KEY_SECRET || '',
  BUCKET: process.env.OSS_BUCKET || '',
  ENDPOINT: process.env.OSS_ENDPOINT || '',
});

/**
 * 创建 OSS 客户端
 */
function createOSSClient() {
  const { REGION, ACCESS_KEY_ID, ACCESS_KEY_SECRET, BUCKET, ENDPOINT } = getEnv();

  console.log('OSS config:', {
    hasAccessKeyId: !!ACCESS_KEY_ID,
    hasAccessKeySecret: !!ACCESS_KEY_SECRET,
    accessKeyIdLength: ACCESS_KEY_ID?.length,
    accessKeySecretLength: ACCESS_KEY_SECRET?.length,
    accessKeyIdPreview: ACCESS_KEY_ID?.substring(0, 10),
    region: REGION,
    bucket: BUCKET,
    endpoint: ENDPOINT,
  });

  if (!ACCESS_KEY_ID || !ACCESS_KEY_SECRET || !BUCKET || !REGION) {
    throw new Error(
      `OSS credentials not configured: AccessKeyId=${!!ACCESS_KEY_ID}, AccessKeySecret=${!!ACCESS_KEY_SECRET}, Bucket=${BUCKET}, Region=${REGION}`
    );
  }

  return new OSS({
    region: REGION,
    accessKeyId: ACCESS_KEY_ID,
    accessKeySecret: ACCESS_KEY_SECRET,
    bucket: BUCKET,
    endpoint: ENDPOINT,
  });
}

/**
 * 上传文件到阿里云 OSS
 * 
 * @param file - 文件对象
 * @param fileName - 自定义文件名（可选）
 * @returns 上传后的签名 URL（有效期 7 天）
 */
export async function uploadToOSS(
  file: File | Blob,
  fileName?: string
): Promise<string> {
  try {
    const client = createOSSClient();

    // 生成唯一文件名（如果未指定）
    const finalFileName =
      fileName ||
      `uploads/${Date.now()}-${Math.random().toString(36).substring(2, 15)}.${getFileExtension(
        file
      )}`;

    console.log('Upload file name:', finalFileName);

    // 将 File/Blob 转换为 Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // 上传文件到 OSS
    const result = await client.put(finalFileName, buffer);

    if (result.res.status === 200) {
      // 生成带签名的 URL，有效期 7 天（604800 秒）
      const signedUrl = client.signatureUrl(finalFileName, {
        expires: 604800, // 7 天
      });
      // 确保使用 HTTPS
      const httpsUrl = signedUrl.replace(/^http:/, 'https:');
      console.log('OSS upload success, generated signed URL');
      return httpsUrl;
    } else {
      console.error('OSS upload failed:', result.res.status);
      throw new Error(`Upload failed with status ${result.res.status}`);
    }
  } catch (error) {
    console.error('OSS upload error:', error);
    throw error;
  }
}

/**
 * 分片上传大文件到阿里云 OSS
 * 适用于大于 100MB 的文件
 * 
 * @param file - 文件对象
 * @param fileName - 自定义文件名（可选）
 * @returns 上传后的签名 URL（有效期 7 天）
 */
export async function multipartUploadToOSS(
  file: File | Blob,
  fileName?: string
): Promise<string> {
  try {
    const client = createOSSClient();

    // 生成唯一文件名（如果未指定）
    const finalFileName =
      fileName ||
      `uploads/${Date.now()}-${Math.random().toString(36).substring(2, 15)}.${getFileExtension(
        file
      )}`;

    console.log('Multipart upload file name:', finalFileName);

    // 将 File/Blob 转换为 Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // 分片上传配置
    const options = {
      // 并行上传的分片数
      parallel: 4,
      // 分片大小，默认 1MB
      partSize: 1024 * 1024,
      // 上传进度回调
      progress: (p: number, _checkpoint: any) => {
        console.log(`Upload progress: ${Math.round(p * 100)}%`);
      },
    };

    // 执行分片上传
    const result = await client.multipartUpload(finalFileName, buffer, options);

    if (result.res.status === 200) {
      // 生成带签名的 URL，有效期 7 天（604800 秒）
      const signedUrl = client.signatureUrl(finalFileName, {
        expires: 604800, // 7 天
      });
      // 确保使用 HTTPS
      const httpsUrl = signedUrl.replace(/^http:/, 'https:');
      console.log('OSS multipart upload success, generated signed URL');
      return httpsUrl;
    } else {
      console.error('OSS multipart upload failed:', result.res.status);
      throw new Error(`Multipart upload failed with status ${result.res.status}`);
    }
  } catch (error) {
    console.error('OSS multipart upload error:', error);
    throw error;
  }
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
 * 删除 OSS 文件
 * 
 * @param fileName - 文件名
 */
export async function deleteFromOSS(fileName: string): Promise<void> {
  try {
    const client = createOSSClient();

    const result = await client.delete(fileName);

    if (result.res.status === 204 || result.res.status === 200) {
      console.log('OSS delete success');
    } else {
      console.error('OSS delete failed:', result.res.status);
      throw new Error(`Delete failed with status ${result.res.status}`);
    }
  } catch (error) {
    console.error('OSS delete error:', error);
    throw error;
  }
}
