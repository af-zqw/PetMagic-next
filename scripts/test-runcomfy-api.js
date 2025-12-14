#!/usr/bin/env node

/**
 * RunComfy API 测试脚本
 *
 * 使用方法:
 * node scripts/test-runcomfy-api.js
 *
 * 这个脚本会测试 RunComfy API 的基本功能
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

// 从环境变量读取配置
require('dotenv').config({ path: '.env.local' });

const API_TOKEN = process.env.RUNCOMFY_API_TOKEN;
const API_BASE_URL = process.env.RUNCOMFY_API_URL || 'https://api.runcomfy.com';

if (!API_TOKEN) {
  console.error('❌ RUNCOMFY_API_TOKEN 未设置');
  console.log('请在 .env.local 文件中设置 RUNCOMFY_API_TOKEN');
  process.exit(1);
}

console.log('🧪 RunComfy API 测试');
console.log('='.repeat(50));
console.log('API URL:', API_BASE_URL);
console.log('Token:', API_TOKEN.substring(0, 10) + '...');
console.log('='.repeat(50));
console.log('');

/**
 * 测试 API 连接
 */
async function testConnection() {
  console.log('📡 测试 1: API 连接');

  try {
    // 尝试一个简单的 API 调用 (例如获取账户信息)
    const response = await fetch(`${API_BASE_URL}/v1/account`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${API_TOKEN}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      console.log('✅ API 连接成功');
      console.log('账户信息:', data);
      return true;
    } else {
      console.log(`⚠️  API 返回状态码: ${response.status}`);
      const text = await response.text();
      console.log('响应:', text);

      if (response.status === 401) {
        console.log('❌ 认证失败 - 请检查 API token');
      } else if (response.status === 404) {
        console.log('⚠️  端点不存在 - 可能需要调整 API URL');
      }
      return false;
    }
  } catch (error) {
    console.log('❌ 连接失败:', error.message);
    console.log('');
    console.log('可能的原因:');
    console.log('1. API URL 不正确');
    console.log('2. 网络连接问题');
    console.log('3. API 服务暂时不可用');
    return false;
  }
}

/**
 * 测试不同的 API 端点
 */
async function testEndpoints() {
  console.log('');
  console.log('📡 测试 2: API 端点探测');

  const endpoints = [
    { method: 'GET', path: '/v1/account', desc: '账户信息' },
    { method: 'GET', path: '/v1/models', desc: '可用模型列表' },
    { method: 'GET', path: '/v1/workflows', desc: '工作流列表' },
    { method: 'GET', path: '/account', desc: '账户信息 (备选)' },
    { method: 'GET', path: '/models', desc: '模型列表 (备选)' },
  ];

  const results = [];

  for (const endpoint of endpoints) {
    try {
      console.log(`\n测试: ${endpoint.method} ${endpoint.path} (${endpoint.desc})`);

      const response = await fetch(`${API_BASE_URL}${endpoint.path}`, {
        method: endpoint.method,
        headers: {
          'Authorization': `Bearer ${API_TOKEN}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log(`✅ 成功 (${response.status})`);
        console.log('响应示例:', JSON.stringify(data).substring(0, 200));
        results.push({ ...endpoint, status: 'success', code: response.status });
      } else {
        console.log(`⚠️  失败 (${response.status})`);
        results.push({ ...endpoint, status: 'failed', code: response.status });
      }
    } catch (error) {
      console.log(`❌ 错误: ${error.message}`);
      results.push({ ...endpoint, status: 'error', error: error.message });
    }

    // 等待一下避免请求过快
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  console.log('');
  console.log('📊 端点测试结果汇总:');
  console.table(results);

  return results;
}

/**
 * 主函数
 */
async function main() {
  console.log('开始测试...\n');

  // 测试 1: 基本连接
  const connected = await testConnection();

  if (!connected) {
    console.log('');
    console.log('💡 建议:');
    console.log('1. 访问 RunComfy 文档查看正确的 API 端点');
    console.log('2. 检查 API token 是否有效');
    console.log('3. 确认 API URL 是否正确');
    console.log('');
    console.log('文档: https://docs.runcomfy.com/model-apis/quickstart');
  }

  // 测试 2: 探测可用端点
  await testEndpoints();

  console.log('');
  console.log('='.repeat(50));
  console.log('✅ 测试完成');
  console.log('='.repeat(50));
  console.log('');
  console.log('下一步:');
  console.log('1. 查看上面的测试结果');
  console.log('2. 根据成功的端点更新 lib/api/runcomfy.ts');
  console.log('3. 查阅 RUNCOMFY_API_SETUP.md 了解详细配置');
}

main().catch(console.error);
