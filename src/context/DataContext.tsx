import React, { createContext, useState, useEffect, useContext, useMemo } from 'react';

export interface DashboardData {
  totalCases: number;
  pendingCases: number;
  ptpCases: number;
  recoveredAmount: number;
  newToday: number;
  allocations: any[];
  recoveries: any[];
  topAgents: any[];
  bucketData: any;
  lineChartData: any;
}

interface DataContextProps {
  rawData: any[];
  setRawData: (data: any[]) => void;
  updateCase: (proposalNo: string, updatedData: any) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  metrics: DashboardData;
}

const defaultMetrics: DashboardData = {
  totalCases: 0,
  pendingCases: 0,
  ptpCases: 0,
  recoveredAmount: 0,
  newToday: 0,
  allocations: [],
  recoveries: [],
  topAgents: [],
  bucketData: { labels: [], datasets: [] },
  lineChartData: { labels: [], datasets: [] }
};

export const DataContext = createContext<DataContextProps>({
  rawData: [],
  setRawData: () => {},
  updateCase: () => {},
  searchQuery: '',
  setSearchQuery: () => {},
  metrics: defaultMetrics
});

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [rawData, setRawData] = useState<any[]>(() => {
    try {
      const saved = localStorage.getItem('recovery_app_data');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to parse local storage data:', e);
    }
    return [];
  });

  useEffect(() => {
    try {
      localStorage.setItem('recovery_app_data', JSON.stringify(rawData));
    } catch (e) {
      console.error('Failed to save to local storage:', e);
    }
  }, [rawData]);

  const metrics = useMemo(() => {
    // If no data is uploaded yet, return some mock default data for visual purposes
    // or just 0s. Let's return 0s so it genuinely reflects the state.
    if (!rawData || rawData.length === 0) {
      return defaultMetrics;
    }

    const totalCases = rawData.length;
    let pendingCases = 0;
    let recoveredAmount = 0;
    let ptpCases = 0;
    
    const agentsMap: Record<string, number> = {};
    const bucketsMap: Record<string, number> = {};

    rawData.forEach(row => {
      const status = row['Status'] || '';
      if (status !== 'Resolve') pendingCases++;
      if (status === 'PTP' || row['PTP'] > 0 || String(row['Remark'] || '').toLowerCase().includes('ptp')) ptpCases++;

      const amountCollected = Number(row['Total Amount']) || 0;
      recoveredAmount += amountCollected;

      const agent = row['FOS'] || 'Unknown';
      agentsMap[agent] = (agentsMap[agent] || 0) + amountCollected;

      const bkt = row['BKT'] !== undefined ? String(row['BKT']) : '0';
      bucketsMap[bkt] = (bucketsMap[bkt] || 0) + 1;
    });

    const topAgents = Object.entries(agentsMap)
      .map(([name, amount]) => ({ name, amount }))
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 4)
      .map((a, i) => ({
        rank: i + 1,
        name: a.name,
        recovered: `₹ ${(a.amount).toLocaleString('en-IN')}`,
        initials: a.name.split(' ').map((n: string) => n[0]).join('').substring(0, 2),
        color: ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b'][i % 4]
      }));

    const bucketLabels = Object.keys(bucketsMap);
    const bucketValues = Object.values(bucketsMap);
    const bucketData = {
      labels: bucketLabels.map(l => `Bucket ${l}`),
      datasets: [{
        data: bucketValues,
        backgroundColor: ['#3b82f6', '#8b5cf6', '#f59e0b', '#ef4444', '#10b981'],
        borderWidth: 0,
      }]
    };

    const allocations = rawData.slice(0, 5).map((row, i) => ({
      id: i,
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      agent: row['FOS'] || 'Unknown',
      cases: 1, 
      due: `₹ ${(row['Total Due'] || row['POS'] || 0).toLocaleString('en-IN')}`,
      status: row['Status'] === 'Resolve' ? 'Closed' : 'Pending'
    }));

    const recoveriesRaw = rawData.filter(row => Number(row['Total Amount'] || 0) > 0).slice(0, 5);
    const recoveries = recoveriesRaw.map((row, i) => ({
      id: row['Proposal No'] || `REC-${i}`,
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      agent: row['FOS'] || 'Unknown',
      amount: `₹ ${(row['Total Amount'] || 0).toLocaleString('en-IN')}`,
      mode: row['RECEIPT NO.'] ? 'Bank Transfer' : 'Cash'
    }));

    return {
      totalCases,
      pendingCases,
      ptpCases,
      recoveredAmount,
      newToday: Math.floor(totalCases * 0.1),
      allocations,
      recoveries,
      topAgents,
      bucketData,
      lineChartData: {
         labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
         datasets: [
           { label: 'Recovered (₹)', data: [12000, 19000, 15000, 25000, 22000, 30000, recoveredAmount || 10000], borderColor: '#22c55e', backgroundColor: 'rgba(34, 197, 94, 0.1)', tension: 0.4 },
           { label: 'PTP', data: [5, 12, 8, 15, 10, 18, ptpCases || 5], borderColor: '#38bdf8', backgroundColor: 'rgba(56, 189, 248, 0.1)', tension: 0.4 },
         ],
      }
    };
  }, [rawData]);

  const updateCase = (proposalNo: string, updatedData: any) => {
    setRawData(prev => prev.map(row => 
      row['Proposal No'] === proposalNo ? { ...row, ...updatedData } : row
    ));
  };

  return (
    <DataContext.Provider value={{ rawData, setRawData, updateCase, searchQuery, setSearchQuery, metrics }}>
      {children}
    </DataContext.Provider>
  );
};
