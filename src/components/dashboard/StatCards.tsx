import { Briefcase, Clock, FileWarning, CheckCircle, FilePlus } from 'lucide-react';
import { useData } from '../../context/DataContext';
import './Dashboard.css';

export function StatCards() {
  const { metrics } = useData();

  const stats = [
    { title: 'Total Cases', value: metrics.totalCases.toLocaleString('en-IN'), sub: 'Total uploaded cases', icon: Briefcase, color: 'var(--primary)' },
    { title: 'Pending', value: metrics.pendingCases.toLocaleString('en-IN'), sub: 'Requires action', icon: Clock, color: 'var(--status-warning-text)' },
    { title: 'PTP', value: metrics.ptpCases.toLocaleString('en-IN'), sub: 'Promises to pay', icon: FileWarning, color: 'var(--status-info-text)' },
    { title: 'Recovered', value: `₹ ${metrics.recoveredAmount.toLocaleString('en-IN')}`, sub: 'Total Amount Collected', icon: CheckCircle, color: 'var(--status-success-text)' },
    { title: 'New Today', value: metrics.newToday.toLocaleString('en-IN'), sub: 'Assigned today', icon: FilePlus, color: 'var(--secondary)' },
  ];

  return (
    <div className="stats-row">
      {stats.map((stat, i) => {
        const Icon = stat.icon;
        return (
          <div key={i} className="stat-card glass-panel flex justify-between items-center">
            <div>
              <h3 className="stat-title">{stat.title}</h3>
              <div className="stat-value">{stat.value}</div>
              <p className="stat-sub">{stat.sub}</p>
            </div>
            <div className="stat-icon-wrapper" style={{ backgroundColor: `${stat.color}20`, color: stat.color }}>
              <Icon size={24} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
