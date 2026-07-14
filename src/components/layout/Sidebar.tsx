import React, { useRef } from 'react';
import { LayoutDashboard, FileSpreadsheet, Briefcase, Users, UserPlus } from 'lucide-react';
import * as xlsx from 'xlsx';
import './Sidebar.css';

const navItems = [
  { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard', active: true },
  { id: 'import', icon: FileSpreadsheet, label: 'Import Excel' },
  { id: 'cases', icon: Briefcase, label: 'Cases' },
  { id: 'allocation', icon: UserPlus, label: 'Allocation' },
  { id: 'agents', icon: Users, label: 'Agents' },
];

import { useData } from '../../context/DataContext';

export function Sidebar() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { setRawData, metrics } = useData();

  const handleNavClick = (id: string) => {
    console.log(`Sidebar clicked with id: ${id}`);
    if (id === 'import') {
      if (fileInputRef.current) {
        console.log('Triggering file input from Sidebar...');
        fileInputRef.current.click();
      } else {
        console.error('File input ref is null in Sidebar!');
      }
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = event.target?.result;
        const workbook = xlsx.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = xlsx.utils.sheet_to_json(worksheet);
        
        setRawData(jsonData);
        
        console.log('Imported Excel Data from Sidebar:', jsonData);
        alert(`Successfully imported ${jsonData.length} cases from ${file.name}`);
      } catch (error) {
        console.error('Error parsing Excel file:', error);
        alert('Failed to parse the Excel file.');
      }
      
      if (fileInputRef.current) fileInputRef.current.value = '';
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <>
      <input 
        type="file" 
        ref={fileInputRef} 
        style={{ position: 'absolute', left: '-9999px' }} 
        accept=".xlsx, .xls, .csv" 
        onChange={handleFileUpload} 
      />
      <aside className="sidebar">
        <div className="sidebar-nav">
          <ul className="nav-list">
            {navItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <li 
                  key={index} 
                  className={`nav-item ${item.active ? 'active' : ''}`}
                  onClick={() => handleNavClick(item.id)}
                >
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
                <span className="summary-val text-info">{metrics.newToday}</span>
              </li>
              <li>
                <span className="summary-label">Allocated</span>
                <span className="summary-val">{metrics.totalCases}</span>
              </li>
              <li>
                <span className="summary-label">Recovered</span>
                <span className="summary-val text-success">₹ {(metrics.recoveredAmount / 100000).toFixed(2)}L</span>
              </li>
              <li>
                <span className="summary-label">PTP</span>
                <span className="summary-val text-warning">{metrics.ptpCases}</span>
              </li>
              <li>
                <span className="summary-label">Pending</span>
                <span className="summary-val">{metrics.pendingCases}</span>
              </li>
            </ul>
          </div>
        </div>
      </aside>
    </>
  );
}
