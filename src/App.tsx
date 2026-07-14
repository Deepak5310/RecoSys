
import { Layout } from './components/layout/Layout';
import { StatCards } from './components/dashboard/StatCards';
import { Analytics } from './components/dashboard/Analytics';
import { DataTables } from './components/dashboard/DataTables';
import { QuickActions } from './components/dashboard/QuickActions';

function App() {
  return (
    <Layout>
      <StatCards />
      <Analytics />
      <DataTables />
      <QuickActions />
    </Layout>
  );
}

export default App;
