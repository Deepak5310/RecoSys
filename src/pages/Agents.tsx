import { useData } from '../context/DataContext';

export function Agents() {
  const { rawData } = useData();

  // Compute agent metrics
  const agentsMap: Record<string, { totalAssigned: number; pendingCases: number; recoveredAmount: number }> = {};

  rawData.forEach(row => {
    const agent = row['FOS'] || 'Unknown';
    if (!agentsMap[agent]) {
      agentsMap[agent] = { totalAssigned: 0, pendingCases: 0, recoveredAmount: 0 };
    }
    
    agentsMap[agent].totalAssigned += 1;
    if (row['Status'] !== 'Resolve') {
      agentsMap[agent].pendingCases += 1;
    }
    
    agentsMap[agent].recoveredAmount += (Number(row['EMI Received']) || 0);
  });

  const agentStats = Object.entries(agentsMap).map(([name, stats]) => ({
    name,
    ...stats,
  })).sort((a, b) => b.recoveredAmount - a.recoveredAmount);

  return (
    <div className="agents-page">
      <div className="glass-panel" style={{ padding: '1.5rem' }}>
        <h2 className="card-title" style={{ marginBottom: '1.5rem' }}>Agent Performance</h2>
        
        {agentStats.length === 0 ? (
          <div className="text-center text-muted py-4">No data imported yet. Please go to the Dashboard and import the Excel file.</div>
        ) : (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Agent Name</th>
                  <th>Total Assigned Cases</th>
                  <th>Pending Cases</th>
                  <th>Total Recovered</th>
                </tr>
              </thead>
              <tbody>
                {agentStats.map((agent, index) => (
                  <tr key={agent.name}>
                    <td className="text-muted">#{index + 1}</td>
                    <td className="font-semibold flex items-center gap-2">
                      <div className="agent-avatar" style={{ backgroundColor: ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b'][index % 4], width: 28, height: 28, fontSize: '0.7rem' }}>
                        {agent.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                      </div>
                      {agent.name}
                    </td>
                    <td>{agent.totalAssigned}</td>
                    <td>{agent.pendingCases}</td>
                    <td className="text-success font-semibold">₹ {agent.recoveredAmount.toLocaleString('en-IN')}</td>
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
