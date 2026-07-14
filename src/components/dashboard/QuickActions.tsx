import React, { useRef, useState } from 'react';
import { UploadCloud, UserPlus, MessageCircle, DollarSign, FileText } from 'lucide-react';
import * as xlsx from 'xlsx';
import './Dashboard.css';

const actions = [
  { id: 'import', title: 'Import Excel', sub: 'Upload bulk data', icon: UploadCloud, color: '#3b82f6' },
  { id: 'allocate', title: 'Allocate Cases', sub: 'Assign to agents', icon: UserPlus, color: '#8b5cf6' },
  { id: 'whatsapp', title: 'WhatsApp to Agents', sub: 'Send daily summary', icon: MessageCircle, color: '#10b981' },
  { id: 'recovery', title: 'Recovery Update', sub: 'Log new payment', icon: DollarSign, color: '#f59e0b' },
  { id: 'reports', title: 'Reports', sub: 'Generate insights', icon: FileText, color: '#ef4444' },
];

import { useData } from '../../context/DataContext';
import { QuickRecoveryModal } from './QuickRecoveryModal';

export function QuickActions() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isRecoveryModalOpen, setIsRecoveryModalOpen] = useState(false);
  const { setRawData } = useData();

  const handleActionClick = (id: string) => {
    if (id === 'import') {
      if (fileInputRef.current) {
        fileInputRef.current.click();
      }
    } else if (id === 'recovery') {
      setIsRecoveryModalOpen(true);
    } else {
      console.log(`Action clicked: ${id}`);
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
        
        console.log('Imported Excel Data:', jsonData);
        alert(`Successfully imported ${jsonData.length} cases from ${file.name}`);
      } catch (error) {
        console.error('Error parsing Excel file:', error);
        alert('Failed to parse the Excel file.');
      }
      
      // Reset input so the same file can be uploaded again if needed
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
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
      <div className="actions-row">
        {actions.map((action, i) => {
          const Icon = action.icon;
          return (
            <button 
              key={i} 
              className="action-card glass-panel text-left" 
              onClick={() => handleActionClick(action.id)}
            >
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

      {isRecoveryModalOpen && (
        <QuickRecoveryModal onClose={() => setIsRecoveryModalOpen(false)} />
      )}
    </>
  );
}
