import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers, Zap, Code, Box, ChevronRight, Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

interface NavbarProps {
  onNavigate?: (section: string) => void;
  activeSection?: string;
}

const NavbarRedesigned: React.FC<NavbarProps> = ({ onNavigate, activeSection }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const [isScrolled, setIsScrolled] = useState(false);

  const navItems = [
    { id: 'topics', label: 'Topics', icon: Layers },
    { id: 'big-o', label: 'Big O', icon: Zap },
    { id: 'problems', label: 'Problems', icon: Code },
    { id: 'roadmap', label: 'Roadmap', icon: Box },
  ];

  const handleClick = (sectionId: string) => {
    onNavigate?.(sectionId);
    setIsMobileMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-4 left-8 right-8 z-50 futuristic-navbar ${isScrolled ? 'is-scrolled' : ''}`}
      style={{
        background: theme === 'dark'
          ? 'rgba(10, 17, 40, 0.9)'
          : 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        borderRadius: '16px',
        border: `1px solid ${theme === 'dark' ? 'rgba(139, 92, 246, 0.3)' : 'rgba(236, 253, 255, 0.3)'}`,
        boxShadow: theme === 'dark'
          ? '0 4px 32px rgba(0, 0, 0, 0.3)'
          : '0 4px 32px rgba(139, 92, 246, 0.15)',
        padding: '0.75rem 1.5rem'
      }}
    >
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {/* Logo Section */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            cursor: 'pointer'
          }}
          onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); onNavigate?.('home'); }}
        >
          <motion.div
            style={{
              background: 'linear-gradient(135deg, #7c3aed, #8b5cf6, #14b8a6)',
              width: '42px',
              height: '42px',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 8px 16px rgba(139, 92, 246, 0.3)',
              position: 'relative',
              overflow: 'hidden'
            }}
            whileHover={{ scale: 1.05, rotate: 5 }}
          >
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3), transparent)',
              pointerEvents: 'none'
            }} />
            <Layers size={20} color="white" />
          </motion.div>
          <h1 style={{
            fontSize: '1.4rem',
            fontWeight: '800',
            margin: 0,
            background: 'linear-gradient(135deg, #7c3aed, #14b8a6)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            filter: 'drop-shadow(0 0 12px rgba(139, 92, 246, 0.5))'
          }}>
            DSA Master
          </h1>
        </div>

        {/* Desktop Navigation */}
        <ul style={{ display: 'flex', gap: '0.25rem', listStyle: 'none', alignItems: 'center' }}>
          {navItems.map((item) => (
            <li key={item.id}>
              <motion.button
                onClick={() => handleClick(item.id)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: item.id === 'topics' ? 0 : item.id === 'big-o' ? 0.1 : 0.2 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.6rem 1rem',
                  borderRadius: '12px',
                  fontSize: '0.9rem',
                  fontWeight: activeSection === item.id ? '600' : '500',
                  color: activeSection === item.id || theme === 'dark'
                    ? '#7c3aed'
                    : activeSection === item.id
                      ? '#7c3aed'
                      : '#475569',
                  background: activeSection === item.id
                    ? 'linear-gradient(135deg, rgba(124, 58, 237, 0.1), rgba(20, 184, 166, 0.08))'
                    : 'transparent',
                  border: activeSection === item.id
                    ? '1px solid rgba(124, 58, 237, 0.3)'
                    : '1px solid transparent',
                  boxShadow: activeSection === item.id
                    ? '0 4px 12px rgba(124, 58, 237, 0.2), inset 0 1px 0 rgba(255,255,255,0.1)'
                    : 'none',
                  transition: 'all 0.2s ease'
                }}
              >
                <item.icon size={16} />
                {item.label}
                {activeSection === item.id && (
                  <motion.div
                    layoutId="active-indicator"
                    style={{
                      width: '4px',
                      height: '4px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #7c3aed, #14b8a6)',
                      marginLeft: 'auto'
                    }}
                  />
                )}
              </motion.button>
            </li>
          ))}

          {/* Start Learning Button */}
          <li>
            <motion.button
              onClick={() => handleClick('topics')}
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              style={{
                background: 'linear-gradient(135deg, #7c3aed 0%, #14b8a6 100%)',
                color: '#ffffff',
                padding: '0.7rem 1.4rem',
                borderRadius: '12px',
                fontWeight: '700',
                fontSize: '0.85rem',
                border: 'none',
                boxShadow: '0 6px 20px rgba(124, 58, 237, 0.3)',
                transition: 'all 0.2s ease',
                letterSpacing: '0.2px'
              }}
            >
              Start Learning <ChevronRight size={16} />
            </motion.button>
          </li>

          {/* Theme Toggle */}
          <li>
            <motion.button
              onClick={() => onNavigate?.('home')}
              whileHover={{ rotate: 15, scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              style={{
                background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.2), rgba(20, 184, 166, 0.1))',
                border: '1px solid rgba(124, 58, 237, 0.3)',
                color: theme === 'dark' ? '#f1f5f9' : '#334155',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: '0 4px 12px rgba(124, 58, 237, 0.2)'
              }}
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </motion.button>
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <div style={{ display: 'none', gap: '0.5rem', alignItems: 'center' }}>
          <motion.button
            onClick={() => {
              onNavigate?.('home');
              setIsMobileMenuOpen(false);
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            style={{
              background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.2), rgba(20, 184, 166, 0.1))',
              border: '1px solid rgba(124, 58, 237, 0.3)',
              color: '#e2e8f0',
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            <Sun size={16} />
          </motion.button>
          <motion.button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              background: 'rgba(139, 92, 246, 0.1)',
              border: '1px solid rgba(124, 58, 237, 0.2)',
              color: '#e2e8f0',
              padding: '0.5rem',
              borderRadius: '10px',
              cursor: 'pointer'
            }}
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </motion.button>
        </div>
      </nav>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            style={{
              borderTop: '1px solid rgba(124, 58, 237, 0.1)',
              paddingTop: '1rem'
            }}
          >
            <ul style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem',
              listStyle: 'none',
              padding: 0,
              margin: 0
            }}>
              {navItems.map((item) => (
                <motion.li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => { e.preventDefault(); handleClick(item.id); }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      fontSize: '1.05rem',
                      fontWeight: activeSection === item.id ? '600' : '500',
                      color: theme === 'dark' ? '#e2e8f0' : '#334155',
                      padding: '0.7rem 1rem',
                      borderRadius: '12px',
                      transition: 'all 0.2s ease',
                      background: activeSection === item.id
                        ? 'linear-gradient(135deg, rgba(124, 58, 237, 0.15), rgba(20, 184, 166, 0.1))'
                        : 'transparent',
                      border: activeSection === item.id
                        ? '1px solid rgba(124, 58, 237, 0.3)'
                        : 'none',
                      textDecoration: 'none'
                    }}
                  >
                    <item.icon size={18} />
                    {item.label}
                    {activeSection === item.id && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        style={{
                          width: '6px',
                          height: '6px',
                          borderRadius: '50%',
                          background: 'linear-gradient(135deg, #7c3aed, #14b8a6)',
                          marginLeft: 'auto'
                        }}
                      />
                    )}
                  </a>
                </motion.li>
              ))}
              <motion.li style={{ marginTop: '0.5rem' }}>
                <motion.button
                  onClick={() => handleClick('topics')}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    background: 'linear-gradient(135deg, #7c3aed 0%, #14b8a6 100%)',
                    color: '#ffffff',
                    padding: '0.9rem 2rem',
                    borderRadius: '12px',
                    fontWeight: '700',
                    fontSize: '1rem',
                    border: 'none',
                    cursor: 'pointer',
                    boxShadow: '0 8px 24px rgba(124, 58, 237, 0.3)',
                    width: '100%',
                    textShadow: '0 2px 4px rgba(0,0,0,0.2)'
                  }}
                >
                  Start Learning <ChevronRight size={16} />
                </motion.button>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default NavbarRedesigned;
