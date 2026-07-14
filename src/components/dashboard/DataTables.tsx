
import './Dashboard.css';

const allocations = [
  { id: 1, date: '14 Jul 2026', agent: 'Alice Smith', cases: 45, due: '₹ 12.5L', status: 'Allocated' },
  { id: 2, date: '14 Jul 2026', agent: 'Bob Johnson', cases: 30, due: '₹ 8.2L', status: 'Pending' },
  { id: 3, date: '13 Jul 2026', agent: 'Charlie Davis', cases: 50, due: '₹ 15.0L', status: 'Allocated' },
  { id: 4, date: '13 Jul 2026', agent: 'Diana Prince', cases: 25, due: '₹ 6.4L', status: 'Pending' },
];

const recoveries = [
  { id: 'REC-1042', date: '14 Jul 2026', agent: 'Alice Smith', amount: '₹ 45,000', mode: 'UPI' },
  { id: 'REC-1043', date: '14 Jul 2026', agent: 'Charlie Davis', amount: '₹ 12,500', mode: 'Cash' },
  { id: 'REC-1044', date: '14 Jul 2026', agent: 'Bob Johnson', amount: '₹ 50,000', mode: 'Bank Transfer' },
  { id: 'REC-1045', date: '13 Jul 2026', agent: 'Alice Smith', amount: '₹ 25,000', mode: 'UPI' },
];

export function DataTables() {
  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'Allocated': return <span className="badge badge-success">{status}</span>;
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
              {allocations.map(row => (
                <tr key={row.id}>
                  <td>{row.date}</td>
                  <td>{row.agent}</td>
                  <td>{row.cases}</td>
                  <td className="font-semibold">{row.due}</td>
                  <td>{getStatusBadge(row.status)}</td>
                </tr>
              ))}
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
              {recoveries.map(row => (
                <tr key={row.id}>
                  <td>{row.date}</td>
                  <td>{row.agent}</td>
                  <td className="text-muted">{row.id}</td>
                  <td className="font-semibold text-success">{row.amount}</td>
                  <td>{getModeBadge(row.mode)}</td>
                </tr>
              ))}
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
