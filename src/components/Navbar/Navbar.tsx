import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers, Zap, Code, Box, ChevronRight, Menu, X, Sun, Moon, User, LogIn, LogOut, ShieldCheck, Crown } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import { useAuth } from '../../hooks/useAuth';
import styles from './Navbar.module.css';

interface NavbarProps {
  onNavigate?: (section: string) => void;
  activeSection?: string;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate, activeSection }) => {
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
    animate: { y: 0, opacity: 1, transition: { duration: 0.6 } },
  };

  const navItemVariants = {
    hover: {
      color: 'var(--primary-color)',
      transition: { duration: 0.2 },
    },
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
        behavior: 'smooth',
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
      className={`${styles.container} ${isScrolled ? styles.isScrolled : ''}`}
    >
      <nav className={styles.glass}>
        {/* Logo Section */}
        <div
          className={styles.logo}
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            onNavigate?.('home');
          }}
        >
          <motion.div
            className={styles.logoIcon}
            whileHover={{ scale: 1.05, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            <Layers size={20} color="white" />
            <motion.div
              className={styles.logoShine}
              animate={{
                left: ['-100%', '100%'],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'linear',
                repeatDelay: 3,
              }}
            />
          </motion.div>
          <span className={styles.logoText}>DSA Master</span>
        </div>

        {/* Desktop Navigation */}
        <ul className={styles.links}>
          {navItems.map((item) => (
            <li key={item.id}>
              <motion.button
                onClick={() => handleClick(item.id)}
                className={`${styles.navItem} ${activeSection === item.id ? styles.active : ''}`}
                variants={navItemVariants}
                whileHover="hover"
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              >
                <item.icon size={16} />
                {item.label}
              </motion.button>
            </li>
          ))}
        </ul>

        {/* Right-side actions */}
        <div className={styles.actions}>
          <motion.button
            className={styles.learnBtn}
            onClick={() => handleClick('topics')}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
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

          <div className={styles.divider} />

          {isAuthenticated ? (
            <>
              {isAdmin ? (
                <motion.button
                  onClick={() => handleClick('admin')}
                  className={`${styles.navItem} ${activeSection === 'admin' ? styles.active : ''}`}
                  variants={navItemVariants}
                  whileHover="hover"
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                >
                  <ShieldCheck size={16} />
                  Admin
                </motion.button>
              ) : null}
              <motion.button
                onClick={() => handleClick('profile')}
                className={`${styles.navItem} ${activeSection === 'profile' ? styles.active : ''}`}
                variants={navItemVariants}
                whileHover="hover"
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                title={user?.displayName}
              >
                <User size={16} />
                Profile
              </motion.button>
              <motion.button
                onClick={handleSignOut}
                className={styles.authBtn}
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.98 }}
              >
                <LogOut size={15} />
                Logout
              </motion.button>
            </>
          ) : (
            <motion.button
              onClick={() => handleClick('login')}
              className={styles.authBtn}
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.98 }}
            >
              <LogIn size={15} />
              Login
            </motion.button>
          )}

          <motion.button
            className={styles.themeToggle}
            onClick={toggleTheme}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.92 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
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
        </div>

        {/* Mobile Menu Button */}
        <div className={styles.mobileActions}>
          <button className={`${styles.mobileMenuToggle} ${styles.themeOnly}`} onClick={toggleTheme}>
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button
            className={styles.mobileMenuToggle}
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
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className={styles.mobileDropdown}
          >
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleClick(item.id)}
                className={`${styles.mobileNavItem} ${activeSection === item.id ? styles.active : ''}`}
              >
                <item.icon size={18} />
                {item.label}
              </button>
            ))}
            <button
              className={styles.learnBtn}
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
                    className={`${styles.mobileNavItem} ${activeSection === 'admin' ? styles.active : ''}`}
                  >
                    <ShieldCheck size={18} />
                    Admin
                  </button>
                ) : null}
                <button
                  onClick={() => handleClick('profile')}
                  className={`${styles.mobileNavItem} ${activeSection === 'profile' ? styles.active : ''}`}
                >
                  <User size={18} />
                  Profile
                </button>
                <button onClick={handleSignOut} className={styles.mobileNavItem}>
                  <LogOut size={18} />
                  Logout
                </button>
              </>
            ) : (
              <button
                onClick={() => handleClick('login')}
                className={`${styles.mobileNavItem} ${activeSection === 'login' ? styles.active : ''}`}
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

export default Navbar;
