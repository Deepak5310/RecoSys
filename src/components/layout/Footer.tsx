export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-left text-muted text-xs">
          &copy; {new Date().getFullYear()} Mahadev Enterprises. All rights reserved.
        </div>
        <div className="footer-right text-muted text-xs flex gap-4">
          <span>Privacy Policy</span>
          <span>Terms of Service</span>
          <span>Mahadev Enterprises v1.0.4</span>
        </div>
      </div>
    </footer>
  );
}
