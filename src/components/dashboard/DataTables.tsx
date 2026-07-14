import { useData } from '../../context/DataContext';
import './Dashboard.css';

export function DataTables() {
  const { metrics } = useData();

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'Closed': return <span className="badge badge-success">{status}</span>;
      case 'Pending': return <span className="badge badge-warning">{status}</span>;
      default: return <span className="badge">{status}</span>;
    }
  };

  const getModeBadge = (mode: string) => {
    switch(mode) {
      case 'UPI': return <span className="badge badge-info">{mode}</span>;
      case 'Cash': return <span className="badge badge-success">{mode}</span>;
      case 'Bank Transfer': return <span className="badge" style={{ background: 'var(--bg-hover)' }}>{mode}</span>;
      default: return <span className="badge">{mode}</span>;
    }
  };

  return (
    <div className="tables-row">
      <div className="table-card glass-panel flex-1">
        <h3 className="card-title">Recent Allocations</h3>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Agent</th>
                <th>Cases Allocated</th>
                <th>Total Due</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {metrics.allocations.length === 0 ? (
                <tr><td colSpan={5} className="text-center text-muted">No data available</td></tr>
              ) : (
                metrics.allocations.map(row => (
                  <tr key={row.id}>
                    <td>{row.date}</td>
                    <td>{row.agent}</td>
                    <td>{row.cases}</td>
                    <td className="font-semibold">{row.due}</td>
                    <td>{getStatusBadge(row.status)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="table-footer">
          <button className="btn btn-ghost w-full">View All Allocations</button>
        </div>
      </div>

      <div className="table-card glass-panel flex-1">
        <h3 className="card-title">Recent Recovery Updates</h3>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Agent</th>
                <th>Case ID</th>
                <th>Received Amount</th>
                <th>Mode</th>
              </tr>
            </thead>
            <tbody>
              {metrics.recoveries.length === 0 ? (
                <tr><td colSpan={5} className="text-center text-muted">No data available</td></tr>
              ) : (
                metrics.recoveries.map(row => (
                  <tr key={row.id}>
                    <td>{row.date}</td>
                    <td>{row.agent}</td>
                    <td className="text-muted">{row.id}</td>
                    <td className="font-semibold text-success">{row.amount}</td>
                    <td>{getModeBadge(row.mode)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="table-footer">
          <button className="btn btn-ghost w-full">View All Recoveries</button>
        </div>
      </div>
    </div>
  );
}
