/**
 * 查询 RunComfy API 可用的模型列表
 * 用于找到支持视频生成的模型
 */

async function listAvailableModels() {
  try {
    console.log('=== 查询 RunComfy 可用模型 ===\n');
    
    // 加载环境变量
    const dotenv = await import('dotenv');
    dotenv.config({ path: '.env.local' });
    
    const API_TOKEN = process.env.RUNCOMFY_API_TOKEN;
    const API_BASE_URL = process.env.RUNCOMFY_API_URL || 'https://model-api.runcomfy.net';
    
    if (!API_TOKEN) {
      console.error('❌ 错误: 未找到 RUNCOMFY_API_TOKEN');
      process.exit(1);
    }
    
    console.log('API Base URL:', API_BASE_URL);
    console.log('API Token:', API_TOKEN.substring(0, 10) + '...\n');
    
    // 尝试获取模型列表
    console.log('正在查询模型列表...\n');
    
    const response = await fetch(`${API_BASE_URL}/v1/models`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${API_TOKEN}`,
        'Content-Type': 'application/json',
      },
    });
    
    console.log('响应状态:', response.status, response.statusText);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ API 错误:', errorText);
      
      console.log('\n提示: 如果此端点不可用，请查看 RunComfy 文档或联系支持团队。');
      console.log('文档链接: https://docs.runcomfy.com/model-apis/');
      process.exit(1);
    }
    
    const data = await response.json();
    console.log('\n✅ 成功获取模型列表\n');
    
    // 解析并显示模型信息
    if (Array.isArray(data)) {
      console.log(`找到 ${data.length} 个可用模型:\n`);
      
      // 分类显示
      const videoModels: string[] = [];
      const imageModels: string[] = [];
      const otherModels: string[] = [];
      
      data.forEach((model: any) => {
        const modelInfo = typeof model === 'string' ? model : model.id || model.name || JSON.stringify(model);
        const lowerInfo = modelInfo.toLowerCase();
        
        if (lowerInfo.includes('video') || lowerInfo.includes('animate') || lowerInfo.includes('motion')) {
          videoModels.push(modelInfo);
        } else if (lowerInfo.includes('image') || lowerInfo.includes('flux') || lowerInfo.includes('stable-diffusion')) {
          imageModels.push(modelInfo);
        } else {
          otherModels.push(modelInfo);
        }
      });
      
      if (videoModels.length > 0) {
        console.log('🎬 可能的视频生成模型:');
        videoModels.forEach(model => console.log(`  - ${model}`));
        console.log('');
      }
      
      if (imageModels.length > 0) {
        console.log('🖼️  图片生成/编辑模型:');
        imageModels.forEach(model => console.log(`  - ${model}`));
        console.log('');
      }
      
      if (otherModels.length > 0) {
        console.log('📦 其他模型:');
        otherModels.forEach(model => console.log(`  - ${model}`));
        console.log('');
      }
      
      // 推荐
      if (videoModels.length > 0) {
        console.log('\n💡 推荐：');
        console.log('将以下模型 ID 复制到 /lib/api/runcomfy.ts 的 VIDEO_MODEL_ID:');
        console.log(`const VIDEO_MODEL_ID = '${videoModels[0]}';`);
      } else {
        console.log('\n⚠️  警告: 未找到明确标注为视频生成的模型');
        console.log('建议查看 RunComfy 文档或联系支持团队');
      }
      
    } else if (typeof data === 'object') {
      console.log('模型数据 (JSON):');
      console.log(JSON.stringify(data, null, 2));
    } else {
      console.log('返回的数据:', data);
    }
    
  } catch (error) {
    console.error('\n❌ 错误:', error);
    console.log('\n可能的原因:');
    console.log('1. API endpoint 不存在或格式不正确');
    console.log('2. API Token 无效或已过期');
    console.log('3. 网络连接问题');
    console.log('\n建议操作:');
    console.log('1. 检查 RunComfy 文档: https://docs.runcomfy.com/');
    console.log('2. 联系 RunComfy 支持团队');
    console.log('3. 查看 RunComfy 控制台的模型列表');
    process.exit(1);
  }
}

// 运行查询
listAvailableModels();
