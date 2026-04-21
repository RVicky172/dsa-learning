const LoadingSpinner = () => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '40vh',
      flexDirection: 'column',
      gap: '1rem',
    }}
  >
    <div
      style={{
        width: '40px',
        height: '40px',
        border: '3px solid var(--border-color)',
        borderTop: '3px solid var(--primary-color)',
        borderRadius: '50%',
        animation: 'spin 0.8s linear infinite',
      }}
    />
    <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>Loading...</p>
  </div>
);

export default LoadingSpinner;
