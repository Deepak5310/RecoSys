import { useData } from '../context/DataContext';

export function Cases() {
  const { rawData } = useData();

  return (
    <div className="cases-page">
      <div className="glass-panel" style={{ padding: '1.5rem' }}>
        <h2 className="card-title" style={{ marginBottom: '1.5rem' }}>All Cases Directory</h2>
        
        {rawData.length === 0 ? (
          <div className="text-center text-muted py-4">No data imported yet. Please go to the Dashboard and import the Excel file.</div>
        ) : (
          <div className="table-container" style={{ maxHeight: 'calc(100vh - 250px)', overflowY: 'auto' }}>
            <table>
              <thead style={{ position: 'sticky', top: 0, background: 'var(--bg-panel-solid)', zIndex: 1 }}>
                <tr>
                  <th>Proposal No</th>
                  <th>Customer Name</th>
                  <th>Total Due</th>
                  <th>EMI Received</th>
                  <th>Status</th>
                  <th>Agent (FOS)</th>
                </tr>
              </thead>
              <tbody>
                {rawData.map((row, idx) => (
                  <tr key={row['Proposal No'] || idx}>
                    <td className="text-muted">{row['Proposal No']}</td>
                    <td className="font-semibold">{row['Customer Name']}</td>
                    <td>₹ {(row['Total Due'] || row['POS'] || 0).toLocaleString('en-IN')}</td>
                    <td className="text-success">₹ {(row['EMI Received'] || 0).toLocaleString('en-IN')}</td>
                    <td>
                      <span className={`badge ${row['Status'] === 'Resolve' ? 'badge-success' : 'badge-warning'}`}>
                        {row['Status'] || 'Pending'}
                      </span>
                    </td>
                    <td>{row['FOS']}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
