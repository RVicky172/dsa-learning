import { motion } from 'framer-motion';
import { BarChart3, BookOpen, Zap } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

interface FeaturesSectionProps {
  totalTopics: number;
}

const FeaturesSection = ({ totalTopics }: FeaturesSectionProps) => {
  return (
    <section className="container" style={{ padding: 'clamp(2rem, 6vw, 4rem) 0', borderTop: '1px solid var(--border-color)' }}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'clamp(1rem, 4vw, 2rem)' }}
      >
        <motion.div variants={itemVariants} className="glass" style={{ padding: 'clamp(1rem, 4vw, 2rem)', borderRadius: '16px' }}>
          <div style={{ color: 'var(--primary-color)', marginBottom: '1rem', fontSize: 'clamp(1.2rem, 3vw, 1.5rem)' }}>
            <Zap size={24} />
          </div>
          <h3 style={{ fontSize: 'clamp(1.1rem, 3.5vw, 1.3rem)', marginBottom: '0.5rem' }}>Lightning Fast</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: 'clamp(0.85rem, 2.5vw, 0.95rem)' }}>
            Optimized learning paths that get you results in record time. No fluff, just pure algorithmic mastery.
          </p>
        </motion.div>

        <motion.div variants={itemVariants} className="glass" style={{ padding: 'clamp(1rem, 4vw, 2rem)', borderRadius: '16px' }}>
          <div style={{ color: 'var(--secondary-color)', marginBottom: '1rem', fontSize: 'clamp(1.2rem, 3vw, 1.5rem)' }}>
            <BookOpen size={24} />
          </div>
          <h3 style={{ fontSize: 'clamp(1.1rem, 3.5vw, 1.3rem)', marginBottom: '0.5rem' }}>Comprehensive</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: 'clamp(0.85rem, 2.5vw, 0.95rem)' }}>
            {totalTopics} major DSA topics with in-depth explanations, real-world applications, and dozens of practice problems.
          </p>
        </motion.div>

        <motion.div variants={itemVariants} className="glass" style={{ padding: 'clamp(1rem, 4vw, 2rem)', borderRadius: '16px' }}>
          <div style={{ color: 'var(--primary-color)', marginBottom: '1rem', fontSize: 'clamp(1.2rem, 3vw, 1.5rem)' }}>
            <BarChart3 size={24} />
          </div>
          <h3 style={{ fontSize: 'clamp(1.1rem, 3.5vw, 1.3rem)', marginBottom: '0.5rem' }}>Interactive</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: 'clamp(0.85rem, 2.5vw, 0.95rem)' }}>
            Visualize algorithms in action with detailed complexity analysis and step-by-step code walkthroughs.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default FeaturesSection;
