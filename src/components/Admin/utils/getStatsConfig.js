export const getStatsConfig = (checkouts, calculateTotalRevenue) => [
    {
      title: 'Total Orders',
      value: checkouts.length,
      icon: 'fas fa-shopping-bag',
      iconBg: 'bg-blue-50',
      iconColor: 'text-blue-500',
      trendIcon: 'fas fa-users',
      trendColor: 'text-blue-500',
      trend: `${checkouts.length}`,
      comparison: 'customers'
    },
    {
      title: 'Pending Orders',
      value: checkouts.filter(c => c.paymentStatus === 'pending').length,
      icon: 'fas fa-clock',
      iconBg: 'bg-amber-50',
      iconColor: 'text-amber-500',
      trendIcon: 'fas fa-clock',
      trendColor: 'text-amber-500',
      trend: 'Active',
      comparison: 'now'
    },
    {
      title: 'Paid Orders',
      value: checkouts.filter(c => c.paymentStatus === 'completed').length,
      icon: 'fas fa-check-circle',
      iconBg: 'bg-green-50',
      iconColor: 'text-green-500',
      trendIcon: 'fas fa-trophy',
      trendColor: 'text-green-500',
      trend: 'Delivered',
      comparison: 'orders'
    },
    {
      title: 'Total Revenue',
      value: `$${calculateTotalRevenue}`,
      icon: 'fas fa-dollar-sign',
      iconBg: 'bg-purple-50',
      iconColor: 'text-purple-500',
      trendIcon: 'fas fa-chart-pie',
      trendColor: 'text-purple-500',
      trend: 'Earned',
      comparison: 'revenue'
    }
  ];
  