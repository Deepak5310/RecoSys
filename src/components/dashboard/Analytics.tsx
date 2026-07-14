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
import { useData } from '../../context/DataContext';
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

export function Analytics() {
  const { metrics } = useData();

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

  const donutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '75%',
    plugins: {
      legend: { position: 'right' as const, labels: { color: '#94a3b8', usePointStyle: true } }
    }
  };

  const totalBucketItems = metrics.bucketData.datasets?.[0]?.data?.reduce((a: number, b: number) => a + b, 0) || 0;

  return (
    <div className="analytics-row">
      <div className="analytics-card glass-panel col-large">
        <h3 className="card-title">Recovery Overview</h3>
        <div className="chart-container">
          <Line options={lineOptions} data={metrics.lineChartData} />
        </div>
      </div>
      
      <div className="analytics-card glass-panel col-medium">
        <h3 className="card-title">Cases by Bucket</h3>
        <div className="chart-container relative flex items-center justify-center">
          <Doughnut options={donutOptions} data={metrics.bucketData} />
          <div className="donut-center-text">
            <div className="donut-total">{totalBucketItems}</div>
            <div className="donut-label">Total</div>
          </div>
        </div>
      </div>

      <div className="analytics-card glass-panel col-medium">
        <h3 className="card-title">Top Agents (By Recovery)</h3>
        <div className="agents-list">
          {metrics.topAgents.length === 0 ? (
            <div className="text-muted text-sm text-center py-4">No agent data found</div>
          ) : (
            metrics.topAgents.map((agent, i) => (
              <div key={i} className="agent-item flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="agent-rank text-muted">#{agent.rank}</div>
                  <div className="agent-avatar" style={{ backgroundColor: agent.color }}>{agent.initials}</div>
                  <div className="agent-name">{agent.name}</div>
                </div>
                <div className="agent-amount font-semibold text-success">{agent.recovered}</div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
