
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';
import { Line, Doughnut } from 'react-chartjs-2';
import './Dashboard.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const topAgents = [
  { rank: 1, name: 'Alice Smith', recovered: '₹ 3.2L', initials: 'AS', color: '#3b82f6' },
  { rank: 2, name: 'Bob Johnson', recovered: '₹ 2.8L', initials: 'BJ', color: '#8b5cf6' },
  { rank: 3, name: 'Charlie Davis', recovered: '₹ 2.5L', initials: 'CD', color: '#10b981' },
  { rank: 4, name: 'Diana Prince', recovered: '₹ 2.1L', initials: 'DP', color: '#f59e0b' },
];

export function Analytics() {
  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'bottom' as const, labels: { color: '#94a3b8' } },
    },
    scales: {
      x: { grid: { color: 'rgba(51, 65, 85, 0.4)' }, ticks: { color: '#94a3b8' } },
      y: { grid: { color: 'rgba(51, 65, 85, 0.4)' }, ticks: { color: '#94a3b8' } }
    }
  };

  const lineData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Recovered',
        data: [12, 19, 15, 25, 22, 30, 28],
        borderColor: '#22c55e',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        tension: 0.4,
      },
      {
        label: 'PTP',
        data: [5, 12, 8, 15, 10, 18, 12],
        borderColor: '#38bdf8',
        backgroundColor: 'rgba(56, 189, 248, 0.1)',
        tension: 0.4,
      },
    ],
  };

  const donutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '75%',
    plugins: {
      legend: { position: 'right' as const, labels: { color: '#94a3b8', usePointStyle: true } }
    }
  };

  const donutData = {
    labels: ['0-30 Days', '31-60 Days', '61-90 Days', '90+ Days'],
    datasets: [{
      data: [300, 150, 100, 50],
      backgroundColor: ['#3b82f6', '#8b5cf6', '#f59e0b', '#ef4444'],
      borderWidth: 0,
    }]
  };

  return (
    <div className="analytics-row">
      <div className="analytics-card glass-panel col-large">
        <h3 className="card-title">Recovery Overview</h3>
        <div className="chart-container">
          <Line options={lineOptions} data={lineData} />
        </div>
      </div>
      
      <div className="analytics-card glass-panel col-medium">
        <h3 className="card-title">Cases by Bucket</h3>
        <div className="chart-container relative flex items-center justify-center">
          <Doughnut options={donutOptions} data={donutData} />
          <div className="donut-center-text">
            <div className="donut-total">600</div>
            <div className="donut-label">Total</div>
          </div>
        </div>
      </div>

      <div className="analytics-card glass-panel col-medium">
        <h3 className="card-title">Top Agents (By Recovery)</h3>
        <div className="agents-list">
          {topAgents.map((agent, i) => (
            <div key={i} className="agent-item flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="agent-rank text-muted">#{agent.rank}</div>
                <div className="agent-avatar" style={{ backgroundColor: agent.color }}>{agent.initials}</div>
                <div className="agent-name">{agent.name}</div>
              </div>
              <div className="agent-amount font-semibold text-success">{agent.recovered}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
