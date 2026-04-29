export const CATEGORIES = [
  { name: 'Food',          icon: '🍔', color: '#f59e0b', bg: 'rgba(245,158,11,.12)' },
  { name: 'Transport',     icon: '🚗', color: '#3b82f6', bg: 'rgba(59,130,246,.12)' },
  { name: 'Shopping',      icon: '🛍️', color: '#ec4899', bg: 'rgba(236,72,153,.12)' },
  { name: 'Health',        icon: '💊', color: '#22c55e', bg: 'rgba(34,197,94,.12)'  },
  { name: 'Entertainment', icon: '🎮', color: '#a855f7', bg: 'rgba(168,85,247,.12)' },
  { name: 'Bills',         icon: '📄', color: '#ef4444', bg: 'rgba(239,68,68,.12)'  },
  { name: 'Education',     icon: '📚', color: '#06b6d4', bg: 'rgba(6,182,212,.12)'  },
  { name: 'Other',         icon: '💡', color: '#8888aa', bg: 'rgba(136,136,170,.12)'},
];

export const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

export const MONTHLY_DATA = [18000,22000,19500,24000,21000,28000,25000,30000,27000,32000,29000,35000];

export const SAMPLE_EXPENSES = [];

export const DEFAULT_BUDGETS = {
  Food: 5000, Transport: 2000, Shopping: 5000, Health: 2000,
  Entertainment: 2000, Bills: 4000, Education: 2000, Other: 1000,
};

export const getCat = (name) => CATEGORIES.find((c) => c.name === name) || CATEGORIES[7];
export const fmt    = (n)    => '₹' + Number(n).toLocaleString('en-IN');
