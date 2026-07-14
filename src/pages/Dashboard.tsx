import { StatCards } from '../components/dashboard/StatCards';
import { Analytics } from '../components/dashboard/Analytics';
import { DataTables } from '../components/dashboard/DataTables';
import { QuickActions } from '../components/dashboard/QuickActions';

export function Dashboard() {
  return (
    <>
      <StatCards />
      <Analytics />
      <DataTables />
      <QuickActions />
    </>
  );
}
