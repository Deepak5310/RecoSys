import { useState, useEffect } from 'react';
import { X, Edit2, Save } from 'lucide-react';
import { useData } from '../../context/DataContext';
import './CaseDetailsModal.css';

interface CaseDetailsModalProps {
  caseData: any;
  onClose: () => void;
}

export function CaseDetailsModal({ caseData, onClose }: CaseDetailsModalProps) {
  const { updateCase } = useData();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<any>({});

  useEffect(() => {
    if (caseData) {
      setFormData({ ...caseData });
    }
  }, [caseData]);

  if (!caseData) return null;

  const handleSave = () => {
    updateCase(caseData['Proposal No'], formData);
    setIsEditing(false);
  };

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
          <div>
            <h2 className="modal-title flex items-center gap-2">
              Case Details
              {isEditing && <span className="badge badge-warning">Edit Mode</span>}
            </h2>
            <span className="text-muted text-sm" style={{ display: 'block', fontWeight: 'normal', marginTop: '4px' }}>
              {caseData['Proposal No']}
            </span>
          </div>
          <div className="flex items-center gap-2">
            {!isEditing ? (
              <button className="btn btn-ghost btn-sm text-primary flex items-center gap-1" onClick={() => setIsEditing(true)}>
                <Edit2 size={16} /> Edit
              </button>
            ) : (
              <button className="btn btn-primary btn-sm flex items-center gap-1" onClick={handleSave}>
                <Save size={16} /> Save
              </button>
            )}
            <button className="icon-btn" onClick={onClose}>
              <X size={24} />
            </button>
          </div>
        </div>

        <div className="modal-body">
          <div className="details-grid">
            {Object.keys(formData).map(key => (
              <div key={key} className="detail-item">
                <div className="detail-label text-muted text-xs uppercase">{key}</div>
                {isEditing && key !== 'Proposal No' ? (
                  <input
                    type="text"
                    className="modal-input"
                    value={formData[key] !== null && formData[key] !== undefined ? formData[key] : ''}
                    onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                  />
                ) : (
                  <div className="detail-value fw-500">{renderValue(key, formData[key])}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
