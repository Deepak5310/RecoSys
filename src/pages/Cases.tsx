import { useState } from 'react';
import { useData } from '../context/DataContext';
import { CaseDetailsModal } from '../components/dashboard/CaseDetailsModal';

export function Cases() {
  const { rawData } = useData();
  const [selectedCase, setSelectedCase] = useState<any>(null);

  return (
    <div className="cases-page relative">
      <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', height: 'calc(100vh - 100px)' }}>
        <h2 className="card-title" style={{ marginBottom: '1.5rem' }}>All Cases Directory</h2>
        
        {rawData.length === 0 ? (
          <div className="text-center text-muted py-4">No data imported yet. Please go to the Dashboard and import the Excel file.</div>
        ) : (
          <div className="table-container" style={{ flex: 1, overflow: 'auto' }}>
            <table style={{ whiteSpace: 'nowrap' }}>
              <thead style={{ position: 'sticky', top: 0, background: 'var(--bg-panel-solid)', zIndex: 1 }}>
                <tr>
                  <th>Proposal No</th>
                  <th>Customer Name</th>
                  <th>Mobile</th>
                  <th>Total Due</th>
                  <th>Status</th>
                  <th>Agent (FOS)</th>
                  <th style={{ textAlign: 'right' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {rawData.map((row, idx) => (
                  <tr key={row['Proposal No'] || idx}>
                    <td className="text-muted">{row['Proposal No']}</td>
                    <td className="font-semibold">{row['Customer Name'] || '-'}</td>
                    <td>{row['Residence Phone'] || row['Reference Mobile'] || '-'}</td>
                    <td>₹ {(row['Total Due'] || row['POS'] || 0).toLocaleString('en-IN')}</td>
                    <td>
                      <span className={`badge ${row['Status'] === 'Resolve' ? 'badge-success' : 'badge-warning'}`}>
                        {row['Status'] || 'Pending'}
                      </span>
                    </td>
                    <td>{row['FOS'] || '-'}</td>
                    <td style={{ textAlign: 'right' }}>
                      <button 
                        className="btn btn-ghost btn-sm text-primary"
                        onClick={() => setSelectedCase(row)}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {selectedCase && (
        <CaseDetailsModal 
          caseData={selectedCase} 
          onClose={() => setSelectedCase(null)} 
        />
      )}
    </div>
  );
}
