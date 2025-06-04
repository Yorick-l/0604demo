# 返佣后台管理系统

一个基于 Next.js 14 构建的现代化返佣后台管理系统，支持用户邀请、交易返佣、数据统计和报表导出等核心功能。

## ✨ 功能特性

### 🔐 用户认证系统
- **智能登录页面**：支持用户名/邮箱搜索选择账户
- **用户注册**：支持邀请码注册，实时验证邀请码有效性
- **自动跳转**：登录状态自动检测和页面跳转

### 💰 返佣系统核心功能
- **20% 返佣比例**：一级邀请用户交易手续费返佣
- **实时结算**：交易完成即时计算返佣收益
- **邀请管理**：生成个人邀请码和邀请链接
- **收益统计**：全面的数据统计和可视化展示

### 📊 数据管理
- **交易历史**：完整的个人交易记录
- **返佣记录**：详细的收益来源和金额
- **邀请历史**：被邀请用户的完整信息
- **数据导出**：一键导出 CSV 格式统计报表

### 🎯 用户体验
- **响应式设计**：完美适配桌面端和移动端
- **现代化 UI**：基于 Tailwind CSS 的美观界面
- **交互反馈**：完善的加载状态和用户提示
- **数据可视化**：直观的统计卡片和图表展示

## 🛠 技术选型

### 前端框架
- **Next.js 14**: React 全栈框架，支持服务端渲染
- **TypeScript**: 类型安全的 JavaScript 超集
- **React 18**: 最新的 React 版本

### UI 和样式
- **Tailwind CSS**: 原子化 CSS 框架
- **Headless UI**: 无样式可访问性组件库
- **Heroicons**: SVG 图标库

### 状态管理
- **React Hooks**: useState、useEffect 等内置钩子
- **localStorage**: 客户端数据持久化

### 数据处理
- **Mock Data**: 模拟真实业务数据
- **CSV Export**: 客户端 CSV 文件生成和下载

## 📁 项目结构

```
my-next-app/
├── src/
│   ├── app/                    # Next.js 13+ App Router
│   │   ├── page.tsx           # 首页 - 自动跳转逻辑
│   │   ├── login/
│   │   │   └── page.tsx       # 登录页面
│   │   ├── register/
│   │   │   └── page.tsx       # 注册页面
│   │   ├── dashboard/
│   │   │   └── page.tsx       # 仪表板主页面
│   │   ├── globals.css        # 全局样式
│   │   └── layout.tsx         # 根布局组件
│   ├── components/            # 可复用组件
│   │   ├── StatsCard.tsx      # 统计卡片组件
│   │   ├── InviteSection.tsx  # 邀请功能组件
│   │   ├── InvitedUsersList.tsx # 被邀请用户列表
│   │   ├── HistorySection.tsx # 历史记录组件
│   │   └── UserSelector.tsx   # 用户选择器组件
│   └── lib/                   # 工具库和数据层
│       ├── mockData.ts        # 模拟数据定义
│       └── dataService.ts     # 数据服务层
├── public/                    # 静态资源
├── tailwind.config.js        # Tailwind CSS 配置
├── tsconfig.json             # TypeScript 配置
├── next.config.js            # Next.js 配置
└── package.json              # 项目依赖
```

### 核心文件说明

#### 📄 数据层 (`src/lib/`)
- **`mockData.ts`**: 定义用户、交易、邀请等核心数据结构
- **`dataService.ts`**: 提供数据操作和业务逻辑函数

#### 🧩 组件层 (`src/components/`)
- **`StatsCard.tsx`**: 可复用的统计卡片，支持自定义图标和样式
- **`InviteSection.tsx`**: 邀请功能区，包含邀请码显示和链接复制
- **`InvitedUsersList.tsx`**: 被邀请用户列表，显示用户详情和收益
- **`HistorySection.tsx`**: 历史记录查看，支持标签页切换
- **`UserSelector.tsx`**: 用户选择组件，支持搜索和过滤

#### 📱 页面层 (`src/app/`)
- **`page.tsx`**: 首页跳转逻辑，根据登录状态自动导航
- **`login/page.tsx`**: 登录页面，支持用户搜索和选择
- **`register/page.tsx`**: 注册页面，支持邀请码验证
- **`dashboard/page.tsx`**: 核心仪表板，集成所有功能模块

## 🚀 快速开始

### 环境要求
- Node.js 18.0 或更高版本
- npm 或 yarn 包管理器

### 安装依赖
```bash
# 使用 npm
npm install

# 或使用 yarn
yarn install
```

### 开发模式
```bash
# 启动开发服务器
npm run dev

# 或使用 yarn
yarn dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看应用

### 构建部署
```bash
# 构建生产版本
npm run build

# 启动生产服务器
npm start
```

## 💡 使用指南

### 1. 用户登录
- 访问首页会自动跳转到登录页面
- 在搜索框中输入用户名或邮箱进行搜索
- 从下拉列表中选择用户账户
- 点击"登录到后台"进入系统

### 2. 用户注册
- 在登录页面点击"注册新账户"
- 填写用户名、邮箱和可选的邀请码
- 系统会实时验证邀请码的有效性
- 注册成功后自动跳转到登录页面

### 3. 仪表板功能
- **统计概览**: 查看总交易额、手续费、邀请人数和返佣收益
- **邀请功能**: 复制个人邀请码和邀请链接
- **用户管理**: 查看已邀请用户列表和其交易状态
- **历史记录**: 分类查看交易、返佣和邀请历史
- **数据导出**: 一键导出完整的统计报表

### 4. 返佣机制
- 邀请用户注册后，其产生的交易手续费将按 20% 比例返佣给邀请人
- 返佣实时计算，在用户交易完成后立即生效
- 支持一级返佣结构，简单透明

