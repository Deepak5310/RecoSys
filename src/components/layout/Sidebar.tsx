
import { LayoutDashboard, FileSpreadsheet, Briefcase, Users, UserPlus } from 'lucide-react';
import './Sidebar.css';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', active: true },
  { icon: FileSpreadsheet, label: 'Import Excel' },
  { icon: Briefcase, label: 'Cases' },
  { icon: UserPlus, label: 'Allocation' },
  { icon: Users, label: 'Agents' },
];

export function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-nav">
        <ul className="nav-list">
          {navItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <li key={index} className={`nav-item ${item.active ? 'active' : ''}`}>
                <Icon size={18} className="nav-icon" />
                <span className="nav-label">{item.label}</span>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="sidebar-bottom">
        <div className="summary-block glass-panel">
          <h3 className="summary-title">Today's Summary</h3>
          <ul className="summary-list">
            <li>
              <span className="summary-label">New Cases</span>
              <span className="summary-val text-info">142</span>
            </li>
            <li>
              <span className="summary-label">Allocated</span>
              <span className="summary-val">120</span>
            </li>
            <li>
              <span className="summary-label">Recovered</span>
              <span className="summary-val text-success">₹ 4.2L</span>
            </li>
            <li>
              <span className="summary-label">PTP</span>
              <span className="summary-val text-warning">45</span>
            </li>
            <li>
              <span className="summary-label">Payments</span>
              <span className="summary-val">18</span>
            </li>
          </ul>
        </div>
      </div>
    </aside>
  );
}
