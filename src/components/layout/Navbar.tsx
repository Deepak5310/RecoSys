
import { Search, Bell } from 'lucide-react';
import './Navbar.css';

export function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-left flex items-center gap-2">
        <div className="logo-icon">ME</div>
        <h1 className="logo-text">Mahadev Enterprises</h1>
      </div>
      
      <div className="navbar-center flex items-center">
        <div className="search-container">
          <Search size={18} className="search-icon" />
          <input 
            type="text" 
            placeholder="Search Customer, Proposal No, Mobile..." 
            className="search-input"
          />
        </div>
      </div>

      <div className="navbar-right flex items-center gap-4">
        <button className="icon-btn relative">
          <Bell size={20} />
          <span className="notification-badge"></span>
        </button>
        <div className="user-profile flex items-center gap-2 cursor-pointer">
          <div className="avatar bg-primary flex items-center justify-center rounded-full text-sm">
            DK
          </div>
          <div className="user-details">
            <div className="user-name text-sm fw-600">Deepak</div>
            <div className="user-role text-xs text-muted">Super Admin</div>
          </div>
        </div>
      </div>
    </header>
  );
}
