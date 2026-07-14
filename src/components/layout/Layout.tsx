
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';
import { Footer } from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="layout-wrapper">
      <Sidebar />
      <div className="main-wrapper">
        <Navbar />
        <main className="main-content">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
}
