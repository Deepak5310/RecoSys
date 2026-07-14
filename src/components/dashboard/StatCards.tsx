
import { Briefcase, Clock, FileWarning, CheckCircle, FilePlus } from 'lucide-react';
import './Dashboard.css';

const stats = [
  { title: 'Total Cases', value: '4,520', sub: '+12% from last month', icon: Briefcase, color: 'var(--primary)' },
  { title: 'Pending', value: '2,100', sub: 'Requires action', icon: Clock, color: 'var(--status-warning-text)' },
  { title: 'PTP', value: '850', sub: 'Promises to pay', icon: FileWarning, color: 'var(--status-info-text)' },
  { title: 'Recovered', value: '₹ 12.5L', sub: '+8% this week', icon: CheckCircle, color: 'var(--status-success-text)' },
  { title: 'New Today', value: '142', sub: 'Assigned today', icon: FilePlus, color: 'var(--secondary)' },
];

export function StatCards() {
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
