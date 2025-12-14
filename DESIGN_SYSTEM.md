# Pet Magic - UI 设计系统

## 🎨 配色方案

### 主色调
```css
/* 活力橙色 - 代表能量、创造力、温暖 */
--primary-50:  #fff7ed
--primary-100: #ffedd5
--primary-200: #fed7aa
--primary-300: #fdba74
--primary-400: #fb923c
--primary-500: #f97316  /* 主要使用 */
--primary-600: #ea580c  /* 深色变体 */
--primary-700: #c2410c

/* 清新青色 - 代表信任、专业、可靠 */
--secondary-50:  #f0fdfa
--secondary-100: #ccfbf1
--secondary-200: #99f6e4
--secondary-300: #5eead4
--secondary-400: #2dd4bf
--secondary-500: #14b8a6  /* 主要使用 */
--secondary-600: #0d9488  /* 深色变体 */
--secondary-700: #0f766e
```

### 渐变组合
```css
/* Hero 背景 */
bg-gradient-to-br from-orange-50 via-white to-teal-50

/* CTA 按钮 */
bg-gradient-to-r from-orange-500 to-orange-600

/* 文字渐变 */
bg-gradient-to-r from-orange-600 to-teal-600

/* 完整 CTA 区域 */
bg-gradient-to-br from-orange-500 via-orange-600 to-teal-500
```

## 📝 字体系统

### 字体家族
```css
/* 展示字体 - 用于大标题和品牌 */
font-display: 'Poppins', sans-serif
权重: 400, 500, 600, 700, 800, 900

/* 标题字体 - 用于副标题和卡片标题 */
font-heading: 'Nunito', sans-serif
权重: 400, 600, 700, 800

/* 正文字体 - 系统默认 */
-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto
```

### 字体大小层级
```css
/* 超大标题 (Hero) */
text-5xl md:text-6xl lg:text-7xl
(3rem → 3.75rem → 4.5rem)

/* 大标题 (Section) */
text-4xl md:text-5xl
(2.25rem → 3rem)

/* 中标题 (Card) */
text-xl md:text-2xl
(1.25rem → 1.5rem)

/* 正文 */
text-base md:text-lg
(1rem → 1.125rem)
```

## 🔲 圆角系统

```css
/* 小圆角 */
rounded-lg: 0.5rem (8px)

/* 中圆角 */
rounded-xl: 0.75rem (12px)

/* 大圆角 - 主要使用 */
rounded-2xl: 1rem (16px)
rounded-3xl: 1.5rem (24px)

/* 完全圆形 */
rounded-full: 9999px
```

### 使用场景
- **卡片**: `rounded-3xl`
- **按钮**: `rounded-2xl` 或 `rounded-full`
- **图片**: `rounded-3xl`
- **徽章/标签**: `rounded-full`
- **输入框**: `rounded-2xl`

## 🌟 阴影系统

```css
/* 基础阴影 - 静止卡片 */
shadow-lg
box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1)

/* 中等阴影 - 悬停状态 */
shadow-xl
box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1)

/* 强阴影 - 特别强调 */
shadow-2xl
box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25)
```

## ✨ 动画效果

### 预定义动画
```css
/* 柔和弹跳 - 装饰性图标 */
.animate-bounce-gentle {
  animation: bounce-gentle 2s ease-in-out infinite;
}

/* 淡入上移 - 内容加载 */
.animate-fade-up {
  animation: fade-up 0.6s ease-out forwards;
}

/* 缩放进入 - 模态框 */
.animate-scale-in {
  animation: scale-in 0.4s ease-out forwards;
}
```

### 交互动画模式
```css
/* 卡片悬停 */
.card-hover {
  @apply transition-all duration-300 ease-out;
}
.card-hover:hover {
  @apply -translate-y-2 shadow-2xl;
}

/* 按钮悬停 */
transform hover:scale-105 transition-all duration-200

/* 下划线动画 */
<span class="absolute bottom-0 left-0 w-0 h-0.5 
  bg-gradient-to-r from-orange-500 to-teal-500 
  group-hover:w-full transition-all duration-300">
</span>
```

## 📐 间距系统

### 垂直间距
```css
/* Section 间距 */
py-20: 5rem (80px)
py-24: 6rem (96px)

/* 卡片内边距 */
py-6 px-8: 1.5rem 2rem
py-8 px-10: 2rem 2.5rem

/* 按钮内边距 */
py-3 px-6: 0.75rem 1.5rem (小)
py-4 px-8: 1rem 2rem (中)
py-6 px-10: 1.5rem 2.5rem (大)
```

