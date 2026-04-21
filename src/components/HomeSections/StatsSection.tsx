import { motion } from 'framer-motion';

interface StatsSectionProps {
  totalTopics: number;
  completedTopics: number;
  completedProblems: number;
}

const StatsSection = ({ totalTopics, completedTopics, completedProblems }: StatsSectionProps) => {
  return (
    <section className="container" style={{ padding: 'clamp(2rem, 6vw, 4rem) 0' }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 'clamp(1rem, 4vw, 2rem)', textAlign: 'center' }}
      >
        <div>
          <h3 style={{ fontSize: 'clamp(1.75rem, 5vw, 2.5rem)', color: 'var(--primary-color)', marginBottom: '0.5rem' }}>{totalTopics}</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: 'clamp(0.85rem, 2.5vw, 1rem)' }}>Core Topics</p>
        </div>
        <div>
          <h3 style={{ fontSize: 'clamp(1.75rem, 5vw, 2.5rem)', color: 'var(--secondary-color)', marginBottom: '0.5rem' }}>{completedTopics}</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: 'clamp(0.85rem, 2.5vw, 1rem)' }}>Completed Topics</p>
        </div>
        <div>
          <h3 style={{ fontSize: 'clamp(1.75rem, 5vw, 2.5rem)', color: 'var(--secondary-color)', marginBottom: '0.5rem' }}>50+</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: 'clamp(0.85rem, 2.5vw, 1rem)' }}>Practice Problems</p>
        </div>
        <div>
          <h3 style={{ fontSize: 'clamp(1.75rem, 5vw, 2.5rem)', color: 'var(--secondary-color)', marginBottom: '0.5rem' }}>{completedProblems}</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: 'clamp(0.85rem, 2.5vw, 1rem)' }}>Problems Solved</p>
        </div>
        <div>
          <h3 style={{ fontSize: 'clamp(1.75rem, 5vw, 2.5rem)', color: 'var(--primary-color)', marginBottom: '0.5rem' }}>100%</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: 'clamp(0.85rem, 2.5vw, 1rem)' }}>Free &amp; Open</p>
        </div>
      </motion.div>
    </section>
  );
};

export default StatsSection;
