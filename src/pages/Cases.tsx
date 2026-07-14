import { useMemo } from 'react';
import { useData } from '../context/DataContext';

export function Cases() {
  const { rawData } = useData();

  // Extract all unique columns from the data
  const columns = useMemo(() => {
    if (rawData.length === 0) return [];
    // Get all keys from the first object
    return Object.keys(rawData[0]);
  }, [rawData]);

  return (
    <div className="cases-page">
      <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', height: 'calc(100vh - 100px)' }}>
        <h2 className="card-title" style={{ marginBottom: '1.5rem' }}>All Cases Directory</h2>
        
        {rawData.length === 0 ? (
          <div className="text-center text-muted py-4">No data imported yet. Please go to the Dashboard and import the Excel file.</div>
        ) : (
          <div className="table-container" style={{ flex: 1, overflow: 'auto' }}>
            <table style={{ whiteSpace: 'nowrap' }}>
              <thead style={{ position: 'sticky', top: 0, background: 'var(--bg-panel-solid)', zIndex: 1 }}>
                <tr>
                  {columns.map((col) => (
                    <th key={col}>{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rawData.map((row, idx) => (
                  <tr key={row['Proposal No'] || idx}>
                    {columns.map((col) => {
                      let val = row[col];
                      
                      // Format Excel Date serial numbers (roughly > 40000)
                      if (typeof val === 'number' && val > 40000 && (col.toLowerCase().includes('date'))) {
                        // Excel dates are days since Dec 30 1899
                        const date = new Date((val - (25567 + 2)) * 86400 * 1000);
                        if (!isNaN(date.getTime())) {
                          val = date.toLocaleDateString();
                        }
                      }
                      
                      return (
                        <td key={col}>{val !== undefined && val !== null ? String(val) : '-'}</td>
                      );
                    })}
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