### 网格间距
```css
/* 卡片网格 */
gap-6: 1.5rem (移动端)
gap-8: 2rem (桌面端)

/* 元素间距 */
space-y-4: 1rem
space-y-6: 1.5rem
space-x-4: 1rem
```

## 🎯 组件模式

### 英雄区块 (Hero)
```tsx
<section className="relative py-24 md:py-32 px-4 overflow-hidden">
  {/* 背景装饰 */}
  <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-white to-teal-50 -z-10"></div>
  
  {/* 光晕装饰 */}
  <div className="absolute top-20 right-10 w-72 h-72 bg-orange-200/30 rounded-full blur-3xl -z-10"></div>
  
  {/* 内容 */}
  <div className="container mx-auto text-center max-w-5xl">
    <h1 className="font-display text-5xl md:text-7xl font-extrabold">
      <span className="text-gradient">标题文字</span>
    </h1>
  </div>
</section>
```

### 特性卡片 (Feature Card)
```tsx
<Card className="relative border-0 bg-white rounded-3xl shadow-lg 
  hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 
  overflow-hidden group">
  
  {/* 顶部装饰条 */}
  <div className="absolute top-0 left-0 right-0 h-2 
    bg-gradient-to-r from-orange-500 to-orange-600"></div>
  
  {/* 图标 */}
  <div className="text-7xl transform group-hover:scale-110 
    transition-transform duration-300">
    🎨
  </div>
  
  {/* 底部装饰条 */}
  <div className="absolute bottom-0 left-0 right-0 h-1 
    bg-gradient-to-r from-orange-500 to-teal-500 
    transform scale-x-0 group-hover:scale-x-100 
    transition-transform duration-300"></div>
</Card>
```

### 渐变按钮 (CTA Button)
```tsx
<Button className="text-lg px-10 py-7 rounded-2xl font-bold 
  bg-gradient-to-r from-orange-500 to-orange-600 
  hover:from-orange-600 hover:to-orange-700 
  shadow-xl hover:shadow-2xl 
  transform hover:scale-105 transition-all duration-200">
  开始使用 ✨
</Button>
```

### 玻璃态标签 (Glass Badge)
```tsx
<div className="flex items-center gap-2 
  bg-white/80 backdrop-blur-sm 
  px-4 py-2 rounded-full shadow-md">
  <span className="text-2xl">✓</span>
  <span className="font-medium">特性描述</span>
</div>
```

### 图片画廊卡片 (Gallery Card)
```tsx
<div className="group relative aspect-square rounded-3xl 
  overflow-hidden shadow-xl hover:shadow-2xl 
  transition-all duration-300 hover:-translate-y-2 cursor-pointer">
  
  <Image 
    src="..."
    className="object-cover group-hover:scale-110 
      transition-transform duration-500"
  />
  
  {/* 渐变遮罩 */}
  <div className="absolute inset-0 
    bg-gradient-to-t from-black/70 via-black/20 to-transparent 
    opacity-60 group-hover:opacity-80 transition-opacity"></div>
  
  {/* 标题 */}
  <div className="absolute bottom-0 p-6 
    transform translate-y-2 group-hover:translate-y-0 
    transition-transform">
    <p className="text-white font-heading text-2xl font-bold">标题</p>
  </div>
</div>
```

## 🎪 表情符号使用

### 品牌标识
- 🐾 主 Logo
- ✨ 魔法/特效
- 🎨 创意/艺术
- 🎬 视频/动画

### 功能图标
- ⏰ 时间/速度
- 💎 品质/高端
- 🔒 安全/隐私
- ⚡ 快速/效率

### 情感表达
- 😊 友好/欢迎
- 🎉 庆祝/成功
- 💖 喜爱/推荐
- 🌟 优秀/精选

## 📱 响应式断点

```css
/* 移动端 (默认) */
< 768px: 单列，小字体，紧凑间距

/* 平板 (md:) */
≥ 768px: 2列，中等字体，适中间距

/* 桌面 (lg:) */
≥ 1024px: 3-4列，大字体，宽松间距

/* 大屏 (xl:) */
≥ 1280px: 保持布局，增加最大宽度限制
```

## 🚀 性能优化

### CSS 优化
```css
/* ✅ 推荐 - 使用 transform */
transform: translateY(-8px);
transform: scale(1.05);

/* ❌ 避免 - 使用 position */
top: -8px; /* 会触发重排 */
```

### 动画优化
```css
/* 使用 will-change 提示浏览器 */
.card-hover {
  will-change: transform;
}

/* 使用 GPU 加速 */
transform: translateZ(0);
```

---

这个设计系统确保了 Pet Magic 在视觉上的一致性和品牌辨识度。
