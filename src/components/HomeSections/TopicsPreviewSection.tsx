import { motion } from 'framer-motion';
import TopicCard from '../TopicCard';
import type { TopicMeta } from '../../types/topic';

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

interface TopicsPreviewSectionProps {
  topics: TopicMeta[];
  onTopicSelect: (topicId: string) => void;
}

const TopicsPreviewSection = ({ topics, onTopicSelect }: TopicsPreviewSectionProps) => {
  return (
    <section id="topics" className="container" style={{ padding: 'clamp(2rem, 6vw, 4rem) 0' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          marginBottom: 'clamp(2rem, 6vw, 4rem)',
        }}
      >
        <div style={{ textAlign: 'center', width: '100%' }}>
          <span className="gradient-text" style={{ fontWeight: '700', letterSpacing: '0.2em', textTransform: 'uppercase', fontSize: 'clamp(0.75rem, 2vw, 0.9rem)' }}>
            Comprehensive Curriculum
          </span>
          <h2 style={{ fontSize: 'clamp(2rem, 6vw, 3.5rem)', marginTop: '1rem', letterSpacing: '-0.03em' }}>Master Every Concept</h2>
          <p style={{ color: 'var(--text-muted)', marginTop: '1rem', maxWidth: '600px', margin: '1rem auto 0', fontSize: 'clamp(0.9rem, 3vw, 1.1rem)' }}>
            A structured path from fundamental building blocks to advanced algorithmic mastery. Including Graphs and beyond.
          </p>
        </div>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: 'clamp(1rem, 4vw, 2rem)',
        }}
      >
        {topics.map((topic) => (
          <motion.div
            variants={itemVariants}
            key={topic.id}
            onClick={() => onTopicSelect(topic.id)}
            style={{ cursor: 'pointer' }}
            whileHover={{ y: -5 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            <TopicCard {...topic} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default TopicsPreviewSection;
