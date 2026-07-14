
import { UploadCloud, UserPlus, MessageCircle, DollarSign, FileText } from 'lucide-react';
import './Dashboard.css';

const actions = [
  { title: 'Import Excel', sub: 'Upload bulk data', icon: UploadCloud, color: '#3b82f6' },
  { title: 'Allocate Cases', sub: 'Assign to agents', icon: UserPlus, color: '#8b5cf6' },
  { title: 'WhatsApp to Agents', sub: 'Send daily summary', icon: MessageCircle, color: '#10b981' },
  { title: 'Recovery Update', sub: 'Log new payment', icon: DollarSign, color: '#f59e0b' },
  { title: 'Reports', sub: 'Generate insights', icon: FileText, color: '#ef4444' },
];

export function QuickActions() {
  return (
    <div className="actions-row">
      {actions.map((action, i) => {
        const Icon = action.icon;
        return (
          <button key={i} className="action-card glass-panel text-left">
            <div className="action-icon" style={{ backgroundColor: `${action.color}20`, color: action.color }}>
              <Icon size={24} />
            </div>
            <div className="action-content">
              <h4 className="action-title">{action.title}</h4>
              <p className="action-sub">{action.sub}</p>
            </div>
          </button>
        );
      })}
    </div>
  );
}
