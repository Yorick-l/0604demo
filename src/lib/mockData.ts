// Mock data for the referral commission system

export interface User {
  uid: string;
  username: string;
  email: string;
  inviter_uid?: string;
  inviteCode: string; // 用户的邀请码
  createdAt: string;
}

export interface Trade {
  id: string;
  uid: string;
  amount: number;
  fee: number;
  timestamp: string;
  type: 'buy' | 'sell';
  symbol: string;
}

export interface InviteRecord {
  id: string;
  inviterUid: string;
  inviteeUid: string;
  inviteCode: string;
  timestamp: string;
  status: 'active' | 'inactive';
}

export interface CommissionRecord {
  id: string;
  fromUid: string; // 产生手续费的用户
  toUid: string;   // 获得返佣的用户
  tradeId: string;
  amount: number;  // 返佣金额
  fee: number;     // 原始手续费
  timestamp: string;
}

export interface UserStats {
  uid: string;
  totalTradeAmount: number;
  totalFee: number;
  inviteCount: number;
  totalCommission: number;
}

// Mock users data
export const mockUsers: User[] = [
  { uid: 'user1', username: '张三', email: 'zhangsan@example.com', inviteCode: 'INV001', createdAt: '2024-01-01T10:00:00Z' },
  { uid: 'user2', username: '李四', email: 'lisi@example.com', inviter_uid: 'user1', inviteCode: 'INV002', createdAt: '2024-01-05T10:00:00Z' },
  { uid: 'user3', username: '王五', email: 'wangwu@example.com', inviter_uid: 'user1', inviteCode: 'INV003', createdAt: '2024-01-08T10:00:00Z' },
  { uid: 'user4', username: '赵六', email: 'zhaoliu@example.com', inviter_uid: 'user2', inviteCode: 'INV004', createdAt: '2024-01-10T10:00:00Z' },
  { uid: 'user5', username: '钱七', email: 'qianqi@example.com', inviter_uid: 'user1', inviteCode: 'INV005', createdAt: '2024-01-12T10:00:00Z' },
  { uid: 'user6', username: '孙八', email: 'sunba@example.com', inviteCode: 'INV006', createdAt: '2024-01-15T10:00:00Z' },
  { uid: 'user7', username: '周九', email: 'zhoujiu@example.com', inviter_uid: 'user6', inviteCode: 'INV007', createdAt: '2024-01-18T10:00:00Z' },
];

// Mock trades data
export const mockTrades: Trade[] = [
  { id: 'trade1', uid: 'user1', amount: 1000, fee: 10, timestamp: '2024-01-15T10:00:00Z', type: 'buy', symbol: 'BTC/USDT' },
  { id: 'trade2', uid: 'user1', amount: 2000, fee: 20, timestamp: '2024-01-16T14:30:00Z', type: 'sell', symbol: 'ETH/USDT' },
  { id: 'trade3', uid: 'user2', amount: 500, fee: 5, timestamp: '2024-01-17T09:15:00Z', type: 'buy', symbol: 'BTC/USDT' },
  { id: 'trade4', uid: 'user2', amount: 1500, fee: 15, timestamp: '2024-01-18T16:45:00Z', type: 'sell', symbol: 'BTC/USDT' },
  { id: 'trade5', uid: 'user3', amount: 800, fee: 8, timestamp: '2024-01-19T11:20:00Z', type: 'buy', symbol: 'ADA/USDT' },
  { id: 'trade6', uid: 'user3', amount: 1200, fee: 12, timestamp: '2024-01-20T13:10:00Z', type: 'sell', symbol: 'SOL/USDT' },
  { id: 'trade7', uid: 'user4', amount: 300, fee: 3, timestamp: '2024-01-21T08:30:00Z', type: 'buy', symbol: 'DOT/USDT' },
  { id: 'trade8', uid: 'user5', amount: 2500, fee: 25, timestamp: '2024-01-22T15:00:00Z', type: 'buy', symbol: 'BTC/USDT' },
  { id: 'trade9', uid: 'user5', amount: 1800, fee: 18, timestamp: '2024-01-23T12:45:00Z', type: 'sell', symbol: 'ETH/USDT' },
  { id: 'trade10', uid: 'user6', amount: 900, fee: 9, timestamp: '2024-01-24T10:15:00Z', type: 'buy', symbol: 'BNB/USDT' },
  { id: 'trade11', uid: 'user7', amount: 700, fee: 7, timestamp: '2024-01-25T14:20:00Z', type: 'sell', symbol: 'AVAX/USDT' },
];

// Mock invite records
export const mockInviteRecords: InviteRecord[] = [
  { id: 'invite1', inviterUid: 'user1', inviteeUid: 'user2', inviteCode: 'INV001', timestamp: '2024-01-05T10:00:00Z', status: 'active' },
  { id: 'invite2', inviterUid: 'user1', inviteeUid: 'user3', inviteCode: 'INV001', timestamp: '2024-01-08T10:00:00Z', status: 'active' },
  { id: 'invite3', inviterUid: 'user2', inviteeUid: 'user4', inviteCode: 'INV002', timestamp: '2024-01-10T10:00:00Z', status: 'active' },
  { id: 'invite4', inviterUid: 'user1', inviteeUid: 'user5', inviteCode: 'INV001', timestamp: '2024-01-12T10:00:00Z', status: 'active' },
  { id: 'invite5', inviterUid: 'user6', inviteeUid: 'user7', inviteCode: 'INV006', timestamp: '2024-01-18T10:00:00Z', status: 'active' },
];

// Mock commission records
export const mockCommissionRecords: CommissionRecord[] = [
  { id: 'comm1', fromUid: 'user2', toUid: 'user1', tradeId: 'trade3', amount: 1, fee: 5, timestamp: '2024-01-17T09:15:00Z' },
  { id: 'comm2', fromUid: 'user2', toUid: 'user1', tradeId: 'trade4', amount: 3, fee: 15, timestamp: '2024-01-18T16:45:00Z' },
  { id: 'comm3', fromUid: 'user3', toUid: 'user1', tradeId: 'trade5', amount: 1.6, fee: 8, timestamp: '2024-01-19T11:20:00Z' },
  { id: 'comm4', fromUid: 'user3', toUid: 'user1', tradeId: 'trade6', amount: 2.4, fee: 12, timestamp: '2024-01-20T13:10:00Z' },
  { id: 'comm5', fromUid: 'user4', toUid: 'user2', tradeId: 'trade7', amount: 0.6, fee: 3, timestamp: '2024-01-21T08:30:00Z' },
  { id: 'comm6', fromUid: 'user5', toUid: 'user1', tradeId: 'trade8', amount: 5, fee: 25, timestamp: '2024-01-22T15:00:00Z' },
  { id: 'comm7', fromUid: 'user5', toUid: 'user1', tradeId: 'trade9', amount: 3.6, fee: 18, timestamp: '2024-01-23T12:45:00Z' },
  { id: 'comm8', fromUid: 'user7', toUid: 'user6', tradeId: 'trade11', amount: 1.4, fee: 7, timestamp: '2024-01-25T14:20:00Z' },
];

// Commission rate (20% of invitee's trading fees)
export const COMMISSION_RATE = 0.2;