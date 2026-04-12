import { motion } from 'framer-motion';
import { Search } from 'lucide-react';

interface HeroProps {
    onNavigate: (section: string) => void;
    searchQuery: string;
    setSearchQuery: (query: string) => void;
}

const Hero = ({ onNavigate, searchQuery, setSearchQuery }: HeroProps) => {
    const scrollToSection = (sectionId: string) => {
        onNavigate(sectionId);
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <section className="container" style={{ padding: '8rem 0 4rem 0', position: 'relative', overflow: 'hidden' }}>
            {/* Animated 3D Background - Data Structure Nodes */}
            <motion.div
                style={{
                    position: 'absolute',
                    top: '5%',
                    left: '10%',
                    width: '60px',
                    height: '60px',
                    background: 'linear-gradient(135deg, #f59e0b, #f97316)',
                    borderRadius: '12px',
                    zIndex: -1,
                    opacity: 0.2,
                    boxShadow: '0 8px 32px rgba(245, 158, 11, 0.3)'
                }}
                animate={{
                    y: [0, -20, 0],
                    rotateX: [0, 45, 0],
                    rotateY: [0, 25, 0]
                }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            />
            
            {/* Animated 3D Cube */}
            <motion.div
                style={{
                    position: 'absolute',
                    top: '15%',
                    right: '15%',
                    width: '80px',
                    height: '80px',
                    background: 'linear-gradient(135deg, #10b981, #34d399)',
                    borderRadius: '16px',
                    zIndex: -1,
                    opacity: 0.15,
                    boxShadow: '0 12px 40px rgba(16, 185, 129, 0.3)'
                }}
                animate={{
                    y: [0, 30, 0],
                    x: [0, 15, 0],
                    rotateX: [0, -45, 0],
                    rotateZ: [0, 20, 0]
                }}
                transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            />

            {/* Pyramid-like structure */}
            <motion.div
                style={{
                    position: 'absolute',
                    bottom: '10%',
                    left: '5%',
                    width: '100px',
                    height: '100px',
                    background: 'linear-gradient(135deg, #f59e0b, #10b981)',
                    clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
                    zIndex: -1,
                    opacity: 0.1,
                    filter: 'blur(1px)'
                }}
                animate={{
                    rotate: [0, 360],
                    y: [0, 20, 0]
                }}
                transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
            />

            {/* Network nodes visualization */}
            {[...Array(5)].map((_, i) => (
                <motion.div
                    key={i}
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.1, 0.3, 0.1]
                    }}
                    transition={{
                        duration: 4 + i,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: i * 0.5
                    }}
                    style={{
                        position: 'absolute',
                        width: `${60 + i * 20}px`,
                        height: `${60 + i * 20}px`,
                        borderRadius: '50%',
                        border: `2px solid rgba(245, 158, 11, ${0.2 - i * 0.03})`,
                        zIndex: -1,
                        top: `${25 + i * 5}%`,
                        right: `${10 + i * 3}%`
                    }}
                />
            ))}

            {/* Ambient background gradient */}
            <div style={{
                position: 'absolute',
                top: '-10%',
                left: '0%',
                width: '400px',
                height: '400px',
                background: 'radial-gradient(circle, rgba(245, 158, 11, 0.15) 0%, transparent 70%)',
                borderRadius: '50%',
                zIndex: -1,
                filter: 'blur(40px)'
            }} />
            <div style={{
                position: 'absolute',
                top: '20%',
                right: '-5%',
                width: '350px',
                height: '350px',
                background: 'radial-gradient(circle, rgba(16, 185, 129, 0.12) 0%, transparent 70%)',
                borderRadius: '50%',
                zIndex: -1,
                filter: 'blur(40px)'
            }} />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <h2 style={{ 
                    fontSize: 'clamp(3rem, 8vw, 4.5rem)', 
                    marginBottom: '1.5rem', 
                    lineHeight: '1.1',
                    fontWeight: '800',
                    letterSpacing: '-0.03em'
                }}>
                    Master Data Structures & <br />
                    <span className="gradient-text" style={{ fontSize: '1.1em' }}>Algorithms Mastery</span>
                </h2>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    style={{ 
                        color: 'var(--text-muted)', 
                        fontSize: '1.25rem', 
                        maxWidth: '650px', 
                        marginBottom: '3rem',
                        lineHeight: '1.8'
                    }}
                >
                    Your journey to algorithmic excellence starts here. A curated path through every major DSA topic, visual guides, and technical deep-dives.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    style={{
                        position: 'relative',
                        marginBottom: '3rem',
                        maxWidth: '500px'
                    }}
                >
                    <Search
                        size={20}
                        style={{
                            position: 'absolute',
                            left: '1rem',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            color: 'var(--text-muted)'
                        }}
                    />
                    <input
                        type="text"
                        placeholder="Search topics..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '1rem 1rem 1rem 3rem',
                            borderRadius: '12px',
                            border: '1px solid var(--border-color)',
                            backgroundColor: 'var(--surface-color)',
                            color: 'var(--text-color)',
                            fontSize: '1rem',
                            outline: 'none',
                            transition: 'border-color 0.2s ease'
                        }}
                        onFocus={(e) => e.target.style.borderColor = 'var(--primary-color)'}
                        onBlur={(e) => e.target.style.borderColor = 'var(--border-color)'}
                    />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                    style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}
                >
                    <button
                        onClick={() => scrollToSection('roadmap')}
                        style={{
                            background: 'linear-gradient(135deg, var(--primary-color), var(--primary-hover))',
                            color: 'white',
                            padding: '1rem 2.5rem',
                            borderRadius: '12px',
                            fontWeight: '700',
                            fontSize: '1.1rem',
                            boxShadow: '0 15px 40px rgba(124, 58, 237, 0.3)',
                            cursor: 'pointer',
                            border: 'none',
                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                            position: 'relative',
                            overflow: 'hidden'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-3px)';
                            e.currentTarget.style.boxShadow = '0 20px 50px rgba(124, 58, 237, 0.4)';
                            e.currentTarget.style.filter = 'brightness(1.1)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = '0 15px 40px rgba(124, 58, 237, 0.3)';
                            e.currentTarget.style.filter = 'brightness(1)';
                        }}
                    >
                        Explore Roadmap →
                    </button>
                    <button
                        onClick={() => scrollToSection('big-o')}
                        className="glass"
                        style={{
                            padding: '1rem 2.5rem',
                            fontWeight: '600',
                            fontSize: '1.1rem',
                            cursor: 'pointer',
                            border: '2px solid var(--border-color)',
                            borderRadius: '12px',
                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                            background: 'rgba(21, 29, 61, 0.4)',
                            color: 'var(--text-main)'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-3px)';
                            e.currentTarget.style.borderColor = 'var(--primary-color)';
                            e.currentTarget.style.boxShadow = '0 15px 40px rgba(124, 58, 237, 0.3)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.borderColor = 'var(--border-color)';
                            e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
                        }}
                    >
                        Learn Big O
                    </button>
                    <button
                        onClick={() => scrollToSection('problems')}
                        style={{
                            backgroundColor: 'rgba(236, 72, 153, 0.1)',
                            color: 'var(--accent-light)',
                            padding: '1rem 2.5rem',
                            borderRadius: '12px',
                            fontWeight: '600',
                            fontSize: '1.1rem',
                            cursor: 'pointer',
                            border: '2px solid var(--accent-color)',
                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-3px)';
                            e.currentTarget.style.background = 'rgba(236, 72, 153, 0.2)';
                            e.currentTarget.style.boxShadow = '0 15px 40px rgba(236, 72, 153, 0.2)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.background = 'rgba(236, 72, 153, 0.1)';
                            e.currentTarget.style.boxShadow = 'none';
                        }}
                    >
                        Practice Problems
                    </button>
                </motion.div>
            </motion.div>
        </section>
    );
};

export default Hero;
