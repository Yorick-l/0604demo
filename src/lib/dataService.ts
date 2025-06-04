import { 
  mockUsers, 
  mockTrades, 
  mockInviteRecords,
  mockCommissionRecords,
  User, 
  Trade, 
  UserStats, 
  InviteRecord,
  CommissionRecord,
  COMMISSION_RATE 
} from './mockData';

// Get user by uid
export function getUserById(uid: string): User | undefined {
  return mockUsers.find(user => user.uid === uid);
}

// Get all users
export function getAllUsers(): User[] {
  return mockUsers;
}

// Get trades by user uid
export function getTradesByUser(uid: string): Trade[] {
  return mockTrades.filter(trade => trade.uid === uid);
}

// Get all trades
export function getAllTrades(): Trade[] {
  return mockTrades;
}

// Get users invited by a specific user (first level only)
export function getInvitedUsers(inviterUid: string): User[] {
  return mockUsers.filter(user => user.inviter_uid === inviterUid);
}

// Get invite records by inviter
export function getInviteRecordsByInviter(inviterUid: string): InviteRecord[] {
  return mockInviteRecords.filter(record => record.inviterUid === inviterUid);
}

// Get commission records by user (received commissions)
export function getCommissionRecordsByUser(uid: string): CommissionRecord[] {
  return mockCommissionRecords.filter(record => record.toUid === uid);
}

// Get trade by id
export function getTradeById(tradeId: string): Trade | undefined {
  return mockTrades.find(trade => trade.id === tradeId);
}

// Calculate user statistics
export function calculateUserStats(uid: string): UserStats {
  const userTrades = getTradesByUser(uid);
  const invitedUsers = getInvitedUsers(uid);
  
  // Calculate user's own trading stats
  const totalTradeAmount = userTrades.reduce((sum, trade) => sum + trade.amount, 0);
  const totalFee = userTrades.reduce((sum, trade) => sum + trade.fee, 0);
  
  // Calculate commission from invited users
  let totalCommission = 0;
  invitedUsers.forEach(invitedUser => {
    const invitedUserTrades = getTradesByUser(invitedUser.uid);
    const invitedUserTotalFee = invitedUserTrades.reduce((sum, trade) => sum + trade.fee, 0);
    totalCommission += invitedUserTotalFee * COMMISSION_RATE;
  });
  
  return {
    uid,
    totalTradeAmount,
    totalFee,
    inviteCount: invitedUsers.length,
    totalCommission: Math.round(totalCommission * 100) / 100, // Round to 2 decimal places
  };
}

// Get invited users with their trading stats
export function getInvitedUsersWithStats(inviterUid: string) {
  const invitedUsers = getInvitedUsers(inviterUid);
  
  return invitedUsers.map(user => {
    const userTrades = getTradesByUser(user.uid);
    const totalTradeAmount = userTrades.reduce((sum, trade) => sum + trade.amount, 0);
    const totalFee = userTrades.reduce((sum, trade) => sum + trade.fee, 0);
    const commission = totalFee * COMMISSION_RATE;
    
    return {
      ...user,
      totalTradeAmount,
      totalFee,
      commission: Math.round(commission * 100) / 100,
      tradeCount: userTrades.length,
    };
  });
}

// Get commission history with details
export function getCommissionHistory(uid: string) {
  const commissionRecords = getCommissionRecordsByUser(uid);
  
  return commissionRecords.map(record => {
    const trade = getTradeById(record.tradeId);
    const fromUser = getUserById(record.fromUid);
    
    return {
      ...record,
      trade,
      fromUser,
      formattedTimestamp: new Date(record.timestamp).toLocaleString('zh-CN'),
    };
  }).sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
}

// Get invite history with details
export function getInviteHistory(uid: string) {
  const inviteRecords = getInviteRecordsByInviter(uid);
  
  return inviteRecords.map(record => {
    const invitee = getUserById(record.inviteeUid);
    const inviteeTrades = getTradesByUser(record.inviteeUid);
    const totalCommission = inviteeTrades.reduce((sum, trade) => sum + trade.fee * COMMISSION_RATE, 0);
    
    return {
      ...record,
      invitee,
      totalCommission: Math.round(totalCommission * 100) / 100,
      tradeCount: inviteeTrades.length,
      formattedTimestamp: new Date(record.timestamp).toLocaleString('zh-CN'),
    };
  }).sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
}

// Get user's own trade history
export function getTradeHistory(uid: string) {
  const trades = getTradesByUser(uid);
  
  return trades.map(trade => ({
    ...trade,
    formattedTimestamp: new Date(trade.timestamp).toLocaleString('zh-CN'),
    typeText: trade.type === 'buy' ? '买入' : '卖出',
  })).sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
}

// Search users by username or email
export function searchUsers(query: string): User[] {
  const lowercaseQuery = query.toLowerCase();
  return mockUsers.filter(user => 
    user.username.toLowerCase().includes(lowercaseQuery) ||
    user.email.toLowerCase().includes(lowercaseQuery)
  );
}

// Copy invite link to clipboard
export function generateInviteLink(inviteCode: string): string {
  return `${window.location.origin}/register?invite=${inviteCode}`;
}

// Generate CSV data for export
export function generateUserStatsCSV(uid: string): string {
  const user = getUserById(uid);
  const stats = calculateUserStats(uid);
  const invitedUsersWithStats = getInvitedUsersWithStats(uid);
  const commissionHistory = getCommissionHistory(uid);
  const tradeHistory = getTradeHistory(uid);
  
  if (!user) return '';
  
  let csv = '返佣统计报表\n\n';
  csv += `用户信息\n`;
  csv += `用户名,邮箱,邀请码,总交易额,总手续费,邀请人数,总返佣\n`;
  csv += `${user.username},${user.email},${user.inviteCode},${stats.totalTradeAmount},${stats.totalFee},${stats.inviteCount},${stats.totalCommission}\n\n`;
  
  if (invitedUsersWithStats.length > 0) {
    csv += `邀请用户详情\n`;
    csv += `用户名,邮箱,注册时间,交易次数,总交易额,总手续费,产生返佣\n`;
    invitedUsersWithStats.forEach(invitedUser => {
      csv += `${invitedUser.username},${invitedUser.email},${new Date(invitedUser.createdAt).toLocaleString('zh-CN')},${invitedUser.tradeCount},${invitedUser.totalTradeAmount},${invitedUser.totalFee},${invitedUser.commission}\n`;
    });
    csv += '\n';
  }
  
  if (commissionHistory.length > 0) {
    csv += `返佣历史记录\n`;
    csv += `时间,来源用户,交易对,交易类型,手续费,返佣金额\n`;
    commissionHistory.forEach(record => {
      if (record.trade && record.fromUser) {
        csv += `${record.formattedTimestamp},${record.fromUser.username},${record.trade.symbol},${record.trade.type === 'buy' ? '买入' : '卖出'},${record.fee},${record.amount}\n`;
      }
    });
    csv += '\n';
  }
  
  if (tradeHistory.length > 0) {
    csv += `交易历史记录\n`;
    csv += `时间,交易对,类型,交易额,手续费\n`;
    tradeHistory.forEach(trade => {
      csv += `${trade.formattedTimestamp},${trade.symbol},${trade.typeText},${trade.amount},${trade.fee}\n`;
    });
  }
  
  return csv;
} 