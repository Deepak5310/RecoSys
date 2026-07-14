import { useState, useMemo } from 'react';
import { X, Search, CheckCircle } from 'lucide-react';
import { useData } from '../../context/DataContext';
import './QuickRecoveryModal.css';

interface QuickRecoveryModalProps {
  onClose: () => void;
}

export function QuickRecoveryModal({ onClose }: QuickRecoveryModalProps) {
  const { rawData, updateCase } = useData();
  const [search, setSearch] = useState('');
  const [selectedCase, setSelectedCase] = useState<any>(null);
  
  const [amount, setAmount] = useState('');
  const [status, setStatus] = useState('Resolve');
  const [remark, setRemark] = useState('');

  const searchResults = useMemo(() => {
    if (!search || search.length < 2) return [];
    const query = search.toLowerCase();
    return rawData.filter(row => {
      const name = String(row['Customer Name'] || '').toLowerCase();
      const proposal = String(row['Proposal No'] || '').toLowerCase();
      return name.includes(query) || proposal.includes(query);
    }).slice(0, 5); // Limit to 5 results for dropdown
  }, [search, rawData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCase) return;

    const currentTotal = Number(selectedCase['Total Amount']) || 0;
    const addedAmount = Number(amount) || 0;

    updateCase(selectedCase['Proposal No'], {
      'Total Amount': currentTotal + addedAmount,
      Status: status,
      Remark: remark,
      'RECEIPT NO.': 'QuickLog', // Mark as logged via quick action
    });

    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="quick-recovery-modal glass-panel" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">Log Recovery Payment</h2>
          <button className="icon-btn" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <div className="modal-body">
          {!selectedCase ? (
            <div className="search-section">
              <div className="search-input-wrapper">
                <Search size={18} className="search-icon text-muted" />
                <input
                  type="text"
                  placeholder="Search by Customer Name or Proposal No..."
                  className="modal-input with-icon"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  autoFocus
                />
              </div>
              
              {search.length >= 2 && (
                <div className="search-results">
                  {searchResults.length === 0 ? (
                    <div className="text-muted text-sm p-2 text-center">No cases found.</div>
                  ) : (
                    searchResults.map((row, idx) => (
                      <div 
                        key={idx} 
                        className="search-result-item"
                        onClick={() => setSelectedCase(row)}
                      >
                        <div className="fw-500">{row['Customer Name']}</div>
                        <div className="text-muted text-xs">{row['Proposal No']} • Due: ₹{(row['Total Due'] || row['POS'] || 0).toLocaleString('en-IN')}</div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="recovery-form">
              <div className="selected-case-card mb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="fw-600 m-0">{selectedCase['Customer Name']}</h3>
                    <div className="text-muted text-sm">{selectedCase['Proposal No']}</div>
                  </div>
                  <button type="button" className="text-primary text-sm underline" onClick={() => setSelectedCase(null)}>Change</button>
                </div>
                <div className="mt-3 flex justify-between items-center bg-dark rounded p-2">
                  <span className="text-sm text-muted">Total Due:</span>
                  <span className="fw-600 text-danger">₹ {(selectedCase['Total Due'] || selectedCase['POS'] || 0).toLocaleString('en-IN')}</span>
                </div>
              </div>

              <div className="form-group">
                <label className="text-sm text-muted mb-1 block">Amount Collected (₹)</label>
                <input 
                  type="number" 
                  className="modal-input" 
                  placeholder="Enter amount..."
                  value={amount}
                  onChange={e => setAmount(e.target.value)}
                  required
                  min="1"
                />
              </div>

              <div className="form-group mt-3">
                <label className="text-sm text-muted mb-1 block">New Status</label>
                <select 
                  className="modal-input" 
                  value={status}
                  onChange={e => setStatus(e.target.value)}
                >
                  <option value="Resolve">Resolve (Closed)</option>
                  <option value="Un-Resolved">Un-Resolved (Partial Payment)</option>
                  <option value="PTP">PTP (Promise to Pay)</option>
                </select>
              </div>

              <div className="form-group mt-3">
                <label className="text-sm text-muted mb-1 block">Remark (Optional)</label>
                <input 
                  type="text" 
                  className="modal-input" 
                  placeholder="E.g., Paid via cash, remaining next week..."
                  value={remark}
                  onChange={e => setRemark(e.target.value)}
                />
              </div>

              <button type="submit" className="btn btn-primary w-full mt-4 flex items-center justify-center gap-2">
                <CheckCircle size={18} /> Log Payment
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
