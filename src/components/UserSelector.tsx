'use client'

import { useState } from 'react'
import { getAllUsers, searchUsers } from '@/lib/dataService'
import { User } from '@/lib/mockData'

interface UserSelectorProps {
  onUserSelect: (user: User) => void
  currentUser: User | null
}

export default function UserSelector({ onUserSelect, currentUser }: UserSelectorProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false)

  const users = searchQuery ? searchUsers(searchQuery) : getAllUsers()

  const handleUserSelect = (user: User) => {
    onUserSelect(user)
    setIsOpen(false)
    setSearchQuery('')
  }

  return (
    <div className="relative">
      <div className="mb-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-4 py-2 text-left bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          {currentUser ? (
            <span className="flex items-center justify-between">
              <span className="text-gray-900 font-medium">
                {currentUser.username} ({currentUser.email})
              </span>
              <span className="text-sm text-gray-600">点击切换用户</span>
            </span>
          ) : (
            <span className="text-gray-700">选择用户登录</span>
          )}
        </button>
      </div>

      {isOpen && (
        <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg">
          <div className="p-2 border-b border-gray-200">
            <input
              type="text"
              placeholder="搜索用户名或邮箱..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500 text-gray-900"
            />
          </div>
          <div className="max-h-60 overflow-y-auto">
            {users.map(user => (
              <button
                key={user.uid}
                onClick={() => handleUserSelect(user)}
                className="w-full px-4 py-2 text-left hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
              >
                <div className="font-medium text-gray-900">{user.username}</div>
                <div className="text-sm text-gray-600">{user.email}</div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
