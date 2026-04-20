import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers, Zap, Code, Box, ChevronRight, Menu, X, Sun, Moon, User, LogIn, LogOut, ShieldCheck, Crown } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import { useAuth } from '../hooks/useAuth';
import './Navbar.css';

interface NavbarProps {
  onNavigate?: (section: string) => void;
  activeSection?: string;
}

const NavbarRedesigned: React.FC<NavbarProps> = ({ onNavigate, activeSection }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { isAuthenticated, isAdmin, user, signOut } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'topics', label: 'Topics', icon: Layers },
    { id: 'big-o', label: 'Big O', icon: Zap },
    { id: 'problems', label: 'Problems', icon: Code },
    { id: 'roadmap', label: 'Roadmap', icon: Box },
    { id: 'subscription', label: 'Upgrade', icon: Crown },
  ];

  const containerVariants = {
    initial: { y: -100, opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { duration: 0.6 } }
  };

  const navItemVariants = {
    hover: {
      color: 'var(--primary-color)',
      transition: { duration: 0.2 }
    }
  };

  const handleClick = (sectionId: string) => {
    onNavigate?.(sectionId);
    setIsMobileMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleSignOut = async () => {
    await signOut();
    onNavigate?.('home');
  };

  return (
    <motion.header
      variants={containerVariants}
      initial="initial"
      animate="animate"
      className={`navbar-container ${isScrolled ? 'is-scrolled' : ''}`}
    >
      <nav className="navbar-glass">
        {/* Logo Section */}
        <div className="navbar-logo" onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); onNavigate?.('home'); }}>
          <motion.div
            className="logo-icon"
            whileHover={{ scale: 1.05, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            <Layers size={20} color="white" />
            <motion.div
              className="logo-shine"
              animate={{
                left: ['-100%', '100%'],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear",
                repeatDelay: 3
              }}
              style={{
                position: 'absolute',
                top: 0,
                width: '50%',
                height: '100%',
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                transform: 'skewX(-20deg)'
              }}
            />
          </motion.div>
          <span className="logo-text">DSA Master</span>
        </div>

        {/* Desktop Navigation */}
        <ul className="nav-links">
          {navItems.map((item) => (
            <li key={item.id}>
              <motion.button
                onClick={() => handleClick(item.id)}
                className={`nav-item-btn ${activeSection === item.id ? 'active' : ''}`}
                variants={navItemVariants}
                whileHover="hover"
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <item.icon size={16} />
                {item.label}
              </motion.button>
            </li>
          ))}

          <li>
            <motion.button
              className="learn-btn"
              onClick={() => handleClick('topics')}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <span>Start Learning</span>
              <motion.div
                initial={{ x: 0 }}
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronRight size={16} />
              </motion.div>
            </motion.button>
          </li>

          {isAuthenticated ? (
            <>
              {isAdmin ? (
                <li>
                  <motion.button
                    onClick={() => handleClick('admin')}
                    className={`nav-item-btn ${activeSection === 'admin' ? 'active' : ''}`}
                    variants={navItemVariants}
                    whileHover="hover"
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <ShieldCheck size={16} />
                    Admin
                  </motion.button>
                </li>
              ) : null}
              <li>
                <motion.button
                  onClick={() => handleClick('profile')}
                  className={`nav-item-btn ${activeSection === 'profile' ? 'active' : ''}`}
                  variants={navItemVariants}
                  whileHover="hover"
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  title={user?.displayName}
                >
                  <User size={16} />
                  Profile
                </motion.button>
              </li>
              <li>
                <motion.button
                  onClick={handleSignOut}
                  className="auth-action-btn"
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <LogOut size={15} />
                  Logout
                </motion.button>
              </li>
            </>
          ) : (
            <li>
              <motion.button
                onClick={() => handleClick('login')}
                className="auth-action-btn"
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.98 }}
              >
                <LogIn size={15} />
                Login
              </motion.button>
            </li>
          )}

          <li>
            <motion.button
              className="theme-toggle"
              onClick={toggleTheme}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.92 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              <motion.div
                initial={{ rotate: 0 }}
                whileHover={{ rotate: 20 }}
                transition={{ duration: 0.3 }}
              >
                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              </motion.div>
            </motion.button>
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <div className="mobile-actions">
          <button className="mobile-menu-toggle theme-only" onClick={toggleTheme}>
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button
            className="mobile-menu-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

      </nav>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="mobile-dropdown"
          >
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleClick(item.id)}
                className={`mobile-nav-item ${activeSection === item.id ? 'active' : ''}`}
              >
                <item.icon size={18} />
                {item.label}
              </button>
            ))}
            <button
              className="learn-btn"
              onClick={() => handleClick('topics')}
              style={{ marginTop: '0.5rem', width: '100%', justifyContent: 'center', marginLeft: 0 }}
            >
              Start Learning <ChevronRight size={16} />
            </button>
            {isAuthenticated ? (
              <>
                {isAdmin ? (
                  <button
                    onClick={() => handleClick('admin')}
                    className={`mobile-nav-item ${activeSection === 'admin' ? 'active' : ''}`}
                  >
                    <ShieldCheck size={18} />
                    Admin
                  </button>
                ) : null}
                <button
                  onClick={() => handleClick('profile')}
                  className={`mobile-nav-item ${activeSection === 'profile' ? 'active' : ''}`}
                >
                  <User size={18} />
                  Profile
                </button>
                <button
                  onClick={handleSignOut}
                  className="mobile-nav-item"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </>
            ) : (
              <button
                onClick={() => handleClick('login')}
                className={`mobile-nav-item ${activeSection === 'login' ? 'active' : ''}`}
              >
                <LogIn size={18} />
                Login
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default NavbarRedesigned;

