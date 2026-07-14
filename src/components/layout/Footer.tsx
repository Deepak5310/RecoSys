

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-left">
        RecoverOS v1.0.4
      </div>
      <div className="footer-center">
        Last Sync: <span style={{ color: 'var(--text-main)' }}>Today, 10:15 AM</span>
      </div>
      <div className="footer-right">
        Logged in as: <span style={{ color: 'var(--text-main)', fontWeight: 500 }}>John Doe</span>
      </div>
    </footer>
  );
}
