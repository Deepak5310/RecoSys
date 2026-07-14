import { useState, useMemo } from 'react';
import { useData } from '../context/DataContext';
import { CaseDetailsModal } from '../components/dashboard/CaseDetailsModal';

export function Cases() {
  const { rawData, searchQuery } = useData();
  const [selectedCase, setSelectedCase] = useState<any>(null);

  const filteredData = useMemo(() => {
    if (!searchQuery) return rawData;
    
    const query = searchQuery.toLowerCase();
    return rawData.filter(row => {
      const name = String(row['Customer Name'] || '').toLowerCase();
      const proposal = String(row['Proposal No'] || '').toLowerCase();
      const mobile1 = String(row['Residence Phone'] || '').toLowerCase();
      const mobile2 = String(row['Reference Mobile'] || '').toLowerCase();
      
      return name.includes(query) || proposal.includes(query) || mobile1.includes(query) || mobile2.includes(query);
    });
  }, [rawData, searchQuery]);

  return (
    <div className="cases-page relative">
      <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', height: 'calc(100vh - 100px)' }}>
        <div className="flex items-center justify-between" style={{ marginBottom: '1.5rem' }}>
          <h2 className="card-title m-0">All Cases Directory</h2>
          {searchQuery && (
            <div className="badge badge-primary">Found {filteredData.length} results for "{searchQuery}"</div>
          )}
        </div>
        
        {rawData.length === 0 ? (
          <div className="text-center text-muted py-4">No data imported yet. Please go to the Dashboard and import the Excel file.</div>
        ) : filteredData.length === 0 ? (
          <div className="text-center text-muted py-4">No cases match your search query.</div>
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
                {filteredData.map((row, idx) => (
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
