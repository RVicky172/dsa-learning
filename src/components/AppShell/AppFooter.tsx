interface AppFooterProps {
  onNavigate: (section: string) => void;
}

const footerLinks = [
  { section: 'topics', label: 'Topics' },
  { section: 'big-o', label: 'Big O' },
  { section: 'problems', label: 'Problems' },
  { section: 'roadmap', label: 'Roadmap' },
  { section: 'subscription', label: 'Upgrade' },
];

const AppFooter = ({ onNavigate }: AppFooterProps) => {
  return (
    <footer className="container" style={{ borderTop: '1px solid var(--border-color)', paddingTop: '4rem', textAlign: 'center' }}>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '3rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
        {footerLinks.map((link) => (
          <a
            key={link.section}
            href={`#${link.section}`}
            onClick={(event) => {
              event.preventDefault();
              onNavigate(link.section);
            }}
            style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}
          >
            {link.label}
          </a>
        ))}
      </div>
      <p style={{ color: 'var(--text-muted)' }}>&copy; 2026 DSA Master. Designed for excellence.</p>
    </footer>
  );
};

export default AppFooter;
