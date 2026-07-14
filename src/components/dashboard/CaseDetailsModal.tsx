import { X } from 'lucide-react';
import './CaseDetailsModal.css';

interface CaseDetailsModalProps {
  caseData: any;
  onClose: () => void;
}

export function CaseDetailsModal({ caseData, onClose }: CaseDetailsModalProps) {
  if (!caseData) return null;

  const renderValue = (key: string, val: any) => {
    if (val === null || val === undefined || val === '') return '-';
    
    // Date formatting for Excel serial numbers
    if (typeof val === 'number' && val > 40000 && key.toLowerCase().includes('date')) {
      const date = new Date((val - (25567 + 2)) * 86400 * 1000);
      if (!isNaN(date.getTime())) {
        return date.toLocaleDateString('en-GB');
      }
    }

    if (key.toLowerCase().includes('amount') || key.toLowerCase().includes('due') || key === 'POS' || key === 'EMI ') {
      return `₹ ${Number(val).toLocaleString('en-IN')}`;
    }

    return String(val);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content slide-in-right glass-panel" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">
            Case Details
            <span className="text-muted text-sm" style={{ display: 'block', fontWeight: 'normal', marginTop: '4px' }}>
              {caseData['Proposal No']}
            </span>
          </h2>
          <button className="icon-btn" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <div className="modal-body">
          <div className="details-grid">
            {Object.keys(caseData).map(key => (
              <div key={key} className="detail-item">
                <div className="detail-label text-muted text-xs uppercase">{key}</div>
                <div className="detail-value fw-500">{renderValue(key, caseData[key])}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
