import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 为了支持 Netlify 部署，启用静态导出
  output: 'export',
  
  // 添加尾随斜杠，确保路由正常工作
  trailingSlash: true,
  
  // 禁用图片优化（静态导出不支持）
  images: {
    unoptimized: true,
  },
  
  // 确保构建时的基础路径正确
  basePath: '',
};

export default nextConfig;
