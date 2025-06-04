'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    // 检查是否已登录
    const storedUser = localStorage.getItem('currentUser')
    if (storedUser) {
      // 如果已登录，跳转到仪表盘
      router.push('/dashboard')
    } else {
      // 如果未登录，跳转到登录页面
      router.push('/login')
    }
  }, [router])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <h2 className="text-lg font-medium text-gray-900">正在跳转...</h2>
        <p className="text-sm text-gray-500 mt-2">请稍候</p>
      </div>
    </div>
  )
}
