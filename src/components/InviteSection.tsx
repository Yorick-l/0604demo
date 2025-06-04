'use client'

import { useState } from 'react'
import { User } from '@/lib/mockData'
import { generateInviteLink } from '@/lib/dataService'

interface InviteSectionProps {
  user: User
}

export default function InviteSection({ user }: InviteSectionProps) {
  const [copied, setCopied] = useState(false)

  const inviteLink = generateInviteLink(user.inviteCode)

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(inviteLink)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('复制失败:', err)
    }
  }

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(user.inviteCode)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('复制失败:', err)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">邀请功能</h3>

      <div className="space-y-4">
        {/* 邀请码 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">您的邀请码</label>
          <div className="flex items-center space-x-2">
            <div className="flex-1 px-3 py-2 bg-gray-50 border border-gray-300 rounded-md">
              <span className="font-mono text-lg font-semibold text-blue-600">{user.inviteCode}</span>
            </div>
            <button onClick={handleCopyCode} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
              {copied ? '已复制' : '复制'}
            </button>
          </div>
          <p className="text-sm text-gray-500 mt-1">将此邀请码分享给朋友，他们注册时填写即可成为您的邀请用户</p>
        </div>

        {/* 邀请链接 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">邀请链接</label>
          <div className="flex items-center space-x-2">
            <div className="flex-1 px-3 py-2 bg-gray-50 border border-gray-300 rounded-md">
              <span className="text-sm text-gray-600 break-all">{inviteLink}</span>
            </div>
            <button onClick={handleCopyLink} className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
              {copied ? '已复制' : '复制链接'}
            </button>
          </div>
          <p className="text-sm text-gray-500 mt-1">直接分享此链接，朋友点击即可自动填入您的邀请码</p>
        </div>

        {/* 邀请说明 */}
        <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
          <h4 className="text-sm font-semibold text-blue-800 mb-2">邀请奖励说明</h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• 成功邀请用户后，可获得其交易手续费的 20% 作为返佣</li>
            <li>• 返佣实时结算，每笔交易完成后立即到账</li>
            <li>• 支持一级邀请结构，被邀请用户的邀请不产生返佣</li>
            <li>• 邀请用户越多，交易越活跃，返佣收益越高</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
