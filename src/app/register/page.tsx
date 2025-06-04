'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { getAllUsers } from '@/lib/dataService'
import { User } from '@/lib/mockData'

// 创建一个加载组件
function RegisterFormSkeleton() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">用户注册</h2>
          <p className="mt-2 text-sm text-gray-600">正在加载...</p>
        </div>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
            <div className="h-10 bg-gray-200 rounded mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
            <div className="h-10 bg-gray-200 rounded mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
            <div className="h-10 bg-gray-200 rounded mb-6"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

// 将原有的组件逻辑提取到这个组件中
function RegisterForm() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    inviteCode: searchParams.get('invite') || ''
  })
  const [inviter, setInviter] = useState<User | null>(null)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  // 验证邀请码
  useEffect(() => {
    if (formData.inviteCode) {
      const users = getAllUsers()
      const inviterUser = users.find(user => user.inviteCode === formData.inviteCode)
      setInviter(inviterUser || null)
    } else {
      setInviter(null)
    }
  }, [formData.inviteCode])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    // 基本验证
    if (!formData.username.trim()) {
      setMessage({ type: 'error', text: '请输入用户名' })
      setLoading(false)
      return
    }

    if (!formData.email.trim()) {
      setMessage({ type: 'error', text: '请输入邮箱地址' })
      setLoading(false)
      return
    }

    // 邮箱格式验证
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      setMessage({ type: 'error', text: '请输入有效的邮箱地址' })
      setLoading(false)
      return
    }

    // 检查邮箱是否已存在
    const existingUsers = getAllUsers()
    const emailExists = existingUsers.some(user => user.email.toLowerCase() === formData.email.toLowerCase())
    if (emailExists) {
      setMessage({ type: 'error', text: '该邮箱已被注册' })
      setLoading(false)
      return
    }

    // 检查用户名是否已存在
    const usernameExists = existingUsers.some(user => user.username === formData.username.trim())
    if (usernameExists) {
      setMessage({ type: 'error', text: '该用户名已被使用' })
      setLoading(false)
      return
    }

    // 如果有邀请码，验证邀请码是否有效
    if (formData.inviteCode && !inviter) {
      setMessage({ type: 'error', text: '无效的邀请码' })
      setLoading(false)
      return
    }

    // 模拟注册过程
    setTimeout(() => {
      setMessage({ type: 'success', text: '注册成功！正在跳转到登录页面...' })
      setLoading(false)

      // 3秒后跳转到登录页面
      setTimeout(() => {
        router.push('/login')
      }, 3000)
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">用户注册</h2>
          <p className="mt-2 text-sm text-gray-600">注册成为新用户，开始您的交易之旅</p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* 用户名 */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                用户名
              </label>
              <div className="mt-1">
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  value={formData.username}
                  onChange={handleInputChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="请输入用户名"
                />
              </div>
            </div>

            {/* 邮箱 */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                邮箱地址
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="请输入邮箱地址"
                />
              </div>
            </div>

            {/* 邀请码 */}
            <div>
              <label htmlFor="inviteCode" className="block text-sm font-medium text-gray-700">
                邀请码 <span className="text-gray-500">(可选)</span>
              </label>
              <div className="mt-1">
                <input
                  id="inviteCode"
                  name="inviteCode"
                  type="text"
                  value={formData.inviteCode}
                  onChange={handleInputChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="请输入邀请码"
                />
              </div>
              {formData.inviteCode && (
                <div className="mt-2">
                  {inviter ? (
                    <div className="flex items-center text-sm text-green-600">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      有效邀请码 - 邀请人：{inviter.username}
                    </div>
                  ) : (
                    <div className="flex items-center text-sm text-red-600">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                          clipRule="evenodd"
                        />
                      </svg>
                      无效的邀请码
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* 邀请奖励说明 */}
            {inviter && (
              <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
                <h4 className="text-sm font-semibold text-blue-800 mb-2">邀请奖励说明</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>
                    • 您将被 <span className="font-medium">{inviter.username}</span> 邀请
                  </li>
                  <li>• 您的交易将产生 20% 的手续费返佣给邀请人</li>
                  <li>• 返佣不会影响您的交易体验</li>
                </ul>
              </div>
            )}

            {/* 错误/成功消息 */}
            {message && (
              <div
                className={`rounded-md p-4 ${
                  message.type === 'error' ? 'bg-red-50 border border-red-200' : 'bg-green-50 border border-green-200'
                }`}
              >
                <div className="flex">
                  <div className="flex-shrink-0">
                    {message.type === 'error' ? (
                      <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ) : (
                      <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </div>
                  <div className="ml-3">
                    <p className={`text-sm font-medium ${message.type === 'error' ? 'text-red-800' : 'text-green-800'}`}>{message.text}</p>
                  </div>
                </div>
              </div>
            )}

            {/* 提交按钮 */}
            <div>
              <button
                type="submit"
                disabled={loading}
                className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                  loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {loading ? (
                  <div className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    注册中...
                  </div>
                ) : (
                  '立即注册'
                )}
              </button>
            </div>

            {/* 登录链接 */}
            <div className="text-center">
              <p className="text-sm text-gray-600">
                已有账户？{' '}
                <button
                  type="button"
                  onClick={() => router.push('/login')}
                  className="font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus:underline transition ease-in-out duration-150"
                >
                  立即登录
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

// 主导出组件，包装在 Suspense 中
export default function RegisterPage() {
  return (
    <Suspense fallback={<RegisterFormSkeleton />}>
      <RegisterForm />
    </Suspense>
  )
}
