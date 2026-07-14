
import { Layout } from './components/layout/Layout';
import { StatCards } from './components/dashboard/StatCards';
import { Analytics } from './components/dashboard/Analytics';
import { DataTables } from './components/dashboard/DataTables';
import { QuickActions } from './components/dashboard/QuickActions';

import { DataProvider } from './context/DataContext';

function App() {
  return (
    <DataProvider>
      <Layout>
        <StatCards />
        <Analytics />
        <DataTables />
        <QuickActions />
      </Layout>
    </DataProvider>
  );
}

export default App;
