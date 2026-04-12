import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Box, Code, Layers, Zap, Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

interface NavbarProps {
    onNavigate: (section: string) => void;
    activeSection: string;
}

const Navbar = ({ onNavigate, activeSection }: NavbarProps) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const { theme, toggleTheme } = useTheme();

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const navItems = [
        { id: 'topics', label: 'Topics', icon: Layers },
        { id: 'big-o', label: 'Big O', icon: Zap },
        { id: 'problems', label: 'Problems', icon: Code },
        { id: 'roadmap', label: 'Roadmap', icon: Box },
    ];

    const handleClick = (sectionId: string) => {
        onNavigate(sectionId);
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
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="glass futuristic-navbar"
            style={{
                padding: '1rem 1.5rem',
                position: 'fixed',
                top: '1.5rem',
                left: '2rem',
                right: '2rem',
                zIndex: 1000,
                borderRadius: '20px',
                background: 'var(--glass-bg)',
                backdropFilter: 'blur(25px) saturate(180%)',
                border: `1px solid var(--glass-border)`,
                backgroundImage: `
                    var(--glass-bg),
                    linear-gradient(135deg, rgba(var(--primary-color-rgb), 0.08), rgba(16, 185, 129, 0.05), rgba(236, 72, 153, 0.06)),
                    radial-gradient(circle at ${mousePosition.x / window.innerWidth * 100}% ${mousePosition.y / window.innerHeight * 100}%, rgba(var(--primary-color-rgb), 0.12) 0%, transparent 50%)
                `,
                backgroundClip: 'padding-box, border-box, padding-box',
                backgroundOrigin: 'padding-box, border-box, padding-box',
                boxShadow: 'var(--shadow-lg)',
                overflow: 'hidden'
            }}
        >
            {/* Holographic overlay */}
            <motion.div
                className="holographic-overlay"
                animate={{
                    background: [
                        'linear-gradient(45deg, transparent 30%, rgba(var(--primary-color-rgb), 0.08) 50%, transparent 70%)',
                        'linear-gradient(45deg, transparent 20%, rgba(16, 185, 129, 0.06) 50%, transparent 80%)',
                        'linear-gradient(45deg, transparent 25%, rgba(236, 72, 153, 0.05) 50%, transparent 75%)',
                        'linear-gradient(45deg, transparent 30%, rgba(var(--primary-color-rgb), 0.08) 50%, transparent 70%)'
                    ]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    pointerEvents: 'none',
                    borderRadius: '20px'
                }}
            />

            {/* Neon border pulse */}
            <motion.div
                className="neon-border"
                animate={{
                    boxShadow: [
                        'inset 0 0 0 1px rgba(var(--primary-color-rgb), 0.25), 0 0 20px rgba(var(--primary-color-rgb), 0.15)',
                        'inset 0 0 0 1px rgba(16, 185, 129, 0.25), 0 0 30px rgba(16, 185, 129, 0.18)',
                        'inset 0 0 0 1px rgba(236, 72, 153, 0.25), 0 0 25px rgba(236, 72, 153, 0.15)',
                        'inset 0 0 0 1px rgba(var(--primary-color-rgb), 0.25), 0 0 20px rgba(var(--primary-color-rgb), 0.15)'
                    ]
                }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    borderRadius: '20px',
                    pointerEvents: 'none'
                }}
            />

            <nav className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', zIndex: 2 }}>
                <div
                    style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}
                    onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); onNavigate('home'); }}
                >
                    <motion.div
                        className="logo-container"
                        whileHover={{ scale: 1.15, rotate: 10 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                        style={{
                            background: 'linear-gradient(135deg, var(--primary-color), var(--secondary-color), var(--accent-color))',
                            width: '45px',
                            height: '45px',
                            borderRadius: '15px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: `
                                0 12px 35px rgba(var(--primary-color-rgb), 0.4),
                                0 6px 15px rgba(16, 185, 129, 0.3),
                                0 3px 8px rgba(236, 72, 153, 0.2),
                                inset 0 1px 0 rgba(255, 255, 255, 0.2)
                            `,
                            position: 'relative',
                            overflow: 'hidden'
                        }}
                    >
                        {/* Logo glow effect */}
                        <motion.div
                            animate={{
                                boxShadow: [
                                    '0 0 10px rgba(var(--primary-color-rgb), 0.6)',
                                    '0 0 20px rgba(16, 185, 129, 0.5)',
                                    '0 0 15px rgba(236, 72, 153, 0.4)',
                                    '0 0 10px rgba(var(--primary-color-rgb), 0.6)'
                                ]
                            }}
                            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                borderRadius: '15px'
                            }}
                        />
                        <Code size={22} color="white" style={{ position: 'relative', zIndex: 1 }} />
                    </motion.div>
                    <motion.h1
                        className="gradient-text futuristic-title"
                        style={{
                            fontSize: '1.5rem',
                            fontWeight: '900',
                            letterSpacing: '-0.8px',
                            margin: 0,
                            textShadow: '0 0 20px rgba(245, 158, 11, 0.5)',
                            position: 'relative'
                        }}
                        whileHover={{ scale: 1.05 }}
                        animate={{
                            textShadow: [
                                '0 0 20px rgba(var(--primary-color-rgb), 0.5)',
                                '0 0 25px rgba(16, 185, 129, 0.4)',
                                '0 0 20px rgba(236, 72, 153, 0.3)',
                                '0 0 20px rgba(var(--primary-color-rgb), 0.5)'
                            ]
                        }}
                        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                    >
                        DSA Master
                    </motion.h1>
                </div>

                {/* Desktop Menu */}
                <ul className="desktop-menu" style={{ display: 'flex', gap: '0.5rem', listStyle: 'none', alignItems: 'center' }}>
                    {navItems.map((item, index) => (
                        <li key={item.id}>
                            <motion.a
                                href={`#${item.id}`}
                                onClick={(e) => { e.preventDefault(); handleClick(item.id); }}
                                whileHover={{
                                    y: -3,
                                    scale: 1.05
                                }}
                                whileTap={{ scale: 0.95 }}
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    delay: index * 0.1,
                                    type: 'spring',
                                    stiffness: 300
                                }}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    fontSize: '0.9rem',
                                    fontWeight: activeSection === item.id ? '700' : '500',
                                    color: activeSection === item.id ? 'var(--primary-color)' : 'var(--text-main)',
                                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                                    padding: '0.7rem 1.2rem',
                                    borderRadius: '12px',
                                    position: 'relative',
                                    overflow: 'hidden',
                                    textShadow: activeSection === item.id ? '0 0 10px rgba(var(--primary-color-rgb), 0.8)' : 'none',
                                    background: activeSection === item.id
                                        ? 'linear-gradient(135deg, rgba(var(--primary-color-rgb), 0.15), rgba(16, 185, 129, 0.1))'
                                        : 'transparent',
                                    border: activeSection === item.id
                                        ? '1px solid rgba(var(--primary-color-rgb), 0.4)'
                                        : '1px solid transparent',
                                    boxShadow: activeSection === item.id
                                        ? '0 8px 25px rgba(var(--primary-color-rgb), 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                                        : 'none'
                                }}
                                onHoverStart={(e) => {
                                    const target = e.currentTarget as HTMLElement | null;
                                    if (target && activeSection !== item.id) {
                                        target.style.background = 'var(--nav-item-hover)';
                                        target.style.borderColor = 'var(--border-hover)';
                                        target.style.boxShadow = '0 6px 20px var(--shadow-primary)';
                                        target.style.transform = 'translateY(-2px)';
                                    }
                                }}
                                onHoverEnd={(e) => {
                                    const target = e.currentTarget as HTMLElement | null;
                                    if (target && activeSection !== item.id) {
                                        target.style.background = 'transparent';
                                        target.style.borderColor = 'transparent';
                                        target.style.boxShadow = 'none';
                                        target.style.transform = 'translateY(0)';
                                    }
                                }}
                            >
                                {/* Hover glow effect */}
                                <motion.div
                                    className="nav-item-glow"
                                    initial={{ opacity: 0 }}
                                    whileHover={{ opacity: 1 }}
                                    style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                        bottom: 0,
                                        background: 'linear-gradient(135deg, rgba(var(--primary-color-rgb), 0.1), rgba(16, 185, 129, 0.08))',
                                        borderRadius: '12px',
                                        pointerEvents: 'none'
                                    }}
                                />

                                <motion.div
                                    animate={{
                                        rotate: activeSection === item.id ? [0, 360] : 0,
                                        scale: activeSection === item.id ? [1, 1.2, 1] : 1
                                    }}
                                    transition={{
                                        rotate: { duration: 2, repeat: Infinity, ease: 'linear' },
                                        scale: { duration: 1.5, repeat: Infinity, ease: 'easeInOut' }
                                    }}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        position: 'relative',
                                        zIndex: 1
                                    }}
                                >
                                    <item.icon size={16} />
                                </motion.div>
                                <span style={{ position: 'relative', zIndex: 1 }}>{item.label}</span>

                                {activeSection === item.id && (
                                    <motion.div
                                        layoutId="active-indicator"
                                        style={{
                                            position: 'absolute',
                                            bottom: '-2px',
                                            left: '50%',
                                            right: '50%',
                                            height: '2px',
                                            background: 'linear-gradient(90deg, var(--primary-color), var(--secondary-color), var(--accent-color))',
                                            borderRadius: '1px',
                                            boxShadow: '0 0 10px rgba(var(--primary-color-rgb), 0.8)'
                                        }}
                                        animate={{
                                            left: 0,
                                            right: 0,
                                            boxShadow: [
                                                '0 0 10px rgba(var(--primary-color-rgb), 0.8)',
                                                '0 0 15px rgba(16, 185, 129, 0.6)',
                                                '0 0 10px rgba(236, 72, 153, 0.5)',
                                                '0 0 10px rgba(var(--primary-color-rgb), 0.8)'
                                            ]
                                        }}
                                        transition={{
                                            left: { duration: 0.3 },
                                            right: { duration: 0.3 },
                                            boxShadow: { duration: 2, repeat: Infinity, ease: 'easeInOut' }
                                        }}
                                    />
                                )}
                            </motion.a>
                        </li>
                    ))}
                    <li>
                        <motion.button
                            onClick={() => handleClick('topics')}
                            whileHover={{
                                scale: 1.05,
                                y: -2
                            }}
                            whileTap={{ scale: 0.95 }}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{
                                delay: 0.4,
                                type: 'spring',
                                stiffness: 300
                            }}
                            style={{
                                background: 'linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 50%, var(--accent-color) 100%)',
                                color: '#ffffff',
                                padding: '0.75rem 1.5rem',
                                borderRadius: '12px',
                                fontWeight: '700',
                                fontSize: '0.85rem',
                                cursor: 'pointer',
                                border: 'none',
                                boxShadow: `
                                    0 8px 25px rgba(245, 158, 11, 0.4),
                                    0 4px 12px rgba(16, 185, 129, 0.2),
                                    0 2px 6px rgba(236, 72, 153, 0.1),
                                    inset 0 1px 0 rgba(255, 255, 255, 0.2)
                                `,
                                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                letterSpacing: '0.3px',
                                position: 'relative',
                                overflow: 'hidden',
                                textTransform: 'uppercase',
                                backdropFilter: 'blur(10px)',
                                WebkitBackdropFilter: 'blur(10px)'
                            }}
                        >
                            {/* Animated background gradient */}
                            <motion.div
                                animate={{
                                    background: [
                                        'linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 50%, var(--accent-color) 100%)',
                                        'linear-gradient(135deg, var(--secondary-color) 0%, var(--accent-color) 50%, var(--primary-color) 100%)',
                                        'linear-gradient(135deg, var(--accent-color) 0%, var(--primary-color) 50%, var(--secondary-color) 100%)',
                                        'linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 50%, var(--accent-color) 100%)'
                                    ]
                                }}
                                transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    bottom: 0,
                                    borderRadius: '12px',
                                    opacity: 0.8
                                }}
                            />

                            {/* Shine effect */}
                            <motion.div
                                animate={{
                                    x: ['-100%', '100%']
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: 'easeInOut',
                                    repeatDelay: 2
                                }}
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '30%',
                                    height: '100%',
                                    background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent)',
                                    borderRadius: '12px'
                                }}
                            />

                            <span style={{
                                position: 'relative',
                                zIndex: 1,
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'
                            }}>
                                Start Learning
                                <motion.span
                                    animate={{ x: [0, 3, 0] }}
                                    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                                >
                                    →
                                </motion.span>
                            </span>
                        </motion.button>
                    </li>
                    <li>
                        <motion.button
                            onClick={toggleTheme}
                            whileHover={{
                                scale: 1.15,
                                rotate: 15,
                                y: -2
                            }}
                            whileTap={{ scale: 0.85 }}
                            initial={{ opacity: 0, rotate: -180 }}
                            animate={{ opacity: 1, rotate: 0 }}
                            transition={{
                                delay: 0.5,
                                type: 'spring',
                                stiffness: 300
                            }}
                            style={{
                                background: 'linear-gradient(135deg, rgba(var(--primary-color-rgb), 0.2), rgba(16, 185, 129, 0.15), rgba(236, 72, 153, 0.1))',
                                border: '1px solid rgba(var(--primary-color-rgb), 0.4)',
                                color: 'var(--text-main)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '45px',
                                height: '45px',
                                borderRadius: '50%',
                                cursor: 'pointer',
                                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                                position: 'relative',
                                overflow: 'hidden',
                                boxShadow: '0 8px 25px rgba(var(--primary-color-rgb), 0.3)'
                            }}
                            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                            onHoverStart={(e) => {
                                const target = e.currentTarget as HTMLElement | null;
                                if (target) {
                                    target.style.background = 'linear-gradient(135deg, rgba(var(--primary-color-rgb), 0.3), rgba(16, 185, 129, 0.2), rgba(236, 72, 153, 0.15))';
                                    target.style.boxShadow = '0 0 25px rgba(var(--primary-color-rgb), 0.5), 0 0 40px rgba(16, 185, 129, 0.3)';
                                    target.style.borderColor = 'rgba(var(--primary-color-rgb), 0.6)';
                                }
                            }}
                            onHoverEnd={(e) => {
                                const target = e.currentTarget as HTMLElement | null;
                                if (target) {
                                    target.style.background = 'linear-gradient(135deg, rgba(245, 158, 11, 0.2), rgba(16, 185, 129, 0.15), rgba(236, 72, 153, 0.1))';
                                    target.style.boxShadow = '0 8px 25px rgba(245, 158, 11, 0.3)';
                                    target.style.borderColor = 'rgba(245, 158, 11, 0.4)';
                                }
                            }}
                        >
                            {/* Theme button glow */}
                            <motion.div
                                animate={{
                                    boxShadow: [
                                        '0 0 10px rgba(var(--primary-color-rgb), 0.4)',
                                        '0 0 15px rgba(16, 185, 129, 0.3)',
                                        '0 0 10px rgba(236, 72, 153, 0.2)',
                                        '0 0 10px rgba(var(--primary-color-rgb), 0.4)'
                                    ]
                                }}
                                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    bottom: 0,
                                    borderRadius: '50%',
                                    pointerEvents: 'none'
                                }}
                            />
                            <motion.div
                                animate={{ rotate: theme === 'dark' ? 0 : 180 }}
                                transition={{ duration: 0.5 }}
                                style={{ position: 'relative', zIndex: 1 }}
                            >
                                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                            </motion.div>
                        </motion.button>
                    </li>
                </ul>

                {/* Mobile Icons Container */}
                <div className="mobile-menu-btn" style={{ display: 'none', alignItems: 'center', gap: '1rem' }}>
                    <motion.button
                        onClick={toggleTheme}
                        whileHover={{ scale: 1.1, rotate: 10 }}
                        whileTap={{ scale: 0.9 }}
                        style={{
                            background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.2), rgba(16, 185, 129, 0.15))',
                            border: '1px solid rgba(245, 158, 11, 0.3)',
                            color: 'var(--text-main)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            cursor: 'pointer',
                            boxShadow: '0 4px 15px rgba(245, 158, 11, 0.3)',
                            transition: 'all 0.3s ease'
                        }}
                    >
                        {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                    </motion.button>
                    <motion.button
                      onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      style={{
                        background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.15), rgba(16, 185, 129, 0.1))',
                        border: '1px solid rgba(245, 158, 11, 0.2)',
                        color: 'var(--text-main)',
                        cursor: 'pointer',
                        padding: '0.6rem',
                        borderRadius: '12px',
                        transition: 'all 0.3s ease',
                        boxShadow: '0 4px 15px rgba(245, 158, 11, 0.2)',
                        position: 'relative',
                        overflow: 'hidden'
                      }}
                    >
                      <motion.div
                        animate={{ rotate: isMobileMenuOpen ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                      </motion.div>
                    </motion.button>
                </div>
            </nav>

            {/* Mobile Dropdown Menu */}
            <AnimatePresence>
              {isMobileMenuOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0, scale: 0.95 }}
                  animate={{ height: 'auto', opacity: 1, scale: 1 }}
                  exit={{ height: 0, opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                  style={{
                    overflow: 'hidden',
                    background: 'var(--glass-bg)',
                    backdropFilter: 'blur(20px)',
                    borderTop: '1px solid var(--glass-border)',
                    borderRadius: '0 0 20px 20px',
                    boxShadow: 'var(--shadow-lg)',
                    position: 'relative'
                  }}
                >
                  {/* Mobile menu glow effect */}
                  <motion.div
                    animate={{
                      boxShadow: [
                        'inset 0 0 20px rgba(var(--primary-color-rgb), 0.08)',
                        'inset 0 0 30px rgba(16, 185, 129, 0.06)',
                        'inset 0 0 20px rgba(236, 72, 153, 0.05)',
                        'inset 0 0 20px rgba(var(--primary-color-rgb), 0.08)'
                      ]
                    }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      borderRadius: '0 0 20px 20px',
                      pointerEvents: 'none'
                    }}
                  />

                  <ul style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem',
                    listStyle: 'none',
                    padding: '1.5rem 2rem',
                    margin: 0,
                    position: 'relative',
                    zIndex: 1
                  }}>
                      {navItems.map((item, index) => (
                          <motion.li
                            key={item.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.3 }}
                          >
                              <a
                                  href={`#${item.id}`}
                                  onClick={(e) => { e.preventDefault(); handleClick(item.id); }}
                                  style={{
                                      display: 'flex',
                                      alignItems: 'center',
                                      gap: '0.75rem',
                                      fontSize: '1.1rem',
                                      fontWeight: activeSection === item.id ? '700' : '500',
                                      color: activeSection === item.id ? 'var(--primary-color)' : 'var(--text-main)',
                                      textShadow: activeSection === item.id ? '0 0 10px rgba(var(--primary-color-rgb), 0.8)' : 'none',
                                      padding: '0.75rem 1rem',
                                      borderRadius: '12px',
                                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                      background: activeSection === item.id
                                        ? 'linear-gradient(135deg, rgba(var(--primary-color-rgb), 0.15), rgba(16, 185, 129, 0.1))'
                                        : 'transparent',
                                      border: activeSection === item.id
                                        ? '1px solid rgba(var(--primary-color-rgb), 0.3)'
                                        : '1px solid transparent',
                                      position: 'relative',
                                      overflow: 'hidden'
                                  }}
                                  onMouseEnter={(e) => {
                                    const target = e.currentTarget as HTMLElement;
                                    if (activeSection !== item.id) {
                                      target.style.background = 'var(--nav-item-hover)';
                                      target.style.transform = 'translateX(5px)';
                                    }
                                  }}
                                  onMouseLeave={(e) => {
                                    const target = e.currentTarget as HTMLElement;
                                    if (activeSection !== item.id) {
                                      target.style.background = 'transparent';
                                      target.style.transform = 'translateX(0)';
                                    }
                                  }}
                              >
                                  <motion.div
                                    animate={{
                                      rotate: activeSection === item.id ? [0, 360] : 0,
                                      scale: activeSection === item.id ? [1, 1.2, 1] : 1
                                    }}
                                    transition={{
                                      rotate: { duration: 2, repeat: Infinity, ease: 'linear' },
                                      scale: { duration: 1.5, repeat: Infinity, ease: 'easeInOut' }
                                    }}
                                  >
                                    <item.icon size={20} />
                                  </motion.div>
                                  {item.label}
                                  {activeSection === item.id && (
                                    <motion.div
                                      initial={{ scale: 0 }}
                                      animate={{ scale: 1 }}
                                      style={{
                                        position: 'absolute',
                                        right: '1rem',
                                        width: '8px',
                                        height: '8px',
                                        borderRadius: '50%',
                                        background: 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))',
                                        boxShadow: '0 0 10px rgba(var(--primary-color-rgb), 0.8)'
                                      }}
                                    />
                                  )}
                              </a>
                          </motion.li>
                      ))}
                      <motion.li
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.3 }}
                        style={{ marginTop: '0.5rem' }}
                      >
                          <motion.button
                              onClick={() => handleClick('topics')}
                              whileHover={{ scale: 1.05, y: -2 }}
                              whileTap={{ scale: 0.95 }}
                              style={{
                                  background: 'linear-gradient(135deg, #f59e0b 0%, #f97316 50%, #ec4899 100%)',
                                  color: '#000',
                                  padding: '0.9rem 2rem',
                                  borderRadius: '15px',
                                  fontWeight: '900',
                                  fontSize: '1rem',
                                  cursor: 'pointer',
                                  width: '100%',
                                  border: '1px solid rgba(255, 255, 255, 0.2)',
                                  textTransform: 'uppercase',
                                  letterSpacing: '0.5px',
                                  boxShadow: '0 8px 25px rgba(245, 158, 11, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
                                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                  position: 'relative',
                                  overflow: 'hidden',
                                  textShadow: '0 0 10px rgba(255, 255, 255, 0.8)'
                              }}
                          >
                              {/* Mobile button glow */}
                              <motion.div
                                animate={{
                                  boxShadow: [
                                    'inset 0 0 20px rgba(255, 255, 255, 0.2)',
                                    'inset 0 0 30px rgba(255, 255, 255, 0.4)',
                                    'inset 0 0 20px rgba(255, 255, 255, 0.2)'
                                  ]
                                }}
                                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                                style={{
                                  position: 'absolute',
                                  top: 0,
                                  left: 0,
                                  right: 0,
                                  bottom: 0,
                                  borderRadius: '15px',
                                  pointerEvents: 'none'
                                }}
                              />
                              Start Learning 🚀
                          </motion.button>
                      </motion.li>
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
        </motion.header>
    );
};

export default Navbar;
