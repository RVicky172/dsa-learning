import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { useProgress } from '../hooks/useProgress';

interface TopicCardProps {
    title: string;
    description: string;
    icon: React.ReactNode;
    complexity: string;
    delay?: number;
}

const TopicCard = ({ title, description, icon, complexity, delay = 0, id }: TopicCardProps & { id: string }) => {
    const { isTopicCompleted } = useProgress();
    const completed = isTopicCompleted(id);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay }}
            whileHover={{ y: -5, borderColor: 'var(--primary-color)' }}
            className="glass"
            style={{
                padding: 'clamp(1rem, 4vw, 2rem)',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                height: '100%',
                transition: 'var(--transition-smooth)'
            }}
        >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    backgroundColor: 'rgba(139, 92, 246, 0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '0.5rem',
                    color: completed ? 'var(--secondary-color)' : 'var(--secondary-color)',
                    flexShrink: 0
                }}>
                    {icon}
                </div>
                {completed && (
                    <div style={{ color: 'var(--secondary-color)', display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: 'clamp(0.7rem, 2.5vw, 0.85rem)', fontWeight: 'bold', flexShrink: 0 }}>
                        <CheckCircle2 size={18} /> <span style={{ display: 'none' }}>Completed</span>
                    </div>
                )}
            </div>

            <div>
                <span style={{
                    fontSize: 'clamp(0.65rem, 2vw, 0.75rem)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    color: 'var(--text-muted)',
                    display: 'block',
                    marginBottom: '0.25rem'
                }}>
                    Complexity: {complexity}
                </span>
                <h3 style={{ fontSize: 'clamp(1.1rem, 3.5vw, 1.5rem)', marginBottom: '0.5rem' }}>{title}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: 'clamp(0.85rem, 2.5vw, 0.95rem)' }}>{description}</p>
            </div>

            <div style={{ marginTop: 'auto', paddingTop: '1.5rem' }}>
                <button style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    color: 'var(--primary-color)',
                    fontWeight: '600',
                    fontSize: 'clamp(0.8rem, 2.5vw, 0.95rem)'
                }}>
                    Learn more <ArrowRight size={16} />
                </button>
            </div>
        </motion.div>
    );
};

export default TopicCard;
