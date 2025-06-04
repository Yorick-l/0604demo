'use client'

import { getInvitedUsersWithStats } from '@/lib/dataService'

interface InvitedUsersListProps {
  inviterUid: string
}

export default function InvitedUsersList({ inviterUid }: InvitedUsersListProps) {
  const invitedUsersWithStats = getInvitedUsersWithStats(inviterUid)

  if (invitedUsersWithStats.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">邀请用户详情</h3>
        <div className="text-center py-8 text-gray-500">
          <p>暂无邀请用户</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">邀请用户详情</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">用户信息</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">交易次数</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">总交易额</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">总手续费</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">产生返佣</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {invitedUsersWithStats.map(user => (
              <tr key={user.uid} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{user.username}</div>
                    <div className="text-sm text-gray-500">{user.email}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.tradeCount}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">¥{user.totalTradeAmount.toLocaleString()}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">¥{user.totalFee.toLocaleString()}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm font-medium text-green-600">¥{user.commission.toLocaleString()}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
