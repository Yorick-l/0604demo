'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { User } from '@/lib/mockData'
import { calculateUserStats, generateUserStatsCSV } from '@/lib/dataService'
import StatsCard from '@/components/StatsCard'
import InvitedUsersList from '@/components/InvitedUsersList'
import InviteSection from '@/components/InviteSection'
import HistorySection from '@/components/HistorySection'

export default function DashboardPage() {
  const router = useRouter()
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [isQuickExporting, setIsQuickExporting] = useState(false)

  const userStats = currentUser ? calculateUserStats(currentUser.uid) : null

  useEffect(() => {
    // 从 localStorage 获取当前用户
    const storedUser = localStorage.getItem('currentUser')
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser)
        setCurrentUser(user)
      } catch (error) {
        console.error('解析用户数据失败:', error)
        router.push('/login')
      }
    } else {
      router.push('/login')
    }
    setLoading(false)
  }, [router])

  const handleExportCSV = () => {
    if (!currentUser) return

    setIsQuickExporting(true)

    // 模拟导出过程
    setTimeout(() => {
      const csvData = generateUserStatsCSV(currentUser.uid)
      const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' })
      const link = document.createElement('a')
      const url = URL.createObjectURL(blob)
      link.setAttribute('href', url)
      link.setAttribute('download', `返佣统计_${currentUser.username}_${new Date().toISOString().split('T')[0]}.csv`)
      link.style.visibility = 'hidden'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      setIsQuickExporting(false)
    }, 800) // 模拟导出延迟
  }

  const handleLogout = () => {
    localStorage.removeItem('currentUser')
    setCurrentUser(null)
    router.push('/login')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">加载中...</p>
        </div>
      </div>
    )
  }

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">用户信息获取失败，正在跳转...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">返佣后台系统</h1>
              <p className="text-gray-600 mt-2">管理和查看您的交易返佣数据</p>
            </div>
            <div className="flex gap-3">
              <div className="relative">
                <button
                  onClick={handleExportCSV}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
                >
                  导出报表
                </button>
              </div>
              <button
                onClick={handleLogout}
                className="bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
              >
                退出登录
              </button>
            </div>
          </div>
        </div>

        {/* User Info */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">用户信息</h2>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              已登录
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-gray-600">用户名</p>
              <p className="text-lg font-medium text-gray-900">{currentUser.username}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">邮箱</p>
              <p className="text-lg font-medium text-gray-900">{currentUser.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">用户ID</p>
              <p className="text-lg font-medium text-gray-900">{currentUser.uid}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">邀请码</p>
              <p className="text-lg font-medium text-blue-600">{currentUser.inviteCode}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">注册时间</p>
              <p className="text-lg font-medium text-gray-900">{new Date(currentUser.createdAt).toLocaleDateString('zh-CN')}</p>
            </div>
            {currentUser.inviter_uid && (
              <div>
                <p className="text-sm text-gray-600">邀请人ID</p>
                <p className="text-lg font-medium text-gray-900">{currentUser.inviter_uid}</p>
              </div>
            )}
          </div>
        </div>

        {/* Stats Cards */}
        {userStats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatsCard
              title="总交易额"
              value={`¥${userStats.totalTradeAmount.toLocaleString()}`}
              icon={
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                  />
                </svg>
              }
            />
            <StatsCard
              title="总手续费"
              value={`¥${userStats.totalFee.toLocaleString()}`}
              icon={
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  />
                </svg>
              }
            />
            <StatsCard
              title="邀请人数"
              value={userStats.inviteCount}
              subtitle="一级邀请"
              icon={
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              }
            />
            <StatsCard
              title="总返佣奖励"
              value={`¥${userStats.totalCommission.toLocaleString()}`}
              subtitle="20% 手续费返佣"
              className="bg-gradient-to-r from-green-50 to-green-100 border-l-4 border-green-500"
              icon={
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                  />
                </svg>
              }
            />
          </div>
        )}

        {/* Invite Section */}
        <div className="mb-8">
          <InviteSection user={currentUser} />
        </div>

        {/* Invited Users List */}
        <div className="mb-8">
          <InvitedUsersList inviterUid={currentUser.uid} />
        </div>

        {/* History Section */}
        <div className="mb-8">
          <HistorySection uid={currentUser.uid} />
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-gray-500 text-sm">
          <p>返佣比例：20% | 仅支持一级返佣结构</p>
        </div>
      </div>

      {/* Quick Export Overlay */}
      {isQuickExporting && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 shadow-xl">
            <div className="flex items-center space-x-3">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
              <span className="text-gray-700 font-medium">正在导出报表...</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
