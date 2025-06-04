'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { getAllUsers, searchUsers } from '@/lib/dataService'
import { User } from '@/lib/mockData'

export default function LoginPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [showUserList, setShowUserList] = useState(false)
  const [loading, setLoading] = useState(false)

  const allUsers = getAllUsers()
  const filteredUsers = searchTerm ? searchUsers(searchTerm) : allUsers

  const handleUserSelect = (user: User) => {
    setSelectedUser(user)
    setSearchTerm(user.username)
    setShowUserList(false)
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchTerm(value)
    setSelectedUser(null)
    setShowUserList(value.length > 0)
  }

  const handleLogin = async () => {
    if (!selectedUser) return

    setLoading(true)

    // 模拟登录过程
    setTimeout(() => {
      // 将用户信息存储到 localStorage（简单的状态管理）
      localStorage.setItem('currentUser', JSON.stringify(selectedUser))
      setLoading(false)

      // 跳转到主页面
      router.push('/dashboard')
    }, 1000)
  }

  const handleRegisterClick = () => {
    router.push('/register')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 bg-blue-600 rounded-xl flex items-center justify-center mb-4">
            <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
              />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-900">返佣后台系统</h2>
          <p className="mt-2 text-sm text-gray-600">请选择您的账户登录</p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl sm:rounded-xl sm:px-10">
          <div className="space-y-6">
            {/* 用户搜索 */}
            <div>
              <label htmlFor="userSearch" className="block text-sm font-medium text-gray-700 mb-2">
                选择用户账户
              </label>
              <div className="relative">
                <input
                  id="userSearch"
                  type="text"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  onFocus={() => setShowUserList(true)}
                  className="appearance-none block w-full px-3 py-3 pl-10 border border-gray-300 rounded-lg placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="搜索用户名或邮箱..."
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                {selectedUser && (
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <svg className="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                )}
              </div>

              {/* 用户列表下拉 */}
              {showUserList && (
                <div className="w-[368px] absolute z-10 mt-1 bg-white shadow-lg max-h-48 rounded-md py-1 text-base ring-1 ring-gray-200 border border-gray-200 overflow-auto focus:outline-none sm:text-sm">
                  {filteredUsers.length > 0 ? (
                    filteredUsers.map(user => (
                      <div
                        key={user.uid}
                        onClick={() => handleUserSelect(user)}
                        className="cursor-pointer select-none relative py-2 px-3 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <div className="min-w-0 flex-1">
                            <div className="text-sm font-medium text-gray-900 truncate">{user.username}</div>
                            <div className="text-xs text-gray-500 truncate">{user.email}</div>
                          </div>
                          <div className="text-xs text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded text-center min-w-[60px] flex-shrink-0 ml-2">
                            {user.uid}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="py-2 px-3 text-gray-500 text-center text-sm">未找到匹配的用户</div>
                  )}
                </div>
              )}
            </div>

            {/* 选中用户信息 */}
            {selectedUser && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-blue-800 mb-2">选中的用户</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-blue-700">用户名:</span>
                    <span className="text-sm font-medium text-blue-900">{selectedUser.username}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-blue-700">邮箱:</span>
                    <span className="text-sm font-medium text-blue-900">{selectedUser.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-blue-700">用户ID:</span>
                    <span className="text-sm font-medium text-blue-900">{selectedUser.uid}</span>
                  </div>
                  {selectedUser.inviter_uid && (
                    <div className="flex justify-between">
                      <span className="text-sm text-blue-700">邀请人:</span>
                      <span className="text-sm font-medium text-blue-900">{selectedUser.inviter_uid}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* 登录按钮 */}
            <div>
              <button
                onClick={handleLogin}
                disabled={!selectedUser || loading}
                className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white transition-all ${
                  !selectedUser || loading
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 hover:shadow-lg'
                }`}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    登录中...
                  </>
                ) : (
                  '登录到后台'
                )}
              </button>
            </div>

            {/* 分隔线 */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">还没有账户？</span>
              </div>
            </div>

            {/* 注册按钮 */}
            <div>
              <button
                onClick={handleRegisterClick}
                className="w-full flex justify-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all hover:shadow-md"
              >
                注册新账户
              </button>
            </div>
          </div>
        </div>

        {/* 系统信息 */}
        <div className="mt-8 text-center">
          <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4 border border-white/20">
            <h3 className="text-sm font-semibold text-gray-800 mb-2">系统特性</h3>
            <div className="grid grid-cols-2 gap-4 text-xs text-gray-600">
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                20% 返佣比例
              </div>
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                实时结算
              </div>
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                邀请管理
              </div>
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                数据导出
              </div>
            </div>
          </div>
        </div>

        {/* 底部信息 */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">返佣后台管理系统 v1.0 | 安全可靠的收益管理平台</p>
        </div>
      </div>

      {/* 点击外部关闭下拉列表 */}
      {showUserList && <div className="fixed inset-0 z-0" onClick={() => setShowUserList(false)} />}
    </div>
  )
}
